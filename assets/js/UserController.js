let UserBaseUrl = "";
loadAllUser();

//Save User
$("#saveuserbtn").click(d = function () {
    let formData = new FormData($("#userTable")[0]);
    $.ajax({
        url: UserBaseUrl + "user",
        method: "POST",
        date: formDate,
        contentType: false,
        processData: false,
        success: function (res) {
            loadAllUser();
        },
        error: function (error) {
            console.log(error);
        }
    })
})
//Update User
$("#updateuserbtn").click(function () {
    let formData = new FormData($("hotelTable")[0]);
    $.ajax({
        url: UserBaseUrl + "user/update",
        method: "PUT",
        data: formData,
        contentType: false,
        processData: false,
        success: function (res) {
            loadAllUser();
        },
        error: function (error) {
            console.log(error);
        }
    })
});
//Delete User
$("#deleteuserbtn").click(function () {
    let id = $("#userId").val();
    $.ajax({
        url: UserBaseUrl + "user?id" + id,
        method: "DELETE",
        dataType: "json",
        success: function (res) {
            loadAllUser();
        },
        error: function (error) {
            console.log(error);
        }
    })
});
//Search user
$("#searchuserbtn").on("keypress", function (event) {
    if (event.which === 13) {
        var searchUser = $("#searchRegUser").val();
        $("#userTable").empty();
        $.ajax({
            url: UserBaseUrl + "user/searchUser/?userid=" + searchUser,
            method: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                $("#userId").val(res.user_Id);
                $("#username").val(res.user_name);
                $("#userNic").val(res.user_nic);
                $("#userEmail").val(res.user_Email);
                $("#userAddress").val(res.user_Address);
                $("#userNumber").val(res.user_Number);

                let row = "<tr>" +
                    "<td>" + res.user_Id + "</td>" +
                    "<td>" + res.user_name + "</td>" +
                    "<td>" + res.user_nic + "</td>" +
                    "<td>" + res.user_Email + "</td>" +
                    "<td>" + res.user_Address + "</td>" +
                    "<td>" + res.user_Number + "</td></tr>";
                $("#userTable").append(row)
            },
            error: function (error) {
                loadAllHotel();
            }
        })
    }
})

//get all user
function loadAllUser() {
    $("#userTable").empty();
    $.ajax({
        url: UserBaseUrl + "user/loadAllUserDetails",
        method: "GET",
        dataType: "json",
        success: function (res) {
            for (let i of res.data) {
                let id = i.user_Id;
                let name = i.user_name;
                let nic = i.user_nic;
                let email = i.user_Email;
                let address = i.user_Address;
                let number = i.user_Number;

                let row = "<tr><td>" + id + "</td>" +
                    "<td>" + name + "</td>" +
                    "<td>" + nic + "</td>" +
                    "<td>" + email + "</td>" +
                    "<td>" + address + "</td>" +
                    "<td>" + number + "</td>" +
                    "</tr>";
                $("#userTable").append(row)
            }
            autoGenerateid();
            checkValidity(userValidation);
        },
        error: function (error) {
            console.log(error);
        }
    })
}

//Auto Generate user id
function autoGenerateid() {
    $("#userId").val("U001");
    $.ajax({
        url:UserBaseUrl+"user/autoGenerateid",
        method:"GET",
        contentType:"application/json",
        dataType:"json",
        success:function (resp){
            let id=resp.value;
            let tempid=parseInt(id.split("-")[1]);
            tempid=tempid+1;
            if (tempid <= 9){
                $("#userId").val("U00" + tempid);
            }else if (tempid <= 99){
                $("#userId").val("U0" + tempid);
            }else {
                $("#userId").val("U"+tempid);
            }
        },
        error: function (error) {
            console.log(error);
        }
    })
}
