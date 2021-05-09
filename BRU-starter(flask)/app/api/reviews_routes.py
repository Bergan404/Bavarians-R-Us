from flask import Blueprint, jsonify, session, request
from app.models import db
from app.models.user import Review
from datetime import datetime

reviews = Blueprint('reviews', __name__)


@reviews.route('/')
def main():
    reviews = Review.query.all()
    return {"reviews": [review.to_dict() for review in reviews]}


@reviews.route('/', methods=['DELETE'])
def delete_review():
    postId = request.json
    post = Post.query.get(postId)
    db.session.delete(post)
    db.session.commit()
