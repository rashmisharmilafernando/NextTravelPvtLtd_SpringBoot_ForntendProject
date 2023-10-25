let HotelBaseUrl = "";
loadAllHotel();

//Save Hotel
$("saveHotelBtn").click(function () {
    let formDate = new FormData($("#hotelTable")[0]);
    $.ajax({
        url: HotelBaseUrl + "hotel",
        method: "POST",
        date: formDate,
        contentType: false,
        processData: false,
        success: function (res) {
            loadAllHotel();
        },
        error: function (error) {
            console.log(error);
        }
    })
})

//Update Hotel
$("#UpdateHotelBtn").click(function () {
    let formData = new FormData($("#hotelTable")[0]);
    $.ajax({
        url: HotelBaseUrl + "hotel/update",
        method: "PUT",
        data: formData,
        contentType: false,
        processData: false,
        success: function (res) {
            loadAllHotel();
        },
        error: function (error) {
            console.log(error);
        }
    })
});
//Delete Hotel
$("#DeleteHotelBtn").click(function () {
    let id = $("#Id").val();
    $.ajax({
        url: RegisterBaseUrl + "hotel?id" + id,
        method: "DELETE",
        dataType: "json",
        success: function (res) {
            loadAllHotel();
        },
        error: function (error) {
            console.log(error);
        }
    })
});

// Get All Hotels
function loadAllHotel() {
    $("#hotelTable").empty();
    $.ajax({
        url: HotelBaseUrl + "hotel/loadAllHotel",
        method: "GET",
        dataType: "json",
        success: function (res) {
            console.log(res);
            for (let i of res.data) {
                let id = i.hotel_Id;
                let name = i.hotel_name;
                let rate = i.hotel_rate;
                let category = i.hotel_Category;
                let location = i.hotel_location;
                let coordinates = i.hotel_coordinates;
                let Email = i.hotel_Email;
                let Number1 = i.hotel_Number1;
                let petsAllowed = i.Pets_Allowed;
                let fee = i.Hotel_fee;
                let CancellationCriteria = i.hCancellationCriteria;

                let row = "<tr><td>" + id + "</td>" +
                    "<td>" + name + "</td>" +
                    "<td>" + rate + "</td>" +
                    "<td>" + category + "</td>" +
                    "<td>" + location + "</td>" +
                    "<td>" + coordinates + "</td>" +
                    "<td>" + Email + "</td>" +
                    "<td>" + Number1 + "</td>" +
                    "<td>" + petsAllowed + "</td>" +
                    "<td>" + fee + "</td>" +
                    "<td>" + CancellationCriteria + "</td></tr>";
                $("#hotelTable").append(row)
            }
            autoGenerateHotelId();
            checkValidity(hotelValidation);
        },
        error: function (error) {
            console.log(error);
        }
    })
}

//auto Generate id
function autoGenerateHotelId() {
    $("#hId").val("H-001");
    $.ajax({
        url: HotelBaseUrl + "hotel/autoGenerateId",
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (resp) {
            let id = resp.value;
            let tempid = parseInt(id.split("-")[1]);
            tempid = tempid + 1;
            if (tempid <= 9) {
                $("#hId").val("H-00" + tempid);
            } else if (tempid <= 99) {
                $("#hId").val("H-0" + tempid);
            } else {
                $("#hId").val("H-" + tempid);
            }
        },
        error: function (error) {
            console.log(error);
        }
    })
}

//-------------load Text field values-------------------

function loadTextFieldValues(){
    $("#hotelTable>tr").on("click",function (){

    })
}

//-----------------------select package and filter hotel-------------------------------------
function filterHotelName() {
    let packageName = $("#packageName").val();
    console.log(packageName);
    $("#HotelID").empty();
    $("#hotelName").empty();
    $.ajax({
        url: HotelBaseUrl + "booking/filterHotel/?hotelName" + packageName,
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (res) {
            console.log(res);
            for (let i of res) {
                let hotelId = i.hotel_id;
                let hotelName = i.filter_hotel_name;
                $("#HotelID").append(`<option>${hotelId}</option>`)
                $("#hotelName").append(`<option>${hotelName}</option>`)
            }
        }
    });
}
//-------------------Select hotel Id----------------------------------
$("#HotelID").click(function (){
    var searchHotelName=$("#HotelID").val();
    $.ajax({
        url:HotelBaseUrl+"hotel/searchHotel/?HotelID"+searchHotelName,
        method:"GET",
        contentType:"application/json",
        dataType:"json",
        success:function (res){
            $("#hotelName").val(res.filter_hotel_name);
            $("#locations").val(res.filter_Location);

        },error:function (error){
            console.log(error);
        }
    });
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
