import axios from "axios";
import React, { useState } from "react";
import "./styles.css";

import { getAllFlights, createBooking } from "../../api-urls";
import { useHistory } from "react-router";

function Home() {
  const history = useHistory();
  const [source, setsource] = useState("");
  const [destination, setDestination] = useState("");
  const [warning, setwarning] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const flights = JSON.parse(localStorage.getItem("flights"));
  const availableFlights = JSON.parse(localStorage.getItem("availableFlights"));

  const loadFlights = () => {
    axios
      .get(getAllFlights)
      .then((res) => {
        localStorage.setItem("flights", JSON.stringify(res.data));
      })
      .catch((err) => {
        alert("Something went wrong while fetching flights");
      });
  };

  if (!flights || flights.length < 1) {
    loadFlights();
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (source == "") {
      setwarning("Please select source");
      return;
    } else if (destination == "") {
      setwarning("Please select destination");
      return;
    }

    console.log("Source :" + source);
    console.log("Destination :" + destination);

    const filterFlights = flights.filter((t, i) => {
      return t.source == source && t.destination == destination;
    });
    localStorage.setItem("availableFlights", JSON.stringify(filterFlights));
    window.location.reload();
  };

  const handleBook = (event, flightId) => {
    event.preventDefault();

    if (!user || user.length < 1) {
      alert("Please log in to book");
      history.push("/login");
      return;
    }

    const selectedFlight = flights.filter((t, i) => {
      return t.flightId == flightId;
    });

    const newBooking = {
      flightId: selectedFlight[0].flightId,
      userId: user.email,
      isCheckedIn: false,
      amount: selectedFlight[0].fare,
      status: "pending",
      paymentStatus: "pending",
    };
    debugger;

    axios
      .post(createBooking, newBooking)
      .then((res) => {
        alert("Booking successfully made");
        history.push("/profile");
        localStorage.setItem("booking", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong while creating booking. Check logs");
      });
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
