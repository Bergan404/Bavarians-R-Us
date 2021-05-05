# from werkzeug.security import generate_password_hash
from app.models import db
from app.models.user import Post
from datetime import datetime


# Adds a demo user, you can add other users here if you want
def seed_posts():

    first_post = Post(post_title="bmw part", image='',
                     description='nice and genuine bmw part', year='2008',
                     model="328i", price='302', in_stock="yes", new_used=True,
                     userId=1, categoryId='1', created_at=datetime.now())

    db.session.add(first_post)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
