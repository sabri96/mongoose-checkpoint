const express = require("express");
router = express.Router();
const Person = require("../model/Person");

//just a test

router.get("/test", (req, res) => {
  res.send("tested");
});

//create new person

router.post("/addPerson", (req, res) => {
  const { name, age, favoriteFoods } = req.body;
  const newPerson = new Person({ name, age, favoriteFoods });
  newPerson
    .save()
    .then((peaple) => res.send(peaple))
    .catch((err) => console.log("Error", err));
});

//find() get all peaple

router.get("/all", (req, res) => {
  Person.find()
    .then((peaple) => res.send(peaple))
    .catch((err) => console.log("Error", err));
});

//find by food
router.get("/food", (req, res) => {

  Person.findOne({favoriteFoods:["chips","pizza"]})
    .then((peaple) => res.send(peaple))
    .catch((err) => console.log("Error", err));
});
//find by id

router.get("/:_id", (req, res) => {
  const { _id } = req.params;

  Person.findById(_id)
    .then((peaple) => res.send(peaple))
    .catch((err) => console.log("Error", err));
});

//search id then add hamburger

router.put("/food/:_id", (req, res) => {
  const { _id } = req.params;
  const food = "hamburger"
    Person.findById({_id}, (err, data) => {
      if(err) return console.log(err); 
      data.favoriteFoods.push(food);
      data.save((err, updated) => {
        if(err) {console.log(err)}
        else {res.send(updated)}
      })
    })
  })

//search name then change age to 20

router.put("/:personName", (req, res) => {
  const { personName } = req.params;

  Person.findOneAndUpdate({ name: personName }, { $set: { age: 23 } })
    .then((peaple) => res.send(peaple))
    .catch((err) => console.log("Error", err));
});

//Delete using findByIdAndRemove

router.delete("/:_id", (req, res) => {
  const { _id } = req.params;

  Person.findOneAndDelete({ _id })
    .then((peaple) => res.send(peaple))
    .catch((err) => console.log("Error", err));
});

//find by name then delete name==Mary

router.delete("/", (req, res) => {

  Person.remove({ name: 'Mary' })
    .then((peaple) => res.send(peaple))
    .catch((err) => console.log("Error", err));
  });

  //find, sort ,limit ,exec

  router.put("/", (req, res) => {
  
    Person.find({favoriteFoods:{$all : ['pizza']}})
    .sort({name : 'gle'})
    .limit(2)
    .select('-age')
    .exec((err,data)=>{if (err) console.log('Error',err);
       else res.send(data)})
     
  });

module.exports = router;