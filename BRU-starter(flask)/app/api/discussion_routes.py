from flask import Blueprint, jsonify, session, request
from app.models import db
from app.models.user import Discussion
from app.forms import DiscussionForm
from app.helpers import (upload_file_to_s3, allowed_file, get_unique_filename)
from flask_login import current_user

dis_post = Blueprint('discussion', __name__)


@dis_post.route('/')
def main():
    discussions = Discussion.query.all()
    return {"discussions": [discussion.to_dict() for discussion in discussions]}


@dis_post.route('/create', methods=['POST'])
def create_discussions():
    form = DiscussionForm()
    form['userId'].data = current_user.id
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.is_submitted():
        if ("image" in request.files):
            image = request.files["image"]
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            if "url" not in upload:
                # if the dictionary doesn't have a url key
                # it means that there was an error when we tried to upload
                # so we send back that error message
                return upload, 400
            url = upload["url"]
        else:
            url = ""
        discussions = Discussion(
            discussion_title=form.data['discussion_title'],
            body=form.data['body'],
            image=url,
            userId=form.data['userId'],
            created_at=form.data['created_at'],
        )
        db.session.add(discussions)
        db.session.commit()
        return discussions.to_dict()
    return "did not go thru", 401


@dis_post.route('/<int:id>')
def oneDiscussion(id):
    discussion = Discussion.query.get(id)
    return discussion.to_dict()


@dis_post.route('/', methods=['DELETE'])
def delete_discussion():
    discussionId = request.json
    discussion = Discussion.query.get(discussionId)
    db.session.delete(discussion)
    db.session.commit()
