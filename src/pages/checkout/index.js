import React, { useRef, useEffect } from "react";
import "./styles.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { createBooking } from "../../api-urls";

function Checkout() {
  let booking = JSON.parse(localStorage.getItem("booking"));
  const history = useHistory();
  const paypal = useRef();

  const pushOrder = (successMsg, errMsg) => {
    axios
      .post(createBooking, booking)
      .then((response) => {
        alert(successMsg);
        history.push("/profile");
      })
      .catch((err) => {
        alert(errMsg);
        history.push("/");
      });

    localStorage.removeItem("booking");
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
                  value: 1.0,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          booking.paymentStatus = "completed";
          pushOrder(
            "Your payment is successful and Booking is placed!",
            "Something went wrong while adding booking. Refund will be initiated if deducted."
          );
        },
        onError: (err) => {
          alert("Payment is failed, Please try again.");
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);

  if (!booking || booking.length < 1) {
    return <h2>This Page is expired or no longer available!</h2>;
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
