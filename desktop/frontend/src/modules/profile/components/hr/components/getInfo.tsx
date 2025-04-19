import React, { useEffect, useState } from 'react';
import { useCoreUserInfo } from "../../../../profile/hooks";

const GetInfo = ({ uid, date }: Props) => {
    const [content, setContent] = useState<string>("");
    const { userInfo } = useCoreUserInfo({ uid });

    useEffect(() => {
        if (date === 'fullname') {
            setContent(userInfo?.userInfo?.Record?.fullname ?? "");
        } else if (date === 'position_applied') {
            setContent(userInfo?.userInfo?.Record?.position_applied ?? "");
        } else {
            setContent(userInfo?.userInfo?.Record?.fullname ?? "");
        }
    }, [userInfo, date]);

    return <>{content}</>;
};

type Props = {
    uid: string;
    date: string;
};

export { GetInfo };