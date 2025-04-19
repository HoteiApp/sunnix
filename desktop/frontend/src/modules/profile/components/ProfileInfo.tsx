import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faUniversalAccess,
} from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import user from "../../../images/user.png";

// -- New Struct
import { Active } from "../../../models";


const ProfileInfo = ({ active }: Props) => {
  const fullName = active?.activeUser?.Record?.fullname;
  const firstname = fullName?.split(' ').slice(0, 2).join(' ');
  const LastName = fullName?.split(' ').slice(2).join(' ');
  // const { userActivityChart, isLoading } = useUserActivityChart();

  // const explicitTheme: ThemeInput = {
  //   light: ["#f0f0f0", "#c4edde", "#7ac7c4", "#f73859", "#384259"],
  //   dark: ["#383838", "#4D455D", "#7DB9B6", "#F5E9CF", "#E96479"],
  // };
  return (
    <div className="md:w-1/4 flex flex-col mt-4 w-full lg:border-l">
      <div className="hidden sm:block flex flex-col text-center w-full z-20 ">
        <div className="flex">
          <div className="w-1/4"></div>
          <div className="w-2/4 text-center justify-center text-center">

            <img src={user} alt={""} className="rounded-full w-full" />
          </div>
          <div className="w-1/4"></div>
        </div>
        <fieldset className="md:w-2/4 flex flex-col items-end  w-4/5 mt-4"></fieldset>
        <p className="text-3xl tracking-tight text-gray-900 animation-l-1s">
          {firstname}
        </p>
        <p className="text-3xl tracking-tight text-gray-400 animation-r-2s">
          {LastName}
        </p>
        <p className="text-2xl tracking-tight text-gray-400 animation-t-2s">
          @{active?.activeUser?.User?.nick}
        </p>
        {/* <h3 className="text-sm font-medium text-gray-900">
          <button className="btn btn-ghost text-gray-400 btn-sm">
            <FontAwesomeIcon icon={faPeopleGroup} className="text-gray-400" />
            &nbsp;&nbsp;3 seguidores
          </button>
          ,
          <button className="btn btn-ghost text-gray-400 btn-sm">
            &nbsp;&nbsp;5 siguiendo
          </button>
        </h3> */}
      </div>
      <div className="hidden sm:block ml-10 flex flex-col p-2">
        <h3 className="text-sm font-medium text-gray-900">
          <FontAwesomeIcon icon={faEnvelope} className="text-gray-400" />{" "}
          {active?.activeUser?.Record?.email}
        </h3>
        <h3 className="text-sm font-medium text-gray-900">
          <FontAwesomeIcon icon={faUniversalAccess} className="text-gray-400" />{" "}
          {active?.activeUser?.User?.roll}
        </h3>
      </div>
      <div className="flex flex-col w-full p-5">

        <br className="mt-6" />

      </div>
    </div>
  );
};

type Props = {
  active?: Active;
};
export { ProfileInfo };
