const Generator = require('yeoman-generator')

const SOCKET_IO_DEPENDENCIES = [
  'socket.io'
]

class SocketGenerator extends Generator {
  constructor(args, options) {
    super(args, options)
  }

  prompting() {
    // TODO: Ask the user if they want Socket.io support, for now assume they do
  }

  writing() {
    this.fs.copy(
      this.templatePath('.'),
      this.destinationRoot(),
      { globOptions: { dot: true } }
    )
  }

  install() {
    this.npmInstall(SOCKET_IO_DEPENDENCIES, { save: true })
  }

}

module.exports = SocketGenerator
