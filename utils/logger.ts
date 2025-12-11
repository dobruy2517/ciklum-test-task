import winston from 'winston';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `[${level.toUpperCase()}] ${timestamp}: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console()
    ]
});

export class Logger {
    static info(message: string) {
        logger.info(message);
    }

    static warn(message: string) {
        logger.warn(message);
    }

    static error(message: string) {
        logger.error(message);
    }
}