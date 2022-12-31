/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
class PasswordHash {
  async hash() {
    throw new Error('PASSWORD_HASH.METHOD_NOT_IMPLEMENTED');
  }

  async compare(plain, encrypted) {
    throw new Error('PASSWORD_HASH.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = PasswordHash;
