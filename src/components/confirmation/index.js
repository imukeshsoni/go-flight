import React from "react";
import { useHistory } from "react-router-dom";
import "./styles.css";


function Confirmation(){

    let booking = JSON.parse(localStorage.getItem("booking"));
    const history = useHistory();

    return (
        <div className="confirmation__container">
            <div className="table__container">
            <table>
                <thead>
                    <tr> 
                        <th colSpan="2">
                            Confirmed Booking 
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            Flight Id
                        </td>
                        <td>
                            {booking.flightId}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Source
                        </td>
                        <td>
                            {booking.source}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Destination
                        </td>
                        <td>
                            {booking.destination}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            User Email
                        </td>
                        <td>
                            {booking.userId}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Amount
                        </td>
                        <td>
                            {booking.amount}
                        </td>
                    </tr>
                </tbody>
            </table>

            </div>
            <div>
            <button className="redirect__buttons" onClick={() => history.push("/profile")}>My Bookings</button>
            <button className="redirect__buttons" onClick={() => history.push("/")}>Home</button>

            </div>
           
            
        </div>
    )
}
export default Confirmation;