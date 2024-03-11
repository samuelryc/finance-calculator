let targetFutureValue = null, years = null, rate = null;

window.index = 
{
    init : function() 
    {
        $("#input-item-full-price").on(
            "change",
            function(event) {
                targetFutureValue = $(this).val();
            }
        );

        $("#input-years").on(
            "change",
            function(event) {
                years = $(this).val();
            }
        );

        $("#input-interests-rate").on(
            "change",
            function(event) {
                rate = $(this).val();
            }
        );

        $("#submit").on(
            "click", 
            function(event) {
                $("#input-container").hide();
                $("#results-container").fadeIn(2000);
                $("#table-stats-1").html("");
                $("#table-stats-1").html(
                    "<tr>" +
                        "<th>YEAR</th>" +
                        "<th>PROFIT FROM INTERESTS</th>" +
                        "<th>INITIAL CASHDOWN</th>" +
                    "</tr>"
                );

                rate = interestRate / 100;
                const futureValue = targetFutureValue * Math.pow(1 + rate, years);

                $("#p-target-full-price").append("Target price" + " " + '<span id="result-target-price">' + commafy(targetFutureValue) + "$" + "</span>");
                $("#p-interests-gained").append("Profit from interests after" + " " + years + " " + 'years <span id="result-interests">' + commafy(futureValue) + "$" + "</span>");
                $("#p-interests-rate").append("Interests annual rate" + " " + '<span id="result-interest-rate">' + rate + "%" +"</span>");
                $("#p-money-invested").append("Initial cashdown needed" + " " + '<span id="result-money-to-save">' + commafy((targetFutureValue - futureValue).toFixed(2)) + "$" + "</span>");
                $("#table-stats-1").fadeIn(2000);

                for (let year = 1; year <= years; year++) {
                    // Calculate future value for each year
                    const futureValue = targetFutureValue * Math.pow(1 + rate, year);
                
                    // Calculate difference from target future value
                    const difference = targetFutureValue - futureValue;
                
                    // Print results with formatting
                    console.log(`${year}\t$${targetFutureValue.toFixed(2)}\t$${futureValue.toFixed(2)}\t$${difference.toFixed(2)}`);
                
                    // Update present value for next year (optional)
                    // This assumes deposits are made annually. You can remove this line if not applicable.
                    targetFutureValue = futureValue;

                    $("#table-stats-1").append(
                        '<tr class="tr-row-' + row_iterator + '">' +
                            "<td>" + row_iterator + "</td>" +
                            "<td>" + commafy(current_interests) + "$" + "</td>" +
                            "<td>" + commafy(money_remaining_to_goal) + "$" + "</td>" +
                        "</tr>"
                    );

                    if (row_iterator == item_target_date) {
                        $(".tr-row-" + row_iterator).css("background-color", "yellow");
                    }
                }
            }
        );
    }
};

$(document).on(
    "ready",
    function() {
        window.index.init();
    }
);

function commafy(num) {
    let str = num.toString().split(".");

    if (str[0].length >= 5) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1 ");
    }

    if (str[1] && str[1].length >= 5) {
        str[1] = str[1].replace(/(\d{3})/g, "$1 ");
    }

    return str.join(".");
}
