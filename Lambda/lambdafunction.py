import json
import boto3
import csv
import io
import pymongo
import os



s3Client=boto3.client('s3');

def lambda_handler(event, context):
    bucket=event['Records'][0]['s3']['bucket']['name']
    key=event['Records'][0]['s3']['object']['key']
    
    print("Event is",event)
    #print(bucket)
    #print(key)
    
    mongo_client = pymongo.MongoClient(os.environ.get('MONGO_URI')) 
    db = mongo_client['ecommerce'] 
    collection = db['products']
    id=key.split('/') 
    
    response=s3Client.get_object(Bucket=bucket,Key=key)
    
    data=response['Body'].read().decode('iso-8859-1')
    reader=csv.reader(io.StringIO(data))
    next(reader)
    
    for row in reader:
        new_product = {
        'user': id[1], 
        'name': row[0],
        'image': row[1],
        'brand': row[2],
        'category': row[3],
        'description': row[4],
        'rating': row[5],
        'numReviews': row[6],
        'price': row[7],
        'countInStock': row[8],
        }
        
        result = collection.insert_one(new_product)
        
    print("Products added")    
    
    
    
