import {
	LOAD_PRODUCTS,
	SET_LISTVIEW,
	SET_GRIDVIEW,
	UPDATE_SORT,
	SORT_PRODUCTS,
	UPDATE_FILTERS,
	FILTER_PRODUCTS,
	CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
	switch (action.type) {
		case LOAD_PRODUCTS:
			let maxPrice = action.payload.map((p) => p.price);
			maxPrice = Math.max(...maxPrice);

			return {
				...state,
				all_products: [...action.payload],
				filtered_products: [...action.payload],
				filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
			};
		case SET_LISTVIEW:
			return { ...state, grid_view: false };
		case SET_GRIDVIEW:
			return { ...state, grid_view: true };
		case UPDATE_SORT:
			return { ...state, sort: action.payload.sort };
		case SORT_PRODUCTS:
			const { filtered_products } = state;
			let tempProducts = [];
			switch (state.sort) {
				case "price-lowest":
					tempProducts = filtered_products.sort((a, b) => a.price - b.price);
					break;
				case "price-highest":
					tempProducts = filtered_products.sort((a, b) => b.price - a.price);
					break;
				case "name-a":
					tempProducts = filtered_products.sort((a, b) => {
						return a.name.localeCompare(b.name);
					});
					break;
				case "name-z":
					tempProducts = filtered_products.sort((a, b) => {
						return b.name.localeCompare(a.name);
					});
					break;
				default:
			}
			return { ...state, filtered_products: tempProducts };
		case UPDATE_FILTERS:
			const { name, value } = action.payload;

			return {
				...state,
				filters: {
					...state.filters,
					[name]: value,
				},
			};
		case FILTER_PRODUCTS:
			const { all_products } = state;
			const { text, category, company, color, price, max_price, shipping } =
				state.filters;
			let filteredProducts = [...all_products];
			// filtering
			if (text) {
				filteredProducts = filteredProducts.filter((product) => {
					return product.name.toLowerCase().indexOf(text) > 0;
				});
			}
			if (category !== "all") {
				filteredProducts = filteredProducts.filter((product) => {
					return product.category === category;
				});
			}
			if (company !== "all") {
				filteredProducts = filteredProducts.filter((product) => {
					return product.company === company;
				});
			}
			if (color !== "all") {
				filteredProducts = filteredProducts.filter((product) => {
					return product.colors.find((c) => c === color);
				});
			}
			if (price !== max_price) {
				filteredProducts = filteredProducts.filter((product) => {
					return product.price <= price;
				});
			}
			if (shipping) {
				filteredProducts = filteredProducts.filter((product) => {
					return product.shipping;
				});
			}

			return { ...state, filtered_products: filteredProducts };
		case CLEAR_FILTERS:
			return {
				...state,
				filters: {
					...state.filters,
					text: "",
					company: "all",
					category: "all",
					color: "all",
					price: state.filters.max_price,
					shipping: false,
				},
			};
		default:
			throw new Error(`No Matching "${action.type}" - action type`);
	}
};

export default filter_reducer;
