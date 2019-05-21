import { logger } from "@blockr/blockr-logger/dist/logger";
import * as Sentry from "@sentry/node";
import * as express from "express";

import { errorHandlingMiddleware } from "./middleware/errorHandlingMiddleware";
import { ApiRouter } from "./routers/api.router";
import { PeerService } from "./services/peer.service";

const PORT = 8282;

export class App {
    public start(): void {
        this.initSentry();

        const router: ApiRouter = new ApiRouter(new PeerService());
        const server = this.initializeServer(express(), router);

        server.listen(PORT, () => {
            logger.info(`Server is running at 0.0.0.0:${PORT}`);
        });
    }

    private initializeServer(server: express.Express, router: ApiRouter): express.Application {
        server.use(errorHandlingMiddleware);
        router.configure();
        server.use(router.path, router.router);

        return server;
    }

    private initSentry(): void {
        Sentry.init({
            dsn: process.env.SENTRY_DSN,
            environment: process.env.SENTRY_ENVIRONMENT,
        });
    }
}
