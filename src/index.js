const axios = require('axios')
const IPCIDR = require("ip-cidr");
const ipRegex = require('ip-regex')

/**
 * @typedef {{cidr: Object, countryCode: string, regionCode: string, location: string }} ICPRResponse
 */

/**
 *
 * @returns {ICPRResponse}
 */
async function getIPList() {
    const response = await axios.get("https://mask-api.icloud.com/egress-ip-ranges.csv")
    const lines = response.data.split('\n')
    return lines.map((line) => {
        let l = line.split(',')
        return {cidr: new IPCIDR(l[0]), countryCode: l[1], regionCode: l[2], location: l[3]}
    })
}

/**
 *
 * @param {string} ipAddress
 * @returns {ICPRResponse|boolean}
 */
async function isICloudPrivateRelayAddress(ipAddress) {
    if (!ipRegex({exact: true}).test(ipAddress)) {
        throw new Error('Invalid IP Address')
    }
    let response = await getIPList()
    return response.find(x => x.cidr.contains(ipAddress)) || false
}

module.exports = { isICloudPrivateRelayAddress }