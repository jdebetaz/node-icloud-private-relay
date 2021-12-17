# node-icloud-private-relay

NodeJS package that detects iCloud Private Relay IP address based on ICloud's [egress ip range](https://mask-api.icloud.com/egress-ip-ranges.csv) list. More information about how to prepare your network for iCloud Private Relay can be found [here](https://developer.icloud.com/support/prepare-your-network-for-icloud-private-relay/).

## Installation
```
npm i @jdebetaz/icloud-private-relay
```

## Usage

```js
const Relay = require('@jdebetaz/icloud-private-relay')

async function getSample () {
    let isICloudPrivateRelayAddress = await Relay.isICloudPrivateRelayAddress("172.224.224.72")
    console.log(isICloudPrivateRelayAddress) // {ip: "172.224.224.72", countryCode: "GB", language: "GB-EN", location: "Birmingham"}

    let isNotICloudPrivateRelayAddress = await Relay.isICloudPrivateRelayAddress("192.168.1.1")
    console.log(isNotICloudPrivateRelayAddress) // false
}

getSample()
```
