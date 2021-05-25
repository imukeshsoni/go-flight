import React, { useState } from "react";
import "./styles.css";
import {
  getBookingByUserId,
  updateBooking,
  getAllBookings,
} from "../../api-urls";
import axios from "axios";
import { Prompt } from "react-router";

function Bookings() {
  const user = JSON.parse(localStorage.getItem("user"));
  let userBookings = JSON.parse(localStorage.getItem("userBookings"));
  const [cancelBook, setCancelBook] = useState("");
  const [checkIn, setCheckIn] = useState("");

  const loadBookings = () => {
    if (user.role == "ROLE_ADMIN") {
      axios
        .get(getAllBookings)
        .then((res) => {
          localStorage.setItem("userBookings", JSON.stringify(res.data));
          userBookings = JSON.parse(localStorage.getItem("userBookings"));
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          return <h2>Something went wrong</h2>;
        });
    } else {
      axios
        .get(getBookingByUserId + user.email)
        .then((res) => {
          localStorage.setItem("userBookings", JSON.stringify(res.data));
          userBookings = JSON.parse(localStorage.getItem("userBookings"));
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          return <h2>Something went wrong</h2>;
        });
    }
  };

  const handleCancel = (booking) => {
    booking.status = "cancelled";
    axios.put(updateBooking, booking).then((res) => {
      localStorage.removeItem("userBookings");
      loadBookings();
      window.location.reload();
    });
  };

  const handleCheckIn = (booking) => {
    booking.checkedIn = true;
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
            {user.role == "ROLE_ADMIN" && <th>Check In</th>}
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
                  {value.status == "pending" &&
                  !value.checkedIn &&
                  cancelBook == value.id ? (
                    <button onClick={() => handleCancel(value)}>
                      Sure Cancel?
                    </button>
                  ) : (
                    value.status == "pending" &&
                    !value.checkedIn && (
                      <button onClick={() => setCancelBook(value.id)}>
                        Cancel
                      </button>
                    )
                  )}
                </td>
                {user.role == "ROLE_ADMIN" && (
                  <td>
                    {!value.checkedIn &&
                    value.status == "pending" &&
                    checkIn == value.id ? (
                      <button onClick={() => handleCheckIn(value)}>
                        Sure CheckIn?
                      </button>
                    ) : (
                      !value.checkedIn &&
                      value.status == "pending" && (
                        <button onClick={() => setCheckIn(value.id)}>
                          CheckIn
                        </button>
                      )
                    )}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Bookings;
