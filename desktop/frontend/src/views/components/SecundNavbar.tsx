import { useState, useEffect } from "react";
import { classNames } from "primereact/utils";


const SecundNavbar = ({ tabs }: Props) => {
  const [isTop, setIsTop] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div className={classNames(
      // isTop ? "fixed w-full" : "sticky",
      "sticky top-12 pb-0 h-11 flex items-center mb-0 pl-4 z-10 overflow-x-auto bg-gray-200",
    )}>
      {tabs}
    </div>
  );
};

type Props = {
  tabs: JSX.Element[];
};

export { SecundNavbar };
