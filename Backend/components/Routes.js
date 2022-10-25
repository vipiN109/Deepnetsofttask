const express = require('express');
const router= express.Router();
const middleware= require('./queryValidationmiddleware');
const schemas = require('./validationQueryschema');
const taskService= require('./services')

router.get('/getCategory',middleware(schemas.getCategorys,"query"),taskService.getCategorys)
router.get('/get_mainCategory',middleware(schemas.getMainCategorys,"query"),taskService.getMaincategorys)
router.get('/get_subCategory',middleware(schemas.getSubCategorys,"query"),taskService.getSubcategorys),
router.get('/getProducts',taskService.getProducts)
// router.get('/getSubcategory')
// router.get('/products')

/**
 * @swagger
 * /getCategory:
 *   get:
 *     summary: getCategorys
 *     tags: [task]
 *     parameters:
 *      - in: query
 *        description: required
 *        name: skip
 *        schema:
 *          type: string
 *        required: true
 *      - in: query
 *        description: required
 *        name: limit
 *        schema:
 *          type: string
 *        required: true
 *     responses:
 *       200:
 *         description: Fetch Category List
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /get_mainCategory:
 *   get:
 *     summary: get_mainCategory list
 *     tags: [task]
 *     parameters:
 *      - in: query
 *        description: required
 *        name: skip
 *        schema:
 *          type: string
 *        required: true
 *      - in: query
 *        description: required
 *        name: limit
 *        schema:
 *          type: string
 *        required: true
 *      - in: query
 *        description: required
 *        name: categoryId
 *        schema:
 *          type: string
 *        required: true
 *     responses:
 *       200:
 *         description: Fetch Main Category List
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /get_subCategory:
 *   get:
 *     summary: get_mainCategory list
 *     tags: [task]
 *     parameters:
 *      - in: query
 *        description: required
 *        name: skip
 *        schema:
 *          type: string
 *        required: true
 *      - in: query
 *        description: required
 *        name: limit
 *        schema:
 *          type: string
 *        required: true
 *      - in: query
 *        description: required
 *        name: mainCategoryId
 *        schema:
 *          type: string
 *        required: true
 *     responses:
 *       200:
 *         description: Fetch Main Category List
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /getProducts:
 *   get:
 *     summary: get_mainCategory list
 *     tags: [task]
 *     parameters:
 *      - in: query
 *        description: required
 *        name: skip
 *        schema:
 *          type: string
 *        required: true
 *      - in: query
 *        description: required
 *        name: limit
 *        schema:
 *          type: string
 *        required: true
 *      - in: query
 *        description: required
 *        name: mainCategoryId
 *        schema:
 *          type: string
 *      - in: query
 *        description: required
 *        name: categoryId
 *        schema:
 *          type: string
 *      - in: query
 *        description: required
 *        name: subCategoryId
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Fetch Main Category List
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Some server error
 */

module.exports=router;