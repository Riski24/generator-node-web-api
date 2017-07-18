const Generator = require('yeoman-generator')

class ExpressGenerator extends Generator {
  constructor(args, options) {
    super(args, options)
  }

  initializing() {

  }

  prompting() {

  }

  writing() {
    this.log('writing express templates')
  }

  install() {
    this.log('installing express deps')
  }

}

module.exports = ExpressGenerator
