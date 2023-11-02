loadAllUser();

//Save User
$("#saveuserbtn").click(d = function () {
    let formData = new FormData($("#userDetails")[0]);
    formData.append("userId", $("#userId").val());
    formData.append("name", $("#name").val());
    formData.append("nic", $("#nic").val());
    formData.append("age", $("#age").val());
    formData.append("gender", $("#gender").val());
    formData.append("email", $("#email").val());
    formData.append("password", $("#password").val());
    formData.append("roleType", $("#roleType").val());
    formData.append("contactNumber", $("#contactNumber").val());
    formData.append("address", $("#address").val());
   formData.append("profilePic", $("#profilePic")[0].files[0]);
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
    let formData = new FormData($("#userDetails")[0]);
    formData.append("userId", $("#userId").val());
    formData.append("name", $("#name").val());
    formData.append("nic", $("#nic").val());
    formData.append("age", $("#age").val());
    formData.append("gender", $("#gender").val());
    formData.append("email", $("#email").val());
    formData.append("password", $("#password").val());
    formData.append("roleType", $("#roleType").val());
    formData.append("contactNumber", $("#contactNumber").val());
    formData.append("address", $("#address").val());
    formData.append("profilePic", $("#profilePic")[0].files[0]);
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
function searchHotelId() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchUser");
    filter = input.value.toUpperCase();
    table = document.getElementById("userTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

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
    $("#userId").val("NTU-001");
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
                $("#userId").val("NTU-00" + tempid);
            }else if (tempid <= 99){
                $("#userId").val("NTU-0" + tempid);
            }else {
                $("#userId").val("NTU-"+tempid);
            }
        },
        error: function (error) {
            console.log(error);
        }
    })
}

