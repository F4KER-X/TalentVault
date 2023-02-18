const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

//email validation
const correctEmail = async email => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
}

const uniqueEmail = async function (email) {
    const user = await this.constructor.findOne({ email })
    if (user) {
        return false;
    }
}
const emailValidators = [
    { validator: correctEmail, message: props => `${props.value} is not a valid email` },
    { validator: uniqueEmail, message: props => `${props.value} already exists` }
]

//password validation
const validLength = async pwd => {

    return !(pwd.length < 8)
}



const passwordValidators = [
    { validator: validLength, message: 'password must be at least 8 characters' }
]


const userSchema = mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, 'email is required'],
        validate: emailValidators
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        validate: passwordValidators
    },
    role: {
        type: String,
        enum: ['recruiter', 'applicant'],
        required: [true, 'roles is required']
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('User', userSchema)