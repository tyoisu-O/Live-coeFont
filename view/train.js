var count = 0;

window.onload = function()  
{
    $.getJSON("http://xs286880.xsrv.jp/LiveCoeFont/train.php", function(data){
    // 鉄道情報の処理
    var num = 1;
    var for_count = 1;
        Object.keys(data).forEach(function (key) {

            if (count % 2 == 0) {
                if (for_count <= 4) {
                    //画像判別
                    if (data[key] == "平常運転") {
                        var train_info_img ="http://xs286880.xsrv.jp/LiveCoeFont/img/maru.png";
                    }else if (data[key].indexOf("遅延") == 0) {
                        var train_info_img ="http://xs286880.xsrv.jp/LiveCoeFont/img/sankaku.png";
                    }else{
                        var train_info_img ="http://xs286880.xsrv.jp/LiveCoeFont/img/batu.png";
                    }
                    // 鉄道名
                    var p_id = '#train' + String(num);
                    $(p_id).text(key);

                    // 状況
                    var img_id = '#train_' + String(num);
                    
                    if (for_count == 1){
                        // 流鉄流山線削除
                        $('#train5').text('');
                        $('#train_5').attr('src', '');

                        //h3更新
                        $('#train').text('JR');
                    }
                    num++;
                }
                for_count++;
            } else {
                if (for_count >= 5) {
                    //画像判別
                    if (data[key] == "平常運転") {
                        var train_info_img ="http://xs286880.xsrv.jp/LiveCoeFont/img/maru.png";
                    }else if (data[key].indexOf("遅延") == 0) {
                        var train_info_img ="http://xs286880.xsrv.jp/LiveCoeFont/img/sankaku.png";
                    }else{
                        var train_info_img ="http://xs286880.xsrv.jp/LiveCoeFont/img/batu.png";
                    }

                    // 鉄道名
                    var p_id = '#train' + String(num);
                    $(p_id).text(key);

                    // 状況
                    var img_id = '#train_' + String(num);
                    $(img_id).attr('src', train_info_img);

                    if (for_count == 5){
                        //h3更新
                        $('#train').text('私鉄');
                    }
                    num++;
                }
                for_count++;
            }
        });
    });
    count++;

    //10秒毎に更新
    setInterval("train_info()", 10000);


    // 交通情報更新日時
    var nowTimed = new Date(); //  現在日時を得る
    var nowHourd = nowTimed.getHours(); // 時を抜き出す
    var nowMind  = nowTimed.getMinutes(); // 分を抜き出す
    
    $('#train_title').text("交通状況　|　" + nowHourd + "時" + nowMind + "分　更新");

}  

function train_info(){
    $.getJSON("http://xs286880.xsrv.jp/LiveCoeFont/train.php", function(data){
    // 鉄道情報の処理
    var num = 1;
    var for_count = 1;
        Object.keys(data).forEach(function (key) {
            if (count % 2 == 0) {
                if (for_count <= 4) {
                    //画像判別
                    if (data[key] == "平常運転") {
                        var train_info_img ="http://xs286880.xsrv.jp/LiveCoeFont/img/maru.png";
                    }else if (data[key].indexOf("遅延") == 0) {
                        var train_info_img ="http://xs286880.xsrv.jp/LiveCoeFont/img/sankaku.png";
                    }else{
                        var train_info_img ="http://xs286880.xsrv.jp/LiveCoeFont/img/batu.png";
                    }

                    // 鉄道名
                    var p_id = '#train' + String(num);
                    $(p_id).text(key);

                    // 状況
                    var img_id = '#train_' + String(num);
                    $(img_id).attr('src', train_info_img);

                    if (for_count == 1){
                        // 流鉄流山線削除
                        $('#train5').text('');
                        $('#train_5').attr('src', '');

                        //h3更新
                        $('#train').text('JR');
                    }
                    num++;
                }
                for_count++;
            } else {
                if (for_count >= 5) {
                    //画像判別
                    if (data[key] == "平常運転") {
                        var train_info_img ="http://xs286880.xsrv.jp/LiveCoeFont/img/maru.png";
                    }else if (data[key].indexOf("遅延") == 0) {
                        var train_info_img ="http://xs286880.xsrv.jp/LiveCoeFont/img/sankaku.png";
                    }else{
                        var train_info_img ="http://xs286880.xsrv.jp/LiveCoeFont/img/batu.png";
                    }

                    // 鉄道名
                    var p_id = '#train' + String(num);
                    $(p_id).text(key);

                    // 状況
                    var img_id = '#train_' + String(num);
                    $(img_id).attr('src', train_info_img);

                    if (for_count == 5){
                        //h3更新
                        $('#train').text('私鉄');
                    }
                    num++;
                }
                for_count++;
            }
        });
    });
    count++;
}