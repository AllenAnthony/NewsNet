import {message} from 'antd';
import Cookie from 'js-cookie';

let login=(username,password,callback)=>{
    const url='http://127.0.0.1:3000/login';
    let req=new Request(url,{
        method: 'POST',
        body: `name=${username}&password=${password}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    fetch(req).then((response)=>{
        return response.json();
    }).then((data)=>{
       if(data.code==0){//log in successfully
           Cookie.set('userInfo',data);
           message.success('log in successfully! please log in again when switching ID',2.5);
           if(callback)
               callback(true);
       }else{//log in failed
           message.warning(data.msg,1.5);
           if(callback)
               callback(false);
       }
    });
};

let updateCookie=(username,email,callback)=>{
  let url ='http://127.0.0.1:3000/update_cookie';
  let req=new Request(url,{
      method: 'POST',
      body: `name=${username}&email=${email}`,
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      }
  });

  fetch(req).then((response)=>{
      return response.json();
  }).then((data)=>{
     if(data.code==0){//update successfully
        Cookie.set('userInfo',data);
        if(callback)
            callback(true);
     }else{//update failed
         console.log("update cookie failed");
         if(callback)
             callback(false);
     }
  });

};

export {login,updateCookie};
