const Generator = require('yeoman-generator')

const EXPRESS_DEPENDENCIES = [
  'body-parser',
  'cookie-parser',
  'express'
]

class ExpressGenerator extends Generator {
  constructor(args, options) {
    super(args, options)
  }

  initializing() {

  }

  prompting() {

  }

  writing() {
    this.log('Writing Express app template...')
  }

  install() {
    this.npmInstall(EXPRESS_DEPENDENCIES, { save: true })
  }

}

module.exports = ExpressGenerator
