const Generator = require('yeoman-generator')

const MONGOOSE_DEPENDENCIES = [
  'mongoose',
  'mongoose-paginate'
]

class MongooseGenerator extends Generator {
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
    this.npmInstall(MONOOGSE_DEPENDENCIES, { save: true })
  }

}

module.exports = MongooseGenerator
