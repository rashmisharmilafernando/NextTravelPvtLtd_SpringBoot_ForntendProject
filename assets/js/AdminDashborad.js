
//------------------------------Number of Vehicle-------------------------------------
$("#VehiclesCount").val("00");
$.ajax({
    url: "http://localhost:8090/vehicleServer/api/v1/Vehicle/vehiclesCount",
    method: "GET",
    contentType: "application/json",
    dataType: "json",
    success: function (resp) {
        let num = resp.count;
        console.log(num);
        $("#VehiclesCount").text(num);
    },
    error: function (error) {
        console.log(error);
    }
});


//---------------------------------------Number of Today Booking----------------------------------
$("#tBookingCount").val("0");
$.ajax({
    url: bookingBaseUrl + "booking/getCountOfBooking",
    method: "GET",
    contentType: "application/json",
    dataType: "json",
    success: function (resp) {
        let num = resp.count;
        $("#tBookingCount").text(num);

    },
    error:function (error){
        console.log(error);
    }
});


//------------------------Number of Hotel--------------------------------
$("#HotelsCount").val("0");
$.ajax({
    url:HotelBaseUrl+"getCountOfHotel",
    method:"GET",
    contentType:"application/json",
    dataType:"json",
    success:function (res){
        let num=resp.count;
        $("#HotelsCount").text(num);
    },
    error:function (error){
        console.log(error)
    }
})

//--------------------------Number of Package-----------------------
$("#PackagesCount").val("0");
$.ajax({
    url:packagedBaseUrl+"getCountOfPackage",
    method:"GET",
    contentType:"application/json",
    dataType:"json",
    success:function (res){
        let num=resp.count;
        $("#PackagesCount").text(num);
    },
    error:function (error){
        console.log(error)
    }
})


//---------------------------------------Number of Customer--------------------------------------
$("#customerCount").val("0");
$.ajax({
    url:adminDashboardBaseUrl+"getCountOfCustomer",
    method:"GET",
    contentType:"application/json",
    dataType:"json",
    success:function (res){
        let num=resp.count;
        $("#customerCount").text(num);
    },
    error:function (error){
        console.log(error)
    }
})

//------------------------------Number of User---------------------------------------
$("#UsersCount").val("0");
$.ajax({
    url:UserBaseUrl+"getCountOfUser",
    method:"GET",
    contentType:"application/json",
    dataType:"json",
    success:function (res){
        let num=resp.count;
        $("#UsersCount").text(num);
    },
    error:function (error){
        console.log(error)
    }
})
