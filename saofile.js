const superb = require('superb')

module.exports = {
  prompts() {
    return [
      {
        name: 'name',
        message: 'What is the name of the new project',
        default: this.outFolder,
        filter: val => val.toLowerCase(),
      },
      {
        name: 'description',
        message: 'How would you descripe the new project',
        default: `my ${superb()} project`,
      }
    ]
  },
  actions() {
    return [
      {
        type: 'add',
        files: '**',
      },
      {
        type: 'move',
        patterns: {
          gitignore: '.gitignore',
          '_package.json': 'package.json',
        },
      },
      {
        type: 'modify',
        files: 'package.json',
        handler: data => require('./lib/update-pkg')(this.answers, data),
      },
    ]
  },
  async completed() {
    this.gitInit()
    // await this.npmInstall()
    this.showProjectTips()
  },
}