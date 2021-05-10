from flask import Blueprint, jsonify, session, request
from app.models import db
from app.models.user import Reply
from datetime import datetime
from app.forms import ReplyForm
from flask_login import current_user


replies = Blueprint('replies', __name__)


@replies.route('/')
def main():
    replies = Reply.query.all()
    return {"replies": [reply.to_dict() for reply in replies]}


@replies.route('/create', methods=["POST"])
def create_reply():
    form = ReplyForm()
    form['userId'].data = current_user.id
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.is_submitted():
        reply = Reply(
            userId=form.data['userId'],
            discussionId=form.data['discussionId'],
            body=form.data['body'],
            created_at=form.data['created_at']
        )
        db.session.add(reply)
        db.session.commit()
        return reply.to_dict()
    return "didnt go thru", 404
