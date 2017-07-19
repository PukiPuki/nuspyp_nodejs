from pymongo import MongoClient
import pymongo
import gridfs
db = MongoClient().ReactWebpackNode
fs = gridfs.GridFS(db)

import json
json_list = []

import os
root_dir = "./modules"
modules = os.listdir(root_dir)
for mod in modules:
    mod = mod
    mod_dir = root_dir + "/" + mod
    years = os.listdir(mod_dir)
    for year in years:
        year = year
        year_dir = mod_dir + "/" + year
        if not os.path.isdir(year_dir):
            print("not")
        else:
            pages = os.listdir(year_dir)
            for page in pages:
                page = page
                page_dir = year_dir + "/" + page
                FileName = page

                ModuleCode=mod
                Year = year[:4]
                Sem = year[year.index('M')+1]
                if(page[-4:]=="jpeg"):
                    Type = "jpeg"
                    Resolution = "300"
                    Page = page[page.index('-')+1:page.index('.')]


                    file = open(page_dir,'rb')
                    object_id = fs.put(file,
                                        ModuleCode = ModuleCode,
                                        Year = Year,
                                        Sem = Sem,
                                        Page = Page,
                                        Type = Type,
                                        Resolution = Resolution,
                                        FileName = FileName)
                    file.close()

                    array = {"_id": str(object_id),
                             "ModuleCode": ModuleCode,
                             "Year": Year,
                             "Sem": Sem,
                             "Page": Page,
                             "Type": Type,
                             "Resolution": Resolution,
                             "FileName": FileName}
                    print(ModuleCode +" "+ Year +" "+ Sem +" "+ Page
                         +" "+ Type +" "+ Resolution)
                    json_list.append(array)
                else:
                    Type = "pdf"
                    pdf_dir = page_dir

                    file = open(pdf_dir,'rb')
                    object_id = fs.put(file,
                                        ModuleCode = ModuleCode,
                                        Year = Year,
                                        Sem = Sem,
                                        Type = Type,
                                        FileName = FileName)
                    file.close()

                    array = {"_id": str(object_id),
                             "ModuleCode": ModuleCode,
                             "Year": Year,
                             "Sem": Sem,
                             "Type": Type,
                             "FileName": FileName}
                    print(ModuleCode +" "+ Year +" "+ Sem +" "+ Type)
                    json_list.append(array)

with open('files_module_list.json', 'w') as outfile:
    json.dump(json_list, outfile)
