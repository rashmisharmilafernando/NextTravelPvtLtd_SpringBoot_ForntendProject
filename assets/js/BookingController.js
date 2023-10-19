let bookingBaseUrl = "";
loadBookingDetails();

autoGeneratebookingid();

//Auto Generate Booking id
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


//-----------------------------------------------------

$("#packageName").click(function () {
    filterHotelName();
    filterVehicleRegID();
});


function filterHotelName() {
    let packageName = $("#packageName").val();
    console.log(packageName);
    $("#hotelName").empty();
    $.ajax({
        url: bookingBaseUrl + "booking/filterHotel/?packageName" + packageName,
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (res) {
            console.log(res);
            for (let i of res) {
                let hotelName = i.filter_hotel_name;
                $("#hotelName").append(`<option>${hotelName}</option>`)
            }
        }
    })
}

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
    })
}

//-----------------------------------------------------

$("#hotelName").click(function (){
    var searchHotelName=$("#hotelName").val();
    $.ajax({
        url:bookingBaseUrl+"hotel/searchHotelName/?hotelName"+searchHotelName,
        method:"GET",
        contentType:"application/json",
        dataType:"json",
        success:function (res){
            $("#locations").val(res.hotel_locations);

        },error:function (error){
            console.log(error);
        }
    })
})
//----------------------------------------------------

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
    })
});

//------------------------------------------------------

$("#guideStataus").click(function (){
    let selectedOption=$(this).val();

    if (selectedOption === "yes"){
        $.ajax({
            url:bookingBaseUrl+"guide/yesGuide",
            method:"GET",
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
    }
});

//-------------------------------------------
$("#allDays").click(function (){
    let daycount=$("#allDays").val();
    let packageprice=$("#package_value").val();
    let guideValue=$("#guideValue").val();

    let fullPayment = daycount * packageprice*guideValue;

    $.ajax({
        url:bookingBaseUrl+"booking/payment"+fullPayment,
        method:"GET",
        dataType:"json",
        success:function (res){
            $("#amount").val(res.pay_amount);
        },
    })
})

//---------------------------------------------------------

$("#saveBookingbtn").click(function (){
    let bookingid=$("#bookingId").val();
    let userid=$("#bookingCustomerId").val();
    let hotelid=$("#hotelid")

})
