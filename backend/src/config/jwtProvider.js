require('dotenv').config();
const jwt = require('jsonwebtoken');

//secret key (random string) usually in .env file
const SECERET_KEY= "ehcnewinelcnewerjcnijv"

// Function to generate a JWT token for a given user ID
const generateToken=(userId)=>{

    // Create a token with userId, using secret key, expire in 48h
    const token=jwt.sign({userId},SECERET_KEY,{ expiresIn: '48h' })
    
    // Return the generated token
    return token;
}


// Function to extract the user ID from a given token
const getUserIdFromToken=(token)=>{
    // Verify the token using the secret key
    const decodedToken=jwt.verify(token,SECERET_KEY)

    // Extract and return the userId
    return decodedToken.userId
}


module.exports={generateToken,getUserIdFromToken};