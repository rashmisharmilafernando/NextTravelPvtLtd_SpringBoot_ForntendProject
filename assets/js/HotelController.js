let HotelBaseUrl = "";
loadAllHotel();

//-----------------------------Save Hotel-----------------------------------------
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

//----------------------------------Update Hotel------------------
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
//-------------------------------Delete Hotel-------------------
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

//------------------------------Get All Hotels--------------------
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
            loadTextFieldValues();
        },
        error: function (error) {
            console.log(error);
        }
    })
}

//-------------Search Hotel--------------------------

$("#searchHotel").on("keypress",function (event){
    if (event.which===13){
        var searchHotelId=$("searchHotel").val();
        $("#hotelTable").empty();
        $.ajax({
            url:HotelBaseUrl+"hotel/searchHotel/?hotelId="+searchHotelId,
            method:"GET",
            contentType:"application/json",
            dataType:"json",
            success:function (res){
                $("#HotelID").val(res.hotel_Id);
                $("#hotelName").val(res.hotel_name);
                $("#hrate").val(res.hotel_rate);
                $("#hcategory").val(res.hotel_Category);
                $("#hlocation").val(res.hotel_location);
                $("#hcoordinates").val(res.hotel_coordinates);
                $("#hEmail").val(res.hotel_Email);
                $("#hNumber1").val(res.hotel_Number1);
                $("#hpetsAllowed").val(res.Pets_Allowed);
                $("#hfee").val(res.Hotel_fee);
                $("#CancellationCriteria").val(res.hCancellationCriteria);

                let row="<tr><td>" + res.hotel_Id+"</td>" +
                    "<td>" + res.hotel_name+"</td>"+
                    "<td>" + res.hotel_rate+"</td>"+
                    "<td>" + res.hotel_Category+"</td>"+
                    "<td>" + res.hotel_location+"</td>"+
                    "<td>" + res.hotel_coordinates+"</td>"+
                    "<td>" + res.hotel_Email+"</td>"+
                    "<td>" + res.hotel_Number1+"</td>"+
                    "<td>" + res.Pets_Allowed+"</td>"+
                    "<td>" + res.Hotel_fee+"</td>"+
                    "<td>" + res.hCancellationCriteria+"</td></tr>";
                $("#hotelTable").append(row)

            },
            error:function (error){
                loadAllHotel();
            }
        })
    }
})

//-------------------------------auto Generate id----------------------
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
        let id = $(this).children().eq(0).text();
        let name =  $(this).children().eq(1).text();
        let rate =  $(this).children().eq(2).text();
        let category =  $(this).children().eq(3).text();
        let location =  $(this).children().eq(4).text();
        let coordinates =  $(this).children().eq(5).text();
        let Email =  $(this).children().eq(6).text();
        let Number1 =  $(this).children().eq(7).text();
        let petsAllowed =  $(this).children().eq(8).text();
        let fee =  $(this).children().eq(9).text();
        let CancellationCriteria = $(this).children().eq(10).text();

        $("#HotelID").val(id);
        $("#hotelName").val(name);
        $("#hcategory").val(rate);
        $("#hcoordinates").val(category);
        $("#hlocation").val(location);
        $("#hcoordinates").val(coordinates);
        $("#hEmail").val(Email);
        $("#hNumber1").val(Number1);
        $("#hpetsAllowed").val(petsAllowed);
        $("#hfee").val(fee);
        $("#CancellationCriteria").val(CancellationCriteria);





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

