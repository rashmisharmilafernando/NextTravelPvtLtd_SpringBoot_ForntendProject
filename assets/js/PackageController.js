loadPackages();
autoGeneratePackageID();

//----------------save Package-------------------------
$("#saveBtnPackage").click(function () {
    let formData = new FormData($("#packageFrom")[0]);
    console.log(formData);
    $.ajax({
        url: "http://localhost:8085/packageServer/api/v1/package",
        method: "POST",
        data: formData,
        contentType: false,
        processData: false,
        success: function (res) {
            console.log("Success:", res);
            loadPackages();
            clearTextFields();
            alert("Successfully...!");
        },
        error: function (error) {
            loadPackages();
            console.log("Response Text:", error.responseText);
            alert("Try Again...!");
        }
    });
});

//----------------update Package-----------------------
$("#updateBtnPackage").click(function () {
    let formData = new FormData($("#packageFrom")[0]);
    $.ajax({
        url: "http://localhost:8085/packageServer/api/v1/package/update",
        method: "PUT",
        data: formData,
        contentType: false,
        processData: false,
        success: function (res) {
            alert("Successfully...!");
            loadPackages();
            clearTextFields();
        },
        error: function (error) {
            alert("Try Again...!");
            console.log(error);
        }
    });
});

//----------------delete Package-----------------------
$("#deleteBtnPackage").click(function () {
    let id = $("#packageId").val();
    $.ajax({
        url: "http://localhost:8085/packageServer/api/v1/package?id=" + id,
        method: "DELETE",
        dataType: "json",
        success: function (res) {
            console.log(res);
            alert("Successfully...!");
            loadPackages();
            clearTextFields();
        },
        error: function (error) {
            loadPackages();
            alert("Successfully...!");
            console.log(error);
        }
    });
});

//------------------Auto Generate Booking id--------------------------------
function autoGeneratePackageID() {
    $("#packageId").val("NEXT-001");
    $.ajax({
        url: "http://localhost:8085/packageServer/api/v1/package/autoGenerateId",
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (res) {
            let id = res.value;
            console.log("id  :-" + id + " " + res);
            let tempid = parseInt(id.split("-")[1]);
            tempid = tempid + 1;
            if (tempid <= 9) {
                $("#packageId").val("NEXT-00" + tempid);
            } else if (tempid <= 99) {
                $("#packageId").val("NEXT-0" + tempid);
            } else {
                $("#packageId").val("NEXT-" + tempid);
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}



//---------------------------get all packages---------------------------------------
function loadPackages() {
    $("#packageTable").empty();
    $.ajax({
        url: "http://localhost:8085/packageServer/api/v1/package/loadPackages",
        method: "GET",
        dataType: "json",
        success: function (res) {
            console.log(res);
            for (let i of res.data) {
                let id = i.packageId;
                let category = i.packageCategory;
                let packageFee = i.price;
                let hotelNightCount = i.nightCount;
                let hotelDayCount = i.dayCount;
                let hotelHeadCount = i.totalHeadCount;

                let row="<tr><td>" + id + "</td>" +
                    "<td>" + category + "</td>" +
                    "<td>" + packageFee + "</td>" +
                    "<td>" + hotelNightCount + "</td>" +
                    "<td>" + hotelDayCount + "</td>" +
                    "<td>" + hotelHeadCount + "</td></tr>";
                $("#packageTable").append(row)
            }
            autoGeneratePackageID();
            checkValidity(packageValidation);
            loadTextFieldValues();
        },
        error: function (error) {
            console.log(error);
        }
    })
}

//----------------------------load Text Field Values-------------------------------------
function loadTextFieldValues(){
    $("#packageTable>tr").on("click",function (){
        let packageId =$(this).children().eq(0).text();
        let packageCategory = $(this).children().eq(1).text();
        let price = $(this).children().eq(2).text();
        let nightCount = $(this).children().eq(3).text();
        let dayCount = $(this).children().eq(4).text();
        let totalHeadCount = $(this).children().eq(5).text();

        $("#packageId").val(packageId);
        $("#packageCategory").val(packageCategory);
        $("#price").val(price);
        $("#nightCount").val(nightCount);
        $("#dayCount").val(dayCount);
        $("#totalHeadCount").val(totalHeadCount);

    });
}

//---------------------clear---------------------------
function clearTextFields() {
    $("#packageId").val("");
    $("#packageCategory").val("");
    $("#price").val("");
    $("#nightCount").val("");
    $("#dayCount").val("");
    $("#totalHeadCount").val("");
}



//---------------------Load Package to select input---------------------
$("#packageCategory").empty();
$.ajax({
    url:packagedBaseUrl+"packages/loadPackages",
    method:"GET",
    contentType:"application/json",
    dataType:"json",
    success:function (res){
        for (let i of res){
            let packageCategory=i.packageCategory;
            $("#packageCategory").append('<option>${packageCategory}</option>');
        }
    }
})


//------------------search Packages-----------------------------------


function searchPackageId() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchPackage");
    filter = input.value.toUpperCase();
    table = document.getElementById("packageTable");
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

//--------------------------load package value--------------------------------------------------------------------
    function loadPackageValues() {
        var loadPackageValue = $("#packageCategory").val();
        $.ajax({
            url: packagedBaseUrl + "package/loadPackage/?packageValue" + loadPackageValue,
            method: "GET",
            contentType: "json",
            success: function (res) {
                $("#price").val(res.value);
            }, error: function (error) {
                console.log(error);
            }
        });
    }

