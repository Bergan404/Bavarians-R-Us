from flask import Blueprint, jsonify, session, request
from app.models import db
from app.models.user import Discussion
from app.forms import DiscussionForm

dis_post = Blueprint('discussion', __name__)


@dis_post.route('/')
def main():
    discussions = Discussion.query.all()
    return {"discussions": [discussion.to_dict() for discussion in discussions]}


@dis_post.route('/create', methods=['POST'])
def create_discussions():
    form = DiscussionForm()
    if form.is_submitted():
        discussion = Discussion(
            discussion_title=form.data['discussion_title'],
            body=form.data['body'],
            image=form.data['image'],
            userId=form.data['userId'],
            created_at=form.data['created_at'],
        )
        db.session.add(discussion)
        db.session.commit()
        return discussion.to_dict()
    return "did not go thru", 401
