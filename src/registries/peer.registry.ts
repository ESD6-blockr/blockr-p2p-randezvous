import { RegistryEntry } from "../models/registryEntry";

export class PeerRegistry {
    public readonly connectionTimeoutDuration: number;
    private ipEntries: Map<string, RegistryEntry>;

    constructor(connectionTimeoutDuration: number) {
        this.connectionTimeoutDuration = connectionTimeoutDuration;
        this.ipEntries = new Map<string, RegistryEntry>();
    }

    public getIp(): string {
        const index: number = Math.floor(Math.random() * Math.floor(this.ipEntries.size - 1));

        return Array.from(this.ipEntries.keys())[index];
    }

    public addIp(ip: string, guid: string): void {
        const entry: RegistryEntry = new RegistryEntry(guid);

        this.ipEntries.set(ip, entry);
    }
}
