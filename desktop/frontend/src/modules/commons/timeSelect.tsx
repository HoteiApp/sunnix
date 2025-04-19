import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Space, TimePicker } from 'antd';

const TimeSelect = () => {

    return (

        <Space wrap >
        <TimePicker defaultValue={dayjs('8:08:23', 'h:mm:ss')} use12Hours />
        </Space>
    );
};

export { TimeSelect };