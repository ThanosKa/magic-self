import pino from "pino"

const isDev = process.env.NODE_ENV !== "production"

export const logger = pino({
  level: process.env.LOG_LEVEL || (isDev ? "debug" : "info"),
  ...(isDev && {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "SYS:standard",
        ignore: "pid,hostname",
      },
    },
  }),
})

// Create child loggers for different modules
export const createLogger = (module: string) => logger.child({ module })

// Pre-configured loggers for common modules
export const aiLogger = createLogger("ai")
export const uploadLogger = createLogger("upload")
export const pdfLogger = createLogger("pdf")
export const dbLogger = createLogger("db")
