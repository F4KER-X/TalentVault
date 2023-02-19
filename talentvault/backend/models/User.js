const mongoose = require('mongoose')
const bcrypt = require('bcrypt')





const userSchema = mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, 'email is required'],

    },
    password: {
        type: String,
        required: [true, 'password is required'],

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

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
});

module.exports = mongoose.model('User', userSchema)