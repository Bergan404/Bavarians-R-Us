# from werkzeug.security import generate_password_hash
from app.models import db
from app.models.user import Category
from datetime import datetime


# Adds a demo user, you can add other users here if you want
def seed_categories():

    engine_drivetrain = Category(category="Engine & Drivetrain",
                                 created_at=datetime.now())

    exhaust_emission = Category(category="Exhaust & Emission",
                                created_at=datetime.now())

    transmission = Category(category="Transmission",
                            created_at=datetime.now())

    suspension = Category(category="Suspension",
                          created_at=datetime.now())

    cooling_system = Category(category="Cooling System",
                              created_at=datetime.now())

    brake_wheel = Category(category="Brake & Wheel Hub",
                           created_at=datetime.now())

    electrical = Category(category="Electrical",
                          created_at=datetime.now())

    db.session.add(engine_drivetrain)
    db.session.add(exhaust_emission)
    db.session.add(transmission)
    db.session.add(suspension)
    db.session.add(cooling_system)
    db.session.add(brake_wheel)
    db.session.add(electrical)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_categories():
    db.session.execute('TRUNCATE categories RESTART IDENTITY CASCADE;')
    db.session.commit()
