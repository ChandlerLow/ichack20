import pymysql
import pymysql.cursors

host = "ichack20.cpw4v7pubuoi.eu-west-2.rds.amazonaws.com"
port = 3306
dbname = "ichack20"
user = "admin"
password = "marceliscool"

sql_insert_alert = "INSERT INTO `Alerts` (`image_path`) VALUES (%s)"
sql_select_all_alerts = "SELECT * FROM `Alerts`"
sql_update_category = "UPDATE `Alerts` SET `Category`=%s WHERE `id`=%s"


def db_connect():
    connection = pymysql.connect(host=host,
                                 user=user,
                                 password=password,
                                 db=dbname,
                                 charset='utf8mb4',
                                 cursorclass=pymysql.cursors.DictCursor)
    return connection


def db_add_alert(image_path):
    escaped_path = pymysql.escape_string(image_path)

    db = db_connect()
    try:
        with db.cursor() as cursor:
            cursor.execute(sql_insert_alert, escaped_path)
        db.commit()
    finally:
        db.close()


def db_get_all_alerts():
    db = db_connect()

    try:
        with db.cursor() as cursor:
            cursor.execute(sql_select_all_alerts)
            return cursor.fetchall()
    finally:
        db.close()


def db_update_category(id, category):
    if not 0 <= category <= 2:
        print('Invalid category:', category)
        return

    db = db_connect()
    try:
        with db.cursor() as cursor:
            cursor.execute(sql_update_category, (category, id))
        db.commit()
    finally:
        db.close()


if __name__ == '__main__':
    # add_alert('test/test/test.img')
    get_all_alerts()
    update_category(1, 0)
    get_all_alerts()
