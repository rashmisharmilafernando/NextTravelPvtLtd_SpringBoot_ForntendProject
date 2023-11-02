loadAllReservationIds();

//--------------------load reservationids-------------------
function loadAllReservationIds() {
    $("#userId").empty();
    var reservationCustomerId = $("userId").val();
    $.ajax({
        url: "http://localhost:8085/packageServer/api/v1/package/f=getBookingIdsByUserId?userId"+reservationCustomerId,
        method: "GET",
        contentType: "json",
        dataType: "json",
        success: function (res) {
            for (let i of res) {
                let loadBookingReservation_Id = i.loadBookingReservation_Id;
                $("#loadBookingReservationId").append(`<option>${loadBookingReservation_Id}</option>`)
            }
        }, error: function (error) {
            console.log(error);
        }
    })

}




//-------------------update booking-----------------------
$("#updateBtn").on("click", function () {
    let formData = new FormData();


    formData.append( 'reservationDetails',new FormData($("#reservationDetails")[0]))
    formData.append( 'hotelDetails',new FormData($("#hotelDetails")[0]))
    formData.append( 'guideDetails',new FormData($("#guideDetails")[0]))
    formData.append( 'vehicleDetails', new FormData($("#vehicleDetails")[0]))

    $.ajax({
        url: bookingBaseUrl + "api/v1/booking/update",
        method: "put",
        data: formData,
        dataType: "json",
        contentType: false,
        processData: false,
        success: function (res) {
            console.log(res);
            loadBookingDetails();
            clearTextFields();
            autoGeneratebookingid();
            alert("Successfully...!");
        },
        error: function (error) {
            console.log(error);
            alert("Try Again...!");
        }
    });
});
