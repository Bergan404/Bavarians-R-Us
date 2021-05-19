from flask import Blueprint, jsonify, session, request
from app.models import db
from app.models.user import UserReply
from datetime import datetime
from app.forms import UserReplyForm
from flask_login import current_user


userreplies = Blueprint('userreplies', __name__)


@userreplies.route('/')
def main():
    replies = UserReply.query.all()
    return {"replies": [reply.to_dict() for reply in replies]}


@userreplies.route('/create', methods=["POST"])
def create_reply():
    form = UserReplyForm()
    form['userId'].data = current_user.id
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.is_submitted():
        reply = UserReply(
            userId=form.data['userId'],
            replyId=form.data['replyId'],
            body=form.data['body'],
            created_at=form.data['created_at']
        )
        db.session.add(reply)
        db.session.commit()
        return reply.to_dict()
    return "didnt go thru", 404


# @userreplies.route('/', methods=['DELETE'])
# def delete_reply():
#     replyId = request.json
#     print(replyId, "=-=-=-=--=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-")
#     reply = UserReply.query.get(replyId)
#     db.session.delete(reply)
#     db.session.commit()
#     replies = UserReply.query.all()
#     return {'reply': [reply.to_dict() for reply in replies]}
