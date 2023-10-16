let RegisterBaseUrl="";
loadAllRegisterUser();

//Save Register User
$("#register_button").click(function (){
    let formDate=new FormData($("#registerForm")[0]);
    console.log(formDate);
    $.ajax({
        url:RegisterBaseUrl+"registerUser",
        method:"POST",
        data:formDate,
        contentType:false,
        processData: false,
        success:function (res){
            loadAllRegisterUser();
        }
    })
})

//search id
$("#searchRegUser").on("keypress",function (event){
    if (event.which ===20){
        var searchRegisterUser=$("#searchRegUser").val();
        $("#registerUserTable").empty();
        $.ajax({
            url:RegisterBaseUrl + "regUser/searchCustomer/?userid="+searchRegisterUser,
            method:"GET",
            contentType:"application/json",
            dataType:"json",
            success:function (res){
                $("#RegUserId").val(res.RegutserId);
                $("#regname").val(res.Regutsername);
                $("#regEmail").val(res.RegutserEmail);
                $("#regPassword").val(res.RegutserPassword);
                $("#regUsername").val(res.RegutserUsername);
                $("#regNIC").val(res.Regutsernic);
                $("#regAddress").val(res.Regutseraddrss);

                let row ="<tr><td>" + res.RegutserId+"</td>" +
                    "<td>" + res.Regutsername + "</td>" +
                    "<td>" + res.RegutserEmail+"</td>"+
                    "<td>" + res.Regutsernic+"</td>"+
                    "<td>" + res.Regutseraddrss+"</td></tr>";
                $("#registerUserTable").append(row)
            },
            error:function (error){
                loadAllRegisterUser()
            }
        })
    }
})

//update Register User
$("#btnUpdateRegUser").click(function (){
    let formData=new FormData($("#registerUserTable")[0]);
    $.ajax({
        url:RegisterBaseUrl+"regUser/update",
        method:"PUT",
        data:formData,
        contentType:false,
        processData: false,
        success:function (res){
            loadAllRegisterUser();
        }
    })

});

//Delete Register User
$("#btnDeleteRegUser").click(function (){
    let id=$("#Id").val();
    $.ajax({
        url:RegisterBaseUrl+"regUser?id" +id+" ",
        method:"DELETE",
        dataType:"json",
        success:function (res){
            loadAllRegisterUser();
        }
    })

});
// Customer Table
function loadAllRegisterUser(){
    $("#registerUserTable").empty();
    $.ajax({
        url:RegisterBaseUrl + "registerUser/loadAllRegisterUser",
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

        }
    })
}

//autoGenerateid
function autoGenerateid(){
    $("#Id").val("C001");
    $.ajax({
        url:RegisterBaseUrl+"registerUser/autoGenerateID",
        method:"GET",
        contentType:"application/json",
        dataType:"json",
        success:function (resp){
            let id=resp.value;
            let tempid=parseInt(id.split("-")[1]);
            tempid=tempid+1;
            if (tempid <= 9){
                $("#Id").val("C00-00" + tempid);
            }else if (tempid <= 99){
                $("#Id").val("C00-0" + tempid);
            }else {
                $("#Id").val("C00-"+tempid);
            }
        },
        error:function (ob,statusText,error){

        }
    })
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


//Validation
const reguserName=/^[A-z ]{3,20}$/;
const reguserEmail=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const reguserPassword=/^([A-Z a-z]{5,15}[0-9]{1,10})$/;
const regUsername=/^[A-z0-9/ ]{4,30}$/;
const reguserNic=/^([0-9]{12}|[0-9V]{10})$/;
const reguserAddress=/^[A-z0-9/ ]{4,30}$/;

let registerUserValidation=[];
registerUserValidation.push({
    reg:reguserName,field:$('#regname')
})
registerUserValidation.push({
    reg:reguserEmail,field:$('#regEmail')
})
registerUserValidation.push({
    reg:reguserPassword,field:$('#regPassword')
})
registerUserValidation.push({
    reg:regUsername,field:$('#regUsername')
})
registerUserValidation.push({
    reg:reguserNic,field:$('#regNIC')
})
registerUserValidation.push({
    reg:reguserAddress,field:$('#regAddress')
})
$("#regname,#regEmail,#regNIC,#regUsername,#regPassword,#regAddress").on('keyup', function (event) {
    checkValidity(registerUserValidation);
});

$("#regname,#regEmail,#regNIC,#regUsername,#regPassword,#regAddress").on('blur', function (event) {
    checkValidity(registerUserValidation);
});
