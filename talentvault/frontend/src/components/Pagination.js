import "../index.css";
import Wrapper from "../assets/styling/jobs";


const Pagination =() =>{
return(

    <>
    <div className="pagination-container">
            <nav className="pagination">
              <ul>
                <li>
                  <a href="#" className="current-page">
                    1
                  </a>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li className="blank">...</li>
                <li>
                  <a href="#">10</a>
                </li>
              </ul>
            </nav>

            <nav className="pagination-next-prev">
              <ul>
                <li>
                  <a href="#" className="prev">
                    Previous
                  </a>
                </li>
                <li>
                  <a href="#" className="next">
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
    </>

);
}
export default Pagination;
