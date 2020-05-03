const execa = require('execa');

class Downloader {
  constructor() {

    /**
     * @type {Array<string>}
     */
    this.modules = [];
  }

  /**
   * @param {Array<string>} modules
   * @memberof Downloader
   */
  async downloadDevDeps(...modules) {
    const subprocess = execa('npm', ['install', '--save-dev', ...modules]);

    subprocess.stdout.pipe(process.stdout);
    await subprocess;
  }
}

module.exports = {
  downloader: new Downloader()
};
