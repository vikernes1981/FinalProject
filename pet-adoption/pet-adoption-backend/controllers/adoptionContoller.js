const AdoptionRequest = require('../models/AdoptionRequest');

exports.getAllAdoptionRequests = async (req, res) => {
  const requests = await AdoptionRequest.find().populate('user pet');
  res.json(requests);
};

exports.updateAdoptionRequestStatus = async (req, res) => {
  const updatedRequest = await AdoptionRequest.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  res.json(updatedRequest);
};
