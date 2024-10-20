const MovieList = require('../models/movieList.js');

const getAllMoviesList = async (req, res)=>{
    try{
        const lists = await MovieList.find();
        res.json(lists);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

const getMoviesList = async (req, res)=>{
    try{
        const {list_id} = req.body;
        const lists = await MovieList.find(list_id);
        res.json(lists);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

const getMovieLists = async (req, res)=>{
    try{
        const {movie_id} = req.body;
        const lists = await MovieList.find({"movie_id":movie_id});
        res.json(lists);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

// const getMoviesListSpecific = async (req, res)=>{
//     try{
//         //const {id} = req.params;
//         const lists = await List.findOne(req.body);
//         res.status(200).json(lists);
//     }catch(error){
//         res.status(500).json({message: error.message});
//     }
// }

const postMovieList = async(req, res) => {
    try{
        const lists = await MovieList.create(req.body);
        res.status(200).json(lists);
    }catch(error){
        res.status(500).json({message: error.message});
    } 
};


  const deleteMovieList = async (req, res)=>{
    try{
        //const {id} = req.params;
        const post = await MovieList.deleteOne(req.body);
        res.status(200).json(post);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

module.exports ={
    getMoviesList,
    postMovieList,
    deleteMovieList,
    getMovieLists,
    getAllMoviesList
}