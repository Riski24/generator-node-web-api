const Generator = require('yeoman-generator')

const BABEL_DEPENDENCIES = [
  'rimraf'
]

const BABEL_DEV_DEPENDENCIES = [
  'babel-cli',
  'babel-polyfill',
  'babel-register'
]

const ES2015_DEV_DEPENDENCIES = [
  'babel-plugin-transform-runtime',
  'babel-preset-es2015',
  'babel-preset-stage-2'
]

class BabelGenerator extends Generator {
  constructor(args, options) {
    super(args, options)
  }

  prompting() {
    //TODO: prompt the user for which Babel preset(s) they wish to use (ES2015, 2016, 2017)
  }

  writing() {
    this.fs.copy(
      this.templatePath('.'),
      this.destinationRoot(),
      { globOptions: { dot: true } }
    )
  }

  install() {
    this.npmInstall(BABEL_DEPENDENCIES, { save: true })
    this.npmInstall(BABEL_DEV_DEPENDENCIES, { 'save-dev': true })
    this.npmInstall(ES2015_DEV_DEPENDENCIES, { 'save-dev': true })
  }

}

module.exports = BabelGenerator
