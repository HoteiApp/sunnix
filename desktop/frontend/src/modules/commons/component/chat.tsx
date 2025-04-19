import user from "../../../images/user.png";
import React, { useState, useEffect } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { InputText } from "primereact/inputtext";
import { Message } from "./message";
import { useCoreChatConversation } from "../../profile/hooks";

// -- NewStruct
import { Active } from "../../../models";

export const Chat = ({ active, relad }: Props) => {
  const [visible, setVisible] = useState(false);
  const [uservisible, setuserVisible] = useState(false);
  const [conversationActive, setConversationActive] = useState(0);
  const [text, setText] = useState("");

  const customIcons = (
    <React.Fragment>
      <button className="p-sidebar-icon p-link mr-2">
        <span className="pi pi-search" />
      </button>
    </React.Fragment>
  );

  const customHeader = (
    <div className="flex align-items-center gap-2 border-b-2 pb-2">
      <Avatar
        image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
        shape="circle"
      />
      <span className="font-bold mt-1">Edgar Javier</span>
    </div>
  );

  const userHeader = (
    <div className="flex align-items-center gap-2 border-b-2 pb-2">
      <span className="font-bold mt-1">List user</span>
    </div>
  );

  return (
    <>
      <div className="w-full p-2 bg-gray-50 rounded-lg shadow-md">
        <ul>
          {active?.activeUser?.Conversation?.map((conversation) => {
            return (
              <li
                className="p-2 hover:bg-gray-200 transition duration-200"
                onClick={() => {
                  setConversationActive(conversation.Id);
                  setVisible(true);
                }}
              >
                <div className="flex gap-3 items-center">
                  <div>
                    <img
                      src={user}
                      alt={""}
                      className="rounded-full w-12 mt-2"
                    />
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg">{conversation.Nick}</h2>
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-500">
                        {conversation.LastMessage}
                      </p>
                      {/* <p className="ml-2 text-xs text-slate-500">7:44 AM</p> */}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <footer className="fixed bottom-4 end-4">
          <Button
            icon="pi pi-comment"
            iconPos="right"
            rounded
            size="large"
            pt={{ icon: { className: "pl-2" } }}
            className="bg-blue-500 hover:bg-blue-600 transition duration-200"
            onClick={() => {
              setuserVisible(true);
            }}
          />
        </footer>
      </div>
      {/* chat mensajes */}
      <div className="card flex justify-content-center">
        <Sidebar
          header={customHeader}
          visible={visible}
          position="right"
          onHide={() => setVisible(false)}
          icons={customIcons}
        >
          <Message
            active={active}
            relad={relad}
            conversation={conversationActive}
          />
          <footer className="w-80 px-2 fixed bottom-2 bg-white shadow-lg rounded-lg">
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-primary w-full max-w-xs"
            />
          </footer>
        </Sidebar>
      </div>
      <div className="card p-4">
        {/* chat user list */}
        <Sidebar
          header={userHeader}
          visible={uservisible}
          position="right"
          onHide={() => setuserVisible(false)}
          icons={customIcons}
        >
          <ul>
            {active?.activeUser?.Conversation?.map((conversation) => {
              return (
                <li
                  className="p-2 hover:bg-gray-200 transition duration-200 rounded-lg shadow-sm"
                  onClick={() => {
                    setConversationActive(conversation.Id);
                    setVisible(true);
                  }}
                >
                  <div className="flex gap-3 items-center">
                    <div className="ml-2">
                      <img
                        src={user}
                        alt={""}
                        className="rounded-full w-12 mt-2"
                      />
                    </div>
                    <div>
                      <h2 className="font-semibold mt-2 text-lg">
                        {conversation.Nick}
                      </h2>
                      <div className="flex justify-between">
                        <p className="text-sm text-gray-500">Last Name</p>
                        <p className="ml-2 text-xs text-green-600 border-2 border-green-600 rounded-lg p-2">
                          Active
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Sidebar>
      </div>
    </>
  );
};

type Props = {
  active: Active | undefined;
  relad(): void;
};
