const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const AdvertSchema = new mongoose.Schema({
  userId:{
    type:String,
  },
  photoAdvert:{
    type:String,
  },
  responsiblePerson:{
    type:String,
  },

  serviceAddress:{
    type:String,
  },
  serviceHours:{
    type:String,
  },
  briefDescription:{
    type:String,
  },
  service:{
    type:String,
  },
  money:{
    type:String,
  },
  neededService:{
    type:String,
  },
  createAt:{
    type: Date,
    default: Date.now
  }
  
});


module.exports = mongoose.model('adverts', AdvertSchema);