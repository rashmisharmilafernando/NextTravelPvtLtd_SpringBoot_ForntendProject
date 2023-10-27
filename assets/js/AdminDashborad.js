
//------------------------------Number of Vehicle-------------------------------------
$("#VehiclesCount").val("00");
$.ajax({
    url: "http://localhost:8090/vehicleServer/api/v1/vehicle/vehiclesCount",
    method: "GET",
    contentType: "application/json",
    dataType: "json",
    success: function (resp) {
        let num = resp.count;
        console.log(num);
        $("#VehiclesCount").text(num);
    },
    error: function (error) {
        console.log(error)
    }
});


//---------------------------------------Number of Today Booking----------------------------------
$("#tBookingCount").val("0");
$.ajax({
    url: bookingBaseUrl + "booking/bookingActive",
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

//---------------------------------Number of Guide----------------------------------------------
$("#GuideCount").val("0");
$.ajax({
    url:GuiderBaseurl+"GuiderCount",
    method:"GET",
    contentType:"application/json",
    dataType:"json",
    success:function (res){
        let num=res.count
        $("#GuideCount").text(num);
    },
    error:function (error){
        console.log(error)
    }
})

//------------------------Number of Hotel--------------------------------
$("#HotelsCount").val("0");
$.ajax({
    url:HotelBaseUrl+"hotelsCount",
    method:"GET",
    contentType:"application/json",
    dataType:"json",
    success:function (res){
        let num=res.count
        $("#HotelsCount").text(num);
    },
    error:function (error){
        console.log(error)
    }
})

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


//---------------------------------------Number of Customer--------------------------------------
$("#customerCount").val("0");
$.ajax({
    url:adminDashboardBaseUrl+"CustomerCount",
    method:"GET",
    contentType:"application/json",
    dataType:"json",
    success:function (res){
        let num=res.count
        $("#customerCount").text(num);
    },
    error:function (error){
        console.log(error)
    }
})

//------------------------------Number of User---------------------------------------
$("#UsersCount").val("0");
$.ajax({
    url:UserBaseUrl+"userCount",
    method:"GET",
    contentType:"application/json",
    dataType:"json",
    success:function (res){
        let num=res.count
        $("#UsersCount").text(num);
    },
    error:function (error){
        console.log(error)
    }
})
