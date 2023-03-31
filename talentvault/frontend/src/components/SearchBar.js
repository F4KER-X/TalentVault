import React from 'react'
import { FaSearch } from "react-icons/fa";
import "./Job/JobForm.css"


const SearchBar = ({jobs, setSearchResults}) => {

  const handleSubmit = (e) => e.preventDefault()

  const handleSearchChange = (e) => {
    const searchTerm= e.target.value.trim().toLowerCase(); //trims white space from what was searched

    //if nothing has been searched return
    if (!searchTerm){
    return setSearchResults(jobs)
    }

    //check every aspect of the job to see if what was entered in the search bar matches
    const resultsArray = jobs.filter(
      (job) => 
      job.jobTitle.toLowerCase().includes(searchTerm) || job.companyName.toLowerCase().includes(searchTerm)
    || job.jobLocation.city.toLowerCase().includes(searchTerm) || job.jobLocation.province.toLowerCase().includes(searchTerm) || job.workType.toLowerCase().includes(searchTerm)
    || job.jobType.toLowerCase().includes(searchTerm))

    setSearchResults(resultsArray)
}

  return (
    <>
      <div className='search-div'>
        <form className='search' onSubmit={handleSubmit}>
            <input 
            className='search-input'
            type="text"
            placeholder='Search For Your Dream Job Using Key Words'
            onChange={handleSearchChange} //handle the change
            />

            <button className='search-button'>
            <FaSearch/>
          </button>
        </form>
     </div>
    </>
  )
}

export default SearchBar
