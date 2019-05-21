import { Router } from "express";
import { UnknownPeerTypeException } from "../exceptions/unknownPeerType.exception";

import { PeerService } from "../services/peer.service";

const ROUTE = "/api/v1";

export class ApiRouter {
    public path: string;
    public router: Router;

    private readonly peerService: PeerService;

    constructor(peerService: PeerService) {
        this.path = ROUTE;
        this.peerService = peerService;
        this.router = Router();

        this.router.use(this.path, this.router);
    }

    public configure(): void {
        this.router.get("/:peerType", (req, res, next) => {
            try {
                res.status(200).send(this.peerService.getPeer(req.params.peerType));
                next();
            } catch (error) {
                next(new UnknownPeerTypeException("test"));
            }
        });

        this.router.post("/:peerType", (req, res, next) => {
            try {
                this.peerService.addPeer(req.params.peerType, req.params.ip, req.params.guid);
                res.status(201).send();
                next();
            } catch (error) {
                next(error);
            }
        });
    }
}
