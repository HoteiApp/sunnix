export type Conversation = {
    Id: number;
    User: number;
    Online: boolean;
    Nick: string;
    LastMessage: string;
  };
  
  export type Msgs = {
    ID: number;
    CFrom: number;
    Cto: boolean;
    Content: string;
  }
  
  export type Messages = {
    msgs: Msgs[];
  };