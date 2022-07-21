const Relay = require('./src/index')

async function getSample () {
    let isICloudPrivateRelayAddress = await Relay.isICloudPrivateRelayAddress("172.224.224.72")
    console.log(isICloudPrivateRelayAddress) // Returns information about the IP

    let isNotICloudPrivateRelayAddress = await Relay.isICloudPrivateRelayAddress("192.168.1.1")
    console.log(isNotICloudPrivateRelayAddress) // false
}

getSample()