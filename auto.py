"""
python自動プログラム
配信中にこのプログラムを実行する
1秒毎にtimeAciton()を実行し、現在日時で処理を行う
"""

import time
import datetime
import simpleaudio

import settings
import weather
import weather_together
import requests
import hmac
import hashlib
from datetime import datetime as dt
from datetime import timezone as tz
import json

# 現在日時の取得
now = datetime.datetime.now( )

# コンテンツ一周の尺
length_minute = 6

# 音声ファイル読み上げ
def voiceAtion(minu,sec,voice_url):
    # now = datetime.datetime.now( )
    if now.minute % length_minute == minu and now.second == sec:
        wav_obj = simpleaudio.WaveObject.from_wave_file(voice_url)
        play_obj = wav_obj.play()
        play_obj.wait_done()

# 音声ファイル生成
def voiceGeneration(hou,minu,sec,voice_text,voice_code,file_path,output):
    # now = datetime.datetime.now( )
    if now.hour == hou and now.minute == minu and now.second == sec:
        access_key = settings.access_key
        access_secret = settings.access_secret

        date = str(int(dt.utcnow().replace(tzinfo=tz.utc).timestamp()))
        data = json.dumps({
            'coefont': voice_code,
            'text': voice_text,
            'speed': 0.8,
            'pitch': 0
        })
        signature = hmac.new(bytes(access_secret, 'utf-8'), (date+data).encode('utf-8'), hashlib.sha256).hexdigest()
        headers = {
            'Content-Type': 'application/json',
            'Authorization': access_key,
            'X-Coefont-Date': date,
            'X-Coefont-Content': signature
        }
        response = requests.post('https://api.coefont.cloud/v1/text2speech', data=data, headers=headers)
        with open(file_path, 'wb') as f:
            f.write(response.content)
        print(output)

 
def timeAciton():
    # now = datetime.datetime.now( )
    # 特定の周期で音声ファイルを読み上げる
    voiceAtion(1,10,"read_file/weather1.wav")
    voiceAtion(2,3,"read_file/weather2.wav")
    voiceAtion(2,52,"read_file/weather_end.wav")

    # 特定のタイミングで音声を生成して保存
    voiceGeneration(5,0,0,weather.read(),'b6895198-c66e-46d4-b4e6-b5234681f2ed','./read_file/weather1.wav','当日の天気')
    voiceGeneration(11,0,0,weather.read(),'b6895198-c66e-46d4-b4e6-b5234681f2ed','./read_file/weather1.wav','当日の天気')
    voiceGeneration(17,0,0,weather.read(),'b6895198-c66e-46d4-b4e6-b5234681f2ed','./read_file/weather1.wav','当日の天気')
    # 二日分の生成は同時タイミングではできないため、30秒遅らせる
    voiceGeneration(5,0,30,weather_together.read(),'b6895198-c66e-46d4-b4e6-b5234681f2ed','./read_file/weather2.wav','明日の天気')
    voiceGeneration(11,0,30,weather_together.read(),'b6895198-c66e-46d4-b4e6-b5234681f2ed','./read_file/weather2.wav','明日の天気')
    voiceGeneration(17,0,30,weather_together.read(),'b6895198-c66e-46d4-b4e6-b5234681f2ed','./read_file/weather2.wav','明日の天気')

    # デバッグ用
    print(now.second)


ini_time=time.time()
# 正確な1秒間隔のために行うべき処理を追加
while True:
    now = datetime.datetime.now( )
    elapsed_time = time.time() - ini_time #プログラム開始からの経過時間
    elapsed_time_float = elapsed_time - int(elapsed_time) #経過時間の小数点部分の取り出し
    timeAciton()
    time.sleep(1 - elapsed_time_float)