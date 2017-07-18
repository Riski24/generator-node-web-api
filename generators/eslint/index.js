const Generator = require('yeoman-generator')

const ESLINT_DEV_DEPENDENCIES = [
  'babel-eslint',
  'eslint@^3.19.0',
  'eslint-config-airbnb-base',
  'eslint-plugin-import'
]


class EslintGenerator extends Generator {
  constructor(args, options) {
    super(args, options)
  }

  writing() {
    this.fs.copy(
      this.templatePath('.'),
      this.destinationRoot(),
      { globOptions: { dot: true } }
    )
  }

  install() {
    this.npmInstall(ESLINT_DEV_DEPENDENCIES, { 'save-dev': true })
  }

}

module.exports = EslintGenerator
