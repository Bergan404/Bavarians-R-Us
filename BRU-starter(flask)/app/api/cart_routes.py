from flask import Blueprint, jsonify, session, request
from app.models import db
from app.models.user import ShoppingCart, ShoppingCartPost, Post
from flask_login import current_user


cart = Blueprint('shoppingcart', __name__)


@cart.route('/<int:id>', methods=['POST'])
def addItem(id):
    res = request.get_json()
    print(res)
    postId = res["postId"]
    print(res)
    product = Post.query.filter(Post.id == postId).first()
    cart = ShoppingCart.query.filter(ShoppingCart.userId == current_user.id).first()
    cart_item = ShoppingCartPost(shopping_post=product, shopping=cart)
    db.session.add(cart_item)
    db.session.commit()
    return product.to_dict()
