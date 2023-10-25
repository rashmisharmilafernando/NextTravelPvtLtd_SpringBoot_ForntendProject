//http://localhost:8090/vehicleServer/vehicle
let vehicleBasrurl="http://localhost:8090/vehicleServer/";
loadVehicles();

//save Vehicle
$("#saveVehiclebtn").click(function (){
    let formDate=new FormData($("#vehicleTable")[0]);
    $.ajax({
        url: vehicleBasrurl + "vehicle",
        method: "POST",
        date: formDate,
        contentType: false,
        processData: false,
        success: function (res) {
            saveUpdateAlert("Vehicle",res.message)
            console.log(res)
            loadVehicles();
        },
        error: function (error) {
            console.log(error);
            unSuccessUpdateAlert("Vehicle",error.message)
        }
    })
})

//update vehicle
$("#updateVehiclebtn").click(function () {
    let formData = new FormData($("#vehicleTable")[0]);
    $.ajax({
        url: HotelBaseUrl + "vehicle/update",
        method: "PUT",
        data: formData,
        contentType: false,
        processData: false,
        success: function (res) {
            loadVehicles();
        },
        error: function (error) {
            console.log(error);
        }
    })
});

//delete vehicle
$("#deleteVehiclebtn").click(function () {
    let id = $("#vehicle_id").val();
    $.ajax({
        url: RegisterBaseUrl + "vehicle?id" + id,
        method: "DELETE",
        dataType: "json",
        success: function (res) {
            loadVehicles();
        },
        error: function (error) {
            console.log(error);
        }
    })
});

//search vehicle
$("#searchbtn").on("keypress",function (event){
    if (event.which ===13){
        var searchVehicle=$("#searchbtn").val();
        $("#vehicleTable").empty();
        $.ajax({
            url:RegisterBaseUrl + "vehicle/searchVehicle/?vehicleId="+searchVehicle,
            method:"GET",
            contentType:"application/json",
            dataType:"json",
            success:function (res){
                $("#vehicle_id").val(res.vehicleid);
                $("#vehicle_brand").val(res.vehiclebrand);
                $("#vehicle_Category").val(res.vehicleCategory);
                $("#vehicle_Fuel_type").val(res.vehicleFueltype);
                $("#hybridStatus").val(res.hybrid_Status);
                $("#vehicle_Seat_Capacity").val(res.vehicleSeatCapacity);
                $("#vehicle_type").val(res.vehicleType);
                $("#Transmission_type").val(res.TransmissionType);
                $("#vehicle_Driver_Name").val(res.vehicleDriverName);
                $("#vehicle_Drive_Number").val(res.vehicleDriveNumber);

                let row ="<tr><td>" + res.guide_id+"</td>" +
                    "<td>" + res.vehicleid + "</td>" +
                    "<td>" + res.vehiclebrand+"</td>"+
                    "<td>" + res.vehicleCategory+"</td>"+
                    "<td>" + res.vehicleFueltype+"</td>"+
                    "<td>" + res.hybrid_Status+"</td>"+
                    "<td>" + res.vehicleSeatCapacity+"</td>"+
                    "<td>" + res.vehicleType+"</td>"+
                    "<td>" + res.TransmissionType+"</td>"+
                    "<td>" + res.vehicleDriverName+"</td>"+
                    "<td>" + res.vehicleDriveNumber+"</td></tr>";
                $("#vehicleTable").append(row)
            },
            error:function (error){
                loadAllGuide();
            }
        })
    }
})
//get all vehicle
function loadVehicles() {
    $("#vehicleTable").empty();
    $.ajax({
        url: HotelBaseUrl + "vehicle/loadAllVehicle",
        method: "GET",
        dataType: "json",
        success: function (res) {
            console.log(res);
            for (let i of res.data) {
                let id = i.vehicleid;
                let brand = i.vehiclebrand;
                let category = i.vehicleCategory;
                let fuelType = i.vehicleFueltype;
                let isHybrid = i.hybrid_Status;
                let seatCapacity = i.vehicleSeatCapacity;
                let vehicleType = i.vehicleType;
                let transmissionType = i.TransmissionType;
                let driverName = i.vehicleDriverName;
                let driverNumber = i.vehicleDriveNumber;

                let row="<tr><td>" + id + "</td>" +
                    "<td>" + brand + "</td>" +
                    "<td>" + category + "</td>" +
                    "<td>" + fuelType + "</td>" +
                    "<td>" + isHybrid + "</td>" +
                    "<td>" + seatCapacity + "</td>" +
                    "<td>" + vehicleType + "</td>" +
                    "<td>" + transmissionType + "</td>" +
                    "<td>" + driverName + "</td>" +
                    "<td>" + driverNumber + "</td></tr>";
                $("#vehicleTable").append(row)
            }
            autoGenerateId();
            checkValidity(vehicleValidation);
            loadTextFieldValues();
        },
        error: function (error) {
            console.log(error);
        }
    })
}

//Auto Generate id
function autoGenerateId(){
    $("#vehicle_id").val("V-001");
    $.ajax({
        url:vehicleBasrurl+"vehicle/autoGenerateId",
        method:"GET",
        contentType:"application/json",
        dataType:"json",
        success:function (resp){
            let id = resp.value;
            let tempid = parseInt(id.split("-")[1]);
            tempid = tempid + 1;
            if (tempid <= 9) {
                $("#vehicle_id").val("V-00" + tempid);
            } else if (tempid <= 99) {
                $("#vehicle_id").val("V-0" + tempid);
            } else {
                $("#vehicle_id").val("V-" + tempid);
            }
        },
        error: function (error) {
            console.log(error);
        }
    })
}
//------------------------------Number of Vehicle-------------------------------------
$("#VehiclesCount").val("0");
$.ajax({
    url:vehicleBasrurl+"vehiclesCount",
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

//----------------------------load Text Field Values-------------------------------------

function loadTextFieldValues(){
    $("#vehicleTable>tr").on("click",function (){
        let id =  $(this).children().eq(0).text();
        let brand = $(this).children().eq(1).text();
        let category =$(this).children().eq(2).text();
        let fuelType = $(this).children().eq(3).text();
        let isHybrid = $(this).children().eq(4).text();
        let seatCapacity = $(this).children().eq(5).text();
        let vehicleType = $(this).children().eq(6).text();
        let transmissionType = $(this).children().eq(7).text();
        let driverName = $(this).children().eq(8).text();
        let driverNumber =$(this).children().eq(9).text();

        $("#vehicle_id").val(id);
        $("#vehicle_brand").val(brand);
        $("#vehicle_Category").val(category);
        $("#vehicle_Fuel_type").val(fuelType);
        $("#hybridStatus").val(isHybrid);
        $("#vehicle_Seat_Capacity").val(seatCapacity);
        $("#vehicle_type").val(vehicleType);
        $("#Transmission_type").val(transmissionType);
        $("#vehicle_Driver_Name").val(driverName);
        $("#vehicle_Drive_Number").val(driverNumber);


    });
}

//-----------------------Select Package and filter the vehicle-----------------------------------

function filterVehicleRegID() {
    let packageName = $("#packageName").val();
    console.log(packageName);
    $("#vehicleRegId").empty();
    $.ajax({
        url: vehicleBasrurl + "booking/filterVehicle/?vehicleRegisterId" + packageName,
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

$("#vehicleRegId").click(function (){
    var serachVehicleRegID=$("#vehicleRegId").val();
    $.ajax({
        url:vehicleBasrurl+"vehicle/filterVehicleDetails/?vehicleRedId"+serachVehicleRegID,
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
