import express from 'express'
import {
    deleteAd,
    deleteHoneymoon,
    getAd,
    getHoneymoon,
    getHoneymoonById,
    postAd,
    postHoneyMoon
} from '../controllers.js'


const router = express();


router.post('/postpackages', postHoneyMoon)

router.post('/ads', postAd)

router.get('/getpackages', getHoneymoon)

router.get('/getAd', getAd)

router.get('/getpackages/:id', getHoneymoonById)

router.delete('/deletepackages/:id', deleteHoneymoon)

router.delete('/deleteAd/:id', deleteAd)

//------------------------------------------------------------------------------------------------------------------



export default router