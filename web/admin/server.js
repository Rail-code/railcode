import { createRequestHandler } from "@remix-run/express";
import { createProxyMiddleware } from "http-proxy-middleware";

import express from "express";
import compression from "compression";
import helmet from "helmet";
import morgan from "morgan";

import "dotenv/config";

//Env
const iDev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;

const handlers = {
    dev: null,
    remix: null,
};

//Create vite dev
if (iDev) {
    try {
        handlers.dev = await import("vite").then((vite) =>
            vite.createServer({
                server: { middlewareMode: true },
            }),
        );
    } catch (error) {
        console.error("Failed to create Vite dev server:", error);
        process.exit(1);
    }
}

const app = express();

// Security middleware
app.use(helmet());

//Compress requests
app.use(compression());

// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable("x-powered-by");

// handle vite dev middleware requests
if (handlers.dev) {
    app.use(handlers.dev.middlewares);
} else {
    // Vite fingerprints its assets, so we can cache forever.
    app.use("/assets", express.static("build/client/assets", { immutable: true, maxAge: "1y" }));
}

// Everything else (like favicon.ico) is cached for an hour. You may want to be
// more aggressive with this caching.
app.use(express.static("build/client", { maxAge: "1h" }));

// Logging middleware
app.use(morgan("tiny"));

/**
 * Create proxy - API core
 */
app.use(
    "/api/",
    createProxyMiddleware({
        target: process.env.VITE_API_CORE,
        changeOrigin: true,
        logger: console,
        logLevel: "debug",
        pathRewrite: { "^": "api" },
    }),
);

/**
 * Create server
 */
const server = async () => {
    try {
        //If env is "dev" create vite remix server
        if (handlers.dev) {
            handlers.remix = {
                build: () => handlers.dev.ssrLoadModule("virtual:remix/server-build"),
            };
        } else {
            //Import build
            handlers.remix = { build: await import(path.join(process.cwd(), "build/server/index.js")) };
        }

        app.all("*", createRequestHandler(handlers.remix));

        app.listen(port, () => {
            console.log(`Server listening at http://localhost:${port}`);
        });
    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1);
    }
};

server().catch((error) => {
    console.error(error);
    process.exit(1);
});
