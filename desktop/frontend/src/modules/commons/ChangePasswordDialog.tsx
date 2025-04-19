import { useState } from 'react';
import { Dialog } from "primereact/dialog";
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { InputText } from "primereact/inputtext";

import { useChangePassword } from "../profile/hooks";
// -- New Struct
import { Active } from "../../models";


const ChangePasswordDialog = ({ showModal, setShowModal, active, relad }: Props) => {

  const [current, setCurrent] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [confirm, setConfirm] = useState<string>('');

  const header = <div className="font-bold mb-3">Password strength</div>;
  const footer = (
    <>
      <Divider />
      <p className="mt-2">Suggestions</p>
      <ul className="pl-2 ml-2 mt-0 line-height-3">
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </>
  );

  const { changePassword, isUpdating } = useChangePassword(relad);

  const onSubmit = () => {
    if (value.length > 7) {
      changePassword({ pass: value, current: current });
      setValue("");
      setShowModal(false);
    }
  };


  return (
    <Dialog
      id="Change_password"
      draggable={false}
      visible={showModal || isUpdating}
      onHide={() => setShowModal(false)}
      style={{ width: "20vw" }}
      breakpoints={{ "960px": "70vw", "641px": "90vw" }}
      header="Change password"
    >
      <div className="w-full text-center">
        {active?.activeUser?.User?.change_password && <><Message severity='warn' text='It is necessary that you change your password.' /><br /></>}
        <label><b>Current password</b></label>
        <br />
        <InputText
          value={current}
          type='password'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setCurrent(e.target.value);
          }}
          pt={{
            root: {
              className: 'input input-ghost text-center rounded border-blue-200 border-2 bg-blue-100',

            }
          }}
        />
        <br />
        <label><b>New password</b></label>
        <br />
        <Password
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
          }}
          header={header}
          footer={footer}
          toggleMask
          pt={{
            input: { className: 'input input-ghost w-full text-center rounded border-blue-200 border-2 bg-blue-100' }
          }}
        />
        <br />
        <label><b>Confirm new password</b></label>
        <br />
        <InputText
          value={confirm}
          type='password'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setConfirm(e.target.value);
          }}
          pt={{
            root: {
              className: 'input input-ghost text-center rounded border-blue-200 border-2 bg-blue-100',

            }
          }}
        />


        <div className="mt-4 w-full flex justify-end">
          <Button
            label="Cancel"
            className="p-button-text mr-2"
            disabled={isUpdating}
            onClick={() => setShowModal(false)}
          />
          <Button
            label="Save"
            icon="pi pi-save"
            className='p-button-warning'
            loading={isUpdating}
            disabled={isUpdating || (value === '' && confirm === '' && current === '') || (value !== confirm) || (value.length < 8) || current === value}
            onClick={onSubmit}
          />
        </div>


      </div>
    </Dialog>
  );
};
type Props = {
  showModal: boolean;
  setShowModal(showModal: boolean): void;
  active?: Active;
  relad(): void;
};


export { ChangePasswordDialog };
