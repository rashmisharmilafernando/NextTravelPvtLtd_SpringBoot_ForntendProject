let loginurl = "";

$("#loginButton").on('click', function () {
    login();
});

/*--------Login Function-----------*/
function login() {
    let loginRoleType = $("#role_Type").val();
    let loginusername = $("#username").val();
    let loginPassword = $("#password").val();

    $.ajax({
        url: loginurl + "loginform", //@RequestMapping("/loginForm")
        contentType: "application/json",
        dataType: "json",
        success: function (res) {
            for (var login of res.data) {
                if (loginRoleType === login.role_Type && loginusername === login.username && loginPassword === login.password) {
                    if (loginRoleType === "admin" && loginusername === login.username && loginPassword === login.password) {
                        $.ajax({
                            url: loginurl + "login/?username=" + loginusername + "&password=" + loginPassword,
                            data: res.data,
                            method: "GET",
                            success: function (res1) {
                            }
                        })
                        window.location.href = "../admin/AdminDashboard.html";
                    } else if (loginRoleType === "RegisteredUser" && loginusername === login.username && loginPassword === login.password) {
                        $.ajax({
                            url: loginurl + "login/?username=" + loginusername + "&password=" + loginPassword,
                            data: res.data,
                            method: "GET",
                            success: function (res1) {
                            }
                        });
                        window.location.href = "../registerUser/RegisterUser.html";
                    } else if (loginRoleType === "User" && loginPassword === login.username && loginPassword === login.password) {
                        window.location.href = "../user/UserDashboard.html";
                    }
                    return;
                }
            }
        }
    });
}
