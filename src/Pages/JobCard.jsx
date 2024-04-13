import React from 'react'
import './jobcardstyle.css'

function JobCard({ avatarText, jobTitle, location, salaryRange, skills, applyLink }) {

  const jobApply =()=>{
    alert('You have successfully applied for this job')
}
  return (
    <div>
         <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex flex-column flex-lg-row">
          <span className="avatar avatar-text rounded-3 me-4 mb-2 bg-warning">{avatarText}</span>
          <div className="row flex-fill">
            <div className="col-sm-5">
              <h4 className="h5">{jobTitle}</h4>
              <span className="badge bg-secondary">{location}</span>
              <span className="badge bg-success">{salaryRange}</span>
            </div>
            <div className="col-sm-4 py-2">
              {skills.map((skill, index) => (
                <span key={index} className="badge bg-secondary">{skill}</span>
              ))}
            </div>
            <div className="col-sm-3 text-lg-end">
              <a href={applyLink} onClick={jobApply} className="btn btn-primary stretched-link">Apply</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default JobCard