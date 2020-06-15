const mongoose = require('mongoose');

const Advert = require('../models/Advert');


module.exports ={
  async advertstore(req, res){
    var userId = req.params.userId;

    const { photoAdvert,
            responsiblePerson,
            serviceAddress,
            serviceHours,
            briefDescription} = req.body;

    const advert = await Advert.create({
            photoAdvert,
            responsiblePerson,
            serviceAddress,
            serviceHours,
            briefDescription,
            userId
    });
    return res.status(200).json(advert);
  },
  async advertshow(req, res){
    const adverts = await Advert.find();
    return res.status(200).json(adverts);
  },
  async advertshowUser(req, res){
    const adverts = await  Advert.find({userId:req.params.userId});
    return res.status(200).json(adverts);
  },
  async advertupdate(req, res){
    const advert = await Advert.findByIdAndUpdate(req.params.id,req.body,{new:true});
    return res.status(200).json(advert);
  },
  async advertdelete(req, res){
    const advert = await Advert.findByIdAndRemove(req.params.id);
    return res.status(200).json({
      erro: false,
      messege:"operation performed successfully",
    });
  }
}