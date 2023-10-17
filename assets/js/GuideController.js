let GuiderBaseurl = "";
loadAllGuide();

//Save Guider
$("saveGuidebtn").click(function () {
    let formDate = new FormData($("#giudeTable")[0]);
    $.ajax({
        url: HotelBaseUrl + "guide",
        method: "POST",
        date: formDate,
        contentType: false,
        processData: false,
        success: function (res) {
            loadAllGuide();
        }
    })
})
//update Guider
$("#updateGuidebtn").click(function () {
    let formData = new FormData($("#giudeTable")[0]);
    $.ajax({
        url: HotelBaseUrl + "guide/update",
        method: "PUT",
        data: formData,
        contentType: false,
        processData: false,
        success: function (res) {
            loadAllGuide();
        }
    })
});
//delete Guider
$("#deleteGuidebtn").click(function () {
    let id = $("#guideid").val();
    $.ajax({
        url: RegisterBaseUrl + "guide?id" + id,
        method: "DELETE",
        dataType: "json",
        success: function (res) {
            loadAllGuide();
        }
    })
});
//Search Guider

//Get All Guider details
function loadAllHotel() {
    $("#giudeTable").empty();
    $.ajax({
        url: HotelBaseUrl + "guide/loadAllguide",
        method: "GET",
        dataType: "json",
        success: function (res) {
            console.log(res);
            for (let i of res.data) {
                let id = i.guide_id;
                let name = i.guide_Name;
                let number = i.guide_Number;
                let address = i.guide_Address;
                let contact = i.guide_Number;
                let manDayValue = i.guide_Day_Value;

                let row="<tr><td>" + id + "</td>" +
                    "<td>" + name + "</td>" +
                    "<td>" + number + "</td>" +
                    "<td>" + address + "</td>" +
                    "<td>" + contact + "</td>" +
                    "<td>" + manDayValue + "</td></tr>";
                $("#giudeTable").append(row)
            }
            autoGenerateId();
            checkValidity(guideValidation);

        }
    })
}

//Auto Generate id
function autoGenerateId() {
    $("#guideid").val("G001");
    $.ajax({
        url:GuiderBaseurl+"guide/autoGenerateid",
        method:"GET",
        contentType: "application/json",
        dataType: "json",
        success: function (resp) {
            let id = resp.value;
            let tempid = parseInt(id.split("-")[1]);
            tempid = tempid + 1;
            if (tempid <= 9) {
                $("#guideid").val("G00" + tempid);
            } else if (tempid <= 99) {
                $("#guideid").val("G0" + tempid);
            } else {
                $("#guideid").val("G" + tempid);
            }
        },
        error:function (ob,statusText,error){}
    })
}

