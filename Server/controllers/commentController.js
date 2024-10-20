const Comment = require('../models/comment');

const getComments = async (req, res)=>{
    try{
        const comments = await Comment.find({});
        res.json(comments);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

const getCommentsPost = async (req, res)=>{
    try{
        const {id} = req.body;
        const comment = await Comment.find({"post_id": id});
        res.status(200).json(comment);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

const getComment = async (req, res)=>{
    try{
        const {id} = req.body;
        const comment = await Comment.findOne({"_id": id}).populate("user_id");
        res.status(200).json(comment);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

const postCreateComment = async(req, res) => {
    try{
        const comment = await Comment.create(req.body);
        res.status(200).json(comment);
    }catch(error){
        res.status(500).json({message: error.message});
    } 
};

const commentUpdate = async (req, res) => {
    try {
      const { id, body } = req.body;
      const post = await Comment.updateOne(
        { _id: id },
        {
          $set: {
            body: body
          },
        }
      );
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const deleteComment = async (req, res)=>{
    try{
        //const {id} = req.params;
        const post = await Comment.deleteOne(req.body);
        res.status(200).json(post);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

module.exports ={
    getComments,
    getCommentsPost,
    postCreateComment,
    commentUpdate,
    deleteComment,
    getComment
}