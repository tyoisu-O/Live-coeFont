import settings
import weather
import requests
import hmac
import hashlib
import datetime
from datetime import datetime, timezone
import json
import re

access_key = settings.access_key
access_secret = settings.access_secret

text = weather.read()
text = re.sub('後', 'のち', text)
print(text)

date = str(int(datetime.utcnow().replace(tzinfo=timezone.utc).timestamp()))
data = json.dumps({
    'coefont': 'b6895198-c66e-46d4-b4e6-b5234681f2ed',
    'text': text,
    'speed': 0.8,
    'pitch': 1
})
signature = hmac.new(bytes(access_secret, 'utf-8'), (date+data).encode('utf-8'), hashlib.sha256).hexdigest()
headers = {
    'Content-Type': 'application/json',
    'Authorization': access_key,
    'X-Coefont-Date': date,
    'X-Coefont-Content': signature
}

response = requests.post('https://api.coefont.cloud/v1/text2speech', data=data, headers=headers)
with open('./read_file/read.wav', 'wb') as f:
    f.write(response.content)
