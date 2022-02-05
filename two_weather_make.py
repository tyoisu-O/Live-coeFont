"""
本日と明日分の天気情報を生成して指定のパスに保存する
これはauto.pyを定期実行していない場合の補助プログラム
"""

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


# 音声ファイル生成
def voiceGeneration(voice_text,voice_code,file_path,output):
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

voiceGeneration(weather.read(),'b6895198-c66e-46d4-b4e6-b5234681f2ed','./read_file/weather1.wav','当日の天気')
voiceGeneration(weather_together.read(),'b6895198-c66e-46d4-b4e6-b5234681f2ed','./read_file/weather2.wav','明日の天気')