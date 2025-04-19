import { CalculateUnits } from "../../../notes/utils/calculateUnits";
import { CalculateMinutes } from "../../../../commons/CalcultaeMinutes";

// -- New Struct
import { Active, Notes, Client, ClientsBill, GoalDescription } from "../../../../../models";
import { Chip } from 'primereact/chip';

const DiaryNote = ({ note, client, active, lastName }: Props) => {

    let openings = note?.opening.split(",");
    let sp = note?.sp.split(",");
    let addendums = note?.addendums.split(",");
    let sprfollowup = note?.sprfollowup.split(",");
    let spr = note?.spr.split(",");
    let closing = note?.closing.split(",");

    let openings_2 = note?.opening_2.split(",");
    let sp_2 = note?.sp_2.split(",");
    let addendums_2 = note?.addendums_2.split(",");
    let sprfollowup_2 = note?.sprfollowup_2.split(",");
    let spr_2 = note?.spr_2.split(",");
    let closing_2 = note?.closing_2.split(",");

    let openings_3 = note?.opening_3.split(",");
    let sp_3 = note?.sp_3.split(",");
    let addendums_3 = note?.addendums_3.split(",");
    let sprfollowup_3 = note?.sprfollowup_3.split(",");
    let spr_3 = note?.spr_3.split(",");
    let closing_3 = note?.closing_3.split(",");

    return (
        <div className="card flex justify-content-center">
            <div className="flex w-full place-items-center border-primary border border-b-0">
                <div className="flex w-3/5">
                    <div className="pl-2 pr-2"><b>Client`s Name:</b></div>
                    <div className="pl-2 pr-2">{lastName ? lastName : (client?.first_name + " " + client?.last_name)}</div>
                </div>
                <div className="flex w-2/5 place-items-center">
                    <div className="w-1/6 text-right pr-2"><b>MR #:</b></div>
                    <div className="w-1/6 pl-2">{client?.id}</div>
                    <div className="w-2/6 text-right pr-2"><b>Service Date:</b></div>
                    <div className="w-2/6 text-center">
                        {note?.date}
                    </div>
                </div>
            </div>
            {/* Intervention 1 */}
            <div className="flex w-full place-items-center border-primary border">
                <div className="flex w-1/4 place-items-center">
                    <div className="pl-2 pr-2">Intervention: 1</div>
                </div>
                <div className="flex w-5/6 border-primary border-l border-r place-items-center">
                    <div className="pl-2 pr-2 font-bold">Time In:</div>
                    <div className="w-1/6 border-primary text-center">
                        {note?.timeIn}
                    </div>
                    <div className="pl-2 pr-2 font-bold">Time Out:</div>
                    <div className="w-1/6 border-primary border-r text-center">
                        {note?.timeOut}
                    </div>
                    <div className="pl-2 pr-2 font-bold">Duration:</div>
                    <div className="w-1/6 text-center flex place-items-center">
                        {CalculateMinutes({ firstHour: note?.timeIn, secondHour: note?.timeOut })} minutes
                    </div>
                </div>
                <div className="flex place-items-center w-1/6">
                    <div className="pl-2 pr-2 font-bold"># Unit</div>
                    <div className="w-1/6 text-center">
                        {CalculateUnits({ minutes: CalculateMinutes({ firstHour: note?.timeIn, secondHour: note?.timeOut }) })}
                    </div>
                </div>
                <div className="flex w-1/4 place-items-center border-l border-primary">
                    <div className="pl-2 pr-2 font-bold">Location:</div>
                    <div className="flex w-full text-center place-items-center">
                        {note?.location === "3" ? (
                            "3 - School"
                        ) : (
                            note?.location === "11" ? (
                                "11 - Office"
                            ) : (
                                note?.location === "12" ? (
                                    "12 - Home"
                                ) : (
                                    "99 - Other"
                                )
                            )
                        )}
                    </div>
                </div>
            </div>
            {/* hasta 3 goal */}
            <div className="flex w-full place-items-center border-primary border border-t-0 pl-2">
                <b>GOALS:</b>
                {/* {note?.opening.map((goal)=>(<Chip label={goal}/>))} */}
                {openings?.map((goal) => {
                    return <div className="pl-2">
                        {goal}
                        <Chip
                            className="border-orange-300 border-l-2 border-r-2"
                            label={goal !== undefined && GoalDescription[goal]}
                        />
                    </div>;
                })}
                {sp?.map((goal) => {
                    return <div className="pl-2">
                        <Chip
                            className="border-orange-300 border-l-2 border-r-2"
                            label={goal !== undefined && GoalDescription[goal]}
                        />
                    </div>;
                })}
                {addendums?.map((goal) => {
                    return <div className="pl-2">
                        <Chip
                            className="border-orange-300 border-l-2 border-r-2"
                            label={goal !== undefined && GoalDescription[goal]}
                        />
                    </div>;
                })}
                {sprfollowup?.map((goal) => {
                    return <div className="pl-2">
                        <Chip
                            className="border-orange-300 border-l-2 border-r-2"
                            label={goal !== undefined && GoalDescription[goal]}
                        />
                    </div>;
                })}
                {spr?.map((goal) => {
                    return <div className="pl-2">
                        <Chip
                            className="border-orange-300 border-l-2 border-r-2"
                            label={goal !== undefined && GoalDescription[goal]}
                        />
                    </div>;
                })}
                {closing?.map((goal) => {
                    return <div className="pl-2">
                        <Chip
                            className="border-orange-300 border-l-2 border-r-2"
                            label={goal !== undefined && GoalDescription[goal]}
                        />
                    </div>;
                })}




            </div>
            {/* Description */}
            <div className="w-full place-items-center border-primary pl-2 border border-t-0 bg-orange-300 font-bold">
                DESCRIPTION
            </div>
            <div className="flex w-full place-items-center border-primary border border-t-0 pl-2 pr-2">
                {note?.description === "" ? "Not note descripte" : note?.description}
            </div>

            {/* Intervention 2 */}
            {note?.timeIn_2 && <>
                <div className="flex w-full place-items-center border-primary border border-t-0">
                    <div className="flex w-1/4 place-items-center">
                        <div className="pl-2 pr-2">Intervention: 2</div>
                    </div>
                    <div className="flex w-5/6 border-primary border-l border-r place-items-center">
                        <div className="pl-2 pr-2 font-bold">Time In:</div>
                        <div className="w-1/6 border-primary text-center">
                            {note?.timeIn_2}
                        </div>
                        <div className="pl-2 pr-2 font-bold">Time Out:</div>
                        <div className="w-1/6 border-primary border-r text-center">
                            {note?.timeOut_2}
                        </div>
                        <div className="pl-2 pr-2 font-bold">Duration:</div>
                        <div className="w-1/6 text-center flex place-items-center">
                            {CalculateMinutes({ firstHour: note?.timeIn_2, secondHour: note?.timeOut_2 })} minutes
                        </div>
                    </div>
                    <div className="flex place-items-center w-1/6">
                        <div className="pl-2 pr-2 font-bold"># Unit</div>
                        <div className="w-1/6 text-center">
                            {CalculateUnits({ minutes: CalculateMinutes({ firstHour: note?.timeIn_2, secondHour: note?.timeOut_2 }) })}
                        </div>
                    </div>
                    <div className="flex w-1/4 place-items-center border-l border-primary">
                        <div className="pl-2 pr-2 font-bold">Location:</div>
                        <div className="flex w-full text-center place-items-center">
                            {note?.location_2 === "3" ? (
                                "3 - School"
                            ) : (
                                note?.location_2 === "11" ? (
                                    "11 - Office"
                                ) : (
                                    note?.location_2 === "12" ? (
                                        "12 - Home"
                                    ) : (
                                        "99 - Other"
                                    )
                                )
                            )}
                        </div>
                    </div>
                </div>
                {/* hasta 3 goal */}
                <div className="flex w-full place-items-center border-primary border border-t-0 pl-2">
                    <b>GOALS:</b>
                    {/* {note?.opening.map((goal)=>(<Chip label={goal}/>))} */}
                    {openings_2?.map((goal) => {
                        return <div className="pl-2">
                            <Chip
                                className="border-orange-300 border-l-2 border-r-2"
                                label={goal !== undefined && GoalDescription[goal]}
                            />
                        </div>;
                    })}
                    {sp_2?.map((goal) => {
                        return <div className="pl-2">
                            <Chip
                                className="border-orange-300 border-l-2 border-r-2"
                                label={goal !== undefined && GoalDescription[goal]}
                            />
                        </div>;
                    })}
                    {addendums_2?.map((goal) => {
                        return <div className="pl-2">
                            <Chip
                                className="border-orange-300 border-l-2 border-r-2"
                                label={goal !== undefined && GoalDescription[goal]}
                            />
                        </div>;
                    })}
                    {sprfollowup_2?.map((goal) => {
                        return <div className="pl-2">
                            <Chip
                                className="border-orange-300 border-l-2 border-r-2"
                                label={goal !== undefined && GoalDescription[goal][goal]}
                            />
                        </div>;
                    })}
                    {spr_2?.map((goal) => {
                        return <div className="pl-2">
                            <Chip
                                className="border-orange-300 border-l-2 border-r-2"
                                label={goal !== undefined && GoalDescription[goal]}
                            />
                        </div>;
                    })}
                    {closing_2?.map((goal) => {
                        return <div className="pl-2">
                            <Chip
                                className="border-orange-300 border-l-2 border-r-2"
                                label={goal !== undefined && GoalDescription[goal]}
                            />
                        </div>;
                    })}
                </div>
                {/* Description */}
                <div className="w-full place-items-center border-primary pl-3 border border-t-0 bg-orange-300 font-bold">
                    DESCRIPTION
                </div>
                <div className="flex w-full place-items-center border-primary border border-t-0 pl-2 pr-2">
                    {note?.description_2 === "" ? "Not note descripte." : note?.description_2}
                </div>
            </>}
            {/* Intervention 3 */}
            {note?.timeIn_3 && <>
                <div className="flex w-full place-items-center border-primary border border-t-0">
                    <div className="flex w-1/4 place-items-center">
                        <div className="pl-2 pr-2">Intervention: 3</div>
                    </div>
                    <div className="flex w-5/6 border-primary border-l border-r place-items-center">
                        <div className="pl-2 pr-2 font-bold">Time In:</div>
                        <div className="w-1/6 border-primary text-center">
                            {note?.timeIn_3}
                        </div>
                        <div className="pl-2 pr-2 font-bold">Time Out:</div>
                        <div className="w-1/6 border-primary border-r text-center">
                            {note?.timeOut_3}
                        </div>
                        <div className="pl-2 pr-2 font-bold">Duration:</div>
                        <div className="w-1/6 text-center flex place-items-center">
                            {CalculateMinutes({ firstHour: note?.timeIn_3, secondHour: note?.timeOut_3 })} minutes
                        </div>
                    </div>
                    <div className="flex place-items-center w-1/6">
                        <div className="pl-2 pr-2 font-bold"># Unit</div>
                        <div className="w-1/6 text-center">
                            {CalculateUnits({ minutes: CalculateMinutes({ firstHour: note?.timeIn_3, secondHour: note?.timeOut_3 }) })}
                        </div>
                    </div>
                    <div className="flex w-1/4 place-items-center border-l border-primary">
                        <div className="pl-2 pr-2 font-bold">Location:</div>
                        <div className="flex w-full text-center place-items-center">
                            {note?.location_3 === "3" ? (
                                "3 - School"
                            ) : (
                                note?.location_3 === "11" ? (
                                    "11 - Office"
                                ) : (
                                    note?.location_3 === "12" ? (
                                        "12 - Home"
                                    ) : (
                                        "99 - Other"
                                    )
                                )
                            )}
                        </div>
                    </div>
                </div>
                {/* hasta 3 goal */}
                <div className="flex w-full place-items-center border-primary border border-t-0 pl-2">
                    <b>GOALS:</b>
                    {openings_3?.map((goal) => {
                        return <Chip
                            className="border-orange-300 border-l-2 border-r-2"
                            label={goal !== undefined && GoalDescription[goal]}
                        />;
                    })}
                    {sp_3?.map((goal) => {
                        return <div className="pl-2">
                            <Chip
                                className="border-orange-300 border-l-2 border-r-2"
                                label={goal !== undefined && GoalDescription[goal]}
                            />
                        </div>;
                    })}
                    {addendums_3?.map((goal) => {
                        return <div className="pl-2">
                            <Chip
                                className="border-orange-300 border-l-2 border-r-2"
                                label={goal !== undefined && GoalDescription[goal]}
                            />
                        </div>;
                    })}
                    {sprfollowup_3?.map((goal) => {
                        return <div className="pl-2">
                            <Chip
                                className="border-orange-300 border-l-2 border-r-2"
                                label={goal !== undefined && GoalDescription[goal]}
                            />
                        </div>;
                    })}
                    {spr_3?.map((goal) => {
                        return <div className="pl-2">
                            <Chip
                                className="border-orange-300 border-l-2 border-r-2"
                                label={goal !== undefined && GoalDescription[goal]}
                            />
                        </div>;
                    })}
                    {closing_3?.map((goal) => {
                        return <div className="pl-2">
                            <Chip
                                className="border-orange-300 border-l-2 border-r-2"
                                label={goal !== undefined && GoalDescription[goal]}
                            />
                        </div>;
                    })}
                </div>
                {/* Description */}
                <div className="w-full place-items-center border-primary pl-3 border border-t-0 bg-orange-300 font-bold">
                    DESCRIPTION
                </div>
                <div className="flex w-full place-items-center border-primary border border-t-0 pl-2 pr-2">
                    {note?.description_3 === "" ? "Not note descripte." : note?.description_3}
                </div>
            </>
            }
            {/* Pogress */}
            <div className="w-full place-items-center border-primary pl-3 border border-t-0 bg-orange-300 font-bold">
                PROGRESS
            </div>
            <div className="w-full place-items-center border-primary pl-3 border border-t-0">
                {note?.valueProgress1 === "" ? "Not progress description." : (<>
                    {note?.valueProgress1 !== "" && <div className="flex w-full border-gray-200 border-b-2">
                        <div>1-</div>
                        <div className="w-5/6 pl-2">
                            {note?.valueProgress1}
                        </div>
                    </div>}
                    {note?.valueProgress2 !== "" && <div className="flex w-full border-gray-200 border-b-2">
                        <div>2-</div>
                        <div className="w-5/6 pl-2">
                            {note?.valueProgress2}
                        </div>
                    </div>}
                    {note?.valueProgress3 !== "" && <div className="flex w-full border-gray-200 border-b-2">
                        <div>3-</div>
                        <div className="w-5/6 pl-2">
                            {note?.valueProgress3}
                        </div>
                    </div>}
                    {note?.valueProgress4 !== "" && <div className="flex w-full border-gray-200 border-b-2">
                        <div>4-</div>
                        <div className="w-5/6 pl-2">
                            {note?.valueProgress4}
                        </div>
                    </div>}
                    {note?.valueProgress5 !== "" && <div className="flex w-full border-gray-200 border-b-2">
                        <div>5-</div>
                        <div className="w-5/6 pl-2">
                            {note?.valueProgress5}
                        </div>
                    </div>}
                    {note?.valueProgress6 !== "" && <div className="flex w-full border-gray-200 border-b-2">
                        <div>6-</div>
                        <div className="w-5/6 pl-2">
                            {note?.valueProgress6}
                        </div>
                    </div>}
                    {note?.valueProgress7 !== "" && <div className="flex w-full border-gray-200 border-b-2">
                        <div>7-</div>
                        <div className="w-5/6 pl-2">
                            {note?.valueProgress7}
                        </div>
                    </div>}
                    {note?.valueProgress8 !== "" && <div className="flex w-full border-gray-200 border-b-2">
                        <div>8-</div>
                        <div className="w-5/6 pl-2">
                            {note?.valueProgress8}
                        </div>
                    </div>}
                </>)}
            </div>
            {/* FOLLOW UP */}
            <div className="w-full place-items-center border-primary pl-3 border border-t-0 bg-orange-300 font-bold">
                FOLLOW UP
            </div>
            <div className="flex w-full place-items-center border-primary border border-t-0 pl-2 pr-2">
                {note?.valueFollowUp === "" ? "There is no description of the follow up." : note?.valueFollowUp}
            </div>
            {/* Summary */}
            <div className="w-full place-items-center border-primary pl-3 border border-t-0 bg-orange-300 text-center font-bold">
                NOTE SUMMARY
            </div>
            <div className="flex w-full place-items-center border-primary border border-t-0 pl-2 pr-2">
                <div className="w-1/3"></div>
                <div className="w-1/3 text-center">
                    <div className="flex w-full">
                        <div className="w-1/2 text-center"><b>Total minutes:</b> {note?.minutes} min</div>
                        <div className="w-1/2 text-center"><b>Total units:</b> {note?.units} units</div>
                    </div>
                    {/* <b>Total units:</b> {note?.units} units */}
                </div>
                <div className="w-1/3 pl-2 text-right">
                    {/* <b>Remuneration:</b> ${(active?.activeUser?.User?.payment_by_units || 0) * (note ? note.units : 0)} */}

                </div>
            </div>
            {/* Signatures */}
            {/* TODO Preguntar a ver si esta seccion de firma es necesaria */}
            {/* <div className="flex w-full mt-5">
                <div className="w-2/5 text-center flex flex-col justify-end ">
                    {tcm ? tcm : (active?.activeUser?.Record?.fullname)}
                </div>
                <div className="w-1/5 text-center ml-5 flex flex-col justify-end ">
                    {tcmCredentials ? tcmCredentials : (active?.activeUser?.User?.credentials)}
                </div>
                <div className="w-1/5 ml-5 flex items-center justify-center">
                    <img src={tcmSignature} alt="sign" width={100} />
                </div>
                <div className="w-1/5 flex flex-col justify-end">
                    <div className='text-center'>
                        {note?.date}
                    </div>
                </div>
            </div>
            <div className="flex w-full">
                <div className="w-2/5 text-center place-items-center border-t border-primary">
                    <b>Targeted Case Manager</b>
                </div>
                <div className="w-1/5 text-center place-items-center ml-5 border-t border-primary">
                    <b>Credential</b>
                </div>
                <div className="w-1/5 text-center place-items-center ml-5 border-t border-primary">
                    <b>Signature TCM</b>
                </div>
                <div className="w-1/5 place-items-center ml-5 border-t border-primary">
                    <div className='text-center'>
                        <b>Date</b>
                    </div>
                </div>
            </div> */}
        </div>

    );
};
type Props = {
    note: Notes | undefined;
    client: Client | ClientsBill | undefined;
    active?: Active | undefined;
    lastName?: string;
    tcm?: string;
    tcmSignature?: string;
    tcmCredentials?: string;
}
export { DiaryNote };