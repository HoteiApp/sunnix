import React, { useState } from 'react';
import { InputMask } from "primereact/inputmask";

import { AutoComplete, AutoCompleteChangeEvent } from "primereact/autocomplete";
// New struct
import { FormEditMental, ServiceCM, DiagnosticTable } from "../../../models";


const MentalInformations = ({ onChangeFormscmMental, scm, data }: Props) => {
    //  Diagnostic Table
    const [itemss, setItems] = useState<string[]>([]);

    const search = (event) => {
        const searchTerm = event.query.toLowerCase();
        const filteredItems = Object.entries(DiagnosticTable)
            .filter(([code, description]) => code.toLowerCase().includes(searchTerm) || description.toLowerCase().includes(searchTerm))
            .map(([code, description]) => `${code} - ${description}`);
        setItems(filteredItems);
    };

    const onSelect = <T extends string | string>(name: keyof FormEditMental, value: T) => {
        // Dividir la cadena en dos partes utilizando el guion como separador
        const parts = value.split('-');
        // Obtener el código sin espacios en blanco
        const code = parts[0].trim();
        onChangeFormscmMental(name, code ?? "")
    };
    return (
        <div className="w-full p-0">
            <div className='p-3' style={{ backgroundColor: "#3f5b9e", color: "#ffffff" }}>
                <div className='text-2xl tracking-tight place-items-center'>Mental Health Diagnosis</div>
            </div>
            <div className="m-0 p-0">

                {/* primary */}
                <div className="flex md:flex lg:flex border-b border-primary w-full place-items-center">
                    <div className="grid w-full lg:w-1/4 md:w-1/4 sm:w-1/4 pl-4">
                        Primary:
                    </div>

                    <div className="flex w-full border-primary place-items-center">
                        <div className='flex w-2/4 place-items-center p-1'>
                            <div className="flex w-3/4">
                                <div className="p-inputgroup flex">
                                    <AutoComplete
                                        value={data?.mental_primary}
                                        suggestions={itemss}
                                        completeMethod={search}
                                        onChange={(e: AutoCompleteChangeEvent) => onChangeFormscmMental("mental_primary", e.value ?? "")}
                                        onSelect={(e) => onSelect("mental_primary", e.value)}
                                        pt={{
                                            input: {
                                                root: {
                                                    className: 'input input-ghost border-0 w-full bg-blue-100 text-center',
                                                }
                                            },
                                        }}
                                        dropdown
                                    />
                                </div>
                            </div>

                        </div>
                        <div className="grid w-full">
                            {DiagnosticTable[data?.mental_primary ?? "N/A"]}
                        </div>
                    </div>

                    <div className="flex-grap lg:flex md:flex w-1/4 border-primary place-items-center">
                        <div className="grid lg:w-1/4 md:w-1/4 sm:w-full place-items-center">
                           Eval Date:
                        </div>

                        <div className="grid w-full lg:w-3/4">
                            <div className="p-inputgroup flex-1">
                                <InputMask
                                    id="date"
                                    mask="99/99/9999"
                                    placeholder="Type Number"
                                    value={data?.mental_primary_date}
                                    onChange={(e) => onChangeFormscmMental("mental_primary_date", e.target.value ?? "")}
                                    className="input input-ghost border-0 w-full text-center"
                                    style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }}
                                />

                            </div>
                        </div>
                    </div>
                </div>
                {/* Secondary */}
                <div className="flex md:flex lg:flex border-primary w-full place-items-center">
                    <div className="grid w-full lg:w-1/4 md:w-1/4 sm:w-1/4 pl-4">
                        Secondary:
                    </div>

                    <div className="flex w-full border-primary place-items-center">
                        <div className='flex w-2/4 place-items-center p-1'>
                            <div className="flex w-3/4">
                                <div className="p-inputgroup flex">
                                    <AutoComplete
                                        value={data?.mental_secondary}
                                        suggestions={itemss}
                                        completeMethod={search}
                                        onChange={(e: AutoCompleteChangeEvent) => onChangeFormscmMental("mental_secondary", e.value ?? "")}
                                        onSelect={(e) => onSelect("mental_secondary", e.value)}
                                        pt={{
                                            input: {
                                                root: {
                                                    className: 'input input-ghost border-0 w-full bg-blue-100 text-center',
                                                }
                                            },
                                        }}
                                        dropdown
                                    />
                                </div>
                            </div>

                        </div>
                        <div className="grid w-full">
                            {DiagnosticTable[data?.mental_secondary ?? "N/A"]}
                        </div>
                    </div>

                    <div className="flex-grap lg:flex md:flex w-1/4 border-primary place-items-center">
                        <div className="grid lg:w-1/4 md:w-1/4 sm:w-full place-items-center">
                            Eval Date:
                        </div>

                        <div className="grid w-full lg:w-3/4">
                            <div className="p-inputgroup flex-1">
                                <InputMask
                                    id="date"
                                    mask="99/99/9999"
                                    placeholder="Type Number"
                                    value={data?.mental_secondary_date}
                                    onChange={(e) => onChangeFormscmMental("mental_secondary_date", e.target.value ?? "")}
                                    className="input input-ghost border-0 w-full text-center"
                                    style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }}
                                />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

type Props = {
    onChangeFormscmMental: <T extends string | number | boolean>(
        name: keyof FormEditMental,
        value: T
    ) => void;
    scm?: ServiceCM;
    data?: FormEditMental;
}

export { MentalInformations };

