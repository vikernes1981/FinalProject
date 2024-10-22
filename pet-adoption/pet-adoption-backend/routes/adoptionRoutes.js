const express = require('express');
const { getAllAdoptionRequests, updateAdoptionRequestStatus } = require('../controllers/adoptionController');
const router = express.Router();

router.get('/adoption-requests', getAllAdoptionRequests);
router.patch('/adoption-requests/:id', updateAdoptionRequestStatus);



module.exports = router;
