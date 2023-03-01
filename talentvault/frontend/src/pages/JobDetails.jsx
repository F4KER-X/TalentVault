import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import UseRedirectLoggedOutUser from "../hook/useRedirectLoggedOutUser";

const JobDetails = () => {
  UseRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const { id } = useParams();

  return (
    <>
      <div>
        <h2>{id}</h2>
        <h1>Étudiant et coop : Gestion de l’information</h1>

        <div>
          <span>
            Canadian Security Intelligence Service (CSIS) | Service canadien du
            renseignement de sécurité (SCRS)>
          </span>
          <span>Montreal, QC</span>

          <span>On-site</span>

          <span>2 weeks ago</span>
          <span>4 applicants</span>
        </div>
      </div>

      <div>
        <ul>
          <li>
            <div>
              <li-icon aria-hidden="true" type="job" size="large">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  data-supported-dps="24x24"
                  fill="currentColor"
                  class="mercado-match"
                  width="24"
                  height="24"
                  focusable="false"
                >
                  <path d="M17 6V5a3 3 0 00-3-3h-4a3 3 0 00-3 3v1H2v4a3 3 0 003 3h14a3 3 0 003-3V6zM9 5a1 1 0 011-1h4a1 1 0 011 1v1H9zm10 9a4 4 0 003-1.38V17a3 3 0 01-3 3H5a3 3 0 01-3-3v-4.38A4 4 0 005 14z"></path>
                </svg>
              </li-icon>
            </div>

            <span>Full-time · Internship</span>
          </li>

          <div>
            <li-icon aria-hidden="true" type="checklist" size="medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                data-supported-dps="24x24"
                fill="currentColor"
                class="mercado-match"
                width="24"
                height="24"
                focusable="false"
              >
                <path d="M22 3v2H11V3zM11 13h11v-2H11zm0 8h11v-2H11zM4.85 4L3.34 2.51 2 3.85 5.15 7l4.6-7H7.48zm0 8l-1.51-1.49L2 11.85 5.15 15l4.6-7H7.48zm0 8l-1.51-1.49L2 19.85 5.15 23l4.6-7H7.48z"></path>
              </svg>
            </li-icon>
          </div>
        </ul>
      </div>
    </>
  );
};

export default JobDetails;
