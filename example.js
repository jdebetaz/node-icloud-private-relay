const Relay = require('./src/index')

async function getSample () {
    let isICloudPrivateRelayAddress = await Relay.isICloudPrivateRelayAddress("172.224.224.72")
    console.log(isICloudPrivateRelayAddress) // {ip: "172.224.224.72", countryCode: "GB", language: "GB-EN", location: "Birmingham"}

    let isNotICloudPrivateRelayAddress = await Relay.isICloudPrivateRelayAddress("192.168.1.1")
    console.log(isNotICloudPrivateRelayAddress) // false
}

getSample()