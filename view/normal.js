$(function()  
    {
        var nowTime = new Date(); //  現在日時を得る
        var nowHour = nowTime.getHours(); // 時を抜き出す
        var nowMin  = nowTime.getMinutes(); // 分を抜き出す
        var nowSec  = nowTime.getSeconds(); // 秒を抜き出す
        var bgm = $("#bgm").get(0);
        var bgm2 = $("#bgm2").get(0);

        // 配信シーンの変更(59秒の時に処理開始するとフェードしない)
        if (nowMin % 6 === 0) {
            $('#top_flame_div').css('opacity', 1);
            $('#top_flame_div').css('display', 'block');
            $('#weather_flame_div').css('display', 'none');
            $('#video_flame_div').css('display', 'none');
            bgm.pause();
            bgm2.play();
            bgm2.volume = 0.1;
            bgm2.loop = true;
        } else if (nowMin % 6 === 3) {
            $('#top_flame_div').css('opacity', 1);
            $('#top_flame_div').css('display', 'block');
            $('#weather_flame_div').css('display', 'none');
            $('#video_flame_div').css('display', 'none');
            bgm.pause();
            bgm2.play();
            bgm2.volume = 0.1;
            bgm2.loop = true;
        } else if (nowMin % 6 === 1 || nowMin % 6 === 2) {
            $('#weather_flame_div').css('opacity', 1);
            $('#top_flame_div').css('display', 'none');
            $('#weather_flame_div').css('display', 'block');
            $('#video_flame_div').css('display', 'none');
            bgm2.pause();
            bgm.play();
            bgm.volume = 0.1;
            bgm.loop = true;
        } else if (nowMin % 6 === 4 || nowMin % 6 === 5) {
            $('#video_flame_div').css('opacity', 1);
            $('#top_flame_div').css('display', 'none');
            $('#weather_flame_div').css('display', 'none');
            $('#video_flame_div').css('display', 'block');
            bgm.pause();
            bgm2.pause();
        }
        // 1秒毎に更新
        setInterval("time()", 1000);
    }
); 

function time(){
    var nowTime = new Date(); //  現在日時を得る
    var nowHour = nowTime.getHours(); // 時を抜き出す
    var nowMin  = nowTime.getMinutes(); // 分を抜き出す
    var nowSec  = nowTime.getSeconds(); // 秒を抜き出す
    var bgm = $("#bgm").get(0);
    var bgm2 = $("#bgm2").get(0);

    // 配信シーンの変更-改
    if (nowMin % 6 === 0) {
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
    } else if (nowMin % 6 === 3) {
        if (nowSec === 0) {
            $('#top_flame_div').css('display', 'block');
            $('#weather_flame_div').css('display', 'none');
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
    } else if (nowMin % 6 === 1 && nowSec === 0) {
        $('#top_flame_div').css('display', 'none');
        $('#weather_flame_div').css('display', 'block');
        bgm2.pause();
        bgm.play();
        bgm.volume = 0;
        bgm.loop = true;
    } else if (nowMin % 6 === 1 && nowSec === 1) {
        $('#weather_flame_div').css('opacity', 1);
    } else if (nowMin % 6 === 2 && nowSec === 58) {
        $('#weather_flame_div').css('opacity', 0);
    } else if (nowMin % 6 === 4 && nowSec === 0) {
        $('#top_flame_div').css('display', 'none');
        $('#video_flame_div').css('display', 'block');
        bgm.pause();
        bgm2.pause();
    } else if (nowMin % 6 === 4 && nowSec === 3) { // css変更処理が走るため、遅延で処理(3)
        $('#video_flame_div').css('opacity', 1);
    } else if (nowMin % 6 === 5 && nowSec === 58) {
        $('#video_flame_div').css('opacity', 0);
    }

    // bgmフェード
    if (nowSec <= 5 && nowMin % 6 === 0) {
        bgm2.volume += 0.02;
        console.log("音量+");
    }
    if (nowSec >= 55 && nowMin % 6 === 0) {
        bgm2.volume -= 0.02;
        console.log("音量-");
    }

    if (nowSec <= 5 && nowMin % 6 === 3) {
        bgm2.volume += 0.02;
        console.log("音量+");
    }
    if (nowSec >= 55 && nowMin % 6 === 3) {
        bgm2.volume -= 0.02;
        console.log("音量-");
    }

    if (nowSec <= 10 && nowMin % 6 === 1) {
        bgm.volume += 0.01;
        console.log("音量+");
    }
    if (nowSec >= 50 && nowMin % 6 === 2) {
        bgm.volume -= 0.01;
        console.log("音量-");
    }


    // デバック用
    logMin = nowMin % 6;
    logSec = nowSec;
    console_text =  logMin + ':' + logSec;
    console.log(console_text);

}