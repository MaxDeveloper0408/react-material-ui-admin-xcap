const imageFilter = function(req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
      req.fileValidationError = 'Only image files are allowed!';
      return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};
exports.imageFilter = imageFilter;

const pdfFilter = function(req, file, cb) {
  // Accept pdf only
  if (!file.originalname.match(/\.(pdf|PDF)$/)) {
      req.fileValidationError = 'Only PDF files are allowed!';
      return cb(new Error('Only PDF files are allowed!'), false);
  }
  cb(null, true);
};
exports.pdfFilter = pdfFilter;