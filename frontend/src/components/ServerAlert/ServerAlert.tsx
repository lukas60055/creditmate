import { ServerResponseValidateType } from '../../types/ServerResponse';

const ServerAlert = ({
  serverResponse,
}: {
  serverResponse: ServerResponseValidateType;
}) => {
  return (
    <div className="alert alert-danger" role="alert">
      {serverResponse.message}
      {serverResponse.details && (
        <ul>
          {serverResponse.details.map((detail) => (
            <li>{detail}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ServerAlert;
