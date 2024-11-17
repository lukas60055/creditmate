import { ServerStatusType } from '../ServerStatus';

export type ServerStatusContextType = {
  serverStatus: ServerStatusType;
  setServerStatus: React.Dispatch<React.SetStateAction<ServerStatusType>>;
};
