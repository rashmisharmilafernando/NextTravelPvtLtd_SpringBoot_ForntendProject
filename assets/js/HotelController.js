loadAllHotel();
autoGenerateHotelId();

//-----------------------------Save Hotel-----------------------------------------
$("#saveHotelBtn").click(function () {
    let formData = new FormData($("#hotelFrom")[0]);
    formData.append("hotel_Id", $("#hotel_Id").val());
    formData.append("hotel_Name", $("#hotel_Name").val());
    formData.append("hotel_Rate", $("#hotel_Rate").val());
    formData.append("hotel_Category", $("#hotel_Category").val());
    formData.append("hotel_Location", $("#hotel_Location").val());
    formData.append("hotel_Coordinates", $("#hotel_Coordinates").val());
    formData.append("hotel_Email", $("#hotel_Email").val());
    formData.append("hotel_Number1", $("#hotel_Number1").val());
    formData.append("hotel_Number2", $("#hotel_Number2").val());
    formData.append("pets_Allowed", $("#pets_Allowed").val());
    formData.append("hotel_Fee", $("#hotel_Fee").val());
    formData.append("cancellation_Criteria", $("#cancellation_Criteria").val());
    formData.append("hotel_Image", $("#hotel_Image")[0].files[0]);

    $.ajax({
        url:"http://localhost:8081/hotelServer/api/v1/hotel",
        method: "POST",
        data: formData,
        contentType: false,
        processData: false,
        success: function (res) {

            loadAllHotel();
            clearTextFields();
            alert("Successfully....!");
        },
        error: function (error) {
            loadAllHotel();
            console.log(error);
            alert("Try again....!");
        }
    });
});

//----------------------------------Update Hotel------------------
$("#UpdateHotelBtn").click(function () {
    let formData = new FormData($("#hotelFrom")[0]);
    formData.append("hotel_Id", $("#hotel_Id").val());
    formData.append("hotel_Name", $("#hotel_Name").val());
    formData.append("hotel_Rate", $("#hotel_Rate").val());
    formData.append("hotel_Category", $("#hotel_Category").val());
    formData.append("hotel_Location", $("#hotel_Location").val());
    formData.append("hotel_Coordinates", $("#hotel_Coordinates").val());
    formData.append("hotel_Email", $("#hotel_Email").val());
    formData.append("hotel_Number1", $("#hotel_Number1").val());
    formData.append("hotel_Number2", $("#hotel_Number2").val());
    formData.append("pets_Allowed", $("#pets_Allowed").val());
    formData.append("hotel_Fee", $("#hotel_Fee").val());
    formData.append("cancellation_Criteria", $("#cancellation_Criteria").val());
    formData.append("hotel_Image", $("#hotel_Image")[0].files[0]);
    $.ajax({
        url: "http://localhost:8081/hotelServer/api/v1/hotel/update",
        method: "PUT",
        data: formData,
        contentType: false,
        processData: false,
        success: function (res) {
            loadAllHotel();
            clearTextFields();
            alert("Successfully....!");
        },
        error: function (error) {
            console.log(error);
            alert("Try again....!");
        }
    })
});
//-------------------------------Delete Hotel-------------------
$("#DeleteHotelBtn").click(function () {
    let id = $("#hotel_Id").val();
    $.ajax({
        url: "http://localhost:8081/hotelServer/api/v1/hotel?id=" + id,
        method: "DELETE",
        dataType: "json",
        success: function (resp) {
            console.log(resp);
            loadAllHotel();
            clearTextFields();
            alert("Successfully....!");
        },
        error: function (error) {
            console.log(error);
            alert("Successfully....!");
        }
    })
});



//------------------------------Get All Hotels--------------------
function loadAllHotel() {
    $("#hotelTable").empty();
    $.ajax({
        url: "http://localhost:8081/hotelServer/api/v1/hotel/loadAllHotel",
        method: "GET",
        dataType: "json",
        success: function (res) {
            console.log(res);
            for (let i of res.data) {
                let hotelId = i.hotelId;
                let hotelName = i.hotelName;
                let hotelRate = i.hotelRate;
                let hotelCategory = i.hotelCategory;
                let hotelLocation = i.hotelLocation;
                let hotelCoordinates = i.hotelCoordinates;
                let hotelEmail = i.hotelEmail;
                let hotelNumber1 = i.hotelNumber1;
                let hotelNumber2 = i.hotelNumber2;
                let petsAllowed = i.petsAllowed;
                let hotelFee = i.hotelFee;
                let cancellationCriteria = i.cancellationCriteria;

                let row = "<tr><td>" + hotelId + "</td>" +
                    "<td>" + hotelName + "</td>" +
                    "<td>" + hotelRate + "</td>" +
                    "<td>" + hotelCategory + "</td>" +
                    "<td>" + hotelLocation + "</td>" +
                    "<td>" + hotelCoordinates + "</td>" +
                    "<td>" + hotelEmail + "</td>" +
                    "<td>" + hotelNumber1 + "</td>" +
                    "<td>" + hotelNumber2 + "</td>" +
                    "<td>" + petsAllowed + "</td>" +
                    "<td>" + hotelFee + "</td>" +
                    "<td>" + cancellationCriteria + "</td></tr>";
                $("#hotelTable").append(row)
                console.log(row);
            }
            loadTextFieldValues();
            autoGenerateHotelId();
            checkValidity(hotelValidation);
            console.log(res.message);
        },
        error: function (error) {
            console.log(error);
        }
    })
}

//-------------Search Hotel--------------------------
function searchHotelId() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchHotel");
    filter = input.value.toUpperCase();
    table = document.getElementById("hotelTable");
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


//-------------------------------auto Generate id----------------------
function autoGenerateHotelId() {
    $("#hotel_Id").val("NTH-001");
    $.ajax({
        url: "http://localhost:8081/hotelServer/api/v1/hotel/autoGenerateId",
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (resp) {
            let id = resp.value;
            let tempId = parseInt(id.split("-")[1]);
            tempId = tempId + 1;
            if (tempId <= 9) {
                $("#hotel_Id").val("NTH-00" + tempId);
            } else if
                (tempId <= 99) {
                $("#hotel_Id").val("NTH-0" + tempId);
            } else {
                $("#hotel_Id").val("NTH-" + tempId);
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
        let hotel_Id = $(this).children().eq(0).text();
        let hotel_Name =  $(this).children().eq(1).text();
        let hotel_Rate =  $(this).children().eq(2).text();
        let hotel_Category =  $(this).children().eq(3).text();
        let hotel_Location =  $(this).children().eq(4).text();
        let hotel_Coordinates =  $(this).children().eq(5).text();
        let hotel_Email =  $(this).children().eq(6).text();
        let hotel_Number1 =  $(this).children().eq(7).text();
        let hotel_Number2 =  $(this).children().eq(8).text();
        let pets_Allowed =  $(this).children().eq(9).text();
        let hotel_Fee =  $(this).children().eq(10).text();
        let cancellation_Criteria = $(this).children().eq(11).text();

        $("#hotel_Id").val(hotel_Id);
        $("#hotel_Name").val(hotel_Name);
        $("#hotel_Rate").val(hotel_Rate);
        $("#hotel_Category").val(hotel_Category);
        $("#hotel_Location").val(hotel_Location);
        $("#hotel_Coordinates").val(hotel_Coordinates);
        $("#hotel_Email").val(hotel_Email);
        $("#hotel_Number1").val(hotel_Number1);
        $("#hotel_Number2").val(hotel_Number2);
        $("#pets_Allowed").val(pets_Allowed);
        $("#hotel_Fee").val(hotel_Fee);
        $("#cancellation_Criteria").val(cancellation_Criteria);
    })
}

//-----------------------select package and filter hotel-------------------------------------
function filterHotelName() {
    let hotelCategory = $("#hotelCategory").val();
    console.log(hotelCategory);
    $("#hotelId").empty();
    $("#hotelName").empty();
    $.ajax({
        url: HotelBaseUrl + "booking/filterHotel/?hotelName" + hotelCategory,
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (res) {
            console.log(res);
            for (let i of res) {
                let hotelId = i.hotelId;
                let hotelName = i.hotelName;
                $("#hotelId").append(`<option>${hotelId}</option>`)
                $("#hotelName").append(`<option>${hotelName}</option>`)
            }
        }
    });
}
//-------------------Select hotel Id----------------------------------
$("#hotel_Id").click(function (){
    var searchHotelName=$("#hotel_Id").val();
    $.ajax({
        url:HotelBaseUrl+"hotel/searchHotel/?HotelID"+searchHotelName,
        method:"GET",
        contentType:"application/json",
        dataType:"json",
        success:function (res){
            $("#hotel_Name").val(res.hotelName);
            $("#hotel_Location").val(res.hotelLocation);

        },error:function (error){
            console.log(error);
        }
    });
})
function clearTextFields() {
    $("#hotel_Id").val("");
    $("#hotel_Name").val("");
    $("#hotel_Rate").val("");
    $("#hotel_Category").val("");
    $("#hotel_Location").val("");
    $("#hotel_Coordinates").val("");
    $("#hotel_Email").val("");
    $("#hotel_Number1").val("");
    $("#hotel_Number2").val("");
    $("#pets_Allowed").val("");
    $("#hotel_Fee").val("");
    $("#cancellation_Criteria").val("");
}


