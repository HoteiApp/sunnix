import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const NotFoundView = () => (
  <div className="flex items-center justify-center w-full h-full">
    <div className="text-center">
      <p className="text-primary">Error 404</p>
      <h1 className="text-4xl py-2 font-bold">Page not found</h1>
      <p className="text-sm text-gray-400 pb-4">
        Sorry, we couldn't find the page.
      </p>
      <Link
        to="/portfolio"
        className="text-sm text-primary hover:text-primary-hover"
      >
        <span>
          <FontAwesomeIcon icon={faArrowLeftLong} className="pr-1 align-sub" />
          Return
        </span>
      </Link>
    </div>
  </div>
);

export { NotFoundView };
