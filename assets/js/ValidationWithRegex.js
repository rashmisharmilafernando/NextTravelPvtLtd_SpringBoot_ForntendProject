/*--------------Customer------------------*/

const reguserName=/^[A-z ]{3,20}$/;
const reguserEmail=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const reguserPassword=/^([A-Z a-z]{5,15}[0-9]{1,10})$/;
const regUsername=/^[A-z0-9/ ]{4,30}$/;
const reguserNic=/^([0-9]{12}|[0-9V]{10})$/;
const reguserAddress=/^[A-z0-9/ ]{4,30}$/;

let registerUserValidation=[];
registerUserValidation.push({
    reg:reguserName,
    field:$('#regname')
})
registerUserValidation.push({
    reg:reguserEmail,
    field:$('#regEmail')
})
registerUserValidation.push({
    reg:reguserPassword,
    field:$('#regPassword')
})
registerUserValidation.push({
    reg:regUsername,
    field:$('#regUsername')
})
registerUserValidation.push({
    reg:reguserNic,
    field:$('#regNIC')
})
registerUserValidation.push({
    reg:reguserAddress,
    field:$('#regAddress')
})
$("#regname,#regEmail,#regNIC,#regUsername,#regPassword,#regAddress").on('keyup', function (event) {
    checkValidity(registerUserValidation);
});

$("#regname,#regEmail,#regNIC,#regUsername,#regPassword,#regAddress").on('blur', function (event) {
    checkValidity(registerUserValidation);
});

/*--------------Hotel------------------*/

const hotelName = /^[A-Za-z ]{3,20}$/;
const hotelEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const hotelContactNumber1 = /^(?:\+94|0)[1-9]\d{8}$/;
const hotelContactNumber2 = /^(?:\+94|0)[1-9]\d{8}$/;
const hotelfee = /^\d{3,20}$/;

let hotelValidation = [];

hotelValidation.push({
    reg: hotelName,
    field: $('#hName')
});
hotelValidation.push({
    reg: hotelEmail,
    field: $('#hEmail')
});
hotelValidation.push({
    reg: hotelContactNumber1,
    field: $('#hNumber1')
});
hotelValidation.push({
    reg: hotelContactNumber2,
    field: $('#hNumber2')
});
hotelValidation.push({
    reg: hotelfee,
    field: $('#hfee')
});


$("#hName,#hEmail,#hNumber1,#hNumber2,#hfee").on('keyup', function (event) {
    checkValidity(hotelValidation);
});

$("#hName,#hEmail,#hNumber1,#hNumber2,#hfee").on('blur', function (event) {
    checkValidity(hotelValidation);
});

/*--------------User------------------*/

const userName = /^[A-z ]{3,20}$/;
const usernic = /^([0-9]{12}|[0-9V]{10})$/;
const userAge = /^\d+$/;
const userEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const usernumber = /^(?:\+94|0)[1-9]\d{8}$/;
const userAddress = /^[A-z0-9/ ]{4,30}$/;

let userValidation = [];
userValidation.push({
    reg: userName,
    field: $('#userName')
});
userValidation.push({
    reg: usernic,
    field: $('#userNic')
});
userValidation.push({
    reg: userAge,
    field: $('#userAge')
});
userValidation.push({
    reg: userEmail,
    field: $('#userEmail')
});
userValidation.push({
    reg: usernumber,
    field: $('#userNumber')
});
userValidation.push({
    reg: userAddress,
    field: $('#userAddress')
});


$("#userName,#userNic,#userAge,#userEmail,#userNumber,#userAddress").on('keyup', function (event) {
    checkValidity(userValidation);
});

$("#userName,#userNic,#userAge,#userEmail,#userNumber,#userAddress").on('blur', function (event) {
    checkValidity(userValidation);
});


/*--------Guide-------------*/

const guideName = /^[A-z ]{3,20}$/;
const guideAddress =  /^[A-z0-9/ ]{4,30}$/;
const guideNumber = /^(?:\+94|0)[1-9]\d{8}$/;
const guideExprince = /^[A-z ]{3,20}$/;
const guidedayValue = /^\d{3,20}$/;


let guideValidation = [];
guideValidation.push({
    reg: guideName,
    field: $('#guideName')
});
guideValidation.push({
    reg: guideAddress,
    field: $('#guideAddress')
});
guideValidation.push({
    reg: guideNumber,
    field: $('#guideNumber')
});
guideValidation.push({
    reg: guideExprince,
    field: $('#guideExperience')
});
guideValidation.push({
    reg: guidedayValue,
    field: $('#guideDayValue')
});



$("#guideName,#guideAddress,#guideNumber,#guideExperience,#guideDayValue").on('keyup', function (event) {
    checkValidity(guideValidation);
});

$("#guideName,#guideAddress,#guideNumber,#guideExperience,#guideDayValue").on('blur', function (event) {
    checkValidity(guideValidation);
});

/*----------------Vehicle-------------------*/

const vehicleName = /^[A-z ]{3,20}$/;
const vehicleFuelUsage =  /^\d{4,20}$/;
const vehicleSeatCapacity =/^\d{1,20}$/;
const DriverName  = /^[A-z ]{3,20}$/;
const DriverNumber  =/^(?:\+94|0)[1-9]\d{8}$/;


let vehicleValidation = [];
vehicleValidation.push({
    reg: vehicleName,
    field: $('#vehicle_brand')
});
vehicleValidation.push({
    reg: vehicleFuelUsage,
    field: $('#vehicle_Fuel_Usage')
});
vehicleValidation.push({
    reg: vehicleSeatCapacity,
    field: $('#vehicle_Seat_Capacity')
});
vehicleValidation.push({
    reg: DriverName,
    field: $('#vehicle_Driver_Name')
});
vehicleValidation.push({
    reg: DriverNumber,
    field: $('#vehicle_Drive_Number')
});



$("#vehicle_brand,#vehicle_Fuel_Usage,#vehicle_Seat_Capacity,#vehicle_Driver_Name,#vehicle_Drive_Number").on('keyup', function (event) {
    checkValidity(vehicleValidation);
});

$("#vehicle_brand,#vehicle_Fuel_Usage,#vehicle_Seat_Capacity,#vehicle_Driver_Name,#vehicle_Drive_Number").on('blur', function (event) {
    checkValidity(guideValidation);
});
