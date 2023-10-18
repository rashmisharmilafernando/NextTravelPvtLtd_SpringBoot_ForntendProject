let indexBaseUrl = "";
loadAllHotel();
loadAllVehicle();

function loadAllHotel() {
    $("#hotelSection").empty();
    $.ajax({
        url: indexBaseUrl + "hotel/loadAllHotel",
        method: "GET",
        dataType: "json",
        success: function (res) {
            for (let i of res.data) {
                let url1 = i.image.Hotel_image;
                $("#hotelSection").append(
                    `<div class="card" style="width: 500px;">
                         <div class="row no-gutters">
                              <div class="col-sm-6">
                                   <img class="card-img-top"
                                             src="${indexBaseUrl + url1}"
                                             alt="Card image cap">
                              </div>
                                    <div class="col-sm-6">
                                        <div class="card-body">
                                            <h4 class="card-title" style="margin-top: 15px">${i.hotel_name}</h4>
                                            <small>${i.hotel_location}</small><br>
                                            <small>${i.hotel_rate}</small>
                                        </div>
                                    </div>
                         </div>
                    </div>`);
            }
        }
    })
}

function loadAllVehicle() {
    $("#vehicleSection").empty();
    $.ajax({
        url: indexBaseUrl + "vehicle/loadAllHotel",
        method: "GET",
        dataType: "json",
        success: function (res) {
            for (let i of res.data) {
                let url2 = i.image.vehicle_Font_View;
                $("#vehicleSection").append(
                    `<div class="card" style="width: 500px;">
                            <div class="row no-gutters">
                                <div class="col-sm-6">
                                    <img class="card-img-top"
                                         src="${indexBaseUrl + url2}"
                                         alt="Card image cap">
                                </div>
                                <div class="col-sm-6">
                                    <div class="card-body">
                                        <h4 class="card-title" style="margin-top: 15px">${i.vehiclebrand}</h4>
                                        <small>${i.vehicleSeatCapacity}</small><br>
                                        <small>${i.vehicleFueltype}</small><br>
                                        <small>${i.transmission}</small><br>

                                    </div>
                                </div>
                            </div>
                        </div>`);
            }
        }
    })
}


/*---------------------------------------------------------*/

$("#searchPackage").on("click", function () {
    filterPackages();
});

function filterPackages() {
    $("#hotelSection").empty();
    $("#vehicleSection").empty();
    filter_packages = $("#filterPackage").val();
    $.ajax({
        url: indexBaseUrl + "packages/filerPackages?filter_packages",
        method: "GET",
        dataType: "json",
        success: function (res) {
            for (let i of res) {
                let url1 = i.image.Hotel_image;
                $("#hotelSection").append(
                    `<div class="card" style="width: 500px;">
                         <div class="row no-gutters">
                              <div class="col-sm-6">
                                   <img class="card-img-top"
                                             src="${indexBaseUrl + url1}"
                                             alt="Card image cap">
                              </div>
                                    <div class="col-sm-6">
                                        <div class="card-body">
                                            <h4 class="card-title" style="margin-top: 15px">${i.hotel_name}</h4>
                                            <small>${i.hotel_location}</small><br>
                                            <small>${i.hotel_rate}</small>
                                        </div>
                                    </div>
                         </div>
                    </div>`);
            }
            for (let i of res) {
                let url2 = i.image.vehicle_Font_View;
                $("#vehicleSection").append(
                    `<div class="card" style="width: 500px;">
                            <div class="row no-gutters">
                                <div class="col-sm-6">
                                    <img class="card-img-top"
                                         src="${indexBaseUrl + url2}"
                                         alt="Card image cap">
                                </div>
                                <div class="col-sm-6">
                                    <div class="card-body">
                                        <h4 class="card-title" style="margin-top: 15px">${i.vehiclebrand}</h4>
                                        <small>${i.vehicleSeatCapacity}</small><br>
                                        <small>${i.vehicleFueltype}</small><br>
                                        <small>${i.transmission}</small><br>

                                    </div>
                                </div>
                            </div>
                        </div>`);
            }

        },
        error: function (error) {
            loadAllHotel();
            loadAllVehicle();
        }
    })
}

/*--------------------------------------------------*/

$("#searchHotel").on("click", function () {
    filterHotel();
});

function filterHotel(){
    $("#hotelSection").empty();
    filter_start_Rate=$("#filterstarRate").val();
    filter_locations=$("#filterlocation").val();
    $.ajax({
        url:indexBaseUrl+"hotel/filterHotel?startRate="+filter_start_Rate+
            "&locations" + filter_locations,
        method:"GET",
        dataType:"json",
        success:function (res){
            for (let i of res) {
                let url1 = i.image.Hotel_image;
                $("#hotelSection").append(
                    `<div class="card" style="width: 500px;">
                         <div class="row no-gutters">
                              <div class="col-sm-6">
                                   <img class="card-img-top"
                                             src="${indexBaseUrl + url1}"
                                             alt="Card image cap">
                              </div>
                                    <div class="col-sm-6">
                                        <div class="card-body">
                                            <h4 class="card-title" style="margin-top: 15px">${i.hotel_name}</h4>
                                            <small>${i.hotel_location}</small><br>
                                            <small>${i.hotel_rate}</small>
                                        </div>
                                    </div>
                         </div>
                    </div>`);
            }
        },
        error:function (error){
            loadAllHotel();
        }
    });
}

/*------------------------------------------------------*/

$("#searchVehicle").on("click", function () {
    filterVehicle();
});

function filterVehicle(){
    $("#vehicleSection").empty();
    filter_Passengers=$("#filterpassengers").val();
    filter_Transmission=$("#filterTransmission").val();
    filter_Fueltype=$("#filterFueltype").val();
    $.ajax({
        url2:indexBaseUrl+"vehicle/filterVehicle?passengers="+filter_Passengers+
            "&transmission" + filter_Transmission+"&fuelType"+filter_Fueltype,
        method:"GET",
        dataType:"json",
        success:function (res){
            for (let i of res) {
                let url2 = i.image.vehicle_Font_View;
                $("#vehicleSection").append(
                    `<div class="card" style="width: 500px;">
                            <div class="row no-gutters">
                                <div class="col-sm-6">
                                    <img class="card-img-top"
                                         src="${indexBaseUrl + url2}"
                                         alt="Card image cap">
                                </div>
                                <div class="col-sm-6">
                                    <div class="card-body">
                                        <h4 class="card-title" style="margin-top: 15px">${i.vehiclebrand}</h4>
                                        <small>${i.vehicleSeatCapacity}</small><br>
                                        <small>${i.vehicleFueltype}</small><br>
                                        <small>${i.transmission}</small><br>

                                    </div>
                                </div>
                            </div>
                        </div>`);
            }
        },
        error:function (error){
            loadAllVehicle();
        }
    });
}
