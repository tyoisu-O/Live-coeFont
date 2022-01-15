<?php

$weather_url = "https://www.jma.go.jp/bosai/forecast/data/forecast/120000.json";

//json受け取り
$json = file_get_contents($weather_url);


//連想配列変換
$weather_array = json_decode($json, true);



// $weather_3days = $weather_array['0'];
$weather_3days = $weather_array['0']['timeSeries']['0']['areas']['0']['weatherCodes'];

// 日付格納
$date_info_3days = $weather_array['0']['timeSeries']['0']['timeDefines'];
foreach ($date_info_3days as $key => $info_day ) {
    $info_day = strstr($info_day,'T',true); 
    $info_day = str_replace("-", "/", $info_day);
    $date_info_3days[$key] = $info_day;
}

$output_3days = [];
foreach ($weather_3days as $key => $weather) {
    $output_3days[$date_info_3days[$key]] = $weather;
}

// クロスヘッダードメイン対策
header('Access-Control-Allow-Headers: Origin, Content-Type: application/json; charset=UTF-8');

// データをjsonに変換
$json_output = json_encode($output_3days, JSON_UNESCAPED_UNICODE);

// apiとして出力
print $json_output;