# from werkzeug.security import generate_password_hash
from app.models import db
from app.models.user import Discussion
from datetime import datetime


# Adds a demo user, you can add other users here if you want
def seed_discussions():

    first_discussion = Discussion(discussion_title='bmw is a car',
                                 body="what a car kinda crazy how cool they are!",
                                 image='', userId=1, created_at=datetime.now())

    second_discussion = Discussion(discussion_title='my car got alot of miles',
                                 body="what a car kinda crazy how cool they are!, this is one of the best cars that I have ever owned in my life kinda silly me saying that but it really is true",
                                 image='', userId=2, created_at=datetime.now())

    db.session.add(first_discussion)
    db.session.add(second_discussion)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_discussions():
    db.session.execute('TRUNCATE discussions RESTART IDENTITY CASCADE;')
    db.session.commit()
