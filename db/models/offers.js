const mongoose = require("mongoose");

const offreSchema = mongoose.Schema({
  firstName: {
    required: true,
    type: String
  },
  lastName: {
    required: true,
    type: String
  },
  email: {
    required: true,
    type: String
  },
  categorie: {
    required: true,
    type: String
  },
  price: {
    required: true,
    type: String
  },
  region: {
    required: true,
    type: String
  },
  views: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0
  },
  phone: {
    required: true,
    type: String
  },
  description: String
});

let Offre = mongoose.model("Offre", offreSchema);

//function that fetch the three most viewed offres in the database based on the categorie needed
//this function return a promise
const findOffer = categorie => {
  return Offre.find({ categorie })
    .limit(3)
    .sort({ views: -1 });
};

//function that fetch one offre from the database based on it's id
//this function return a promise
const findOne = id => {
  return Offre.findOne({ _id: id });
};

//function that fetch all the offres in the database based on the categorie needed
//this function return a promise
const findAll = categorie => {
  return Offre.find({ categorie });
};

//function that fetch all the offres in the database based on the email of the user
//this function return a promise
const findAllbyEmail = email => {
  return Offre.find({ email });
};

//function that fetch all the offres in the database based on the firstname and lastname of teh user
//this function return a promise
const findAllbyName = (firstName, lastName) => {
  return Offre.find({ firstName, lastName });
};

//function that add an offres to the database
//this function return a promise
const addToDb = obj => {
  let offre = new Offre(obj);
  return offre.save(obj);
};

//function that find an offre in the database based on the id and increment the nbr of
//views of that offre by one //this function return a promise
const findAndUpdate = id => {
  return Offre.findOneAndUpdate(
    { _id: id },
    { $inc: { views: 1 } },
    { useFindAndModify: false }
  );
};

//function that find an offre in the database based on the id and update the rating of
//that offre by the new one //this function return a promise
const updateRating = (id, rating) => {
  return Offre.findOneAndUpdate(
    { _id: id },
    { rating },
    { useFindAndModify: false }
  );
};

//function that find an offre in the database based on the id and delete that offre
//then it will invoque the find by name and return a promise
const findAndDelete = (id, firstName, lastName) => {
  return Offre.findOneAndRemove(
    { _id: id },
    { useFindAndModify: false }
  ).then(data => this.findAllbyName(firstName, lastName));
};

module.exports.addToDb = addToDb;
module.exports.updateRating = updateRating;
module.exports.findOffer = findOffer;
module.exports.findAll = findAll;
module.exports.findOne = findOne;
module.exports.findAndUpdate = findAndUpdate;
module.exports.findAndDelete = findAndDelete;
module.exports.findAllbyEmail = findAllbyEmail;
module.exports.findAllbyName = findAllbyName;
