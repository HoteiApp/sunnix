import { useState } from "react";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';
import { Message } from 'primereact/message';

import { Active } from "../../../../models";

import { useChangePassword } from "../../../profile/hooks";


type Props = {
    active?: Active;
    relad(): void;
};

const PasswordView = ({ active, relad }: Props) => {
    const { changePassword, isUpdating } = useChangePassword(relad);

    const [currentPassword, setcurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    // const [value, setValue] = useState<string>('');

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


    const onSubmit = () => {
        if (newPassword.length > 7) {
            changePassword({ pass: newPassword, current: currentPassword });
            setcurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        }
    };


    return (
        <div className="w-full ">
            <Message severity='warn' text='Strengthen your account ensuring that your password is strong.' className="w-full" />

            <form className="w-1/3 mx-auto">

                    <div className="profile-field">
                        <h3 className="text-sm text-gray-500 mb-1 mt-2">Current Password</h3>
                        <InputText
                            type="password"
                            // className="w-full rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                            pt={{
                                root: {
                                    className: 'input input-ghost text-center rounded border-blue-200 border-2 bg-blue-100',
                                }
                            }}
                            placeholder="Enter current password"
                            value={currentPassword}
                            onChange={(e) => setcurrentPassword(e.target.value)}
                        />
                    </div>
                    <div className="profile-field mt-2">
                        <h3 className="text-sm text-gray-500 mb-1">New Password</h3>
                        <Password
                            value={newPassword}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setNewPassword(e.target.value);
                            }}
                            header={header}
                            footer={footer}
                            toggleMask
                            pt={{
                                input: { className: 'input input-ghost w-full text-center rounded border-blue-200 border-2 bg-blue-100' }
                            }}
                        />
                    </div>
                    <div className="profile-field mt-2">
                        <h3 className="text-sm text-gray-500 mb-1">Confirm Password</h3>
                        <InputText
                            type="password"

                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            pt={{
                                root: {
                                    className: 'input input-ghost text-center rounded border-blue-200 border-2 bg-blue-100',
                                }
                            }}
                        />
                    </div>
                    <div className="flex mt-5">
                        <Button
                            label="Change Password"
                            icon="pi pi-lock"
                            loading={isUpdating}
                            className="p-button-primary p-2 rounded-md"
                            disabled={newPassword !== confirmPassword || newPassword === "" || confirmPassword === "" || currentPassword === "" || currentPassword === newPassword}
                            onClick={onSubmit}
                        />
                    </div>
                </form>
            </div>
    );
};


export { PasswordView };
