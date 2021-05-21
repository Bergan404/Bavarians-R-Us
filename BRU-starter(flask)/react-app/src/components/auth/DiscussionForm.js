import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { discussionCreate } from '../../store/discussion_create'

import './discussion_post.css';

const DiscussionForm = () => {
    const history = useHistory()
    const dispatch = useDispatch();
    const [discussionTitle, setDiscussionTitle] = useState('')
    const [body, setBody] = useState('');
    const [image, setImage] = useState(null);


    const onDiscussionCreation = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);

        const data = await dispatch(discussionCreate(discussionTitle, body, image));
        if (data) {
            history.push(`/discussion/${data.id}`);
        }
    }

    const updateTitle = (e) => {
        setDiscussionTitle(e.target.value);
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file)
    }

    const updateBody = (e) => {
        setBody(e.target.value);
    }


    return (
        <div className="discussion_background">
            <form onSubmit={onDiscussionCreation} className="discussion_form">
                <div className='discussion_div'>
                    <label htmlFor="discussionTitle" className="discussion_label">Discussion Title</label>
                    <input
                        name="discussionTitle"
                        type="text"
                        value={discussionTitle}
                        onChange={updateTitle}
                        className='discussion_input'
                    />
                </div>
                <div className='discussion_div'>
                    <label htmlFor="image" className="discussion_label">Image :</label>
                    <input
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={updateImage}
                        className='discussion_input_image'
                    />
                </div>
                <div className='discussion_div'>
                    <label htmlFor="body" className="discussion_label">Body</label>
                    <textarea name="body" value={body} onChange={updateBody} className='discussion_text'/>
                </div>
                <div className="create">
                    <button className="discussion-button" type="submit">Create Discussion</button>
                </div>
            </form>

        </div>
    )
}

export default DiscussionForm;
