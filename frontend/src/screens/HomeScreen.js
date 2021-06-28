import React from 'react';
import Product from '../pages/Product';
import products from '../products.js';

  const HomeScreen = () => {
  return (
    <div>
      <div className="row center">
      {products.map(product => (
				<Product product={product}/>
				))}
        
      </div>
    </div>
  );
}
export default HomeScreen
