$(document).ready(function() {
    $('#yearChart').hide();
    $(document).on('click', '.year', function(event) {
        event.preventDefault();
        if ($(this).hasClass('disabled')) {
            return false;
        } else {
            $('.month').removeClass('disabled');
            $(this).addClass('disabled');
            $('#yearChart').show();
            $('#monthChart').hide();

        }
    });
    $(document).on('click', '.month', function(event) {
        event.preventDefault();
        if ($(this).hasClass('disabled')) {
            return false;
        } else {
            $('.year').removeClass('disabled');
            $(this).addClass('disabled');
            $('#yearChart').hide();
            $('#monthChart').show();
        }
    });
    var eachMonth = document.getElementById("monthChart");
    var monthChart = new Chart(eachMonth, {
        type: 'bar',
        data: {
            labels: ["A", "B+", "B", "C+", "C", "D", "F"],
            datasets: [{
                label: 'เกรดภายในเดือนนี้',
                data: [A, Bplus, B, Cplus, C, D, F],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 0, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 0, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
        },
        responsive: true,
    });
    eachMonth.onclick = function(e) {
        var point = monthChart.getElementAtEvent(e);
        var setIndex = point[0]._datasetIndex;
        var setData = point[0]._index;
        var dataArray = { month: month, grade: monthChart.data.labels[setData]};
        window.location.href = 'showDetail?month='+dataArray.month+'&grade='+encodeURI(dataArray.grade);
    }
    var yearData = {
        type: 'line',
        data: {
            labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            datasets: [{
                label: 'A',
                data: [5, 2, 3, 7, 5, 6, 7, 15, 9, 10, 11, 12],
                borderWidth: 1,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            }, {
                label: 'B+',
                data: [3, 1, 3, 7, 2, 6, 8, 15, 7, 10, 11, 12],
                borderWidth: 1,
                backgroundColor: 'rgba(0, 255, 0, 0.2)',
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        },
        responsive: true,
    }
    var eachYear = document.getElementById("yearChart");
    var yearChart = new Chart(eachYear, yearData);
    eachYear.onclick = function(e) {
        var point = yearChart.getElementAtEvent(e);
        var setIndex = point[0]._datasetIndex;
        var setData = point[0]._index;
        var dataArray = { month: yearChart.data.labels[setData], count: yearChart.data.datasets[setIndex].data[setData], grade: yearChart.data.datasets[setIndex].label };
        window.location.href = 'showDetail?month='+dataArray.month+'&grade='+dataArray.grade;
    }
});