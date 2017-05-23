const expect = require('chai').expect;
const assert = require('chai').assert;
const should = require('chai').should();
const supertest = require('supertest');


describe('REST API:', () => {
  let server;
  before((done) => {
    require('../task6');
    setTimeout(() => {
      server = supertest.agent('http://localhost:3000');
      done();
    }, 1000);
  });


  it('GET /portal-api/v1.0/users должен вернуть массив пользователей', done => {
    server
      .get('/portal-api/v1.0/users')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        res.body.should.be.instanceof(Array);
        done();
      });
  });

  it('POST /portal-api/v1.0/users должен создать пользователя и вернуть сообщение', done => {
    server
      .post('/portal-api/v1.0/users')
      .send({name: "test22", score: 22})
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        res.body.should.have.property('status');
        res.body.status.should.equal('ok');
        done();
      });
  });

  it('DELETE /portal-api/v1.0/users/5 должен удалить пользователя с указанным id и вернуть сообщение', done => {
    server
      .delete('/portal-api/v1.0/users/5')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        res.body.should.have.property('status');
        res.body.status.should.equal('ok');
        done();
      });
  });

});
