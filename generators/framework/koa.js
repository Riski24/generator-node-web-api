const Generator = require('yeoman-generator')

class KoaGenerator extends Generator {
  constructor(args, options) {
    super(args, options)
  }

  method1() {
    this.log('generating using Koa')
  }

}

module.exports = KoaGenerator
