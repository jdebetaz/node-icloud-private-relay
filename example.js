const Relay = require('./src/index')

async function getSample () {
    let isICloudPrivateRelayAddressV4 = await Relay.isICloudPrivateRelayAddress("172.224.224.72")
    console.log(isICloudPrivateRelayAddressV4) // Returns information about the IP

    let isICloudPrivateRelayAddressV6 = await Relay.isICloudPrivateRelayAddress("2a02:26f7:b3c0:4000::")
    console.log(isICloudPrivateRelayAddressV6) // Returns information about the IP

    let isNotICloudPrivateRelayAddress = await Relay.isICloudPrivateRelayAddress("192.168.1.1")
    console.log(isNotICloudPrivateRelayAddress) // false
}

getSample()