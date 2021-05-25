from flask import Blueprint, jsonify, session, request
from app.models import db
from app.models.user import ShoppingCart, ShoppingCartPost, Post
from flask_login import current_user
from sqlalchemy import and_


cart = Blueprint('shoppingcart', __name__)


@cart.route('/')
def all_post():
    cart = ShoppingCart.query.filter(
        ShoppingCart.userId == current_user.id).first()
    certainPost = ShoppingCartPost.query.filter(
        ShoppingCartPost.shoppingCartId == cart.id)
    return {"post": [post.to_dict() for post in certainPost]}


@cart.route('/<int:id>', methods=['POST'])
def addItem(id):
    res = request.get_json()
    print(res)
    postId = res["postId"]
    print(res)
    product = Post.query.filter(Post.id == postId).first()
    cart = ShoppingCart.query.filter(
        ShoppingCart.userId == current_user.id).first()
    cart_item = ShoppingCartPost(shopping_post=product, shopping=cart)
    db.session.add(cart_item)
    db.session.commit()
    return product.to_dict()


@cart.route('/', methods=['DELETE'])
def delete_post():
    postId = request.json
    # cart = ShoppingCart.query.filter(
    #     ShoppingCart.userId == current_user.id).first()
    # print(cart, "=-=-=-=-=-=-=-=-4=-34==34-=4")
    # certainPost = ShoppingCartPost.query.filter(
    #     and_(ShoppingCartPost.shoppingCartId == cart.id, ShoppingCartPost.postId == postId)).first()
    certainPost = ShoppingCartPost.query.get(postId)
    cart = ShoppingCart.query.filter(
        ShoppingCart.userId == current_user.id).first()
    certainPosts = ShoppingCartPost.query.filter(
        ShoppingCartPost.shoppingCartId == cart.id)
    db.session.delete(certainPost)
    db.session.commit()
    return {"post": [post.to_dict() for post in certainPosts]}
