import React, { useEffect, useState } from 'react'
import './jobcardstyle.css'
import { searchAllPlacementsAPI } from '../Services/AllApi'
import { Link, useNavigate } from 'react-router-dom'

function JobCard({searchKey }) {

  const navigate = useNavigate()
  // state for getting all placements
  const [allPlacementData, setAllPlacementData] = useState([])

  // get all placements
  const getAllPlacements = async () => {
    try {
      const result = await searchAllPlacementsAPI(searchKey)
      // console.log(result);
      if (result.status == 200) {
        // console.log(result.data);
        setAllPlacementData(result.data)
        // sessionStorage.setItem("allPlacements",JSON.stringify(result.data))
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {

    getAllPlacements()
  }, [searchKey])

  // console.log('card',allPlacementData);
  const jobApply = (e) => {
    // alert('You have successfully applied for this job')
    // navigate(`/singlejobview/${data?._id}`)
  }
  return (
    <div>

      {allPlacementData?.length > 0 && allPlacementData?.map(data => (
        <div className="card mb-3">
          <div className="card-body">
            <div className="d-flex flex-column flex-lg-row"></div>
            {/* <span className="avatar avatar-text rounded-3 me-4 mb-2 bg-warning">{avatarText}</span> */}
            <div key={data} className="row flex-fill">
              <div className="col-sm-5">
                <h4 className="h5">{data?.job_position}</h4>
                <span className="badge bg-secondary">at: {data?.venue}</span>
                <span className="badge bg-success">on: {data?.date}</span>
              </div>
              <div className="col-sm-4 py-2">
                <span className="badge bg-secondary">{data?.company_name}</span>
              </div>
              <div className="col-sm-3 text-lg-end">
                <Link to={`/singlejobview/${data?._id}`}>
                  <label className="btn btn-primary stretched-link">View</label>
                </Link> 
              </div>
            </div>
          </div>
        </div>
      ))
      }
    </div>
  )
}

export default JobCard