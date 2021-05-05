from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

# ---------------Joint Table----------------
# when creating a joint table it is highly recommended to go about it by creating the table
# like this rather than with a class like any other normal table
shopping_cart = db.Table(
    'shopping_carts',
    db.Column(
        "user_id", db.Integer, db.ForeignKey('users.id'), nullable=False
    ),
    db.Column(
        "post_id", db.Integer, db.ForeignKey('posts.id'), nullable=False
    )
)

# ------------------------------Users Table ----------------------------------
class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  username = db.Column(db.String(40), nullable = False, unique = True)
  email = db.Column(db.String(255), nullable = False, unique = True)
  hashed_password = db.Column(db.String(255), nullable = False)
  image = db.Column(db.String(255))

  #Relations
  post_creator = db.relationship('Post', back_populates="creator")
  discussion_creator = db.relationship('Discussion', back_populates='discussion')
  user_review = db.relationship('Review', back_populates="creator_review")
  creator_reply = db.relationship('Reply', back_populates="user_reply")

  posts = db.relationship("Post", secondary=shopping_cart, back_populates="users", lazy="dynamic")

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
      "email": self.email,
      "image": self.image
    }


# ------------------------------Posts Table ----------------------------------

class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    post_title = db.Column(db.String(100), nullable= False)
    image = db.Column(db.String(255))
    description = db.Column(db.Text, nullable= False)
    year = db.Column(db.String(20))
    model = db.Column(db.String(20))
    price = db.Column(db.String(50))
    in_stock = db.Column(db.String(20))
    new_used = db.Column(db.Boolean, nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    categoryId = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable= False)
    created_at = db.Column(db.Date)

    #Relations
    creator = db.relationship('User', back_populates="post_creator")
    category = db.relationship('Category', back_populates="post_category")
    user_post = db.relationship('Review', back_populates="creator_post")

    users = db.relationship("User", secondary=shopping_cart, back_populates="posts", lazy="dynamic")


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
    body = db.Column(db.Text)
    image = db.Column(db.String(255))
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.Date)

    #Relations
    discussion = db.relationship('User', back_populates="discussion_creator")
    discussion_post = db.relationship('Reply', back_populates='user_discussion')


    def to_dict(self):
        return {
            "id": self.id,
            "discussion_title": self.discussion_title,
            "body": self.body,
            "image": self.image,
            "userId": self.userId,
            "created_at": self.created_at
        }

# ------------------------------Reviews Table ----------------------------------
class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    postId = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable= False)
    body = db.Column(db.Text)
    created_at = db.Column(db.Date)

    #Relations
    creator_review = db.relationship('User', back_populates="user_review")
    creator_post = db.relationship('Post', back_populates="user_post")


    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "postId": self.postId,
            "body": self.body,
            "created_at": self.created_at
        }

# ------------------------------Replies Table ----------------------------------
class Reply(db.Model):
    __tablename__ = 'replies'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    discussionId = db.Column(db.Integer, db.ForeignKey('discussions.id'), nullable= False)
    body = db.Column(db.Text)
    created_at = db.Column(db.Date)

    #Relations
    user_reply = db.relationship('User', back_populates="creator_reply")
    user_discussion = db.relationship('Discussion', back_populates="discussion_post")


    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "discussionId": self.discussionId,
            "body": self.body,
            "created_at": self.created_at
        }

# ------------------------------Categories Table ----------------------------------
class Category(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(100))
    created_at = db.Column(db.Date)

    #Relations
    post_category = db.relationship('Post', back_populates='category')


    def to_dict(self):
        return {
            "id": self.id,
            "category": self.category,
            "created_at": self.created_at
        }