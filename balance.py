


def start():
    # Bitcoin price retrieval and conversions
    import requests
    import pandas as pd
    import numpy as np
    import os
    import threading
    from pathlib import Path
    import time
    from firebase import firebase

    API_URL = "https://api.coindesk.com/v1/bpi/currentprice.json"

    while True: 
        req = requests.get(API_URL).json()
        raw_rate = req['bpi']['USD']['rate']
        formatted_rate = float(raw_rate.replace(",", ""))
        print(formatted_rate) 
        firebase1 = firebase.FirebaseApplication("https://masalacomedyclub-2d11a.firebaseio.com/", None)
        data = {
        'LatestPrice': formatted_rate,
        }

        result = firebase1.put("testdata", "-M5nTRnfilABgz58KKFR", data)
        time.sleep(10)


start()
