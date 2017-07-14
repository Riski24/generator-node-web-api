const Generator = require('yeoman-generator')

class AppGenerator extends Generator {
  constructor(args, options) {
    super(args, options)
  }

  method1() {
    this.log('method 1 did execute')
  }

  method2() {
    this.log('method 2 did execute')
  }
}

module.exports = AppGenerator
