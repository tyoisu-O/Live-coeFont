<?php

/*
全国から天気都市をピックアップして表示
[釧路,札幌,秋田,仙台,新潟,東京,名古屋,大阪,広島,高知,福岡,那覇]
*/

// api_url
$weather_api_url = "https://www.jma.go.jp/bosai/forecast/data/forecast/010000.json";
// 都市番号
$weather_cities_num = [0,2,4,5,6,8,11,12,15,16,17,20];
// json受け取り
$_json = file_get_contents($weather_api_url);
//連想配列変換
$_weather_array = json_decode($_json, true);

// 天気コードの取得
$weather_codes = [];
foreach ($weather_cities_num as $sity_num) {
    $weather_codes[] = $_weather_array["$sity_num"]['srf']['timeSeries']['0']['areas']['weatherCodes'];
}
// 日付格納(天気コード)
$weather_days = $_weather_array['0']['srf']['timeSeries']['0']['timeDefines'];
foreach ($weather_days as $key => $info_day ) {
    $info_day = strstr($info_day,'T',true); 
    $info_day = str_replace("-", "/", $info_day);
    $weather_days[$key] = $info_day;
}

// 気温の取得
$temps = [];
foreach ($weather_cities_num as $sity_num) {
    $temps[] = $_weather_array["$sity_num"]['srf']['timeSeries']['2']['areas']['temps'];
}
// 日付格納(気温)
$temp_days = $_weather_array['0']['srf']['timeSeries']['2']['timeDefines'];
foreach ($temp_days as $key => $info_day ) {
    $info_day = strstr($info_day,'T',true); 
    $info_day = str_replace("-", "/", $info_day);
    $temp_days[$key] = $info_day;
}


// 出力する配列作成
$weather_cities_days = ['weather_days' => $weather_days, 'weather_codes' => $weather_codes, 'temp_days' => $temp_days, 'temps' => $temps];

// クロスヘッダードメイン対策
header('Access-Control-Allow-Headers: Origin, Content-Type: application/json; charset=UTF-8');

// データをjsonに変換
$json_output = json_encode($weather_cities_days, JSON_UNESCAPED_UNICODE);

// apiとして出力
print $json_output;


// ---------------------------------------------------------------------------------
/*
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

*/