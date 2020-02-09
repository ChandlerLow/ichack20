import boto3
from botocore.exceptions import NoCredentialsError
import requests

def upload_to_bucket(local_file, bucket, s3_file):
    s3 = boto3.client('s3', aws_access_key_id=ACCESS_KEY,
                      aws_secret_access_key=SECRET_KEY)
    try:
        s3.upload_file(local_file, bucket, s3_file)
        print("Upload Successful")
        return True
    except FileNotFoundError:
        print("The file was not found")
        return False
    except NoCredentialsError:
        print("Credentials not available")
        return False


def fetch_from_bucket(bucket, s3_file, local_file):
    s3 = boto3.client('s3', aws_access_key_id=ACCESS_KEY,
                      aws_secret_access_key=SECRET_KEY)
    try:
        s3.download_file(bucket, s3_file, local_file, ExtraArgs={'ACL': 'public-read'})
        print("Download Successful")
        return True
    except FileNotFoundError:
        print("The file was not found")
        return False
    except NoCredentialsError:
        print("Credentials not available")
        return False


def test_download() :
    url = 'http://google.com/favicon.ico'
    filename = url.split('/')[-1]
    r = requests.get(url, allow_redirects=True)
    fw = open("images/coool.ico", 'wb')
    fw.write(r.content)
    fw.close()


if __name__ == '__main__':
    test_download()
