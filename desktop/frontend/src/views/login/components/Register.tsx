import React, { useState } from "react";
import { ProfileBanner } from "./ProfileBanner";
import { TabView, TabPanel } from 'primereact/tabview';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Fieldset } from 'primereact/fieldset';
import { InputMask } from "primereact/inputmask";
import { Panel } from 'primereact/panel';
import { Calendar } from 'primereact/calendar';
import { SelectButton } from 'primereact/selectbutton';
const RegisterFormContiner = () => {
  const [date, setDate] = useState(null);
  const options = ['Yes', 'No'];
  const options2 = ['Yes', 'No'];
  const [value, setValue] = useState(options[0]);
  const options1 = ['Yes', 'No'];
  const [value1, setValue1] = useState(options1[0]);
  const [value2, setValue2] = useState(options2[0]);

  return (
    <div className="h-screen flex  flex-col">
      <ProfileBanner />
      <div className="card">
        <TabView className="bg-gray-100">
          <TabPanel header="Initial Hire">
            <p className="m-0">

              <Panel header="APPLICATION FOR EMPLOYMENT">
                <p className="m-0 text-justify">
                  Please answer all questions. If one does not apply, write N/A. Equal access programs,
                  services and employment is available toall persons. Reasonable accommodations will be
                  made for applicants who require accommodation for the application or interview process,
                  and if hired, to perform essential functions of a job.
                </p>
              </Panel>

              <Panel header="PERSONAL INFORMATION">
                <p className="m-0 text-justify">
                  <div className="flex w-full">
                    <div className="grid flex-grow w-1/5 place-items-center">Applicant’s Full Name:</div>
                    <div className="grid flex-grow w-4/5 place-items-center border-b-2 border-gray-800">
                      <div className="flex w-full place-items-center">
                        <div className="grid place-items-center w-2/5">
                          <input type="text" placeholder="Type your last names" className="input input-ghost w-full text-center" />
                        </div>
                        <div className="grid place-items-center w-2/5">
                          <input type="text" placeholder="Type your first Name" className="input input-ghost w-full text-center" />
                        </div>
                        <div className="grid place-items-center w-1/5">
                          <input type="text" placeholder="Type the middle initial" className="input input-ghost w-full text-center" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full">
                    <div className="grid flex-grow w-1/5"></div>
                    <div className="grid flex-grow w-4/5">
                      <div className="flex w-full">
                        <div className="grid place-items-center w-2/5">
                          <h5 className="text-sm">Last</h5>
                        </div>
                        <div className="grid place-items-center w-2/5">
                          <h5 className="text-sm">First</h5>
                        </div>
                        <div className="grid place-items-center w-1/5">
                          <h5 className="text-sm">Middle Initial</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full">
                    <div className="grid flex-grow w-1/5 place-items-center">Home Address:</div>
                    <div className="grid flex-grow w-4/5 border-b-2 border-gray-800">
                      <div className="flex w-full">

                        <input type="text" placeholder="Type Home Address" className="input input-ghost w-full text-center" />

                      </div>
                    </div>
                  </div>
                  <div className="flex w-full">
                    <div className="grid flex-grow w-2/4 place-items-center">
                      <div className="flex w-full">
                        <div className="grid flex-grow w-1/5 place-items-center">City:</div>
                        <div className="grid flex-grow w-4/5 border-b-2 border-gray-800">
                          <div className="flex w-full">
                            <input type="text" placeholder="Type City" className="input input-ghost w-full text-center" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid flex-grow w-1/4 place-items-center">
                      <div className="flex w-full">
                        <div className="grid flex-grow w-1/5 place-items-center">State:</div>
                        <div className="grid flex-grow w-4/5 border-b-2 border-gray-800">
                          <div className="flex w-full">
                            <input type="text" placeholder="Type State" className="input input-ghost w-full text-center" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid flex-grow w-1/4 place-items-center">
                      <div className="flex w-full">
                        <div className="grid flex-grow w-1/5 place-items-center">Zip Code:</div>
                        <div className="grid flex-grow w-4/5 border-b-2 border-gray-800">
                          <div className="flex w-full">
                            <input type="text" placeholder="Type Zip Code" className="input input-ghost w-full text-center" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full">
                    <div className="grid flex-grow w-2/4 place-items-center">
                      <div className="flex w-full">
                        <div className="grid flex-grow w-2/5 place-items-center">Home Phone Number:</div>
                        <div className="grid flex-grow w-3/5 border-b-2 border-gray-800">
                          <div className="flex w-full">
                            <InputMask id="phone" mask="+99 (999) 999-9999" placeholder="+01 (999) 999-9999" className="input input-ghost border-0 w-full text-center"></InputMask>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid flex-grow w-2/4 place-items-center">
                      <div className="flex w-full">
                        <div className="grid flex-grow w-2/5 place-items-center">Cell Phone Number:</div>
                        <div className="grid flex-grow w-3/5 border-b-2 border-gray-800">
                          <div className="flex w-full">
                            <InputMask id="phone" mask="+99 (999) 999-9999" placeholder="+01 (999) 999-9999" className="input input-ghost border-0 w-full text-center hidden-border"></InputMask>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full">
                    <div className="grid flex-grow w-2/4 place-items-center">
                      <div className="flex w-full">
                        <div className="grid flex-grow w-2/5 place-items-center">Social Security Number:</div>
                        <div className="grid flex-grow w-3/5 border-b-2 border-gray-800">
                          <div className="flex w-full">
                            <InputMask id="phone" mask="9999999" placeholder="9999999" className="input input-ghost border-0 w-full text-center"></InputMask>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid flex-grow w-2/4 place-items-center">
                      <div className="flex w-full">
                        <div className="grid flex-grow w-1/5 place-items-center">DOB:</div>
                        <div className="grid flex-grow w-4/5 border-b-2 border-gray-800">
                          <div className="flex w-full">
                            <InputMask id="phone" mask="+99 (999) 999-9999" placeholder="+01 (999) 999-9999" className="input input-ghost border-0 w-full text-center hidden-border"></InputMask>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full">
                    <div className="grid flex-grow w-1/5 place-items-center">E-Mail Address:</div>
                    <div className="grid flex-grow w-4/5 border-b-2 border-gray-800">
                      <div className="flex w-full">
                        <input type="text" placeholder="Type E-Mail Address" className="input input-ghost w-full text-center" />
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full">
                    <div className="grid flex-grow w-2/4 place-items-center">
                      <div className="flex w-full">
                        <div className="grid flex-grow w-2/5 place-items-center">Emergency Contact:</div>
                        <div className="grid flex-grow w-3/5 border-b-2 border-gray-800">
                          <div className="flex w-full">
                            <input type="text" placeholder="Type the name of the contact" className="input input-ghost w-full text-center" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid flex-grow w-2/4 place-items-center">
                      <div className="flex w-full">
                        <div className="grid flex-grow w-1/5 place-items-center">Phone:</div>
                        <div className="grid flex-grow w-4/5 border-b-2 border-gray-800">
                          <div className="flex w-full">
                            <InputMask id="phone" mask="+99 (999) 999-9999" placeholder="+01 (999) 999-9999" className="input input-ghost border-0 w-full text-center hidden-border"></InputMask>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </p>
              </Panel>

              <Panel header="POSITION / AVAILABILITY">
                <p className="m-0 text-justify">
                  <div className="flex w-full">
                    <div className="grid w-1/8 p-2 text-left">Application Date:</div>
                    <div className="grid w-2/5 sm:w-1/5 place-items-center border-b-2 border-gray-800">
                      <div className="flex w-full place-items-center">
                        <div className="grid place-items-center w-full">
                          <Calendar value={date} dateFormat="dd/mm/yy" className="border-0 w-full text-center" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex w-full">
                    <div className="grid w-2/8 p-2 text-left">Positionapplied for or type of employment desired:</div>
                    <div className="grid w-4/6 place-items-center border-b-2 border-gray-800">
                      <div className="flex w-full place-items-center">
                        <div className="grid place-items-center w-full">
                          <input type="text" placeholder="Type the Position Applied for or type of employment desired" className="input input-ghost w-full text-center" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full">
                    <div className="grid w-1/6 p-2 text-left">Available For:</div>
                    <div className="grid w-1/6 p-2 text-left">
                      <div className="flex w-full">
                        <input type="radio" name="radio-1" className="radio" /> &nbsp;&nbsp; Full Time
                      </div>
                    </div>
                    <div className="grid w-1/6 p-2 text-left">
                      <div className="flex w-full">
                        <input type="radio" name="radio-1" className="radio" />&nbsp;&nbsp; Part Time
                      </div>
                    </div>
                    <div className="grid w-1/6 p-2 text-left">
                      <div className="flex w-full">
                        <input type="radio" name="radio-1" className="radio" />&nbsp;&nbsp; Temporary
                      </div>
                    </div>
                    <div className="grid w-1/6 p-2 text-right">
                      <div className="flex w-full">
                        <input type="radio" name="radio-1" className="radio" />&nbsp;&nbsp; Other
                      </div>
                    </div>
                    <div className="grid w-4/6 place-items-center border-b-2 border-gray-800">
                      <div className="flex w-full place-items-center">
                        <div className="grid place-items-center w-full">
                          <input type="text" placeholder="Description" className="input input-ghost w-full text-center" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full">
                    <div className="grid w-1/8 p-2 text-left">Available Start Date:</div>
                    <div className="grid w-2/5 sm:w-1/5 place-items-center border-b-2 border-gray-800">
                      <div className="flex w-full place-items-center">
                        <div className="grid place-items-center w-full">
                          <Calendar value={date} dateFormat="dd/mm/yy" className="border-0 w-full text-center" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full bg-gray-100">
                    <div className="grid w-2/4 p-2 text-left">Are you available to work weekends, if required?</div>
                    <div className="grid w-full text-right">
                      <div className="flex w-full text-right">
                        <div className="grid text-right w-full">
                            <SelectButton value={value} onChange={(e) => setValue(e.value)} options={options} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex w-full">
                    <div className="grid w-2/4 p-2 text-left">Are you available to work overnights for your job, if necessary?</div>
                    <div className="grid w-full text-right">
                      <div className="flex w-full text-right">
                        <div className="grid text-right w-full">
                            <SelectButton value={value1} onChange={(e) => setValue1(e.value)} options={options1} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full">
                    <div className="grid w-2/4 p-2 text-left">State any limitations on your working hours:</div>
                    <div className="grid w-full text-right">
                      <div className="flex w-full text-right">
                        <div className="grid text-right w-full">
                        <input type="text" placeholder="Type the Position Applied for or type of employment desired" className="input input-ghost w-full text-center" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex w-full bg-gray-100">
                    <div className="grid w-2/4 p-2 text-left">Are you currently employed?</div>
                    <div className="grid w-full text-right">
                      <div className="flex w-full text-right">
                        <div className="grid text-right w-full">
                            <SelectButton value={value2} onChange={(e) => setValue2(e.value)} options={options2} />
                        </div>
                      </div>
                    </div>
                  </div>

                </p>
              </Panel>








            </p>
          </TabPanel>
          <TabPanel header="Background Check and Screenings" disabled>
            <p className="m-0">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
              eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo
              enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui
              ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
            </p>
          </TabPanel>
          <TabPanel header="Education Verification" disabled>
            <p className="m-0">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti
              quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in
              culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
              Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
            </p>
          </TabPanel>
          <TabPanel header="Employee Agreements" disabled>
            <p className="m-0">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti
              quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in
              culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
              Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
            </p>
          </TabPanel>
          <TabPanel header="Performance" disabled>
            <p className="m-0">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti
              quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in
              culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
              Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
            </p>
          </TabPanel>
          <TabPanel header="Personal documents and other information" disabled>
            <p className="m-0">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti
              quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in
              culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
              Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
            </p>
          </TabPanel>
          <TabPanel header="Send request" disabled></TabPanel>
        </TabView>
      </div>



      <div className="card">

      </div>
    </div>
  );
};

type UserLogin = {
  username: string;
  password: string;
};
export { RegisterFormContiner };
