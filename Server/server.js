const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');
const User = require('./models/user.js');
const { urlencoded } = require("express");
const corsOptions = {
    origin: ["http://localhost:5173"],
};
const userRoute = require('./routes/userRoute.js');
const postRoute = require('./routes/postRoute.js');
const imageRoute = require('./routes/imageRoute.js');
const commentRoute = require('./routes/commentRoute.js');
const movieRoute = require('./routes/movieRoute.js');
const listRoute = require('./routes/listRoute.js');

//middleware
app.use(express.json({limit:'25mb'}));
app.use(express.urlencoded({extended:false})); //para formas

//routes
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/image", imageRoute);
app.use("/api/comments", commentRoute);
app.use("/api/movie", movieRoute);
app.use("/api/list", listRoute);

app.use(cors({
    origin: "*"
}));
async function testing()
{
    console.log(User.find({}));
}

app.get("/api", async (req, res)=>{
    try{
        const users = await User.find({});
        res.json(users);
    }
    catch{
        res.status(500).json({message: error.message});
    }
});

mongoose.connect('mongodb://localhost:27017/moviereviewsite')
.then(()=>{
    console.log("Mongo connection open!")
    // try{
    //     /*console.log(User.find({}));*/
    //     //testing();
    // }catch(error){
    //     console.log(error);
    // }
    
})
.catch(err => {
    console.log("Mongo did not connect!")
    console.log(err)
})







app.listen(8080, () => {
    console.log("Server start on port 8080");
}) 

