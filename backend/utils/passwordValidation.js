const passwordValidator = require('password-validator')

const passVal = new passwordValidator()

{
    passVal
    .is().min(6) 
    .is().max(15)
    .has().uppercase()
    .has().lowercase()
    .has().digits(2)
    .has().not().spaces()
}


module.exports = passVal