const Relay = require('../src/index')

describe('ICloud Private Relay', () => {

    it('should validate ip address', () => {
        expect(Relay.isIpAddressValid("192.168.1.120")).toBeTruthy()

    })

    it('should not validate ip address', () => {
        expect(Relay.isIpAddressValid("292.168.1.120")).toBeFalsy()
    })

    it('should not be a validate ip address', () => {
        let response = Relay.isICloudPrivateRelayAddress("292.168.1.120")
        expect(response).rejects.toThrow('Invalid IP Address')
    })

    it('should not be an ICloud Private Relay', async () => {
        let response = await Relay.isICloudPrivateRelayAddress("192.168.1.120")
        expect(response).toBeFalsy()
    })


    it('should be an ICloud Private Relay', async () => {
        let ip = "172.224.224.72"
        let response = await Relay.isICloudPrivateRelayAddress(ip)
        expect(response).not.toBeFalsy()
        expect(response.ip).toBe(ip)
    })
})