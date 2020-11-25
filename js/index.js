var item_full_price = null;
var item_target_date = null;
var item_interests_rate = null;

window.index = {
    init : function() {

        $('#input-item-full-price').change(function(event) {
            item_full_price = $(this).val();
        });

        $('#input-item-target-date').change(function(event) {
            item_target_date = $(this).val();
        });

        $('#input-interests-rate').change(function(event) {
            item_interests_rate = $(this).val();
        });

        $('#submit').click(function(event) {
            $('#input-container').hide();
            $('#results-container').fadeIn(2000);
            $('#table-stats-1').html('');
            $('#table-stats-1').html(
                '<tr>' +
                    '<th>YEAR</th>' +
                    '<th>PROFIT FROM INTERESTS</th>' +
                    '<th>INITIAL CASHDOWN</th>' +
                '</tr>'
            );

            var result_interests = (item_full_price * Math.pow((1 + (item_interests_rate / 100)), item_target_date) - item_full_price).toFixed(2);
            console.log(result_interests);
            $('#p-target-full-price').append('Target price' + ' ' + '<span id="result-target-price">' + commafy(item_full_price) + '$' + '</span>');
            $('#p-interests-gained').append('Profit from interests after' + ' ' + item_target_date + ' ' + 'years <span id="result-interests">' + commafy(result_interests) + '$' + '</span>');
            $('#p-interests-rate').append('Interests annual rate' + ' ' + '<span id="result-interest-rate">' + item_interests_rate + '%' +'</span>');
            $('#p-money-invested').append('Initial cashdown needed' + ' ' + '<span id="result-money-to-save">' + commafy((item_full_price - result_interests).toFixed(2)) + '$' + '</span>');

            $('#table-stats-1').fadeIn(2000);

            for (var row_iterator = 1;; row_iterator++) {

                var current_interests = (item_full_price * Math.pow((1 + (item_interests_rate / 100)), row_iterator) - item_full_price).toFixed(2);
                var money_remaining_to_goal = (item_full_price - current_interests).toFixed(2);

                if (money_remaining_to_goal < 0) {
                    break;
                }

                $('#table-stats-1').append(
                    '<tr class="tr-row-' + row_iterator + '">' +
                        '<td>' + row_iterator + '</td>' +
                        '<td>' + commafy(current_interests) + '$' + '</td>' +
                        '<td>' + commafy(money_remaining_to_goal) + '$' + '</td>' +
                    '</tr>'
                );

                if (row_iterator == item_target_date) {
                    $('.tr-row-' + row_iterator).css('background-color', 'yellow');
                }
            }
        });
    }
};

$(document).ready(function() {
    window.index.init();
});

function commafy(num) {
    var str = num.toString().split('.');
    if (str[0].length >= 5) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
    }
    if (str[1] && str[1].length >= 5) {
        str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
}
