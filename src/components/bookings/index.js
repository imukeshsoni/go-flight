import React from "react";
import "./styles.css";
import { getBookingByUserId, updateBooking } from "../../api-urls";
import axios from "axios";

function Bookings() {
  const user = JSON.parse(localStorage.getItem("user"));
  let userBookings = JSON.parse(localStorage.getItem("userBookings"));

  const loadBookings = () => {
    axios
      .get(getBookingByUserId + user.email)
      .then((res) => {
        localStorage.setItem("userBookings", JSON.stringify(res.data));
        userBookings = JSON.parse(localStorage.getItem("userBookings"));
        window.location.reload();
      })
      .catch((err) => {
        alert("Something went wrong while fetching the bookings");
        console.log(err);
      });
  };

  const handleCancel = (booking) => {
    booking.status = "cancelled";
    axios.put(updateBooking, booking).then((res) => {
      localStorage.removeItem("userBookings");
      loadBookings();
      window.location.reload();
    });
  };

  if (!userBookings) {
    loadBookings();
    return <h2>Fetching your bookings...</h2>;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Booking Id</th>
            <th>Flight Id</th>
            <th>Source</th>
            <th>Destination</th>
            <th>Departure Time</th>
            <th>Arrival Time</th>
            <th>Amount</th>
            <th>Payment Status</th>
            <th>Journey Status</th>
            <th>Seat No</th>
            <th>Checked In</th>
            <th>Cancel</th>
          </tr>
        </thead>
        <tbody>
          {userBookings.map((value, i) => {
            return (
              <tr key={i}>
                <td>{value.id}</td>
                <td>{value.flightId}</td>
                <td>{value.source}</td>
                <td>{value.destination}</td>
                <td>{value.departureTime}</td>
                <td>{value.arrivalTime}</td>
                <td>{value.amount}</td>
                <td>{value.paymentStatus}</td>
                <td>{value.status}</td>
                <td>{value.seatNo}</td>
                <td>{value.checkedIn ? "True" : "False"}</td>
                <td>
                  {value.status == "pending" && (
                    <button onClick={() => handleCancel(value)}>Cancel</button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Bookings;
