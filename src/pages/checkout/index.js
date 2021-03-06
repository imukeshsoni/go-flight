import React, { useRef, useEffect, useState } from "react";
import "./styles.css";

import axios from "axios";
import { createBooking, updateFlightSeatsById } from "../../api-urls";
import Confirmation from "../../components/confirmation/index";
import { useHistory } from "react-router";

function Checkout() {
  let booking = JSON.parse(localStorage.getItem("booking"));
  const [confirmed, setConfirmed] = useState(false);
  const history = useHistory();
  
  const paypal = useRef();

  const pushOrder = (successMsg, errMsg) => {
    axios
      .post(createBooking, booking)
      .then((response) => {
       setConfirmed(true);
      })
      .catch((err) => {
        return <h2>{errMsg}</h2>;
      });
    
    localStorage.removeItem("userBookings");
    axios.put(updateFlightSeatsById + booking.flightId);
  };

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: booking.servicePlan,
                amount: {
                  value: booking.amount,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          booking.paymentStatus = "completed";
          pushOrder(
            "Your payment is successful! Redirecting...",
            "Something went wrong while adding booking. Refund will be initiated if deducted."
          );
        },
        onError: (err) => {
          console.log(err);
          return <h2>Payment is failed, Please try again.</h2>;
        },
      })
      .render(paypal.current);
  }, []);

  if (!booking || booking.length < 1) {
    return <h2>This Page is expired or no longer available!</h2>;
  }
  if(confirmed){
   history.push("/confirmation");
  }

  return (
    <div className="container">
      <div className="payment__container">
        <div ref={paypal}></div>
      </div>
      <div className="booking__details">
        <table>
          <thead>
            <tr>
              <th colSpan="2"> Booking Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Flight Id</td>
              <td>{booking.flightId}</td>
            </tr>
            <tr>
              <td>Source</td>
              <td>{booking.source}</td>
            </tr>
            <tr>
              <td>Destination</td>
              <td>{booking.destination}</td>
            </tr>
            <tr>
              <td>Departure Time</td>
              <td>{booking.departureTime}</td>
            </tr>
            <tr>
              <td>Arrival Time</td>
              <td>{booking.arrivalTime}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{booking.userId}</td>
            </tr>
            <tr>
              <td>Total Amount</td>
              <td>{booking.amount}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Checkout;
