// 天気プログラムは2分尺を想定してプログラムしている
// そのため、尺が変わる場合もしくは本日→明日を変える場合は再度書き直す必要あり

// 配信スケジュール取得
var weather_sche = [];
for (key in live_schedule) {
    if (live_schedule[key] === 'weather') {
        weather_sche.push(Number(key));
    }
    
}

function weatherBase() {
    var city_num = 1;
    weathers_text = [];
    $.getJSON("http://xs286880.xsrv.jp/LiveCoeFont/weather.php", function(data){
        var city_weather_codes = data['weather_codes'];
        // 天気情報の処理
        city_weather_codes.forEach(function(codes) {

            // 天気判断(画像)
            if (Number(codes[code_num]) >= 400) {
                var weather_img = "http://xs286880.xsrv.jp/LiveCoeFont/img/yuki.png";
            }else if (Number(codes[code_num]) == 350) {
                var weather_img = "http://xs286880.xsrv.jp/LiveCoeFont/img/kaminari.png";
            }else if (Number(codes[code_num]) >= 300) {
                if (Number(codes[code_num]) == 301 || Number(codes[code_num]) == 302) {
                    var weather_img = "http://xs286880.xsrv.jp/LiveCoeFont/img/kumoame.png";
                } else {
                    var weather_img = "http://xs286880.xsrv.jp/LiveCoeFont/img/ame.png";
                }
            }else if (Number(codes[code_num]) >= 200) {
                if (Number(codes[code_num]) == 201) {
                    var weather_img = "http://xs286880.xsrv.jp/LiveCoeFont/img/harekumo.png";
                } else {
                    var weather_img = "http://xs286880.xsrv.jp/LiveCoeFont/img/kumori.png";
                }
            }else if (Number(codes[code_num]) >= 100) {
                var weather_img = "http://xs286880.xsrv.jp/LiveCoeFont/img/hare.png";
            }
            
            // 天気情報格納
            var img_id = '#weather' + String(city_num);
            $(img_id).attr('src', weather_img);
            city_num++;
        });
        // 日付+文字格納
        weather_title = data['weather_days'][code_num].slice(5);
        top_word = weather_title.slice(0,1);
        day_top = weather_title.slice(3,4);
        if (top_word = String(0)) {
            weather_title = weather_title.slice(1);
        }
        if (day_word = String(0)) {
            weather_title = weather_title.replace(/0/g, '');
        }
        $('#weather_title').text(weather_title);
    });
    console.log('天気情報の日付:' + code_num);
}

$(function(){
    // bgm取得
    bgm = $("#bgm").get(0);
    bgm2 = $("#bgm2").get(0);
    // 今日or明日の判断処理
    if (shakued_time !== weather_sche[1] ) { //  明日表示のタイミングではない
        code_num = 0;
    } else {
        code_num = 1;
    }
    weatherBase();

    for (key in weather_sche) {
        if (shakued_time === weather_sche[key]) {
            $('#weather_flame_div').css('opacity', 1);
            $('#top_flame_div').css('display', 'none');
            $('#weather_flame_div').css('display', 'block');
            $('#video_flame_div').css('display', 'none');
            bgm2.pause();
            bgm.play();
            bgm.volume = 0.1;
            bgm.loop = true;
        }
    }
});

function weather(){
    // 今日or明日の判断処理
    if (nowSec === 0) {
        if (shakued_time === weather_sche[0]) {
            code_num = 0;
            $('#top_flame_div').css('display', 'none');
            $('#weather_flame_div').css('display', 'block');
            bgm2.pause();
            bgm.play();
            bgm.volume = 0;
            bgm.loop = true;
        } else {
            code_num = 1;
        }
        weatherBase();
    } else if (shakued_time === weather_sche[0] && nowSec === 1) {
        $('#weather_flame_div').css('opacity', 1);
    } else if (shakued_time === weather_sche[1] && nowSec === 58) {
        $('#weather_flame_div').css('opacity', 0);
    }

    // 音声フェード
    if (shakued_time === weather_sche[0] && nowSec <= 10) {
        bgm.volume += 0.01;
        console.log("音量+");
    } else if (shakued_time === weather_sche[1] && nowSec >= 50) {
        bgm.volume -= 0.01;
        console.log("音量-");
    }
}