import React, { Component,useState ,useEffect }from 'react'
import axios from "axios";
import products from "../../products"
const Single = ({ match }) => {
	// const [product, setProducts] = useState([])
	// useEffect(() =>{

	// 	const fetchProducts = async() =>{
	// 		const {data} = await axios.get(`/api/products/${match.params.id}`)
	// 		setProducts(data)
	// 	}
	// 	fetchProducts()
	// },[])
	const product =products.find(p => p.id === match.params.id)

    return (
        <div>

			<div class="agileinfo_single">
				<h5>charminar pulao basmati rice 5 kg</h5>
				<div class="col-md-4 agileinfo_single_left">
					<img id="example" src="images/76.png" alt=" " class="img-responsive" />
				</div>
				<div class="col-md-8 agileinfo_single_right">
					<div class="rating1">
						<span class="starRating">
							<input id="rating5" type="radio" name="rating" value="5"/>
							<label for="rating5">5</label>
							<input id="rating4" type="radio" name="rating" value="4"/>
							<label for="rating4">4</label>
							<input id="rating3" type="radio" name="rating" value="3" checked/>
							<label for="rating3">3</label>
							<input id="rating2" type="radio" name="rating" value="2"/>
							<label for="rating2">2</label>
							<input id="rating1" type="radio" name="rating" value="1"/>
							<label for="rating1">1</label>
						</span>
					</div>
					<div class="w3agile_description">
						<h4>Description :</h4>
						<p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
							officia deserunt mollit anim id est laborum.Duis aute irure dolor in
							reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
							pariatur.</p>
					</div>
					<div class="snipcart-item block">
						<div class="snipcart-thumb agileinfo_single_right_snipcart">
							<h4>$21.00 <span>$25.00</span></h4>
						</div>
						<div class="snipcart-details agileinfo_single_right_details">
							<form action="#" method="post">
								<fieldset>
									<input type="submit" name="submit" value="Add to cart" class="button" />
								</fieldset>
							</form>
						</div>
					</div>
				</div>
				<div class="clearfix"> </div>
			</div>

        </div>
    )
}

export default Single
