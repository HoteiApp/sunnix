import { useState, useEffect, useRef } from 'react';
import { classNames } from "primereact/utils";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { TabView, TabPanel } from 'primereact/tabview';
import { Dialog } from 'primereact/dialog';
import { Message } from 'primereact/message';
import { Toast } from 'primereact/toast';
import { Card } from 'primereact/card';

import { TourProps, Tour } from 'antd';
import { Timeline } from 'antd';

import { SupervisionCertificate } from './SupervisionCertificate'

// New structure
import { Active, Supervisons } from "../../../models";
import { useTcmSupervisionsDomain, useTcmSupervisios, useTcmSupervisionsComplete } from "../../../hooks/modules/tcm";

const Supervisions = ({ active, relad }: Props) => {
    const { tcmSupervisiosAll, reloadTcmSupervisionsAll } = useTcmSupervisionsDomain();
    const { tcmSupervisons, reloadTcmSupervisons } = useTcmSupervisios({ id: active?.activeUser?.Record?.ID.toString() ?? "0" });
    const { tcmSupervisionActive } = useTcmSupervisionsComplete(relad);

    const header = (active: boolean) => (
        <div className='w-full text-center pt-5'>
            <i className='pi pi-star text-primary' style={{ fontSize: '2rem' }} />
            <i className={classNames(
                'pi pi-star text-primary',
                active && 'text-orange-400'
            )} style={{ fontSize: '3rem' }} />
            <i className='pi pi-star text-primary' style={{ fontSize: '2rem' }} />
        </div>
    );
    const toast = useRef<Toast>(null);



    const reject = () => {
        toast.current?.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }
    const confirm = (id: string) => {
        confirmDialog({
            message: (
                <div className="flex flex-column align-items-center w-full gap-3 border-bottom-1 surface-border">
                    <span className='text-justify'>
                        To generate the supervision certificate, <br />
                        the system needs to use your electronic signature. <br />
                        Do you allow this?
                    </span>
                </div>
            ),
            header: 'Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                toast.current?.show({
                    severity: 'success',
                    summary: 'Certificate',
                    detail: (
                        <span>
                            The certificate already has your signature, please click on
                            <i className='pi pi-file-check pl-2 pr-2 text-green-500 animate-pulse' />
                            to download your certificate.
                        </span>
                    ),
                    life: 10000,
                });
                tcmSupervisionActive({ id: id });
            },
            reject
        });
    };
    // Tour
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const [show, setShow] = useState<boolean>(false);
    const [activeSupervisons, setActiveSupervisons] = useState<Supervisons | undefined>(undefined);
    const [activeTour, setActiveTour] = useState<boolean>(false);

    const steps: TourProps['steps'] = [
        {
            title: 'Domain: Engagement and Assessment',
            description: (
                <div className='text-left border-t p-2'>
                    <i className='pi pi-clock pl-5' /> 9 Hours
                    <i className='pi pi-check pl-5' /> 10 Supervisions
                </div>
            ),
            target: () => ref1.current,
        },
        {
            title: 'Topic: Case Management Principles and Core Functions',
            description: (
                <div className='text-left border-t p-2'>
                    <i className='pi pi-clock' /> 1 Hours <br />
                    Specific topic to be discussed in supervision.
                </div>
            ),
            target: () => ref2.current,
        }, {
            title: 'Show certificate',
            description: 'By pressing the icon, the system generates the certificate obtained for having completed the supervision. The certificate will be downloaded automatically',
            target: () => ref3.current,
        },

    ];

    let currentDate = new Date()
    useEffect(() => {
        reloadTcmSupervisionsAll();
        reloadTcmSupervisons();
    }, [relad]);

    return (
        <div className="w-full">
            {tcmSupervisons && tcmSupervisons.supervisions && tcmSupervisons?.supervisions.length > 0 ? (
                <TabView>
                    <TabPanel header="Domain" leftIcon="pi pi-calendar mr-2">
                        <div className="w-full flex">
                            {tcmSupervisiosAll?.supervisions?.map((sup) => {
                                return (
                                    <div className='w-1/5 mr-1'>
                                        <Card
                                            title={<div className='text-base'>{sup.domain}</div>}
                                            header={header(sup.active)}
                                            className="justify-items-end align-bottom"
                                        >
                                            <Accordion
                                                multiple
                                                activeIndex={0}
                                            >
                                                <AccordionTab header="Topics">
                                                    <p className="m-0">
                                                        <Timeline
                                                            mode="left"
                                                            items={tcmSupervisons?.supervisions?.filter(supervision => supervision.domain_id === sup.id).map((supervision) => ({
                                                                children: (
                                                                    <div className='cursor-pointer pl-2'>
                                                                        {sup.topics.map(topic => {
                                                                            if (supervision.topic_id === topic.ID) {
                                                                                let supervisionDate = new Date(supervision.date);
                                                                                if (currentDate > supervisionDate) {
                                                                                    return (<div className='rounded-md hover:bg-orange-100'
                                                                                        onClick={() => {
                                                                                            setActiveSupervisons(supervision);
                                                                                            supervision.signature_tcm === "" && (currentDate > new Date(supervision.date)) && confirm(supervision.id.toString());
                                                                                            supervision.signature_tcm !== "" && setShow(true);

                                                                                        }}
                                                                                    >
                                                                                        <b
                                                                                            className={classNames(
                                                                                                supervision.completed ? "text-primary" : "text-red-500"
                                                                                            )}
                                                                                        >
                                                                                            {supervision.date}
                                                                                        </b>
                                                                                        <br />
                                                                                        <s>{topic.title}</s>
                                                                                    </div>);
                                                                                } else {
                                                                                    return (
                                                                                        <div
                                                                                            className='text-gray-400'
                                                                                        >
                                                                                            {supervision.date}
                                                                                            <br />
                                                                                            {topic.title}
                                                                                        </div>);
                                                                                }
                                                                            }
                                                                        })}
                                                                    </div>
                                                                ),
                                                                // label:supervision.date,
                                                                color: !supervision.completed ? (currentDate > new Date(supervision.date)) ? "red" : "gray" : "green",
                                                                dot: (

                                                                    <i className={classNames(
                                                                        "cursor-pointer pi",
                                                                        !supervision.completed ? "pi-calendar" : "pi-file-check",
                                                                        currentDate > new Date(supervision.date) && !supervision.completed && "animate-bounce",
                                                                    )}
                                                                        style={{ fontSize: '1.5rem' }}
                                                                        onClick={() => {
                                                                            setActiveSupervisons(supervision);
                                                                            supervision.signature_tcm === "" && (currentDate > new Date(supervision.date)) && confirm(supervision.id.toString());
                                                                            supervision.signature_tcm !== "" && setShow(true);

                                                                        }}
                                                                    />
                                                                ),

                                                                pending: !supervision.completed,
                                                            }))}
                                                        />
                                                    </p>
                                                </AccordionTab>
                                            </Accordion>
                                        </Card>
                                    </div>
                                );
                            })}
                            <Toast ref={toast} />
                            <ConfirmDialog />
                        </div>
                    </TabPanel>
                    <TabPanel header="Obtaining record" leftIcon="pi pi-list mr-2">
                        <p className="m-0">
                            Here is the record of compliance with supervision.
                        </p>
                    </TabPanel>
                </TabView>
            ) : (
                <Message
                    className='w-full mt-12'
                    severity='info'
                    text='The list of supervisions will appear when your supervisor schedules the dates of the Topics that you must master. For more information, contact your supervisor.' />
            )}
            <Dialog
                footer={<Message className='w-full mt-2 p-0' severity='info' text="Click on the certificate to download it" />}
                closeOnEscape
                draggable={false}
                resizable={false}
                visible={show}
                modal={true}
                blockScroll
                style={{ width: '46vw' }} onHide={() => setShow(false)}>
                <SupervisionCertificate superv={activeSupervisons} />
            </Dialog>

            <Tour
                open={activeTour}
                onClose={() => setActiveTour(false)}
                steps={steps}
                zIndex={50000}
                type="primary"
                mask={{
                    style: {
                        boxShadow: 'inset 0 0 15px #333',
                    },
                    color: 'rgba(31, 31, 31, .7)',
                }}
            />
        </div>
    );
}
type Props = {
    active?: Active;
    relad(): void;
};
export { Supervisions }