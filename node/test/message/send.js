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
    const goodInput = generateInput();

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

    // No 'from' address
    it('it should fail on no \'from\' address', (done) => {
      request(chai, app, config, config.AUTH_KEY)
        .send({
          to: goodInput.to,
          content: goodInput.content
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    // Invalid 'from' address
    it('it should fail on invalid \'from\' address', (done) => {
      request(chai, app, config, config.AUTH_KEY)
        .send({
          ...goodInput,
          from: 'thisisarealemail@hatsoff'
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    // No 'to' address
    it('it should fail on no \'to\' address', (done) => {
      request(chai, app, config, config.AUTH_KEY)
        .send({
          from: goodInput.from,
          content: goodInput.content
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    // Invalid 'to' address
    it('it should fail on invalid \'to\' address', (done) => {
      request(chai, app, config, config.AUTH_KEY)
        .send({
          ...goodInput,
          to: 'woahrealhats@vroom@tomato.com'
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    // Invalid 'cc' address
    it('it should fail on invalid \'cc\' address', (done) => {
      request(chai, app, config, config.AUTH_KEY)
        .send({
          ...goodInput,
          cc: 'tinkleship@hat$s.com'
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    // Invalid 'bcc' address
    it('it should fail on invalid \'bcc\' address', (done) => {
      request(chai, app, config, config.AUTH_KEY)
        .send({
          ...goodInput,
          bcc: 'kevin..smith@emerg.net'
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    // Invalid subject
    it('it should fail on invalid \'subject\'', (done) => {
      request(chai, app, config, config.AUTH_KEY)
        .send({
          ...goodInput,
          subject: {
            text: "Hello World"
          }
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    // No content
    it('it should fail on no \'content\'', (done) => {
      request(chai, app, config, config.AUTH_KEY)
        .send({
          from: goodInput.from,
          to: goodInput.to
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    // Invalid content
    it('it should fail on invalid \'content\'', (done) => {
      request(chai, app, config, config.AUTH_KEY)
        .send({
          ...goodInput,
          content: 14239
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    // Empty content
    it('it should fail on empty \'content\'', (done) => {
      request(chai, app, config, config.AUTH_KEY)
        .send({
          ...goodInput,
          content: ''
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    // It should successfully send
    it('it should queue to send', (done) => {
      request(chai, app, config, config.AUTH_KEY)
        .send(goodInput)
        .end((err, res) => {
          res.should.have.status(202);
          // TODO: More validation if it was added to the queue
          throw new Error('todo - validate item added to queue and processed');
          done();
        });
    });
  });
}

// INTERNALS

function generateInput() {
  let input = {
    from: randomWords({ min: 2, max: 2, join: '@' }) + ".com",
    to: randomWords({ min: 2, max: 2, join: '@' }) + ".com",
    content: randomWords({ min: 12, max: 100, join: ' ' })
  };

  return input;
}
