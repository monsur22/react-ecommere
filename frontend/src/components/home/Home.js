import React, { Component,useState ,useEffect}  from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from "axios";
// import products from "../../products"
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
					<h1>Latest Products</h1>
					<Row>
						{products.map(product => (
							<Col sm={12} md={6} lg={4}>
								<h3>{product.name}</h3>
								<Card className='my-3 p-3 rounded'>
									<a href={'/product/${product._id}'}>
										<Card.Img src={product.image} variant='top'/>
									</a>
								</Card>

							</Col>
						))}
					</Row>
					<div class="agile_top_brands_grids">
						<div class="col-md-3 top_brand_left">
							<div class="hover14 column">
								<div class="agile_top_brand_left_grid">
									<div class="tag"><img src="../../home/images/tag.png" alt=" " class="img-responsive" /></div>
									<div class="agile_top_brand_left_grid1">
										<figure>
											<div class="snipcart-item block" >
												<div class="snipcart-thumb">
													<a href="single.html"><img title=" " alt=" " src="../../home/images/1.png" /></a>
													<p>fortune sunflower oil</p>
													<h4>$7.99 <span>$10.00</span></h4>
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



						<div class="clearfix"> </div>
					</div>
				</div>
			</div>


		</div>
	)
}

export default Home
