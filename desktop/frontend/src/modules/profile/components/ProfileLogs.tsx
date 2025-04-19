import { useUserLogs } from "../hooks";

const ProfileLogs = () => {
  const { userLogs } = useUserLogs();
  console.log(userLogs);
  return <>Aqui van los Logs</>;
};

export { ProfileLogs };
