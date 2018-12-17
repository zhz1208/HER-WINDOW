
function getNextDayOfWeek(date, dayOfWeek) {
    // Code to check that date and dayOfWeek are valid left as an exercise ;)
    var resultDate = new Date(date.getTime());
    resultDate.setDate(date.getDate() + (7 + dayOfWeek - date.getDay()) % 7);
    return resultDate;
}

$(function() {
    $('.bubble').hide();

    var clock = new Vue({
        el: '#clock',
        data: {
            time: '',
            date: ''
        }
    });

    var week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    var timerID = setInterval(updateTime, 1000);
    updateTime();
    function updateTime() {
        var cd = new Date();
        clock.time = zeroPadding(cd.getHours(), 2) + ':' + zeroPadding(cd.getMinutes(), 2) + ':' + zeroPadding(cd.getSeconds(), 2);
        clock.date = zeroPadding(cd.getFullYear(), 4) + '-' + zeroPadding(cd.getMonth()+1, 2) + '-' + zeroPadding(cd.getDate(), 2) + ' ' + week[cd.getDay()];
    };

    function zeroPadding(num, digit) {
        var zero = '';
        for(var i = 0; i < digit; i++) {
            zero += '0';
        }
        return (zero + num).slice(-digit);
    }

    // clip bubble
    //$(".bubble").hide();
    var window_offset = $("#window").offset(); 
    var window_width = $("#window").outerWidth(true);
    var window_height = $("#window").outerHeight(true);
    var window_right = window_offset.left + window_width;
    var window_bottom = window_offset.top + window_height;
    $(".bubble").show();
    $(".bubble").each(function() {
        var bubble_offset = $(this).offset();
        var bubble_width = $(this).outerWidth(true);
        var bubble_height = $(this).outerHeight(true);
        var bubble_right = bubble_offset.left + bubble_width;
        var bubble_bottom = bubble_offset.top + bubble_height;
        var bubble_margin_top = parseInt($(this).css("marginTop").replace('px', ''));
        var bubble_margin_bottom = parseInt($(this).css("marginBottom").replace('px', ''));
        var bubble_margin_left = parseInt($(this).css("marginLeft").replace('px', ''));
        var bubble_margin_right = parseInt($(this).css("marginRight").replace('px', ''));
        var clip_left = window_offset.left > bubble_offset.left ? window_offset.left - bubble_offset.left : -bubble_margin_left;
        var clip_top = window_offset.top > bubble_offset.top ? window_offset.top - bubble_offset.top : -bubble_margin_top;
        var clip_right = window_right < bubble_right ? bubble_width - (bubble_right - window_right) : bubble_width;
        var clip_bottom = window_bottom < bubble_bottom ? bubble_height - (bubble_bottom - window_bottom) : bubble_height;
        $(this).css('clip', 'rect(' + clip_top + 'px,' + clip_right + 'px,' + clip_bottom + 'px,' + clip_left + 'px)'); 
        $(this).hide();
    });

    //    bubbles appear by time

    //    //    appearing time
    //    var tsephora = new Date("12/13/2018 14:10:00 PM").getTime();
    //    var tyamibuy = new Date("12/9/2018 11:15:20 PM").getTime();
    //    var tgoogledoc = new Date("12/9/2018 10:15:20 PM").getTime();
    //    var twechat = new Date("12/9/2018 2:15:20 PM").getTime();
    //    var timessage = new Date("12/9/2018 23:05:20 PM").getTime();
    //    var tcoding = new Date("12/9/2018 9:25:12 PM").getTime();
    //    var tcodingspan = new Date("12/9/2018 5:21:2 PM").getTime();
    //    var tphotoshop = new Date("12/9/2018 2:25:30 PM").getTime();
    //    var tslamdunk = new Date("12/9/2018 7:42:11 PM").getTime();
    //    var tsleep = new Date("12/9/2018 3:11:36 PM").getTime();
    //    var tmakeup = new Date("12/9/2018 14:58:20 PM").getTime();
    //    var tsnack = new Date("12/9/2018 9:22:10 PM").getTime();
    //    var tmirror = new Date("12/9/2018 8:29:40 AM").getTime();
    //    var tphonegame = new Date("12/9/2018 12:15:20 PM").getTime();
    //    var ttakephoto = new Date("12/9/2018 10:12:20 PM").getTime();
    //    var tvitamin = new Date("12/9/2018 8:14:2 PM").getTime();
    //    var ttv = new Date("12/9/2018 8:29:46 PM").getTime();
    //    var tthesims = new Date("12/9/2018 2:11:22 PM").getTime();
    //    var tlego = new Date("12/9/2018 3:32:18 PM").getTime();

    /*
    //lasting time    
    setTimeout(function(){
        $('#sephora').show();
        setTimeout(function(){
            $('#sephora').hide();
        }, 1320000);
    }, tsephora - now);
    */

    // test multiple time periods
    var timePeriods = {
        'sephora': [ ["SAT", "8:12:10 PM", "8:56:49 PM"]],
        'yamibuy': [ ["FRI", "9:48:20 PM", "10:12:30 PM"], ["SUN", "4:23:21 PM", "4:34:41 PM"] ],
        'googledoc': [  ["MON", "12:00:00 AM", "1:01:40 PM"], ["MON", "3:21:00 PM", "6:16:00 PM"], ["TUE", "2:10:21 PM", "4:25:00 PM"], ["WED", "9:12:21 PM", "11:39:31 PM"], ["SUN", "3:12:10 PM", "5:12:00 PM"], ["SUN", "8:15:50 PM", "11:59:59 PM"] ],
        'wechat': [ ["MON", "0:02:17 AM", "0:02:38 AM"], ["MON", "4:02:10 PM", "4:09:00 PM"],["MON", "4:36:10 PM", "4:39:00 PM"],  ["MON", "8:12:10 PM", "8:16:00 PM"],  ["MON", "8:29:16 PM", "8:31:00 PM"], ["MON", "9:30:16 PM", "9:36:45 PM"],["MON", "10:12:16 PM", "10:13:38 PM"], ["MON", "0:12:17 AM", "0:13:18 AM"], ["TUE", "3:33:02 PM", "3:33:38 PM"],["TUE", "3:36:12 PM", "3:38:28 PM"], ["WED", "9:13:34 PM", "9:17:56 PM"], ["THU", "4:43:00 PM", "4:45:12 PM"], ["SAT", "8:36:00 PM", "8:41:45 PM"], ["SAT", "9:23:23 PM", "9:29:25 PM"], ["SUN", "0:15:27 AM", "0:17:18 AM"], ["SUN", "10:22:42 PM", "10:23:15 PM"], ["SUN", "10:29:42 PM", "10:31:17 PM"],["SUN", "11:41:18 PM", "11:42:10 PM"],["SUN", "11:56:18 PM", "11:58:19 PM"]],
        'imessage': [["MON", "0:12:10 AM", "0:14:48 AM"], ["THU", "9:42:10 PM", "9:45:25 PM"], ["THU", "10:14:18 PM", "10:21:25 PM"], ["FRI", "10:32:21 PM", "10:36:36 PM"], ["FRI", "10:54:22 PM", "10:56:06 PM"], ["SUN", "11:45:43 PM", "11:49:23 PM"] ],
        'coding': [ ["THU", "7:23:10 PM", "9:02:38 PM"], ["THU", "9:26:10 PM", "11:58:48 PM"], ["SUN", "9:32:00 PM", "11:54:34 PM"], ["MON", "8:05:47 PM", "11:59:59 PM"], ["TUE", "0:00:00 AM", "0:49:38 AM"], ],
        //        'codingspan': [ ["FRI", "8:12:10 PM"], ["SAT", "7:00:00 PM", "7:10:00 PM"] ],
        'photoshop': [ ["MON", "3:06:15 PM", "3:52:28 PM"], ["SAT", "7:26:30 PM", "8:21:34 PM"] ],
        'slamdunk': [ ["MON", "6:42:12 PM", "7:28:31 PM"], ["THU", "6:56:12 PM", "7:30:31 PM"],  ["FRI", "10:48:52 AM", "10:51:31 AM"] ],
        'sleep': [ ["MON", "2:12:48 AM", "1:16:00 PM"], ["TUE", "1:12:48 AM", "12:16:00 PM"], ["WED", "12:48:24 AM", "11:16:00 AM"], ["THU", "12:49:42 AM", "7:00:00 AM"], ["FRI", "12:41:24 AM", "8:00:20 AM"], ["SAT", "1:46:42 AM", "12:38:42 PM"], ["SUN", "1:02:32 AM", "11:56:42 AM"]],
        'makeup': [["TUE", "6:05:00 PM", "6:18:00 PM"], ["WED", "3:02:10 PM", "3:28:26 PM"] ],
        'snack': [ ["MON", "9:34:10 PM", "9:39:00 PM"], ["WED", "10:29:10 PM", "10:34:50 PM"], ["THU", "10:14:40 PM", "10:24:13 PM"], ["FRI", "10:14:21 PM", "10:29:13 PM"], ["SAT", "10:44:21 PM", "10:49:28 PM"], ["SUN", "11:24:01 PM", "11:26:21 PM"] ],
        'phonegame': [ ["FRI", "9:22:10 PM", "9:59:50 PM"], ["SAT", "8:52:40 PM", "9:18:20 PM"] ],
        'takephoto': [ ["SAT", "3:02:10 PM", "3:39:21 PM"] ],
        'vitamin': [ ["MON", "8:02:10 PM", "8:02:32 PM"], ["TUE", "11:14:24 PM", "11:14:42 PM"], ["WED", "8:22:10 PM", "8:22:29 PM"], ["THU", "8:06:10 PM", "8:06:27 PM"], ["FRI", "6:58:27 PM", "6:58:42 PM"], ["SAT", "8:42:10 PM", "8:42:31 PM"], ["SUN", "8:38:11 PM", "8:38:28 PM"], ],
        'tv': [ ["FRI", "7:21:10 PM", "9:40:00 PM"], ["SAT", "2:24:49 PM", "3:00:20 PM"], ["SAT", "7:02:00 PM", "7:45:00 PM"], ["SUN", "2:01:49 PM", "2:45:20 PM"], ["SUN", "7:21:00 PM", "8:00:20 PM"]  ],
        'thesims': [ ["FRI", "10:42:12 PM", "11:04:00 PM"], ["SAT", "7:25:00 PM", "7:39:00 PM"] ],
        'lego': [ ["FRI", "7:04:10 PM", "9:29:00 PM"] ],
        //'quip': [ ["FRI", "4:11:00 PM", "6:06:00 PM"] ],
        'quip': [ ["FRI", "7:37:50 PM", "7:38:00 PM"] ],
    }

    var today = new Date();
    var now = today.getTime();
    var todayWeekDay = week[today.getDay()];
    //console.log(today.getDay());
    for (var activity in timePeriods) {
        for (var i in timePeriods[activity]) {
            var weekDay = timePeriods[activity][i][0];
            if (todayWeekDay == weekDay) {
                var startDate = new Date(today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + timePeriods[activity][i][1]);
                var endDate = new Date(today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + timePeriods[activity][i][2]);
                console.log(startDate);
                console.log(endDate);
                var startTime = startDate.getTime();
                var endTime = endDate.getTime();

                console.log(timePeriods[activity][i]);
                if (now < startTime) {
                    console.log(activity + ": now < startTime");
                    setTimeout(function(){
                        console.log("timeout");
                        $('#' + activity).show();
                        console.log(endTime - startTime);
                        setTimeout(function(){
                            $('#' + activity).hide();
                        }, endTime - startTime);
                    }, startTime - now);
                } else if (now < endTime) {
                    console.log(activity + ": startTime <= now < endTime");
                    $('#' + activity).show();
                    setTimeout(function(){
                        $('#' + activity).hide();
                    }, endTime - now);
                }
            }
        }
    }


    // change background based on time
    var d = new Date();
    var n = d.getHours();
    if (n >= 18 || n < 5) {
        // If time is after 5PM or before 5AM, apply night theme to ‘body’
        document.body.className = "night";
//        $("#window_outer").css('box-shadow', 'inset 0px 0px 1.5vh 1.5vh #000');
    }
    else {
        // Else use ‘day’ theme
        document.body.className = "day";
    }

});

