import React, {useState, useEffect} from "react";
import spinach from "../assets/spinach.jpg"
import useScript from './UseScripts';
import axios from "axios";

const Main = () => {
    useScript("https://code.jquery.com/jquery-3.6.0.js");
    // useScript("http://192.168.11.48:16220/jambopay-js-checkout.min.js");
    useScript("http://196.50.21.51:16220/jambopay-js-checkout.min.js");
    // useScript("https://checkout.jambopay.com/jambopay-js-checkout.min.js");
    const [amount, setAmount] = useState()

    const initiatePayment = async (data) => {
        const response = await axios.post('http://127.0.0.1:8000/transaction/initiate', data)
        if (response){
            return response.data
        }
    }

    const pay = async (e) => {
        e.preventDefault()
        const data = {
            "email": "larry@gmail.com",
            "amount": amount,
            "phone": "0720460519",
            "narration": "Topup",
            "telco_service": "23e0bc64-39a2-4782-9d33-2aa1574997e7"
        }
        const callBack = await initiatePayment(data)
        const themeDetails = {
        logoUrl:
            "https://sjc1.discourse-cdn.com/freecodecamp/user_avatar/forum.freecodecamp.org/amitshrivastavafcc/45/65932_2.png",
        }

        window.jambopayCheckout(callBack.merchantDetails, callBack.merchantCredentials,themeDetails);
        console.log(callBack)
        //pulling
    }


    return (
        <div>
            <form action="" className='product' onSubmit={pay}>
                <img src={spinach} alt="" />
                <div className="form-group">
                    <input type="text" className="form-control" onChange={e => setAmount(e.target.value)} placeholder='Enter amount'/>
                </div>
                <div className="form-group">
                    <button type='submit' className="btn btn-outline-primary btn-block mt-3">Buy</button>
                </div>
            </form>
        </div>
    )
}

export default Main