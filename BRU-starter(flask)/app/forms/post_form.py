from flask_wtf import FlaskForm
from wtforms.validators import DataRequired, ValidationError
from app.models.user import Post
from datetime import datetime
from wtforms import StringField, BooleanField, DateField, IntegerField, TextAreaField


def post_exists(form, field):
    print("Checking if post exits", field.data)
    name = field.data
    post = post.query.filter(Post.name == name).first()
    if not name:
        raise ValidationError("Name provided was not valid.")


class PostForm(FlaskForm):
    post_title = StringField('post_title', validators=[DataRequired()])
    image = StringField('image')
    description = TextAreaField('description', validators=[DataRequired()])
    year = StringField('year', validators=[DataRequired()])
    model = StringField('model', validators=[DataRequired()])
    price = StringField('price', validators=[DataRequired()])
    in_stock = StringField('in_stock')
    new_used = BooleanField("new_used", false_values=None)
    userId = IntegerField("userId")
    categoryId = IntegerField("categoryId")
    created_at = DateField('created_at', default=datetime.now())
