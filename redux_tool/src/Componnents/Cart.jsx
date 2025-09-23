
import { useDispatch, useSelector } from 'react-redux'

import { addItems, removeItems } from '../redux_tools/Slicer';
import { fetchProduct } from '../redux_tools/ProductApi';
import { useEffect } from 'react';

const Cart = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProduct())
  }, [dispatch])

  const Productselector = useSelector((state) => state.products.items);

  console.log(Productselector)



  const cardselector = useSelector((state) => state.cart.items)
  console.log(cardselector)

  return (

    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {
          Productselector && Productselector.length > 0 ? (
            Productselector.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-contain rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-xl font-bold text-gray-900 mb-4">${item.price}</p>
                <div className="flex space-x-4">
                  
                  {/* <button
                    onClick={() => dispatch(removeItems(item.id))}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  >
                    Remove
                  </button> */}

                  {
                    cardselector.find(cardItem => cardItem.id === item.id) ?
                      //   <button
                      //    disabled
                      //   className="bg-blue-200 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                      // >
                      //   Added  Item 
                      // </button>
                      <button
                        onClick={() => dispatch(removeItems(item))}
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-600"
                      >
                        Remove Item
                      </button>


                      :
                      <button
                        onClick={() => dispatch(addItems(item))}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                      >
                        Add Item
                      </button>


                  }

                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-3">Loading products...</p>
          )
        }
      </div>
    </div>

  );
};

export default Cart;
