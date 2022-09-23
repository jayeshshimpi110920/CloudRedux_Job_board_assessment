
//While deployment on heroku getting an error so we did all things... in main server.js file only
// All task commented..!!










// import express from "express"
// import mongoose from "mongoose";
// // import User from "../models/user.js";
// const router = express.Router();

// router.patch("/users/saved_jobs", (req, res) => {

//     const { user_id, saved_jobs } = req.body;
//     User.findOneAndUpdate({ user_id: user_id },

//         {
//             $set: {
//                 saved_jobs: saved_jobs
//             }
//         }
//     )
//         .then((res) => {
//             console.log("patch sucessfull");
//         })
//         .catch(err => console.log("patch error"))

// })
// router.patch("/users/applied_jobs", (req, res) => {

//     const { user_id, saved_jobs, applied_job } = req.body;
//     User.findOneAndUpdate({ user_id: user_id },

//         {
//             $set: {
//                 applied_job: applied_job
//             }
//         }
//     )
//         .then((res) => {
//             console.log("Applied job updated..!!!");
//         })
//         .catch(err => console.log("Applied job Error..!!"))

// })
// export default router;