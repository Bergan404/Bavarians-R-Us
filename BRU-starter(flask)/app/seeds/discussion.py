# from werkzeug.security import generate_password_hash
from app.models import db
from app.models.user import Discussion
from datetime import datetime


# Adds a demo user, you can add other users here if you want
def seed_discussions():

    first_discussion = Discussion(discussion_title='bmw is a car',
                                 body="what a car kinda crazy how cool they are!",
                                 image='', userId=1, created_at=datetime.now())

    db.session.add(first_discussion)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_discussions():
    db.session.execute('TRUNCATE discussions RESTART IDENTITY CASCADE;')
    db.session.commit()
