import multer from 'multer';
import sharp from 'sharp'
import path from 'path'

import honeyMoonModel from './models/honeyMoonModel.js';
import adsModel from './models/adsModel.js';


const Storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({
    storage: Storage
}).single('testImage')

export const postHoneyMoon = ((req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.log(err);
        } else {
            const image = sharp(req.file.path)
                .resize(800)
                .jpeg({ quality: 80 });

            const compressedImageBuffer = await image.toBuffer();
            const honeyMoon = new honeyMoonModel({
                place: req.body.place,
                price: req.body.price,
                days: req.body.days,
                description : req.body.description,
                highlight1 : req.body.highlight1,
                highlight2 : req.body.highlight2,
                highlight3 : req.body.highlight3,
                highlight4 : req.body.highlight4,
                highlight5 : req.body.highlight5,
                highlight6 : req.body.highlight6,
                image: {
                    data: compressedImageBuffer,
                    contentType: 'image/jpeg || image/png'
                }
            })

            try {
                const savedHoneyMoon = await honeyMoon.save()
                res.status(200).json('successfully added')
            } catch (error) {
                res.status(500).json('The image file must be jpeg or png file . And choose medium or low quality image')
            }
        }
    })
})







export const getHoneymoon = (async (req, res) => {
    try {
        const getHoneymoon = await honeyMoonModel.find();
        res.status(200).json(getHoneymoon)
    } catch (error) {
        res.status(200).json(error)
    }
})



export const deleteHoneymoon = (async (req, res) => {
    try {
        await honeyMoonModel.findByIdAndDelete(req.params.id)
        res.status(200).json("Destianation has been deleted")
    } catch (error) {
        res.status(500).json(error)
    }
})



export const postAd = (async (req,res)=> {
    upload(req, res, async (err) => {
        if (err) {
            console.log(err);
        } else {
            const image = sharp(req.file.path)
                .resize(800)
                .jpeg({ quality: 80 });

            const compressedImageBuffer = await image.toBuffer();
            const newAd = new adsModel({
                image: {
                    data: compressedImageBuffer,
                    contentType: 'image/jpeg || image/png'
                }
            })
            try {
                const savedAd = await newAd.save()
                res.status(200).json('successfully added')
            } catch (error) {
                res.status(500).json('The image file must be jpeg or png file . And choose medium or low quality image')
            }
        }
    })
})

export const getAd = (async (req,res)=>{
    try {
        const getAd = await adsModel.find();
        res.status(200).json(getAd)
    } catch (error) {
        res.status(200).json(error)
    }
})

export const deleteAd = (async (req,res) => {
    try {
        await adsModel.findByIdAndDelete(req.params.id)
        res.status(200).json("Destianation has been deleted")
    } catch (error) {
        res.status(500).json(error)
    }
})

export const getHoneymoonById = (async(req,res)=>{
    try {
        const honeypackage = await honeyMoonModel.findById(req.params.id)
        
        res.status(200).json(honeypackage)
    } catch (error) {
        res.status(500).json(error)        
    }
})




//posting resorts

