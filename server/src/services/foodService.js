const { Meal } = require('../models/Meal');
const { Nutrient } = require('../models/Nutrient');
const { Profile } = require('../models/Profile');

exports.getAll = (search) => Meal.find({ name: { $regex: new RegExp(search, "i") } }).lean();

exports.getNutritions = async () => await Nutrient.find({}).lean();

exports.getOwn = async (id) => await Meal.find({ owner: id }).lean();

exports.getOne = (id) => Meal.findById(id);

exports.edit = (id, mealData) => Meal.updateOne({ _id: id }, { $set: mealData }, { runValidators: true });

exports.addLike = (id, userId) => Meal.updateOne({ _id: id }, { $push: { likes: userId } });

exports.delete = (id) => Meal.updateOne({ _id: id }, { $set: { isDeleted: true } });

exports.createMeal = (recipe) => Meal.create(recipe);

exports.createNutrition = (data) => Nutrient.create(data);

exports.createProfile = (data) => Profile.create(data);

exports.editProfile = (data, id) => Profile.updateOne({ _id: id }, { $set: data }, { runValidators: true });

exports.getOwner = (meal, user) => {

    if (!meal.owner) {
        return false;
    } else if (meal.owner.toString() === user._id) {
        return true;
    } else {
        return false;
    }
}