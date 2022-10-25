var mongoose = require("mongoose");
var categoryModel = require("./Categorys");
const mainCategoryModel = require("./Maincategory");
const productsModel = require("./Products");
const subCategoryModel = require("./Subcategory");
const products= require('./ProductsSeed').products
module.exports = {
  categoryadd: async () => {
    try {
      // seed data
      const catgegorys = [
        {
          categoryName: "Mobiles",
        },
        {
          categoryName: "Computers",
        },
        {
          categoryName: "TV",
        },
        {
          categoryName: "Applications",
        },
        {
          categoryName: "Electronics",
        },
        {
          categoryName: "Mens Fashion",
        },
      ];
      const main_categorys=[
        {
          categoryId:"63577e6e58d50c4278bc908d",
          mainCategory:"All mobile phones"
        },
        {
          categoryId:"63577e6e58d50c4278bc908d",
          mainCategory:"All mobile accessories"
        },
        {
          categoryId:"63577e6e58d50c4278bc908d",
          mainCategory:"case covers"
        },
        {
          categoryId:"63577e6e58d50c4278bc908e",
          mainCategory:"Lap top"
        },
        {
          categoryId:"63577e6e58d50c4278bc908e",
          mainCategory:"Desk top"
        },
        {
          categoryId:"63577e6e58d50c4278bc908f",
          mainCategory:"Smart Tv"
        },
        {
          categoryId:"63577e6e58d50c4278bc9090",
          mainCategory:"Duo"
        },
        {
          categoryId:"63577e6e58d50c4278bc9091",
          mainCategory:"Bulbs"
        },
        {
          categoryId:"63577e6e58d50c4278bc9092",
          mainCategory:"Jeans"
        }
      ]

      var sub_categorys= [
        {
          mainCategoryId:"635780018adea854bfa7e212",
          subCategory:"Smart phones"
        },
        {
          mainCategoryId:"635780018adea854bfa7e212",
          subCategory:"Basic phones"
        },
        {
          mainCategoryId:"635780018adea854bfa7e212",
          subCategory:"Android"
        },
        {
          mainCategoryId:"635780018adea854bfa7e213",
          subCategory:"Power bank"
        },
        {
          mainCategoryId:"635780018adea854bfa7e214",
          subCategory:"I phone"
        },
        {
          mainCategoryId:"635780018adea854bfa7e214",
          subCategory:"Samsung"
        },
      ]
      const categoryCount= categoryModel.count()
      // only for task you don't need the data base data as zip files
      // if(categoryCount>6){
        // await categoryModel.deleteMany();
        // await categoryModel.insertMany(catgegorys);
        // await mainCategoryModel.deleteMany();
        // await mainCategoryModel.insertMany(main_categorys);
        // await subCategoryModel.deleteMany();
        // await subCategoryModel.insertMany(sub_categorys);
        // await productsModel.deleteMany();
        // await productsModel.insertMany(products);
        // await productsModel.deleteMany();
        // await productsModel.insertMany(products)
      // }
     
   
      // console.log(products,"ff")
     
      

    } catch (error) {
      console.log(error);
    }
  },
  
};
