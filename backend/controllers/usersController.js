const User = require('../models/User')
const bcrypt = require('bcrypt')

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = async (req, res) => {
    const users = await User.find().select('-password').lean()
    if (!users) {
        return res.status(400).json({ message: 'No users found' })
    }
    res.json(users)
}

// @desc POST new user
// @route POST /users
// @access Private
const createNewUser = async (req, res) => {
    try {
        const { email, password, firstName, lastName, role, idAdmin } = req.body

        const userObject = { email, password, firstName, lastName, role, idAdmin }

        const user = await User.create(userObject)

        res.status(201).json({ message: `${user.email} has been added` })

    } catch (error) {
        if (error.name === 'ValidationError') {
            let errors = {}
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message
            });
            return res.status(400).send(errors)
        }
        res.status(500).send("Something went wrong")

    }
}

// @desc GET one user
// @route GET /users/:id
// @access Private
const getOneUser = async (req, res) => {
    const user = await User.findById(req.params['id']).select('-password -isAdmin')
    if (!user) {
        return res.status(400).json({ message: 'User does not exist' })
    }
    res.json(user)
}

// @desc PATCH user
// @route PTACH /users/:id
// @access Private
const updateUser = async (req, res) => {
    // const user = await User.findById(req.params['id'])
    // if (!user) {
    //     return res.status(400).json({ message: 'User does not exist' })
    // }

    // const { email, password, firstName, lastName, isAdmin } = req.body

    // user.email = email
    // user.password = password
    // user.firstName = firstName
    // user.lastName = lastName
    // user.isAdmin = isAdmin

    // //custome validation
    // if (user.email) {
    //     if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email)) {
    //         const duplicate = await User.findOne({ email }).lean().exec()
    //         if (duplicate?.duplicate._id != user._id) {
    //             return res.status(400).json({ message: `${user.email} already exists` })
    //         }
    //     } else {
    //         return res.status(400).json({ message: `${user.email} is not a valid email` })
    //     }
    // }


    user.save({ validateBeforeSave: false, skipValidation: { email: true } }, function (error) {
        if (error) {
            console.error(error);
        } else {
            console.log('User saved successfully');
            res.json({ message: "updated" })
        }
    });


}

// @desc DELETE user
// @route DELETE /users/:id
// @access Private
const deleteUser = async (req, res) => {
    //have to check if the user has any jobs application or created any open jobs once we implement the jobs model

    const user = await User.findById(req.params['id']).exec()
    if (!user) {
        return res.status(400).json({ message: 'User does not exist' })
    }

    const result = await user.deleteOne()

    res.status(201).json({ message: `${result._id} with email ${result.email} has been deleted` })
}

module.exports = { getAllUsers, createNewUser, getOneUser, updateUser, deleteUser }