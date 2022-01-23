$(function()  
    {
        var nowTime = new Date(); //  現在日時を得る
        var nowHour = nowTime.getHours(); // 時を抜き出す
        var nowMin  = nowTime.getMinutes(); // 分を抜き出す
        var nowSec  = nowTime.getSeconds(); // 秒を抜き出す
        var time = nowHour + "時" + nowMin + "分" + nowSec + "秒";

        $('#time').text(time);
        

        //1秒毎に更新
        setInterval("time()", 1000);

        var bgm = $("#bgm").get(0);
        var bgm2 = $("#bgm2").get(0);


        // 配信シーンの変更(59秒の時に処理開始するとフェードしない)
        if (nowMin % 3 === 0) {
            $('#top_flame_div').css('opacity', 1)
            $('#top_flame_div').css('display', 'block')
            $('#weather_flame_div').css('display', 'none')
            bgm.pause();
            bgm2.play();
            bgm2.volume = 0.1;
            bgm2.loop = true;
        } else {
            $('#weather_flame_div').css('opacity', 1)
            $('#top_flame_div').css('display', 'none')
            $('#weather_flame_div').css('display', 'block')
            bgm2.pause();
            bgm.play();
            bgm.volume = 0.1;
            bgm.loop = true;
        }
        
        
    }
); 

function time(){
    var bgm = $("#bgm").get(0);
    var bgm2 = $("#bgm2").get(0);
    var nowTime = new Date(); //  現在日時を得る
    var nowHour = nowTime.getHours(); // 時を抜き出す
    var nowMin  = nowTime.getMinutes(); // 分を抜き出す
    var nowSec  = nowTime.getSeconds(); // 秒を抜き出す
    var time = "現在時刻　：　" + nowHour + "時" + nowMin + "分" + nowSec + "秒";

    // $('#time').text(time);

    // 配信シーンの変更
    if (nowMin % 3 === 0) {
        if (nowSec === 0) {
            $('#top_flame_div').css('display', 'block')
            $('#weather_flame_div').css('display', 'none')
            bgm.pause();
            bgm2.play();
            bgm2.volume = 0
            bgm2.loop = true;
        }
        if (nowSec === 1) {
            $('#top_flame_div').css('opacity', 1)
        }
        if (nowSec === 58) {
            $('#top_flame_div').css('opacity', 0)
        }
        
    } else {
        if (nowSec === 0 && nowMin % 3 === 1) {
            $('#top_flame_div').css('display', 'none')
            $('#weather_flame_div').css('display', 'block')
            bgm2.pause();
            bgm.play();
            bgm.volume = 0
            bgm.loop = true;
        }
        if (nowSec === 1 && nowMin % 3 === 1) {
            $('#weather_flame_div').css('opacity', 1)
        }
        if (nowSec === 58 && nowMin % 3 === 2) {
            $('#weather_flame_div').css('opacity', 0)
        }
    }

    // bgmフェード
    if (nowSec <= 5 && nowMin % 3 === 0) {
        bgm2.volume += 0.02;
    }
    if (nowSec >= 55 && nowMin % 3 === 0) {
        bgm2.volume -= 0.02;
    }

    if (nowSec <= 10 && nowMin % 3 === 1) {
        bgm.volume += 0.01;
    }
    if (nowSec >= 50 && nowMin % 3 === 2) {
        bgm.volume -= 0.01;
    }

}