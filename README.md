# Created By Rohan S for SwampHacks 8

## Inspiration
Often as I visit places like the library or The Hub, I question my safety and the safety of my peers during our time in the pandemic. The probability of transmission of COVID increases significantly when people are closer together. In order to help people make an informed decision whether to visit a particular place, I created Is-Busy, which measures the number of people in near real-time and delivers the result over the internet. 
## What it does
Is-Busy measures the number of people at a certain location every minute (configurable) and reports the count via the internet to a webpage, which can be viewed across multiple devices.
## How I built it
I built Is-Busy using Next.Js (React Framework) as a frontend, Google's Firebase as a backend, and an ESP32 coded with the Arduino Framework (C++) to gather data. Data is gathered by scanning for Bluetooth devices; the only assumption made is that most people will have at least one Bluetooth device. I connect to Firebase to log the Bluetooth data via an internet connection.
## Challenges I ran into
Most of my challenges came from the ESP32, as this is the first time I have ever used one. Getting both the Bluetooth and WiFi chips to work sequentially required a lot of learning about microprocessors. 
## Accomplishments that I am proud of
As a team of one, it was extremely challenging to conceptualize and implement the idea by myself. I am proud of my project as a whole, as I was able to handle the entire design and development under time constraints.
## What I learned
I learned a lot about the ESP32 and the concept of IoT, and its practical implementations to solve real-world problems.  
## What's next for Is-Busy
To incorporate multiple devices in different locations and better normalize the data across them would be the next steps of Is-Busy.
