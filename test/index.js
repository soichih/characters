const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require("jsonwebtoken")
const assert = require('assert');
const app = require('../server');

chai.use(chaiHttp);
chai.should();

const controller = require('../controller');

const password = "testpass";
const guestToken = jwt.sign({ username: "guest", scopes: ["user"] }, password, {
    algorithm: "HS256",
    expiresIn: 3600*24*10,
})
console.log("guestToken:", guestToken)

const adminToken = jwt.sign({ username: "admin", scopes: ["admin"] }, password, {
    algorithm: "HS256",
    expiresIn: 3600*24*10,
})
console.log("adminToken:", adminToken)

describe("controller", () => {
    describe("POST /api/ch", () => {
        it("post new character", (done) => {
             chai.request(app)
                 .post('/api/ch')
                 .set('Authorization', 'Bearer '+adminToken)
                 .send({ name: 'name', gender: 'male' })
                 .end((err, res) => {
                     res.should.have.status(200);
                     assert(res.body.message == "created new character!");
                     done();
                  });
         });
    });

    describe("GET /api/chs", () => {
        it("should get all characters", (done) => {
             chai.request(app)
                 .get('/api/chs')
                 .end((err, res) => {
                     res.should.have.status(200);
                     let last = res.body[res.body.length-1];
                     console.dir(last);
                     assert(last.name  == "name");
                     done();
                  });
         });
    });

    describe("clean up", ()=>{
        it("terminate", (done)=>{
            //TODO - close server
            done();
        });
    });
});


