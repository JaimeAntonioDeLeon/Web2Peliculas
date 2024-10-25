const User = require('../models/user');

const getUsers = async (req, res)=>{
    try{
        const users = await User.find({});
        res.json(users);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

const getUsersLogin = async (req, res)=>{
    try{
        //const {id} = req.params;
        const user = await User.findOne(req.body);
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

const postRegisterUser = async(req, res) => {
    try{
        const user = await User.create(req.body);
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({message: error.message});
    } 
};

const userImageUpdate = async (req, res) => {
    try {
      const { id, image } = req.body;
      const user = await User.updateOne(
        { _id: id },
        {
          $set: {
            image: image,
          },
        }
      );
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

module.exports ={
    getUsers,
    getUsersLogin,
    postRegisterUser,
    userImageUpdate
}