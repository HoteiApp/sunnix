const staticUrl = process.env.REACT_APP_STATIC ?? "no STATIC";

const HeaderDoc = ({ PrimaryText, SecondaryText, ThirdText, CompanyAddress }: Props) => {


  return (
    <div className="w-full place-items-center flex lg:flex">
      <div className="flex lg:flex w-full md:w-1/6 lg:w-1/6 pl-3">
        <div className="w-full place-items-center md:flex lg:flex">
          <div className='md:flex lg:flex pl-3 place-items-center text-center mb-2'>
            <img src={`${staticUrl}/static/media/logo.png`} alt="Logo" width={100} />
          </div>
        </div>
      </div>
      <div className="flex lg:flex w-full md:w-4/6 lg:w-4/6 pl-3">
        <div className="w-full place-items-center flex-grow">
          <div className='w-full place-items-center text-center mb-2' style={{ fontSize: "24px", fontWeight: "bold" }}>
            {PrimaryText}
          </div>
          {SecondaryText &&
            <div className='w-full place-items-center  text-center mb-5' style={{ fontSize: "24px", fontWeight: "bold" }}>
              {SecondaryText}
            </div>
          }
          {ThirdText &&
            <div className='w-full place-items-center text-center mb-5' style={{ fontSize: "24px", fontWeight: "bold" }}>
              {ThirdText}
            </div>
          }
        </div>
      </div>
      {CompanyAddress && <div className="md:flex lg:flex w-full md:w-1/6 lg:w-1/6 pl-3" style={{ fontSize: 8 }}>
        12001 SW 128 CT SUITE 101 MIAMI FL 33186 <br />
        Phone/Fax: (786)975-7485/(954)860-7166
      </div>}
    </div>
  );
};

type Props = {
  PrimaryText: string;
  SecondaryText?: string;
  ThirdText?: string;
  CompanyAddress?: boolean;
};

export { HeaderDoc };
