<?php

$output_data = [];

require_once('phpQuery-onefile.php');


// 常磐線快速電車
$jr_url["常磐線快速電車"] = "https://traininfo.jreast.co.jp/train_info/line.aspx?gid=1&lineid=jobanline_rapidservice";
// 常磐線各駅停車
$jr_url["常磐線各駅停車"] = "https://traininfo.jreast.co.jp/train_info/line.aspx?gid=1&lineid=jobanline_local";
// 上野東京ライン
$jr_url["上野東京ライン"] = "https://traininfo.jreast.co.jp/train_info/line.aspx?gid=1&lineid=ueno-tokyoline";
// 武蔵野線
$jr_url["武蔵野線"] = "https://traininfo.jreast.co.jp/train_info/line.aspx?gid=1&lineid=musashinoline";

//html受け取り
foreach ($jr_url as $key => $url) {
    $html = file_get_contents($url);

    //DOM分析
    $doc = phpQuery::newDocument($html);
    
    $output_data[$key] = $doc['.pb150']->find('.font23')->text();
    //echo $key . ":" . $doc['.pb150']->find('.font23')->text();
    //echo "<br>";
    usleep(rand(100, 300));
}


// 新京成線
$shitetu_url["新京成線"] = "https://transit.yahoo.co.jp/traininfo/detail/127/0/";
// 東武アーバンパーク
$shitetu_url["東武アーバンパーク"] = "https://transit.yahoo.co.jp/traininfo/detail/81/0/";
// つくばエクスプレス
$shitetu_url["つくばエクスプレス"] = "https://transit.yahoo.co.jp/traininfo/detail/412/0/";
// 北総線
$shitetu_url["北総線"] = "https://transit.yahoo.co.jp/traininfo/detail/141/0/";
// 流鉄流山線
$shitetu_url["流鉄流山線"] = "https://transit.yahoo.co.jp/traininfo/detail/145/0/";

//html受け取り
foreach ($shitetu_url as $key => $url) {
    $html = file_get_contents($url);

    //DOM分析
    $doc = phpQuery::newDocument($html);
    
    $output_data[$key] = substr(strstr($doc['#mdServiceStatus']->find('dt')->text(), ']'), 1);
    //echo $key . ":" . $doc['#mdServiceStatus']->find('dt')->text();
    //echo "<br>";
    usleep(rand(100, 300));
}



// クロスヘッダードメイン対策
header('Access-Control-Allow-Headers: Origin, Content-Type: application/json; charset=UTF-8');

// データをjsonに変換
$json_output = json_encode($output_data, JSON_UNESCAPED_UNICODE);

// apiとして出力
print $json_output;