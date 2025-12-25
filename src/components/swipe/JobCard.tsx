import type { Job } from "../../types/job";

type Props = {
  job: Job;
  onSkip: () => void;
  onLike: () => void;
  onViewDetails: (job: Job) => void;
};

const JobCard = ({ job, onSkip, onLike, onViewDetails }: Props) => {
  return (
    <div className="job-card">
      <div className="hiring-badge">NOW HIRING</div>

      <div className="company-avatar">
      
      </div>


      <div className="card-body">
        <h2 className="company-name">{job.company}</h2>
        <p className="job-title">{job.title}</p>
      </div>

      <div className="tags">
        {job.tags.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
          </span>
        ))}
      </div>

      <button className="view-btn" onClick={() => onViewDetails(job)}>
        View Details
      </button>

      <div className="swipe-actions">
        <button className="swipe-btn skip" onClick={onSkip}>✕</button>
        <button className="swipe-btn like" onClick={onLike}>❤</button>
      </div>
    </div>
  );
};

export default JobCard;
