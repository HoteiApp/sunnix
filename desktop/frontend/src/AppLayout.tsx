import { RoutesContainer } from "./RoutesContainers";
import { Active } from "./models";
const AppLayout = ({ activeUser, isLoading, reloadActiveUser }: Props) => {
  return (
    <div className="h-screen flex flex-col ">
        <RoutesContainer activeUser={activeUser} isLoading={isLoading}  reloadActiveUser={reloadActiveUser}/>
    </div>
  );
};
type Props = {
  activeUser?: Active;
  isLoading?: boolean;
  reloadActiveUser(): void;
};
export { AppLayout };
