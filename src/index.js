const axios = require('axios')

const ipv4_regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/gi
const ipv6_regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/gi

async function getIPv4List() {
    let response = await axios.get("https://mask-api.icloud.com/egress-ip-ranges.csv")
    let data = response.data.split('\n')
    return data.map((line) => {
        let l = line.split(',')
        let ip = l[0].split('/')
        if (isIpAddressValidV4(ip[0]) || isIpAddressValidV6(ip[0]))
        {
            return { ip: ip[0], countryCode: l[1], language: l[2], location: l[3]}
        }
    }).filter((ip) => ip !== undefined)
}
function isIpAddressValidV4(ipAddress)
{
    return ipv4_regex.test(ipAddress);
}
function isIpAddressValidV6(ipAddress)
{
    return ipv6_regex.test(ipAddress);
}

async function isICloudPrivateRelayAddress(ipAddress)
{
    if (!isIpAddressValidV4(ipAddress) && !isIpAddressValidV6(ipAddress)) {
        throw new Error('Invalid IP Address')
    }
    let response = await getIPv4List()
    return response.filter((ip) => ip.ip === ipAddress)[0] ?? false
}

module.exports = { isICloudPrivateRelayAddress, isIpAddressValidV4, isIpAddressValidV6 }