const { Meal } = require('../models/Meal');

exports.getAll = async (search) => {

    let result = Meal.find({ name: { $regex: new RegExp(search, "i") } }).lean();
    return result
}

exports.getOwn = async (id) => {

    let result = await Meal.find({ owner: id }).lean();;
    return result;
}

exports.getOne = (id) => Meal.findById(id);

exports.edit = (id, mealData) => Meal.updateOne({ _id: id }, { $set: mealData }, { runValidators: true });

exports.delete = (id) => Meal.findByIdAndDelete(id);

exports.create = (recipe) => Meal.create(recipe);


exports.getOwner = (meal, user) => {

    if (!meal.owner) {
        return false;
    } else if (meal.owner.toString() === user._id) {
        return true;
    } else {
        return false;
    }
}