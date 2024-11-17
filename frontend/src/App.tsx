import { useState } from 'react';
import CreditForm from './components/CreditForm/CreditForm';
import ServerStatus from './components/ServerStatus/ServerStatus';
import { ServerResponseType } from './types/ServerResponse';
import ServerAlert from './components/ServerAlert/ServerAlert';

const App = () => {
  const [serverResponse, setServerResponse] = useState<ServerResponseType>();

  return (
    <div className="h-100 d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-5">
            <div className="card text-bg-secondary">
              <div className="card-header">
                <div className="d-flex justify-content-between">
                  <h6 className="mb-0">Przelicz raty kredytu</h6>
                  <ServerStatus />
                </div>
              </div>
              <div className="card-body">
                {(serverResponse?.message || serverResponse?.details) && (
                  <ServerAlert serverResponse={serverResponse} />
                )}
                <CreditForm setServerResponse={setServerResponse} />
              </div>
              {serverResponse?.newInstallmentAmount &&
                serverResponse?.remainingContractValue && (
                  <div className="card-footer">
                    <p className="mb-0">
                      <strong>Pozostała wartość umowy:</strong>{' '}
                      {serverResponse.remainingContractValue}
                    </p>
                    <p className="mb-0">
                      <strong>Nowa rata:</strong>{' '}
                      {serverResponse.newInstallmentAmount}
                    </p>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
