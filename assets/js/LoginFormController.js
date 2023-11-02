let loginurl = "";

$("#loginButton").on('click', function () {
    login();
});

/*--------Login Function-----------*/
function login() {
    let loginusername = $("#username").val();
    let loginPassword = $("#password").val();

    $.ajax({
        url: loginurl + "loginform", //@RequestMapping("/loginForm")
        contentType: "application/json",
        dataType: "json",
        success: function (res) {
            for (var login of res.data) {
                if ( loginusername === login.username && loginPassword === login.password) {
                    if ( loginusername === login.username && loginPassword === login.password) {
                        $.ajax({
                            url: loginurl + "login/?username=" + loginusername + "&password=" + loginPassword,
                            data: res.data,
                            method: "GET",
                            success: function (res1) {
                            }
                        })
                        window.location.href = "../../adminSite/AdminDashboard.html";
                    } else if (  loginusername === login.username && loginPassword === login.password) {
                        $.ajax({
                            url: loginurl + "login/?username=" + loginusername + "&password=" + loginPassword,
                            data: res.data,
                            method: "GET",
                            success: function (res1) {
                            }
                        });
                        window.location.href = "../../registerUserSite/RegisterUser.html";
                    } else if ( loginPassword === login.username && loginPassword === login.password) {
                        window.location.href = "../../userSite/UserDashboard.html";
                    }
                    return;
                }
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}
