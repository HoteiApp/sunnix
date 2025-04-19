import { classNames } from "primereact/utils";
import { InputText } from 'primereact/inputtext';
import { InputMask } from "primereact/inputmask";
import { Checkbox } from 'antd';
import { CalculateDate } from "../../CalculateDate"
// New struct
import { FormValueSpInitialAddendums } from '../../../../models';
const Goals = (
    {
        area,
        areaName,
        subcategory,
        margin,
        changeSp,
        identified,
        client,
        long,
        responsible,
        startDate,
        goalType,
        goal,
        review,
        closing,
    }: Props) => {

    return (
        <div className={classNames(
            "w-full border border-primary",
            margin && "mt-12"
        )}>
            <div className='w-full flex'>
                <div className='w-1/4 place-items-center border-r border-primary pl-5' style={{ backgroundColor: "#3f5b9e", color: "#ffffff" }}>
                    <i style={{ fontSize: "18px" }}>Domain/Area of Need</i>
                    <b style={{ fontSize: "28px" }}>{"  "}({area})</b>
                </div>
                <div className='w-3/4 pl-5 place-items-center'>
                    <b style={{ fontSize: "18px" }}>{areaName}</b>
                    <p>{subcategory}</p>
                </div>
            </div>
            <div className='w-full flex border-t border-primary'>
                <div className='w-1/4 place-items-center border-r border-primary pl-5'>
                    <b style={{ fontSize: "16px" }}>
                        Identified Client's Needs
                    </b>
                    <p style={{ fontSize: "12px" }}>(Use client's words w/quotation marks)</p>
                </div>
                <div className='w-3/4'>
                    <InputText
                        type="text"
                        name='plan_id'
                        placeholder="WHAT I WANT AND WHY...."
                        value={long}
                        onPaste={(e) => { e.preventDefault() }}
                        onChange={(e) => changeSp(`${goal}Long` as keyof FormValueSpInitialAddendums, e.target.value)}
                        style={{ backgroundColor: "#e5ecfc", height: "30px", border: 0 }}
                        onFocus={(e) => e.currentTarget.select()}
                        pt={{
                            root: { className: "input input-ghost w-full h-20 pl-5 pt-6 pb-6" }
                        }}
                    />
                </div>
            </div>
            <div className='w-full flex border-t border-primary'>
                <div className='w-1/4 place-items-center border-r border-primary pl-5 p-2'>
                    <b style={{ fontSize: "18px" }}>
                        Long Term Goal:
                    </b>
                </div>
                <div className='w-3/4 pl-5 p-2 place-items-center align-middle'>
                    {identified}
                </div>
            </div>
            <div className='w-full flex border-t border-primary' style={{ backgroundColor: "#F3DBDB" }}>
                <div className={classNames(
                    review ? 'w-1/4' : closing ? 'w-1/4' : 'w-2/4',
                    'flex place-items-center border-r border-primary pl-5',
                )}>
                    <b>
                        Responsible Individuals/Providers
                    </b>
                </div>
                <div className='w-1/4 text-center place-items-center border-r border-primary pl-5'>
                    <b>
                        Start Date
                    </b>
                </div>
                <div className='w-1/4 text-center pl-5'>
                    <b>
                        Target Date
                    </b>
                </div>
                {review && <div className='w-1/4 text-center border-l border-primary pl-5 bg-orange-200'>
                    <i>
                        <b>REVIEW</b>
                    </i>
                </div>
                }
                {closing && <div className='w-1/4 text-center border-l border-primary pl-5 bg-red-200'>
                    <i>
                        <b>CLOSING</b>
                    </i>
                </div>
                }

            </div>
            <div className='w-full flex border-t border-primary'>
                <div className={classNames(
                    review ? 'w-1/4' : closing ? 'w-1/4' : 'w-2/4',
                    'flex place-items-center border-r border-primary pl-5',
                )}>
                    <i className="mr-5">{client}/TCM/</i>
                    <InputText
                        type="text"
                        name='plan_id'
                        placeholder="Add Providers"
                        value={responsible}
                        onChange={(e) => changeSp(`${goal}Responsible` as keyof FormValueSpInitialAddendums, e.target.value)}
                        className="input input-ghost w-auto"
                        style={{ backgroundColor: "#e5ecfc", height: "25px", border: 0 }}
                        onFocus={(e) => e.currentTarget.select()}
                    />
                </div>
                <div className='w-1/4 text-center place-items-center border-r border-primary pl-5'>
                    <InputMask
                        id="Target"
                        value={startDate}
                        onChange={(e) => changeSp(`${goal}StartDate` as keyof FormValueSpInitialAddendums, e.target.value ?? "")}
                        mask="99/99/9999"

                        placeholder="StartDate"
                        className="input input-ghost border-0 text-center"
                        style={{ backgroundColor: "#e5ecfc", border: 0, height: "30px", borderRadius: 0 }}
                    />
                </div>
                <div className='w-1/4 text-center'>
                    {goalType === "initial" ? (
                        <CalculateDate date={startDate} monthsLater={6} />
                    ) : (
                        goalType === "addendoms" ? (
                            <CalculateDate date={startDate} monthsLater={6} />
                        ) : (
                            ""
                        )
                    )}
                </div>
                {review && <div className='w-1/4 border-l place-items-center border-primary pl-5'>
                    <div className="w-full flex place-items-center">
                        <div className="w-2/4">
                            <Checkbox
                                className='mr-2'
                            // checked={sp[goalLong] ? true : false}
                            // onChange={(e) => changeGoal(goalLong, e.target.checked, selected, sp, setFormState)}
                            />
                            MET
                        </div>
                        <div className="w-2/4">
                            <Checkbox
                                className='mr-2'
                            // checked={sp[goalLong] ? true : false}
                            // onChange={(e) => changeGoal(goalLong, e.target.checked, selected, sp, setFormState)}
                            />
                            ONGOING
                        </div>
                    </div>
                </div>
                }
                {closing && <div className='w-1/4 border-l place-items-center border-primary pl-5'>
                    <div className="w-full flex place-items-center">
                        <div className="w-2/4">
                            <Checkbox
                                className='mr-2'
                            // checked={sp[goalLong] ? true : false}
                            // onChange={(e) => changeGoal(goalLong, e.target.checked, selected, sp, setFormState)}
                            />
                            <b>MET</b>
                        </div>
                        <div className="w-2/4">
                            <Checkbox
                                className='mr-2'
                            // checked={sp[goalLong] ? true : false}
                            // onChange={(e) => changeGoal(goalLong, e.target.checked, selected, sp, setFormState)}
                            />
                            <b>NOT MET</b>
                        </div>
                    </div>
                </div>
                }

            </div>
        </div>
    );
}
type Props = {
    area: string;
    areaName: string;
    subcategory?: string;
    client?: string;
    margin: boolean;
    changeSp: <T extends string | boolean>(
        name: keyof FormValueSpInitialAddendums,
        value: T
    ) => void;
    identified: string;
    goal: string;
    long: string;
    responsible: string;
    goalType?: string;
    developmentDate?: string;
    reviewDate?: string;
    startDate: string;
    // ----
    review?: boolean;
    met?: boolean;
    metDate?: string;
    ongoing?: boolean;
    notMet?: boolean;
    // ----
    closing?: boolean;
}
export { Goals };