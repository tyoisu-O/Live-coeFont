// 配信コンテンツの設定(変化しない変数のみ)

// 一周の尺(分)
const content_shaku = 6;

// 配信スケジュール(分 : 実行)
const live_schedule = {
    0 : 'title',
    1 : 'weather',
    2 : 'weather',
    3 : 'title',
    4 : 'video',
    5 : 'video'
};

// 現在時刻の処理(初回用)
var nowTime = new Date();
// var nowHour = nowTime.getHours();
var nowMin  = nowTime.getMinutes();
var nowSec  = nowTime.getSeconds();
// 周期分割(現在時刻から尺で割った余り)
shakued_time = nowMin % content_shaku;

// bgm取得
bgm = $("#bgm").get(0);
bgm2 = $("#bgm2").get(0);

// 動画時間用変数
view_count = 0;

// 時間処理(1秒単位)
$(function() { 
    setInterval("time_second()", 1000);
});

// 時間処理(1秒単位)
function time_second() {
    // 現在日時の取得
    var nowTime = new Date();
    // var nowHour = nowTime.getHours();
    var nowMin  = nowTime.getMinutes();
    nowSec  = nowTime.getSeconds();

    // 周期分割(現在時刻から尺で割った余り)
    shakued_time = nowMin % content_shaku;

    // 各ページ判定
    if (live_schedule[shakued_time] === 'title') { // titleページ実行
        title();
        console.log('title');
    } else if (live_schedule[shakued_time] === 'weather') { // weatherページ実行
        weather();
        console.log('weather');
    } else if (live_schedule[shakued_time] === 'video') { // videoページ実行
        video();
        console.log('video');
    }

    // 動画時間用変数
    view_count += 1;

    // デバック用
    logMin = nowMin % content_shaku;
    logSec = nowSec;
    console_text =  logMin + ':' + logSec;
    console.log(console_text);
}

// jsの更新(1時間)
const timer = 3600000    // ミリ秒で間隔の時間を指定
window.addEventListener('load',function(){
  setInterval('location.reload()',timer);
});