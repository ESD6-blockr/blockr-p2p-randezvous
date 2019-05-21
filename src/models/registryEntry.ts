/**
 * This class represents an entry in the peer registry.
 */
export class RegistryEntry {
    public readonly guid: string;
    public lastCommunication: Date;

    constructor(guid: string) {
        this.guid = guid;
        this.lastCommunication = new Date();
    }

    /**
     * Update the last communication moment to the current date.
     */
    public updateLastCommunication(): void {
        this.lastCommunication = new Date();
    }

    /**
     * Check if this entry is older than the given date.
     *
     * @param date - The date
     *
     * @returns True if this entry is older than the given date, false if otherwise
     */
    public isOlderThan(date: Date): boolean {
        return this.lastCommunication < date;
    }
}
