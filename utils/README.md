# Utils

## extractProvince
input: SVG map
output: map structured JSON file

```json
{
    "hasTravelled": ["Kualalumpur", "Selangor"],
    "provinces": {
        "MY12": "",
        "MY09": "",
    }
}
```

## imageReader
input: image folder path (IMPORTANT: must have existing folder and images first)

`/assets/images/Contries/China/Gansu`

output: `/datas/Contries/China/Gansu.json`

```json
{
    "image_root_path": "/assets/images/Countries/China/Gansu/",
    "images": [
        {
            "url": "平山湖1",
            "title": "平山湖1",
            "description": "",
            "location": "",
            "date": "",
            "tags": []
        },
        {
            "url": "平山湖2",
            "title": "平山湖2",
            "description": "",
            "location": "",
            "date": "",
            "tags": []
        },
        ...
    ]
}
```