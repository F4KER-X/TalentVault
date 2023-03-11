import "../index.css";


export default function Pagination({nPages,currentPage,setCurrentPage}){

  //array that holds all page numbers from 1 to n pages
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1)

const nextPage = () => {
    if(currentPage !== nPages) 
        setCurrentPage(currentPage + 1)
}

const prevPage = () => {
    if(currentPage !== 1) 
        setCurrentPage(currentPage - 1)
}

return(
    <>
      <div className="pagination-container">
         <nav className="pagination">
            
            <div className="pagination-next-prev">
              <li className="page-item">
                <a 
                  href="#" 
                  className="prev"
                  onclick={prevPage}
                >
                  Previous
                </a>
              </li>
            </div>


             {pageNumbers.map(pgNumber => (
              <li 
                key={pgNumber}
                className={`page-item ${currentPage==pgNumber ? 'active' : ''}`}
              >

                <a 
                 onClick={() => setCurrentPage(pgNumber)}
                 className='current-page'
                 href='#'>

                {pgNumber}
                </a>
              </li>
            ))}
             
            <div className="pagination-next-prev">
                <li className="page-item">
                  <a href="#" 
                    className="next"
                    onClick={nextPage}
                  >
                    Next
                  </a>
                </li>
            </div>
           </nav>
        </div>
    </>
  );
}