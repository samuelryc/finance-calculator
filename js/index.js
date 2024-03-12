let targetFutureValue = null, years = null, interestRate = null, presentValue = null;

window.index = 
{
    init : function() 
    {
        $("#input-target-future-value").on(
            "change",
            function(event) {
                targetFutureValue = $(this).val();
            }
        );

        $("#input-present-value").on(
            "change",
            function(event) {
                presentValue = $(this).val();
            }
        );

        $("#input-years").on(
            "change",
            function(event) {
                years = $(this).val();
            }
        );

        $("#input-interest-rate").on(
            "change",
            function(event) {
                interestRate = $(this).val();
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
                const futureValue = targetFutureValue * Math.pow(1 + rate, years);

                $("#p-target-future-value").append("Target amount" + " " + '<span id="result-future-value">' + Number(targetFutureValue).toFixed(2) + " $" + "</span>");
                $("#p-present-value").append("Initial amount" + " " + '<span id="result-present-value">' + Number(presentValue).toFixed(2) + " $" + "</span>");
                $("#p-interest-rate").append("Interests annual rate" + " " + '<span id="result-interest-rate">' + interestRate + " %" +"</span>");
                $("#p-interests-gained").append("Profit from interests after" + " " + years + " " + 'years <span id="result-interests-gained">' + (presentValue * Math.pow(1 + rate, years)).toFixed(2) + " $" + "</span>");
                
                $("#table-stats-1").fadeIn(2000);

                for (let year = 1; year <= years; year++) {
                    // Calculate future value for each year
                    const futureValue = presentValue * Math.pow(1 + rate, year);
                
                    // Calculate difference from target future value
                    const difference = targetFutureValue - futureValue;
                
                    // Print results with formatting
                    console.log(targetFutureValue);
                    console.log(`${year}\t$${Number(targetFutureValue).toFixed(2)}\t$${futureValue.toFixed(2)}\t$${difference.toFixed(2)}`);
                
                    // Update present value for next year (optional)
                    // This assumes deposits are made annually. You can remove this line if not applicable.
                    //targetFutureValue = futureValue;
                    //const money_remaining_to_goal = difference.toFixed(2) + " $" 
                    
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