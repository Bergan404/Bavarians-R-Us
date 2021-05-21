import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

import './login-signup.css';

const ShippingForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);

  const onShipping = async (e) => {
    e.preventDefault();
    alert("Address saved!")
  };

  return (
      <form onSubmit={onShipping} className="shipping_form" >
        <div className="shipping_divs" >
          <label className="shipping_labels" >Address</label>
          <input
            type="text"
            name="address"
            className="shipping_inputs"
          ></input>
        </div>
        <div className="shipping_divs">
          <label className="shipping_labels">Zip Code</label>
          <input
            type="text"
            name="zip"
            className="shipping_inputs"
          ></input>
        </div>
        <div className="shipping_divs">
          <label className="shipping_labels">City</label>
          <input
            type="text"
            name="state"
            className="shipping_inputs"
          ></input>
        </div>
        <div className="shipping_divs">
          <label className="shipping_labels">State</label>
          <input
            type="text"
            name="state"
            className="shipping_inputs"
          ></input>
        </div>
        <button type="submit" className="shipping_save" >Save Address</button>
      </form>
  );
};

export default ShippingForm;
