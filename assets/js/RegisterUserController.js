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
        },
        error: function (error) {
            console.log(error);
        }
    })

});

//Delete Customer form ManageCustomer.html
$("#btnDeleteRegUser").click(function (){
    let email=$("#email").val();
    $.ajax({
        url:"http://localhost:8080/user/api/v1/user/userEmail?email" +email,
        method:"DELETE",
        dataType:"json",
        success:function (res){
            loadAllRegisterUser();
        },
        error: function (error) {
            console.log(error);
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

            for (let i of res.data){
                let id=i.Id;
                let name=i.Regutsername;
                let email=i.RegutserEmail;
                let nic=i.Regutsernic;
                let address=i.Regutseraddrss;

                let row ="<tr><td>" + id+"</td>" +
                    "<td>" + name + "</td>" +
                    "<td>" + email+"</td>"+
                    "<td>" + nic+"</td>"+
                    "<td>" + address+"</td></tr>";
                $("#registerUserTable").append(row)
            }
            autoGenerateid();
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


/*-------------------------------------------------------*/
$("#updateUserDetails").click(function (){
    let formData=new FormData($("#userAccountDetails")[0]);
    $.ajax({
        url:RegisterBaseUrl+"registerUser/updatedtails",
        method:"post",
        data:formData,
        contentType:false,
        processData:false,
        success:function (res){
            loadAllRegisterUser();
        },
        error:function (error){
            console.log(error)
        }
    })
});

