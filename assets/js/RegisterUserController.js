autoGenerateid();

loadAllRegisterUser();

//Save Customer form RegisterPage.html
$("#register_button").click(function (){
    let formData=new FormData($("#registerForm")[0]);
    formData.append("userId", $("#userId").val());
    formData.append("name", $("#reg_Name").val());
    formData.append("nic", $("#reg_NIC").val());
    formData.append("age", $("#reg_Age").val());
    formData.append("gender", $("#reg_Gender").val());
    formData.append("email", $("#reg_Email").val());
    formData.append("password", $("#reg_Password").val());
    formData.append("roleType", $("#reg_RoleType").val());
    formData.append("contactNumber", $("#rag_contactNumber").val());
    formData.append("address", $("#rag_address").val());
    formData.append("profilePic", $("#newProfilePhoto")[0].files[0]);

    console.log(formData.get("profilePic"));

    $.ajax({
        url:"http://localhost:8080/user/api/v1/user",
        method:"POST",
        data:formData,
        contentType:false,
        processData: false,
        success:function (res){
            alert("Successfully....!");
        },error: function (error) {
            console.log(error);
            alert("Successfully....!");
        }
    })
})


//update Customer form ManageCustomer.html
$("#btnUpdateRegUser").click(function (){
    let formData=new FormData($("#registerForm")[0]);
    formData.append("userId", $("#userId").val());
    formData.append("name", $("#reg_Name").val());
    formData.append("nic", $("#reg_NIC").val());
    formData.append("age", $("#reg_Age").val());
    formData.append("gender", $("#reg_Gender").val());
    formData.append("email", $("#reg_Email").val());
    formData.append("password", $("#reg_Password").val());
    formData.append("roleType", $("#reg_RoleType").val());
    formData.append("contactNumber", $("#rag_contactNumber").val());
    formData.append("address", $("#rag_address").val());
    formData.append("profilePic", $("#newProfilePhoto")[0].files[0]);

    $.ajax({
        url:"http://localhost:8080/user/api/v1/user/update",
        method:"PUT",
        data:formData,
        contentType:false,
        processData: false,
        success:function (res){
            loadAllRegisterUser();
            alert("Successfully....!");
        },
        error: function (error) {
            alert("Successfully....!");
            console.log(error);
        }
    })

});

//Delete Customer form ManageCustomer.html
$("#btnDeleteRegUser").click(function (){
    let userEmail=$("#reg_Email").val();
    $.ajax({
        url:"http://localhost:8080/user/api/v1/user/userEmail?userEmail=" +userEmail,
        method:"DELETE",
        dataType:"json",
        success:function (res){
            loadAllRegisterUser();
            alert("Successfully....!");
        },
        error: function (error) {
            console.log(error);
            alert("Try Again....!");
        }
    })

});

// Get All customer Details  form ManageCustomer.html
function loadAllRegisterUser(){
    $("#registerUserTable").empty();
    $.ajax({
        url:"http://localhost:8080/user/api/v1/user/loadCustomer",
        method: "GET",
        dataType:"json",
        success:function (res){
            console.log(res);

            for (let i of res){
                let userId =i.userId;
                let name = i.name;
                let nic = i.nic;
                let age = i.age;
                let gender = i.gender;
                let email =i.email;
                let roleType = i.roleType;
                let contactNumber = i.contactNumber;
                let address =i.address;


                let row ="<tr><td>" + userId+"</td>" +
                    "<td>" + name + "</td>" +
                    "<td>" + nic+"</td>"+
                    "<td>" + age+"</td>"+
                    "<td>" + gender+"</td>"+
                    "<td>" + email+"</td>"+
                    "<td>" + roleType+"</td>"+
                    "<td>" + contactNumber+"</td>"+
                    "<td>" + address+"</td></tr>";
                $("#registerUserTable").append(row)
            }
            autoGenerateid();
            loadTextFieldValues();
            checkValidity(registerUserValidation);
        },
        error: function (error) {
            console.log(error);
        }
    })
}

//Auto Generate Customer id
function autoGenerateid() {
    $("#userId").val("NTC-001");
    $.ajax({
        url: "http://localhost:8080/user/api/v1/user/autoGenerateId",
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (res) {
            let userId = res.value;
            console.log("Generated user ID: " + userId);
            let tempid = parseInt(userId.split("-")[1]);
            tempid = tempid + 1;
            if (tempid <= 9) {
                $("#userId").val("NTC-00" + tempid);
            } else if (tempid <= 99) {
                $("#userId").val("NTC-0" + tempid);
            } else {
                $("#userId").val("NTC-" + tempid);
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log("Error while generating user ID: " + textStatus);
            console.log("Error details: " + errorThrown);
        }
    });
}

//Upload Profile Pic
document.addEventListener("change", function (event) {
    if (event.target.classList.contains("uploadProfileInput")) {
        var triggerInput = event.target;
        var currentImg = triggerInput.closest(".pic-holder").querySelector(".pic")
            .src;
        var holder = triggerInput.closest(".pic-holder");
        var wrapper = triggerInput.closest(".profile-pic-wrapper");

        var alerts = wrapper.querySelectorAll('[role="alert"]');
        alerts.forEach(function (alert) {
            alert.remove();
        });

        triggerInput.blur();
        var files = triggerInput.files || [];
        if (!files.length || !window.FileReader) {
            return;
        }

        if (/^image/.test(files[0].type)) {
            var reader = new FileReader();
            reader.readAsDataURL(files[0]);

            reader.onloadend = function () {
                holder.classList.add("uploadInProgress");
                holder.querySelector(".pic").src = this.result;

                var loader = document.createElement("div");
                loader.classList.add("upload-loader");
                loader.innerHTML =
                    '<div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div>';
                holder.appendChild(loader);

                setTimeout(function () {
                    holder.classList.remove("uploadInProgress");
                    loader.remove();

                    var random = Math.random();
                    if (random < 0.9) {
                        wrapper.innerHTML +=
                            '<div class="snackbar show" role="alert"><i class="fa fa-check-circle text-success"></i> Profile image updated successfully</div>';
                        triggerInput.value = "";
                        setTimeout(function () {
                            wrapper.querySelector('[role="alert"]').remove();
                        }, 3000);
                    } else {
                        holder.querySelector(".pic").src = currentImg;
                        wrapper.innerHTML +=
                            '<div class="snackbar show" role="alert"><i class="fa fa-times-circle text-danger"></i> There is an error while uploading! Please try again later.</div>';
                        triggerInput.value = "";
                        setTimeout(function () {
                            wrapper.querySelector('[role="alert"]').remove();
                        }, 3000);
                    }
                }, 1500);
            };
        } else {
            wrapper.innerHTML +=
                '<div class="alert alert-danger d-inline-block p-2 small" role="alert">Please choose a valid image.</div>';
            setTimeout(function () {
                var invalidAlert = wrapper.querySelector('[role="alert"]');
                if (invalidAlert) {
                    invalidAlert.remove();
                }
            }, 3000);
        }
    }
});


//----------------------------load Text Field Values-------------------------------------

function loadTextFieldValues() {
    $("#registerUserTable>tr").on("click", function () {
        let userId = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let nic = $(this).children().eq(2).text();
        let age = $(this).children().eq(3).text();
        let gender = $(this).children().eq(4).text();
        let email = $(this).children().eq(5).text();
        let roleType = $(this).children().eq(6).text();
        let contactNumber = $(this).children().eq(7).text();
        let address = $(this).children().eq(8).text();

        $("#userId").val(userId);
        $("#reg_Name").val(name);
        $("#reg_NIC").val(nic);
        $("#reg_Age").val(age);
        $("#reg_Gender").val(gender);
        $("#reg_Email").val(email);
        $("#reg_RoleType").val(roleType);
        $("#rag_contactNumber").val(contactNumber);
        $("#rag_address").val(address);


    });
}
