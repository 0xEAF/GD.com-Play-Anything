import requests
import base64
import bs4
import re

def parse_level_basic(level_response: str) -> dict:
    # remove checksum part
    level_response = level_response.split("#")[0]

    parts = level_response.split(":")
    data = {}

    for i in range(0, len(parts) - 1, 2):
        key = parts[i]
        value = parts[i + 1]
        data[key] = value

    level_name = data.get("2")
    level_string = data.get("4")

    song = None
    if "52" in data and data["52"]:
        song = [int(x) for x in data["52"].split(",")]
    elif "35" in data:
        song = int(data["35"])
    elif "12" in data:
        song = int(data["12"])

    return {
        "name": level_name,
        "level_string": level_string,
        "song": song
    }

levelId = int(input("Level ID: ").strip())
data = parse_level_basic(requests.post("https://www.boomlings.com/database/downloadGJLevel22.php", headers={
    "User-Agent": ""
}, data={
    "levelID": levelId,
    "secret": "Wmfd2893gb7",
}).text)

with open(f"{levelId}_{data['name']}.txt", "w") as f:
    f.write(data["level_string"])

with open(f"{levelId}_{data['name']}.mp3", "wb") as f:
    resp = requests.get(f"https://geometrydashfiles.b-cdn.net/music/{data['song']}.mp3")
    if resp.status_code // 100 == 2:
        f.write(resp.content)
    else:
        r = requests.get(f"https://www.newgrounds.com/audio/listen/{data['song']}")
        s = bs4.BeautifulSoup(r.text, "html.parser")
        og_audio = s.find("meta", property="og:audio")
        if og_audio:
            uri = og_audio["content"]
            resp = requests.get(uri)
            if resp.status_code // 100 == 2:
                f.write(resp.content)
        else:
            print(f"Could not find audio URL for song {data['song']}")