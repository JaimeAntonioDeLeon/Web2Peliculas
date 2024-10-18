const mongoose = require('mongoose');
const Movie = require('../models/movie');

const getMovie = async (req, res)=>{
    try{
        const comments = await Movie.find({});
        res.json(comments);
    }
    catch{
        res.status(500).json({message: error.message});
    }
}

const getMovieSpecific = async (req, res)=>{
    try{
        //const {id} = req.params;
        const comment = await Movie.findOne(req.body);
        res.status(200).json(comment);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

const getMovieSearch = async (req, res)=>{
    try{
        const {title} = req.body;
        const tit = new String(title);
        const comment = await Movie.find({ 'title' : { '$regex' : tit, '$options' : 'i' } });
        res.status(200).json(comment);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

// const postCreateComment = async(req, res) => {
//     try{
//         const comment = await Comment.create(req.body);
//         res.status(200).json(comment);
//     }catch(error){
//         res.status(500).json({message: error.message});
//     } 
// };

module.exports ={
    getMovie,
    getMovieSpecific,
    getMovieSearch
}