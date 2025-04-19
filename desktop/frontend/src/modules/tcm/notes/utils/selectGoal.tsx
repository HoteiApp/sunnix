import { useState, useEffect } from "react";
import { MultiSelect } from 'primereact/multiselect';
import { ServiceCM, GoalDescription, FormValueNotes } from '../../../../models';
import { SpState } from '../../../commons/sp/utils/initialize';
interface Values {
    label: string;
    value: string;
    check: boolean;
}

interface Options {
    label: string;
    code: string;
    items: Values[];
}

const SelectGoal = ({ scm, handleChangeNotes, intervention }: Props) => {
    const { sp, setSp } = SpState(scm);
    // ----
    const [selectedOptionsOpening, setSelectedOptionsOpening] = useState<Options | null>(null);
    const [selectedOptionsSPRFOLLOWUP, setSelectedOptionsSPRFOLLOWUP] = useState<Options | null>(null);
    const [selectedOptionsSP, setSelectedOptionsSP] = useState<Options | null>(null);
    const [selectedOptionsADDENDUMS, setSelectedOptionsADDENDUMS] = useState<Options | null>(null);
    const [selectedOptionsSPR, setSelectedOptionsSPR] = useState<Options | null>(null);
    const [selectedOptionsCLOSING, setSelectedOptionsCLOSING] = useState<Options | null>(null);

    const [groupedOptionsOpening, setGroupedOptionsOpening] = useState([
        {
            label: 'OPENING',
            code: 'OPENING',
            items: [
                { label: 'ADMISION', value: 'OPENING-1' },
                { label: 'FIRST HOME VISIT', value: 'OPENING-2' },
                { label: 'GATHERING w/PCP', value: 'OPENING-3' },
                { label: 'GATHERING w/PSYCHIATRIST', value: 'OPENING-4' },
                { label: 'GATHERING w/THERAPIST', value: 'OPENING-5' },
                { label: 'GATHERING w/SPECIALIST', value: 'OPENING-6' },
                { label: 'GATHERING w/SCHOOL', value: 'OPENING-7' },
                { label: 'MEDICAID CERTIFICATION', value: 'OPENING-8' },
                { label: 'ASSESSMENT DEVELOPMENT', value: 'OPENING-9' },
                { label: 'SERVICE PLAN DEVELOPMENT', value: 'OPENING-10' },
                { label: 'SERVICE PLAN DISCUSSION', value: 'OPENING-11' }
            ]
        }])

    const [groupedOptionsSP, setGroupedOptionsSP] = useState([
        {
            label: 'SP GOALS',
            code: 'SP GOALS',
            items: [] as Values[]
        }])
    const [groupedOptionsADDENDUMS, setGroupedOptionsADDENDUMS] = useState([
        {
            label: 'ADDENDUMS GOALS',
            code: 'ADDENDUMS GOALS',
            items: [] as Values[]
        }])
    const [groupedOptionsSPRFOLLOWUP, setGroupedOptionsSPRFOLLOWUP] = useState([
        {
            label: 'SPR FOLLOW UP',
            code: 'SPR-FOLLOWUP',
            items: [
                { label: 'CASE DISCUSION w/SUPERVISOR', value: 'SPR-FOLLOWUP-1' },
                { label: 'HOME VISIT SPR', value: 'SPR-FOLLOWUP-2' },
                { label: 'GATHERING w/PCP SPR', value: 'SPR-FOLLOWUP-3' },
                { label: 'GATHERING w/PSYCHIATRIST SPR', value: 'SPR-FOLLOWUP-4' },
                { label: 'GATHERING w/THERAPIST SPR', value: 'SPR-FOLLOWUP-5' },
                { label: 'GATHERING w/SPECIALIST SPR', value: 'SPR-FOLLOWUP-6' },
                { label: 'GATHERING w/SCHOOL SPR', value: 'SPR-FOLLOWUP-7' },
                { label: 'MEDICAID CERTIFICATION 6 MONTH', value: 'SPR-FOLLOWUP-8' },
                { label: 'SPR DEVELOPMENT', value: 'SPR-FOLLOWUP-9' },
                { label: 'SPR DISCUSSION', value: 'SPR-FOLLOWUP-10' }
            ]
        }])
    const [groupedOptionsSPR, setGroupedOptionsSPR] = useState([
        {
            label: 'SPR GOALS',
            code: 'SPR GOALS',
            items: [] as Values[]
        }])
    const [groupedOptionsCLOSING, setGroupedOptionsCLOSING] = useState([
        {
            label: 'CLOSING',
            code: 'CLOSING',
            items: [
                { label: 'CLOSING CASE DISCUSSION w/SUPERVISOR', value: 'CLOSING-1' },
                { label: 'HOME VISIT FOR CLOSING', value: 'CLOSING-2' },
                { label: 'PCP VISIT FOR CLOSING', value: 'CLOSING-3' },
                { label: 'PSYCHIATRIST VISIT FOR CLOSING', value: 'CLOSING-4' },
                { label: 'THERAPIST VISIT FOR CLOSING', value: 'CLOSING-5' },
                { label: 'SPECIALIST VISIT FOR CLOSING', value: 'CLOSING-6' },
                { label: 'SCHOOL VISIT FOR CLOSING', value: 'CLOSING-7' },
                { label: 'SERVICE PLAN DEVELOPMENT FOR CLOSING', value: 'CLOSING-8' },
                { label: 'SERVICE PLAN DEVELOPMENT DISCUSSION FOR CLOSING', value: 'CLOSING-9' },
                { label: 'CLOSINGSUMMARY', value: 'CLOSING-10' }
            ]
        }
    ]);


    const [allItemsSp, setAllItemsSp] = useState<{ label: string; value: string, check: boolean }[]>([]); // Especifica el tipo de allItems
    const [allItemsSpAdd, setAllItemsSpAdd] = useState<{ label: string; value: string, check: boolean }[]>([]); // Especifica el tipo de allItems
    const [allItemsSpR, setAllItemsSpR] = useState<{ label: string; value: string, check: boolean }[]>([]); // Especifica el tipo de allItems
    const [allItemsSpRAdd, setAllItemsSpRAdd] = useState<{ label: string; value: string, check: boolean }[]>([]); // Especifica el tipo de allItems


    useEffect(() => {
        setAllItemsSp([]);
        setAllItemsSpAdd([]);
        setAllItemsSpR([]);
        setAllItemsSpRAdd([]);
        const goalSettings = [
            { object: scm?.sp.goal1, prefix: 'goal1a', length: 2 },
            { object: scm?.sp.goal1, prefix: 'goal1f', length: 2 },
            { object: scm?.sp.goal2, prefix: 'goal2a', length: 1 },
            { object: scm?.sp.goal2, prefix: 'goal2d', length: 13 },
            { object: scm?.sp.goal2, prefix: 'goal2e', length: 5 },
            { object: scm?.sp.goal3, prefix: 'goal3a', length: 8 },
            { object: scm?.sp.goal3, prefix: 'goal3b', length: 8 },
            { object: scm?.sp.goal3, prefix: 'goal3c', length: 6 },
            { object: scm?.sp.goal3, prefix: 'goal3d', length: 7 },
            { object: scm?.sp.goal6, prefix: 'goal6a', length: 5 },
            { object: scm?.sp.goal7, prefix: 'goal7b', length: 3 },
            { object: scm?.sp.goal7, prefix: 'goal7e', length: 7 },
            // Add more goal settings as needed
        ];

        goalSettings.forEach(({ object, prefix, length }) => {
            if (object) {
                for (let i = 1; i <= length; i++) {
                    const variable = `${prefix}${i}`;
                    if (object[variable] === true) {
                        if (object[`${variable}Type`] === "initial") {
                            setAllItemsSp((prevItems) => [...prevItems, { label: GoalDescription[variable], value: variable, check: false }]);
                        }
                        if (object[`${variable}Type`] === "addendoms") {
                            setAllItemsSpAdd((prevItems) => [...prevItems, { label: GoalDescription[variable], value: variable, check: false }]);
                        }
                        if (object[`${variable}Type`] === "review") {
                            setAllItemsSpR((prevItems) => [...prevItems, { label: GoalDescription[variable], value: variable, check: false }]);
                        }
                        if (object[`${variable}Type`] === "addreview") {
                            setAllItemsSpRAdd((prevItems) => [...prevItems, { label: GoalDescription[variable], value: variable, check: false }]);
                        }
                    }
                }
            }
        });

        // Matriz con las rutas de las propiedades que se deben verificar
        const propertiesToCheck = [
            'goal1.goal1b',
            'goal1.goal1c',
            'goal1.goal1d',
            'goal1.goal1e',
            'goal2.goal2b',
            'goal2.goal2c',
            'goal3.goal3e',
            'goal3.goal3f',
            'goal4.goal4a',
            'goal4.goal4b',
            'goal4.goal4c',
            'goal4.goal4d',
            'goal4.goal4e',
            'goal4.goal4f',
            'goal5.goal5a',
            'goal5.goal5b',
            'goal5.goal5c',
            'goal5.goal5d',
            'goal5.goal5e',
            'goal6.goal6b',
            'goal6.goal6c',
            'goal6.goal6d',
            'goal6.goal6e',
            'goal6.goal6f',
            'goal7.goal7a',
            'goal7.goal7c',
            'goal7.goal7d',
            'goal8.goal8a',
            'goal8.goal8b',
            'goal8.goal8c',
            'goal8.goal8d',
            'goal8.goal8e',
        ];

        propertiesToCheck.forEach(property => {
            const [goalKey, subKey] = property.split('.');
            if (scm?.sp[goalKey]?.[subKey]) {
                if (scm?.sp[goalKey]?.[`${subKey}Type`] === "initial") {
                    setAllItemsSp((prevItems) => [...prevItems, { label: GoalDescription[subKey], value: subKey, check: false }]);
                }
                if (scm?.sp[goalKey]?.[`${subKey}Type`] === "addendoms") {
                    setAllItemsSpAdd((prevItems) => [...prevItems, { label: GoalDescription[subKey], value: subKey, check: false }]);
                }
                if (scm?.sp[goalKey]?.[`${subKey}Type`] === "review") {
                    setAllItemsSpR((prevItems) => [...prevItems, { label: GoalDescription[subKey], value: subKey, check: false }]);
                }
                if (scm?.sp[goalKey]?.[`${subKey}Type`] === "addreview") {
                    setAllItemsSpRAdd((prevItems) => [...prevItems, { label: GoalDescription[subKey], value: subKey, check: false }]);
                }
            }
        });

        setGroupedOptionsSP((prevOptions) => {
            const updatedOptions = [...prevOptions];
            updatedOptions[0].items = allItemsSp;
            return updatedOptions;
        });

        setGroupedOptionsADDENDUMS((prevOptions) => {
            const updatedOptions = [...prevOptions];
            updatedOptions[0].items = allItemsSpAdd;
            return updatedOptions;
        });
        setGroupedOptionsADDENDUMS((prevOptions) => {
            const updatedOptions = [...prevOptions];
            updatedOptions[0].items = allItemsSpRAdd;
            return updatedOptions;
        });
        setGroupedOptionsSPR((prevOptions) => {
            const updatedOptions = [...prevOptions];
            updatedOptions[0].items = allItemsSpR;
            return updatedOptions;
        });
    });

    return <div className="flex w-full place-items-center border-primary border-2 border-t-0 pl-2">
        <b>GOALS:</b>
        <MultiSelect
            value={selectedOptionsOpening}
            options={groupedOptionsOpening}
            onChange={(e) => {
                setSelectedOptionsOpening(e.value);
                if (e && e.value) {
                    const openingToNoteInt = {
                        "1": "opening",
                        "2": "opening_2",
                        "3": "opening_3",
                    };
                    if (handleChangeNotes) {
                        handleChangeNotes(openingToNoteInt[intervention], e.value.map(option => option));
                    }
                }
            }}

            optionLabel="label"
            optionGroupLabel="label"
            optionGroupChildren="items"
            // optionGroupTemplate={groupedItemTemplate}
            placeholder="OPENING"
            display="chip"
            maxSelectedLabels={3}

            className="w-full md:w-20rem hover:bg-orange-200"
            pt={{
                token: { className: 'bg-indigo-100' },
                header: { className: 'hidden' },
            }}
        />
        <MultiSelect
            value={selectedOptionsSP}
            options={groupedOptionsSP}
            // onChange={(e) => setSelectedOptionsSP(e.value)}
            onChange={(e) => {
                setSelectedOptionsSP(e.value);
                if (e && e.value) {
                    const spToNoteInt = {
                        "1": "sp",
                        "2": "sp_2",
                        "3": "sp_3",
                    };
                    if (handleChangeNotes) {

                        handleChangeNotes(spToNoteInt[intervention], e.value.map(option => option));
                    }
                }
            }}
            optionLabel="label"
            optionGroupLabel="label"
            optionGroupChildren="items"
            // optionGroupTemplate={groupedItemTemplate}
            placeholder="SP GOALS"
            display="chip"
            maxSelectedLabels={3}
            pt={{
                token: { className: 'bg-indigo-100' },
                header: { className: 'hidden' },
            }}
            className="w-full md:w-20rem hover:bg-orange-200"
        />
        <MultiSelect
            value={selectedOptionsADDENDUMS}
            options={groupedOptionsADDENDUMS}
            // onChange={(e) => setSelectedOptionsADDENDUMS(e.value)}
            onChange={(e) => {
                setSelectedOptionsADDENDUMS(e.value);
                if (e && e.value) {
                    const addendumsToNoteInt = {
                        "1": "addendums",
                        "2": "addendums_2",
                        "3": "addendums_3",
                    };
                    if (handleChangeNotes) {
                        handleChangeNotes(addendumsToNoteInt[intervention], e.value.map(option => option));
                    }
                }
            }}
            optionLabel="label"
            optionGroupLabel="label"
            optionGroupChildren="items"
            // optionGroupTemplate={groupedItemTemplate}
            placeholder="ADDENDUMS"
            display="chip"
            maxSelectedLabels={3}
            pt={{
                token: { className: 'bg-indigo-100' },
                header: { className: 'hidden' },
            }}
            className="w-full md:w-20rem hover:bg-orange-200"
        />
        <MultiSelect
            value={selectedOptionsSPRFOLLOWUP}
            options={groupedOptionsSPRFOLLOWUP}
            // onChange={(e) => setSelectedOptionsSPRFOLLOWUP(e.value)}
            onChange={(e) => {
                setSelectedOptionsSPRFOLLOWUP(e.value);
                if (e && e.value) {
                    const sprfollowupToNoteInt = {
                        "1": "sprfollowup",
                        "2": "sprfollowup_2",
                        "3": "sprfollowup_3",
                    };
                    if (handleChangeNotes) {
                        handleChangeNotes(sprfollowupToNoteInt[intervention], e.value.map(option => option));
                    }
                }
            }}
            optionLabel="label"
            optionGroupLabel="label"
            optionGroupChildren="items"
            placeholder="SPR FOLLOW UP"
            display="chip"
            maxSelectedLabels={3}
            pt={{
                token: { className: 'bg-indigo-100' },
                header: { className: 'hidden' },
            }}
            className="w-full md:w-20rem hover:bg-orange-200"
        />
        <MultiSelect
            value={selectedOptionsSPR}
            options={groupedOptionsSPR}
            onChange={(e) => {
                setSelectedOptionsSPR(e.value);
                if (e && e.value) {
                    const sprToNoteInt = {
                        "1": "spr",
                        "2": "spr_2",
                        "3": "spr_3",
                    };
                    if (handleChangeNotes) {
                        handleChangeNotes(sprToNoteInt[intervention], e.value.map(option => option));
                    }
                }
            }}
            optionLabel="label"
            optionGroupLabel="label"
            optionGroupChildren="items"
            // optionGroupTemplate={groupedItemTemplate}
            placeholder="SPR GOALS"
            display="chip"
            maxSelectedLabels={3}
            pt={{
                token: { className: 'bg-indigo-100' },
                header: { className: 'hidden' },
            }}
            className="w-full md:w-20rem hover:bg-orange-200"
        />
        <MultiSelect
            value={selectedOptionsCLOSING}
            options={groupedOptionsCLOSING}
            // onChange={(e) => setSelectedOptionsCLOSING(e.value)}
            onChange={(e) => {
                setSelectedOptionsCLOSING(e.value);
                if (e && e.value) {
                    const closingToNoteInt = {
                        "1": "closing",
                        "2": "closing_2",
                        "3": "closing_3",
                    };
                    if (handleChangeNotes) {
                        handleChangeNotes(closingToNoteInt[intervention], e.value.map(option => option));
                    }
                }
            }}
            optionLabel="label"
            optionGroupLabel="label"
            optionGroupChildren="items"
            // optionGroupTemplate={groupedItemTemplate}
            placeholder="CLOSING"
            display="chip"
            maxSelectedLabels={3}
            pt={{
                token: { className: 'bg-indigo-100' },
                header: { className: 'hidden' },
            }}
            className="w-full md:w-20rem hover:bg-orange-200"
        />
    </div>;
}

type Props = {
    handleChangeNotes?: <T extends string | string[] | number | boolean>(name: keyof FormValueNotes, value: T) => void;
    intervention: string;
    scm?: ServiceCM;
}
export { SelectGoal }