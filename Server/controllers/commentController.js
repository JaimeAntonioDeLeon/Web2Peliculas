const Comment = require('../models/comment');

const getComments = async (req, res)=>{
    try{
        const comments = await Comment.find({});
        res.json(comments);
    }
    catch{
        res.status(500).json({message: error.message});
    }
}

const getCommentsPost = async (req, res)=>{
    try{
        //const {id} = req.params;
        const comment = await Comment.findOne(req.body);
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

module.exports ={
    getComments,
    getCommentsPost,
    postCreateComment
}