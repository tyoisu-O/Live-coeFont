"""
python自動プログラム
配信中にこのプログラムを実行する
1秒毎にtimeAciton()を実行し、現在日時で処理を行う
"""

import schedule
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
length_minute = 4

# 音声ファイル読み上げ
def voiceAtion(minu,sec,voice_url):
    now = datetime.datetime.now( )
    if now.minute % length_minute == minu and now.second == sec:
        wav_obj = simpleaudio.WaveObject.from_wave_file(voice_url)
        play_obj = wav_obj.play()
        play_obj.wait_done()

# 音声ファイル生成
def voiceGeneration(hou,minu,sec,voice_text,voice_code,file_path,output):
    now = datetime.datetime.now( )
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
    # 特定の周期で音声ファイルを読み上げる
    voiceAtion(1,10,"read_file/weather1.wav")
    voiceAtion(2,33,"read_file/weather2.wav")
    voiceAtion(3,48,"read_file/weather_end.wav")

    # 特定のタイミングで音声を生成して保存
    voiceGeneration(5,0,0,weather.read(),'b6895198-c66e-46d4-b4e6-b5234681f2ed','./read_file/weather1.wav','当日の天気')
    voiceGeneration(11,0,0,weather.read(),'b6895198-c66e-46d4-b4e6-b5234681f2ed','./read_file/weather1.wav','当日の天気')
    voiceGeneration(17,0,0,weather.read(),'b6895198-c66e-46d4-b4e6-b5234681f2ed','./read_file/weather1.wav','当日の天気')
    voiceGeneration(5,0,0,weather_together.read(),'b6895198-c66e-46d4-b4e6-b5234681f2ed','./read_file/weather2.wav','明日の天気')
    voiceGeneration(11,0,0,weather_together.read(),'b6895198-c66e-46d4-b4e6-b5234681f2ed','./read_file/weather2.wav','明日の天気')
    voiceGeneration(17,0,0,weather_together.read(),'b6895198-c66e-46d4-b4e6-b5234681f2ed','./read_file/weather2.wav','明日の天気')


#1/60分=1秒毎にtimeAcitonを実行
schedule.every(1/60).minutes.do(timeAciton)
 
while True:
  schedule.run_pending()
  time.sleep(1)