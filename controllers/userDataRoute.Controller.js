const UserModel = require("../models/userModel");

const { getUserEmailFromToken } = require("../middlewares/getUserEmailFromToken");

const GetUserDetails = async (req, res, next) => {
  const loggedEmail = await getUserEmailFromToken(req.headers.token);

  try {
    const [User,_] = await UserModel.findUserEmail(loggedEmail);
    if(User.length) {
        console.log("Found User", User);
        res.status(200).send(User[0]);
    }
    else{
        res
        .status(500)
        .send("You are Not Authorised To Access Data !!");
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send("Internal Server Error \n Something Went Wrong !!  Try Again !! ");
  }
};


module.exports = {
  GetUserDetails,
};
