import { useDispatch, useSelector } from "react-redux"
import { removeItems, IncreseItems, decreaseItem } from "../redux_tools/Slicer"

const CartList = () => {

    const dispatch = useDispatch()
    const cartSelector = useSelector((state) => state.cart.items)
    console.log(cartSelector)

    // const totalPrice = cartSelector.reduce((sum, item) => sum + item.price, 0)


  const totalPrice = cartSelector.reduce((sum, item) => {
    const price = Number(item.price);
    const quantity =Number(item.quantity);
    return sum + price * quantity;
}, 0);

    return (
        <div>

            <div>
                <div className="container mx-auto p-6">
                    <h1 className="text-2xl content-center font-bold mb-6">Your Cart</h1>

                    <div className="space-y-6">
                        {
                            cartSelector.length > 0 ? cartSelector.map((item) => (
                                <div key={item.id}>
                                   <div className="flex flex-col md:flex-row md:items-center justify-between bg-white p-4 rounded shadow space-y-4 md:space-y-0">
    <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-4 space-y-2 sm:space-y-0 w-full">
        <img
            src={item.image}
            alt={item.title}
            className="w-24 h-24 object-contain rounded mx-auto sm:mx-0"
        />
        <div className="text-center sm:text-left">
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="text-gray-700">${item.price}</p>
            <p className="text-gray-700">Rating: {item.rating.rate}</p>
        </div>
    </div>

    <div className="flex flex-col sm:flex-row items-center justify-between sm:space-x-4 w-full sm:w-auto">
        <div className="flex items-center space-x-2 mb-2 sm:mb-0">
            <button
                onClick={() => dispatch(decreaseItem(item))}
                className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
            >
                -
            </button>
            <span className="text-lg font-medium">{item.quantity || 1}</span>
            <button
                onClick={() => dispatch(IncreseItems(item))}
                className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
            >
                +
            </button>
        </div>
        <p className="text-lg font-semibold mb-2 sm:mb-0">
            ${(item.quantity ? item.price * item.quantity : item.price).toFixed(2)}
        </p>
        <button
            onClick={() => dispatch(removeItems(item))}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
            Remove
        </button>
    </div>
</div>
                                </div>
                            )) : (
                                <p className="text-gray-600">Your cart is empty.</p>
                            )
                        }

                        <div className="text-right mt-8">
                            <h2 className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CartList