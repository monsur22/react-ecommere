import React, { Component,useState ,useEffect}  from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from "axios";
import {Row, Col, Card} from 'react-bootstrap'
import Nav from './Nav';

const Home = () => {
	const [products, setProducts] = useState([])
	useEffect(() =>{

		const fetchProducts = async() =>{
			const {data} = await axios.get('/api/products')
			setProducts(data)
		}
		fetchProducts()
	},[])
	return (
		<div>
			<div class="top-brands">
				<div class="container">
					<h3>Hot Offers</h3>
					<div class="agile_top_brands_grids">
						{products.map(product => (
							<div class="col-md-3 top_brand_left">
								<div class="hover14 column">
									<div class="agile_top_brand_left_grid">
										<div class="agile_top_brand_left_grid1">
											<figure>
												<div class="snipcart-item block" >
													<div class="snipcart-thumb">
														<a href={`/product/${product._id}`}><img title=" " alt=" "heigth="140px"width="140px" src={product.image} /></a>
														<p>{product.name}</p>
														<h4>{product.price} </h4>
													</div>
													<div class="snipcart-details top_brand_home_details">
														<form action="checkout.html" method="post">
															<fieldset>
																<input type="submit" name="submit" value="Add to cart" class="button" />
															</fieldset>
														</form>

													</div>
												</div>
											</figure>
										</div>
									</div>
								</div>
							</div>
						))}

						<div class="clearfix"> </div>
					</div>
				</div>
			</div>


		</div>
	)
}

export default Home
