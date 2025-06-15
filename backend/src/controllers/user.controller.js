const userService = require("../services/user.service");

// Get User Profile by JWT Token
const getUserProfile=async (req,res)=>{
    try {
        //Extract the JWT token from the "Authorization" header
        //[Bearer, token]
        const jwt= req.headers.authorization?.split(' ')[1];

        //If token is not provided
        if(!jwt){
            return res.status(404).send({error:"token not found"});
        }

        //get the user data by decoding the token
        const user=await userService.getUserProfileByToken(jwt);

        //Respond with the user data
        return res.status(200).send(user);

    } catch (error) {
        console.log("error from controller - ",error);
        return res.status(500).send({error:error.message});
    }
}

// Get All Users
const getAllUsers=async(req,res)=>{
    try {
        //Fetch all users from the database
        const users=await userService.getAllUsers();
        //Send the list of users in the response
        return res.status(200).send(users);
    } catch (error) {
        return res.status(500).send({error:error.message});
    }
}

// Export the controller functions to be used in routes
module.exports={getUserProfile,getAllUsers};