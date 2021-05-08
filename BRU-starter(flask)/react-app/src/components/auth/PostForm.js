import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { postCreate } from '../../store/post_create'

const PostForm = () => {
    const history = useHistory()
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const [postTitle, setPostTitle] = useState('');
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState('');
    const [year, setYear] = useState('');
    const [model, setModel] = useState('');
    const [price, setPrice] = useState('');
    const [inStock, setInStock] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [newUsed, setNewUsed] = useState(false);


    const onPostCreation = async (e) => {
        e.preventDefault();
        const data = await dispatch(postCreate(postTitle, image, description, year, model, price, inStock, newUsed, categoryId));
        if (data) {
            history.push(`/posts/${data.id}`);
        }
    }

    const updateTitle = (e) => {
        setPostTitle(e.target.value);
    }

    const updateImage = (e) => {
        // const file = e.target.files[0];
        // setImage(file)
        setImage(e.target.value);
    }

    const updateDescription = (e) => {
        setDescription(e.target.value);
    }

    const updateYear = (e) => {
        setYear(e.target.value);
    }

    const updateModel = (e) => {
        setModel(e.target.value);
    }

    const updatePrice = (e) => {
        setPrice(e.target.value);
    }

    const updateInStock = (e) => {
        setInStock(e.target.value);
    }

    const updateNewUsed = (e) => {
        setNewUsed(e.target.value);
    }

    return (
        <form onSubmit={onPostCreation}>
            <div>
                {errors.map((error) => (
                    <div>{error}</div>
                ))}
            </div>
            <div className='server_div'>
                <label htmlFor="postTitle">Post Title</label>
                <input
                    name="postTitle"
                    type="text"
                    placeholder="Post title"
                    value={postTitle}
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
                <label htmlFor="description">Description</label>
                <input
                    name="description"
                    type="text"
                    value={description}
                    onChange={updateDescription}
                    className='server_input'
                />
            </div>
            <div className='server_div'>
                <label htmlFor="year">Year</label>
                <input
                    name="year"
                    type="text"
                    value={year}
                    onChange={updateYear}
                    className='server_input'
                />
            </div>
            <div className='server_div'>
                <label htmlFor="model">Model</label>
                <input
                    name="model"
                    type="text"
                    value={model}
                    onChange={updateModel}
                    className='server_input'
                />
            </div>
            <div className='server_div'>
                <label htmlFor="price">Price</label>
                <input
                    name="price"
                    type="text"
                    value={price}
                    onChange={updatePrice}
                    className='server_input'
                />
            </div>
            <div className='server_div'>
                <label htmlFor="inStock">In Stock</label>
                <input
                    name="inStock"
                    type="text"
                    value={inStock}
                    onChange={updateInStock}
                    className='server_input'
                />
            </div>
            <div className='server_div'>
                <label htmlFor="newUsed">New or Used</label>
                <input
                    name="newUsed"
                    type="checkbox"
                    value={newUsed}
                    onChange={updateNewUsed}
                    className='server_input_checkbox'
                />
            </div>
            <div className="create">
                <button className="server-button" type="submit">Create Post</button>
            </div>
        </form>
    )
}

export default PostForm;
