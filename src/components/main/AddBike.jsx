import React, { useEffect, useRef } from 'react';
import { stringToHTML } from "../../utils/stringToHTML";

function AddBike() {
	const images = useRef(null);
	const capture = useRef(null);

	const fileToBase64 = (file) => {
		let reader = new FileReader();
		reader.readAsDataURL(file);
		return reader;
	}

	useEffect(() => {
		let input = capture.current;
		let imageContainer = images.current;

		input.addEventListener('change', (ev) => {
			console.dir(input.files[0]);

			if (input.files[input.files.length - 1]?.type.indexOf("image/") > -1) {
				const element = `
				<p class="bg-black"><img src="${window.URL.createObjectURL(input.files[input.files.length - 1])}" class="h-52 w-full object-contain" /></p>
				`;
				imageContainer.appendChild(stringToHTML(element));

				const reader = fileToBase64(input.files[input.files.length - 1]);
				reader.onload = () => {
					console.log(reader.result);
				}
			}
		})
	}, []);

	return (
		<div className="sm:px-4 md:px-6 lg:px-20 py-10 bg-slate-400">
			<div className="mx-auto max-w-2xl pt-2 pb-6 px-2 xs:px-4 sm:px-6 lg:max-w-7xl lg:px-8 rounded bg-white">
				<h1 className="py-4 font-bold text-center text-4xl [text-shadow:_1px_2px_0_rgb(0_0_0_/_40%)]">Post Your Bike</h1>
				<form className="py-4 sm:px-4 md:px-10 lg:px-20 space-y-6 bg-red-400">
					<div className="flex w-full space-x-2 bg-blue-400">
						<div className="w-32">Bike Model:</div>
						<div className="w-full"><input type="text" className="w-full" /></div>
					</div>
					<div className="flex w-full space-x-2 bg-blue-400">
						<div className="w-32">Price:</div>
						<div className="relative w-full flex"><input type="text" className="w-[80%] sm:w-[70%] md:w-[65%] lg:w-[45%]" /></div>
					</div>
					<div className="flex w-full space-x-2 bg-sky-400">
						<div className="w-32">Image:</div>
						<div className="w-full">
							<input type="file" className="w-full" accept="image/*" />
						</div>
					</div>
					{/* <div className="flex w-full space-x-2 bg-blue-400">
						<div className="w-32">Phone Number:</div>
						<div className="relative w-full flex"><input type="text" className="w-[80%] sm:w-[70%] md:w-[65%] lg:w-[45%]" /></div>
					</div> */}
					<div className="flex w-full space-x-2 bg-blue-400">
						<div className="w-32">Location:</div>
						<div className="w-full"><input type="text" className="w-full" /></div>
					</div>
					<div className="flex w-full space-x-2 bg-blue-400">
						<div className="w-32">Description:</div>
						<div className="w-full"><textarea name="" rows={(window.innerWidth >= 640) ? 5 : 3} className="w-full"></textarea></div>
					</div>
					<div className="bg-teal-400">
						<h2 className="mb-2 font-medium text-xl">Add Slide Images:</h2>
						<div className={"mb-2 bg-yellow-400"}>
							<input type="file" ref={capture} accept="image/*" />
						</div>
						<div ref={images} className="space-y-4"></div>
					</div>
					<div className="flex justify-center">
						<button type="submit" className="px-6 py-2 uppercase font-bold rounded-md bg-white">submit</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default AddBike;
