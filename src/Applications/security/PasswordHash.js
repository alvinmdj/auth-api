class PasswordHash {
  // eslint-disable-next-line class-methods-use-this
  async hash() {
    throw new Error('PASSWORD_HASH.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = PasswordHash;
