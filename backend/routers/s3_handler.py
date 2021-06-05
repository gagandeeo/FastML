import boto3
import pandas as pd
from sqlalchemy.sql.expression import true
import tempfile
import joblib
import io

BUCKET = "faserbuck"


def upload_model_file(model, key):
    s3_client = boto3.client('s3')
    with tempfile.TemporaryFile() as fp:
        joblib.dump(model, fp)
        fp.seek(0)
        response = s3_client.put_object(Body=fp.read(),
                                        Bucket=BUCKET,
                                        Key=key,
                                        )
    if response['ResponseMetadata']['HTTPStatusCode'] == 200:
        return True


def upload_csv(df, key):
    csv_buffer = io.StringIO()
    df.to_csv(csv_buffer)
    s3_resource = boto3.resource('s3')
    s3_resource.Object(BUCKET, key).put(Body=csv_buffer.getvalue())


def upload_file(temp_file, key, content_type):
    """
    Function to upload a temp_file to an S3 bucket
    """
    s3_client = boto3.client('s3')
    response = s3_client.put_object(Body=temp_file,
                                    Bucket=BUCKET,
                                    Key=key,
                                    ContentType=content_type)
    if response['ResponseMetadata']['HTTPStatusCode'] == 200:
        return True


def download_file(file_name):
    """
    Function to download a given file from an S3 bucket
    """
    s3 = boto3.client('s3')
    response = s3.generate_presigned_url('get_object',
                                         Params={'Bucket': BUCKET,
                                                 'Key': file_name},
                                         ExpiresIn=60)
    return response


def get_file(filename):
    s3 = boto3.client('s3')
    obj = s3.get_object(
        Bucket=BUCKET,
        Key=filename
    )
    return obj['Body']


def list_files():
    """
    Function to list files in a given S3 bucket
    """
    s3 = boto3.client('s3')
    contents = []
    for item in s3.list_objects(Bucket=BUCKET)['Contents']:
        contents.append(item)

    return contents
