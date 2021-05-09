from flask import Blueprint, jsonify, session, request
from app.models import db
from app.models.user import ShoppingCart, ShoppingCartPost, Post

cart = Blueprint('shoppingcart', __name__)


@cart.route('/<int:id>', methods=['POST'])
def addItem(postId):
    product = Post.query.filter(Post.id == postId)
    cart = ShoppingCartPost(product=product)
    db.session.add(cart_item)
    db.session.commit()
