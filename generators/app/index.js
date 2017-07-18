const Generator = require('yeoman-generator')

class AppGenerator extends Generator {
  constructor(args, options) {
    super(args, options)
  }

  initializing() {
    
  }

  prompting() {
    return this.prompt([{
      type: 'input',
      name: 'name',
      message: 'What is the name of your app?',
      default: this.appname
    }])
    .then((answers) => {
      this.log('appName:', answers.name)
      this.config.set('appName', answers.name)
    })
  }

  writing() {
    this.log('writing app templates')
  }

  install() {
    this.log('installing app deps')
  }

}

module.exports = AppGenerator
