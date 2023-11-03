loadBookingDetails();
getBookingByUserId();
autoGeneratebookingid();
loadAllPackageName()
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

    var hotelCategory=$("#packageName").val();
    $("#hotelID").empty();
    $.ajax({
        url:"api/vi/hotel/getAllHotelPackageCategory?hotelCategory="+hotelCategory,
        method:"GET",
        contentType:"application/json",
        dataType:"json",
        success:function (res){
            console.log(res);
            for (let i of res){
                let hotelId=i.hotelId;
                $("#hotelID").append(`<option>${hotelId}</option>`);
            }
        }
    })
});

//-------------------get vehicle Details---------------------------------------------
$("#vehicleRegId").click(function () {
    var vehicleCategory=$("#vehicleRegId").val();
    $.ajax({
        url:"api/vi/vehicle/?vehicleCategory="+vehicleCategory,
        method:"GET",
        contentType:"application/json",
        dataType:"json",
        success:function (res){
            $("#vehicle_brand").val(res.vehiclebrand);
            $("#vehicleSeatCapacity").val(res.vehicleSeatCapacity);
            $("#vehicle_Fuel_Type").val(res.FuelType);
            $("#vehicle_transmission").val(res.transmission);
            let image=res.image.image;
            $("#image").css({
                "background":`url(${image})`,"background-size":"cover"
            });
        },error:function (error){
            console.log(error);
        }
    })

});

//--------------------------get hotel details-------------------------------
$("#hotelID").click(function () {
    var hotelCategory=$("#hotelID").val();
    $.ajax({
        url:"api/v1/hotel/?hotelCategory="+hotelCategory,
        method:"GET",
        contentType:"application/json",
        dataType:"json",
        success:function (res){
            $("#hotelName").val(res.hotel_name);
            $("#location").val(res.locations);
        },error:function (error) {
            console.log(error);
        }
    })
});
//------------------------Select Guide or not & load Details--------------------------------
$("#guideStataus").click(function (){
    let selectedOption=$(this).val();
    if (selectedOption === "yes"){
        $.ajax({
            url:bookingBaseUrl+"api/v1/guide/getGuideByRandom",
            method:"GET",
            dataType:"json",
            success:function (res){
                console.log(res);
                $("#guideId").val(res.guideid);
                $("#guide_name").val(res.guideName);
                $("#guide_Number").val(res.guideNumber);
                $("#guideValue").val(res.guide_Value);
            },
            error:function (error){
                console.log(error);
            }
        });
    }
})
//----------------------Save reservation-----------------------------

$("#saveBookingbtn").on("click", function () {
    let formData = new FormData();


    formData.append( 'reservationDetails',new FormData($("#reservationDetails")[0]))
    formData.append( 'hotelDetails',new FormData($("#hotelDetails")[0]))
    formData.append( 'guideDetails',new FormData($("#guideDetails")[0]))
    formData.append( 'vehicleDetails', new FormData($("#vehicleDetails")[0]))

    $.ajax({
        url: bookingBaseUrl + "api/v1/booking",
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
            alert("Successfully...!");
        },
        error: function (error) {
            console.log(error);
            alert("Try Again...!");
        }
    });
});


//-------------------load all details of Reservation-------------------------------
function loadBookingDetails(){
    $("#customerAccountBookingTable").empty();
    $.ajax({
        url:"",
        method:"GET",
        dataType:"json",
        success:function (res){
            console.log(res);
            for (let i of res.data) {
                let bookingReservation_Id = i.bookingId;
                let package_Category = i.package_Category;
                let hotelName = i.filter_hotel_name;
                let vehicleName = i.vehiclebrand;
                let guideName = i.guideName;
                let starDate = i.start_Date;
                let endDate = i.end_Date;
                let fullPayment = i.total;

                let row="<tr><td>" + bookingReservation_Id + "</td>" +
                    "<td>" + package_Category + "</td>" +
                    "<td>" + hotelName + "</td>" +
                    "<td>" + vehicleName + "</td>" +
                    "<td>" + guideName + "</td>" +
                    "<td>" + starDate + "</td>" +
                    "<td>" + endDate + "</td>" +
                    "<td>" + fullPayment + "</td>" +
                    "</tr>";
                $("#customerAccountBookingTable").append(row)
            }
            autoGeneratebookingid();
        },
        error:function (error){
            console.log(error);
        }
    })
}

/*//-----------------------Select Package and filter the vehicle-----------------------------------

function filterVehicleRegID() {
    let packageName = $("#packageName").val();
    console.log(packageName);
    $("#vehicleRegId").empty();
    $.ajax({
        url: "http://localhost:8090/vehicleServer/api/v1/Vehicle/registrationNumber" + packageName,
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

//---------------------Select vehicle register number-------------------------------

$("#vehicleRegId").click(function () {
    var serachVehicleRegID = $("#vehicleRegId").val();
    $.ajax({
        url: "http://localhost:8090/vehicleServer/api/v1/Vehicle/" + serachVehicleRegID,
        method: "GET",
        contentType: "json",
        data: {
            category: "yourCategoryValue",
            seatCapacity: 4,
            transmissionType: "Automatic",
            fuelType: "Petrol"
        },success: function (res) {
            $("#vehicle_brand").val(res.vehiclebrand);
            $("#vehicle_seatCapacity").val(res.seatCapacity);
            $("#vehicle_Fuel_Type").val(res.FuelType);
            $("#vehicle_transmission").val(res.transmission);
            let url = res.forntImageInBooking;
            $("#imageCard").css({
                "background": `url(${bookingBaseUrl + url})`, "background-size": "cover"
            });
        }, error: function (error) {
            console.log(error);
        }
    });
})*/
