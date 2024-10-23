const Image = require('../models/image');

const getImages = async (req, res)=>{
    try{
        const images = await Image.find({});
        res.json(images);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

const getPostImages = async (req, res)=>{
    try{
        const {id} = req.body;
        const images = await Image.findOne({post_id:id});
        res.status(200).json(images);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

const postImage = async(req, res) => {
    try{
        const images = await Image.create(req.body);
        res.status(200).json(images);
    }catch(error){
        res.status(500).json({message: error.message});
    } 
};

module.exports ={
    getImages,
    getPostImages,
    postImage
}