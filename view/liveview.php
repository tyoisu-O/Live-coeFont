<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script> -->
    <script src="http://xs286880.xsrv.jp/LiveCoeFont/normal.js"></script>
    <script src="http://xs286880.xsrv.jp/LiveCoeFont/weather.js"></script>
    <script src="http://xs286880.xsrv.jp/LiveCoeFont/train.js"></script>
    <title>情報VIEW</title>
</head>
<body style="margin:0;padding:0;">
    <audio id="bgm" src="http://xs286880.xsrv.jp/LiveCoeFont/sound/%E5%BF%83%E3%81%AE%E4%B8%AD%E3%81%AE%E5%B0%8F%E3%81%95%E3%81%AA%E5%AE%87%E5%AE%99.mp3"></audio> 
    <div style="width: 100%; background: #05b974; margin-top: 0;"> 
        <h1 style="color: #FFFFFF; margin:0; padding:20px; padding-bottom: 0;">情報VIEW</h1>
        <p style="margin-top: 0; font-weight: bold; font-size: 16px; padding-right: 10px; color: #FFFFFF; text-align: right;" id="time"></p>
    </div>
    <div style="width: 100%; background: #80ccff;">
        <h2 id ="weather" style="color: #FFFFFF; padding:10px; margin-bottom: 0;">天気</h2>
    </div>
    <div style="width: 100%; background: #dcf1ff;">
        <div id ="weather" style="display: flex; padding-top: 30px;">
            <div style="margin-left: 10px;">
                <p id="city1" style="font-size: 20px; margin: 0;">釧路</p>
                <img id="weather1" src="" style="width: 100%;">
                <p id="temp1" style="font-size: 18px; margin: 0;"></p>
            </div>
            <div style="margin-left: 10px;">
                <p id="city2" style="font-size: 20px; margin: 0;">札幌</p>
                <img id="weather2" src="" style="width: 100%;">
                <p id="temp2" style="font-size: 18px; margin: 0;"></p>
            </div>
            <div style="margin-left: 10px;">
                <p id="city3" style="font-size: 20px; margin: 0;">秋田</p>
                <img id="weather3" src="" style="width: 100%;">
                <p id="temp3" style="font-size: 18px; margin: 0;"></p>
            </div>
            <div style="margin-left: 10px;">
                <p id="city4" style="font-size: 20px; margin: 0;">仙台</p>
                <img id="weather4" src="" style="width: 100%;">
                <p id="temp4" style="font-size: 18px; margin: 0;"></p>
            </div>
            <div style="margin-left: 10px;">
                <p id="city5" style="font-size: 20px; margin: 0;">新潟</p>
                <img id="weather5" src="" style="width: 100%;">
                <p id="temp5" style="font-size: 18px; margin: 0;"></p>
            </div>
            <div style="margin-left: 10px;">
                <p id="city6" style="font-size: 20px; margin: 0;">東京</p>
                <img id="weather6" src="" style="width: 100%;">
                <p id="temp6" style="font-size: 18px; margin: 0;"></p>
            </div>
            <div style="margin-left: 10px;">
                <p id="city7" style="font-size: 20px; margin: 0;">名古屋</p>
                <img id="weather7" src="" style="width: 100%;">
                <p id="temp7" style="font-size: 18px; margin: 0;"></p>
            </div>
            <div style="margin-left: 10px;">
                <p id="city8" style="font-size: 20px; margin: 0;">大阪</p>
                <img id="weather8" src="" style="width: 100%;">
                <p id="temp8" style="font-size: 18px; margin: 0;"></p>
            </div>
            <div style="margin-left: 10px;">
                <p id="city9" style="font-size: 20px; margin: 0;">広島</p>
                <img id="weather9" src="" style="width: 100%;">
                <p id="temp9" style="font-size: 18px; margin: 0;"></p>
            </div>
            <div style="margin-left: 10px;">
                <p id="city10" style="font-size: 20px; margin: 0;">高知</p>
                <img id="weather10" src="" style="width: 100%;">
                <p id="temp10" style="font-size: 18px; margin: 0;"></p>
            </div>
            <div style="margin-left: 10px;">
                <p id="city11" style="font-size: 20px; margin: 0;">福岡</p>
                <img id="weather11" src="" style="width: 100%;">
                <p id="temp11" style="font-size: 18px; margin: 0;"></p>
            </div>
            <div style="margin-left: 10px; margin-right: 10px;">
                <p id="city12" style="font-size: 20px; margin: 0;">那覇</p>
                <img id="weather12" src="" style="width: 100%;">
                <p id="temp12" style="font-size: 18px; margin: 0;"></p>
            </div>
        </div>
    </div>
    <div style="width: 100%; background: #39c203;">
        <h2 id="train_title" style="color: #FFFFFF; padding:10px; margin-bottom: 0;">交通情報</h2>
    </div>
    <div style="width: 100%; background: #c5ffa4;">
        <h3 id="train" style="margin-left: 10px; margin-bottom: 0; margin-top: 0;"></h3>
        <div id ="weather" style="display: flex; padding-top: 20px;">
            <div style="margin-left: 10px;">
                <p id="train1" style="margin-top: 0;font-size: 20px;margin: 0;"></p>
                <img id="train_1" src="" style="width: 200px;">
            </div>
            <div style="margin-left: 10px;">
                <p id="train2" style="margin-top: 0;font-size: 20px;margin: 0;"></p>
                <img id="train_2" src="" style="width: 200px;">
            </div>
            <div style="margin-left: 10px;">
                <p id="train3" style="margin-top: 0;font-size: 20px;margin: 0;"></p>
                <img id="train_3" src="" style="width: 200px;">
            </div>
            <div style="margin-left: 10px;">
                <p id="train4" style="margin-top: 0;font-size: 20px;margin: 0;"></p>
                <img id="train_4" src="" style="width: 200px;">
            </div>
            <div style="margin-left: 10px;">
                <p id="train5" style="margin-top: 0;font-size: 20px;margin: 0;"></p>
                <img id="train_5" src="" style="width: 200px;">
            </div>
        </div>
    </div>
    <div id="read" class="read" style="display: block;"></div>
</body>
</html>