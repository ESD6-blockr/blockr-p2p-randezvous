import { RegistryEntry } from "../models/registryEntry";

/**
 * Handles the registration of ips.
 */
export class PeerRegistry {
    public readonly connectionTimeoutDuration: number;
    private readonly ipEntries: Map<string, RegistryEntry>;

    constructor(connectionTimeoutDuration: number) {
        this.connectionTimeoutDuration = connectionTimeoutDuration;
        this.ipEntries = new Map<string, RegistryEntry>();
    }

    /**
     * Get a random ip from this registry.
     */
    public getIp(): string {
        const index: number = Math.floor(Math.random() * Math.floor(this.ipEntries.size - 1));

        return Array.from(this.ipEntries.keys())[index];
    }

    /**
     * Add an ip to this registry.
     *
     * @param ip - the ip
     * @param guid - the guid
     */
    public addIp(ip: string, guid: string): void {
        const entry: RegistryEntry = new RegistryEntry(guid);

        this.ipEntries.set(ip, entry);
    }
}
