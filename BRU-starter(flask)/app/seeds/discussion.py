# from werkzeug.security import generate_password_hash
from app.models import db
from app.models.user import Discussion, Reply
from datetime import datetime


# Adds a demo user, you can add other users here if you want
def seed_discussions():

    first_discussion = Discussion(discussion_title='Bmw is a car',
                                 body="what a car kinda crazy how cool they are!",
                                 image='https://i.pinimg.com/originals/bf/45/2a/bf452a57c783394f9fc7354a58b1b7e0.jpg', userId=1, created_at=datetime.now())
    first_reply = Reply(userId=2, discussionId=1,
                        body="This man sure knows what he is talking about", created_at=datetime.now())
    second_reply = Reply(userId=1, discussionId=1,
                        body="Call me crazy but he is right", created_at=datetime.now())

    second_discussion = Discussion(discussion_title='My car got alot of miles',
                                 body="what a car kinda crazy how cool they are!, this is one of the best cars that I have ever owned in my life kinda silly me saying that but it really is true",
                                 image='https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/1988-bmw-m5-1595565434c88be8395a92972cdd-1e65-4fbd-8a5f-0fade0e01f8c-scaled-1598463679.jpeg?crop=1.00xw:0.668xh;0,0.0507xh&resize=640:*', userId=2, created_at=datetime.now())
    third_reply = Reply(userId=2, discussionId=2,
                        body="Gotta love the life", created_at=datetime.now())
    fourth_reply = Reply(userId=1, discussionId=2,
                        body="Call me crazy but he is right", created_at=datetime.now())

    third_discussion = Discussion(discussion_title='I have had a bmw for a while know and I hear knocking!',
                                 body="This is a car that I have loved and cherished for a very long long time and now that I am finally working on it it keeps breaking!",
                                 image='https://i.imgur.com/25D50gn.jpg', userId=1, created_at=datetime.now())
    fifth_reply = Reply(userId=2, discussionId=3,
                        body="Gotta love the life", created_at=datetime.now())
    sixth_reply = Reply(userId=1, discussionId=3,
                        body="Call me crazy but he is right", created_at=datetime.now())

    fourth_discussion = Discussion(discussion_title='Cant stop looking at this beautiful car',
                                 body="I have been an owner now for about the course of a year and the design and look of this car are just so mean and aggresive",
                                 image='https://cdn.carbuzz.com/gallery-images/original/185000/200/185287.jpg', userId=2, created_at=datetime.now())
    seventh_reply = Reply(userId=2, discussionId=4,
                        body="Gotta love the life", created_at=datetime.now())
    eigth_reply = Reply(userId=1, discussionId=4,
                        body="Call me crazy but he is right", created_at=datetime.now())

    fifth_discussion = Discussion(discussion_title='New BMW M4?????',
                                 body="I dont think I can get over the fact that the grills are huge",
                                 image='https://journal.classiccars.com/media/2020/09/P90399235_highRes_the-new-bmw-m4-compe-scaled.jpeg', userId=2, created_at=datetime.now())
    ninth_reply = Reply(userId=2, discussionId=5,
                        body="Gotta love the life", created_at=datetime.now())
    tenth_reply = Reply(userId=1, discussionId=5,
                        body="Call me crazy but he is right", created_at=datetime.now())

    sixth_discussion = Discussion(discussion_title='I GOT AN M2',
                                 body="This is a big day for me and a huge accomplishment on my part",
                                 image='https://cdn.bmwblog.com/wp-content/uploads/2020/08/bmw-m2-cs-tuning-dahler-10.jpg', userId=2, created_at=datetime.now())
    eleventh_reply = Reply(userId=2, discussionId=6,
                        body="Gotta love the life", created_at=datetime.now())
    twelth_reply = Reply(userId=1, discussionId=6,
                        body="Call me crazy but he is right", created_at=datetime.now())


    db.session.add(first_discussion)
    db.session.add(first_reply)
    db.session.add(second_reply)

    db.session.add(second_discussion)
    db.session.add(third_reply)
    db.session.add(fourth_reply)

    db.session.add(third_discussion)
    db.session.add(fifth_reply)
    db.session.add(sixth_reply)

    db.session.add(fourth_discussion)
    db.session.add(seventh_reply)
    db.session.add(eigth_reply)

    db.session.add(fifth_discussion)
    db.session.add(ninth_reply)
    db.session.add(tenth_reply)

    db.session.add(sixth_discussion)
    db.session.add(eleventh_reply)
    db.session.add(twelth_reply)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_discussions():
    db.session.execute('TRUNCATE discussions RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE replies RESTART IDENTITY CASCADE;')
    db.session.commit()
