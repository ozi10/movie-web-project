const express = require("express");
const bodyParser = require("body-parser");
const mongoose=require("mongoose");
const ejs=require("ejs");
const _ =require("lodash")



const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/movieDB", {useNewUrlParser: true});
// Connection URL

//
// const actorSchema = new mongoose.Schema({
//   name: String
// });


const movieSchema = new mongoose.Schema({
  _id:Number,
  movie_name: String,
  year_of_release: Number,
  plot: String,
  cast: String,

});

// const Actor = mongoose.model("Actor", actorSchema);
//
// const actor=new Actor({
//   name:"Tony stark",
// })
//
// const wick=new Actor({
//   name:"John Wick",
// })
//
// const donald=new Actor({
//   name:"Donald Grover",
// })

// actor.save();

// Actor.insertMany([actor,wick,donald]);


const Movie = mongoose.model("Movie", movieSchema);

const movie1=new Movie({
  _id:1,
  movie_name:"Avengers: Endgame",
  year_of_release:2019,
  plot:"Adrift in space with no food or water, Tony Stark sends a message to Pepper Potts as his oxygen supply starts to dwindle. Meanwhile, the remaining Avengers -- Thor, Black Widow, Captain America and Bruce Banner -- must figure out a way to bring back their vanquished allies for an epic showdown with Thanos",
  cast: "tony stark, chris hemsworth, Scarlett johanso"
})



const movie2=new Movie({
  _id:2,
  movie_name:"John Wick: Chapter 3",
  year_of_release:2019,
  plot:"Wick must fight his way through the streets of New York as he becomes the target of the world's most ruthless killers.",
  cast: "Keanu Reaves, Halla berry"
})


const movie3=new Movie({
  _id:3,
  movie_name:"The Lion King",
  year_of_release:2019,
  plot:"The battle for Pride Rock is soon ravaged with betrayal, tragedy and drama, ultimately resulting in Simba's exile. Now, with help from a curious pair of newfound friends, Simba must figure out how to grow up and take back what is rightfully his",
  cast: " Donald grover, Beyonce"
})



  // movie4.save();
  // Movie.insertMany([movie1,movie2,movie3])

app.get("/", function(req, res){

  Movie.find({},function(err,foundItems){
    res.render("list",{
      newListItems:foundItems,
      link:"addmovie",
    });
  });



});

app.get("/addmovie", function(req,res){
  res.render("addmovie");
})

app.post("/addmovie",function(req,res){


    const movie = new Movie({
      _id:req.body.newID,
      movie_name: req.body.newMovie,
      year_of_release:req.body.newYear,
      plot:req.body.newPlot,
      cast:req.body.newCast
    });

    movie.save()
    res.redirect("/")

});

app.post("/delete",function(req,res){
  const checkedID=req.body.check;

  Movie.findByIdAndRemove(checkedID,function(err){
    if(!err){
      console.log("deleted item");
      res.redirect("/");
    }

  });
});



// Movie.insertMany([movie, movie2, movie3, movie4, movie5], function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("sucessfully added new movie");
//   }
// });

app.listen("3000",function(){
  console.log("server started");
})
