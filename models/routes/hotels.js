import express from "express"
import { allHotel, createHotel, deletedHotel, getHotel, updatedHotel,countByCity,countByType, getHotelRooms } from "../controllers/hotels.js"
import hotel from "../models/hotelModels.js"
import { createError } from "../utils/error.js"
import { verifyAdmin } from "../utils/verifyToken.js"
const  router = express.Router()

router.post("/" ,verifyAdmin,createHotel)
router.put("/find/:id" ,verifyAdmin, updatedHotel)
router.delete("/find/:id" ,verifyAdmin, deletedHotel)
router.get("/find/:id" , getHotel)
router.get("/" , allHotel)
router.get("/countByCity",countByCity)
router.get("/countByType",countByType)
router.get("/room/:id",getHotelRooms)





// module.exports = router
export default router
