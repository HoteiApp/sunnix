import { useState } from 'react';
import { Dialog } from "primereact/dialog";
import { useChangeUserPassword } from "../profile/hooks";
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';

import { Message } from 'primereact/message';
// -- New Struct
import { Active } from "../../models";

const ChangeUserPasswordDialog = ({ showModal, setShowModal, active, relad, uid }: Props) => {

  const [value, setValue] = useState<string>('');
  const [edit, setEdit] = useState<boolean>(false);
  const [valid, setValid] = useState<boolean>(false);
  const header = <div className="font-bold mb-3">Pick a password</div>;
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

  const { changeUserPassword, isUpdatingUserPassword } = useChangeUserPassword(relad);

  const onSubmit = () => {
    if (value.length > 7) {
      changeUserPassword({ uid: uid, pass: value });
      setValue("");
      setShowModal(false);
    }
  };


  return (
    <Dialog
      id="Change_password"
      draggable={false}
      visible={showModal || isUpdatingUserPassword}
      onHide={() => setShowModal(false)}
      header={`Change password (${uid})`}
    >
      <div className="">


        {active?.activeUser?.User?.change_password && <Message severity='warn' text='It is necessary that you change your password.' />}
        <br />
        <label><b>New password</b></label>
        <Password
          value={value}
          onFocus={() => {
            setEdit(true);
          }}
          onBlur={() => {
            setEdit(false);
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
            if (e.target.value.length > 7) {
              setEdit(false);
              setValid(true);
            } else {
              setValid(false);
            }
          }}
          header={header}
          footer={footer}
          toggleMask
          pt={{
            root: { className: 'w-full' },
            input: { className: 'input input-ghost w-full text-center rounded border-blue-200 border-2 bg-blue-100' }
          }}
        />

        <div className="mt-4 w-full flex justify-end">
          <Button
            label="Cancel"
            className="p-button-text mr-2"
            disabled={isUpdatingUserPassword}
            onClick={() => setShowModal(false)}
          />
          <Button
            label="Save"
            icon="pi pi-save"
            className='p-button-warning'
            loading={isUpdatingUserPassword || edit}
            disabled={!valid || isUpdatingUserPassword}
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
  uid: string;
};


export { ChangeUserPasswordDialog };
