from flask import Blueprint, jsonify, session, request
from app.models import db
from app.models.user import Category

category = Blueprint('category', __name__)


@category.route('/')
def main():
    categories = Category.query.all()
    return {"categories": [category.to_dict() for category in categories]}
