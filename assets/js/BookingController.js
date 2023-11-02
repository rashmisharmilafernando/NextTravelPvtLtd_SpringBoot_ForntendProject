//========================RegisterUser.html===========================================
//----------------current user id---------------------------
let userId;
$.ajax({
    url: bookingBaseUrl + "getBookingByUserId?userId="+userId,
    method: "GET",
    success: function (res) {
        userId = res.data.userId;
        $("#userId").val(res.data.userId);
    }
});
//--------------Load Register user Details----
$.ajax({
    url: bookingBaseUrl + "api/v1/user",
    method: "GET",
    contentType: "application/json",
    dataType: "json",
    success: function (res) {
        for (var i of res.data) {
            if (userId === i.userId) {
                $("#userId").val(i.userId);
                $("#reg_Name").val(i.name);
                $("#reg_NIC").val(i.nic);
                $("#reg_Age").val(i.age);
                $("#reg_Gender").val(i.gender);
                $("#reg_Email").val(i.email);
                $("#reg_Password").val(i.password);
                $("#reg_RoleType").val(i.role_Type);
                $("#rag_contactNumber").val(i.contactNumber);
                $("#rag_address").val(i.address);
                $("#regUserProfilePhoto").val(i.profilepic);
            }
        }
    }
})
//======================================Booking.html==============================================

//---------------------Calculate the payment---------------------------------
$("#allDays").on("click", function () {

    const package_value=document.getElementById("package_value");
    const guideValue=document.getElementById("guideValue");
    const allday=document.getElementById("package_value");
    const total=document.getElementById("full_payment");

    const packageValue=parseFloat(package_value.value);
    const gValue=parseFloat(guideValue.value);
    const  days=parseInt(allday.value);

    if (!isNaN(days)){
        const payment=packageValue*gValue*days;
        total.value=payment;
    }else {
        alert("Please Enter a valid number for day count...!");
    }
});

//-------------------Save Payments-----------------------------------
$("#saveBtn").click(function (){
    let formData = new FormData(this);

    var reservationForm=$("#reservationDetails")[0];
    var paymentForm=$("#paymentDetails")[0];

    var reservationFormData=new FormData(reservationForm);
    var paymentFomrData=new FormData(paymentForm);
    var paymentSlip=paymentForm.paymentSlip.files[0];

    formData.append("bookingId",reservationFormData.get("bookingId"));
    formData.append("customerId",reservationFormData.get("customerId"));
    formData.append("date",reservationFormData.get("date"));
    formData.append("price",paymentFomrData.get("price"));
    formData.append("paymentSlip",paymentSlip);
    $.ajax({
        url: bookingBaseUrl + "api/v1/booking",
        method: "POST",
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

})




//-----------------------Current date----------------------------------------
const dateInput = document.getElementById('date');
const currentDate = new Date();
const formattedDate = currentDate.toLocaleDateString();
console.log(dateInput);
dateInput.value = formattedDate;
