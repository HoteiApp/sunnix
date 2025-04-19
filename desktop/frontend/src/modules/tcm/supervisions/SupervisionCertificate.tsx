import { useEffect } from 'react';
import { Supervisons } from "../../../models";

import { toPng } from 'html-to-image';
import { jsPDF } from "jspdf";

import logo from "../../../images/logo3.png";



const SupervisionCertificate = ({ superv }: Props) => {
  // const targetRef = useRef();
  const saveDivAsImage = async (divId) => {
    const node = document.getElementById(divId);
    if (node) {
      const dataUrl = await toPng(node);
      const link = document.createElement('a');
      link.download = `SuperviceCertification-D${superv?.domain_id}-T${superv?.topic_id}-${superv?.date}.png`;
      link.href = dataUrl;
      link.click();
    }
  };

  const saveDivAsPdf = (divId) => {
    const pdf = new jsPDF('l', 'pt', 'a4');
    const element = document.getElementById(divId);

    if (element) {
      const pdfWidth = pdf.internal.pageSize.getWidth();
      // const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.html(element, {
        width: pdfWidth,
        callback: function (pdf) {
          pdf.save("download.pdf");
        },
      });
    }
  };

  useEffect(() => {
    // saveDivAsImage("cert");
  }, []);

  return (
    <div
      id="cert"
      className="w-full p-4 bg-white cursor-zoom-in"
      onClick={() => {
        saveDivAsImage("cert");
      }}>
      <div className="border-8 border-double border-blue-900 p-4 text-center rounded-lg relative items-center justify-center shadow-2xl">
        <img
          src={logo}
          alt="Logo"
          className="absolute z-10 w-1/6"
        />
        <h2 className="text-2xl mt-2 mb-10 text-yellow-600 font-medium">
          SUPERVISION CERTIFICATE
        </h2>
        <p className="mb-4 text-xl font-bold mt-8">
          THIS CERTIFIES THAT
        </p>
        <h1 className="text-4xl text-orange-600 font-semibold">{superv?.date_tcm.toUpperCase()}</h1>
        <p className="mt-4 font-bold">
          HAS  SUCCESSFULLY  COMPLETED  THE
        </p>
        <p className="mt-6 text-sm">
          SUPERVISION/TRAINING{" "}
        </p>
        <p className="font-bold text-xl">
          {superv?.title}
        </p>
        <p className="mt-8 text-lg font-bold text-gray-500">{superv?.date}</p>

        {/* -------------------- */}
        <div className="flex w-full mt-20">

          <div className="w-1/5 ml-20 place-items-center">
            <div className="w-full flex text-center items-center justify-center pb-1">
              <img src={superv?.signature_tcm} width={50} alt='sing' />
            </div>
          </div>

          <div className="w-1/5"></div>
          <div className="w-2/5 place-items-end flex flex-col justify-end">
            <div className="flex justify-center">
              <div className='text-center flex justify-center w-full'>
                <div className="w-2/3 text-center pl-2 font-bold">
                  {superv?.date_tcms}
                </div>
                <div className="w-1/3"><img src={superv?.signature_tcms} width={150} alt='sing' /></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full mb-5">
          <div className="w-1/5 ml-20 text-center place-items-center border-t-2 border-gray-400 text-gray-500">
            TCM Signature
          </div>
          <div className="w-1/5"></div>
          <div className="w-2/5 place-items-center border-t-2 border-gray-400">
            <div className='text-center text-gray-500'>
              Supervisor Name/Signature
            </div>
          </div>
        </div>

        {/* <div className="flex w-full bg-blue-400 pl-5 pr-5 text-center items-center justify-center place-items-center">
          <div className="w-1/3 place-items-center">
            <div className="w-full flex text-center items-center justify-center">
              <img src={superv?.signature_tcm} width={130} alt='sing' />
            </div>
            <div className="w-full border-black border-t-2 text-center place-items-center"><p>TCM Signature</p></div>
          </div>
          <div className="w-1/3 place-items-center"></div>
          <div className="w-1/3 place-items-center">
            <div className="w-full flex place-items-center">
              <div className="w-1/2 place-items-center">
                {superv?.date_tcms}
              </div>
              <div className="w-1/2 place-items-center">
                <img src={superv?.signature_tcms} width={50} alt='sing' />
              </div>
            </div>
            <div className="w-full border-black border-t-2 text-center place-items-center"><p>Supervisor</p></div>
          </div>
        </div> */}

      </div>
    </div>

  );
};

type Props = {
  superv: Supervisons | undefined
};

export { SupervisionCertificate };
