const Generator = require('yeoman-generator')

const WEB_FRAMEWORK_CHOICES = ['Express', 'Koa']
const DEFAULT_WEB_FRAMEWORK = 0

class FrameworkGenerator extends Generator {
  constructor(args, options) {
    super(args, options)
  }

  prompting() {
    return this.prompt([{
      type: 'list',
      name: 'framework',
      message: 'Which web framework do you want to use?',
      choices: WEB_FRAMEWORK_CHOICES,
      default: DEFAULT_WEB_FRAMEWORK
    }])
    .then((answers) => {
      this.log('web framework:', answers.framework)
    })
  }

}

module.exports = FrameworkGenerator
