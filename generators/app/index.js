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
    }, {
      type: 'confirm',
      name: 'includeSocketIo',
      message: 'Do you want to enable Socket.io support?'
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
      this.destinationRoot(), {
        globOptions: {
          dot: true,
          ignore: [
            '**/auth.js',
            '**/io.js',
            '**/index.js'
          ]
        }
      }
    )

    // Copy index.js with template
    this.fs.copyTpl(
      this.templatePath('src/index.js'),
      this.destinationPath('src/index.js'), {
        includeSocketIo: this.props.includeSocketIo
      }
    )

    // If Socket.io is enabled, copy Socket.io provider
    if (this.props.includeSocketIo) {
      // Copy io.js with template
      this.fs.copy(
        this.templatePath('src/io.js'),
        this.destinationPath('src/io.js')
      )
    }

    // Copy .env.defaults as .env
    this.fs.copy(
      this.templatePath('.env.defaults'),
      this.destinationPath('.env')
    )

    // Copy package.json with templated values
    this.fs.copyTpl(
      this.templatePath('./package.json'),
      this.destinationPath('./package.json'), {
        name: this.props.name,
        description: this.props.description,
        author: this.props.author,
        includeSocketIo: this.props.includeSocketIo
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
