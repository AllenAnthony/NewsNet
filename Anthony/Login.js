/**
 * Created by asus on 2016/12/26.
 */
SignIn = function() {
    // console.info("点击了登录");
    var userName = $("#SignInName").val();
    // console.info(userName)
    var userPass = $("#SignInPassword").val();
    // console.info(userPass);
    if (userName == "" || userName == null) {
        alert("用户名不能为空");
        return false;
    } else if (userPass == "" || userPass == null) {
        alert("密码不能为空");
        return false;
    }
    else
    {
        var block={ "id":userName , "password":userPass }
        submit_signin_data(block);
        //return block;
        return true;
    }
}

LogIn = function()
{
    // console.info("点击了登录");
    var userName = $("#LogInName").val();
    // console.info(userName)
    var userPass = $("#LogInPassword").val();
    // console.info(userPass);
    if (userName == "" || userName == null) {
        alert("用户名不能为空");
        return false;
    } else if (userPass == "" || userPass == null) {
        alert("密码不能为空");
        return false;
    }
    else
    {
        var block={ "id":userName , "password":userPass }
        submit_login_data(block);
        //return block;
        return true;
    }
}

submit_login_data = function(block)
{
    $.ajax({
        url: "http://localhost:3000/users/login",
        type: "post",
        dataType: "json",
        data: block,
        async: true, //为了流程的顺序执行，这里选择同步的方法
        timeout: 20000,
        success: function (data)
        {
            alert("Login successfully!");
            window.location.href="index.html";
            // if (data.code == 0) {
            //     alert("Error: clientNo does not exist!");
            // } else {
            //     Data = data.data;
            // }
        },
        error: function (data) {
            alert(data);
        }
    });
    return null;
}


submit_signin_data = function(block)
{
    $.ajax({
        url: "http://localhost:3000/users/register",
        type: "post",
        dataType: "json",
        data: block,
        async: true, //为了流程的顺序执行，这里选择同步的方法
        timeout: 20000,
        headers: {
            // Accept: "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        success: function (data)
        {
            alert("Sign In successfully!");
            window.location.href="index.html";
            // if (data.code == 0) {
            //     alert("Error: clientNo does not exist!");
            // } else {
            //     Data = data.data;
            // }
        },
        error: function (data) {
            alert(data);
        }
    });
    return null;
}