let packageJson = {};

function checkNPMInit() {
  try {
    packageJson = require(require('path').posix.join(process.cwd(), 'package.json')) || {};
  } catch {
    throw new Error(`package.json not found at ${process.cwd()}`);
  }
}

/**
 * @param {string} mod
 * @returns
 */
function checkDependencyExists(mod) {
  const { dependencies } = packageJson;

  if (dependencies && dependencies[mod]) {
    return true;
  }
  return false;
}

/**
 * @param {string} mod
 * @returns
 */
function checkDevDependencyExists(mod) {
  const { devDependencies } = packageJson;

  if (devDependencies && devDependencies[mod]) {
    return true;
  }
  return false;
}

exports.checkNPMInit = checkNPMInit;
exports.checkDependencyExist = checkDependencyExists;
exports.checkDevDependencyExist = checkDevDependencyExists;
