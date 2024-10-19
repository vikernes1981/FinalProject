const express = require('express');
const { getAllAdoptionRequests, updateAdoptionRequestStatus } = require('../controllers/adoptionController');
const router = express.Router();

router.get('/admin/adoption-requests', getAllAdoptionRequests);
router.patch('/admin/adoption-requests/:id', updateAdoptionRequestStatus);

module.exports = router;
