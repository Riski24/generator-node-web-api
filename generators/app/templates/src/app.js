import Promise from 'bluebird'
import moment from 'moment'
import winston from 'winston'

const TIMESTAMP_FORMAT = 'HH:mm:ss.SSS'
const IS_PRODUCTION = process.env.NODE_ENV === 'production'

async function main() {
  const logger = new winston.Logger()
    .add(winston.transports.Console, {
      timestamp: () => `[${moment().format(TIMESTAMP_FORMAT)}]`,
      colorize: true,
      level: IS_PRODUCTION ? 'info' : 'debug'
    })

  logger.info('Hello World!')
}


main()
