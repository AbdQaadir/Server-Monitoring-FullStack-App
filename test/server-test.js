const chai = require('chai');
const expect = require('chai').expect;
const app = require('../server')
const chaiHttp = require('chai-http');
const User = require('../model/User')
chai.use(chaiHttp);


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

    describe("Login Page", function(){
        it('check the /users/login path', done => {
            chai
                .request(app)
                .post('/users/login')
                .send({
                    name: "lateef Quadri",
                    email: 'test@fmail.com',
                    password: '123456',
                    password2: '123456'
                })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('object')
                    done();
                })
        })
    });

  
    // describe("Register Post Method", function () {
    //     it('checks the post method on /users/register', done => {
    //         chai
    //             .request(app)
    //             .post('/users/register')
    //             .send({
    //                 name: "lateef Quadri",
    //                 email: 'testsd@fmail.com',
    //                 password: '123456',
    //                 password2: '123456'
    //             })
    //             .end((err, res) => {
    //                 expect(res).to.have.status(200);
    //                 // expect(res.body).to.be.a('object');
    //                 done();
    //             })
    //     })
    // }); 

    describe("Get Dashboard Page", function () {
        it('check the get method for /users/dashboard path', done => {
            chai
                .request(app)
                .get('/users/dashboard')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                })
        })
    });

    describe("Registration Page", function () {
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

})