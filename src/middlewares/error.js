exports.errorHandler = (err, req, res, next) => {
  if (err) {
    console.log(err);
    res.status(err.status || 500).json({message: err.message ||
        'Internal Server Error'});
  } else {
    // If no specific error is passed, assume it's a 500 Internal Server Error
    res.status(500).json({message: 'Internal Server Error'});
  }
};
