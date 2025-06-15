const User = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwtProvider=require("../config/jwtProvider")

// Function to create a new user
const createUser = async (userData) => {
  try {
    // Destructure user input data
    let { firstName, lastName, email, password, role } = userData;

    // Check if a user with the same email already exists
    const isUserExist = await User.findOne({ email });

    // If user exists, throw an error
    if (isUserExist) {
      throw new Error("user already exist with email : " +email);
    }

    // Hash the user's password using bcrypt with a salt round of 8
    password = await bcrypt.hash(password, 8);

    // Create a new user in the database
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      role,
    });

    // Show the created user to the console
    console.log("user ", user);

    // Return the created user object
    return user;
  } catch (error) {
    // If any error occurs
    console.log("error - ", error.message);
    throw new Error(error.message);
  }
};

// Function to find a user by their MongoDB _id
const findUserById=async(userId)=>{
    try {
        // Try to find the user in the database by _id
        const user = await User.findById(userId);

        // If user not found, throw an error
        if(!user){
            throw new Error("user not found with id : " +userId)
        }

        //if found Return the found user
        return user;
    } catch (error) {
        //error msg
        console.log("error :------- ",error.message)
        throw new Error(error.message)
    }
};

// Function to find a user by their Email
const getUserByEmail=async(email)=>{
    try {

        const user=await User.findOne({email});

        if(!user){
            throw new Error("user found with email : " +email)
        }

        return user;
        
    } catch (error) {
        console.log("error - ",error.message)
        throw new Error(error.message)
    }
}

// Function to get a user profile using a JWT token
const getUserProfileByToken=async(token)=>{
    try {

        // Extract the user ID from the provided JWT token
        const userId=jwtProvider.getUserIdFromToken(token)

        console.log("userr id ",userId)

        // Find the user by ID
        const user = await findUserById(userId);
        
        // Set the password field to null before returning the user (to protect sensitive info)
        user.password=null;
        
        // If no user found
        if(!user){
            throw new Error("user not exist with id : " +userId)
        }

        // Return the found user profile
        return user;
    } catch (error) {
        console.log("error ----- ",error.message)
        throw new Error(error.message)
    }
}

// Function to retrieve all users from the database
const getAllUsers=async()=>{
    try {
        
        // Fetch all user documents from the 'users' collection
        const users=await User.find();

        // Return the list of users
        return users;
    } catch (error) {
        console.log("error - ",error)
        throw new Error(error.message)
    }
}

module.exports={createUser, findUserById, getUserByEmail, getUserProfileByToken, getAllUsers}