#include <Arduino.h>

#include <WiFi.h>

#include <Firebase_ESP_Client.h>
#include <addons/TokenHelper.h>

#include "Bluetooth.h"

#define WIFI_SSID "SSID"
#define WIFI_PASSWORD "PASSWORD"

#define API_KEY "API_KEY"
#define FIREBASE_PROJECT_ID "is-busy"

#define USER_EMAIL "USER_EMAIL"
#define USER_PASSWORD "USER_PASSWORD"

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

unsigned long dataMillis = 0;
int count = 0;

void setup()
{
  Serial.begin(115200);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  Serial.printf("Firebase Client v%s\n\n", FIREBASE_CLIENT_VERSION);

  config.api_key = API_KEY;

  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;

  config.token_status_callback = tokenStatusCallback;

}

void loop()
{
  int numberOfPeople = 0;
  
  {
    Bluetooth bt;
    numberOfPeople = bt.scan(6 * 5);
  }

  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);

  if (Firebase.ready() && (millis() - dataMillis > 60000 || dataMillis == 0))
  {
    Serial.printf("Number of people discovered: %d\n", numberOfPeople);
    dataMillis = millis();

    FirebaseJson content;

    String documentPath = "library/" + String(count);

    //integer
    content.set("fields/numberOfPeople/integerValue", String(numberOfPeople));
    content.set("fields/name/stringValue", "Tolbert Area");

    count++;

    Serial.print("Creating document... ");

    if (Firebase.Firestore.createDocument(&fbdo, FIREBASE_PROJECT_ID, "", documentPath.c_str(), content.raw()))
    {
      Serial.printf("ok\n%s\n\n", fbdo.payload().c_str());
    }
    else
    {
      Serial.println(fbdo.errorReason());
    }
  }
}