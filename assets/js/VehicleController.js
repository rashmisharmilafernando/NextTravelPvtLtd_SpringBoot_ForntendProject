autoGenerateId();
loadVehicles();

//----------------save vehicle-------------------------
$("#saveVehiclebtn").click(function () {
    let formData = new FormData($("#vehicleForm")[0]);
    formData.append("vehicleId", $("#vehicleId").val());
    formData.append("vehicleRegId", $("#vehicleRegId").val());
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

    $.ajax({
        url: "http://localhost:8090/vehicleServer/api/v1/Vehicle",
        method: "POST",
        data: formData,
        contentType: false,
        processData: false,
        success: function (res) {
            console.log("Success:", res);
            loadVehicles();
            clearTextFields();
            alert("Successfully....!");
        },
        error: function (xhr) {
            loadVehicles();
            console.log("Response Text:", xhr.responseText);
            alert("Try again....!");
        }
    });
});


//----------------------------update vehicle-----------------------
$("#updateVehiclebtn").click(function () {
    let formData = new FormData($("#vehicleForm")[0]);
    formData.append("vehicleId", $("#vehicleId").val());
    formData.append("vehicleRegId", $("#vehicleRegId").val());
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
    $.ajax({
        url: "http://localhost:8090/vehicleServer/api/v1/Vehicle/update",
        method: "PUT",
        data: formData,
        contentType: false,
        processData: false,
        success: function (res) {
            loadVehicles();
            clearTextFields();
            alert("Successfully....!");
        },
        error: function (error) {
            console.log(error);
            alert("Try again....!");
        }
    })
});

//----------------------delete vehicle---------------------------
$("#deleteVehiclebtn").click(function () {
    let vehicleRegId = $("#vehicleId").val();
    $.ajax({
        url: "http://localhost:8090/vehicleServer/api/v1/Vehicle?vehicleRegId="+vehicleRegId,
        method: "DELETE",
        dataType: "json",
        success: function (resp) {
            loadVehicles();
            console.log(resp);
            alert("Successfully....!");
        },
        error: function (error) {
            loadVehicles();
            console.log(error);
            alert("Successfully..!");
        }
    })
});



//--------------------------search vehicle--------------------------
function searchVehicleId() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchbtn");
    filter = input.value.toUpperCase();
    table = document.getElementById("vehicleTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}


//------------------------get all vehicle---------------------------------
function loadVehicles() {
    $("#vehicleTable").empty();
    $.ajax({
        url: "http://localhost:8090/vehicleServer/api/v1/Vehicle/getAllDetails",
        method: "GET",
        dataType: "json",
        success: function (res) {
            console.log(res);

                for (let i of res) {
                    let vehicleId = i.vehicleId;
                    let vehicleRegId = i.vehicleRegId;
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
                        "<td>" + vehicleRegId + "</td>" +
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
            url: "http://localhost:8090/vehicleServer/api/v1/Vehicle/autoGenerateId",
            method: "GET",
            contentType: "application/json",
            dataType: "json",

            success: function (res) {
                let id = res.value;

                let tempId = parseInt(id.split("-")[1]);
                tempId = tempId + 1;
                if (tempId <= 9) {
                    $("#vehicleId").val("NTV-00" + tempId);
                } else if (tempId <= 99) {
                    $("#vehicleId").val("NTV-0" + tempId);
                } else {
                    $("#vehicleId").val("NTV-" + tempId);
                }
            },
            error: function (error) {
                console.log($("#vehicleId").val());
                console.log(error);
            }
        });
    }


//----------------------------load Text Field Values-------------------------------------

    function loadTextFieldValues() {
        $("#vehicleTable>tr").on("click", function () {
            let vehicleId = $(this).children().eq(0).text();
            let vehicleRegId = $(this).children().eq(1).text();
            let vehiclebrand = $(this).children().eq(2).text();
            let vehicleCategory = $(this).children().eq(3).text();
            let vehicleFueltype = $(this).children().eq(4).text();
            let hybridStatus = $(this).children().eq(5).text();
            let vehicleFuelUsage = $(this).children().eq(6).text();
            let vehicleSeatCapacity = $(this).children().eq(7).text();
            let vehicleType = $(this).children().eq(8).text();
            let transmissionType = $(this).children().eq(9).text();
            let vehicleDriverName = $(this).children().eq(10).text();
            let vehicleDriveNumber = $(this).children().eq(11).text();

            $("#vehicleId").val(vehicleId);
            $("#vehicleRegId").val(vehicleRegId);
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
                vehicleRegId,
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

//------------Clear text fields-------------
function clearTextFields() {
    $("#vehicleId").val("");
    $("#vehicleRegId").val("");
    $("#vehicle_brand").val("");
    $("#vehicle_Category").val("");
    $("#vehicle_Fuel_type").val("");
    $("#hybridStatus").val("");
    $("#vehicle_Fuel_Usage").val("");
    $("#vehicle_Seat_Capacity").val("");
    $("#vehicle_type").val("");
    $("#transmissionType").val("");
    $("#vehicle_Driver_Name").val("");
    $("#vehicle_Drive_Number").val("");
    $("#license").val("");
    $("#vehicle_Rear_View").val("");
    $("#vehicleFontView").val("");
    $("#vehicleSideView").val("");
    $("#vehicleOtherSideView").val("");
}


//-------------------------------------------------
