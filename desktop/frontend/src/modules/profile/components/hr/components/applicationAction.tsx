import { useEffect, useState } from "react";
// import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

// import { format } from 'date-fns';

import { useCoreUserInfo, useCoreUsers } from "../../../../profile/hooks";
import { useApprove } from "../../../../../hooks";
import { Active, User } from "../../../../../models";

const ApplicationAction = ({ uid, relad, setShowModal, showModal }: Props) => {
  const { users } = useCoreUsers();
  const { approveUser } = useApprove(relad);
  const { userInfo, reloadUserInfo } = useCoreUserInfo({ uid });
  // const [filteredUsers, setFilteredUsers] = useState<User[] | null>(null);
  const [workers, setWorkers] = useState<User[]>([]);

  const [roll, setRoll] = useState<string>("TCM");
  const [tcms, setTcms] = useState<string>("")

  const SaveDataService = () => {
    approveUser({ uid, roll, tcms });
    relad();
    setShowModal(false);
  };

  useEffect(() => {
    if (userInfo?.userInfo?.User?.roll !== "tmp") {
      switch (userInfo?.userInfo?.User?.roll) {
        case "HR":
          setRoll("HR Assistant");
          break;
        case "FINANCE":
          setRoll("Accounting Assistant");
          break;
        case "BILLER":
          setRoll("Billing Agent");
          break;
        case "TCMS":
          setRoll("TCM Supervisor");
          break;
        case "TCM QA":
          setRoll("QA");
          break;
        default:
          setRoll(userInfo?.userInfo?.User?.roll ?? userInfo?.userInfo?.Record?.position_applied ?? "");
          break;
      }
    } else {
      setRoll(userInfo?.userInfo?.Record?.position_applied ?? "");
    }
  }, [userInfo]);

  useEffect(() => {
    if (roll === "TCM Supervisor") {
      setTcms("esel");
    } else {
      setTcms(tcms);
    }
  }, [roll]);

  useEffect(() => {
    if (users && users.users) {
      const filteredWorkers = users.users.filter(user => user.roll === "TCMS");
      setWorkers(filteredWorkers);
    }
  }, [users]);
  useEffect(() => {

  }, [relad]);

  const footerContent = (
    <div className="flex pt-4 w-full">

      <div className="flex w-full place-items-center">
        <div className="grid w-2/3">Select system roll: &nbsp;</div>
        <div className="grid w-1/3">
          <div className="p-inputgroup flex">
            <select
              value={roll}
              onChange={(e) => {
                setRoll(e.target.value ?? "");
              }}
              className="input input-ghost border-0 w-full text-center"
              style={{ backgroundColor: "#e5ecfc", border: 0 }}
            >
              <option value="Accounting Assistant">Accounting Assistant</option>
              <option value="APRN">APRN</option>
              <option value="Billing Agent">Billing Agent</option>
              <option value="HR Assistant">HR Assistant</option>

              <option value="Psychiatrist MD">Psychiatrist MD</option>

              <option value="TCM QA">TCM QA</option>
              <option value="TCM Supervisor">TCM Supervisor</option>
              <option value="TCM">TCM</option>

              <option value="Therapist QA">Therapist QA</option>
              <option value="Therapist Supervisor">Therapist Supervisor</option>
              <option value="Therapist">Therapist</option>

            </select>

            {roll === "TCM" && (
              <select
                value={tcms}
                onChange={(e) => {
                  setTcms(e.target.value ?? "");
                }}
                className="input input-ghost border-0 w-full text-center"
                style={{ backgroundColor: "#e5ecfc", border: 0 }}
              >
                <option value="" disabled>Select TCMS</option>
                {workers.map((val) => {
                  return <option key={val.uid} value={val.uid}>{val.uid}</option>
                })}
              </select>
            )}
          </div>
        </div>
      </div>

      <Button
        label="Save"
        icon="pi pi-save"
        className="p-button-warning pr-5"
        onClick={SaveDataService}
        autoFocus
      />
    </div>
  );

  useEffect(() => {
    reloadUserInfo();
  }, [relad]);

  return (
    <Dialog
      // id="Action user"
      draggable={false}
      visible={showModal}
      style={{ width: "95vw" }}
      onHide={() => setShowModal(false)}
      header={`Action for (${uid})`}
      footer={footerContent}
    >

      <div
        className="w-full p-0 border-2 border-primary"
      >


        {/* POSITION / AVAILABILITY */}
        <div className="p-3 bg-gray-200">
          <div className="text-2xl tracking-tight place-items-center">
            Position / Availability
          </div>
        </div>
        <div className="m-0 p-0 w-full border-t-2 border-primary">
          {/* row 1 */}
          <div className="md:flex lg:flex w-full">

            <div className="w-full">
              <div className="flex w-full place-items-center">
                <div className="flex border-r-2 border-primary w-1/3 p-1">
                  <div className="flex w-full place-items-center p-0 m-0">
                    <div className="grid w-2/4 pl-3">Available For:</div>
                    <div className="grid w-2/4">
                      <div className="p-inputgroup flex-1">
                        {userInfo?.userInfo?.Record?.available_for}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex border-r-2 border-primary w-1/3 p-1">
                  <div className="flex w-full place-items-center p-0 m-0">
                    <div className="grid w-2/4 pl-3">Position applied:</div>
                    <div className="grid w-2/4">
                      <div className="p-inputgroup flex-1">
                        {userInfo?.userInfo?.Record?.position_applied}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex w-1/3 p-1">
                  <div className="flex w-full place-items-center">
                    <div className="flex w-full place-items-center">
                      <div className="w-3/5 pl-3">
                        Available Start Date:
                      </div>
                      <div className="w-2/5">
                        <div className="p-inputgroup flex-1">
                          {userInfo?.userInfo?.Record?.available_start_date}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        {/* <ScrollTop target="parent" className="bg-secondary" /> */}
      </div>
    </Dialog>

  );
};
type Props = {
  showModal: boolean;
  setShowModal(showModal: boolean): void;
  active?: Active;
  relad(): void;
  uid: string;
};
export { ApplicationAction };
