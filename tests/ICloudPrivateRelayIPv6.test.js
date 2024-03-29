const Relay = require('../src/index')
jest.setTimeout(10000)
describe('ICloud Private Relay IPv6', () => {

    it('should not be a validate IPv6 address',  () => {
        let response = Relay.isICloudPrivateRelayAddress("1:2:3::4:5::7:8")
        expect(response).rejects.toThrow('Invalid IP Address')
    })

    it('should not be an ICloud Private Relay v6', async () => {
        let response = await Relay.isICloudPrivateRelayAddress("2a10:4646:16::")
        expect(response).toBeFalsy()
    })

    it('should be an ICloud Private Relay in v6', async () => {
        let ip = "2a02:26f7:b3c0:4000::"
        let response = await Relay.isICloudPrivateRelayAddress(ip)
        expect(response).not.toBeFalsy()
        expect(response.cidr.address.addressMinusSuffix).toBe(ip)
        expect(response.countryCode).toBe("US")
        expect(response.regionCode).toBe("US-CA")
        expect(response.location).toBe("Los Angeles")
    })
})