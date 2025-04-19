import React, { useState} from 'react';
import { classNames } from 'primereact/utils';

import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { Button } from 'primereact/button';
import { Chip } from 'primereact/chip';
import { Editor, EditorTextChangeEvent } from "primereact/editor";
// Globals
import {useEventAdd} from "../../../hooks/modules/commons";
import {Active, FormEventValue} from "../../../models";

const AddEvent = ({ date, active, relad, setVisible }: Props) => {
    const { addEvent } = useEventAdd(relad);
    const [event, setEvent] = useState<FormEventValue>({
        user: active?.activeUser?.Record?.ID ?? "0",
        date: date,
        title: "",
        description: "",
    });
    const handleChangeEvent = <T extends string | string[] | number | null | boolean>(
        name: keyof FormEventValue,
        value: T
    ) => {
        setEvent((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        return event;
    };
    const handleButtonClick = () => {
        addEvent({ eventAdd: event });
        relad();
        setVisible(false);
    };
    // ----------------------------

    const content = (
        <>
            <span
                className={classNames(
                    "border-circle rounded-full w-4rem h-4rem p-1 flex align-items-center justify-content-center",
                    event.title === "" ? "bg-secondary" : event.description === "" ? "bg-secondary" : event.description === null ? "bg-secondary" : "bg-success",
                )}
            >
                <i
                    className={classNames(
                        'pi',
                        event.title === "" ? "pi-info" : event.description === "" ? "pi-info" : event.description === null ? "pi-info" : "pi-check",
                    )}
                    style={{ fontSize: '1rem' }} />
            </span>
            <span className="ml-2" style={{ fontSize: "12px" }}>
                {event.title === "" ? "You must specify a title for the event" : event.description === "" ? "You must write the description of the event" : event.description === null ? "You must write the description of the event" : "You can now save the event."}
                {/* The system will notify you one day before the event */}
            </span>
        </>
    );

    return (
        <div className="card flex justify-content-center">

            <b>Title:</b>
            <IconField iconPosition="left" className='border'>
                {/* <InputIcon className="pi pi-search"> </InputIcon> */}
                <InputText
                    className='w-full'
                    v-model="value1"
                    placeholder="Title"
                    onChange={(e) => { handleChangeEvent("title", e.target.value) }}
                />

            </IconField>
            <b>Description:</b>
            <Editor
                value={event.description ?? undefined}
                onTextChange={(e: EditorTextChangeEvent) => handleChangeEvent("description", e.htmlValue)}
                style={{ height: '200px' }}
            />
           
            <Chip className="pl-0 pr-3 mt-5 " template={content} />
         
            <Button
                className={classNames(
                    'mt-5 w-2/6 p-3',
                    event.title === "" ? "bg-secondary" : event.description === "" ? "bg-secondary" : event.description === null ? "bg-secondary" : "bg-success",

                )}
                disabled={event.title === "" ? true : event.description === "" ? true : event.description === null && true}
                label="Save"
                icon="pi pi-save"
                onClick={() => { handleButtonClick() }}
            />

        </div>
    )
};
type Props = {
    date: string;
    active: Active | undefined;
    relad(): void;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export { AddEvent };