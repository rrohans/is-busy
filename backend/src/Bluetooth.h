#pragma once

class Bluetooth
{

public:
    Bluetooth();
    ~Bluetooth();
    int scan(int timeout);
};