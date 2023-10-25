let reportBaseUrl="";

document.addEventListener("DOMContentLoaded",() =>{

    //Daily Report
    let data=[];
    let options={theme:"light2"};

    $.ajax({
        url:reportBaseUrl+"report/dailyIncome",
        method:"GET",
        dataType:"json",
        success:function (res){
            for(let i=0;i<res.length;i++){
                let data=res[i][0]
                let now=new Date(date);
                let newMonth = now.getMonth() + 1;
                let newYear = now.getFullYear();
                var formattedDate = newYear + "-" + newMonth.toString().padStart(2, "0") + "-" + newDate.toString().padStart(2, "0");
                let count = res[i][1];
                let total = res[i][2];
                data.push({
                    x:new Date(res[i][0]),y:total
                });
            }
            $("#dailyIncomeChart").CanvasJSChart(options);
        }
    })
    //Monthly Report
    $.ajax({
        url: reportBaseUrl + "report/monthlyIncome",
        method: "GET",
        dataType: "json",
        success: function (res) {
            console.log(res);
            for (let i = 0; i < res.length; i++) {
                let date = res[i][0];
                let count = res[i][1];
                let total = res[i][2];

                new Chart(document.querySelector('#monthlyIncomeChart'), {
                    type: 'line', data: {
                        labels: [date], datasets: [{
                            label: 'Monthly Sales Income',
                            data: [total],
                            fill: false,
                            borderColor: 'rgb(241,165,1)',
                            tension: 0.1
                        }]
                    }, options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }
        }
    });


    //Annually Report
    $.ajax({
        url:  reportBaseUrl + "report/AnnuallyIncome",
        method: "GET",
        dataType: "json",
        success: function (res) {
            console.log(res);
            for (let i = 0; i < res.length; i++) {
                let date = res[i][0];
                let count = res[i][1];
                let total = res[i][2];
                new Chart(document.querySelector('#annuallyIncomeChart'), {
                    type: 'line', data: {
                        labels: [date], datasets: [{
                            label: 'Annually Sales Income',
                            data: [total],
                            fill: false,
                            borderColor: 'rgb(241,165,1)',
                            tension: 0.1
                        }]
                    }, options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }
        }
    });
})
