import { useState, useRef, useEffect } from 'react';
import { classNames } from "primereact/utils";
import { Dialog } from "primereact/dialog";
import { Badge } from 'primereact/badge';
import { Tooltip } from 'primereact/tooltip';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import {
  useUploadAudio,
  useLoadVoicesNote,
  useDeleteS3Voices,
} from "../../profile/hooks";
import { Active, UrlsVoicesS3 } from "../../../models";
import user from "../../../images/user.png";

const VoiceRecorder = ({ relad, active, mode, to, module, component, id_component }: Props) => {
  const [voiceData, setVoiceData] = useState<UrlsVoicesS3 | null>(null);
  const { loadvoice } = useLoadVoicesNote();
  const { uploadVoice, isUpdatingUploadVoice } = useUploadAudio(relad);
  const { deleteS3voice, isUpdatingDeleteS3voice } = useDeleteS3Voices(relad);
  const [visibleList, setVisibleList] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  // const [audioURL, setAudioURL] = useState<string>('');
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);

      mediaRecorder.current.ondataavailable = (event: BlobEvent) => {
        audioChunks.current.push(event.data);
      };
      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
        // const audioUrl = URL.createObjectURL(audioBlob);
        // setAudioURL(audioUrl);
        audioChunks.current = [];
        // const file = new File([audioBlob], "audio.wav"); 
        uploadVoice({
          mode: mode,
          audioBlob: audioBlob,
          from: active?.activeUser?.User?.ID || '0',
          to: to,
          message_number: ((voiceData?.urls?.length ?? 0) + 1).toString(),
          module: module,
          component: component,
          id_component: id_component
        });

      };

      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error al acceder al micrófono: ", err);
    }
  };

  const stopRecording = () => {
    clear();
    mediaRecorder.current?.stop();
    setIsRecording(false);
  };
  // ------
  const toast = useRef<Toast>(null);
  const interval = useRef<NodeJS.Timeout | null>(null);

  const clear = () => {
    toast.current?.clear();
  };

  const show = () => {
    if (!interval.current) {
      toast.current?.show({ summary: 'recording', });
      startRecording();
    }
  };

  const deleteVoice = (key: string, name: string) => {
    deleteS3voice({ key: key, name: name });
  };
  // ------
  // ------
  const LoadNotes = () => {
    const loadVoiceData = async () => {
      try {
        const data = await loadvoice({
          mode: mode,
          from: active?.activeUser?.User?.ID.toString() || '0',
          to: to,
          module: module,
          component: component,
          id_component: id_component
        });
        setVoiceData(data);
      } catch (error) {
        console.error('Error loading voice data:', error);
      }
    };
    loadVoiceData();
  }

  useEffect(() => {
    LoadNotes();
  }, [relad]);

  return (

    <div className='flex border content-center items-center text-center rounded-lg pl-2 pr-2'>
      <Toast
        ref={toast}
        position="center"
        content={({ message }) => (
          <section className="p-3 gap-3 w-full bg-black" style={{ borderRadius: '10px' }}>
            <div className="relative flex items-center justify-center ">
              <ProgressSpinner animationDuration='20s' />
              <i
                onClick={isRecording ? stopRecording : startRecording}
                className={
                  classNames(
                    "pi pi-microphone cursor-pointer text-red-500 text-2xl absolute animate-pulse",
                    "hover:animate-none",
                    isRecording && "pi pi-stop-circle"
                  )
                }
              />
            </div>
            <div className="gap-3 w-full">
              <p className="m-0 font-semibold text-base text-white">{isRecording && "recording..."}</p>
            </div>
          </section>
        )}
      ></Toast>


      <Tooltip target=".tooltip_voice_rec" />
      <i
        // onClick={isRecording ? stopRecording : startRecording}
        onClick={isRecording ? stopRecording : show}
        className={
          classNames(
            "tooltip_voice_rec cursor-pointer mr-2 hover:animate-none",
            isUpdatingUploadVoice ? "pi pi-spin pi-spinner" : isRecording ? "pi pi-stop-circle text-red-500 animate-pulse" : "pi pi-microphone hover:text-red-500 animate-pulse"
          )
        }
        data-pr-tooltip="Record voice note"
        data-pr-position="top"
      />
      <Tooltip target=".tooltip_voice_list" />
      <i
        // onClick={isRecording ? stopRecording : startRecording}
        onClick={() => setVisibleList(true)}
        className="tooltip_voice_list pi pi-list p-overlay-badge cursor-pointer"
        data-pr-tooltip="Open salved notes"
        data-pr-position="top"
      >
        {(voiceData?.urls?.length || 0) > 0 && <Badge severity="danger" className='animate-bounce'></Badge>}
      </i>
      <Dialog
        header="Voice notes"
        visible={visibleList}
        modal={false}
        style={{ width: "20vw" }}
        breakpoints={{ "960px": "20vw", "641px": "90vw" }}
        onHide={() => setVisibleList(false)}
      >
        {/* Aquí renderizamos los datos una vez estén cargados */}
        {voiceData && voiceData.urls ? (
          <div>
            {/* Renderiza los datos de voz (esto puede variar dependiendo de cómo deseas mostrarlo) */}
            {voiceData.urls.map((file, index) => (
              <div className={
                classNames(
                  "chat chat-start",
                  file.from === "You" && "chat-end"
                )
              }>
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      src={user}
                      alt="User"
                    />
                  </div>
                </div>
                <div className="chat-header">
                  {file.from}
                  {/* <time className="text-xs opacity-50">12:45</time> */}
                </div>
                <div className="chat-bubble">
                  <div className="flex flex-col gap-2">
                    <audio
                      src={file.URL}
                      controls
                      controlsList="noplaybackrate"
                      className='w-full rounded-lg'
                    />
                  </div>
                </div>
                <div className="chat-footer opacity-50">
                  <i className="pi pi-download hover:text-blue-500"
                    onClick={async () => {
                      try {
                        const response = await fetch(file.URL);
                        const blob = await response.blob();
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.style.display = 'none';
                        a.href = url;
                        a.download = `nota-voz-${index + 1}.wav`;
                        document.body.appendChild(a);
                        a.click();
                        window.URL.revokeObjectURL(url);
                        document.body.removeChild(a);
                      } catch (error) {
                        console.error('Error al descargar el archivo:', error);
                      }
                    }}
                  />
                  <i className={
                    classNames(
                      'pi pi-trash ml-2 mt-1 cursor-pointer hover:text-red-500',
                      isUpdatingDeleteS3voice && "pi pi-spin pi-spinner"
                    )
                  }
                    onClick={() => {
                      deleteVoice(file.Key, "");
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>There are no voice notes saved, press <i className='pi pi-microphone text-red-500' /> to record a note.</p>
        )}
      </Dialog>
    </div>
  );
};

type Props = {
  mode: string;
  to: string;
  module: string;
  component: string;
  id_component: string;
  active?: Active;
  relad(): void;
}

export { VoiceRecorder };
