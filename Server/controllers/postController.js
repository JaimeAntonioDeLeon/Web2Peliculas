const Post = require('../models/post');

const getPosts = async (req, res)=>{
    try{
        const post = await Post.find({});
        res.json(post);
    }
    catch{
        res.status(500).json({message: error.message});
    }
}

const getPostSelected = async (req, res)=>{
    try{
        //const {id} = req.params;
        const post = await Post.findOne(req.body);
        res.status(200).json(post);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

const postPost = async(req, res) => {
    try{
        const post = await Post.create(req.body);
        res.status(200).json(post);
    }catch(error){
        res.status(500).json({message: error.message});
    } 
};

const postUpdate = async (req, res) => {
    try {
      const { id, body, title, user_id, movie_id, created_at } = req.body;
      const post = await Post.updateOne(
        { _id: id },
        {
          $set: {
            title: title,
            body: body,
          },
        }
      );
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const deletePost = async (req, res)=>{
    try{
        //const {id} = req.params;
        const post = await Post.deleteOne(req.body);
        res.status(200).json(post);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

module.exports ={
    getPosts,
    getPostSelected,
    postPost,
    postUpdate,
    deletePost
}