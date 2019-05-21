import { Router } from "express";
import * as HttpStatus from "http-status-codes";

import { PeerService } from "../services/peer.service";

const ROUTE = "/api/v1";

/**
 * Handles the rest routes for the api.
 */
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

    /**
     * Configure the routes.
     */
    public configure(): void {
        // Get request /peerType
        this.router.get("/:peerType", (req, res) => {
            try {
                res.status(HttpStatus.OK).json(this.peerService.getPeer(req.params.peerType));
            } catch (error) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({error: error.message, type: error.name});
            }
        });

        // Post request /peerType?ip=ip&guid=guid
        this.router.post("/:peerType", (req, res) => {
            try {
                this.peerService.addPeer(req.params.peerType, req.query.ip, req.query.guid);
                res.status(HttpStatus.CREATED).send();
            } catch (error) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({error: error.message, type: error.name});
            }
        });
    }
}
