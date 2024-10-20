const List = require('../models/list.js');

const getLists = async (req, res)=>{
    try{
        const lists = await List.find({});
        res.json(lists);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

const getListSpecific = async (req, res)=>{
    try{
        const {id} = req.body;
        const lists = await List.findOne({"_id":id}).populate('movies').populate('user_id');
        res.status(200).json(lists);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

const getListsMovie = async (req, res)=>{
    try{
        const {movie_id} = req.body;
        const lists = await List.find({movies:movie_id});
        res.json(lists);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

const getListsUser = async (req, res)=>{
    try{
        const {id} = req.body;
        const lists = await List.find({user_id:id});
        res.json(lists);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

const postCreateList = async(req, res) => {
    try{
        const lists = await List.create(req.body);
        res.status(200).json(lists);
    }catch(error){
        res.status(500).json({message: error.message});
    } 
};

const listUpdate = async (req, res) => {
    try {
      const { id, title } = req.body;
      const post = await List.updateOne(
        { _id: id },
        {
          $set: {
            title: title
          },
        }
      );
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const deleteList = async (req, res)=>{
    try{
        //const {id} = req.params;
        const post = await List.deleteOne(req.body);
        res.status(200).json(post);
    }catch(error){
        res.status(500).json({message: error.message});
    }
};

const getListSearch = async (req, res)=>{
    try{
        const {title} = req.body;
        const tit = new String(title);
        const comment = await List.find({ 'title' : { '$regex' : tit, '$options' : 'i' } });
        res.status(200).json(comment);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

module.exports ={
    getLists,
    getListSpecific,
    postCreateList,
    listUpdate,
    deleteList,
    getListsMovie,
    getListsUser,
    getListSearch
}