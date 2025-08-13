import React from "react";
import { useParams } from "react-router-dom";

function SubLocationLevel5() {
  const { service, location, sublocation } = useParams();
  return (
    <div>
      SubLocationLevel5
      <p>service Name : {service}</p>
      <p>location Name : {location}</p>
      <p>sublocation Name : {sublocation}</p>
    </div>
  );
}

export default SubLocationLevel5;
