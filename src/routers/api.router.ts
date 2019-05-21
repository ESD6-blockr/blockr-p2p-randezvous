import { Router } from "express";

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
        this.router.get("/:peerType", (req, res) => {
            try {
                res.status(200).json(this.peerService.getPeer(req.params.peerType));
            } catch (error) {
                res.status(500).send({error: error.message, type: error.name});
            }
        });

        this.router.post("/:peerType", (req, res) => {
            try {
                this.peerService.addPeer(req.params.peerType, req.query.ip, req.query.guid);
                res.status(201).send();
            } catch (error) {
                res.status(500).send({error: error.message, type: error.name});
            }
        });
    }
}
