export interface IResponse<t=any,z=any> {
  message?: boolean;
  data?: t;
  extra?: z;
  status?: number;
}