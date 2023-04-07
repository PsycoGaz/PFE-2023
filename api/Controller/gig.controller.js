import gigModel from "../models/gig.model.js";
import Gig from "../models/gig.model.js";
import createError from "../utils/createError.js";





export const createGig = async (req, res, next) => {
    if (!req.isSeller)return next(createError(403, "Only sellers can create gigs"));

    const newGig =  new Gig({
        userId: req.userId,
        ...req.body,
    })
    try {
        const savedGig = await newGig.save();
        res.status(201).json(savedGig)
    } catch (err) {
        next(err)
    }

};
export const deleteGig = async (req, res, next) => {
    try {
        const gig = await Gig.findById(req.params.id);
        if (gig.userId!==req.userId) return next(createError(403, "You can only delete your own gigs"));
        await Gig.findByIdAndDelete(req.params.id);
        res.status(200).send("Gig deleted successfully")
    } catch (err) {
       next(err) 
    }
};
export const getGig = async (req, res, next) => {
    try {
        const gig= await Gig.findById(req.params.id);
        if(!gig)return next(createError(404, "Gig not found"));
        res.status(200).send(gig)
    } catch (err) {
       next(err) 
    }
};
export const getGigs = async (req, res, next) => {
    const filters = {
        ...(req.query.userId &&  {userId: req.query.userId}),
        ...(req.query.category &&  {category: req.query.category}),
        ...((req.query.min || req.query.max) && {
            price: {...(req.query.min && { $gt: req.query.min }),...(req.query.max && { $lt: req.query.max }), },
          }),
        ...(req.query.search && {gigTitle:{$regex: req.query.search, $options: "i" }}),
    }
    try {
        const gigs = await Gig.find(filters).sort({[req.query.sort]: -1});
        res.status(200).send(gigs)
    } catch (err) {
       next(err) 
    }
};