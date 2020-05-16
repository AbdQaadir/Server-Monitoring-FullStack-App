process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = require('chai').expect;
const app = require('../server')
const chaiHttp = require('chai-http');
const User = require('../model/User')
chai.use(chaiHttp);



describe('it checks the server paths', function(){

    before(done => {
		User.destroy({
			where: {},
            truncate: true
		})
		.then(() => {
			// After we empty our database we create one user for our login test
			User.create({
				email: 'tested@email.com',
				password: 'abdul'
			})
			.then(() => done());
		});
	});


    it('Get method for / path', done => {
        chai
        .request(app)
        .get('/')
        .end((err, res) => {
            expect(res).to.have.status(200);
            done();
        })
    })


    it('Get method for /users/register path', done => {
        chai
        .request(app)
        .get('/users/register')
        .end((err, res) => {
            expect(res).to.have.status(200);
            done();
        })
    })


    it('Post method for /users/register', async function(){
        chai.request(app)
        .post('/users/register')
        .send({email: 'test@email.com', password: '(abdul)'})
        .end((err, res) => { 
           expect(res).to.have.status(200)            
            expect(res.body).to.be.an('object')
            // expect(res.body).to.have.property('session').to.be('string');
        })
    })

    it('Post method for /users/login path', async function(){
        chai.request(app)
         .post('/users/login')
         .send({email: 'tested@email.com', password: 'abdul'})
         .end((err, res) =>{
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            // expect(res.body).to.have.property('session').to.be.a('string');        
         })
     });
 
 
 
  
     
})