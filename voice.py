import argparse
import hashlib
import hmac
import json
import os
import requests
import simpleaudio
import sys
import tempfile
from datetime import datetime, timezone
import settings

 
access_key = settings.access_key
access_secret = settings.access_secret
 
 
# CoeFont CLOUDのtext2speechを実行
def text2speech(text, speed, pitch, mode):
    if mode not in ['play', 'save']:
        print('modeは play or save を指定してください')
        sys.exit(1)
    # UNIX時間(UTC)
    date = str(int(datetime.utcnow().replace(tzinfo=timezone.utc).timestamp()))
    # リクエストボディ
    data = json.dumps({
        'coefont': '5af5520c-e976-43fe-9fa5-ed37ffd781f3',
        'text': text,
        'speed': speed,
        'pitch': pitch
    })
    # UNIX時間+リクエストボディをHMAC-SHA256でハッシュ化
    signature = hmac.new(bytes(access_secret, 'utf-8'), (date+data).encode('utf-8'), hashlib.sha256).hexdigest()
    # リクエストヘッダ
    headers = {
        'Content-Type': 'application/json',
        'Authorization': access_key,
        'X-Coefont-Date': date,
        'X-Coefont-Content': signature
    }
    # API実行
    response = requests.post('https://api.coefont.cloud/v1/text2speech', data=data, headers=headers)
    # API実行成功
    if response.status_code == 200:
        # 再生
        if mode == 'play':
            with tempfile.TemporaryDirectory() as tmp:
                save(tmp, response.content)
                wav_obj = simpleaudio.WaveObject.from_wave_file(f'{tmp}/audio.wav')
                play_obj = wav_obj.play()
                play_obj.wait_done()
        # ファイル出力
        else:
            save('./', response.content)
    # API実行失敗
    else:
        print(response.json())
        sys.exit(1)
 
 
# APIの結果(音声ファイルのバイナリ)をファイルに出力
def save(path, content):
    with open(f'{path}/audio.wav', 'wb') as f:
        f.write(content)
 
 
if __name__ == '__main__':
    # CLI的に使う為の引数を定義
    if not access_key:
        print('環境変数[coefont_access_key]にアクセスキーを設定してください。')
        sys.exit(1)
    if not access_secret:
        print('環境変数[coefont_access_secret]にシークレットを設定してください。')
        sys.exit(1)
    parser = argparse.ArgumentParser(prog='coefont.py',
                                     usage='python3 coefont.py --text 音声合成するテキスト',
                                     add_help=True)
    parser.add_argument('-t', '--text',
                        help='音声合成するテキスト',
                        type=str,
                        required=True)
    parser.add_argument('-s', '--speed',
                        help='音声の速度。1.0で通常速度。0.5で半速。2.0で2倍速',
                        type=float,
                        default=0.8,
                        required=False)
    parser.add_argument('-p', '--pitch',
                        help='音声のピッチ。±1200で1オクターブ変化',
                        type=int,
                        default=0,
                        required=False)
    parser.add_argument('-m', '--mode',
                        help='[play]=再生,[save]=ファイル出力',
                        type=str,
                        default='play',
                        required=False)
    args = parser.parse_args()
    text2speech(args.text, args.speed, args.pitch, args.mode)