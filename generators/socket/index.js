const Generator = require('yeoman-generator')

class SocketGenerator extends Generator {
  constructor(args, options) {
    super(args, options)
  }

  prompting() {
    return this.prompt([{
      type: 'confirm',
      name: 'socket-io',
      message: 'Would you like to enable Socket.io support?'
    }])
    .then((answers) => {
      this.log('enable socket-io:', answers['socket-io'])
    })
  }

}

module.exports = SocketGenerator
