from flask_wtf import FlaskForm
from wtforms.validators import DataRequired, ValidationError
from datetime import datetime
from wtforms import DateTimeField, IntegerField, TextAreaField


class UserReplyForm(FlaskForm):
    userId = IntegerField('userId')
    replyId = IntegerField('replyId')
    body = TextAreaField('body', validators=[DataRequired()])
    created_at = DateTimeField('created_at', default=datetime.now())
