const List = require('../models/list.js');

const getLists = async (req, res)=>{
    try{
        const lists = await List.find({});
        res.json(lists);
    }
    catch{
        res.status(500).json({message: error.message});
    }
}

const getListSpecific = async (req, res)=>{
    try{
        //const {id} = req.params;
        const lists = await List.findOne(req.body);
        res.status(200).json(lists);
    }catch(error){
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

module.exports ={
    getLists,
    getListSpecific,
    postCreateList
}