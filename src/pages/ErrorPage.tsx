import GoToHomeBtn from '@components/GoToHomeBtn';
import { faBomb } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';

function ErrorPage() {
  return (
    <ErrorContainer>
      <Helmet>
        <title>My Chat | 404 Error</title>
      </Helmet>
      <h2>
        404Error <FontAwesomeIcon icon={faBomb} size="1x" />
      </h2>
      <div>
        <p>Sorry, We couldn't find requested page. This page does not exist.</p>
      </div>
      <GoToHomeBtn />
    </ErrorContainer>
  );
}

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 60px;
  align-items: center;
  justify-content: center;

  h2 {
    margin: 0;
  }

  div {
    margin: 60px 0;
  }
`;

ErrorContainer.displayName = 'ErrorContainer';

export default ErrorPage;
