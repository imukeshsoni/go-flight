const createUser = "http://localhost:8084/user/create/";
const deleteUserById = "http://localhost:8084/user/delete/";
const getUserById = "http://localhost:8084/user/get/";
const getAllUsers = "http://localhost:8084/user/getall";
const updateUser = "http://localhost:8084/user/update/";

const createBooking = "http://localhost:8085/booking/create";
const getBookingById = "http://localhost:8085/booking/get/";
const getBookingByUserId = "http://localhost:8085/booking/getbyuser/";
const getAllBookings = "http://localhost:8085/booking/getall";
const updateBooking = "http://localhost:8085/booking/update/";

const createFlight = "http://localhost:8085/flight/create/";
const deleteFlightById = "http://localhost:8085/flight/delete/";
const getFlightById = "http://localhost:8085/flight/get/";
const getFlightByLocation = "http://localhost:8085/flight/getbylocation/";
const getAllFlights = "http://localhost:8085/flight/getall";
const updateFlight = "http://localhost:8085/flight/update/";
const updateFlightSeatsById = "http://localhost:8085/flight/updateseats/";

export {
  createUser,
  deleteUserById,
  getUserById,
  getAllUsers,
  updateUser,
  createBooking,
  getBookingById,
  getBookingByUserId,
  getAllBookings,
  updateBooking,
  createFlight,
  deleteFlightById,
  getFlightById,
  getFlightByLocation,
  getAllFlights,
  updateFlight,
  updateFlightSeatsById,
};
