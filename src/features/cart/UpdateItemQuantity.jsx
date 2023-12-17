import React from 'react'
import Button from '../../ui/Button'
import { useDispatch } from 'react-redux'
import { decreasingItemQuantity, increasingItemQuantity } from './cartSlice';

export default function UpdateItemQuantity({
    pizzaId, currentQuantity
}) {

 const dispatch = useDispatch();
  return (
    <div className='flex gap-1 items-center md:gap-3'><Button type="round" onClick={()=> dispatch(decreasingItemQuantity(pizzaId))}>-</Button>
    <span>{currentQuantity}</span>
    <Button type="round" onClick={()=> dispatch(increasingItemQuantity(pizzaId))}>+</Button></div>
    
  )
}
