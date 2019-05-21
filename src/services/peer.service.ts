import { UnknownPeerTypeException } from "../exceptions/unknownPeerType.exception";
import { PeerType } from "../models/peerTypes";
import { PeerRegistry } from "../registries/peer.registry";

const CONNECTION_TIMEOUT_DURATION_MINUTES = 5

/**
 * Handles the Peer Registries.
 */
export class PeerService {
    private readonly peerRegistries: Map<PeerType, PeerRegistry>;

    constructor() {
        this.peerRegistries = new Map<PeerType, PeerRegistry>();
    }

    /**
     * Get a peer of the given peer type.
     *
     * @param peerType - The peer type
     *
     * @Throws UnknownPeerTypeException - if no implementation for the given peer type is found
     */
    public getPeer(peerType: PeerType): string {
        const peerRegistry = this.peerRegistries.get(peerType);

        if (!peerRegistry) {
            throw new UnknownPeerTypeException(`No implementation found for Peer Type '${peerType}`);
        }

        return peerRegistry.getIp();
    }

    /**
     * Add a peer to the registry of the given peer type.
     * If there is no registry of the given peer type, a new registry will be created.
     *
     * @param peerType - The peer type
     * @param ip - the ip
     * @param guid - the guid
     */
    public addPeer(peerType: PeerType, ip: string, guid: string): void {
        let peerRegistry = this.peerRegistries.get(peerType);

        if (!peerRegistry) {
            peerRegistry = new PeerRegistry(CONNECTION_TIMEOUT_DURATION_MINUTES);
            this.peerRegistries.set(peerType, peerRegistry);
        }

        peerRegistry.addIp(ip, guid);
    }
}
