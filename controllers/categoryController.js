const Category = require('../models/CategoryModel');
const SubCategory = require('../models/SubCategoryModel');
const auth = require("../middleware/auth.js");
var errorHandler = require('./errorController.js');
const path = require('path');

/******* Add main Category Function***** */
const addCategory = (req, res) => {
    try {
        const data = new Category(req.body);
        data.save(function(err) {
            if (err) {
                try {
                    if (err.name === 'ValidationError') return err = errorHandler.handleValidationError(err, res);
                    if (err.code && err.code == 11000) return err = errorHandler.handleDuplicateKeyError(err, res);
                } catch (err) {
                    res
                        .status(500)
                        .send('An unknown error occurred.');
                }

            } else {

                return res.json({
                    message: "Category is added successfully!",
                    Data: data
                });
            }
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

/******* get main Category Function***** */

const getCategory = async(req, res) => {

    try {
        let categories = await Category.find();
        const categoriesClone = JSON.parse(JSON.stringify(categories));
        const categoriesToSend = [];
        for (let category of categoriesClone) {
            const subCategoryData = await SubCategory.find({ parentId: category._id });
            //console.log('result --------------', subCategoryData);
            subCategoryData.catImg = 'http://localhost:3000/images/img-4.png';
            categoriesToSend.push({...category, subCategoryData });
        }

        res.status(200).send({ status: 200, message: "All categories", data: categoriesToSend });
    } catch (error) {
        res.status(500).send({ error });
    }
}

/******* Delete main Category Function***** */

const deleteCategory = async(req, res) => {
    try {
        let id = req.params.id;
        await Category.deleteOne({ _id: id }, function(err, data) {
            if (data.n == 0) {
                res.status(404).send({ status: 404, message: "Invalid Id" });
            } else {
                res.send({ status: 200, message: "category is deleted" });
            }
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}


/******* update main Category Function***** */

const updateCategory = async(req, res) => {

    try {
        let id = req.params.id;
        let data = req.body;
        await Category.findOneAndUpdate({ _id: id }, data, { new: true }).exec(function(err, data) {
            return res.json({
                message: "Category is updated successfully!",
                Data: data

            });
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}


/******* Add Sub Category Function***** */


const addSubCategory = (req, res) => {

    try {


        const data = new SubCategory(req.body);
        // data.catImg = req.files.catImg.name;
        /// data = req.field.subCatName;
        //const data = new SubCategory(req.body);
        // console.log(data)
        data.save(function(err) {
            if (err) {
                try {
                    if (err.name === 'ValidationError') return err = errorHandler.handleValidationError(err, res);
                    if (err.code && err.code == 11000) return err = errorHandler.handleDuplicateKeyError(err, res);
                } catch (err) {
                    res
                        .status(500)
                        .send('An unknown error occurred.');
                }

            } else {

                return res.json({
                    message: "Sub-Category is added successfully!",
                    Data: data
                });
            }
        });
    } catch (error) {
        res.status(500).send({ message: error });
    }

}

/******* Upload image***** */

const uploadImageCat = async(req, res) => {

        const fs = require('fs')
        var tmp_path = req.files.catImg.path;
        var target_path = './images/' + req.files.catImg.name;
        fs.copyFile(tmp_path, target_path, function(err) {
            if (err) throw err;
            fs.unlink(tmp_path, function() {
                if (err) throw err;
            });
        });
        console.log(req.files.catImg.name);
        try {
            const id = req.params.id;
            const data = req.files.catImg.name;
            await SubCategory.findOneAndUpdate({ _id: id }, { catImg: data }).exec(function(err, newdata) {
                return res.json({
                    message: "category image upload successfully!",
                    id: id
                });
            });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }

    }
    /******* Get sub Category Function***** */

const getSubCategory = async(req, res) => {

    try {
        const Subcategories = await SubCategory.find({}).select({ createdAt: 0, updatedAt: 0, status: 0 }).populate("parentId", { catName: 1 });
        res.send({ message: "All Sub-categories", data: Subcategories });
    } catch (error) {
        res.status(500).send({ error });
    }
}

/******* Delete Sub Category Function***** */

const deleteSubCategory = async(req, res) => {
    try {
        let id = req.params.id;
        await SubCategory.deleteOne({ _id: id }, function(err, data) {
            if (data.n == 0) {
                res.status(404).send({ status: 404, message: "Invalid Id" });
            } else {
                res.send({ status: 200, message: "sub-category is deleted" });
            }
        });
    } catch (error) {
        res.status(500).send({ error });
    }
}


/******* update Sub Category Function***** */

const updateSubCategory = async(req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        await SubCategory.findOneAndUpdate({ _id: id }, data, { new: true }).exec(function(err, data) {
            return res.json({
                message: "Sub-Category is updated successfully!",
                Data: data
            });
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

module.exports = {
    addCategory,
    getCategory,
    deleteCategory,
    updateCategory,
    addSubCategory,
    getSubCategory,
    deleteSubCategory,
    updateSubCategory,
    uploadImageCat
}