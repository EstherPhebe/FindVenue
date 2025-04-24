import { Link } from "react-router-dom";

export default function Root() {
  return (
    <>
      <h1>FindVenue</h1>
      <div>
        <p>List your Venue, get bookings</p>
        <Link to={"/vendor"}>Vendor</Link>
      </div>
      <div>
        <p>Book a Venue for your event</p>
        <Link to={"/user"}>Register</Link>
      </div>
    </>
  );
}
