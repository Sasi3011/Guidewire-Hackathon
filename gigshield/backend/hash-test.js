const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const password = 'password123';
const saltRounds = 10;
const usersPath = path.join(__dirname, 'users.json');

const hash = bcrypt.hashSync(password, saltRounds);

const users = JSON.parse(fs.readFileSync(usersPath));
users[0].password = hash;

fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));

console.log(`Updated Ravi's password to: ${password}`);
console.log(`With Hash: ${hash}`);
