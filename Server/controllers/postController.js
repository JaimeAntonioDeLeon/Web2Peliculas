const Post = require('../models/post');

const getPosts = async (req, res)=>{
    try{
        const post = await Post.find({});
        res.json(post);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

const getPostSelected = async (req, res)=>{
    try{
        const {id} = req.body;
        const post = await Post.findOne({"_id":id}).populate('user_id');
        res.status(200).json(post);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

const getPostsMovie = async (req, res)=>{
    try{
        const {movie_id} = req.body;
        const lists = await Post.find({movie_id:movie_id});
        res.json(lists);
    }
    catch(error){
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
};
const getPostSearch = async (req, res)=>{
    try{
        const {title} = req.body;
        const tit = new String(title);
        const comment = await Post.find({ 'title' : { '$regex' : tit, '$options' : 'i' } });
        res.status(200).json(comment);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

module.exports ={
    getPosts,
    getPostSelected,
    postPost,
    postUpdate,
    deletePost,
    getPostSearch,
    getPostsMovie
}