import React from 'react'
import AddCart from '../assets/add-to-cart.png';
import {useSelector} from 'react-redux'
import { Link } from "react-router";
const AddToCart = () => {

    const cardselector= useSelector((state)=>state.cart.items)
console.log(cardselector)

//     const selector= useSelector((state)=>state.cart.value)
// console.log(selector)
    return (


        <div>
            <div className="relative">
               <Link to='cartlist'>
                <img src={AddCart} alt="Cart" className="h-8 w-8" />

                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1">
                        {cardselector.length?cardselector.length:0}
                    </span>
               </Link>
            
            </div>

        </div>
    )
}

export default AddToCart