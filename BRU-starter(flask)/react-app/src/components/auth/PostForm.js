import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { postCreate } from '../../store/post_create'

const PostForm = () => {
    const history = useHistory()
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories.categories)

    const [errors, setErrors] = useState([]);
    const [postTitle, setPostTitle] = useState('');
    const [image, setImage] = useState(null);
    // const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [year, setYear] = useState('');
    const [model, setModel] = useState('');
    const [price, setPrice] = useState('$');
    const [inStock, setInStock] = useState('');
    const [categoryId, setCategoryId] = useState("");
    const [newUsed, setNewUsed] = useState(false);


    const onPostCreation = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);

        const data = await dispatch(postCreate(postTitle, image, description, year, model, price, inStock, newUsed, categoryId));
        if (data) {
            history.push(`/posts/${data.id}`);
        }
    }

    const updateTitle = (e) => {
        setPostTitle(e.target.value);
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file)
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

    const updateCategory = (e) => {
        setCategoryId(e.target.value);
    }

    return (
        <div className="post_background" >
            <br></br>
            <br></br>
            <form onSubmit={onPostCreation} className="post_form">
                <div>
                    {errors.map((error) => (
                        <div>{error}</div>
                    ))}
                </div>
                <div className='post_div'>
                    <label htmlFor="postTitle" className="post_label">Post Title</label>
                    <input
                        name="postTitle"
                        type="text"
                        value={postTitle}
                        onChange={updateTitle}
                        className='post_input'
                    />
                </div>
                <div className='post_div'>
                    <label htmlFor="image" className="post_label_image">Image :</label>
                    <input
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={updateImage}
                        className='post_input_image'
                    />
                </div>
                <div className='post_div'>
                    <label htmlFor="description" className="post_label">Description</label>
                    <textarea name="description" value={description} onChange={updateDescription} className='discussion_text'/>
                </div>
                <div className='post_div'>
                    <label htmlFor="year" className="post_label">Year</label>
                    <input
                        name="year"
                        type="text"
                        value={year}
                        onChange={updateYear}
                        className='post_input'
                    />
                </div>
                <div className='post_div'>
                    <label htmlFor="model" className="post_label">Model</label>
                    <input
                        name="model"
                        type="text"
                        value={model}
                        onChange={updateModel}
                        className='post_input'
                    />
                </div>
                <div className='post_div'>
                    <label htmlFor="price" className="post_label">Price</label>
                    <input
                        name="price"
                        type="text"
                        value={price}
                        onChange={updatePrice}
                        className='post_input_price'
                    />
                </div>
                <div className='post_div'>
                    <label htmlFor="inStock" className="post_label">In Stock</label>
                    <input
                        name="inStock"
                        type="text"
                        value={inStock}
                        onChange={updateInStock}
                        className='post_input_stock'
                    />
                </div>
                <div className='post_div'>
                    <label htmlFor="newUsed" className="post_label_new_used">New or Used</label>
                    <input
                        name="newUsed"
                        type="checkbox"
                        value={newUsed}
                        onChange={updateNewUsed}
                        className='post_input_checkbox'
                    />
                </div>
                <div className='post_div'>
                    <label className="post_label_category">Category</label>
                    <select
                        name='category'
                        value={categoryId}
                        onChange={updateCategory}
                        className="post_input_select"
                    >
                        {
                            categories?.length && categories.map((category) => (
                                <option value={category.id} className="post_option">{category.category}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="create">
                    <button className="post-button" type="submit">Create Post</button>
                </div>
            </form>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </div>
    )
}

export default PostForm;
