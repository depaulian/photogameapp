export interface Photo {
    photo:string;
    caption: string;
    description ?: string;
    category ?:number;
    owner ?:number;
    location ?: string;
    timestamp?:Date;
  }

  export interface PhotoResponse {
    type: string;
    value: Array<Photo>;
  }