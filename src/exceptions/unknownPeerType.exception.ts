export class UnknownPeerTypeException extends Error {
    public name: string;
    public message: string;

    constructor(message: string) {
        super(message);
        this.name = "UnknownPeerTypeException";
        this.message = message;
    }
}
