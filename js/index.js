let targetFutureValue = null, years = null, interestRate = null, presentValue = null;

window.index = 
{
    init : function() 
    {
        $("#input-target-future-value").on(
            "change",
            function() {
                const user_input = $(this).val();

                if (user_input < 1 || user_input > 1000000000000) {
                    $("#error-target-future-value").show();
                } else {
                    $("#error-target-future-value").hide();
                    targetFutureValue = user_input;
                }
            }
        );

        $("#input-present-value").on(
            "change",
            function() {
                const user_input = $(this).val();

                if (user_input < 1 || user_input > 1000000000000) {
                    $("#error-present-value").show();
                } else {
                    $("#error-present-value").hide();
                    presentValue = user_input;
                }
            }
        );

        $("#input-years").on(
            "change",
            function() {
                const user_input = $(this).val();

                if (user_input < 1 || user_input > 1000000000000) {
                    $("#error-years").show();
                } else {
                    $("#error-years").hide();
                    years = user_input;
                }
            }
        );

        $("#input-interest-rate").on(
            "change",
            function() {
                const user_input = $(this).val();
                
                if (user_input < 0 || user_input > 100) {
                    $("#error-interest-rate").show();
                } else {
                    $("#error-interest-rate").hide();
                    interestRate = user_input;
                }
            }
        );

        $("#submit").on(
            "click", 
            function() {
                $("#input-container").hide();
                $("#results-container").fadeIn(2000);
                $("#table-stats-1").html("");
                $("#table-stats-1").html(
                    "<tr>" +
                        "<th>YEAR</th>" +
                        "<th>PROFIT</th>" +
                        "<th>AMOUNT</th>" +
                    "</tr>"
                );

                const rate = interestRate / 100;

                $("#p-target-future-value").append("Target amount" + " " + '<span id="result-future-value">' + Number(targetFutureValue).toFixed(2) + " $" + "</span>");
                $("#p-present-value").append("Initial amount" + " " + '<span id="result-present-value">' + Number(presentValue).toFixed(2) + " $" + "</span>");
                $("#p-interest-rate").append("Interests annual rate" + " " + '<span id="result-interest-rate">' + interestRate + " %" +"</span>");
                $("#p-interests-gained").append("Profit from interests after" + " " + years + " " + 'years <span id="result-interests-gained">' + (presentValue * Math.pow(1 + rate, years)).toFixed(2) + " $" + "</span>");
                
                $("#table-stats-1").fadeIn(2000);

                for (let year = 1; year <= years; year++) {
                    const futureValue = presentValue * Math.pow(1 + rate, year);

                    $("#table-stats-1").append(
                        '<tr class="tr-row-' + year + '">' +
                            "<td>" + year + "</td>" +
                            "<td>" + (Number(futureValue) - Number(presentValue)).toFixed(2) + " $</td>" +
                            "<td>" + futureValue.toFixed(2) + " $" + "</td>" +
                        "</tr>"
                    );

                    if (futureValue > targetFutureValue) {
                        $(".tr-row-" + year).css("background-color", "yellow");
                    }
                }
            }
        );
    }
};

$(document).ready(
    function() {
        window.index.init();
    }
);