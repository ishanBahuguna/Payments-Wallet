const express = require("express");
const z = require("zod")
const { Account } = require("../db")
const { User } = require("../db")
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../config")
const { authMiddleware}  = require("../middleware")

const router = express.Router();

const signupBody = z.object ({
    username : z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string() 
});

// User first time using the application
router.post("/signup" , async (req , res) => {
    // I want to use my error message to be displayed so using safeParse()
    const userValidate = signupBody.safeParse(req.body);

    if(!userValidate.success) {
        res.status(411).json({
            message : "Email already taken / Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({ 
        username : req.body.username,
    })

    if(existingUser) {
        res.status(411).json({
            message : "Email already taken / Incorrect inputs"
        })
    }

    const user = await User.create({
        username : req.body.username,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        password : req.body.password
    })

    const userId = user._id;
    const token = jwt.sign({
        userId
    },JWT_SECRET) 


    
    // create a new account:
    await Account.create({
        userId,
        balance : parseInt((1 + Math.random() * 10000))
    })

    res.status(200).json({ 
        message:"User created successfully", 
        token : token  
    })
})


const signinBody = z.object({
    username:z.string().email(),
    password:z.string()
})

// Existing user trying to signin 
router.post("/signin" , async (req , res) => {
    const { success } = signinBody.safeParse(req.body);
    
    if(!success) {
        res.status(411).json({
            message : "Incorrect Inputs"
        })
    }
 
    const user = await User.findOne({
        username : req.body.username,
        password : req.body.password
    })


    if(user) {
        const token = jwt.sign({
            userId:user._id
        }, JWT_SECRET)

        res.status(200).json({
            token:token
        })
        return
    }

    res.status(411).json({
        message: "Error while logging in"
    })
})

const updateBody = z.object ({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    password: z.string().optional()
});

// Existing user wants to update his information in DB
router.put("/" , authMiddleware ,  async (req , res) => {
    const {success}  = updateBody.safeParse(req.body)
    console.log(success)
    if(!success) {
        res.status(411).json({
            message:"Error in Input"
        })
    }

    await User.updateOne({
        _id : req.userId
    }, req.body)


    res.status(200).json({
        message: "Updated successfully"
    })
})


router.get("/bulk" , async (req , res) => {
    const filter = req.query.filter || "";

    // $or --> to do multiple queries in the DB and find match in the filter
    const users = await User.find({
        $or: [{
            firstName : {
                "$regex": filter // if filter is "" then all the users are returned
            }
        }, {
            lastName : { 
                "$regex": filter
            }
        }]
    })

    res.status(200).json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id:user._id
        }))
    })

})


module.exports = router;

