import os
import re
import json

def GetRoot():
    cur_dir = os.path.dirname(os.path.abspath(__file__))

    parts = cur_dir.split(os.sep)
    print(parts)
    # Find the index of 'LensVoyager'
    index = parts.index('tanvihang.github.io')

    # Join the parts up to and including 'LensVoyager'
    root_directory = os.sep.join(parts[:index + 1])
    
    return root_directory;

def ReadFolderImages(folder):
    files = os.listdir(folder)
    
    image_set = set()
    
    for file_name in files:
        image_set.add(file_name)
        
    return image_set

def create_image_dict(url):
    return {
        "url": f'{url}',
        "title": "SET-TITLE",
        "description": "",
        "location": "",
        "date": "",
        "tags": []
    }

def CompareJsonAndWrite(file, imageFolder, newSet):
    print(file)
    
    try:
        # Read the existing JSON file
        with open(file, 'r+', encoding='utf-8') as f:
            try:
                data = json.load(f)
            except json.JSONDecodeError:
                # If JSON is empty or invalid, initialize with empty data
                data = {"image_root_path": f'{imageFolder}/', "images": []}
    except FileNotFoundError:
        # If the file does not exist, create it with initial data
        data = {"image_root_path": f'{imageFolder}/', "images": []}
    
    # Filter out images not in the new set and collect existing URLs
    existing_URLS = set()
    filtered_images = []
    
    for image in data['images']:
        if image['url'] in newSet:
            filtered_images.append(image)
            existing_URLS.add(image['url'])
    
    # Check and append new images if they do not exist
    for url in newSet:
        if url not in existing_URLS:
            url = url.split('.')
            new_image = create_image_dict(url[0])
            filtered_images.append(new_image)
            print(f"New image added: {url[0]}")
            
    # Sort the images by URL 
    filtered_images.sort(key=lambda x: x['url'])        
    
    data['images'] = filtered_images
    
    # Write the updated data back to the JSON file
    with open(file, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)
    
    print(f"JSON data has been updated and written to {file}")

# 1. Get root dir
root_dir = GetRoot()

# 2. Set the image folder
# countries - /assets/images/Countries/Malaysia/Pahang
image_folder_path_url = "/assets/images/Countries/Japan/Hokkaido"
image_folder_path = f'{root_dir}{image_folder_path_url}'

# 3. Set the json file (Need to alter this to be more dynamic)
# countries - {root_dir}/datas/Countries/Malaysia/Pahang.json
image_json_file = f'{root_dir}/datas/Countries/Japan/Hokkaido.json'

# 4. Get images set
image_set = ReadFolderImages(image_folder_path)

# 5. Compare with the current json
CompareJsonAndWrite(image_json_file,image_folder_path_url ,image_set)
