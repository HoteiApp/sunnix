import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCircleCheck } from "@fortawesome/free-solid-svg-icons";

import logo from "../../../images/logo1.png";
const ProfileBanner = () => {
  return (
    <div className="flex items-center justify-center flex-col md:flex-row lg:mx-26 ">
      <div className="stats w-full">

        <div className="stat">
          <div className="stat-figure text-primary text-center justify-center">
            <div className="stat-value">
              Hiring area
            </div>
            <div className="stat-title">
              12001 SW 128 CT SUITE 101 MIAMI FL 33186 <br />
              Phone/Fax: (786)975-7485/(954)860-7166
            </div>
          </div>
          <div className="stat-value">
            <div className="w-48">
              <img src={logo} alt="Logo" />
            </div>
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <div className="avatar">
              <div className="w-24">
                <FontAwesomeIcon
                  icon={faFileCircleCheck}
                  className="text-gray-400 w-24 h-24"
                />
              </div>
            </div>
          </div>
          <div className="stat-value">
            10%
          </div>
          <div className="stat-title">Recruitment completed</div>

          <progress
            className="progress progress-warning"
            value={10}
            max={100}
          ></progress>
          <div className="stat-desc text-primary">
            <span>
              Fill in all the fields to complete your hiring
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export { ProfileBanner };
