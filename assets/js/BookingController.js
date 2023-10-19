let bookingBaseUrl = "";
loadBookingDetails();

autoGeneratebookingid();

//------------------Auto Generate Booking id--------------------------------

function autoGeneratebookingid() {
    $("#searchbookingid").val("NTB001");
    $.ajax({
        url: bookingBaseUrl + "booking/generatebookingid",
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (res) {
            let id = res.value;
            let tempid = paraseInt(id.split("-")[1]);
            tempid = tempid + 1;
            if (tempid <= 9) {
                $("#searchbookingid").val("NTB00" + tempid);
            } else if (tempid <= 99) {
                $("#searchbookingid").val("NTB0" + tempid);
            } else {
                $("#searchbookingid").val("NTB" + tempid);
            }
        }
    })
}

let regUser;



$.ajax({
    url:bookingBaseUrl+"loginForm/current",
    method:"GET",
    success:function (res){
        regUser=res.data.customer_id;
        $("#customerid").val(res.customer_id);
    }
});

//-----------------------------Load Register user Details---------------------------------

$.ajax({
    url:bookingBaseUrl+"registerUser/loadAllRegUserDetails",
    method:"GET",
    contentType:"application/json",
    dataType:"json",
    success:function (res){
        for (var regUser of res.data){
            if (regUser === regUser.customer_id){
                $("#customerid").val(regUser.customer_id);
                $("#regUserName").val(regUser.reg_User_Name);
                $("#regUserEmail").val(regUser.reg_User_Email);
                $("#regUserAddress").val(regUser.reg_User_address);
                $("#regUserPassword").val(regUser.regUser_password);
                $("#regUserUsername").val(regUser.reg_User_Username);
                $("#regUserProfilePhoto").val(regUser.profile_pic);
            }
        }
    }
})
//---------------------Load Package to select input---------------------
$("#packageName").empty();
$.ajax({
    url:bookingBaseUrl+"packages/loadPackages",
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

//-------------------select package----------------------------------

$("#packageName").click(function () {
    loadPackageValues();
    filterHotelName();
    filterVehicleRegID();
});


//--------------------------load package value--------------------------------------------------------------------
function loadPackageValues(){
    var  loadPackageValue=$("#packageName").val();
    $.ajax({
        url:bookingBaseUrl+"package/loadPackage/?packageValue"+loadPackageValue,
        method:"GET",
        contentType:"json",
        success:function (res){
            $("#package_value").val(res.value);
        },error:function (error){
            console.log(error);
        }
    });
}

//-----------------------select package and filter hotel-------------------------------------

function filterHotelName() {
    let packageName = $("#packageName").val();
    console.log(packageName);
    $("#HotelID").empty();
    $("#hotelName").empty();
    $.ajax({
        url: bookingBaseUrl + "booking/filterHotel/?hotelName" + packageName,
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (res) {
            console.log(res);
            for (let i of res) {
                let hotelId = i.hotel_id;
                let hotelName = i.filter_hotel_name;
                $("#HotelID").append(`<option>${hotelId}</option>`)
                $("#hotelName").append(`<option>${hotelName}</option>`)
            }
        }
    });
}

//-----------------------Select Package and filter the vehicle-----------------------------------

function filterVehicleRegID() {
    let packageName = $("#packageName").val();
    console.log(packageName);
    $("#vehicleRegId").empty();
    $.ajax({
        url: bookingBaseUrl + "booking/filterHotel/?packageName" + packageName,
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (res) {
            console.log(res);
            for (let i of res) {
                let reg_Id = i.vehicle_Reg_Id;
                $("#vehicleRegId").append(`<option>${reg_Id}</option>`)
            }
        }
    });
}

//-------------------Select hotel Id----------------------------------

$("#HotelID").click(function (){
    var searchHotelName=$("#HotelID").val();
    $.ajax({
        url:bookingBaseUrl+"hotel/searchHotel/?HotelID"+searchHotelName,
        method:"GET",
        contentType:"application/json",
        dataType:"json",
        success:function (res){
            $("#hotelName").val(res.filter_hotel_name);
            $("#locations").val(res.filter_Location);

        },error:function (error){
            console.log(error);
        }
    });
})
//---------------------Select vehicle register number-------------------------------

$("#vehicleRegId").click(function (){
    var serachVehicleRegID=$("#vehicleRegId").val();
    $.ajax({
        url:bookingBaseUrl+"vehicle/serachVehicleRegid/?vehicleRedId"+serachVehicleRegID,
        method:"GET",
        contentType:"json",
        success:function (res){
            $("#vehicle_brand").val(res.vehiclebrand);
            $("#vehicle_seatCapacity").val(res.seatCapacity);
            $("#vehicle_Fuel_Type").val(res.FuelType);
            $("#vehicle_transmission").val(res.transmission);
            let url=res.forntImageInBooking;
            $("#imageCard").css({
                "background":`url(${bookingBaseUrl+url})`,"background-size":"cover"
            });
        },error:function (error){
            console.log(error);
        }
    });
})

//---------------------- Select Guide or not--------------------------------

$("#guideStataus").click(function (){
    let selectedOption=$(this).val();

    if (selectedOption === "yes"){
        $.ajax({
            url:bookingBaseUrl+"guide/yesGuide",
            method:"GET",
            dataType:"json",
            success:function (res){
                $("#guide_id").val(res.guideid);
            },
            error:function (error){
                console.log(error);
            }
        });
    }
})
//--------------Load Guide Details-----------------------------------------

$("#guide_id").click(function (){
    var searchGuide=$("#guide_id").val();
    $.ajax({
        url:bookingBaseUrl+"guide/serachGuide/?guide_id="+searchGuide,
        method:"GET",
        contentType:"application/json",
        dataType:"json",
        success:function (res){
            $("#guide_name").val(res.guideName);
            $("#guide_Number").val(res.guideNumber);
            $("#guideValue").val(res.guide_Value);
        },
        error:function (error){
            console.log(error);
        }
    })
});


//---------------------Calculate the payment---------------------------------
$("#allDays").on("click", function () {
    $.ajax({
        url: bookingBaseUrl + "booking/paymentDetails",
        method: "GET",
        dataType: "json",
        success: function (res) {
            let allDaysCount = res.All_days;
            $(document).on("#package_value,#guideValue,#allDays", function () {
                let packageValue = $("#package_value").val();
                let guidevalue = $("#guideValue").val();
                let days = $("#allDays").val();
                $("#full_payment").val(parseFloat(packageValue) * parseFloat(guidevalue) * packageValue(days));
            });
        }
    });
});


//--------------Save booking-----------------------------

$("#saveBookingbtn").on("click", function () {
    let bookingId=$("#bookingId").val();
    let package_Name=$("#packageName").val();
    let userId=$("#bookingCustomerId").val();
    let hotelId=$("#HotelID").val();
    let vehicleId=$("#vehicleRegId").val();
    let startDate=$("#startDate").val();
    let endDate=$("#endDate").val();
    let nightCount=$("#nightCount").val();
    let dayCount=$("#dayCount").val();
    let numberOfAdults=$("#adults").val();
    let numberOfChildren=$("#children").val();
    let guideId=$("#guide_id").val();
    let location=$("#Location").val();
    let totalPayment=$("#full_payment").val();
    let totalPaymentSlip=$("#imageofslip").val();

    var bookingObject={
        bookingId:{
            bookingId:bookingId
        },
        packageName:packageName,
        userId:userId,
        hotelId:hotelId,
        vehicleId:vehicleId,
        startDate:startDate,
        endDate:endDate,
        nightCount:nightCount,
        dayCount:dayCount,
        numberOfAdults:numberOfAdults,
        numberOfChildren:numberOfChildren,
        guideId:guideId,
        location:location,
        totalPayment:totalPayment,
        totalPaymentSlip:totalPaymentSlip

    }

    $.ajax({
        url:bookingBaseUrl+"booking/?bookingId="+bookingId,
        method:"POST",
        data:JSON.stringify(bookingObject),
        dataType: "json",
        contentType: "application/json",
        success:function (res){
            autoGeneratebookingid();
        },
        error:function (error){
            console.log(error);
        }
    });
});

$.ajax({
    url:bookingBaseUrl+"booking",
    method:"GET",
    dataTpye:"json",
    contentType: "application/json",
    success:function (res){
        for (let i of res.data){
            let row =
                "<tr>" +
                    "<td>" + i.booking_Id.bookingId + "</td>" +
                    "<td>" + i.booking_Id.package_Name + "</td>" +
                    "<td>" + i.filter_hotel_name + "</td>" +
                    "<td>" + i.vehiclebrand + "</td>" +
                    "<td>" + i.guideName + "</td>" +
                    "<td>" + i.start_Date + "</td>" +
                    "<td>" + i.end_Date + "</td>" +
                    "<td>" + i.total + "</td>" +
                "</tr>";
            $("#paymentTable").append(row);
        }
    }
})
