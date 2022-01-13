const Relay = require('../src/index')
jest.setTimeout(10000)
describe('ICloud Private Relay IPv6', () => {

    it('should validate IPv6 address', () => {
        expect(Relay.isIpAddressValidV6("2a02:26f7:b400:a3b2::")).toBeTruthy()

    })

    it('should not validate IPv6 address', () => {
        expect(Relay.isIpAddressValidV6("1:2:3::4:5::7:8")).toBeFalsy()
    })

    it('should not be a validate IPv6 address', () => {
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
        expect(response.ip).toBe(ip)
    })
})