import "../index.css";
import Wrapper from "../assets/styling/RegisterPage";
import {FaBriefcase,FaBuilding,FaRegBuilding, FaExternalLinkAlt} from 'react-icons/fa';

function FullJobDetails() {

   
    return (
    <>
    <Wrapper className="full-page">
    <div className="form">
    <h3 className="form-title">Insert Job Title Here</h3>
    <h5 className="form-title">Insert company * City, Province </h5>

    <div>
     <div className="form-control"> <FaRegBuilding/> Remote </div>

     <div className="form-control"> <FaBriefcase/> Full time </div>
     
     <div className="btndiv">
         <div  type="submit" className="btn"> Apply <FaExternalLinkAlt/> </div>
         <div  type="submit" className="btnReverse">Save</div>
    </div>

    </div>
     <div className="form-group">
        <label>Job Description</label>
          <textarea readOnly className="form-control-text-area"  name="jobdescription">
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius reprehenderit iste tempore asperiores. Illo vel debitis itaque, natus, tempore nam eum delectus eius pariatur error, laboriosam esse culpa in accusantium?
           </textarea>
     </div>
    </div>
   

    </Wrapper>
   

    </>
    )
  }
  
  export default FullJobDetails;
  