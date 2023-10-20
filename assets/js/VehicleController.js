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
            loadVehicles();
        },
        error: function (error) {
            console.log(error);
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
        var searchGuide=$("#searchbtn").val();
        $("#vehicleTable").empty();
        $.ajax({
            url:RegisterBaseUrl + "vehicle/searchVehicle/?vehicleid="+searchGuide,
            method:"GET",
            contentType:"application/json",
            dataType:"json",
            success:function (res){
                $("#vehicle_id").val(res.vehicleid);
                $("#vehicle_brand").val(res.vehiclebrand);
                $("#vehicle_Category").val(res.vehicleCategory);
                $("#Transmission_type").val(res.TransmissionType);
                $("#vehicle_Fuel_type").val(res.vehicleFueltype);
                $("#vehicle_Driver_Name").val(res.vehicleDriverName);
                $("#vehicle_Drive_Number").val(res.vehicleDriveNumber);

                let row ="<tr><td>" + res.guide_id+"</td>" +
                    "<td>" + res.vehicleid + "</td>" +
                    "<td>" + res.vehiclebrand+"</td>"+
                    "<td>" + res.vehicleCategory+"</td>"+
                    "<td>" + res.TransmissionType+"</td>"+
                    "<td>" + res.vehicleFueltype+"</td>"+
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
function loadAllHotel() {
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
                let vehicleType = i.vehicleType;
                let transmissionType = i.TransmissionType;
                let fuelType = i.vehicleFueltype;
                let driverName = i.vehicleDriverName;
                let driverNumber = i.vehicleDriveNumber;

                let row="<tr><td>" + id + "</td>" +
                    "<td>" + brand + "</td>" +
                    "<td>" + category + "</td>" +
                    "<td>" + vehicleType + "</td>" +
                    "<td>" + transmissionType + "</td>" +
                    "<td>" + fuelType + "</td>" +
                    "<td>" + driverName + "</td>" +
                    "<td>" + driverNumber + "</td></tr>";
                $("#vehicleTable").append(row)
            }
            autoGenerateId();
            checkValidity(vehicleValidation);

        },
        error: function (error) {
            console.log(error);
        }
    })
}
//Auto Generate id
function autoGenerateId(){
    $("#vehicle_id").val("V001");
    $.ajax({
        url:vehicleBasrurl+"vehicle/autoGenerateid",
        method:"GET",
        contentType:"application/json",
        dataType:"json",
        success:function (resp){
            let id = resp.value;
            let tempid = parseInt(id.split("-")[1]);
            tempid = tempid + 1;
            if (tempid <= 9) {
                $("#vehicle_id").val("V00" + tempid);
            } else if (tempid <= 99) {
                $("#vehicle_id").val("V0" + tempid);
            } else {
                $("#vehicle_id").val("V" + tempid);
            }
        },
        error: function (error) {
            console.log(error);
        }
    })
}
