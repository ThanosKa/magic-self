import pino, { type DestinationStream, type LoggerOptions } from "pino";

const isDev = process.env.NODE_ENV !== "production";
const isWorkerRuntime =
  typeof navigator !== "undefined" &&
  navigator.userAgent === "Cloudflare-Workers";

const options: LoggerOptions = {
  level: process.env.LOG_LEVEL || (isDev ? "debug" : "info"),
  // pino-pretty runs in a worker thread, which the Workers runtime does not offer.
  ...(isDev &&
    !isWorkerRuntime && {
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
          ignore: "pid,hostname",
        },
      },
    }),
};

/**
 * Sends pino's JSON lines to the console. pino's default destination calls
 * fs.writeSync in a form the Workers runtime rejects, so every log call throws there.
 */
const consoleDestination: DestinationStream = {
  write(line) {
    console.log(line.trimEnd());
  },
};

export const logger = isWorkerRuntime
  ? pino(options, consoleDestination)
  : pino(options);
