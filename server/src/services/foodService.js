const { Meal } = require('../models/Meal');
const { Nutrient } = require('../models/Nutrient');

exports.getAll = (search) => {

    let result = Meal.find({ name: { $regex: new RegExp(search, "i") } }).lean();
    return result
}
exports.getNutritions = async () => {

    let result = await Nutrient.find({}).lean();
    return result;
}

exports.getOwn = async (id) => {

    let result = await Meal.find({ owner: id }).lean();
    return result;
}

exports.getOne = (id) => Meal.findById(id);

exports.edit = (id, mealData) => Meal.updateOne({ _id: id }, { $set: mealData }, { runValidators: true });

exports.addLike = (id, userId) => Meal.updateOne({ _id: id }, { $push: { likes: userId } });

exports.delete = (id) => Meal.updateOne({ _id: id }, { $set: { isDeleted: true } });

exports.create = (recipe) => Meal.create(recipe);

exports.createNutrition = (data) => Nutrient.create(data);

exports.getOwner = (meal, user) => {

    if (!meal.owner) {
        return false;
    } else if (meal.owner.toString() === user._id) {
        return true;
    } else {
        return false;
    }
}