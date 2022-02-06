// 配信スケジュール取得
var video_sche = [];
for (key in live_schedule) {
    if (live_schedule[key] === 'video') {
        video_sche.push(Number(key));
    }
}

function movie(id, movie_time) {
    if (video_num === 0 || first) {
        $(id).YTPlayer(); // 動画の呼び出し部分に指定したID
        $(id).YTPUnmute();
        console.log('動画スタート');
    }
    if (view_count === 3) { // 初回に動画音声がonにならないため特殊処理
        $(id).YTPUnmute();
        vol = 50;
        $(id).YTPSetVolume(vol);
        console.log('動画初期音声' + vol);
    }
    if (video_num > 2 && video_num <= 7) {
        vol += 0;
        $(id).YTPSetVolume(vol);
        console.log('音量' + vol);
    }
    if (video_num > movie_time - 11 && video_num <= movie_time - 1) {
        vol -= 5;
        $(id).YTPSetVolume(vol);
        console.log('音量' + vol);
    }    
}

vol = 0;
first = false;
movie_num = 0;
// 動画コンテンツの要素定義
movie_id = ['UTnE0qQ41eE','cST4RO2sKsc', 'viNt9VTIXu0', 'SMqAIgL9J8o', 'ad_OTL0ZgCw', 'VGAyK4nZEkY'];

movie_dom = '#video_flame_div';

$(function() {
    for (key in video_sche) {
        if (shakued_time === video_sche[key]) {
            $(movie_dom).css('opacity', 1);
            $('#top_flame_div').css('display', 'none');
            $('#weather_flame_div').css('display', 'none');
            $(movie_dom).css('display', 'block');
            bgm.pause();
            bgm2.pause();
        }
    }

    var nowTime = new Date(); //  現在日時を得る
    var nowMin  = nowTime.getMinutes(); // 分を抜き出す
    var nowSec  = nowTime.getSeconds(); // 秒を抜き出す 
    var property = {
        videoURL: movie_id[movie_num],
        containment: movie_dom,
        loop: false,
        vol: 0,
        mute: true,
        opacity: 1,
        stopMovieOnBlur: false,
        autoPlay: true,
        showControls: false,
        showYTLogo: false,
    }
    // 動画DOM追加
    $('#movie_div').attr('data-property', JSON.stringify(property));
    first = true;
    for (key in video_sche) {
        if (shakued_time === video_sche[key]) {
            video_num = (shakued_time - video_sche[0]) * 60 + nowSec;
            movie("#movie_div", 120);
        }
    }    
    first = false;
});

function video() {

    // 動画の変更処理
    if (shakued_time === video_sche[1] && nowSec === 59) {
        movie_num += 1;
        if (movie_num >= movie_id.length) {
            movie_num = 0;
        }
    }

    var property = {
        videoURL: movie_id[movie_num],
        containment: movie_dom,
        loop: false,
        vol: 0,
        mute: true,
        opacity: 1,
        stopMovieOnBlur: false,
        autoPlay: true,
        showControls: false,
        showYTLogo: false,
    }

    if (shakued_time === video_sche[1] && nowSec === 59) {
        console.log('動画初期化');
        $(movie_dom).empty();
        // 動画のDOMを一度削除して、再度生成
        $(movie_dom).html('<div id="movie_div"></div>');
        $('#movie_div').attr('data-property', JSON.stringify(property));

        // volが10で終わるので、次に向けて初期化
        vol = 0;
    }

    for (key in video_sche) {
        if (shakued_time === video_sche[key]) {
            // 動画尺の中での経過時間(最大値119)
            video_num = (shakued_time - video_sche[0]) * 60 + nowSec;

            movie("#movie_div", 120);

            // デフォだと動画が大きく表示されてしまうため、CSS修正
            $('#iframe_movie_div').css({'width': '100%', 'height': '100%', 'margin-top': '0px', 'margin-left': '0px'});
        }
    }

    // 動画コンテンツ初回フレーム
    if (video_sche[0] && nowSec === 0) {
        $('#top_flame_div').css('display', 'none');
        $('#weather_flame_div').css('display', 'none');
        $('#video_flame_div').css('display', 'block');
        bgm.pause();
        bgm2.pause();
    } else if (video_sche[0] && nowSec === 3) {
        // css変更処理が走るため、遅延で処理(3)
        $('#video_flame_div').css('opacity', 1);
    } else if (video_sche[1] && nowSec === 58) {
        $('#video_flame_div').css('opacity', 0);
    }
}