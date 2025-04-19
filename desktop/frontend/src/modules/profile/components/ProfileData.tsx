import { PaperClipIcon } from "@heroicons/react/20/solid";
// -- New Struct
import { Active } from "../../../models";
// const ProfileData = ({ activeUser }: Props) => {
const ProfileData = ({ active, relad }: Props) => {
  return (
    <div className="w-full p-5 ">
      <div className="w-full p-0 border-2 border-primary">
        <div className='p-3 bg-gray-200'>
          <div className='text-2xl tracking-tight place-items-center'>Personal Information</div>
        </div >
        <div className="m-0 p-0  border-t-2 border-primary">
          {/* row 1 */}
          <div className="md:flex lg:flex w-full">
            <div className="md:flex lg:md:flex w-full border-b-2 border-primary">
              <div className="flex w-full md:w-1/3 lg:w-1/3 border-b-2  border-primary md:border-b-0 lg:border-b-0 place-items-center">
                <div className="grid flex-grow w-1/4 pl-5">
                  Full Name:
                </div>
                <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-3/4 p-1 pl-0">
                  <div className="p-inputgroup flex-1">
                    {active?.activeUser?.Record?.fullname}
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/3 lg:w-1/3 border-b-2  border-primary md:border-b-0 lg:border-b-0">
                <div className="flex w-full place-items-center">
                  <div className="grid flex-grow w-1/4 pl-5">
                    E-Mail Address:
                  </div>
                  <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-3/4 p-1 pl-0">
                    <div className="p-inputgroup flex-1">
                      {active?.activeUser?.Record?.email}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-full md:w-1/3 lg:w-1/3 place-items-center">
                <div className="grid flex-grow w-1/4 pl-5">
                  Home Address:
                </div>
                <div className="grid w-3/4 p-1 pl-0">
                  <div className="p-inputgroup flex-1">
                    {active?.activeUser?.Record?.address}
                  </div>
                </div>
              </div>
            </div>

          </div>
          {/* row 2 */}
          <div className="md:flex lg:flex w-full">
            <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
              <div className="flex w-full place-items-center">
                <div className="flex grid border-r-2 border-primary w-2/4 p-1">
                  <div className="flex w-full place-items-center p-0 m-0">
                    <div className="grid w-2/4 pl-4">
                      City:
                    </div>
                    <div className="grid w-2/4">
                      <div className="p-inputgroup flex-1">
                        {active?.activeUser?.Record?.city}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex grid  md:border-r-2 lg:border-r-2 border-primary w-2/4 p-1">
                  <div className="flex w-full place-items-center">
                    <div className="flex w-full place-items-center">
                      <div className="grid w-2/5">
                        State:
                      </div>
                      <div className="grid w-3/5">
                        <div className="p-inputgroup flex-1">
                          {active?.activeUser?.Record?.state}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
              <div className="flex w-full place-items-center">
                <div className="flex grid border-r-2 border-primary w-2/4 p-1">
                  <div className="flex w-full place-items-center p-0 m-0">

                    <div className="grid w-2/4 pl-4">
                      Zip Code:
                    </div>

                    <div className="grid w-2/4">
                      <div className="p-inputgroup flex-1">
                        {active?.activeUser?.Record?.zip_code}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex grid w-2/4 p-1">
                  <div className="flex w-full place-items-center">
                    <div className="flex w-full place-items-center">

                      <div className="grid w-2/5">
                        County:
                      </div>
                      <div className="grid w-3/5">
                        <div className="p-inputgroup flex-1">
                          {active?.activeUser?.Record?.county}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* row 3 */}
          <div className="md:flex lg:flex w-full">
            <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
              <div className="flex w-full place-items-center">
                <div className="flex grid border-r-2 border-primary w-2/4 p-1">
                  <div className="flex w-full place-items-center p-0 m-0">
                    <div className="grid w-2/4 pl-4">
                      Home Phone:
                    </div>
                    <div className="grid w-2/4">
                      <div className="p-inputgroup flex-1">
                        {active?.activeUser?.Record?.home_phone}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex grid  md:border-r-2 lg:border-r-2 border-primary w-2/4 p-1">
                  <div className="flex w-full place-items-center">
                    <div className="flex w-full place-items-center">
                      <div className="grid w-2/5">
                        Cell Phone:
                      </div>

                      <div className="grid w-3/5">
                        <div className="p-inputgroup flex-1">
                          {active?.activeUser?.Record?.cell_phone}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
              <div className="flex w-full place-items-center">
                <div className="flex grid border-r-2 border-primary w-2/4 p-1">
                  <div className="flex w-full place-items-center p-0 m-0">
                    <div className="grid w-2/4 pl-4">
                      Social Security:
                    </div>
                    <div className="grid w-2/4">
                      <div className="p-inputgroup flex-1">
                        {active?.activeUser?.Record?.social_security}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex grid w-2/4 p-1">
                  <div className="flex w-full place-items-center">
                    <div className="flex w-full place-items-center">
                      <div className="grid w-2/5">
                        DOB:
                      </div>

                      <div className="grid w-3/5">
                        <div className="p-inputgroup flex-1">
                          {active?.activeUser?.Record?.dob}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* POSITION / AVAILABILITY */}
        <div className='p-3 bg-gray-200'>
          <div className='text-2xl tracking-tight place-items-center'>Position / Availability</div>
        </div>
        <div className="m-0 p-0 w-full border-t-2 border-primary">
          {/* row 1 */}
          <div className="md:flex lg:flex w-full">
            <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
              <div className="flex w-full place-items-center">
                <div className="flex grid border-r-2 border-primary w-2/4 p-1">
                  <div className="flex w-full place-items-center p-0 m-0">
                    <div className="grid w-2/4 pl-4">
                      Application Date:
                    </div>
                    <div className="grid w-2/4">
                      <div className="p-inputgroup flex-1">
                        {active?.activeUser?.Record?.application_date}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex grid  md:border-r-2 lg:border-r-2 border-primary w-2/4 p-1">
                  <div className="flex w-full place-items-center">
                    <div className="flex w-full place-items-center">
                      <div className="grid w-2/5">
                        Applying as:
                      </div>

                      <div className="grid w-3/5">
                        <div className="p-inputgroup flex-1">
                          {active?.activeUser?.Record?.applying_as}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
              <div className="flex w-full place-items-center">
                <div className="flex grid border-r-2 border-primary w-2/4 p-1">
                  <div className="flex w-full place-items-center p-0 m-0">
                    <div className="grid w-2/4 pl-4">
                      Position applied:
                    </div>
                    <div className="grid w-2/4">
                      <div className="p-inputgroup flex-1">
                        {active?.activeUser?.Record?.position_applied}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex grid w-2/4 p-1">
                  <div className="flex w-full place-items-center">
                    <div className="flex w-full place-items-center">
                      <div className="grid w-2/5">
                        Available Start Date:
                      </div>

                      <div className="grid w-3/5">
                        <div className="p-inputgroup flex-1">
                          {active?.activeUser?.Record?.available_start_date}
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* row 2 */}
          <div className="md:flex lg:flex w-full">
            <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
              <div className="flex w-full place-items-center">
                <div className="grid flex-grow w-1/4 pl-4">
                  Available For:
                </div>
                <div className="grid md:border-r-2 lg:border-r-2 border-primary w-3/4 p-1 pl-0 m-0 text-right">
                  {active?.activeUser?.Record?.available_for}
                </div>
              </div>
            </div>
            <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
              <div className="flex w-full place-items-center">
                <div className="grid flex-grow w-2/4 pl-4">
                  Resume:
                </div>
                <div className="grid w-2/4 p-1 pl-0 text-right">
                  <div>

                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* row 3 */}
          <div className="md:flex lg:flex w-full">
            <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
              <div className="flex w-full place-items-center">
                <div className="grid w-3/4 pl-4">
                  Are you currently employed?
                </div>
                <div className="grid w-1/4 md:border-r-2 lg:border-r-2 border-primary p-1 pl-0 pr-5 text-right">
                  {active?.activeUser?.Record?.question1}
                </div>
              </div>
            </div>
            <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
              <div className="flex w-full place-items-center">
                <div className="grid flex-grow w-3/4 pl-4">
                  Do you have a valid driver’s license?
                </div>
                <div className="grid w-1/4 p-1 pl-0 pr-5 text-right">
                  {active?.activeUser?.Record?.question2}
                </div>
              </div>

            </div>
          </div>
          {/* row 4 */}
          <div className="md:flex lg:flex w-full">
            <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
              <div className="flex w-full place-items-center">
                <div className="grid w-3/4 pl-4">
                  If you are currently employed can we contact other employers?
                </div>
                <div className="grid w-1/4 md:border-r-2 lg:border-r-2 border-primary p-1 pl-0 pr-5 text-right">
                  {active?.activeUser?.Record?.question3}
                </div>
              </div>
            </div>
            <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">

              <div className="flex w-full place-items-center">
                <div className="grid flex-grow w-3/4 pl-4">
                  Do you have a reliable, insured mean of transportation?
                </div>
                <div className="grid w-1/4 p-1 pl-0 pr-5 text-right">
                  {active?.activeUser?.Record?.question4}
                </div>
              </div>

            </div>
          </div>
          {/* row 5 */}
          <div className="md:flex lg:flex w-full">
            <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
              <div className="flex w-full place-items-center">
                <div className="grid w-3/4 pl-4">
                  Are you willing to travel (locally)in the performing of your duties?
                </div>
                <div className="grid w-1/4 md:border-r-2 lg:border-r-2 border-primary p-1 pl-0 pr-5 text-right">
                  {active?.activeUser?.Record?.question5}
                </div>
              </div>
            </div>
            <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">

              <div className="flex w-full place-items-center">
                <div className="grid flex-grow w-3/4 pl-4">
                  Have you pleaded guilty to a crime within the last 7 years?
                </div>
                <div className="grid w-1/4 p-1 pl-0 pr-5 text-right">
                  {active?.activeUser?.Record?.question6}
                </div>
              </div>
            </div>
          </div>
          {/* row 6 */}
          <div className="md:flex lg:flex w-full">
            <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
              <div className="flex w-full place-items-center">
                <div className="grid w-3/4 pl-4">
                  Have you been convicted of a crime within the last 7 years?
                </div>
                <div className="grid w-1/4 md:border-r-2 lg:border-r-2 border-primary p-1 pl-0 pr-5 text-right">
                  {active?.activeUser?.Record?.question7}
                </div>
              </div>
            </div>
            <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
              <div className="flex w-full place-items-center">
                <div className="grid flex-grow w-2/4 pl-4">
                  Have you been on probation within the last 7 years?
                </div>
                <div className="grid w-2/4 p-1 pl-0 pr-5 text-right">
                  {active?.activeUser?.Record?.question8}
                </div>
              </div>
            </div>
          </div>
          {/* row 7 */}
          <div className="md:flex lg:flex w-full">
            <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
              <div className="flex w-full place-items-center">
                <div className="grid w-3/4 pl-4">
                  Are you 18 years of age or older?
                </div>
                <div className="grid w-1/4 md:border-r-2 lg:border-r-2 border-primary p-1 pl-0 pr-5 text-right">
                  {active?.activeUser?.Record?.question9}
                </div>
              </div>
            </div>
            <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
              <div className="flex w-full place-items-center">
                <div className="grid flex-grow w-3/4 pl-4">
                  Have you ever been accused of or investigatedfor child abuse/neglect?
                </div>
                <div className="grid w-1/4 p-1 pl-0 pr-5 text-right">
                  {active?.activeUser?.Record?.question10}
                </div>
              </div>
            </div>
          </div>
          {/* row 8 */}
          {active?.activeUser?.Record?.details_questions_in_yes !== "" && <div className="md:flex lg:flex w-full">
            <div className="w-full border-b-2 border-primary">
              <div className="w-full place-items-center">
                <div className="w-full pl-4">
                  <p className="m-0 text-justify">
                    A plea of guilty or a conviction will not necessarily prevent you from being employed.
                    Factors such as age at time of the offense, seriousness and nature of the offense, and
                    rehabilitation efforts will be taken into account.
                  </p>
                </div>
              </div>
              <div className="w-full place-items-center">
                <div className="grid w-full p-1 pl-2">
                  <div className="p-inputgroup flex-1">
                    {active?.activeUser?.Record?.details_questions_in_yes}
                  </div>
                </div>
              </div>
              <div className="w-full place-items-center">
                <div className="w-full pl-4">
                  <p className="m-0 mb-4 text-justify">
                    If the answer to any of these questions is Yes, please give as many details as you can
                  </p>
                </div>
              </div>
            </div>
          </div>}
          {/* row 9 */}
          <div className='p-3 border-b-2 border-primary'>
            <b>Please tell us about any skills that apply to you</b>
          </div>
          <div className="md:flex lg:flex w-full">
            <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
              <div className="flex w-full place-items-center">
                <div className="grid w-3/4 pl-4">
                  Do you speak any language other than English?
                </div>
                <div className="grid w-1/4 md:border-r-2 lg:border-r-2 border-primary p-1 pl-0 pr-5 text-right">
                  {active?.activeUser?.Record?.question11}
                </div>
              </div>
            </div>
            <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">

              <div className="flex w-full place-items-center">
                <div className="grid w-3/4 pl-4">
                  Do you know sign language?
                </div>
                <div className="grid w-1/4 border-primary p-1 pl-0 pr-5 text-right">
                  {active?.activeUser?.Record?.question12}
                </div>
              </div>
            </div>
          </div>
          <div className='border-b-2 border-primary'>
            <div className="flex w-full place-items-center">
              <div className="grid flex-grow w-1/4 pl-4">
                List any languages that you speak:
              </div>
              <div className="grid w-3/4 p-1 pl-0">
                <div className="card p-fluid">
                  <div className="p-inputgroup flex-1">
                    {active?.activeUser?.Record?.language_list}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* row 10 */}
          <div className='p-3'>
            <b>Please list your areas of highest proficiency, special skills or other items that may contribute to your abilities in performing the above mentioned position:</b>
          </div>
          <div className='p-3'>
            <div className="card p-fluid">
              <div className="p-inputgroup flex-1">
                {active?.activeUser?.Record?.skills_list}
              </div>
            </div>
          </div>
        </div>
        {/* EDUCATION */}
        <div className='p-3 bg-gray-200 border-t-2 border-primary'>
          <div className='text-2xl tracking-tight place-items-center'>Education</div>
        </div>
        <div className="m-0 p-0 w-full border-t-2 border-primary">
          {/* row 1 */}
          <div className="md:flex lg:flex w-full">
            <div className="w-full md:w-1/3 lg:w-2/4 border-b-2 border-primary">
              <div className="flex w-full place-items-center">
                <div className="grid flex-grow w-1/4 pl-5">
                  Institution:
                </div>
                <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-3/4 p-1 pl-0">
                  <div className="p-inputgroup flex-1">
                    {active?.activeUser?.Record?.education.institution}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 lg:w-2/4 border-b-2 border-primary">
              <div className="flex w-full place-items-center">
                <div className="grid flex-grow w-1/4 pl-5">
                  Course of Study:
                </div>
                <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-3/4 p-1 pl-0">
                  <div className="p-inputgroup flex-1">
                    {active?.activeUser?.Record?.education.course}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 lg:w-2/4 border-b-2 border-primary">
              <div className="flex w-full place-items-center">
                <div className="flex grid border-r-2 border-primary w-2/4 p-1">
                  <div className="flex w-full place-items-center p-0 m-0">
                    <div className="grid w-2/4 pl-4">
                      Started:
                    </div>
                    <div className="grid w-2/4">
                      <div className="p-inputgroup flex-1">
                        {active?.activeUser?.Record?.education.started}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex grid w-2/4 p-1">
                  <div className="flex w-full place-items-center">
                    <div className="flex w-full place-items-center">
                      <div className="grid w-2/4 pl-4">
                        Completed:
                      </div>

                      <div className="grid w-2/4">
                        <div className="p-inputgroup flex-1">
                          {active?.activeUser?.Record?.education.completed}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* row 2 */}
          {active?.activeUser?.Record?.education.second_institution !== "" &&
            <div className="md:flex lg:flex w-full">
              <div className="w-full md:w-1/3 lg:w-2/4 border-b-2 border-primary">
                <div className="flex w-full place-items-center">
                  <div className="grid flex-grow w-1/4 pl-5">
                    Institution:
                  </div>
                  <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-3/4 p-1 pl-0">
                    <div className="p-inputgroup flex-1">
                      {active?.activeUser?.Record?.education.second_institution}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/3 lg:w-2/4 border-b-2 border-primary">
                <div className="flex w-full place-items-center">
                  <div className="grid flex-grow w-1/4 pl-5">
                    Course of Study:
                  </div>
                  <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-3/4 p-1 pl-0">
                    <div className="p-inputgroup flex-1">
                      {active?.activeUser?.Record?.education.second_course}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/3 lg:w-2/4 border-b-2 border-primary">
                <div className="flex w-full place-items-center">
                  <div className="flex grid border-r-2 border-primary w-2/4 p-1">
                    <div className="flex w-full place-items-center p-0 m-0">
                      <div className="grid w-2/4 pl-4">
                        Started:
                      </div>
                      <div className="grid w-2/4">
                        <div className="p-inputgroup flex-1">
                          {active?.activeUser?.Record?.education.second_started}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex grid w-2/4 p-1">
                    <div className="flex w-full place-items-center">
                      <div className="flex w-full place-items-center">
                        <div className="grid w-2/4 pl-4">
                          Completed:
                        </div>

                        <div className="grid w-2/4">
                          <div className="p-inputgroup flex-1">
                            {active?.activeUser?.Record?.education.second_completed}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
          {/* row 3 */}
          {active?.activeUser?.Record?.education.third_institution !== "" && <div className="md:flex lg:flex w-full">
            <div className="w-full md:w-1/3 lg:w-2/4 border-b-2 border-primary">
              <div className="flex w-full place-items-center">
                <div className="grid flex-grow w-1/4 pl-5">
                  Institution:
                </div>
                <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-3/4 p-1 pl-0">
                  <div className="p-inputgroup flex-1">
                    {active?.activeUser?.Record?.education.third_institution}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 lg:w-2/4 border-b-2 border-primary">
              <div className="flex w-full place-items-center">
                <div className="grid flex-grow w-1/4 pl-5">
                  Course of Study:
                </div>
                <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-3/4 p-1 pl-0">
                  <div className="p-inputgroup flex-1">
                    {active?.activeUser?.Record?.education.third_course}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 lg:w-2/4 border-b-2 border-primary">
              <div className="flex w-full place-items-center">
                <div className="flex grid border-r-2 border-primary w-2/4 p-1">
                  <div className="flex w-full place-items-center p-0 m-0">
                    <div className="grid w-2/4 pl-4">
                      Started:
                    </div>
                    <div className="grid w-2/4">
                      <div className="p-inputgroup flex-1">
                        {active?.activeUser?.Record?.education.third_started}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex grid w-2/4 p-1">
                  <div className="flex w-full place-items-center">
                    <div className="flex w-full place-items-center">
                      <div className="grid w-2/4 pl-4">
                        Completed:
                      </div>
                      <div className="grid w-2/4">
                        <div className="p-inputgroup flex-1">
                          {active?.activeUser?.Record?.education.third_completed}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          }
        </div>
        {/* EMPLOYMENT HISTORY */}
        <div className='p-3 bg-gray-200'>
          <div className='text-2xl tracking-tight place-items-center'>Employment History</div>
        </div>
        <div className="m-0 p-0 w-full border-t-2 border-primary">
          {/* EMPLOYMENT HISTORY 1 */}
          <div className="md:flex lg:flex w-full">
            <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
              <div className="flex w-full place-items-center">
                <div className="grid flex-grow w-1/4 pl-5">
                  Employer:
                </div>
                <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-3/4 p-1 pl-0">
                  <div className="p-inputgroup flex-1">
                    {active?.activeUser?.Record?.employment_history.employer}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
              <div className="flex w-full place-items-center">
                <div className="grid flex-grow w-1/4 pl-5">
                  Address:
                </div>
                <div className="grid  w-3/4 p-1 pl-0">
                  <div className="p-inputgroup flex-1">
                    {active?.activeUser?.Record?.employment_history.address}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* row 2 */}
          <div className="md:flex lg:flex w-full">
            <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
              <div className="flex w-full place-items-center">
                <div className="grid flex-grow w-1/4 pl-5">
                  Supervisor or contact person:
                </div>
                <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-3/4 p-1 pl-0">
                  <div className="p-inputgroup flex-1">
                    {active?.activeUser?.Record?.employment_history.supervisor}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
              <div className="flex w-full place-items-center">
                <div className="grid flex-grow w-1/4 pl-5">
                  Phone Number:
                </div>
                <div className="grid  w-3/4 p-1 pl-0">
                  <div className="p-inputgroup flex-1">
                    {active?.activeUser?.Record?.employment_history.phone}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:flex lg:flex w-full">
            <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
              <div className="flex w-full place-items-center">
                <div className="grid flex-grow w-1/4 pl-5">
                  Period you worked:
                </div>
                <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-3/4 p-1 pl-0">
                  <div className="p-inputgroup flex-1">
                    {active?.activeUser?.Record?.employment_history.period}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
              <div className="flex w-full place-items-center">
                <div className="grid flex-grow w-1/4 pl-5">
                  Position Held:
                </div>
                <div className="grid  w-3/4 p-1 pl-0">
                  <div className="p-inputgroup flex-1">
                    {active?.activeUser?.Record?.employment_history.position}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full place-items-center">
            <div className="grid w-full p-1 pl-0">
              <div className="w-full">
                <div className="w-full place-items-center">
                  <div className="w-full pl-4">
                    <p className="m-0 text-justify">
                      Reason for leaving:
                    </p>
                  </div>
                </div>
                <div className="w-full place-items-center">
                  <div className="grid w-full p-1 pl-2">
                    <div className="p-inputgroup flex-1">
                      {active?.activeUser?.Record?.employment_history.reason}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* EMPLOYMENT HISTORY 2 */}
          <div className="md:flex lg:flex w-full border-t-2 border-primary">
            <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
              <div className="flex w-full place-items-center">
                <div className="grid flex-grow w-1/4 pl-5">
                  Employer:
                </div>
                <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-3/4 p-1 pl-0">
                  <div className="p-inputgroup flex-1">
                    {active?.activeUser?.Record?.employment_history.second_employer}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
              <div className="flex w-full place-items-center">
                <div className="grid flex-grow w-1/4 pl-5">
                  Address:
                </div>
                <div className="grid  w-3/4 p-1 pl-0">
                  <div className="p-inputgroup flex-1">
                    {active?.activeUser?.Record?.employment_history.second_address}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* row 2 */}
          <div className="md:flex lg:flex w-full">
            <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
              <div className="flex w-full place-items-center">
                <div className="grid flex-grow w-1/4 pl-5">
                  Supervisor or contact person:
                </div>
                <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-3/4 p-1 pl-0">
                  <div className="p-inputgroup flex-1">
                    {active?.activeUser?.Record?.employment_history.second_supervisor}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
              <div className="flex w-full place-items-center">
                <div className="grid flex-grow w-1/4 pl-5">
                  Phone Number:
                </div>
                <div className="grid  w-3/4 p-1 pl-0">
                  <div className="p-inputgroup flex-1">
                    {active?.activeUser?.Record?.employment_history.second_phone}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:flex lg:flex w-full">
            <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
              <div className="flex w-full place-items-center">
                <div className="grid flex-grow w-1/4 pl-5">
                  Period you worked:
                </div>
                <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-3/4 p-1 pl-0">
                  <div className="p-inputgroup flex-1">
                    {active?.activeUser?.Record?.employment_history.second_period}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
              <div className="flex w-full place-items-center">
                <div className="grid flex-grow w-1/4 pl-5">
                  Position Held:
                </div>
                <div className="grid  w-3/4 p-1 pl-0">
                  <div className="p-inputgroup flex-1">
                    {active?.activeUser?.Record?.employment_history.second_position}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full place-items-center">
            <div className="grid w-full p-1 pl-0">
              <div className="w-full">
                <div className="w-full place-items-center">
                  <div className="w-full pl-4">
                    <p className="m-0 text-justify">
                      Reason for leaving:
                    </p>
                  </div>
                </div>
                <div className="w-full place-items-center">
                  <div className="grid w-full p-1 pl-2">
                    <div className="p-inputgroup flex-1">
                      {active?.activeUser?.Record?.employment_history.second_reason}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

type Props = {
  active?: Active;
  relad(): void;
};
export { ProfileData };
