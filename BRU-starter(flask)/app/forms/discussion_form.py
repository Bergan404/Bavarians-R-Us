from flask_wtf import FlaskForm
from wtforms.validators import DataRequired, ValidationError
from app.models.user import Discussion
from datetime import datetime
from wtforms import StringField, DateField, IntegerField, TextAreaField


def discussion_exists(form, field):
    print("Checking if discussion exits", field.data)
    name = field.data
    discussion = discusssion.query.filter(Discussion.name == name).first()
    if not name:
        raise ValidationError("Name provided was not valid.")


class DiscussionForm(FlaskForm):
    discussion_title = StringField('discussion_title', validators=[DataRequired()])
    body = TextAreaField('body', validators=[DataRequired()])
    image = StringField('image')
    userId = IntegerField('userId')
    created_at = DateField('created_at', default=datetime.now())
