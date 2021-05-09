# from werkzeug.security import generate_password_hash
from app.models import db
from app.models.user import Post, Review
from datetime import datetime


# Adds a demo user, you can add other users here if you want
def seed_posts():

    first_post = Post(post_title="bmw part", image='',
                     description='nice and genuine bmw part', year='2008',
                     model="328i", price='302', in_stock="yes", new_used=True,
                     userId=1, categoryId='1', created_at=datetime.now())
    first_review = Review(userId=2, postId=1,
                        body="Part came in really nice condition, would buy it again", created_at=datetime.now())
    second_review = Review(userId=1, postId=1,
                        body="Gotta say really good quality", created_at=datetime.now())

    second_post = Post(post_title="bmw part2", image='',
                     description='nice and genuine bmw part', year='2008',
                     model="328i", price='302', in_stock="yes", new_used=True,
                     userId=1, categoryId='1', created_at=datetime.now())
    third_review = Review(userId=2, postId=2,
                        body="Part came in really nice condition, would buy it again", created_at=datetime.now())
    fourth_review = Review(userId=1, postId=2,
                        body="Gotta say really good quality", created_at=datetime.now())

    third_post = Post(post_title="WaterPump",
                      image='https://images-na.ssl-images-amazon.com/images/I/61IUf%2BGbuhL._AC_SX679_.jpg',
                      description="A OEM bmw water pump this is a mostly universal fir part but it is meant for the E series.",
                      year="2008", model='328i', price='297', in_stock='yes', new_used=True, userId=2, categoryId=5, created_at=datetime.now())
    fifth_review = Review(userId=2, postId=3,
                        body="Part came in really nice condition, would buy it again", created_at=datetime.now())
    sixth_review = Review(userId=1, postId=3,
                        body="Gotta say really good quality", created_at=datetime.now())

    db.session.add(first_post)
    db.session.add(first_review)
    db.session.add(second_review)

    db.session.add(second_post)
    db.session.add(third_review)
    db.session.add(fourth_review)

    db.session.add(third_post)
    db.session.add(fifth_review)
    db.session.add(sixth_review)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
