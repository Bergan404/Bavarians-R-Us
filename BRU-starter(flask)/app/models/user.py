from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


# ------------------------------Users Table ----------------------------------
class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    image = db.Column(db.String(255))

    # Relations
    post_creator = db.relationship('Post', back_populates="creator")
    discussion_creator = db.relationship(
        'Discussion', back_populates='discussion')
    user_review = db.relationship('Review', back_populates="creator_review")
    creator_reply = db.relationship('Reply', back_populates="user_reply")
    creator_cart = db.relationship('ShoppingCart', back_populates='user_cart')

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
            "image": self.image,
        }


# ------------------------------Posts Table ----------------------------------

class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    post_title = db.Column(db.String(100), nullable=False)
    image = db.Column(db.String(255))
    description = db.Column(db.Text, nullable=False)
    year = db.Column(db.String(20))
    model = db.Column(db.String(20))
    price = db.Column(db.String(50))
    in_stock = db.Column(db.String(20))
    new_used = db.Column(db.Boolean, nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    categoryId = db.Column(db.Integer, db.ForeignKey(
        'categories.id'), nullable=False)
    created_at = db.Column(db.DateTime)

    # Relations
    creator = db.relationship('User', back_populates="post_creator")
    category = db.relationship('Category', back_populates="post_category")
    user_post = db.relationship(
        'Review', cascade="all,delete", back_populates="creator_post")
    shopping_cart = db.relationship(
        'ShoppingCartPost', cascade="all,delete", back_populates='shopping_post')

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
            "created_at": self.created_at,
            'reviews': [review.to_dict() for review in self.user_post],
            "author": self.creator.username
        }

# ------------------------------Discussions Table ----------------------------------


class Discussion(db.Model):
    __tablename__ = 'discussions'

    id = db.Column(db.Integer, primary_key=True)
    discussion_title = db.Column(db.String(100), nullable=False)
    body = db.Column(db.Text)
    image = db.Column(db.String(255))
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime)

    # Relations
    discussion = db.relationship('User', back_populates="discussion_creator")
    discussion_post = db.relationship(
        'Reply', cascade="all,delete", back_populates='user_discussion')

    def to_dict(self):
        return {
            "id": self.id,
            "discussion_title": self.discussion_title,
            "body": self.body,
            "image": self.image,
            "userId": self.userId,
            "created_at": self.created_at,
            'replies': [reply.to_dict() for reply in self.discussion_post],
            "author": self.discussion.username
        }

# ------------------------------Reviews Table ----------------------------------


class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    postId = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    rating = db.Column(db.Integer)
    body = db.Column(db.Text)
    created_at = db.Column(db.DateTime)

    # Relations
    creator_review = db.relationship('User', back_populates="user_review")
    creator_post = db.relationship('Post', back_populates="user_post")

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "postId": self.postId,
            "rating": self.rating,
            "body": self.body,
            "created_at": self.created_at,
            "author": self.creator_review.username,
            "author_image": self.creator_review.image
        }

# ------------------------------Replies Table ----------------------------------


class Reply(db.Model):
    __tablename__ = 'replies'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    discussionId = db.Column(db.Integer, db.ForeignKey(
        'discussions.id'), nullable=False)
    body = db.Column(db.Text)
    created_at = db.Column(db.DateTime)

    # Relations
    user_reply = db.relationship('User', back_populates="creator_reply")
    user_discussion = db.relationship(
        'Discussion', back_populates="discussion_post")

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "discussionId": self.discussionId,
            "body": self.body,
            "created_at": self.created_at,
            "author": self.user_reply.username,
            "author_image": self.user_reply.image
        }

# ------------------------------Categories Table ----------------------------------


class Category(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(100))
    created_at = db.Column(db.DateTime)

    # Relations
    post_category = db.relationship('Post', back_populates='category')

    def to_dict(self):
        return {
            "id": self.id,
            "category": self.category,
            "created_at": self.created_at,
            "posts": [post.to_dict() for post in self.post_category],
        }

# ------------------------------ShoppingCart Table ----------------------------------


class ShoppingCart(db.Model):
    __tablename__ = 'shoppingcarts'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime)

    # Relations
    user_cart = db.relationship('User', back_populates="creator_cart")
    cart = db.relationship('ShoppingCartPost', back_populates='shopping')

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "created_at": self.created_at
        }

# ------------------------------ShoppingCartPost Table ----------------------------------


class ShoppingCartPost(db.Model):
    __tablename__ = 'shoppingcartposts'

    id = db.Column(db.Integer, primary_key=True)
    shoppingCartId = db.Column(db.Integer, db.ForeignKey(
        'shoppingcarts.id'), nullable=False)
    postId = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)

    # Relations
    shopping = db.relationship('ShoppingCart', back_populates='cart')
    shopping_post = db.relationship('Post', back_populates='shopping_cart')

    def to_dict(self):
        return {
            "id": self.id,
            'shoppingCartId': self.shoppingCartId,
            'postId': self.postId
        }
