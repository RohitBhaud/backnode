import hotel from "../models/hotelModels.js"
import Room from "../models/roomModels.js"

export const createHotel = async(req,res,next)=>{
    const newhotel = new hotel(req.body)
    try{
        const  savedhotel = await newhotel.save()
        res.status(200).json(savedhotel)
    }
    catch(err){
       next(err)
    }
}

export const updatedHotel = async(req,res,next)=>{
    try{
        const  updatedhotel =await hotel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
        res.status(200).json(updatedhotel)
    }
    catch(err){
        next(err)
    }
}

export const deletedHotel = async(req,res,next)=>{
    try{
        await hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("hotel has been deleted")
    }
    catch(err){
        next(err)
    }
}

export const getHotel = async(req,res,next)=>{
    try{
        const  findhotel =await hotel.findById(req.params.id)
        res.status(200).json(findhotel)
    }
    catch(err){
        next(err)
    }
}

export const allHotel = async(req,res,next)=>{
    const {min,max,...others}= req.query
    try{
        const  allhotels =await hotel.find({...others,cheapestPrice:{ $gt:min|1, $lt:max||9999 }}).limit(req.query.limit)
        res.status(200).json(allhotels)
    }
    catch(err){
        next(err)
    }
}
export const countByCity = async(req,res,next)=>{
    const cities = req.query.cities.split(",")
    try{
        const  list =await  Promise.all(cities.map(city=>{
            return hotel.countDocuments({city:city})
        }))
        res.status(200).json(list)
    }
    catch(err){
        next(err)
    }
}
export const countByType = async(req,res,next)=>{
    try{
      
        const hotelCount = await hotel.countDocuments({type:"hotel"})
        const apartmentCount = await hotel.countDocuments({type:"apartment"})
        const resortCount =await hotel.countDocuments({type:"resort"})
        const villaCount = await hotel.countDocuments({type:"villa"})
        const cabinCount = await hotel.countDocuments({type:"cabin"})

        res.status(200).json([
            {type:"hotel", count:hotelCount},
            {type:"apartment", count:apartmentCount},
            {type:"resort", count:resortCount},
            {type:"villa", count:villaCount},
            {type:"cabin", count:cabinCount}
        ])
    }
    catch(err){
        next(err)
    }
}


export const getHotelRooms = async (req, res, next) => {
    try {
      const gethotel = await hotel.findById(req.params.id);
      const list = await Promise.all(
        gethotel.rooms.map((room) => {
          return Room.findById(room);
        })
      );
      res.status(200).json(list)
    } catch (err) {
      next(err);
    }
  };
  