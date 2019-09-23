const randomInt = require('random-int');
const randomWords = require('random-words');

module.exports = {
  test: test
};

// EXPORTS

function request(chai, app, config, authKey) {
  let chaiRequest = chai.request(app)
      .post(`${config.BASE_PATH}/message`);
  if (authKey) {
    chaiRequest = chaiRequest.set(config.AUTH_FIELD, `${config.AUTH_KEY_PREFIX}${authKey}`);
  }
  return chaiRequest;
}

function test(chai, app, config) {
  describe('POST / : send message', () => {

    // Fail on lack of an auth key
    it('it should fail without any auth key', (done) => {
      request(chai, app, config)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    // Fail on invalid auth key
    it('it should fail with an invalid auth key', (done) => {
      request(chai, app, config, 'InvalidAndIncorrectKey')
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    // No input provided
    it('it should fail on no post input', (done) => {
      request(chai, app, config, config.AUTH_KEY)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    // TODO! Full coverage testing
    it('it should have more tests', (done) => {
      done(new Error('not implemented'));
    });
  });
}
