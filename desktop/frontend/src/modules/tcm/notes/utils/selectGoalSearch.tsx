import { useState, useEffect } from "react";
import { MultiSelect } from 'primereact/multiselect';
import { ServiceCM, GoalDescription } from '../../../../models';
// import { SpState } from '../../../commons/sp/utils/initialize';
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

const SelectGoalSearch = ({ scm, setText }: Props) => {
    // const { sp, setSp } = SpState(scm);
    // ----
    const [selectedOptions, setSelectedOptions] = useState<Options | null>(null);

    const [groupedOptions, setGroupedOptions] = useState([
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
        },
        {
            label: 'SP GOALS',
            code: 'SP GOALS',
            items: [] as Values[]
        },
        {
            label: 'ADDENDUMS GOALS',
            code: 'ADDENDUMS GOALS',
            items: [] as Values[]
        },
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
                { label: 'SERVICES PLAN REVIEW DEVELOPMENT', value: 'SPR-FOLLOWUP-9' },
                { label: 'SERVICES PLAN REVIEW DISCUSSION', value: 'SPR-FOLLOWUP-10' }
            ]
        },
        {
            label: 'SPR GOALS',
            code: 'SPR GOALS',
            items: [] as Values[]
        },
        {
            label: 'ADDENDUMS SPR',
            code: 'ADDENDUMS SPR',
            items: [] as Values[]
        },
        {
            label: 'CLOSING',
            code: 'CLOSING',
            items: [
                { label: 'CLOSING CASE DISCUSSION w/SUPERVISOR', value: 'CLOSING-1' },
                { label: 'HOME VISIT FOR CLOSING', value: 'CLOSING-2' },
                { label: 'PCP VISIT FOR CLOSING', value: 'CLOSING-3' },
                { label: 'PSYCHIATRIST VISIT FOR CLOSING', value: 'CLOSING-4' },
                { label: 'THERAPISTVISIT FOR CLOSING', value: 'CLOSING-5' },
                { label: 'SPECIALISTVISIT FOR CLOSING', value: 'CLOSING-6' },
                { label: 'SCHOOLVISIT FOR CLOSING', value: 'CLOSING-7' },
                { label: 'SERVICE PLAN DEVELOPMENT FOR CLOSING', value: 'CLOSING-8' },
                { label: 'SERVICE PLAN DEVELOPMENT DISCUSSION FOR CLOSING', value: 'CLOSING-9' },
                { label: 'CLOSINGSUMMARY', value: 'CLOSING-10' }
            ]
        }
    ])

    const [allItemsSp, setAllItemsSp] = useState<{ label: string; value: string, check: boolean }[]>([]); // Especifica el tipo de allItems
    const [allItemsSpAdd, setAllItemsSpAdd] = useState<{ label: string; value: string, check: boolean }[]>([]); // Especifica el tipo de allItems
    const [allItemsSpR, setAllItemsSpR] = useState<{ label: string; value: string, check: boolean }[]>([]); // Especifica el tipo de allItems
    const [allItemsSpRAdd, setAllItemsSpRAdd] = useState<{ label: string; value: string, check: boolean }[]>([]); // Especifica el tipo de allItems

    // useEffect(() => {
    //     // Crear un nuevo arreglo con todas las fechas de las notas
    //     setText(selectedOptions?.code ?? "");
    //     console.log(selectedOptions?.code);
    // }, [selectedOptions]);

    useEffect(() => {
        // setGroupedOptions([]);
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

        setGroupedOptions((prevOptions) => {
            const updatedOptions = [...prevOptions];
            updatedOptions[1].items = allItemsSp;
            return updatedOptions;
        });

        setGroupedOptions((prevOptions) => {
            const updatedOptions = [...prevOptions];
            updatedOptions[2].items = allItemsSpAdd;
            return updatedOptions;
        });

        setGroupedOptions((prevOptions) => {
            const updatedOptions = [...prevOptions];
            updatedOptions[4].items = allItemsSpRAdd;
            return updatedOptions;
        });
        setGroupedOptions((prevOptions) => {
            const updatedOptions = [...prevOptions];
            updatedOptions[5].items = allItemsSpR;
            return updatedOptions;
        });
    });


    return <div className="flex w-full">
        <MultiSelect
            value={selectedOptions}
            options={groupedOptions}
            onChange={(e) => {
                setSelectedOptions(e.value);
                e.value.map(option => {
                    setText(option);
                })

                //     if (e && e.value) {
                //         const openingToNoteInt = {
                //             "1": "opening",
                //             "2": "opening_2",
                //             "3": "opening_3",
                //         };
                //         if (handleChangeNotes) {
                //             handleChangeNotes(openingToNoteInt[intervention], e.value.map(option => option));
                //         }
                //     }
            }}

            optionLabel="label"
            optionGroupLabel="label"
            optionGroupChildren="items"
            placeholder="Select the GOAL you want to search in the notes"
            display="chip"
            maxSelectedLabels={1}
            selectionLimit={1}
            showSelectAll={false}
            showClear={true}
            spellCheck={true}
            filter
            className="w-full md:w-20rem hover:bg-orange-200"
            pt={{
                token: { className: 'bg-indigo-100' },
            }}
        />

    </div>;
}

type Props = {
    setText: React.Dispatch<React.SetStateAction<string>>;
    scm?: ServiceCM;
}
export { SelectGoalSearch }