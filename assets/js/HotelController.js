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
        }
    })
})

//Update Hotel
$("#UpdateHotelBtn").click(function (){
    let formData=new FormData($("#hotelTable")[0]);
    $.ajax({
        url:HotelBaseUrl+"hotel/update",
        method:"PUT",
        data:formData,
        contentType:false,
        processData: false,
        success:function (res){
            loadAllHotel();
        }
    })
});
//Delete Hotel
$("#DeleteHotelBtn").click(function (){
    let id=$("#Id").val();
    $.ajax({
        url:RegisterBaseUrl+"hotel?id" +id,
        method:"DELETE",
        dataType:"json",
        success:function (res){
            loadAllHotel();
        }
    })
});
// Get All Hotels
function loadAllHotel() {
    $("#hotelTable").empty();
    $.ajax({
        url: HotelBaseUrl + "hotel/loadAllhotel",
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
        }
    })
}

//auto Generate id
function autoGenerateHotelId() {
    $("#hId").val("H001");
    $.ajax({
        url: HotelBaseUrl + "hotel/autoGenerateid",
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (resp) {
            let id = resp.value;
            let tempid = parseInt(id.split("-")[1]);
            tempid = tempid + 1;
            if (tempid <= 9) {
                $("#hId").val("H00" + tempid);
            } else if (tempid <= 99) {
                $("#hId").val("H0" + tempid);
            } else {
                $("#hId").val("H" + tempid);
            }
        },
        error:function (ob,statusText,error){}
        })
}


