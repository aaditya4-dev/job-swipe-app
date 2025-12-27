import { useSwipe } from "../../hooks/useSwipe";
import type { Job } from "../../types/job";
import JobCard from "./JobCard";
import { useState } from "react";

type Props = {
  job: Job;
  onSkip: () => void;
  onLike: () => void;
  onViewDetails: (job: Job) => void;
};

const SwipeContainer = ({ job, onSkip, onLike, onViewDetails }: Props) => {
  const [dragX, setDragX] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const swipeHandlers = useSwipe(
    () => animateOut(-1),
    () => animateOut(1)
  );

  const animateOut = (direction: -1 | 1) => {
    setIsAnimating(true);
    setDragX(direction * 500);

    setTimeout(() => {
      direction === 1 ? onLike() : onSkip();
      setDragX(0);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div
      {...swipeHandlers}
      style={{
        transform: `translateX(${dragX}px) rotate(${dragX * 0.05}deg)`,
        transition: isAnimating ? "transform 0.3s ease-out" : "none",
      }}
    >
      <JobCard
        job={job}
        onSkip={() => animateOut(-1)}
        onLike={() => animateOut(1)}
        onViewDetails={onViewDetails}
      />
    </div>
  );
};

export default SwipeContainer;
