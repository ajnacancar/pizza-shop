import {createLogger, transports, format} from 'winston';

const customFormat = format.combine(format.timestamp(), format.printf(( info) => {
    return `${info.timestamp} - [${info.level.toUpperCase()}] - ${info.message}`
}))
const logger = createLogger({
    format: customFormat,
    level: 'debug',
    transports: [
        new transports.Console(),
        new transports.File({filename: 'app.log', level: 'info'})
    ]
});

export default logger;
