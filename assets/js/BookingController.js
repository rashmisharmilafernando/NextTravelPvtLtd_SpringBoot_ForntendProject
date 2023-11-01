getBookingByUserId();
autoGeneratebookingid();
loadAllPackageName()
loadBookingDetails();
//========================RegisterUser.html===========================================

//----------------current user id---------------------------

let userId;


$.ajax({
    url: bookingBaseUrl + "getBookingIdsByUserId?userId="+userId,
    method: "GET",
    success: function (res) {
        userId = res.data.customer_id;
        $("#customerid").val(res.data.customer_id);
    }
});

//-----------------------------Load Register user Details---------------------------------

$.ajax({
    url: bookingBaseUrl + "api/v1/user",
    method: "GET",
    contentType: "application/json",
    dataType: "json",
    success: function (res) {
        for (var i of res.data) {
            if (userId === i.userId) {
                $("#userId").val(i.userId);
                $("#reg_Name").val(i.name);
                $("#reg_NIC").val(i.nic);
                $("#reg_Age").val(i.age);
                $("#reg_Gender").val(i.gender);
                $("#reg_Email").val(i.email);
                $("#reg_Password").val(i.password);
                $("#reg_RoleType").val(i.role_Type);
                $("#rag_contactNumber").val(i.contactNumber);
                $("#rag_address").val(i.address);
                $("#regUserProfilePhoto").val(i.profilepic);
            }
        }
    }
})


//===============================Reservation.html========================================
//-----------------------------------Load packageName------------------------------------
function loadAllPackageName() {
    $("#packageName").empty();
   var packgeName=$("#packageName").val();
    $.ajax({
        url: "http://localhost:8085/packageServer/api/v1/package/getPackageByPackageCategory?packageCategory"+packgeName,
        method: "GET",
        contentType: "json",
        dataType: "json",
        success: function (res) {
            for (let i of res) {
                let package_name = i.package_Name;
                $("#packageName").append(`<option>${package_name}</option>`)
            }
        }, error: function (error) {
            console.log(error);
        }
    })
}


//-------------------load Package Details----------------------------------------
$("#packageName").click(function (){
    var packageCategory=$("#packageName").val();
    $.ajax({
        url: "api/v1/package/getPackageByPackageCategory?packageCategory="+packageCategory,
        method:"GET",
        contentType:"application/json",
        dataType:"json",
        success:function (res){
            console.log(res);
            $("#package_value").val(res.value);
            $("#headCount").val(res.head_count);
            $("#nightCount").val(res.night_Count);
            $("#dayCount").val(res.dayCount);
        },
        error: function (error) {
            console.log(error);
        }
    });
    var vehicleCategory=$("#packageName").val();
    $("#vehicleRegId").empty();
    $.ajax({
        url:"api/v1/vehicle/getAllVehicleByCategory?vehicleCategory="+vehicleCategory,
        method:"GET",
        contentType:"application/json",
        datatype:"json",
        success:function (res){
            console.log(res);
            for(let i of res){
                let vehicleRegId=i.vehicleRegId;
                $("#vehicleRegId").append(`<option>${vehicleRegId}</option>`);
            }
        },
        error: function (error) {
           console.log(error);
        }
    })

});

//-------------------select Packages--------------------------------------------
$("#packageName").on("click", function () {
    getVehiclesAndHotels();
});
//--------------------get vehicle Details----------------------------------

function getVehiclesAndHotels() {
    $("#vehicleRegId").empty();
    $("#hotelID").empty();
    hotel_name=$("#hotel_Name").val();
    locations=$("#hotel_Location").val();
    vehiclebrand=$("#vehicle_brand").val();
    SeatCapacity=$("#vehicle_SeatCapacity").val();
    fueltype=$("#vehicle_Fuel_Type").val();
    transmittion=$("#vehicle_transmission").val();
    $.ajax({
        url:
    })





}






$("#vehicleRegId").click(function (){
    var search=$("#vehicleRegId").val();
    $.ajax({
        url:"api/vi/vehicle/"
    })
})
//----------------------get booking by user id-----------------------------------

function getBookingByUserId() {
    userId = $("#customerid").val();
    $.ajax({
        url: "/api/v1/booking/getBookingByUserId?userId=" + userId,
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        success:function (res){

        }
    })
}
//------------------Auto Generate Booking id--------------------------------

function autoGeneratebookingid() {
    bookingId = $("#bookingReservationId").val("NTB-001");
    $.ajax({
        url: "http://localhost:8085/packageServer/api/v1/booking?bookingId=" + bookingId,
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (res) {
            let id = res.value;
            let tempid = paraseInt(id.split("-")[1]);
            tempid = tempid + 1;
            if (tempid <= 9) {
                $("#bookingReservationId").val("NTB-00" + tempid);
            } else if (tempid <= 99) {
                $("#bookingReservationId").val("NTB-0" + tempid);
            } else {
                $("#bookingReservationId").val("NTB-" + tempid);
            }
        }
    })
}
//--------------------------Get package details-------------------

$("#package_Category").empty();
$.ajax({
    url:packagedBaseUrl+"api/v1/package/getPackageNameList",
    method:"GET",
    contentType:"application/json",
    dataType:"json",
    success:function (res){
        for (let i of res){
            let package_Category=i.package_Category;
            $("#package_Category").append('<option>${package_Category}</option>');
        }
    }
})


//----------------------Save booking-----------------------------

$("#saveBookingbtn").on("click", function () {
    let formData = new FormData($("#bookingForm")[0])
    $.ajax({
        url: bookingBaseUrl + "booking/?bookingId=" + bookingId,
        method: "POST",
        data: formData,
        dataType: "json",
        contentType: false,
        processData: false,
        success: function (res) {
            console.log(res);
            loadBookingDetails();
            clearTextFields();
            autoGeneratebookingid();
        },
        error: function (error) {
            console.log(error);
        }
    });
});
//============================UpdateReservation.html===========================================


//-------------------update booking-----------------------
$("#updateBookingBtn").click(function () {
    let formData = new FormData($("#bookingForm")[0])

    $.ajax({
        url: bookingBaseUrl + "api/v1/booking/update",
        method: "POST",
        data: formData,
        dataType: "json",
        contentType: false,
        processData: false,
        success: function (res) {
            console.log(res);
            loadBookingDetails();
            clearTextFields();
            autoGeneratebookingid();
        },
        error: function (error) {
            console.log(error);
        }
    });
});

//======================================Booking.html==============================================

//-------------------load all details of Reservation-------------------------------








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
