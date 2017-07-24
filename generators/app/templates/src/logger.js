import moment from 'moment'
import winston from 'winston'

const TIMESTAMP_FORMAT = 'HH:mm:ss.SSS'

export default function Logger() {
  const logger = new winston.Logger()
    .add(winston.transports.Console, {
      timestamp: () => `[${moment().format(TIMESTAMP_FORMAT)}]`,
      colorize: true,
      prettyPrint: true,
      level: process.env.NODE_ENV === 'production' ? 'info' : 'debug'
    })

  // Place any additional initialization code here
  
  return logger
}
