import { useEffect, useState } from 'react';
import { ServiceCM, FormValueSpInitialAddendums } from '../../../../models';
import { Checkbox } from 'antd';


// Función para acceder a una propiedad anidada por cadena de texto
function getPropertyByString(obj, propString) {
    const propArray = propString.split('.');
    for (let i = 0; i < propArray.length; i++) {
        if (!obj) return undefined;
        obj = obj[propArray[i]];
    }
    return obj;
}

const CheckMarkSimple = (
    { scm, sp, selected, changeGoal, setFormState, need, goalLong, label, docType }: Props) => {
    // Crear las cadenas de la ruta de las propiedades
    const goalPropertyPath = `goal${need}.${goalLong}Type`;
    // Utilizar las cadenas de la ruta para acceder a las propiedades
    const goalTypeKeyValue = getPropertyByString(scm?.sp, goalPropertyPath);
    const [numGoals, setnumGoals] = useState<number>(3);
    useEffect(() => {
        if (docType === "initial") {
            setnumGoals(10);
        }
        if (docType === "addendoms") {
            setnumGoals(4);
        }
        if (docType === "addreview") {
            setnumGoals(3);
        }
    }, [docType]);
    return (
        <div className="flex w-full">
            <Checkbox
                className='mr-2'
                disabled={scm?.assessment[`recipent${need}`] === "Yes" ? (
                    selected < numGoals ? (
                        goalTypeKeyValue === docType ? (
                            sp[goalLong] === false ? true : false
                        ) : (
                            goalTypeKeyValue === "" ? (
                                false
                            ) : (
                                true
                            )
                        )
                    ) : (
                        goalTypeKeyValue === docType ? false : true
                    )
                ) : (
                    true
                )}
                checked={sp[goalLong] ? true : false}
                onChange={(e) => changeGoal(goalLong, e.target.checked, selected, sp, setFormState)}
            />
            <div className='flex w-full'>
                <div className='w-5/6'>
                    {label}
                </div>
                {docType !== "initial" && <div className='w-1/6 text-right'>
                    {goalTypeKeyValue === "addreview" ? (
                        <i className="pi pi-stop-circle pi-spin" style={{ color: '#bf60f2' }}></i>
                        // <Tag value=" " pt={{ root: { className: 'bg-cyan-200 pi-spin' }}} />
                    ) : (
                        goalTypeKeyValue === "addendoms" ? (
                            <i className="pi pi-stop-circle pi-spin" style={{ color: '#ff6e00' }}></i>
                            // <Tag value=" " severity="warning" pt={{ root: { className: 'pi-spin' }}}/>
                        ) : (
                            goalTypeKeyValue === "review" ? (
                                goalTypeKeyValue !== "" && <i className="pi pi-stop-circle pi-spin" style={{ color: '#6dbff2' }}></i>//<Tag value=" " severity="info" pt={{ root: { className: 'pi-spin' }}}/>
                            ) : (
                                goalTypeKeyValue !== "" && <i className="pi pi-stop-circle pi-spin" style={{ color: '#8aeac0' }}></i>//<Tag value=" " severity="success" pt={{ root: { className: 'pi-spin' }}}/>
                            )
                        )
                    )}

                </div>}
            </div>
        </div>
    );
}
type Props = {
    scm?: ServiceCM;
    selected: number;
    changeGoal: <T extends string | boolean>(
        fieldName: keyof FormValueSpInitialAddendums,
        value: T,
        countTrue: number,
        formState: FormValueSpInitialAddendums,
        setFormState: React.Dispatch<React.SetStateAction<FormValueSpInitialAddendums>>
    ) => void;
    goalLong: keyof FormValueSpInitialAddendums;
    sp: FormValueSpInitialAddendums;
    setFormState: React.Dispatch<React.SetStateAction<FormValueSpInitialAddendums>>;
    label: string;
    need: string;
    docType: string;
}
export { CheckMarkSimple };