let adminDashboardBaseUrl="";

//Package
$("#PackagesCount").val("0");
$.ajax({
    url:adminDashboardBaseUrl+"packagecount",
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

//Hotel
$("#HotelsCount").val("0");
$.ajax({
    url:adminDashboardBaseUrl+"hotelsCount",
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

//Vehicle
$("#VehiclesCount").val("0");
$.ajax({
    url:adminDashboardBaseUrl+"vehiclesCount",
    method:"GET",
    contentType:"application/json",
    dataType:"json",
    success:function (res){
        let num=res.count
        $("#VehiclesCount").text(num);
    },
    error:function (error){
        console.log(error)
    }
})

//Admin
$("#VehiclesCount").val("0");
$.ajax({
    url:adminDashboardBaseUrl+"vehiclesCount",
    method:"GET",
    contentType:"application/json",
    dataType:"json",
    success:function (res){
        let num=res.count
        $("#VehiclesCount").text(num);
    },
    error:function (error){
        console.log(error)
    }
})

//User
$("#UsersCount").val("0");
$.ajax({
    url:adminDashboardBaseUrl+"userCount",
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

//Guide
$("#GuideCount").val("0");
$.ajax({
    url:adminDashboardBaseUrl+"GuiderCount",
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
//Customer
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
//Today Booking
$("#tBookingCount").val("0");
$.ajax({
    url: adminDashboardBaseUrl + "booking/bookingActive",
    method: "GET",
    contentType: "application/json",
    dataType: "json",
    success: function (resp) {
        let num = resp.count;
        $("#tBookingCount").text(num);

    },
    error:function (error){
        console.log(error)
    }
});
