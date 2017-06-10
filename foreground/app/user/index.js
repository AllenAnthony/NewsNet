import React from 'react';
import Login from "./login";
import Register from "./register";
import Setting from "./setting";

class User extends React.Component{
    render(){
        let {loginShow,regShow,setShow,loginToRegister,...other}=this.props;
        return(
            <div>
                <Login show={loginShow} loginToRegister={loginToRegister} {...other}/>
                <Register show={regShow} {...other}/>
                <Setting show={setShow} {...other}/>
            </div>
        )
    }
}

export default User;