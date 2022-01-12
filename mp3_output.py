"""
音声ファイルを生成するプログラム

ファイル形式が.wavになるため、mp3に変換するプログラムを実装する予定

"""

import hmac
import requests
import hashlib
import json
from datetime import datetime, timezone
import settings

access_key = settings.access_key
access_secret = settings.access_secret

text = 'テスト'
date: str = str(int(datetime.utcnow().replace(tzinfo=timezone.utc).timestamp()))
data: str = json.dumps({
'coefont': '5af5520c-e976-43fe-9fa5-ed37ffd781f3',
'text': text, 'speed': 0.8, 'format': "mp3"
})
signature = hmac.new(bytes(access_secret, 'utf-8'), (date+data).encode('utf-8'), hashlib.sha256).hexdigest()

response = requests.post('https://api.coefont.cloud/v1/text2speech', data=data, headers={
'Content-Type': 'application/json',
'Authorization': access_key,
'X-Coefont-Date': date,
'X-Coefont-Content': signature
})

if response.status_code == 200:
    with open('response.mp3', 'wb') as f:
        f.write(response.content)
else:
    print(response.json())