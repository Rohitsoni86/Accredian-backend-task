const UserModel = require("../models/userModel")
const Joi = require("joi");
const bcrypt = require("bcrypt");


const { generateToken } = require("../middlewares/generateToken");

// ************************************************* CREATE USER ********************************************************************

const createNewUser = async (req, res, next) => {
    const userDetails = req.body;
    console.log(userDetails);

    // JOI VALIDATION

    const registerUserSchema = Joi.object({
        UserName: Joi.string().min(3).required(),
        Email: Joi.string().email().lowercase().required(),
        Password: Joi.string().min(7).required().strict(),
    });

    //options
    const Options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true,
    };

    //Validate reqbody

    const { error, value } = registerUserSchema.validate(req.body, Options);

    if (error) {
        res
            .status(501)
            .send(
                `Error :: ${error.details.map((error) => error.message).join(",")}`
            );
    } else {
        console.log("No Error !!");

        // USUAL VALIDATION


        try {
            const [checkUser, _] = await UserModel.findUserEmail(userDetails.Email);

            console.log(checkUser.length);

            // length 0 means no user exists

            //if User Already There Then
            if (checkUser.length) {
                res.status(503).send("User Already Exists !! \n Try Login ");
            }
            // If User Does Not Exists then Proceed
            else {

                try {
                    console.log("Creating New User !!");

                    // HASING PASSWORD
                    bcrypt.hash(userDetails.Password, 12, async function (err, hash) {
                        if (err) {
                            console.log("Internal Server Error !! \n Please Try Again !!");
                            console.log(err);
                            res
                                .status(500)
                                .send("Internal Server Error !! \n Please Try Again !!");
                        } else {
                            userDetails.Password = hash;
                            console.log(userDetails);

                            // NEWW
                            let newUser = new UserModel(userDetails.UserName, userDetails.Email, userDetails.Password)

                            let newUserF = await newUser.saveUserData()

                            console.log(newUserF);
                            console.log("Added New User To DB !!");
                            res.status(200).send("Added New User To DB !!")

                        }
                    });
                } catch (error) {
                    console.log("Something Went Wrong Creating New User !!");
                    res
                        .status(500)
                        .send(
                            "Internal Server Error \n Something Went Wrong Creating New User !!  Try Again !! "
                        );
                }
            }
        }
        catch (err) {
            console.log(`Error :: `, err);
            res
                .status(500)
                .send(
                    "Internal Server Error \n Something Went Wrong Creating New User !!  Try Again !! "
                );
        }
    }
};




// ************************************************************* LOGIN ******************************************************************


const verifyUser = async (req, res, next) => {
    const userDetails = req.body;
    console.log(userDetails);
    console.log("Login User Req !");

    // JOI VALIDATION

    const userSchemaVa = Joi.object({
        UserName: Joi.string().min(3).required(),
        Password: Joi.string().min(7).required().strict(),
    });

    //options
    const Options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true,
    };

    //Validate reqbody

    const { error, value } = userSchemaVa.validate(req.body, Options);

    if (error) {
        res.status(501).send(` ${error.details.map((error) => error.message).join(",")}`);
    } else {
        console.log("No Validation Error !!");

        // USUAL VALIDATION
        const [User, _] = await UserModel.findUserByUserName(req.body.UserName);
        console.log(User);
        console.log(User[0]);
        console.log(User.length);

        // PROCEEDING

        //if User Exists There Then

        if (User.length) {
            try {
                console.log("User Login Request !!");

                // Decrypting PASSWORD
                bcrypt.compare(
                    userDetails.Password,
                    User[0].user_password,
                    async function (err, result) {
                        if (err) {
                            console.log("Password Do Not Match !! \n Please Try Again !!");
                            console.log(err);
                            res
                                .status(500)
                                .send("Password Do Not Match !! \n Please Try Again !!");
                        } else {
                            console.log(result);
                            if (result) {
                                // if user found then send success message !!
                                const tokenG = generateToken(User[0]); //generate Token With Ad Details
                                console.log("Generated Token Success !! \n");
                                console.log(tokenG);
                                res.status(200).send({ Token: `${tokenG}` }); // Flag:86 for Admin && Flag:96 for Reporter User
                                console.log("Login Success & Token Sent !!");
                            } else {
                                console.log("Password Do Not Match !! \n Please Try Again !!");
                                res.status(404).send("Password Do Not Match !! \n Please Try Again !!");
                            }
                        }
                    }
                );
            } catch (error) {
                console.log("Something Went Wrong Login User !!");
                res.status(500).send("Internal Server Error \n Something Went Wrong Login User !!  Try Again !! ");
            }
        }
        // If User Does Not Exists then Proceed
        else {
            res.status(503).send("User Does Not Exists !! \n Try Signup ");
        }

    }
};




module.exports = { createNewUser, verifyUser };