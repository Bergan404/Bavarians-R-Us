# from werkzeug.security import generate_password_hash
from app.models import db
from app.models.user import Post, Review
from datetime import datetime
from faker import Faker
import random
fake = Faker()


# Adds a demo user, you can add other users here if you want
def seed_posts():

    def auto_seed(count, user_count, post_count):
        for i in range(count):
            user_id = random.randint(1, user_count)
            post_id = random.randint(1, post_count)
            body = fake.paragraph(nb_sentences=random.randint(1, 5))
            created_at = datetime.now()
            seed_message = Review(userId=user_id, postId=post_id, body=body, created_at=created_at)
            db.session.add(seed_message)
    auto_seed(50, 50, 4)

    first_post = Post(post_title="Thermostat", image='https://3a663eb0fef48c6d2d60-a88f8ebfcdb877ad223e888bfcb7f7ec.ssl.cf1.rackcdn.com/97312_x800.webp',
                      description='This is a used part for a bmw e90 series.', year='06-10',
                      model="E90", price='$156', in_stock="yes", new_used=True,
                      userId=1, categoryId='5', created_at=datetime.now())

    second_post = Post(post_title="Belt Tensioner", image='https://i.ebayimg.com/images/g/cvQAAOSwqu9VEeAI/s-l640.jpg',
                       description='Used Belt tensioner for a E90 Series BMW', year='06-10',
                       model="E90", price='$56', in_stock="yes", new_used=False,
                       userId=1, categoryId='1', created_at=datetime.now())

    third_post = Post(post_title="WaterPump",
                      image='https://images-na.ssl-images-amazon.com/images/I/61IUf%2BGbuhL._AC_SX679_.jpg',
                      description="A OEM bmw water pump this is a mostly universal fir part but it is meant for the E series.",
                      year="2008", model='328i', price='$297', in_stock='yes', new_used=True, userId=2, categoryId=5, created_at=datetime.now())

    third_post = Post(post_title="WaterPump",
                      image='https://images-na.ssl-images-amazon.com/images/I/61IUf%2BGbuhL._AC_SX679_.jpg',
                      description="A OEM bmw water pump this is a mostly universal fir part but it is meant for the E series.",
                      year="2008", model='328i', price='$297', in_stock='yes', new_used=True, userId=2, categoryId=5, created_at=datetime.now())

    fourth_post = Post(post_title="Bmw 228i Downpipe",
                       image='https://www.vr-speed.com/wp-content/uploads/2017/05/vrsf-n20-f30-dp_1-1-wpp1600378291545.jpg',
                       description="This is a VRSF Racing downpipe that I had purchased but then ended up crashing my car in a lake.",
                       year="2015", model='228i', price='$235', in_stock='yes', new_used=True, userId=2, categoryId=2, created_at=datetime.now())

    db.session.add(first_post)

    db.session.add(second_post)

    db.session.add(third_post)

    db.session.add(fourth_post)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
