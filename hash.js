var crypto = require('crypto');
var fs = require('fs');

var file = JSON.parse(fs.readFileSync('hash.json', 'utf8'));
var hashPwd = file.hashPwd;
var saltPwd = file.saltPwd;

var genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
        .toString('hex')
        .slice(0,length);
};

var sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};

function saltHashPassword(userpassword) {
    var salt = genRandomString(16);
    var passwordData = sha512(userpassword, salt);
    console.log('UserPassword = '+userpassword);
    console.log('Passwordhash = '+passwordData.passwordHash);
    console.log('Salt = '+passwordData.salt);
}

exports.saltHashTest = function(userpassword) {
    var passwordData = sha512(userpassword, saltPwd);
    console.log('Passwordhash = '+passwordData.passwordHash);
    return (passwordData.passwordHash == hashPwd);
};