from flask import Blueprint, jsonify, session, request
from app.models import db
from app.models.user import Review
from datetime import datetime
from app.forms import ReviewForm
from flask_login import current_user


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


@reviews.route('/create', methods=["POST"])
def create_review():
    form = ReviewForm()
    form['userId'].data = current_user.id
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.is_submitted():
        review = Review(
            userId=form.data['userId'],
            postId=form.data['postId'],
            rating=form.data['rating'],
            body=form.data['body'],
            created_at=form.data['created_at']
        )
        db.session.add(review)
        db.session.commit()
        return review.to_dict()
    return "didnt go thru", 404
