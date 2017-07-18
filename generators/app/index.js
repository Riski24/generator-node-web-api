const Generator = require('yeoman-generator')

const APP_DEPENDENCIES = [
  'bluebird',
  'lodash',
  'moment',
  'winston'
]

const APP_DEV_DEPENDENCIES = [
  'nodemon'
]

class AppGenerator extends Generator {
  constructor(args, options) {
    super(args, options)
  }

  initializing() {
    this.composeWith(require.resolve('../framework'))
    this.composeWith(require.resolve('../babel'))
  }

  prompting() {
    return this.prompt([{
      type: 'input',
      name: 'name',
      message: 'Enter the name of your app:',
      default: this.appname
    }, {
      type: 'input',
      name: 'description',
      message: 'Enter a brief description of your app:',
    }, {
      type: 'input',
      name: 'author',
      message: 'Enter your name:'
    }])
    .then((answers) => {
      this.props = answers
    })
  }

  writing() {
    this.fs.copy(
      this.templatePath('.'),
      this.destinationRoot(),
      { globOptions: { dot: true } }
    )

    this.fs.copyTpl(
      this.templatePath('./package.json'),
      this.destinationPath('./package.json'), {
        name: this.props.name,
        description: this.props.description,
        author: this.props.author
      }
    )
  }

  install() {
    this.npmInstall(APP_DEPENDENCIES, { save: true })
    this.npmInstall(APP_DEV_DEPENDENCIES, { 'save-dev': true })
  }

}

module.exports = AppGenerator
