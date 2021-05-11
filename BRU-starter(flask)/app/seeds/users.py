# from werkzeug.security import generate_password_hash
from app.models import db, User
from app.models.user import ShoppingCart
from datetime import datetime
from faker import Faker
import random
fake = Faker()


# Adds a demo user, you can add other users here if you want
def seed_users():

    demo = User(username='Demo', email='demo@aa.io',
                password='password')
    demo_cart = ShoppingCart(userId=1, created_at=datetime.now())

    bergan = User(username='Bergan', email='bergan@aa.io',
                  hashed_password='password', image="")
    bergan_cart = ShoppingCart(userId=2, created_at=datetime.now())

    def auto_seed(count):
        for i in range(count):
            username = fake.name()
            email = fake.email()
            password = 'password'

            seed_user = User(username=username, email=email, password=password)

            db.session.add(seed_user)

    auto_seed(50)

    db.session.add(demo)
    db.session.add(demo_cart)
    db.session.add(bergan)
    db.session.add(bergan_cart)

    db.session.commit()


def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE shoppingcarts RESTART IDENTITY CASCADE;')
    db.session.commit()
