import { UnknownPeerTypeException } from "../exceptions/unknownPeerType.exception";
import { PeerType } from "../models/peerTypes";
import { PeerRegistry } from "../registries/peer.registry";

export class PeerService {
    private peerRegistries: Map<PeerType, PeerRegistry>;

    constructor() {
        this.peerRegistries = new Map<PeerType, PeerRegistry>();
    }

    public addPeer(peerType: PeerType, ip: string, guid: string): void {
        let peerRegistry = this.peerRegistries.get(peerType);

        if (!peerRegistry) {
            peerRegistry = new PeerRegistry(5);
            this.peerRegistries.set(peerType, peerRegistry);
        }

        peerRegistry.addIp(ip, guid);
    }

    public getPeer(peerType: PeerType): string {
        const peerRegistry = this.peerRegistries.get(peerType);

        if (!peerRegistry) {
            throw new UnknownPeerTypeException(`No implementation found for Peer Type '${peerType}`);
        }

        return peerRegistry.getIp();
    }
}
