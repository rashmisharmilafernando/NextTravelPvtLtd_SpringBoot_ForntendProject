let GuiderBaseurl = "";
loadAllGuide();

//Save Guider
$("#saveGuidebtn").click(function () {
    let formDate = new FormData($("#giudeTable")[0]);
    $.ajax({
        url: HotelBaseUrl + "guide",
        method: "POST",
        date: formDate,
        contentType: false,
        processData: false,
        success: function (res) {
            loadAllGuide();
        },
        error:function (error){
            console.log(error);
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
        },
        error:function (error){
            console.log(error);
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
        },
        error:function (error){
            console.log(error);
        }
    })
});


//Search Guider
$("#searchGuide").on("keypress",function (event){
    if (event.which ===13){
        var searchGuide=$("#searchGuide").val();
        $("#giudeTable").empty();
        $.ajax({
            url:RegisterBaseUrl + "guide/searchGuide/?guideid="+searchGuide,
            method:"GET",
            contentType:"application/json",
            dataType:"json",
            success:function (res){
                $("#guideid").val(res.guide_id);
                $("#guideName").val(res.guide_Name);
                $("#guideAddress").val(res.guide_Address);
                $("#guideNumber").val(res.guide_Number);
                $("#guideDayValue").val(res.guide_Day_Value);

                let row ="<tr><td>" + res.guide_id+"</td>" +
                    "<td>" + res.guide_Name + "</td>" +
                    "<td>" + res.guide_Address+"</td>"+
                    "<td>" + res.guide_Number+"</td>"+
                    "<td>" + res.guide_Day_Value+"</td></tr>";
                $("#registerUserTable").append(row)
            },
            error:function (error){
                loadAllGuide()
            }
        })
    }
})


//Get All Guider details
function loadAllGuide() {
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

        },
        error:function (error){
            console.log(error);
        }
    })
}


//Auto Generate id
function autoGenerateId() {
    $("#guideid").val("G-001");
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
                $("#guideid").val("G-00" + tempid);
            } else if (tempid <= 99) {
                $("#guideid").val("G-0" + tempid);
            } else {
                $("#guideid").val("G-" + tempid);
            }
        },

        error:function (error){
        console.log(error);
    }
    })
}


//---------------------------------Number of Guide----------------------------------------------
$("#GuideCount").val("0");
$.ajax({
    url:adminDashboardBaseUrl+"GuiderCount",
    method:"GET",
    contentType:"application/json",
    dataType:"json",
    success:function (res){
        let num=res.count
        $("#GuideCount").text(num);
    },
    error:function (error){
        console.log(error)
    }
})

//--------------Load Guide Details-----------------------------------------

$("#guide_id").click(function (){
    var searchGuide=$("#guide_id").val();
    $.ajax({
        url:bookingBaseUrl+"guide/searchGuide/?guide_id="+searchGuide,
        method:"GET",
        contentType:"application/json",
        dataType:"json",
        success:function (res){
            $("#guide_name").val(res.guideName);
            $("#guide_Number").val(res.guideNumber);
            $("#guideValue").val(res.guide_Value);
        },
        error:function (error){
            console.log(error);
        }
    })
});
//---------------------- Select Guide or not--------------------------------

$("#guideStataus").click(function (){
    let selectedOption=$(this).val();

    if (selectedOption === "yes"){
        $.ajax({
            url:bookingBaseUrl+"guide/yesGuide",
            method:"GET",
            dataType:"json",
            success:function (res){
                $("#guide_id").val(res.guideid);
            },
            error:function (error){
                console.log(error);
            }
        });
    }
})
