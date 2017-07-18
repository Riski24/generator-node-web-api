const Generator = require('yeoman-generator')

class AppGenerator extends Generator {
  constructor(args, options) {
    super(args, options)
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
      // Replace whitespace with a single dash in app name
      answers.name = answers.name.replace(/\s+/g, '-')
      this.props = answers
    })
  }

  writing() {
    // Copy files and folders
    this.fs.copy(
      this.templatePath('.'),
      this.destinationRoot(),
      { globOptions: { dot: true } }
    )

    // Copy .env.example as .env
    this.fs.copy(
      this.templatePath('.env.example'),
      this.destinationPath('.env')
    )

    // Copy package.json with templated values
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
    this.installDependencies({
      npm: true,
      bower: false
    })
  }

}

module.exports = AppGenerator
