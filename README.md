# Job Swipe + Apply

This project is a frontend-only simulation of a job discovery and application flow.
The goal was to design a clean, logical system where a student can explore jobs, view details, evaluate their match using an ATS-style score, and then proceed to apply.

The focus of this project is on clear control flow, state management, and explainable logic, rather than backend complexity.

# What the app does

The user flow is intentionally simple and linear:

Swipe jobs → View job details → Apply → Enter skills → See ATS score → Continue to application form.

All data is mocked on the frontend to simulate real-world behavior.

# Component structure 
Home
Controls job progression and manages which job or modal is currently active.

JobCard
Displays a single job and handles like, skip, and view-detail actions.

JobDetailModal
Shows job description and eligibility information.

ApplyModal
Collects user skills and calculates ATS score before application.

calculateATS
A pure utility function that contains all ATS scoring logic. 


# State and control flow
State is kept local and minimal. Each piece of state directly represents a UI.

# reason to use modal intead of sperate page :-
Modals are used instead of page navigation to preserve swipe context. 


# index — for swipe between the cards

Location : Home.tsx (file in which it is used) 
        const [index, setIndex] = useState(0); (This controls which job from the list is currently shown.)

it is updated through swipe actions:
       handleSkip → setIndex(prev + 1) 
       handleLike → setIndex(prev + 1) 


# selectedJob — modal visibility

Location: Home.tsx

const [selectedJob, setSelectedJob] = useState<Job | null>(null);
it basically :
Set when user clicks “View Details”
Reset when modal is closed


# appliedJobs — prevents duplicate applications
Location: Home.tsx

const [appliedJobs, setAppliedJobs] = useState<number[]>([]);

When a user applies, the job ID is added to this array.
The Apply button is disabled if the job ID already exists, enforcing application rules at the UI level. 

# selectedJob — modal visibility

Location: Home.tsx

const [selectedJob, setSelectedJob] = useState<Job | null>(null);


Set when user clicks “View Details”

Reset when modal is closed

The modal is rendered conditionally based on this state, so UI visibility is directly driven by data.



# appliedJobs — prevents duplicate applications

Location: Home.tsx

const [appliedJobs, setAppliedJobs] = useState<number[]>([]);

When a user applies, the job ID is added to this array.
The Apply button is disabled if the job ID already exists, enforcing application rules at the UI level. 

# skillsInput — captures user skills

Location: ApplyModal.tsx

const [skillsInput, setSkillsInput] = useState("");

This stores raw user input (comma-separated skills).
It is transformed into structured data and passed into the ATS function for scoring.

Function flow between components

# The logical flow of data and actions is:

Home → JobCard → JobDetailModal → ApplyModal → calculateATS 
Each component only receives the data and functions it needs.. 

# ATS scoring logic

ATS scoring is rule-based and fully explainable.
The final score is out of 100.

Component	                Purpose	                         weight
Skill match       	   Direct keyword matching	            60
Eligibility	           CGPA and branch	                    25
Relevance	             Related skills	                      15

Skill match
(matchedSkills / totalRequiredSkills) × 60

# Eligibility

CGPA requirement satisfied → +15

Branch matches → +10

# Relevance

Handles indirect relationships such as:

React → JavaScript
UI → CSS
Backend → API

Partial credit is given to avoid overly strict matching.
All ATS logic is isolated inside calculateATS, keeping UI components clean. 

# Design and UX decisions

1.Liking a job indicates interest, not application.
2.Applying is a deliberate action after reviewing details.
3.Skill input is requested only when the user chooses to apply. 
4.Modals are used instead of page navigation to preserve swipe context.

Extending the system

1.This structure allows easy future expansion, such as:

2.Resume parsing instead of manual skill input

3.Backend APIs instead of static job data

4.Persistent user profiles and authentication

5.More advanced or ML-based ATS scoring

Because logic is isolated and state is localized, new features can be added without rewriting the core flow.

# Running the project
npm run dev

# Deployment

Deployed on Vercel: 