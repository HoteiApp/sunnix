import { useActiveUser } from "../../../hooks";
import { Section1, Section2 } from "./hiring";
import { Accordion, AccordionTab } from 'primereact/accordion';

import 'flipping-pages/dist/style.css';
// import "primereact/resources/themes/bootstrap4-light-blue/theme.css"
//  -- New Struct
import { Active } from "../../../models";


const ProfileHome = ({ active }: Props) => {
  const { activeUser, reloadActiveUser } = useActiveUser();
  return (
    <div className="flex flex-col w-full items-start justify-start mt-4 p-4">
      <div className="card w-full lg:card-side">
        <div className="flex flex-col w-full lg:flex-row">
          <div className="grid w-full">
            <div className="card">
              <p className="m-0">
                <Accordion multiple>
                  <AccordionTab header={
                    <div className="flex align-items-center">
                      <span className="vertical-align-middle">SECTION 1:</span>
                      <span className="text-sm">&nbsp;&nbsp;Initial Hire</span>
                    </div>
                  }>
                    <Section1 active={active} relad={reloadActiveUser} />
                  </AccordionTab>
                  <AccordionTab header={
                    <div className="flex align-items-center">
                      <span className="vertical-align-middle">SECTION 2:</span>
                      <span className="text-sm">&nbsp;&nbsp;Background Check and Screenings</span>
                    </div>
                  }>
                    {/* <Section2 active={active} /> */}
                  </AccordionTab>

                  <AccordionTab header={
                    <div className="flex align-items-center">
                      <span className="vertical-align-middle">SECTION 3:</span>
                      <span className="text-sm">&nbsp;&nbsp;Education Verification</span>
                    </div>
                  }>
                    <Section2 active={active} relad={reloadActiveUser}/>
                  </AccordionTab>

                  <AccordionTab header={
                    <div className="flex align-items-center">
                      <span className="vertical-align-middle">SECTION 4:</span>
                      <span className="text-sm">&nbsp;&nbsp;Employee Agreements</span>
                    </div>
                  }>
                    {/* <Section4 active={active} relad={reloadActiveUser}/> */}
                  </AccordionTab>
                  <AccordionTab header={
                    <div className="flex align-items-center">
                      <span className="vertical-align-middle">SECTION 5:</span>
                      <span className="text-sm">&nbsp;&nbsp;Personal documents and other information</span>
                    </div>
                  }>
                    {/* <Section5 active={active} relad={reloadActiveUser}/> */}
                  </AccordionTab>
                </Accordion>
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
type Props = {
  active?: Active;
};
export { ProfileHome };
