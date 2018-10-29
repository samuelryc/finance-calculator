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
                    '<th>Year</th>' +
                    '<th>Interests</th>' +
                    '<th>Goal</th>' +
                '</tr>'
            );

            var result_interests = (item_full_price * Math.pow((1 + (item_interests_rate / 100)), item_target_date) - item_full_price).toFixed(2);
            $('#p-interests-gained').append('Interests made after' + ' ' + item_target_date + ' ' + 'years <span id="result-interests">' + result_interests + '$' + '</span>');
        
            $('#p-money-invested').append('Initial cashdown' + ' ' + '<span id="result-money-to-save">' + (item_full_price - result_interests).toFixed(2) + '$' + '</span>');

            $('#table-stats-1').fadeIn(2000);

            for (var row_iterator = 1; row_iterator; row_iterator++) {

                var current_interests = (item_full_price * Math.pow((1 + (item_interests_rate / 100)), row_iterator) - item_full_price).toFixed(2);
                var money_remaining_to_goal = (item_full_price - current_interests).toFixed(2);

                if (money_remaining_to_goal < 0) {
                    break;
                }

                $('#table-stats-1').append(
                    '<tr>' +
                        '<td>' + row_iterator + '</td>' +
                        '<td>' + current_interests + '$' + '</td>' +
                        '<td>' + money_remaining_to_goal + '$' + '</td>' +
                    '</tr>'
                );
            }
        });
    }
};

$(document).ready(function() {
    window.index.init();
});