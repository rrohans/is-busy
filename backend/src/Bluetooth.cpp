#include <BLEAdvertisedDevice.h>
#include <BLEDevice.h>
#include <BLEScan.h>

#include "Bluetooth.h"

Bluetooth::Bluetooth()
{
    BLEDevice::init("");
}

int Bluetooth::scan(int timeout)
{
    // Scans in 1 second intervals but for the specified timeout
    // returns average number of devices found

    BLEScan *scan = BLEDevice::getScan();
    scan->setActiveScan(true);

    int sum = 0;

    for (int i = 0; i < timeout; i++)
    {
        BLEScanResults foundDevices = scan->start(10);
        sum += foundDevices.getCount();
    }

    return sum / timeout;
}

Bluetooth::~Bluetooth()
{
    BLEDevice::deinit();
}