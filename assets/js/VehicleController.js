loadVehicles();
autoGenerateId();

$("#saveVehiclebtn").click(function () {
    let formData = new FormData($("#vehicleForm")[0]);
    formData.append("vehicleId", $("#vehicleId").val());
    formData.append("vehiclebrand", $("#vehicle_brand").val());
    formData.append("vehicleCategory", $("#vehicle_Category").val());
    formData.append("vehicleFueltype", $("#vehicle_Fuel_type").val());
    formData.append("hybridStatus", $("#hybridStatus").val());
    formData.append("vehicleFuelUsage", $("#vehicle_Fuel_Usage").val());
    formData.append("vehicleSeatCapacity", $("#vehicle_Seat_Capacity").val());
    formData.append("vehicleType", $("#vehicle_type").val());
    formData.append("transmissionType", $("#transmissionType").val());
    formData.append("vehicleDriverName", $("#vehicle_Driver_Name").val());
    formData.append("vehicleDriveNumber", $("#vehicle_Drive_Number").val())
    formData.append("license", $("#license")[0].files[0]);
    formData.append("vehicleRearView", $("#vehicle_Rear_View")[0].files[0]);
    formData.append("vehicle_Font_View", $("#vehicleFontView")[0].files[0]);
    formData.append("vehicle_Side_View", $("#vehicleSideView")[0].files[0]);
    formData.append("vehicle_OtherSide_View", $("#vehicleOtherSideView")[0].files[0]);

    $.ajax({
        url: "http://localhost:8090/vehicleServer/api/v1/vehicle",
        method: "POST",
        data: formData,
        contentType: false,
        processData: false,
        success: function (res) {
            console.log("Success:", res);
            loadVehicles();
            alert("Successfully....!");
        },
        error: function (xhr) {
            console.log("Response Text:", xhr.responseText);
            alert("Try again....!");
        }
    });
});


//update vehicle
$("#updateVehiclebtn").click(function () {
    let formData = new FormData($("#vehicleForm")[0]);
    formData.append("vehicleId", $("#vehicleId").val());
    formData.append("vehiclebrand", $("#vehicle_brand").val());
    formData.append("vehicleCategory", $("#vehicle_Category").val());
    formData.append("vehicleFueltype", $("#vehicle_Fuel_type").val());
    formData.append("hybridStatus", $("#hybridStatus").val());
    formData.append("vehicleFuelUsage", $("#vehicle_Fuel_Usage").val());
    formData.append("vehicleSeatCapacity", $("#vehicle_Seat_Capacity").val());
    formData.append("vehicleType", $("#vehicle_type").val());
    formData.append("transmissionType", $("#transmissionType").val());
    formData.append("vehicleDriverName", $("#vehicle_Driver_Name").val());
    formData.append("vehicleDriveNumber", $("#vehicle_Drive_Number").val())
    formData.append("license", $("#license")[0].files[0]);
    formData.append("vehicleRearView", $("#vehicle_Rear_View")[0].files[0]);
    formData.append("vehicle_Font_View", $("#vehicleFontView")[0].files[0]);
    formData.append("vehicle_Side_View", $("#vehicleSideView")[0].files[0]);
    formData.append("vehicle_OtherSide_View", $("#vehicleOtherSideView")[0].files[0]);
    $.ajax({
        url: "http://localhost:8090/vehicleServer/api/v1/vehicle/update",
        method: "PUT",
        data: formData,
        contentType: false,
        processData: false,
        success: function (res) {
            loadVehicles();
            alert("Successfully....!");
        },
        error: function (error) {
            console.log(error);
            alert("Try again....!");
        }
    })
});

//delete vehicle
$("#deleteVehiclebtn").click(function () {
    let id = $("#vehicleId").val();
    $.ajax({
        url: "http://localhost:8090/vehicleServer/api/v1/vehicle/id" + id,
        method: "DELETE",
        dataType: "json",
        success: function (res) {
            loadVehicles();
            alert("Successfully....!");
        },
        error: function (error) {
            console.log(error);
            alert("Try again....!");
        }
    })
});

//--------------------------search vehicle--------------------------
$("#searchbtn").on("keypress", function (event) {
    if (event.which === 13) {
        var searchVehicle = $("#searchbtn").val();
        $("#vehicleTable").empty();
        $.ajax({
            url: "http://localhost:8090/vehicleServer/api/v1/vehicle/searchVehicle" + searchVehicle,
            method: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                $("#vehicleId").val(res.vehicleId);
                $("#vehicle_brand").val(res.vehiclebrand);
                $("#vehicle_Category").val(res.vehicleCategory);
                $("#vehicle_Fuel_type").val(res.vehicleFueltype);
                $("#hybridStatus").val(res.hybridStatus);
                $("#vehicle_Seat_Capacity").val(res.vehicleSeatCapacity);
                $("#vehicle_type").val(res.vehicleType);
                $("#transmissionType").val(res.transmissionType);
                $("#vehicle_Driver_Name").val(res.vehicleDriverName);
                $("#vehicle_Drive_Number").val(res.vehicleDriveNumber);

                let row = "<tr><td>" + res.vehicleId + "</td>" +
                    "<td>" + res.vehiclebrand + "</td>" +
                    "<td>" + res.vehicleCategory + "</td>" +
                    "<td>" + res.vehicleFueltype + "</td>" +
                    "<td>" + res.hybridStatus + "</td>" +
                    "<td>" + res.vehicleSeatCapacity + "</td>" +
                    "<td>" + res.vehicleType + "</td>" +
                    "<td>" + res.transmissionType + "</td>" +
                    "<td>" + res.vehicleDriverName + "</td>" +
                    "<td>" + res.vehicleDriveNumber + "</td></tr>";
                $("#vehicleTable").append(row)
            },
            error: function (error) {
                loadAllGuide();
            }
        })
    }
})

//------------------------get all vehicle-----------------------
function loadVehicles() {
    $("#vehicleTable").empty();
    $.ajax({
        url: "http://localhost:8090/vehicleServer/api/v1/vehicle/loadAllVehicle",
        method: "GET",
        dataType: "json",
        success: function (res) {
            console.log(res);

                for (let i of res.data) {
                    let vehicleId = i.vehicleId;
                    let vehiclebrand = i.vehiclebrand;
                    let vehicleCategory = i.vehicleCategory;
                    let vehicleFueltype = i.vehicleFueltype;
                    let hybridStatus = i.hybridStatus;
                    let vehicleFuelUsage = i.vehicleFuelUsage;
                    let vehicleSeatCapacity = i.vehicleSeatCapacity;
                    let vehicleType = i.vehicleType;
                    let transmissionType = i.transmissionType;
                    let vehicleDriverName = i.vehicleDriverName;
                    let vehicleDriveNumber = i.vehicleDriveNumber;

                    let row = "<tr>" +
                        "<td>" + vehicleId + "</td>" +
                        "<td>" + vehiclebrand + "</td>" +
                        "<td>" + vehicleCategory + "</td>" +
                        "<td>" + vehicleFueltype + "</td>" +
                        "<td>" + hybridStatus + "</td>" +
                        "<td>" + vehicleFuelUsage + "</td>" +
                        "<td>" + vehicleSeatCapacity + "</td>" +
                        "<td>" + vehicleType + "</td>" +
                        "<td>" + transmissionType + "</td>" +
                        "<td>" + vehicleDriverName + "</td>" +
                        "<td>" + vehicleDriveNumber + "</td>" +
                        "</tr>";
                    $("#vehicleTable").append(row)
                    console.log(row);
                }
                loadTextFieldValues();
                autoGenerateId();
                checkValidity(vehicleValidation);
                console.log(res.message);
            },
            error: function (error) {
                console.log(error);
            }
        })
}

//Auto Generate id
    function autoGenerateId() {
        $("#vehicleId").val("NTV-001");
        $.ajax({
            url: "http://localhost:8090/vehicleServer/api/v1/vehicle/autoGenerateId",
            method: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (resp) {
                let id = resp.value;
                console.log("id  :-" + id + " " + resp);
                let tempId = parseInt(id.split("-")[1]);
                tempId = tempId + 1;
                if (tempId <= 9) {
                    $("#vehicleId").val("NTV-00" + tempId);
                } else if (tempid <= 99) {
                    $("#vehicleId").val("NTV-0" + tempId);
                } else {
                    $("#vehicleId").val("NTV-" + tempId);
                }
            },
            error: function (error) {
                console.log("id" + id);
                console.log(error);
            }
        })
    }

//------------------------------Number of Vehicle-------------------------------------
    $("#VehiclesCount").val("0");

    $.ajax({
        url: "http://localhost:8090/vehicleServer/api/v1/vehicle/vehiclesCount",
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (res) {
            let num = res.count
            $("#VehiclesCount").text(num);
        },
        error: function (error) {
            console.log(error)
        }
    })

//----------------------------load Text Field Values-------------------------------------

    function loadTextFieldValues() {
        $("#vehicleTable>tr").on("click", function () {
            let vehicleId = $(this).children().eq(0).text();
            let vehiclebrand = $(this).children().eq(1).text();
            let vehicleCategory = $(this).children().eq(2).text();
            let vehicleFueltype = $(this).children().eq(3).text();
            let hybridStatus = $(this).children().eq(4).text();
            let vehicleFuelUsage = $(this).children().eq(5).text();
            let vehicleSeatCapacity = $(this).children().eq(6).text();
            let vehicleType = $(this).children().eq(7).text();
            let transmissionType = $(this).children().eq(8).text();
            let vehicleDriverName = $(this).children().eq(9).text();
            let vehicleDriveNumber = $(this).children().eq(10).text();

            $("#vehicle_id").val(vehicleId);
            $("#vehicle_brand").val(vehiclebrand);
            $("#vehicle_Category").val(vehicleCategory);
            $("#vehicle_Fuel_type").val(vehicleFueltype);
            $("#hybridStatus").val(hybridStatus);
            $("#vehicle_Fuel_Usage").val(vehicleFuelUsage);
            $("#vehicle_Seat_Capacity").val(vehicleSeatCapacity);
            $("#vehicle_type").val(vehicleType);
            $("#transmissionType").val(transmissionType);
            $("#vehicle_Driver_Name").val(vehicleDriverName);
            $("#vehicle_Drive_Number").val(vehicleDriveNumber);

            console.log(
                vehicleId,
                vehiclebrand,
                vehicleCategory,
                vehicleCategory,
                vehicleFueltype,
                hybridStatus,
                vehicleFuelUsage,
                vehicleSeatCapacity,
                vehicleType,
                transmissionType,
                vehicleDriverName,
                vehicleDriveNumber
            )
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

    $("#vehicleRegId").click(function () {
        var serachVehicleRegID = $("#vehicleRegId").val();
        $.ajax({
            url: vehicleBaseurl + "vehicle/filterVehicleDetails/?vehicleRedId" + serachVehicleRegID,
            method: "GET",
            contentType: "json",
            success: function (res) {
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
    })
