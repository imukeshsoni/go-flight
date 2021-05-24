import React, { useState } from "react";
import "./styles.css";
import UserProfile from "../../components/user-profile/index";
import Bookings from "../../components/bookings/index";

function Profile() {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(1);
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.length < 1) {
    return <h2>Please log in to continue!</h2>;
  }
  return (
    <div className="profile__container">
      <div className="side__btns">
        <button onClick={() => setSelectedButtonIndex(1)}>Your Bookings</button>
        <button onClick={() => setSelectedButtonIndex(0)}>Your Profile</button>
      </div>
      <div className="component__page">
        {selectedButtonIndex == 0 && <UserProfile />}
        {selectedButtonIndex == 1 && <Bookings />}
      </div>
    </div>
  );
}

export default Profile;
