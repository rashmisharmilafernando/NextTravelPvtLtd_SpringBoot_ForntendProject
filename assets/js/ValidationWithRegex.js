//Customer

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

//hotel
const hotelName = /^[A-Za-z ]{3,20}$/;
const hotelEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const hotelContactNumber1 = /^\+\d{1,3}-[2-9]\d{2}-\d{4}$/;
const hotelContactNumber2 = /^\+\d{1,3}-[2-9]\d{2}-\d{4}$/;
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
