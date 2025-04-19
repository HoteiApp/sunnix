
export type Msg = {
  CREATE: boolean;
  OK: boolean;
  message: string;
};

export type UrlFileS3 = {
  url: string;
};

export type UrlVoicesS3 = {
  from: string;
  to: string;
  Key: string;
  URL: string;
};

export type UrlDocsS3 = {
  Key: string;
  URL: string;
};

export type UrlsVoicesS3 = {
  urls: UrlVoicesS3[];
}

export type DocsS3 = {
  total: number;
  urls: UrlDocsS3[];
}


export type CustomError = Error & { cause: { name: string; message: string } };
