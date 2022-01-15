import requests
from bs4 import BeautifulSoup

def scr():
    url = 'http://xs286880.xsrv.jp/LiveCoeFont/liveview.html'

    html = requests.get(url)
    soup = BeautifulSoup(html.content, "html.parser")

    chapter = soup.find(class_="read")
    return chapter.text

if __name__ == '__main__':
    scr()