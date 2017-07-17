const Generator = require('yeoman-generator')

class AppGenerator extends Generator {
  constructor(args, options) {
    super(args, options)
  }

  initializing() {
    this.composeWith(require.resolve('../framework'))
    this.composeWith(require.resolve('../socket'))
  }

  prompting() {
    return this.prompt([{
      type: 'input',
      name: 'name',
      message: 'What is the name of your project?',
      default: this.appname
    }])
    .then((answers) => {
      this.log('project name:', answers.name)
    })
  }

}

module.exports = AppGenerator
