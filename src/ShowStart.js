import React, { useState } from "react";
import StarRating from "./StarRating";

export function ShowStart() {
  const [star, setStar] = useState(0);
  return (
    <>
      <StarRating
        max={5}
        messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
        onSetStar={setStar}
      />
      <p>The movie has {star} stars</p>
      <StarRating
        max={5}
        messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
      />
    </>
  );
}
