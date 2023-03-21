import React from 'react'
import {useState} from "react"
import { FaSearch } from "react-icons/fa";
import "./Job/JobForm.css"


const SearchBar = () => {


  return (
    <>
      <div className='search-div'>
        <form className='search'> 
            <input 
            className='search-input'
            type="text"
            value={searchInput}
            placeholder='Search by Job Title'
            onChange={handleSearchValue}
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
