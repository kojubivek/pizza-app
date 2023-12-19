import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from '../../store';
import {formatCurrency} from '../../utils/helpers'
import { fetchAddress } from "../user/userSlice";
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );



function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const {username, status: addressStatus,position,address, error:errorAddress} = useSelector(state=> state.user);
 
  const isLoadingAddress = addressStatus === 'loading';
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isSubmitting = navigation.state === "submitting";
  const fromErrors = useActionData();
 
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
 const priorityPrice = withPriority? totalCartPrice * 0.2: 0;
  const totalPrice = totalCartPrice+ priorityPrice

 if (!cart.length) return <EmptyCart/>

  return (
    <div className="py-5 px-5">
      <h2 className="mb-8 text-xl font-bold ">Ready to order? Let's go!</h2>
      
      <Form method="POST">
        <div className="mb-5 flex flex-col  gap-2 sm:flex-row sm:items-center ">
          <label className="sm:basis-40">First Name</label>
          <input className="input grow" type="text" name="customer" defaultValue={username} required />
        </div>

        <div className="mb-5 flex flex-col  gap-2 sm:flex-row sm:items-center ">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
          
          {fromErrors?.phone && <p className="mt-2 p-2 text-xs bg-red-200 text-red-700 rounded-md" >{fromErrors.phone}</p>}
          </div>        
        </div>

        <div className="mb-5 flex flex-col  gap-2 sm:flex-row sm:items-center relative">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input className="input w-full" type="text" name="address"
            disabled={isLoadingAddress}
            defaultValue={address}
            required />
                {addressStatus === 'error' && <p className="mt-2 p-2 text-xs bg-red-200 text-red-700 rounded-md" >{errorAddress}</p>}
          </div>

      {!position.latitude && !position.longitude  &&   <span className="absolute right-[3px] z-50 top-[3pz] md:right-[5px] md:top-[5px] "> <Button  type='small' disabled={isLoadingAddress} onClick={(e)=>{
            e.preventDefault();
            dispatch(fetchAddress())}}>Get position</Button></span>}
         
        </div>


        <div className="mb-12 flex gap-5 items-center">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2 "
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
           
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input type="hidden" name='position' value={position.longitude && position.latitude ?`${position.latitude},${position.longitude}`: ''}/>
          <Button type="primary"
            disabled={isSubmitting || isLoadingAddress }
                     >
            {isSubmitting ? "Placing order..." : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please provide correct phone number. We might need to contact you.";
  if (Object.keys(errors).length > 0) return errors;

  //if everything is okay create a new order
  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
