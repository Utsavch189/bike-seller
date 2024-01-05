import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import App from "../App";
import AddBike from "../components/main/AddBike";
import AdminLogin from "../components/main/AdminLogin";
import Page404 from "../components/Page404/Page404";
import Products from "../pages/Products";
import SpeceficProduct from "../pages/SpeceficProduct";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<App />}>
				<Route path="" element={<Products />} />
				<Route path="add-bike" element={<ProtectedRoute children={<AddBike />} />} />
				<Route path="bike" element={<SpeceficProduct />} />
				<Route path="*" element={<Page404 />} />
			</Route>
			<Route path="/admin-login" element={<AdminLogin />} />
		</>
	)
);

export default router;
