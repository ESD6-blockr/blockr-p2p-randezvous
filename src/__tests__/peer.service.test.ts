import { PeerType } from "../models/peerTypes";
import { PeerService } from "../services/peer.service";
import { TestGuids, TestIps } from "./testAdresses";

let peerService: PeerService;

beforeEach(() => {
    peerService = new PeerService();
});

describe("Adding peers to the service and retrieving them", () => {
    it("Should succeed", () => {
        peerService.addPeer(PeerType.VALIDATOR, TestIps.TEST_1, TestGuids.TEST_1);
        const ip = peerService.getPeer(PeerType.VALIDATOR);

        expect(ip).not.toBeNull();
        expect(ip).toMatch(TestIps.TEST_1);
    });

    it("Should succeed", () => {
        peerService.addPeer(PeerType.VALIDATOR, TestIps.TEST_2, TestGuids.TEST_2);
        peerService.addPeer(PeerType.IPFS, TestIps.TEST_3, TestGuids.TEST_3);
        const validatorIp = peerService.getPeer(PeerType.VALIDATOR);
        const ipfsIp = peerService.getPeer(PeerType.IPFS);

        expect(validatorIp).not.toBeNull();
        expect(validatorIp).toMatch(TestIps.TEST_2);

        expect(ipfsIp).not.toBeNull();
        expect(ipfsIp).toMatch(TestIps.TEST_3);
    });

    it("Should succeed", () => {
        peerService.addPeer(PeerType.VALIDATOR, TestIps.TEST_1, TestGuids.TEST_1);
        peerService.addPeer(PeerType.VALIDATOR, TestIps.TEST_2, TestGuids.TEST_2);
        const validatorIp = peerService.getPeer(PeerType.VALIDATOR);
        const validatorIp2 = peerService.getPeer(PeerType.VALIDATOR);

        expect(validatorIp).not.toBeNull();
        expect(validatorIp2).not.toBeNull();

        expect([TestIps.TEST_1, TestIps.TEST_2]).toContain(validatorIp);
        expect([TestIps.TEST_1, TestIps.TEST_2]).toContain(validatorIp2);
    });
});

describe("Retrieving peers of types that are not yet added", () => {
    it("Should throw an UnknownPeerTypeException", () => {
        try {
            peerService.getPeer(PeerType.SMART_CONTRACT);
        } catch (error) {
            expect(error.name).toBe("UnknownPeerTypeException");
            expect(error.message).toBe(`No implementation found for Peer Type 'smart_contract'`);
        }
    });
});
