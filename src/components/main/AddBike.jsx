import React, { useEffect, useRef, useState } from 'react';
import { stringToHTML } from "../../utils/stringToHTML";

import {
	Ripple,
	Input,
	initTE,
} from "tw-elements";
import { authorizedAxios } from '../../axios/axios';

function AddBike() {
	const images = useRef(null);
	const captureImage = useRef(null);
	const captureImages = useRef(null);

	const [bikeMeta, setBikeMeta] = useState({
		asking_price: null,
		year_of_model: null,
		engine_cc: null,
		engine_type: "",
		kms_run: null,
		no_of_owners: null,
		available: null,
		mileage: null,
		buy_year: null,
		color: "",
		details: ""
	});
	const [bikeImage, setBikeImage] = useState({
		name: "",
		b64: ""
	});
	const [bikeImages, setBikeImages] = useState([]);

	const [bike, setBike] = useState({
		bike_model: "",
		brand_name: "",
		bike_name: "",
		image_name: "",
		image_b64: "",
		bike_meta: [],
		bike_image: []
	});

	const fileToBase64 = (file) => {
		let reader = new FileReader();
		reader.readAsDataURL(file);
		return reader;
	}

	const addBike = async payload => {
		try {
			const res = await authorizedAxios.post("/admins/upload/", payload);
			console.log("res:", res);
			const data = res?.data;
			console.log("data:", data);
		} catch (err) {
			console.log("err:", err);
		}
	}

	const addNewBike = (e) => {
		e.preventDefault();
		bike.image_name = bikeImage.name;
		bike.image_b64 = bikeImage.b64;
		bike.bike_meta = [bikeMeta];
		bike.bike_image = bikeImages;
		console.log("Bike:", bike);
		addBike(bike);
		alert("A New Bike Posted");
		window.location.reload();
	}

	const handleBikeChange = e => {
		// setBike({ ...bike, [e.target.name]: e.target.value });

		setBike(prev => {
			return {
				...prev,
				[e.target.name]: e.target.value
			}
		});
	}

	useEffect(() => {
		let imagesContainer = images.current;
		let captureImageController = captureImage.current;
		let captureImagesController = captureImages.current;

		captureImageController.addEventListener('change', (ev) => {
			if (captureImageController.files[0]?.type.indexOf("image/") > -1) {
				const reader = fileToBase64(captureImageController.files[0]);
				reader.onload = () => {
					let image = captureImageController.files[0];
					console.log("DEKHTE HBE SINGLE:", captureImageController.files);
					// console.log("SINGLE FILE:", captureImageController.files[0], reader.result, bike);
					setBikeImage({ name: image.name, b64: reader.result });
				}
			}
		});

		captureImagesController.addEventListener('change', (ev) => {
			if (captureImagesController.files[0]?.type.indexOf("image/") > -1) {
				const element = `
				<p class="bg-black"><img src="${window.URL.createObjectURL(captureImagesController.files[0])}" class="h-52 w-full object-contain" /></p>
				`;
				imagesContainer.appendChild(stringToHTML(element));

				const reader = fileToBase64(captureImagesController.files[0]);
				reader.onload = () => {
					let image = captureImagesController.files[0];
					console.log("DEKHTE HBE MULTIPLE:", captureImagesController.files);
					// console.log("MULTIPLE FILES:", captureImagesController.files[0], reader.result, bike);
					setBikeImages(e => [...e, { image_name: image.name, image_b64: reader.result }])
				}
			}
		});
	}, []);

	useEffect(() => {
		initTE({ Ripple, Input }, { allowReinits: true });
	});

	return (
		<div className="px-4 md:px-6 lg:px-20 py-10 bg-slate-200">
			<div className="mx-auto max-w-2xl pt-2 pb-6 px-2 xs:px-4 sm:px-6 lg:max-w-7xl lg:px-8 rounded-md shadow-md shadow-slate-400 bg-white">
				<h1 className="py-4 font-bold text-center text-4xl [text-shadow:_1px_2px_0_rgb(0_0_0_/_40%)]">Post Your Bike</h1>
				<form onSubmit={addNewBike} className="py-4 sm:px-4 md:px-10 lg:px-20 space-y-6">
					<div className="relative font-roboto" data-te-input-wrapper-init>
						<input
							data-te-toggle="tooltip"
							value={bike.bike_model}
							name="bike_model"
							onChange={handleBikeChange}
							type="text"
							className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] md:py-[0.01rem] leading-[2.6] lg:leading-[3.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 font-medium text-blue-800"
							placeholder="Bike Model"
						/>
						<label className="font-roboto pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none">
							Bike Model <b className="text-red-600">*</b>
						</label>
					</div>
					<div className="relative font-roboto" data-te-input-wrapper-init>
						<input
							value={bike.brand_name}
							onChange={e => setBike({ ...bike, brand_name: e.target.value })}
							type="text"
							className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] md:py-[0.01rem] leading-[2.6] lg:leading-[3.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 font-medium text-blue-800"
							placeholder="Brand Name"
						/>
						<label className="font-roboto pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none">
							Brand Name <b className="text-red-600">*</b>
						</label>
					</div>
					<div className="relative font-roboto" data-te-input-wrapper-init>
						<input
							value={bike.bike_name}
							onChange={e => setBike({ ...bike, bike_name: e.target.value })}
							type="text"
							className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] md:py-[0.01rem] leading-[2.6] lg:leading-[3.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 font-medium text-blue-800"
							placeholder="Bike Name"
						/>
						<label className="font-roboto pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none">
							Bike Name <b className="text-red-600">*</b>
						</label>
					</div>
					<hr />
					<div className="">
						<div className="mb-2 text-lg font-semibold text-slate-600">Engine Information</div>
						<div className="flex flex-col sm:flex-row gap-6 sm:gap-10 w-full">
							<div className="relative font-roboto w-full" data-te-input-wrapper-init>
								<input
									value={bikeMeta.engine_cc}
									onChange={e => setBikeMeta({ ...bikeMeta, engine_cc: e.target.value })}
									type="number"
									className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] md:py-[0.01rem] leading-[2.6] lg:leading-[3.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 font-medium text-blue-800"
									placeholder="CC"
								/>
								<label className="font-roboto pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none">
									CC <b className="text-red-600">*</b>
								</label>
							</div>
							<div className="relative font-roboto w-full" data-te-input-wrapper-init>
								<input
									value={bikeMeta.engine_type}
									onChange={e => setBikeMeta({ ...bikeMeta, engine_type: e.target.value })}
									type="text"
									className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] md:py-[0.01rem] leading-[2.6] lg:leading-[3.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 font-medium text-blue-800"
									placeholder="Type"
								/>
								<label className="font-roboto pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none">
									Type <b className="text-red-600">*</b>
								</label>
							</div>
						</div>
					</div>
					<hr />
					<div className="">
						<div className="mb-2 text-lg font-semibold text-slate-600">Timeline</div>
						<div className="flex flex-col sm:flex-row gap-6 sm:gap-10 w-full">
							<div className="relative font-roboto w-full" data-te-input-wrapper-init>
								<input
									value={bikeMeta.year_of_model}
									onChange={e => setBikeMeta({ ...bikeMeta, year_of_model: e.target.value })}
									type="number"
									className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] md:py-[0.01rem] leading-[2.6] lg:leading-[3.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 font-medium text-blue-800"
									placeholder="Year of Model"
								/>
								<label className="font-roboto pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none">
									Year of Model <b className="text-red-600">*</b>
								</label>
							</div>
							<div className="relative font-roboto w-full" data-te-input-wrapper-init>
								<input
									value={bikeMeta.buy_year}
									onChange={e => setBikeMeta({ ...bikeMeta, buy_year: e.target.value })}
									type="text"
									className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] md:py-[0.01rem] leading-[2.6] lg:leading-[3.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 font-medium text-blue-800"
									placeholder="Year of Purchase"
								/>
								<label className="font-roboto pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none">
									Year of Purchase <b className="text-red-600">*</b>
								</label>
							</div>
						</div>
					</div>
					<hr />
					<div className="relative font-roboto" data-te-input-wrapper-init>
						<input
							value={bikeMeta.kms_run}
							onChange={e => setBikeMeta({ ...bikeMeta, kms_run: e.target.value })}
							type="number"
							className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] md:py-[0.01rem] leading-[2.6] lg:leading-[3.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 font-medium text-blue-800"
							placeholder="Kilometers Covered"
						/>
						<label className="font-roboto pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none">
							Kilometers Covered <b className="text-red-600">*</b>
						</label>
					</div>
					<div className="relative font-roboto" data-te-input-wrapper-init>
						<input
							value={bikeMeta.mileage}
							onChange={e => setBikeMeta({ ...bikeMeta, mileage: e.target.value })}
							type="number"
							className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] md:py-[0.01rem] leading-[2.6] lg:leading-[3.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 font-medium text-blue-800"
							placeholder="Mileage"
						/>
						<label className="font-roboto pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none">
							Mileage <b className="text-red-600">*</b>
						</label>
					</div>
					<div className="relative font-roboto" data-te-input-wrapper-init>
						<input
							value={bikeMeta.available}
							onChange={e => setBikeMeta({ ...bikeMeta, available: e.target.value })}
							type="number"
							className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] md:py-[0.01rem] leading-[2.6] lg:leading-[3.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 font-medium text-blue-800"
							placeholder="Available Quantity"
						/>
						<label className="font-roboto pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none">
							Available Quantity <b className="text-red-600">*</b>
						</label>
					</div>
					<div className="relative font-roboto" data-te-input-wrapper-init>
						<input
							value={bikeMeta.no_of_owners}
							onChange={e => setBikeMeta({ ...bikeMeta, no_of_owners: e.target.value })}
							type="number"
							className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] md:py-[0.01rem] leading-[2.6] lg:leading-[3.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 font-medium text-blue-800"
							placeholder="Number of Owners"
						/>
						<label className="font-roboto pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none">
							Number of Owner(s) <b className="text-red-600">*</b>
						</label>
					</div>
					<div className="relative font-roboto" data-te-input-wrapper-init>
						<input
							value={bikeMeta.color}
							onChange={e => setBikeMeta({ ...bikeMeta, color: e.target.value })}
							type="text"
							className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] md:py-[0.01rem] leading-[2.6] lg:leading-[3.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 font-medium text-blue-800"
							placeholder="Color"
						/>
						<label className="font-roboto pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none">
							Color <b className="text-red-600">*</b>
						</label>
					</div>
					<div className="relative font-roboto" data-te-input-wrapper-init>
						<input
							value={bikeMeta.asking_price}
							onChange={e => setBikeMeta({ ...bikeMeta, asking_price: e.target.value })}
							type="number"
							className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] md:py-[0.01rem] leading-[2.6] lg:leading-[3.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 font-medium text-blue-800"
							placeholder="Asking Price"
						/>
						<label className="font-roboto pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none">
							Asking Price <b className="text-red-600">*</b>
						</label>
					</div>
					<div className="font-roboto">
						<div className="mb-2 text-lg font-semibold text-slate-600">Description</div>
						<textarea
							value={bikeMeta.details}
							onChange={e => setBikeMeta({ ...bikeMeta, details: e.target.value })}
							rows={3}
							className="p-3 w-full rounded outline outline-1 outline-slate-400 focus:outline focus:outline-2 focus:outline-blue-800"
							placeholder='Anything else...'
						></textarea>
					</div>
					<div className="">
						<h2 className="mb-2 text-lg font-semibold text-slate-600">Profile Image:</h2>
						<div>
							<input type="file" ref={captureImage} accept="image/*" />
						</div>
					</div>
					<div className="">
						<h2 className="mb-2 text-lg font-semibold text-slate-600">Add Slide Images:</h2>
						<div className="mb-2">
							<input type="file" ref={captureImages} accept="image/*" />
						</div>
						<div ref={images} className="space-y-4"></div>
					</div>
					<div className="flex justify-center">
						<button type="submit" className="px-6 py-2 uppercase rounded-md hover:scale-125 duration-300 font-medium text-white bg-blue-800">submit</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default AddBike;
