const { REACT_APP_BASE_URL } = process.env;

export function Service(){ 
  this.baseURL = REACT_APP_BASE_URL
}

Service.prototype._post = function(data){
  return new Promise((resolve, reject) => {
  fetch(this.baseURL ,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(response => resolve(response))
      .catch(err => reject(err));
  })
}

Service.prototype._get = function(endpoint){
  return new Promise((resolve, reject) => {
    fetch(this.baseURL + endpoint, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(response => resolve(response))
      .catch(err => reject(err));
  })
}

Service.prototype.testConnection = function(){
  return new Promise((resolve, reject) => {
    this._get('/pin')
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}