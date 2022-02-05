function movie(id, movie_time) {
    if (video_num === 0 || first) {
        $(id).YTPlayer(); // 動画の呼び出し部分に指定したID
        $(id).YTPUnmute();
        console.log('動画スタート');
    }
    if (view_count === 3) { // 初回に動画音声がonにならないため特殊処理
        $(id).YTPUnmute();
        vol = 100;
        $(id).YTPSetVolume(vol);
        console.log('動画初期音声' + vol);
    }
    if (video_num > 2 && video_num <= 7) {
        vol += 20;
        $(id).YTPSetVolume(vol);
        console.log('音量' + vol);
    }
    if (video_num > movie_time - 10 && video_num <= movie_time - 1) { // 敢えて9回処理
        vol -= 10;
        $(id).YTPSetVolume(vol);
        console.log('音量' + vol);
    }    
}

var view_count = 0;
vol = 0;
first = false;
movie_num = 0;
// 動画コンテンツの要素定義
movie_id = ['UTnE0qQ41eE', 'viNt9VTIXu0', 'ad_OTL0ZgCw'];

$(function() {   
    var nowTime = new Date(); //  現在日時を得る
    var nowHour = nowTime.getHours(); // 時を抜き出す
    var nowMin  = nowTime.getMinutes(); // 分を抜き出す
    var nowSec  = nowTime.getSeconds(); // 秒を抜き出す 
    var property = {
        videoURL: movie_id[movie_num],
        containment: '#video_flame_div',
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
    if (nowMin % 6 == 4 || nowMin % 6 == 5) {
        video_num = (nowMin % 6 - 4) * 60 + nowSec;
        movie("#movie_div", 120);
    }
    first = false;

    // 1秒毎に更新
    setInterval("time3()", 1000);
});


function time3() {
    var nowTime = new Date(); //  現在日時を得る
    var nowHour = nowTime.getHours(); // 時を抜き出す
    var nowMin  = nowTime.getMinutes(); // 分を抜き出す
    var nowSec  = nowTime.getSeconds(); // 秒を抜き出す
    view_count += 1;

    if (nowMin % 6 == 0 && nowSec == 1) {
        movie_num += 1;
        if (movie_num >= movie_id.length) {
            movie_num = 0;
        }
    }

    var property = {
        videoURL: movie_id[movie_num],
        containment: '#video_flame_div',
        loop: false,
        vol: 0,
        mute: true,
        opacity: 1,
        stopMovieOnBlur: false,
        autoPlay: true,
        showControls: false,
        showYTLogo: false,
    }

    if (nowMin % 6 == 0 && nowSec == 1) {
        console.log('動画初期化');
        $('#video_flame_div').empty();
        // 動画のDOMを一度削除して、再度生成
        $('#video_flame_div').html('<div id="movie_div"></div>');
        $('#movie_div').attr('data-property', JSON.stringify(property));

        // volが10で終わるので、次に向けて初期化
        vol = 0;
    }

    if (nowMin % 6 == 4 || nowMin % 6 == 5) {
        // 動画尺の中での経過時間(最大値119)
        video_num = (nowMin % 6 - 4) * 60 + nowSec;

        movie("#movie_div", 120);

        // デフォだと動画が大きく表示されてしまうため、CSS修正
        $('#iframe_movie_div').css({'width': '100%', 'height': '100%', 'margin-top': '0px', 'margin-left': '0px'});
    } else {
        video_num = 0;
    }
}