
import Logo from '../components/Logo';
import {FaBriefcase,FaRegBuilding, FaMapMarkerAlt } from 'react-icons/fa';

function About() {
  return (
    <>
   
	  <div>
		  <div className='top-container'>
      <Logo />
			  <h2>Explore Our Jobs!</h2>
		</div>
	</div>




<div className="container">
	
	<div>
		
		<ul className="job-list full">
			<li>
				<div className="job-list-content">
					<h4 className='jobTitle'>Job Title Here</h4>
          <h5 className='companyName'>Company Name Here</h5>
          
          <div className='city-province'>
						<span> <FaMapMarkerAlt/> City</span>
						<span> Province</span>
				  </div>

          <div className='type-remote'> 
          <span> <FaBriefcase/> Full-Time</span> </div>
          <span> <FaRegBuilding/> Remote</span>
					</div>
			</li>
      <li>
				<div className="job-list-content">
					<h4 className='jobTitle'>Job Title Here</h4>
          <h5 className='companyName'>Company Name Here</h5>
          
          <div className='city-province'>
						<span> <FaMapMarkerAlt/> City</span>
						<span> Province</span>
				  </div>

          <div className='type-remote'> 
          <span> <FaBriefcase/> Full-Time</span> </div>
          <span> <FaRegBuilding/> Remote</span>
					</div>
			</li>

      <li>
				<div className="job-list-content">
					<h4 className='jobTitle'>Job Title Here</h4>
          <h5 className='companyName'>Company Name Here</h5>
          
          <div className='city-province'>
						<span> <FaMapMarkerAlt/> City</span>
						<span> Province</span>
				  </div>

          <div className='type-remote'> 
          <span> <FaBriefcase/> Full-Time</span> </div>
          <span> <FaRegBuilding/> Remote</span>
					</div>
			</li>


      <li>
				<div className="job-list-content">
					<h4 className='jobTitle'>Job Title Here</h4>
          <h5 className='companyName'>Company Name Here</h5>
          
          <div className='city-province'>
						<span> <FaMapMarkerAlt/> City</span>
						<span> Province</span>
				  </div>

          <div className='type-remote'> 
          <span> <FaBriefcase/> Full-Time</span> </div>
          <span> <FaRegBuilding/> Remote</span>
					</div>
			</li>


  
      <li>
				<div className="job-list-content">
					<h4 className='jobTitle'>Job Title Here</h4>
          <h5 className='companyName'>Company Name Here</h5>
          
          <div className='city-province'>
						<span> <FaMapMarkerAlt/> City</span>
						<span> Province</span>
				  </div>

          <div className='type-remote'> 
          <span> <FaBriefcase/> Full-Time</span> </div>
          <span> <FaRegBuilding/> Remote</span>
					</div>
			</li>


		</ul>
	

		<div className="pagination-container">
			<nav className="pagination">
				<ul>
					<li><a href="#" className="current-page">1</a></li>
					<li><a href="#">2</a></li>
					<li><a href="#">3</a></li>
					<li className="blank">...</li>
					<li><a href="#">10</a></li>
				</ul>
			</nav>

			<nav className="pagination-next-prev">
				<ul>
					<li><a href="#" className="prev">Previous</a></li>
					<li><a href="#" className="next">Next</a></li>
				</ul>
			</nav>
		</div>

	</div>



</div>
    
    </>
  )
}

export default About;
