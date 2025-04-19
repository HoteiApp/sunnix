import React, { useEffect, useState } from 'react';

import { TabView, TabPanel } from 'primereact/tabview';

import { useCoreClientInfo } from "../../../profile/hooks";
import { Connsents, Demographic, Certification, Assessment, Sp, SprClosing } from "./clientInfo/index";
import { Affix } from 'antd';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

const ClientInfo = ({ id, relad }: Props) => {
    const { clientInfo, reloadClientInfo } = useCoreClientInfo({ id });
    const [visible, setVisible] = useState<boolean>(true);
    
    return (
        <div className="">
            {/* <Button label="Demographic" icon="pi pi-external-link" onClick={() => setVisible(true)} /> */}
            <Dialog header="Demographic" maximizable visible={visible} modal={false} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                <p className="m-0">
                    Demografic 1
                </p>
            </Dialog>

            {/* <Affix offsetTop={90} onChange={(affixed) => console.log(affixed)}>
                <TabView>
                    <TabPanel header="Connsents">
                        <Connsents relad={relad} clientInfo={clientInfo} />
                    </TabPanel>
                    <TabPanel header="Demographic Information">
                        <Demographic relad={relad} clientInfo={clientInfo?.client} />
                    </TabPanel>
                    <TabPanel header="Certification">
                        <Certification relad={relad} clientInfo={clientInfo?.client} />
                    </TabPanel>
                    <TabPanel header="Assessment">
                        <Assessment relad={relad} clientInfo={clientInfo?.client} />
                    </TabPanel>
                    <TabPanel header="SP">
                        <Sp relad={relad} clientInfo={clientInfo?.client} />
                    </TabPanel>
                    <TabPanel header="SPR-Closing">
                        <SprClosing relad={relad} clientInfo={clientInfo?.client} />
                    </TabPanel>
                </TabView>
            </Affix> */}
        </div>
    );
};
type Props = {
    relad(): void;
    id: string
}
export { ClientInfo };