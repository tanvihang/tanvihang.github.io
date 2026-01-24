# Map JS documentation

More on [mapjsdoc](../components/mapJS/MapJS.md)

---

# Add Image Into Country State

Man, I know you will use this for a long time.

Incase you've forgotten how to add image into existing country state, here is the documentation

---

## Step 1 - Adding AVIF image

Well, just add image into corresponding folder under `/assets/images/Countries/[Country]/[State]`

## Step 2 - Adding the state into data

Then, we'll need to let the app know we have this country state exist under `/datas/Countries/[Country]`

```json
{
    "hasTravelled": ["Bali", "Nusa Tenggara Barat"],
    "provinces": {
        "Bali": "/datas/Country/Indonesia/Bali.json",
        "IDNT": "",
        "IDKB": "",
        "IDPA": "",
        "IDJI": "",
        "IDMA": "",
        "Nusa Tenggara Barat": "/datas/Country/Indonesia/NusaTenggaraBarat.json",
        "IDSN": "",
        "IDJT": "",
        "IDJB": "",
        "IDJK": "",
        "IDBT": "",
        "IDYO": "",
        "IDSG": "",
        "IDPB": "",
        "IDST": "",
        "IDMU": "",
        "IDKR": "",
        "IDRI": "",
        "IDGO": "",
        "IDSA": "",
        "IDSR": "",
        "IDJA": "",
        "IDSS": "",
        "IDLA": "",
        "IDBE": "",
        "IDSB": "",
        "IDSU": "",
        "IDAC": "",
        "IDKT": "",
        "IDKS": "",
        "IDBA": "",
        "IDBB": "",
        "IDKI": ""
    }
}
```

## Step 3 - Adding the image data into the corresponding State

Then follow the link like `/datas/Country/Indonesia/NusaTenggaraBarat.json`, create the folder and use `/utils/python/imageReader.py` to automate the image into the folder