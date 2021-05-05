from flask import Blueprint, jsonify, session, request
from app.models import db
from app.models.user import Discussion

dis_post = Blueprint('discussion', __name__)

@dis_post.route('/')
def main():
    discussions = Discussion.query.all()
    return {"discussions": [discussion.to_dict() for discussion in discussions]}
