from flask import Blueprint, jsonify, session, request
from app.models import db
from app.models.user import Category

category = Blueprint('category', __name__)


@category.route('/')
def main():
    categories = Category.query.all()
    return {"categories": [category.to_dict() for category in categories]}


@category.route('/<int:id>')
def oneCategory(id):
    category = Category.query.get(id)
    return category.to_dict()
