import os
import re
import json

def GetRoot():
    cur_dir = os.path.dirname(os.path.abspath(__file__))

    parts = cur_dir.split(os.sep)
    # Find the index of 'LensVoyager'
    index = parts.index('tanvihang.github.io')

    # Join the parts up to and including 'LensVoyager'
    root_directory = os.sep.join(parts[:index + 1])
    
    return root_directory;

def ExtractId(data):
    list_id = []
    
    pattern = r'id="([^"]+)"'
    
    match = re.findall(pattern, data)
    
    return match
    
def RemovePrefix(data ,prefix):
    filtered_item = [province for province in data if province.startswith(prefix)]
    return filtered_item

def CreateFile(data, output):
    # title, description, location, date, url, tags[]
    
    jsonData = {}
    jsonData["hasTravelled"] = []
    jsonData["provinces"] = {}
    
    for province in data:
        jsonData["provinces"][province] = ""
        
        
    with open(output, "w", encoding="utf-8") as f:
        json.dump(jsonData, f, indent=4)    
    

# Things to change for every new Map
countryCode = "Japan"
prefix = "JP"
root_directory = GetRoot()

svg_file_name = f'{root_directory}/components/mapJS/svg/countries/{countryCode}.svg'
output_dir = f'{root_directory}/datas/countries/{countryCode}.json'
province = []

# Extract ids from svg_file

with open(svg_file_name, 'r', encoding='utf-8') as f:
    data = f.read()
    
    # extract
    province = ExtractId(data)
    province = RemovePrefix(province, prefix)
    # print(province)
    
CreateFile(province, output_dir)