export type Event = {
    ID: number;
    user: number;
    date: string;
    title: string;
    description: string;
  };

  export type Events = {
    all_event: Event[];
  };