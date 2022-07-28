const Relay = require('../src/index')
jest.setTimeout(9000)

describe('ICloud Private Relay IPv4', () => {
    /**
     * IPv4
     */
    it('should not be a validate IPv4 address', () => {
        let response = Relay.isICloudPrivateRelayAddress("292.168.1.120")
        expect(response).rejects.toThrow('Invalid IP Address')
    })

    it('should not be an ICloud Private Relay v4', async () => {
        let response = await Relay.isICloudPrivateRelayAddress("192.168.1.120")
        expect(response).toBeFalsy()
    })

    it('should be an ICloud Private Relay in v4', async () => {
        let ip = "172.224.224.72"
        let response = await Relay.isICloudPrivateRelayAddress(ip)
        expect(response).not.toBeFalsy()
        expect(response.cidr.address.addressMinusSuffix).toBe(ip)
        expect(response.countryCode).toBe("GB")
        expect(response.regionCode).toBe("GB-EN")
        expect(response.location).toBe("Birmingham")
    })
})