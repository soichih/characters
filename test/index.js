const jwt = require("jsonwebtoken")

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
console.log("token:", adminToken)
