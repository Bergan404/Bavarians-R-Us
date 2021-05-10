from flask_wtf import FlaskForm
from wtforms.validators import DataRequired, ValidationError
from app.models.user import Discussion
from datetime import datetime
from wtforms import DateField, IntegerField, TextAreaField


class ReviewForm(FlaskForm):
    userId = IntegerField('userId')
    postId = IntegerField('postId')
    body = TextAreaField('body', validators=[DataRequired()])
    created_at = DateField('created_at', default=datetime.now())
