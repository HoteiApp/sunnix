import { useEffect, useState, useRef } from 'react';
import { ScrollTop } from 'primereact/scrolltop';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { FileUpload, FileUploadHeaderTemplateOptions } from 'primereact/fileupload';
import { Calendar } from 'primereact/calendar';
import { Nullable } from "primereact/ts-helpers";
// New Struct
import { Active, ServiceCM } from '../../../models';
import { useUploadFilesS3 } from "../../profile/hooks";

interface CategoryFile {
    name: string;
    code: string;
}

const Evaluations = ({ active, scm, relad }: Props) => {
    const { uploadFilesS3, isUploadFilesS3 } = useUploadFilesS3(relad);
    const [selectedCategory, setSelectedCategory] = useState<CategoryFile | null>(null);

    const categorys: CategoryFile[] = [
        { name: 'Psychiatrist Evaluation', code: 'Psychiatrist' },
        { name: 'PCP Evaluation', code: 'PCP' },
        { name: 'BIO Evaluation', code: 'BIO' },
        { name: 'PN Evaluation', code: 'PN' },
        { name: 'Other', code: 'Other' }
    ];

    // ---------------------------------------
    const [date, setDate] = useState<Nullable<Date>>(null);
    // ---------------------------------------
    const fileUploadRef = useRef<FileUpload>(null);

    const headerTemplate = () => {
        const headerTemplateService2 = (options: FileUploadHeaderTemplateOptions) => {
            const { className, chooseButton, cancelButton, uploadButton
            } = options;
            return (
                <div className={className} style={{ backgroundColor: "#3f5b9e", color: "#ffffff", display: 'flex', alignItems: 'center', padding: 5, margin: 0 }}>
                    <div className="md:flex lg:flex w-full">
                        <div className="w-full md:w-2/4 lg:w-2/4">
                            <div className="w-full place-items-center">
                                <div className="grid flex-grow w-full pr-5">
                                    <div className='flex'>
                                        <div className='w-auto text-xl tracking-tight place-items-center pt-1 pl-5 pr-5'>Category File:</div>
                                        <div className="w-1/2 pt-1">
                                            <Dropdown
                                                value={selectedCategory}
                                                onChange={(e: DropdownChangeEvent) => setSelectedCategory(e.value)}
                                                options={categorys}
                                                optionLabel="name"
                                                placeholder="Select a Category"
                                                className="w-full md:w-14rem"
                                                checkmark={true}
                                                highlightOnSelect={false}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-2/4 lg:w-2/4">
                            <div className="flex w-full place-items-center">
                                <div className="grid flex-grow w-full pr-5">
                                    <div className='flex'>
                                        <div className='w-auto text-xl  tracking-tight place-items-center pt-1 pl-5 pr-5'>Date:</div>
                                        <div className="w-1/2 text-black">
                                            <Calendar
                                                value={date}
                                                onChange={(e) => setDate(e.value)}
                                                showIcon
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid text-right">
                                    <div className='hidden'>{chooseButton}</div>
                                    {/* <div>{cancelButton}</div> */}
                                    <div>
                                        {date !== null && selectedCategory !== null && uploadButton}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        };

        return (options) => headerTemplateService2(options);
    };

    const emptyTemplate = () => {
        return (
            date !== null && selectedCategory !== null &&
            <div className="text-center align-items-center flex-column" style={{ background: 'repeating-linear-gradient(45deg, #f3f3f3, #f3f3f3 10px, #ffffff 10px, #ffffff 20px)', padding: '100px', border: '2px dashed #ccc' }}>
                <span style={{ color: 'var(--text-color-secondary)' }} className="text-sm">
                    Drag and Drop File Here
                </span>
                <div className="p-mt-2">
                    <button className="p-button p-component p-button-text p-button-plain" onClick={() => fileUploadRef.current?.getInput().click()}>
                        <span className="p-button-icon p-c pi pi-fw pi-folder-open"></span>
                        <span className="p-button-label p-c">Select File</span>
                    </button>
                </div>
            </div>
        );
    };

    const chooseOptions = { icon: 'pi pi-fw pi-upload', iconOnly: false, className: 'custom-choose-btn p-button-rounded p-button-warning' };
    const uploadOptions = { icon: 'pi pi-fw pi-save', iconOnly: false, className: 'custom-choose-btn p-button-rounded p-button-warning  bg-secondary rounded-full p-2' };
    // ---------------------------------
    const onUpload = () => {
        if (fileUploadRef.current) {
            const files = fileUploadRef.current.getFiles();
            const file = files.length > 0 ? files[0] : null;

            if (file && date && selectedCategory) {
                const formatDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}${date.getFullYear()}`;
                const path = `clients-${scm?.Demografic.client_id.toString()}-${scm?.id.toString()}-eval-${selectedCategory.code}-${formatDate}`;


                const formData = new FormData();
                Array.from(files).forEach((file: File) => {
                    formData.append(path, file);
                });
                console.log(path);
                uploadFilesS3({ files: formData, path: path });
                fileUploadRef.current.clear();
                setSelectedCategory(null);
                setDate(null);
                relad();
            } else {
                console.error('Please select a file, date, and category');
            }
        }
    };

    useEffect(() => {
        // getContent(); // Llamar a la función para obtener el contenido
    }, []);


    return (
        <div className="w-full p-0 " style={{ height: '35vh', 'overflow': 'auto' }}>
            {/* Psychiatrist */}
            <FileUpload
                ref={fileUploadRef}
                // multiple
                accept="application/pdf"
                maxFileSize={100000000}
                // auto
                // onSelect={(e) => handleFileChange(e, "diploma_transcripts")}
                emptyTemplate={emptyTemplate}
                headerTemplate={headerTemplate()}
                chooseLabel="Upload"
                chooseOptions={chooseOptions}
                uploadLabel='Save'
                uploadOptions={uploadOptions}
                pt={{
                    content: { className: 'p-0' }
                }}
                customUpload
                uploadHandler={onUpload}
            />

            <ScrollTop
                target="parent"
                pt={{
                    root: { className: 'bg-orange-400' }
                }}
            />
        </div>
    );
}

type Props = {
    relad(): void;
    active?: Active
    scm?: ServiceCM;
    // view: string;
    // onContentChange?: (content: string) => void;
}
export { Evaluations };