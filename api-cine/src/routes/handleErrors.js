const ERRORS = {
  Error: (res, err) => res.status(404).json({status: 404, msg: err})
}

module.exports = (err, _req, res, _next) => {
  if (!ERRORS.hasOwnProperty(err.name)) {
    console.error('This error not handled', err) 
    return res.status(500).json({status: 500, data: 'Internal Error'})
  }
  return ERRORS[err.name](res, err)
}