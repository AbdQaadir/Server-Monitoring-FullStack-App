const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = require('../server')

describe('it checks the server paths', function(){
    describe("Home Page", function(){
        it('ensures the / path returns success', done => {
            chai
                .request(app)
                .get('/')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                })
        })
    });


    describe("Registration Page", function(){
        it('check the /users/register path', done => {
            chai
                .request(app)
                .get('/users/register')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                })
        })
    });

    describe("Login Page", function(){
        it('check the /users/login path', done => {
            chai
                .request(app)
                .get('/users/login')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                })
        })
    });

  

    describe("Get Dashboard Page", function(){
        it('check the get method for /users/dashboard path', done => {
            chai
                .request(app)
                .get('/users/dashboard')                
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    // expect(res.body).to.not.be.empty;
                    done();
                })
        })
    });

    describe("Submit form on Registration Page", function () {
        it('check the post method /users/register path', done => {
            chai
                .request(app)
                .post('/users/register')
                .send({ name: "abd", email: "lateef", password: "(ola)9816", password2: "(ola)9816" })
                .end((err, res) => {
                    // console.log(res.body)
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    // expect(res.body.name).to.be.a('string');
                    // expect(res.body.email).to.be.a('string');
                    // expect(res.body.password).to.be.a('string');
                    // expect(res.body.password).to.equals(res.body.password2);
                    // expect(res.body.password2).to.be.a('string');
                    done();
                })
        })
    });  
})