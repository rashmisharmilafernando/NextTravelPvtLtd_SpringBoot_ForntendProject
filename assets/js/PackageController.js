let packagedBaseUrl="";
autoGeneratePackageID();

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
