const userService = require("../services/user.service.js");
const jwtProvider = require("../config/jwtProvider.js");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    //Create a new user using data from the request body
    const user = await userService.createUser(req.body);

    //Generate a JWT token for the newly created user's _id
    const jwt = jwtProvider.generateToken(user._id);

    //Send a successful response with the JWT and a success message
    return res.status(200).send({ jwt, message: "register success" });

  } catch (error) {
    //500 Internal Server Error
    return res.status(500).send({ error: error.message });
  }
};

const login = async (req, res) => {

  // Destructure email and password from the incoming request body
  const {password,email}=req.body;

    try {
        //Try to find the user by their email
        const user = await userService.getUserByEmail(email);

        //If no user is found
        if (!user) {
            return res.status(404).json({ message: 'User not found With Email ', email});
        }

        //Compare the incoming password with the hashed password stored in db
        const isPasswordValid=await bcrypt.compare(password,user.password);

        //If the password is incorrect
        if(!isPasswordValid){
            return res.status(401).json({ message: 'Invalid password' });
        }

        //If the password is valid, generate a JWT token for user
        const jwt=jwtProvider.generateToken(user._id);

        //Return a success response with the JWTtoken
        return res.status(200).send({jwt,message:"login success"});

    } catch (error) {
        return res.status(500).send({error:error.message});
    }
};

module.exports = { register, login };
