// 配信スケジュール取得
var title_sche = [];
for (key in live_schedule) {
    if (live_schedule[key] === 'title') {
        title_sche.push(Number(key));
    }
}

$(function()  {
    // bgm取得
    bgm = $("#bgm").get(0);
    bgm2 = $("#bgm2").get(0);
    // 初期設定
    for (key in title_sche) {
        if (shakued_time === title_sche[key]) {
            $('#top_flame_div').css('opacity', 1);
            $('#top_flame_div').css('display', 'block');
            $('#weather_flame_div').css('display', 'none');
            $('#video_flame_div').css('display', 'none');
            bgm.pause();
            bgm2.play();
            bgm2.volume = 0.1;
            bgm2.loop = true;
        }
    }
});

function title() {
    // 1分尺のみの前提プログラム
    if (nowSec === 0) {
        $('#top_flame_div').css('display', 'block');
        $('#video_flame_div').css('display', 'none');
        bgm.pause();
        bgm2.play();
        bgm2.volume = 0;
        bgm2.loop = true;
    }
    if (nowSec === 1) {
        $('#top_flame_div').css('opacity', 1);
    }
    if (nowSec === 58) {
        $('#top_flame_div').css('opacity', 0);
    }

    // 音声フェード
    if (nowSec <= 5) {
        bgm2.volume += 0.02;
        console.log("音量+");
    }
    if (nowSec >= 55) {
        bgm2.volume -= 0.02;
        console.log("音量-");
    }
}