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
    }
); 

function time(){
    console.log("normal");
    var nowTime = new Date(); //  現在日時を得る
    var nowHour = nowTime.getHours(); // 時を抜き出す
    var nowMin  = nowTime.getMinutes(); // 分を抜き出す
    var nowSec  = nowTime.getSeconds(); // 秒を抜き出す
    var time = "現在時刻　：　" + nowHour + "時" + nowMin + "分" + nowSec + "秒";

    $('#time').text(time);
}