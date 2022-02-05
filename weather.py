import requests
import json
import re


weatherCode = open('weatherCode.json', 'r')
weatherCode = json.load(weatherCode)

cities_name = ['釧路', '札幌', '秋田', '仙台', '新潟', '東京', '名古屋', '大阪', '広島', '高知', '福岡', '那覇']
def read():

    url = "http://xs286880.xsrv.jp/LiveCoeFont/weather.php"

    r = requests.get(url)

    citys_code = json.loads(r.text)
    city_weather_code = []
    weather_days = []
    for codes in citys_code["weather_codes"]:
        city_weather_code.append(codes[0])
    
    for day in citys_code["weather_days"]:
        day = day[5:]
        if day[0] == str(0):
            day = day[1:]
        day = day.replace('/', '月')
        day = day + '日'
        weather_days.append(day)

    read_text = weather_days[0] + 'の天気です。'
    num = 0
    for code in city_weather_code:
        read_text = read_text + cities_name[num]
        read_text = read_text + weatherCode[str(code)][3] + '。'
        num = num + 1
    read_text = re.sub('後', 'のち', read_text)
    return(read_text)

if __name__ == '__main__':
    read()