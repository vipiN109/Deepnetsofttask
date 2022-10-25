const mongoose  = require("mongoose");
const categoryModel = require("../models/Categorys");
const mainCategoryModel = require("../models/Maincategory");
const productsModel = require("../models/Products");
const subCategoryModel = require("../models/Subcategory");

module.exports = {
  getCategorys: async (req, res) => {
    try {
      var catgegorys = await categoryModel.aggregate([
        {
          $lookup: {
            from: "products",
            let: {
              id: "$_id",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$catgoryId", "$$id"],
                  },
                },
              },
              {
                $count: "count",
              },
            ],
            as: "productsCount",
          },
        },
        {
          $unwind: {
            path: "$productsCount",
            includeArrayIndex: "string",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            _id: 1,
            categoryName: 1,
            productCount: {
              $ifNull: ["$productsCount.count", 0],
            },
          },
        },
        { $skip: parseInt(req.query["skip"]) },
        { $limit: parseInt(req.query["limit"]) },
      ]);
      return res
        .status(200)
        .send({
          code: 200,
          status: true,
          message: "Category list",
          data: catgegorys,
        });
    } catch (e) {
      return res
        .status(200)
        .send({ code: 201, status: false, message: "Something went wrong" });
    }
  },
  getMaincategorys: async (req, res) => {
    try {
      var mainCatgegorys = await mainCategoryModel.aggregate([
        {
          '$match': {
            'categoryId': new mongoose.Types.ObjectId(req.query["categoryId"])
          }
        }, {
          '$lookup': {
            'from': 'products', 
            'let': {
              'id': '$_id', 
              'categoryId': '$categoryId'
            }, 
            'pipeline': [
              {
                '$match': {
                  '$expr': {
                    '$and': [
                      {
                        '$eq': [
                          '$catgoryId', '$$categoryId'
                        ]
                      }, {
                        '$eq': [
                          '$mainCategoryId', '$$id'
                        ]
                      }
                    ]
                  }
                }
              }, {
                '$count': 'count'
              }
            ], 
            'as': 'productsCount'
          }
        }, {
          '$unwind': {
            'path': '$productsCount', 
            'includeArrayIndex': 'string', 
            'preserveNullAndEmptyArrays': true
          }
        }, {
          '$project': {
            '_id': 1, 
            'mainCategory': 1, 
            'productCount': {
              '$ifNull': [
                '$productsCount.count', 0
              ]
            }
          }
        },
        { $skip: parseInt(req.query["skip"]) },
        { $limit: parseInt(req.query["limit"]) },
      ]);
      return res
        .status(200)
        .send({
          code: 200,
          status: true,
          message: "Main categorys list",
          data: mainCatgegorys
        });
    } catch (e) {
      return res
        .status(200)
        .send({ code: 201, status: false, message: "Something went wrong" });
    }
  },
  getSubcategorys:async (req, res) => {
    try {
      var subCatgegorys = await subCategoryModel.aggregate([
        {
          '$match': {
            'mainCategoryId': new mongoose.Types.ObjectId(req.query["mainCategoryId"])
          }
        }, {
          '$lookup': {
            'from': 'products', 
            'let': {
              'id': '$_id', 
              'mainCategoryId': '$mainCategoryId'
            }, 
            'pipeline': [
              {
                '$match': {
                  '$expr': {
                    '$and': [
                      {
                        '$eq': [
                          '$mainCategoryId', '$$mainCategoryId'
                        ]
                      }, {
                        '$eq': [
                          '$subCategoryId', '$$id'
                        ]
                      }
                    ]
                  }
                }
              }, {
                '$count': 'count'
              }
            ], 
            'as': 'productsCount'
          }
        }, {
          '$unwind': {
            'path': '$productsCount', 
            'includeArrayIndex': 'string', 
            'preserveNullAndEmptyArrays': true
          }
        }, {
          '$project': {
            '_id': 1, 
            'subCategory': 1, 
            'productCount': {
              '$ifNull': [
                '$productsCount.count', 0
              ]
            }
          }
        },
        { $skip: parseInt(req.query["skip"]) },
        { $limit: parseInt(req.query["limit"]) },
      ]);
      return res
        .status(200)
        .send({
          code: 200,
          status: true,
          message: "Sub categorys list",
          data: subCatgegorys
        });
    } catch (e) {
      return res
        .status(200)
        .send({ code: 201, status: false, message: "Something went wrong" });
    }
  },
  getProducts:async(req,res)=>{
    try {
        var query={}
        if(req.query["mainCategoryId"] || req.query["subCategoryId"] ||req.query["categoryId"]){
            query={
                "$or":[
                    { mainCategoryId:mongoose.Types.ObjectId(req.query["mainCategoryId"])},
                    { subCategoryId:mongoose.Types.ObjectId(req.query["subCategoryId"])},
                    { catgoryId:mongoose.Types.ObjectId(req.query["categoryId"])}
                 ]
            }
        }  
        // console.log(query,"lll") 
        var products= await productsModel.aggregate([
            {
                "$match":query
            },
            {
                "$skip":parseInt(req.query["skip"])
            },
            {
                "$limit":parseInt(req.query["limit"])
            }
        ])


        return res
        .status(200)
        .send({
          code: 200,
          status: true,
          message: "Products list",
          data: products
        });
    } catch (e) {
        console.log(e)
        return res
        .status(200)
        .send({ code: 201, status: false, message: "Something went wrong" });
   
    }
  }
};
