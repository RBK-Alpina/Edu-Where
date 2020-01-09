const mongoose = require("mongoose");

const offreSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  categorie: String,
  price: Number,
  region: String,
  views: {
    type: Number,
    default: 0
  },
  phone: String,
  description: String
});

let Offre = mongoose.model("Offre", offreSchema);

const findOffer = categorie => {
  return Offre.find({ categorie })
    .limit(3)
    .sort({ views: -1 });
};

const findOne = id => {
  return Offre.findOne({ _id: id });
};

const findAll = categorie => {
  return Offre.find({ categorie });
};

const addToDb = obj => {
  let offre = new Offre(obj);
  return offre.save(obj);
};

module.exports.addToDb = addToDb;
module.exports.findOffer = findOffer;
module.exports.findAll = findAll;
module.exports.findOne = findOne;
