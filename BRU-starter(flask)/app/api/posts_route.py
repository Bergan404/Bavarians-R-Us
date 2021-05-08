from flask import Blueprint, jsonify, session, request
from app.models import db
from app.models.user import Post
from app.forms import PostForm
from datetime import datetime

posts = Blueprint('post', __name__)


@posts.route('/')
def main():
    posts = Post.query.all()
    return {"posts": [post.to_dict() for post in posts]}


@posts.route('/create', methods=['POST'])
def create_posts():
    form = PostForm()
    if form.is_submitted():
        post = Post(
            post_title=form.data['post_title'],
            image=form.data['image'],
            description=form.data['description'],
            year=form.data['year'],
            model=form.data['model'],
            price=form.data['price'],
            in_stock=form.data['in_stock'],
            new_used=form.data['new_used'],
            userId=form.data['userId'],
            categoryId=form.data['categoryId'],
            created_at=form.data['created_at'],
        )
        db.session.add(post)
        db.session.commit()
        return post.to_dict()
    return "did not go thru", 401


@posts.route('/<int:id>')
def onePost(id):
    post = Post.query.get(id)
    return post.to_dict()


@posts.route('/', methods=['DELETE'])
def delete_post():
    postId = request.json
    post = Post.query.get(postId)
    db.session.delete(post)
    db.session.commit()
