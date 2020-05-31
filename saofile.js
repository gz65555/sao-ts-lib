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
        default: `my typescript library`,
      }
    ]
  },
  actions() {
    return [
      {
        type: 'add',
        // Copy and transform all files in `template` folder into output directory
        files: '**'
      },
      {
        type: 'move',
        patterns: {
          gitignore: '.gitignore',
          'eslintrc.js': '.eslintrc.js',
          'babel.conf': 'babel.config.js',
          'prettierrc.js': '.prettierrc.js',
          'rollup.js': 'rollup.config.js',
          '_package.json': 'package.json',
        }
      }
    ]
  },
  async completed() {
    this.gitInit()
    // await this.npmInstall()
    this.showProjectTips()
  },
}