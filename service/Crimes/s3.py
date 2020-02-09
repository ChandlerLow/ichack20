import boto3
from botocore.exceptions import NoCredentialsError

ACCESS_KEY = 'AKIAYZBVSERNUR76WM7D'
SECRET_KEY = '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'


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
        s3.download_file(bucket, s3_file, local_file)
        print("Download Successful")
        return True
    except FileNotFoundError:
        print("The file was not found")
        return False
    except NoCredentialsError:
        print("Credentials not available")
        return False


if __name__ == '__main__':
    # add_alert('test/test/test.img')
    uploaded = upload_to_bucket('logo512.png', 'ichack20-images', 'logo512.png')
    print(uploaded)
    downloaded = fetch_from_bucket('ichack20-images', 'logo512.png', 'test.png')
    print(downloaded)
