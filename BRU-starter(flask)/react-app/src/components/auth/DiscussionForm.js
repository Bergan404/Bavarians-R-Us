import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { discussionCreate } from '../../store/discussion_create'

const DiscussionForm = () => {
    const history = useHistory()
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const [discussionTitle, setDiscussionTitle] = useState('')
    const [body, setBody] = useState('');
    const [image, setImage] = useState(null);


    const onDiscussionCreation = async (e) => {
        e.preventDefault();
        const data = await dispatch(discussionCreate(discussionTitle, body, image));
        // if (data) {
        //     history.push(`/server/${data.id}`);
        // }
    }

    const updateTitle = (e) => {
        setDiscussionTitle(e.target.value);
    }

    const updateImage = (e) => {
        // const file = e.target.files[0];
        // setImage(file)
        setImage(e.target.value);
    }

    const updateBody = (e) => {
        setBody(e.target.value);
    }


    return (
        <form onSubmit={onDiscussionCreation}>
            <div>
                {errors.map((error) => (
                    <div>{error}</div>
                ))}
            </div>
            <div className='server_div'>
                <label htmlFor="discussionTitle">Discussion Title</label>
                <input
                    name="discussionTitle"
                    type="text"
                    placeholder="Discussion title"
                    value={discussionTitle}
                    onChange={updateTitle}
                    className='server_input'
                />
            </div>
            <div className='server_div'>
                <label htmlFor="image">Image</label>
                <input
                    name="image"
                    type="text"
                    value={image}
                    // type="file"
                    // accept="image/*"
                    onChange={updateImage}
                    className='server_input_image'
                />
            </div>
            <div className='server_div'>
                <label htmlFor="body">Body</label>
                <input
                    name="body"
                    type="text"
                    value={body}
                    onChange={updateBody}
                    className='server_input'
                />
            </div>
            <div className="create">
                <button className="server-button" type="submit">Create Discussion</button>
            </div>
        </form>
    )
}

export default DiscussionForm;
