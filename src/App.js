import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";
//import { useProductsContext } from ".//context/products_context";
import {
	About,
	Products,
	SingleProduct,
	Cart,
	Home,
	Error,
	PrivateRoute,
	Checkout,
	AuthWrapper,
} from "./pages";

function App() {
	return (
		<AuthWrapper>
			<Router>
				<Navbar />
				<Sidebar />
				<Routes>
					<Route index element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/products">
						<Route index element={<Products />} />
						<Route path=":id" element={<SingleProduct />} />
					</Route>
					<Route
						path="/checkout"
						element={
							<PrivateRoute>
								<Checkout />
							</PrivateRoute>
						}
					/>
					<Route path="*" element={<Error />} />
				</Routes>
				<Footer />
			</Router>
		</AuthWrapper>
	);
}

export default App;
