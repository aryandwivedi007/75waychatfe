declare module "*.svg" {
    import React = require("react");
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
  }
  
  interface User {
    _id: string;
    userName: string;
    email: string;
    active: boolean;
    role: "USER" | "ADMIN";
  }
  
  interface ApiResponse<T> {
    data: T;
    message: string;
    sucess: boolean;
    
  }

  interface Room{
    _id:string;
    name:string;
    isPrivate:string;
    createdBy:User;
    members:User[]
  }

  interface userRoom{
    user:User,
    room:Room[]
  }