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

    fifth_post = Post(post_title="BC Racing Coilovers",
                       image='https://cdn.shopify.com/s/files/1/0941/4966/products/I-03-BR-BMW-E90-BC-Coilovers-1_98015ec4-db76-4b88-a711-fadbfc5ffcfc_1024x1024.jpg?v=1581716669',
                       description="I have had these for little over a year and got them as a presesnt from my grandma, don't need them because I already have them!",
                       year="2008", model='328i', price='$1100', in_stock='yes', new_used=True, userId=52, categoryId=4, created_at=datetime.now())

    sixth_post = Post(post_title="M4 Coilovers",
                       image='https://cdn.shopify.com/s/files/1/0941/4966/products/I-68-BR-BMW-F80-BC-racing-coilovers-1_1024x1024.jpg?v=1581717048',
                       description="These are top of the line BC Racing Coilovers and they do have some were and tear on them, but you have the ability to lower the car at least up to 2 inches.",
                       year="15-17", model='F82/F80', price='$856', in_stock='yes', new_used=True, userId=43, categoryId=4, created_at=datetime.now())

    seventh_post = Post(post_title="Bmw Ecu",
                       image='https://www.the-ecu-pro.com/wp-content/uploads/products/Professional-1999-E46-BMW-330d--EDC15-ECU-repair-service-scaled.jpg',
                       description="This is from my parts car and I still works so don't get to discouraged",
                       year="1999", model='E46', price='$399', in_stock='yes', new_used=True, userId=51, categoryId=7, created_at=datetime.now())

    eigth_post = Post(post_title="BMW cobb accessport",
                       image='https://media.cobbtuning.com/catalog/products/accessport_v3_bmw_001.jpg',
                       description="This is for a N54 motor and only for that This can totally get your cars in the 3s",
                       year="06-10", model='E90', price='$650', in_stock='yes', new_used=True, userId=33, categoryId=7, created_at=datetime.now())

    ninth_post = Post(post_title="E30 5 lug conversion kit",
                       image='https://i1.wp.com/srs-concept.com/wp-content/uploads/2016/11/5-lug-swap-complete-kit-render.png?fit=1833%2C929&ssl=1',
                       description="This is for the bmw E30 and it is meant for switching that old 4 lug to a 5 lug",
                       year="1987", model='E30', price='$470.96', in_stock='yes', new_used=True, userId=2, categoryId=6, created_at=datetime.now())

    tenth_post = Post(post_title="Drilled and Slotted Rotors",
                       image='https://m.media-amazon.com/images/I/81bsC9JSQXL._AC_.jpg',
                       description="For the 335i wont fit any other car the ratio will be to big for the calipher",
                       year="06-10", model='E90 335i', price='$200', in_stock='yes', new_used=True, userId=51, categoryId=6, created_at=datetime.now())

    eleventh_post = Post(post_title="Bmw Clutch kit",
                       image='https://www.fcpeuro.com/public/assets/products/157137/large/K70238-01-1.jpg?1496436679',
                       description="Brand new clutch kit for the bwm m3",
                       year="2010", model='M3', price='$286.49', in_stock='yes', new_used=True, userId=35, categoryId=3, created_at=datetime.now())

    twelth_post = Post(post_title="Armytrix Exhaust M4",
                       image='https://www.armytrix.com/cdn/800_530_100_ff_cdn/product-bmw-m4-w-gold-tips/bmw-m4-f82-armytrix-exhaust-08.jpg',
                       description="This thing came off of my m4 and it sounds very much quite nice",
                       year="15-16", model='M4 F82', price='$899.99', in_stock='yes', new_used=True, userId=52, categoryId=2, created_at=datetime.now())

    thirteen_post = Post(post_title="BMW E60 Transmission",
                       image='https://i.ebayimg.com/images/g/tLUAAOSwlzRabrVZ/s-l300.jpg',
                       description="I have had this laying around for a while and now I gotta rid myself of it",
                       year="04-05", model='530i/525i', price='$50', in_stock='yes', new_used=True, userId=23, categoryId=3, created_at=datetime.now())

    fourteen_post = Post(post_title="Valve Cover",
                       image='https://images-na.ssl-images-amazon.com/images/I/51J5moTX0%2BL._AC_SY355_.jpg',
                       description="I know these be going out on everyones cars after a few thousand miles or so.",
                       year="2008", model='E90', price='$150', in_stock='yes', new_used=True, userId=22, categoryId=1, created_at=datetime.now())

    db.session.add(first_post)

    db.session.add(second_post)

    db.session.add(third_post)

    db.session.add(fourth_post)

    db.session.add(fifth_post)

    db.session.add(sixth_post)

    db.session.add(seventh_post)

    db.session.add(eigth_post)

    db.session.add(ninth_post)

    db.session.add(tenth_post)

    db.session.add(eleventh_post)

    db.session.add(twelth_post)

    db.session.add(thirteen_post)

    db.session.add(fourteen_post)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
