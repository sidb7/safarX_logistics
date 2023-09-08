import { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = () => {
  const [rating, setRating] = useState<any>(null);
  const [hover, setHover] = useState<any>(null);
  const [userRating, setUserRating] = useState(0);

  return (
    <div className="flex">
      {[...Array(5)].map((star, index) => {
        const currentRating = index + 1;
        return (
          <div className="cursor-pointer">
            <input
              type="radio"
              name="rating"
              value={currentRating}
              className="hidden cursor-pointer"
              onClick={() => setRating(currentRating)}
            />
            <FaStar
              size={30}
              color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
              onClick={() => setRating(currentRating)}
              className="cursor-pointer"
            />
          </div>
        );
      })}
    </div>
  );
};
export default StarRating;
