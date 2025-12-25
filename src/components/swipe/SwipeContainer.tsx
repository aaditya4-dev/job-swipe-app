import { useSwipe } from "../../hooks/useSwipe";
import type { Job } from "../../types/job";
import JobCard from "./JobCard";

type Props = {
  job: Job;
  onSkip: () => void;
  onLike: () => void;
  onViewDetails: (job: Job) => void;
};

const SwipeContainer = ({ job, onSkip, onLike, onViewDetails }: Props) => {
  const swipeHandlers = useSwipe(onSkip, onLike);

  return (
    <div
      {...swipeHandlers}
      style={{ touchAction: "pan-y", cursor: "grab" }}
    >
      <JobCard
        job={job}
        onSkip={onSkip}
        onLike={onLike}
        onViewDetails={onViewDetails}
      />
    </div>
  );
};

export default SwipeContainer;
