
export function validator(input,formtype){
    let errors={}
    if(formtype==="login"){
        if(!input.email){
        errors.email= 'Email required'
    }else if(!/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(input.email)){
        errors.email= 'Email invalid'
    }
    if(!input.password){
        errors.password= 'Password is required';
    }else if(!/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(input.password)){
        errors.password="Password is invalid";
    }
    return errors
    }else{
        if (!input.username) {
          errors.username = 'Username is required';
        } else if (!/^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$/.test(input.username)) {
          errors.username = 'Username is invalid';
        }
        if(!input.email){
          errors.email= 'Email required'
        }else if(!/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(input.email)){
          errors.email= 'Email invalid'
        }
        if(!input.password){
          errors.password= 'Password is required';
        }else if(!/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(input.password)){
          errors.password="between 8 and 16 characters, lowercase, uppercase, number, no symbols";
         }
        return errors
    }
}