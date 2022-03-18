const ERRORS = {
  Error: (res, err) => {
    res.status(404).json({ [err.name]: err.message})
  },
  SequelizeUniqueConstraintError: (res, err) => {
    res.status(406).json({ [err.name]: err.errors[0].message })
  },
  JsonWebTokenError: (res, err) => {
    res.status(406).json(err)
  },
  SequelizeDatabaseError: (res, err) => {
    res.status(406).json({[err.name]: err.errors[0].message})
  },
  SequelizeValidationError: (res, err) => {
    res.status(406).json({[err.name]: err.message})
  }
}

module.exports = (err, _req, res, _next) => {
  if (!ERRORS.hasOwnProperty(err.name)) {
    console.error('This error not handled', err) 
    return res.status(500).json({status: 500, data: 'Internal Error'})
  }
  return ERRORS[err.name](res, err)
}