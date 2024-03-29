import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { domain, authorizedAxios } from '../../axios/axios';
import { formattedPrice } from "../../utils/formattedPrice";
import toast from 'react-hot-toast';
import noImage from "../../assets/no-image.jpg";
import RootContext from '../../context/RootContext';
import ProductContext from "../../context/ProductContext";

function Card({ product }) {
  const productContext = useContext(ProductContext);
  const rootContext = useContext(RootContext);
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteBike = async payload => {
    try {
      const res = await authorizedAxios.delete("/admins/delete/", { data: payload });
      console.log("res:", res);
      const data = res?.data;
      console.log("data:", data);

      productContext.getBikes(productContext.currentPageNumber, productContext.itemsPerPage);
      setIsDeleting(false);
      toast.success("Bike is deleted");
    } catch (err) {
      console.log("err:", err);
      setIsDeleting(false);
      toast.success("Something went wrong. Bike couldn't be deleted");
    }
  }

  const deleteABike = e => {
    e.preventDefault();
    const payload = {
      model_id: product?.bike_model_id
    }
    const reply = window.confirm("Are you confirm to delete this product?");

    if (reply) {
      setIsDeleting(true);
      deleteBike(payload);
    }
  }

  return (
    <Link className="group p-2 rounded outline outline-1 outline-slate-300 bg-white" to={`/bike?bike_model_id=${product?.bike_model_id}&bike_model=${product?.bike_model}&brand_name=${product?.brand_name}&bike_name=${product?.bike_name}`}>
      <div className="h-52 mb-4">
        {
          product?.image_path === "" ?
            <img src={noImage} alt="" className="h-full w-full object-cover object-center duration-100 group-hover:opacity-75" /> :
            <img src={`${domain + product?.image_path}`} alt="" className="h-full w-full object-cover object-center duration-100 group-hover:opacity-75" />
        }
      </div>
      <div className="px-2">
        <h3 className="text-xl font-bold text-green-950">₹ {formattedPrice(product?.bike_meta[0]?.asking_price)}</h3>
        <h5 className="py-2 leading-5 font-medium text-green-950">{product?.brand_name}, {product?.bike_model} ({product?.bike_meta[0]?.engine_cc} CC)</h5>
        <h5 className="text-sm text-green-950">{product?.bike_meta[0]?.buy_year} - {formattedPrice(product?.bike_meta[0]?.kms_run)} km</h5>
        <div className="truncate text-sm text-slate-600">{product?.bike_meta[0]?.details}</div>
      </div>
      {
        rootContext?.isLogin &&
        <div className="p-2 flex justify-between items-center">
          <Link to={`/update-bike?bike_model_id=${product?.bike_model_id}&bike_model=${product?.bike_model}&brand_name=${product?.brand_name}&bike_name=${product?.bike_name}`}>
            <button className="px-3 py-2 rounded-sm outline outline-1 outline-slate-300 bg-gray-100">
              <i className="fa-solid fa-pen text-2xl text-blue-600"></i>
            </button>
          </Link>
          {
            isDeleting ?
              <div className="flex flex-col items-center">
                <div className="mr-1.5 delete-spinner"></div>
                <div className="text-[0.7rem] italic text-red-600">Deleting...</div>
              </div> :
              <button onClick={deleteABike} className="px-3 py-2 rounded-sm outline outline-1 outline-slate-300 bg-gray-100">
                <i className="fa-solid fa-trash text-2xl text-red-600"></i>
              </button>
          }
        </div>
      }
    </Link>
  )
}

export default Card;
