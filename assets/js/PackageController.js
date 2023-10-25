let packagedBaseUrl="";

loadPackages();

//----------------save Package-------------------------
$("#saveBtnPackage").click(function (){
    let formDate=new FormData($("#packageTable")[0]);
    $.ajax({
        url: packagedBaseUrl + "package",
        method: "POST",
        date: formDate,
        contentType: false,
        processData: false,
        success: function (res) {
            saveUpdateAlert("Package",res.message)
            console.log(res)
            loadVehicles();
        },
        error: function (error) {
            console.log(error);
            unSuccessUpdateAlert("Package",error.message)
        }
    })
})


//----------------udpate Package-----------------------
$("#updateBtnPackage").click(function () {
    let formData = new FormData($("#packageTable")[0]);
    $.ajax({
        url: HotelBaseUrl + "package/update",
        method: "PUT",
        data: formData,
        contentType: false,
        processData: false,
        success: function (res) {
            loadPackages();
        },
        error: function (error) {
            console.log(error);
        }
    })
});



//----------------delete Package-----------------------
$("#deleteBtnPackage").click(function () {
    let id = $("#vehicle_id").val();
    $.ajax({
        url: RegisterBaseUrl + "package?id" + id,
        method: "DELETE",
        dataType: "json",
        success: function (res) {
            loadPackages();
        },
        error: function (error) {
            console.log(error);
        }
    })
});

//------------------Auto Generate Booking id--------------------------------
function autoGeneratePackageID() {
    $("#packageid").val("Next-001");
    $.ajax({
        url: packagedBaseUrl + "booking/generateBookingId",
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (res) {
            let id = res.value;
            let tempid = paraseInt(id.split("-")[1]);
            tempid = tempid + 1;
            if (tempid <= 9) {
                $("#packageid").val("Next-00" + tempid);
            } else if (tempid <= 99) {
                $("#packageid").val("Next-0" + tempid);
            } else {
                $("#packageid").val("Next-" + tempid);
            }
        }
    })
}


//--------------------------load package value--------------------------------------------------------------------
function loadPackageValues(){
    var  loadPackageValue=$("#packageName").val();
    $.ajax({
        url:packagedBaseUrl+"package/loadPackage/?packageValue"+loadPackageValue,
        method:"GET",
        contentType:"json",
        success:function (res){
            $("#package_value").val(res.value);
        },error:function (error){
            console.log(error);
        }
    });
}


//---------------------------get all packages---------------------------------------
function loadPackages() {
    $("#packageTable").empty();
    $.ajax({
        url: packagedBaseUrl + "packages/loadPackages",
        method: "GET",
        dataType: "json",
        success: function (res) {
            console.log(res);
            for (let i of res.data) {
                let id = i.package_id;
                let category = i.packageCategory;
                let packageFee = i.PackageFee;
                let hotelNightCount = i.hotelNightCount;
                let hotelDayCount = i.hotelDayCount;
                let hotelHeadCount = i.hotelHeadCount;

                let row="<tr><td>" + id + "</td>" +
                    "<td>" + category + "</td>" +
                    "<td>" + packageFee + "</td>" +
                    "<td>" + hotelNightCount + "</td>" +
                    "<td>" + hotelDayCount + "</td>" +
                    "<td>" + hotelHeadCount + "</td></tr>";
                $("#vehicleTable").append(row)
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
        let id =$(this).children().eq(0).text();
        let category = $(this).children().eq(1).text();
        let packageFee = $(this).children().eq(2).text();
        let hotelNightCount = $(this).children().eq(3).text();
        let hotelDayCount = $(this).children().eq(4).text();
        let hotelHeadCount = $(this).children().eq(5).text();

        $("#packageid").val(id);
        $("#package_category").val(category);
        $("#package_Fee").val(packageFee);
        $("#hotel_Night_Count").val(hotelNightCount);
        $("#hotel_Day_Count").val(hotelDayCount);
        $("#hotel_Head_Count").val(hotelHeadCount);

    });
}

//--------------------------Number of Package-----------------------
$("#PackagesCount").val("0");
$.ajax({
    url:packagedBaseUrl+"packageCount",
    method:"GET",
    contentType:"application/json",
    dataType:"json",
    success:function (res){
        let num=res.count
        $("#PackagesCount").text(num);
    },
    error:function (error){
        console.log(error)
    }
})


//---------------------Load Package to select input---------------------
$("#packageName").empty();
$.ajax({
    url:packagedBaseUrl+"packages/loadPackages",
    method:"GET",
    contentType:"application/json",
    dataType:"json",
    success:function (res){
        for (let i of res){
            let package_Name=i.package_Name;
            $("#packageName").append('<option>${package_Name}</option>');
        }
    }
})


//------------------search Packages-----------------------------------
$("#searchPackage").on("keypress",function (event){
    if (event.which ===13){
        var searchPackage=$("#searchPackage").val();
        $("#packageTable").empty();
        $.ajax({
            url:packagedBaseUrl + "package/searchPackage/?packageId="+searchPackage,
            method:"GET",
            contentType:"application/json",
            dataType:"json",
            success:function (res){
                $("#packageid").val(res.package_id);
                $("#package_category").val(res.packageCategory);
                $("#package_Fee").val(res.PackageFee);
                $("#hotel_Night_Count").val(res.hotelNightCount);
                $("#hotel_Day_Count").val(res.hotelDayCount);
                $("#hotel_Head_Count").val(res.hotelHeadCount);

                let row ="<tr><td>" + res.package_id+"</td>" +
                    "<td>" + res.packageCategory+"</td>"+
                    "<td>" + res.PackageFee+"</td>"+
                    "<td>" + res.hotelNightCount+"</td>"+
                    "<td>" + res.hotelDayCount+"</td>"+
                    "<td>" + res.hotelHeadCount+"</td></tr>";
                $("#packageTable").append(row)
            },
            error:function (error){
                loadPackages();
            }
        })
    }
})


