
//While deployment on heroku getting an error so we did all things... in main server.js file only
// All task commented..!!







// import express from "express"
// import mongoose from "mongoose";
// import jwt from "jsonwebtoken"
// const router = express.Router();
// import bcrypt from "bcrypt";
// // import User from "../models/user.js";
// // const jwt = require("jsonwebtoken");
// // import jwt from "jsonwebtoken"

// const maxAge = 1 * 24 * 60 * 60;
// const createToken = (id) => {
//     return jwt.sign({ id }, "super_secret_key", {
//         expiresIn: maxAge,
//     });
// };
// async function comparePassword(plaintextPassword, hash) {
//     const result = await bcrypt.compare(plaintextPassword, hash);
//     return result
// }

// router.post('/login', async function (req, res) {
//     const { email, password } = req.body;

//     try{
//         await User.findOne({ email: email }, async(err, user) => {
//             if(user===null){
//                 res.status(400).send({error:"User not Found" , check:"USER_NOT_FOUND"});
//                 return;
//             }
//             const token = createToken(user.email)
//             // res.cookie(("jayjwt"), token, { httpOnly: false, maxAge: maxAge * 1000 });
    
//             const validPassword =await comparePassword(password, user.password);
//             console.log(validPassword)
//             if (validPassword) {
//                 res.status(200).send({user , token});
//                 return;
//             } else {
//                 res.status(400).send({error:"Wrong PassWord" , check:"WRONG_PASSWORD"})
//                 return;
//             }
//             // .then(result => res.send({user , token})) 
//         }
//         )
//     }
//     catch(err){
//         res.status(400).send({error:"User not Found" , check:"USER_NOT_FOUND"})
//     }
    
//     // res.end
// });

// router.post("/register", async (req, res) => {
//     const { name, email, password, user_id, saved_jobs, applied_job, my_reviews } = req.body;
//     let hashedPassword = await bcrypt.hash(password, 10);
//     User.findOne({ email: email }, (err, user) => {
//         if (user) {
//             res.send({ message: "ALREADY_REGISTER" })
//         } else {

//             const user = new User({
//                 name,
//                 email,
//                 password: hashedPassword,
//                 user_id,
//                 saved_jobs,
//                 applied_job,
//                 my_reviews
//             })

//             user.save(err => {
//                 if (err) {
//                     res.send(err)
//                 } else {
//                     res.send({ message: "Successfully Registered, Please login now." })
//                 }
//             })
//         }
//     })

// })


// //jwt
// router.get('/jwt', async (req, res) => {
// 	const token = req.headers['x-access-token']

// 	try {
// 		const decoded = jwt.verify(token, 'super_secret_key');
//         // console.log(decoded);
// 		const email = decoded.id;
        
// 		const user = await User.findOne({ email: email })
//         console.log(user)
//         if(user){
//             return res.status(201).send({user})
//         }
		
//         return res.status(401).send({status:'fail'})
// 	} catch (error) {
// 		console.log(error)
// 		res.send({ status: 'error', error: 'invalid token' })
// 	}
// })






// export default router;