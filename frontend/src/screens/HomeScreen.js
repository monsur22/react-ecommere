import React, {  useEffect} from 'react'

import Product from '../pages/Product';
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productAction';

  const HomeScreen = ({match}) => {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    const keyword = match.params.keyword

    useEffect(() => {
      dispatch(listProducts(keyword))
    }, [dispatch, keyword])


  return (
    <div>

      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <div className="row center">
          {products.map((product) => (
            <Product key={ Math.random().toString(36).substr(2, 9) } product={product}/> // key use for remove warning in console
            ))}

        </div>
      )}

    </div>
  );
}
export default HomeScreen
