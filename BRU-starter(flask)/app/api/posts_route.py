from flask import Blueprint, jsonify, session, request
from app.models import db
from app.models.user import Post

posts = Blueprint('post', __name__)

@posts.route('/')
def main():
    posts = Post.query.all()
    return {"posts": [post.to_dict() for post in posts]}
