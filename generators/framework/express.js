const Generator = require('yeoman-generator')

class ExpressGenerator extends Generator {
  constructor(args, options) {
    super(args, options)
  }

  method1() {
    this.log('generating using Express')
  }

}

module.exports = ExpressGenerator
