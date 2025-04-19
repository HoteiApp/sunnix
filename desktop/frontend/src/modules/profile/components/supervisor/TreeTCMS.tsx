import React, { useState, useEffect } from 'react';
import { OrganizationChart } from 'primereact/organizationchart';
import { TreeNode } from 'primereact/treenode';
// -- New Struct
import { Active } from "../../../../models";
import { useCoreTCMS } from "../../hooks";

const Tree = ({ active, relad }: Props) => {
    const { tcms, reloadTCMS } = useCoreTCMS();
    const [data, setData] = useState<TreeNode[]>([{
        label: 'SunissUp',
        expanded: true,
    }]);

    useEffect(() => {
        const newData = [{
            label: "SunissUp",
            expanded: true,
            children: [{
                label: "QA",
                expanded: true,
                children: tcms?.tcms?.map(tcms => ({
                    expanded: false,
                    type: 'person',
                    style: {
                        borderRadius: '12px',
                    },
                    data: {
                        name: tcms.info?.fullname,
                        title: `TCMS`,
                        clients: tcms.list_tcm
                    },
                    children: tcms.list_tcm?.map(tcm => ({
                        expanded: false,
                        type: 'person',
                        style: {
                            borderRadius: '12px',
                        },
                        data: {
                            name: tcm.info?.fullname,
                            title: `TCM`,
                            clients: tcm.clients

                        },
                        // children: tcm.clients?.map(clients => ({
                        //     style: {
                        //         borderRadius: '12px',
                        //     },
                        //     type: 'person',
                        //     data: {
                        //         name: clients.first_name + " " + clients.last_name,
                        //         mr: clients.id,
                        //         title: 'Client'
                        //     },
                        // })),
                    })),
                })) || []
            }]
        }];
        setData(newData);
    }, [tcms]);

    const nodeTemplate = (node) => {
        if (node.type === 'person') {
            return (
                <div className="flex flex-column">
                    <div className=" align-items-center">
                        <i className="pi pi-user" style={{ fontSize: '2rem' }}></i>
                        {/* <img alt={node.data.name} src={node.data.image} className="mb-3 w-3rem h-3rem" /> */}
                        <br />
                        {node.data.title && <span>{node.data.title}</span>}
                        <br />
                        <span className="font-bold mb-2">{node.data.name}</span>
                        <br />
                        {node.data.mr && <span><b>MR: </b>{node.data.mr}</span>}
                        {node.data.clients && <span><b>Clients: </b>{node.data.clients ? node.data.clients.length : 0}</span>}
                    </div>
                </div>
            );
        }

        return node.label;
    };

    return (
        <div className="card w-full mt-10 pt-5">
            <OrganizationChart value={data} nodeTemplate={nodeTemplate} />
        </div>
    );
}
type Props = {
    active?: Active;
    relad(): void;
};
export { Tree }