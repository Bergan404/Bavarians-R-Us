from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  username = db.Column(db.String(40), nullable = False, unique = True)
  email = db.Column(db.String(255), nullable = False, unique = True)
  hashed_password = db.Column(db.String(255), nullable = False)
  image = db.Column(db.String(255))


  @property
  def password(self):
    return self.hashed_password


  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)


  def check_password(self, password):
    return check_password_hash(self.password, password)


  def to_dict(self):
    return {
      "id": self.id,
      "username": self.username,
      "email": self.email
      "image": self.image
    }


# ------------------------------Posts Table ----------------------------------

class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    post_title = db.Column(db.String(100), nullable= False)
    image = db.Column(db.String(255))
    description = db.Column(db.TextField, nullable= False)
    year = db.Column(db.String(20))
    model = db.Column(db.Srting(20))
    price = db.Column(db.String(50))
    in_stock = db.Column(db.String(20))
    new_used = db.Column(db.BooleanField, nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    categoryId = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable= False)
    created_at = db.Column(db.Date)


    def to_dict(self):
        return {
            "id": self.id,
            "post_title": self.post_title,
            "image": self.image,
            "description": self.description,
            "year": self.year,
            "model": self.model,
            "price": self.price,
            "in_stock": self.in_stock,
            "new_used": self.new_used,
            "userId": self.userId,
            "categoryId": self.categoryId,
            "created_at": self.created_at

        }

# ------------------------------Discussions Table ----------------------------------

class Discussion(db.Model):
    __tablename__ = 'discussions'

    id = db.Column(db.Integer, primary_key=True)
    discussion_title = db.Column(db.String(100), nullable= False)
    body = db.Column(db.TextField)
    image = db.Column(db.String(255))
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.Date)


    def to_dict(self):
        return {
            "id": self.id,
            "discussion_title": self.discussion_title,
            "body": self.body,
            "image": self.image,
            "userId": self.userId,
            "created_at": self.created_at


        }
