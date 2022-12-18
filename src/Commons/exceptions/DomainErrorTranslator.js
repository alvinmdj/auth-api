const InvariantError = require('./InvariantError');

const DomainErrorTranslator = {
  translate(error) {
    return DomainErrorTranslator._directories[error.message] || error;
  },
};

DomainErrorTranslator._directories = {
  'REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('cannot create user because request payload not contain needed property'),
  'REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('cannot create user because request payload does not meet data type specification'),
  'REGISTER_USER.USERNAME_LIMIT_CHAR': new InvariantError('cannot create user because username length more than 50 character'),
  'REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER': new InvariantError('cannot create user because username contain restricted character'),
};

module.exports = DomainErrorTranslator;
