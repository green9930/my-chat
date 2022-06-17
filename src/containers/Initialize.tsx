import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

function Initialize() {
  return (
    <LoadingContainer>
      <h2>Loading...</h2>
      <FontAwesomeIcon icon={faSyncAlt} className="spinner" />
    </LoadingContainer>
  );
}

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 32px;
  color: ${(props) => props.theme.colors.darkBlue};

  h2 {
    color: ${(props) => props.theme.colors.darkBlue};
  }

  .spinner {
    margin: 4px;

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    animation: spin 3s linear infinite;
  }
`;

LoadingContainer.displayName = 'LoadingContainer';

export default Initialize;
