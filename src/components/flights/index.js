import React, { useState } from "react";
import "./styles.css";
import { deleteFlightById, getAllFlights, updateFlight } from "../../api-urls";
import axios from "axios";

function Flights() {
  let allFlights = JSON.parse(localStorage.getItem("allFlights"));
  const [edit, setEdit] = useState("");
  const [updatedSource, setUpdatedSource] = useState("");
  const [updatedDestination, setUpdatedDestination] = useState("");
  const [updatedDepartureTime, setUpdatedDepartureTime] = useState("");
  const [updatedArrivalTime, setUpdatedArrivalTime] = useState("");
  const [updatedSeats, setUpdatedSeats] = useState(0);
  const [updatedFare, setUpdatedFare] = useState(0);
  const [deleteFlight, setDeleteFlight] = useState("");

  const loadFlights = () => {
    axios.get(getAllFlights).then((res) => {
      localStorage.setItem("allFlights", JSON.stringify(res.data));
      allFlights = JSON.parse(localStorage.getItem("allFlights"));
      window.location.reload();
    });
  };

  const handleUpdateFlight = (flightId) => {
    const updatedFlight = {
      flightId: flightId,
      arrivalTime: updatedArrivalTime,
      departureTime: updatedDepartureTime,
      source: updatedSource,
      destination: updatedDestination,
      seats: updatedSeats,
      fare: updatedFare,
    };

    axios.put(updateFlight, updatedFlight).then((res) => {
      loadFlights();
      window.location.reload();
    });
    localStorage.removeItem("allFlights");
  };

  const handleDeleteFlight = (flightId) => {
    axios.delete(deleteFlightById).then((res) => {
      loadFlights();
      window.location.reload();
    });
    localStorage.removeItem("allFlights");
  };

  if (!allFlights || allFlights.length < 1) {
    loadFlights();
    return <h2>Fetching Flights...</h2>;
  }
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Flight Id</th>
            <th>Source</th>
            <th>Destination</th>
            <th>Departure Time</th>
            <th>Arrival Time</th>
            <th>Seats</th>
            <th>Fare</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {allFlights.map((value, i) => {
            return edit == value.flightId ? (
              <tr>
                <td>{value.flightId}</td>
                <td>
                  <input
                    type="text"
                    onChange={(e) => setUpdatedSource(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    onChange={(e) => setUpdatedDestination(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="time"
                    onChange={(e) => setUpdatedDepartureTime(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="time"
                    onChange={(e) => setUpdatedArrivalTime(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    onChange={(e) => setUpdatedSeats(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    onChange={(e) => setUpdatedFare(e.target.value)}
                  />
                </td>
                <td>
                  <button onClick={() => handleUpdateFlight(value.flightId)}>
                    Update
                  </button>
                </td>
                <td>
                  {deleteFlight == value.flightId ? (
                    <button onClick={() => handleDeleteFlight(value.flightId)}>
                      Sure Delete?
                    </button>
                  ) : (
                    <button onClick={() => setDeleteFlight(value.flightId)}>
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ) : (
              <tr>
                <td>{value.flightId}</td>
                <td>{value.source}</td>
                <td>{value.destination}</td>
                <td>{value.departureTime}</td>
                <td>{value.arrivalTime}</td>
                <td>{value.seats}</td>
                <td>{value.fare}</td>

                <td>
                  <button onClick={() => setEdit(value.flightId)}>Edit</button>
                </td>
                <td>
                  {deleteFlight == value.flightId ? (
                    <button onClick={() => handleDeleteFlight(value.flightId)}>
                      Sure Delete?
                    </button>
                  ) : (
                    <button onClick={() => setDeleteFlight(value.flightId)}>
                      Delete
                    </button>
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

export default Flights;
