import { Active } from "../../../../models";
import { Divider } from "primereact/divider";

export const PersonalInformation = ({ active }: Props) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="profile-field">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Full Name
            </h3>
            <p className="p-4 bg-gray-50 rounded-lg text-gray-800 shadow-sm">
              {active?.activeUser?.Record?.fullname}
            </p>
          </div>
          <div className="profile-field">
            <h3 className="text-sm text-gray-500 mb-1">Email Address</h3>
            <p className="p-3 bg-gray-50 rounded-lg text-gray-800 flex items-center gap-2">
              <i className="pi pi-envelope text-gray-400"></i>
              {active?.activeUser?.User?.email}
            </p>
          </div>
          <div className="profile-field">
            <h3 className="text-sm text-gray-500 mb-1">Phone Numbers</h3>
            <div className="space-y-2">
              <p className="p-3 bg-gray-50 rounded-lg text-gray-800 flex items-center gap-2">
                <i className="pi pi-phone text-gray-400"></i>
                {active?.activeUser?.Record?.cell_phone}
              </p>
              <p className="p-3 bg-gray-50 rounded-lg text-gray-800 flex items-center gap-2">
                <i className="pi pi-home text-gray-400"></i>
                {active?.activeUser?.Record?.home_phone}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="profile-field">
            <h3 className="text-sm text-gray-500 mb-1">Address</h3>
            <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
              {active?.activeUser?.Record?.address}
            </p>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
                {active?.activeUser?.Record?.city}
              </p>
              <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
                {active?.activeUser?.Record?.state}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
                {active?.activeUser?.Record?.county}
              </p>
              <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
                {active?.activeUser?.Record?.zip_code}
              </p>
            </div>
          </div>
          <div className="profile-field">
            <h3 className="text-sm text-gray-500 mb-1">Social Security</h3>
            <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
              {active?.activeUser?.Record?.social_security}
            </p>
          </div>
          <div className="profile-field">
            <h3 className="text-sm text-gray-500 mb-1">Dob</h3>
            <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
              {active?.activeUser?.Record?.dob}
            </p>
          </div>
        </div>
      </div>

      <Divider className="my-6" />

      <div className="position-info">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Position Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="profile-field">
              <h3 className="text-sm text-gray-500 mb-1">Application Date</h3>
              <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
                {active?.activeUser?.Record?.application_date}
              </p>
            </div>
            <div className="profile-field">
              <h3 className="text-sm text-gray-500 mb-1">Applying As</h3>
              <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
                {active?.activeUser?.Record?.applying_as}
              </p>
            </div>
            <div className="profile-field">
              <h3 className="text-sm text-gray-500 mb-1">
                {" "}
                Are you currently employed?
              </h3>
              <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
                {active?.activeUser?.Record?.question1}
              </p>
            </div>
            <div className="profile-field">
              <h3 className="text-sm text-gray-500 mb-1">
                {" "}
                If you are currently employed can we contact other employers?
              </h3>
              <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
                {active?.activeUser?.Record?.question3}
              </p>
            </div>
            <div className="profile-field">
              <h3 className="text-sm text-gray-500 mb-1">
                Are you willing to travel (locally)in the performing of your
                duties?
              </h3>
              <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
                {active?.activeUser?.Record?.question5}
              </p>
            </div>
            <div className="profile-field">
              <h3 className="text-sm text-gray-500 mb-1">
                Have you been convicted of a crime within the last 7 years?
              </h3>
              <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
                {active?.activeUser?.Record?.question9}
              </p>
            </div>
            <div className="profile-field">
              <h3 className="text-sm text-gray-500 mb-1">
                Are you 18 years of age or older?
              </h3>
              <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
                {active?.activeUser?.Record?.question7}
              </p>
            </div>
            <div className="profile-field">
              <h3 className="text-sm text-gray-500 mb-1">
                A plea of guilty or a conviction will not necessarily prevent you
                from being employed. Factors such as age at time of the offense,
                seriousness and nature of the offense, and rehabilitation
                efforts will be taken into account.
              </h3>
              <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
                {active?.activeUser?.Record?.details_questions_in_yes}
              </p>
            </div>
            <div className="profile-field">
              <h3 className="text-sm text-gray-500 mb-1">
                Do you know sign language?
              </h3>
              <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
                {active?.activeUser?.Record?.question12}
              </p>
            </div>
            <div className="profile-field">
              <h3 className="text-sm text-gray-500 mb-1">
                Please list your areas of highest proficiency, special skills or
                other items that may contribute to your abilities in performing
                the above mentioned position
              </h3>
              <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
                {active?.activeUser?.Record?.skills_list}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="profile-field">
              <h3 className="text-sm text-gray-500 mb-1">Position applied</h3>
              <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
                {active?.activeUser?.Record?.position_applied}
              </p>
            </div>
            <div className="profile-field">
              <h3 className="text-sm text-gray-500 mb-1">
                Available Start Date
              </h3>
              <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
                {active?.activeUser?.Record?.available_start_date}
              </p>
            </div>
            <div className="profile-field">
              <h3 className="text-sm text-gray-500 mb-1">
                Do you have a valid driver’s license?
              </h3>
              <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
                {active?.activeUser?.Record?.question2}
              </p>
            </div>
            <div className="profile-field">
              <h3 className="text-sm text-gray-500 mb-1">
                Do you have a reliable, insured mean of transportation?
              </h3>
              <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
                {active?.activeUser?.Record?.question4}
              </p>
            </div>
            <div className="profile-field">
              <h3 className="text-sm text-gray-500 mb-1">
                {" "}
                Have you pleaded guilty to a crime within the last 7 years?
              </h3>
              <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
                {active?.activeUser?.Record?.question6}
              </p>
            </div>
            <div className="profile-field">
              <h3 className="text-sm text-gray-500 mb-1">
                {" "}
                Have you been on probation within the last 7 years?
              </h3>
              <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
                {active?.activeUser?.Record?.question8}
              </p>
            </div>
            <div className="profile-field">
              <h3 className="text-sm text-gray-500 mb-1">
                Have you ever been accused of or investigatedfor child
                abuse/neglect?
              </h3>
              <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
                {active?.activeUser?.Record?.question10}
              </p>
            </div>
            <div className="profile-field">
              <h3 className="text-sm text-gray-500 mb-1">
                Do you speak any language other than English?
              </h3>
              <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
                {active?.activeUser?.Record?.question11}
              </p>
            </div>
            <div className="profile-field">
              <h3 className="text-sm text-gray-500 mb-1">
                List any languages that you speak:
              </h3>
              <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
                {active?.activeUser?.Record?.language_list}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Divider className="my-6" />
      <div className="position-info">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Education</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* this two */}
          {(active?.activeUser?.Record?.education.second_institution ||
            active?.activeUser?.Record?.education.second_course ||
            active?.activeUser?.Record?.education.second_started ||
            active?.activeUser?.Record?.education.second_completed) &&
            <div className="space-y-4">
              <div className="profile-field">
                <h3 className="text-sm text-gray-500 mb-1">Institution</h3>
                <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
                  {active?.activeUser?.Record?.education.institution}
                </p>
              </div>
              <div className="profile-field">
                <h3 className="text-sm text-gray-500 mb-1">Course of Study</h3>
                <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
                  {active?.activeUser?.Record?.education.course}
                </p>
              </div>
              <div className="profile-field">
                <h3 className="text-sm text-gray-500 mb-1">Started</h3>
                <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
                  {active?.activeUser?.Record?.education.started}
                </p>
              </div>
              <div className="profile-field">
                <h3 className="text-sm text-gray-500 mb-1">Completed</h3>
                <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
                  {active?.activeUser?.Record?.education.completed}
                </p>
              </div>
              <Divider className="my-6" />
              <div className="profile-field">
                <h3 className="text-sm text-gray-500 mb-1">Institution</h3>
                <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
                  {active?.activeUser?.Record?.education.third_institution}
                </p>
              </div>
              <div className="profile-field">
                <h3 className="text-sm text-gray-500 mb-1">Course of Study</h3>
                <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
                  {active?.activeUser?.Record?.education.third_course}
                </p>
              </div>
              <div className="profile-field">
                <h3 className="text-sm text-gray-500 mb-1">Started</h3>
                <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
                  {active?.activeUser?.Record?.education.third_started}
                </p>
              </div>
              <div className="profile-field">
                <h3 className="text-sm text-gray-500 mb-1">Completed</h3>
                <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
                  {active?.activeUser?.Record?.education.third_completed}
                </p>
              </div>
            </div>
          }
          {/* this one */}
          {(active?.activeUser?.Record?.education.second_institution ||
            active?.activeUser?.Record?.education.second_course ||
            active?.activeUser?.Record?.education.second_started ||
            active?.activeUser?.Record?.education.second_completed
          ) &&
            <div className="space-y-4">
              <div className="profile-field">
                <h3 className="text-sm text-gray-500 mb-1">Institution</h3>
                <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
                  {active?.activeUser?.Record?.education.second_institution}
                </p>
              </div>
              <div className="profile-field">
                <h3 className="text-sm text-gray-500 mb-1">Course of Study</h3>
                <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
                  {active?.activeUser?.Record?.education.second_course}
                </p>
              </div>
              <div className="profile-field">
                <h3 className="text-sm text-gray-500 mb-1">Started</h3>
                <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
                  {active?.activeUser?.Record?.education.second_started}
                </p>
              </div>
              <div className="profile-field">
                <h3 className="text-sm text-gray-500 mb-1">Completed</h3>
                <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
                  {active?.activeUser?.Record?.education.second_completed}
                </p>
              </div>
            </div>            
          }
        </div>
      </div>
      <Divider className="my-6" />
      <div className="position-info">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Employment History
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="profile-field">
              <h3 className="text-sm text-gray-500 mb-1">Employer</h3>
              <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
                {active?.activeUser?.Record?.employment_history.employer}
              </p>
            </div>
            <div className="profile-field">
              <h3 className="text-sm text-gray-500 mb-1">Address</h3>
              <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
                {active?.activeUser?.Record?.employment_history.address}
              </p>
            </div>
            <div className="profile-field">
              <h3 className="text-sm text-gray-500 mb-1">
                Supervisor or contact person
              </h3>
              <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
                {active?.activeUser?.Record?.employment_history.supervisor}
              </p>
            </div>
            <div className="profile-field">
              <h3 className="text-sm text-gray-500 mb-1">Phone Number</h3>
              <p className="p-3 bg-gray-50 rounded-lg text-gray-800 flex items-center gap-2">
                <i className="pi pi-phone text-gray-400"></i>
                {active?.activeUser?.Record?.employment_history.phone}
              </p>
            </div>
            <div className="profile-field">
              <h3 className="text-sm text-gray-500 mb-1">Period you worked</h3>
              <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
                {active?.activeUser?.Record?.employment_history.period}
              </p>
            </div>
            <div className="profile-field">
              <h3 className="text-sm text-gray-500 mb-1">Position Held</h3>
              <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
                {active?.activeUser?.Record?.employment_history.position}
              </p>
            </div>
            <div className="profile-field">
              <h3 className="text-sm text-gray-500 mb-1">
                Reason for leaving:
              </h3>
              <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
                {active?.activeUser?.Record?.employment_history.reason}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="profile-field">
              <h3 className="text-sm text-gray-500 mb-1">Employer</h3>
              <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
                {active?.activeUser?.Record?.employment_history.second_employer}
              </p>
            </div>
            <div className="profile-field">
              <h3 className="text-sm text-gray-500 mb-1">Address</h3>
              <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
                {active?.activeUser?.Record?.employment_history.second_address}
              </p>
            </div>
            <div className="profile-field">
              <h3 className="text-sm text-gray-500 mb-1">
                Supervisor or contact person
              </h3>
              <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
                {
                  active?.activeUser?.Record?.employment_history
                    .second_supervisor
                }
              </p>
            </div>
            <div className="profile-field">
              <h3 className="text-sm text-gray-500 mb-1">Phone Number</h3>
              <p className="p-3 bg-gray-50 rounded-lg text-gray-800 flex items-center gap-2">
                <i className="pi pi-phone text-gray-400"></i>
                {active?.activeUser?.Record?.employment_history.second_phone}
              </p>
            </div>
            <div className="profile-field">
              <h3 className="text-sm text-gray-500 mb-1">Period you worked</h3>
              <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
                {active?.activeUser?.Record?.employment_history.second_period}
              </p>
            </div>
            <div className="profile-field">
              <h3 className="text-sm text-gray-500 mb-1">Position Held</h3>
              <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
                {active?.activeUser?.Record?.employment_history.second_position}
              </p>
            </div>
            <div className="profile-field">
              <h3 className="text-sm text-gray-500 mb-1">
                Reason for leaving:
              </h3>
              <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
                {active?.activeUser?.Record?.employment_history.second_reason}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="mt-6 flex justify-end">
                        <Button
                            label="Update Profile"
                            icon="pi pi-user-edit"
                            className="p-button-primary text-lg px-3 py-3 rounded-md"
                            style={{ minWidth: '200px' }}
                        />
                    </div> */}
    </>
  );
};

type Props = {
  active?: Active;
  // relad(): void;
};
