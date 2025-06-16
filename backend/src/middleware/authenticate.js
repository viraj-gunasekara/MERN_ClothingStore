const jwtProvider = require("../config/jwtProvider")
const userService = require("../services/user.service")

//authenticate user requests using JWT
const authenticate = async(req,res,next)=>{

    try {
        //Extract the token from the Authorization header (Bearer <token>)
        const token = req.headers.authorization?.split(" ")[1]

        //If no token is found in the header
        if(!token){
            return req.status(404).send({message:"token not found"})
        }

        //Decode the token and extract the userId
        const userId = jwtProvider.getUserIdFromToken(token);
        //Find the user by the decoded userId
        const user = await userService.findUserById(userId);

        //Attach the user to the request object, next controllers to use it
        req.user=user;
    } catch (error) {
        return res.status(500).send({error:error.message})
    }

    //Proceed to the next
    next();
}

module.exports = authenticate;