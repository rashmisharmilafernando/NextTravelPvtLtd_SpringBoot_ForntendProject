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
$("UsersCount").val("0");
$.ajax({

})

//Guide
//Customer
//Today Booking
