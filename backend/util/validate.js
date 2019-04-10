var validate = require('mongoose-validator');

module.exports = {
    'nameValidator' : [
        validate({
            validator: 'isLength',
            arguments: [3, 50],
            message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters',
        }),
        validate({
            validator: 'isAlphanumeric',
            passIfEmpty: false,
            message: 'Name should contain alpha-numeric characters only',
        })
    ],
    'emailValidator' : [
        validate({
            validator: 'isEmail',
            message: 'Enter Valid Email Address'
        }),
    ],
    'phoneValidator' : [
        validate({
            validator: 'matches',
            arguments: ['^[0-9]{10}$'],
            message: 'Phone Number must be in 10 digits'
        })
    ]
}