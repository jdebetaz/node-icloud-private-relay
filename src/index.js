const axios = require('axios')

async function getIPv4List() {
    let response = await axios.get("https://mask-api.icloud.com/egress-ip-ranges.csv")
    let data = response.data.split('\n')
    return data.map((line) => {
        let l = line.split(',')
        let ip = l[0].split('/')
        if (isIpAddressValid(ip[0]))
        {
            return { ip: ip[0], countryCode: l[1], language: l[2], location: l[3]}
        }
    }).filter((ip) => ip !== undefined)
}
function isIpAddressValid(ipAddress)
{
    return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipAddress);
}

async function isICloudPrivateRelayAddress(ipAddress)
{
    if (!isIpAddressValid(ipAddress)) {
        throw new Error('Invalid IP Address')
    }
    let response = await getIPv4List()
    return response.filter((ip) => ip.ip === ipAddress)[0] ?? false
}

module.exports = { isICloudPrivateRelayAddress, isIpAddressValid }