const express = require('express');
const blogController = require('../controllers/blogController');

const router = express.Router();

// get requests
router.get("/", blogController.index)
router.get("/create", blogController.createGET)
router.get("/:id", blogController.details)


// post requests
router.post("/", blogController.createPOST)


// delete requests
router.delete("/:id", blogController.remove)

module.exports = router