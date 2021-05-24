import axios from "axios";
import React, { useState } from "react";
import "./styles.css";

import { getAllFlights, getFlightByLocation } from "../../api-urls";
import { useHistory } from "react-router";

function Home() {
  const history = useHistory();
  const [source, setsource] = useState("");
  const [destination, setDestination] = useState("");
  const [warning, setwarning] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const availableFlights = JSON.parse(localStorage.getItem("availableFlights"));

  const handleSubmit = (e) => {
    e.preventDefault();

    if (source == "") {
      setwarning("Please select source");
      return;
    } else if (destination == "") {
      setwarning("Please select destination");
      return;
    }

    axios.get(getFlightByLocation + source + "/" + destination).then((res) => {
      localStorage.setItem("availableFlights", JSON.stringify(res.data));
      window.location.reload();
    });
  };

  const handleBook = (event, flightId) => {
    event.preventDefault();
    const availableFlights = JSON.parse(
      localStorage.getItem("availableFlights")
    );

    if (!user || user.length < 1) {
      alert("Please log in to book");
      history.push("/login");
      return;
    }

    const selectedFlight = availableFlights.filter((t, i) => {
      return t.flightId == flightId;
    });

    const newBooking = {
      flightId: selectedFlight[0].flightId,
      userId: user.email,
      source: selectedFlight[0].source,
      destination: selectedFlight[0].destination,
      arrivalTime: selectedFlight[0].arrivalTime,
      departureTime: selectedFlight[0].departureTime,
      seatNo: selectedFlight[0].seats,
      isCheckedIn: false,
      amount: selectedFlight[0].fare,
      status: "pending",
      paymentStatus: "pending",
    };
    localStorage.setItem("booking", JSON.stringify(newBooking));
    history.push("/checkout");
  };

  return (
    <div className="container">
      <div className="flight__dropdowns">
        <h2>Search Flights</h2>
        <h4>Source</h4>
        <form className="flight__form" onSubmit={(e) => handleSubmit(e)}>
          <select
            id="source"
            className="dropdown"
            onChange={(e) => setsource(e.target.value)}
            required
          >
            <option value="unselected">Select Source</option>
            <option>Delhi</option>
            <option>Mumbai</option>
            <option>Kolkata</option>
            <option>Chennai</option>
            <option>Jaipur</option>
            <option>Hyderabad</option>
            <option>Banglore</option>
          </select>
          <h4>Destination</h4>
          <select
            id="destination"
            className="dropdown"
            onChange={(e) => setDestination(e.target.value)}
            required
          >
            <option value="unselected">Select Destination</option>
            <option>Delhi</option>
            <option>Mumbai</option>
            <option>Kolkata</option>
            <option>Chennai</option>
            <option>Jaipur</option>
            <option>Hyderabad</option>
            <option>Banglore</option>
          </select>
          {warning}
          <button type="submit" className="search__btn">
            Search Flights
          </button>
        </form>
      </div>
      <div className="booking__table">
        <h2>Available Flights</h2>
        <table>
          <thead>
            <tr className="flight__headings">
              <th>Flight Id</th>
              <th>Source</th>
              <th>Destination</th>
              <th>Departure Time</th>
              <th>Arrival Time</th>
              <th>Fare</th>
              <th>Book</th>
            </tr>
          </thead>
          <tbody className="flight__body">
            {availableFlights && availableFlights.length > 0 ? (
              availableFlights.map((value, i) => {
                return (
                  <tr key={i}>
                    <td>{value.flightId}</td>
                    <td>{value.source}</td>
                    <td>{value.destination}</td>
                    <td>{value.departureTime}</td>
                    <td>{value.arrivalTime}</td>
                    <td>{value.fare}</td>
                    <td>
                      <button onClick={(e) => handleBook(e, value.flightId)}>
                        Book
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7">No Flights available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
