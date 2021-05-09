# from werkzeug.security import generate_password_hash
from app.models import db
from app.models.user import Discussion, Reply
from datetime import datetime


# Adds a demo user, you can add other users here if you want
def seed_discussions():

    first_discussion = Discussion(discussion_title='bmw is a car',
                                 body="what a car kinda crazy how cool they are!",
                                 image='', userId=1, created_at=datetime.now())
    first_reply = Reply(userId=2, discussionId=1,
                        body="This man sure knows what he is talking about", created_at=datetime.now())
    second_reply = Reply(userId=1, discussionId=1,
                        body="Call me crazy but he is right", created_at=datetime.now())

    second_discussion = Discussion(discussion_title='my car got alot of miles',
                                 body="what a car kinda crazy how cool they are!, this is one of the best cars that I have ever owned in my life kinda silly me saying that but it really is true",
                                 image='', userId=2, created_at=datetime.now())
    third_reply = Reply(userId=2, discussionId=2,
                        body="Gotta love the life", created_at=datetime.now())
    fourth_reply = Reply(userId=1, discussionId=2,
                        body="Call me crazy but he is right", created_at=datetime.now())


    db.session.add(first_discussion)
    db.session.add(first_reply)
    db.session.add(second_reply)

    db.session.add(second_discussion)
    db.session.add(third_reply)
    db.session.add(fourth_reply)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_discussions():
    db.session.execute('TRUNCATE discussions RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE replies RESTART IDENTITY CASCADE;')
    db.session.commit()
