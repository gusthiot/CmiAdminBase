var crypto = require('crypto');

var hashPwd = '384c649b3bad0104c1fba9e351d3649c2762e6dffafa32d9dfb8dad060bea6b6a6ba8f74177ba356640b3b25a7a0fd7cd46793ee11daa1cb982d71c6de4bdebb';
var saltPwd = 'f092ab72a2c90172';

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