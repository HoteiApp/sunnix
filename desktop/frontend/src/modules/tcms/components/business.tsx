import { useState, useEffect, useRef } from 'react';
// -- Libs PrimeReact
import { Message } from 'primereact/message';
import { Dialog } from "primereact/dialog";
import { Calendar } from 'primereact/calendar';
import { Nullable } from "primereact/ts-helpers";
import { Badge } from 'primereact/badge';
import { Card } from 'primereact/card';
import { Tooltip } from 'primereact/tooltip';
import { Button } from 'primereact/button';
import { Checkbox } from "primereact/checkbox";

import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';

import user from "../../../images/user.png"; // Default user image
// import { BillingBillerBusiness } from "./billingBillerBusiness";
// import { BillingBillerTcm } from "./billingBillerTcm";
import { PaymentsBusiness } from "../../finance/payments/paymentsBusiness";


// New structure
import { Active, TcmLits, User } from "../../../models";
import { useCoreListTCMS, useBillBusinessConfig, useTcmAddPayments, useBillUserConfig } from "../../../hooks/modules/tcm";
import { classNames } from 'primereact/utils';

// Añade esta función helper fuera del componente
const parseDate = (dateStr: string) => {
    if (!dateStr) return null;
    const [month, day, year] = dateStr.split('/');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
};

const Business = ({ active, relad }: Props) => {
    const [period, setPeriod] = useState<Nullable<(Date | null)[]>>(null);
    const { tcms, isLoading, reloadTCMS } = useCoreListTCMS();
    const { mutate: addPayments, isLoading: isAddingPayments } = useTcmAddPayments(relad);
    const { mutate: businessConfig } = useBillBusinessConfig(relad);
    const { mutate: userConfig } = useBillUserConfig(relad);
    // All Billings Business
    const [visibleAllBill, setVisibleAllBill] = useState<boolean>(false);
    const [visiblePayRollBuss, setVisiblePayRollBuss] = useState<boolean>(false);

    const [business, setBusiness] = useState<string>("0");

    const [visibleConfigBuss, setVisibleConfigBuss] = useState<boolean>(false);
    const [businessRent, setBusinessRent] = useState<number | null>(null);
    const [businessID, setBusinessID] = useState<string | null>(null);

    const [userConfigBuss, setUserConfigBuss] = useState<User | undefined>(undefined);


    const [visibleUserConfig, setVisibleUserConfig] = useState<boolean>(false);
    const [fixedPay, setFixedPay] = useState<boolean>(false);
    const [paymentRate, setPaymentRate] = useState<number>(0);

    const [visibleDetails, setVisibleDetails] = useState<boolean>(false);
    const [tcm, setTcm] = useState<string>("0");
    const [tcmData, setTcmData] = useState<TcmLits>();

    const prevPeriodRef = useRef('');


    // Filtro
    const [searchTerm, setSearchTerm] = useState(''); // Nuevo estado para el término de búsqueda
    // Filtrar los tcms según el término de búsqueda

    const filteredTcms = tcms?.tcms?.filter(tcm =>
        tcm.info?.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tcm.info?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tcm.info?.cell_phone?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        // Inicializar con el periodo del active
        if (active?.activeUser?.WeekActive?.start && active?.activeUser?.WeekActive?.end) {
            const startDate = parseDate(active.activeUser.WeekActive.start);
            const endDate = parseDate(active.activeUser.WeekActive.end);
            if (startDate && endDate) {
                const currentPeriodStr = `${startDate}-${endDate}`;
                if (currentPeriodStr !== prevPeriodRef.current) {
                    setPeriod([startDate, endDate]);
                    prevPeriodRef.current = currentPeriodStr;
                }
            }
        }


    }, [period, active?.activeUser?.WeekActive]);

    useEffect(() => {
        reloadTCMS();
    }, [relad]);

    return (
        <div className='p-5 mt-10 w-full'>
            {isLoading ? (
                <div className="flex items-center justify-center w-full h-screen">
                    <i
                        className="pi pi-sun pi-spin text-secondary"
                        style={{ fontSize: "5rem" }}
                    />
                </div>

            ) : (
                <>
                    <div className="flex w-1/2 items-center flex-wrap justify-content-center gap-3 mb-2">
                        <span className="p-input-icon-left w-1/3 hover:w-full transition-all duration-300 ease-in-out focus-within:w-full border-2 border-gray-400 rounded-sm">
                            <i className="pi pi-search ml-2" />
                            <InputText
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search for TCMS ..."
                                autoFocus
                                pt={{
                                    root: { className: "border-gray-400 p-3 pl-8 w-full" },
                                }}
                            />
                        </span>
                    </div>

                    <div className="grid grid-cols-8 gap-5 w-full">
                        {filteredTcms?.map((tcms) => {
                            let header = () => (
                                <div className='w-full flex content-center items-center'>
                                    <div className='w-2/3 flex'>
                                        <i className='pi pi-building-columns mr-2' style={{ fontSize: '2rem' }} />
                                        <Badge
                                            severity={tcms.total_tcm === 0 ? "warning" : "success"}
                                            className={classNames(
                                                tcms.total_tcm === 0 && "animate-blink"
                                            )}
                                        />
                                        <b>Business {tcms.user?.business}</b>
                                    </div>
                                    {/* <div className='w-1/3 flex justify-end items-end '>
                                        <div
                                            className='flex justify-end items-end cursor-pointer hover:text-orange-400'
                                        >
                                            <Tooltip target=".options" />
                                            <i className='pi pi-cog options ml-5 cursor-pointer hover:text-orange-400 '
                                                data-pr-tooltip="Options"
                                                data-pr-position="top"
                                                onClick={() => {
                                                    setBusiness(tcms.info?.ID || "0");
                                                    setBusinessID(tcms.user?.business || "0");
                                                    setVisibleConfigBuss(true);
                                                    setBusinessRent(tcms.user?.rent || 0);
                                                }}
                                            />
                                        </div>

                                    </div> */}
                                </div>
                            )
                            return (
                                tcms.info && (
                                    <div className="card col-span-2" key={tcms.info.ID}>
                                        <Card
                                            title={header}
                                            className='rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out cursor-pointer'
                                            footer={
                                                <div className='flex justify-end mt-3'>
                                                    <Tooltip target=".msg" />
                                                    <i
                                                        className='pi pi-pencil mr-5 msg'
                                                        data-pr-tooltip="Edit"
                                                        data-pr-position="top"
                                                    />
                                                    {/* <i className='pi pi-dollar mr-5' />
                                                    <i className='pi pi-user mr-5' />
                                                    <i className='pi pi-user mr-5' />
                                                    <i className='pi pi-user mr-5' /> */}
                                                </div>}
                                        >
                                            <div className='w-full flex'>
                                                <div className='w-3/4 truncate'>
                                                    <p className="m-0 border-t">
                                                        <i className='pi pi-user mr-5' /> {tcms.info.fullname}
                                                        <hr />
                                                        <i className='pi pi-phone mr-5' />{tcms.info.cell_phone}
                                                        <hr />
                                                        <i className='pi pi-envelope mr-5' />{tcms.info.email}
                                                        <hr />
                                                        <i className='pi pi-id-card mr-5' />{tcms.user?.credentials}

                                                        <hr />
                                                        <i className='pi pi-users mr-5' />
                                                        {tcms.total_tcm} Targeted Case Manager
                                                    </p>
                                                </div>
                                                <div className='w-1/4'>
                                                    <img src={tcms.photo ? tcms.photo : user} alt="Photo" className='rounded-full' />
                                                </div>
                                            </div>

                                        </Card>
                                    </div>
                                )
                            )
                        })}
                    </div>
                    {/* Tools */}
                    <Dialog
                        header={() => {
                            return (
                                <div className='w-full flex items-center'>
                                    <div className='w-1/3'>
                                        <b>Business {business}</b>
                                        <hr />
                                        <b className='font-normal'>
                                            <b>TCM:</b> {tcmData?.info?.fullname}
                                            <i className='pi pi-phone ml-5' />{tcmData?.info?.cell_phone}
                                        </b>
                                    </div>
                                    <div className='w-1/3 text-right'>
                                        <b className='font-normal'>Select period:</b>
                                        <Calendar
                                            pt={{
                                                root: { className: "ml-2 hidden" },
                                                input: { root: { className: "text-right border-primary border" } }
                                            }}
                                            autoFocus={false}
                                        />
                                        <Calendar
                                            selectionMode="range"
                                            value={period}
                                            onChange={(e) => setPeriod(e.value)}
                                            // readOnlyInput
                                            hideOnRangeSelection
                                            showWeek
                                            autoFocus={false}
                                            maxDate={parseDate(active?.activeUser?.WeekActive?.end || '') || undefined}
                                            showIcon
                                            pt={{
                                                root: { className: "ml-2" },
                                                input: { root: { className: "text-right border-primary border" } }
                                            }}
                                        />
                                    </div>
                                </div>
                            )
                        }}
                        visible={visibleDetails}
                        maximizable
                        style={{ width: "90vw" }}
                        breakpoints={{ "960px": "90vw", "641px": "90vw" }}
                        onHide={() => setVisibleDetails(false)}
                    >
                        {/* {tcm !== "0" && <BillingBillerTcm id={tcm} active={active} relad={relad} period={period} />} */}
                    </Dialog>

                    <Dialog
                        header={() => {
                            return (
                                <div className='w-full flex items-center'>
                                    <div className='w-1/3'>
                                        <b>{`Business Billing ${business}`}</b>
                                    </div>
                                    <div className='w-1/3 text-right'>
                                        <b className='font-normal'>Select period:</b>
                                        <Calendar
                                            pt={{
                                                root: { className: "ml-2 hidden" },
                                                input: { root: { className: "text-right border-primary border" } }
                                            }}
                                            autoFocus={false}
                                        />
                                        <Calendar
                                            value={period}
                                            onChange={(e) => setPeriod(e.value)}
                                            selectionMode="range"
                                            readOnlyInput
                                            hideOnRangeSelection
                                            showWeek
                                            maxDate={parseDate(active?.activeUser?.WeekActive?.end || '') || undefined}
                                            showIcon
                                            pt={{
                                                root: { className: "ml-2" },
                                                input: { root: { className: "text-right border-primary border" } }
                                            }}
                                            autoFocus={false}
                                        />
                                    </div>
                                </div>
                            )
                        }}
                        visible={visibleAllBill}
                        maximizable
                        style={{ width: "90vw" }}
                        breakpoints={{ "960px": "90vw", "641px": "90vw" }}
                        onHide={() => setVisibleAllBill(false)}
                    >
                        {/* {business !== "0" && <BillingBillerBusiness id={business} active={active} relad={relad} period={period} />} */}
                    </Dialog>

                    <Dialog
                        header={() => {
                            return (
                                <div className='w-full flex items-center'>
                                    <div className='w-2/3'>
                                        <b>{`Setting up Business ${businessID} collection`}</b>
                                    </div>

                                </div>
                            )
                        }}
                        visible={visibleConfigBuss}
                        maximizable
                        style={{ width: "50vw" }}
                        breakpoints={{ "500px": "50vw", "641px": "90vw" }}
                        onHide={() => setVisibleConfigBuss(false)}
                    >
                        {business !== "0" && (
                            <div className="bg-blue-100 p-4 rounded">
                                <div className='w-full flex justify-between'>
                                    <div className='w-4/5'>Business ID:</div>
                                    <div className='w-1/3'>
                                        <InputText
                                            className='w-full'
                                            value={businessID || ''}
                                            onChange={(e) => setBusinessID(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <hr />
                                <div className='w-full flex justify-between'>
                                    <div className='w-4/5'>Rent collection:</div>
                                    <div className='w-1/3 text-right'>
                                        <InputNumber
                                            inputId="currency-us"
                                            value={businessRent}
                                            onValueChange={(e: InputNumberValueChangeEvent) => setBusinessRent(e.value ?? null)}
                                            mode="currency"
                                            currency="USD"
                                            locale="en-US"
                                            className="w-full"
                                        />
                                    </div>
                                </div>



                                <br />
                                <div className='flex justify-between'>
                                    <Message text="Changes in these values ​​will take effect on the current payment." severity='warn' />
                                    <Button label="Save"
                                        severity="danger"
                                        icon="pi pi-save"
                                        onClick={() => {
                                            businessConfig(
                                                { id: business, rent: businessRent ? businessRent : 0, business: businessID ? businessID : "" },
                                                {
                                                    onSuccess: () => {
                                                        addPayments();
                                                        setVisibleConfigBuss(false);
                                                        relad();
                                                        // toast.current?.show({
                                                        //     severity: 'success',
                                                        //     summary: 'Finished',
                                                        //     detail: 'The invoice has been successfully completed',
                                                        //     life: 3000
                                                        // });
                                                    },
                                                    onError: (error) => {
                                                        // toast.current?.show({
                                                        //     severity: 'error',
                                                        //     summary: 'Error',
                                                        //     detail: 'The invoice could not be approved',
                                                        //     life: 3000
                                                        // });
                                                    }
                                                }
                                            );
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </Dialog>

                    <Dialog
                        header={() => {
                            return (
                                <div className='w-full flex items-center'>
                                    <div className='w-2/3'>
                                        <b>{`Setting payment data of ${tcmData?.info?.fullname}`}</b>
                                    </div>

                                </div>
                            )
                        }}
                        visible={visibleUserConfig}
                        maximizable
                        style={{ width: "50vw" }}
                        breakpoints={{ "500px": "50vw", "641px": "90vw" }}
                        onHide={() => setVisibleUserConfig(false)}
                    >
                        {business !== "0" && (
                            <div className="bg-blue-100 p-4 rounded">
                                <div className='w-full flex justify-between'>
                                    <div className='w-4/5'>Fixed payment:</div>
                                    <div className='w-1/3'>
                                        <Checkbox
                                            onChange={e => setFixedPay(!!e.checked)}
                                            checked={fixedPay}
                                        />
                                        {/* <InputText
                                    className='w-full'
                                    value={tcmData?.user?.fixed_pay || ''}
                                    onChange={(e) => setBusinessID(e.target.value)}
                                /> */}
                                        {tcmData?.user?.fixed_pay}
                                    </div>
                                </div>
                                {fixedPay ? (
                                    <>
                                        <hr className='border-gray-500 border-t-1 mt-1 mb-1' />
                                        <div className='w-full flex justify-between'>
                                            <div className='w-4/5'>Payment rate ($/Unit): ${paymentRate * 4}/Hrs</div>
                                            <div className='w-1/3 text-right'>
                                                <InputNumber
                                                    inputId="currency-us"
                                                    value={tcmData?.user?.payment_by_units}
                                                    onValueChange={(e: InputNumberValueChangeEvent) => setPaymentRate(e.value ?? 0)}
                                                    mode="currency"
                                                    currency="USD"
                                                    locale="en-US"
                                                    className="w-full"
                                                />
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <Message text="Payment will be made for the active rank in the current fortnight." severity='success' />
                                )}
                                <br />
                                <div className='flex justify-between'>
                                    <Message text="Changes in these values ​​will take effect on the current payment." severity='warn' />
                                    <Button label="Save"
                                        severity="danger"
                                        icon="pi pi-save"
                                        onClick={() => {
                                            userConfig(
                                                { id: tcm, fixedPay: fixedPay, paymentRate: paymentRate },
                                                {
                                                    onSuccess: () => {
                                                        addPayments();
                                                        setVisibleUserConfig(false);
                                                        relad();
                                                        // toast.current?.show({
                                                        //     severity: 'success',
                                                        //     summary: 'Finished',
                                                        //     detail: 'The invoice has been successfully completed',
                                                        //     life: 3000
                                                        // });
                                                    },
                                                    onError: (error) => {
                                                        // toast.current?.show({
                                                        //     severity: 'error',
                                                        //     summary: 'Error',
                                                        //     detail: 'The invoice could not be approved',
                                                        //     life: 3000
                                                        // });
                                                    }
                                                }
                                            );
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </Dialog>

                    <Dialog
                        header={() => {
                            return (
                                <div className='w-full flex items-center'>
                                    <div className='w-2/3'>
                                        <b>{`PayRoll Business ${businessID}`}</b>
                                    </div>

                                </div>
                            )
                        }}
                        visible={visiblePayRollBuss}
                        maximizable
                        style={{ width: "90vw" }}
                        breakpoints={{ "500px": "90vw", "641px": "90vw" }}
                        onHide={() => setVisiblePayRollBuss(false)}
                    >
                        {business !== "0" && (
                            <PaymentsBusiness id={business} relad={relad} active={active} />
                        )}
                    </Dialog>
                </>
            )}


        </div >
    );
}
type Props = {
    active?: Active;
    relad(): void;
};
export { Business }






