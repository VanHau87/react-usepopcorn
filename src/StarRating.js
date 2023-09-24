import { useState } from "react";
import Star from "./Start";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};
const starContainerStyle = {
  display: "flex",
};
const textStyle = {
  lineHeight: "1",
  margin: "0",
};

const MAX_RATING_DEFAULT = 5;
function StarRating({
  max = MAX_RATING_DEFAULT,
  color = "#fcc419",
  size = 35,
  messages,
  defaultStar = 3,
  onSetStar,
}) {
  const [rating, setRating] = useState(defaultStar);
  const [tempRating, setTempRating] = useState(0);
  const [isRated, setIsRated] = useState(true);
  const dynamicTextStyle = {
    color,
    fontSize: `${size}px`,
  };
  //const score = rating !== 0 ? rating : tempRating;
  const handleRating = (index) => {
    setIsRated((isRated) => !isRated);
    setRating(index + 1);
    onSetStar(index + 1);
  };
  const index = isRated ? tempRating : rating;
  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        <Star
          key={0}
          onTempRating={() => setTempRating(0)}
          size={size}
          cursor="auto"
        />
        {Array.from({ length: max }, (_, i) => (
          <Star
            key={i}
            onTempRating={() => setTempRating(i + 1)}
            onRating={() => handleRating(i)}
            full={i < index}
            size={size}
            color={color}
          />
        ))}
      </div>
      {tempRating > 0 && (
        <p style={{ ...textStyle, ...dynamicTextStyle }}>{tempRating}</p>
      )}
    </div>
  );
}
export default StarRating;
