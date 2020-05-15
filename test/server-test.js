process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = require('chai').expect;
const app = require('../server')
const chaiHttp = require('chai-http');
const User = require('../model/User')
chai.use(chaiHttp);



describe('it checks the server paths', function(){

    it('ensures the / path returns success', done => {
        chai
        .request(app)
        .get('/')
        .end((err, res) => {
            expect(res).to.have.status(200);
            done();
        })
    })


    it('check the /users/register path', done => {
        chai
        .request(app)
        .get('/users/register')
        .end((err, res) => {
            expect(res).to.have.status(200);
            done();
        })
    })


    it('should return true', async function(){
        chai.request(app)
         .post('/users/login')
         .send({email: 'test@email.com', password: '(abdul)'})
         .then(res=>{
             if(res.status != 200){
                 return expect(res).to.have.status(300)
             } else {
                 expect(res).to.have.status(300)
                 expect(res.body).to.be.an('object')
                 expect(res.body).to.have.property('session').to.be.a('string');
                 expect(res.body).to.have.property('session').to.not.be.null;
             };
         })
     });
 
 
 
     it('should return true', async function(){
         chai.request(app)
         .post('/users/register')
         .send({email: 'test@email.com', password: '(abdul)'})
         .then(res => { 
             expect(res).to.have.status(200)
             expect(res.body).to.be.an('object')
             expect(res.body).to.have.property('session').to.be.a('string');
             expect(res.body).to.have.property('session').to.not.be.null;
         })
     })

     
})