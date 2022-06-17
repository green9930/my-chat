import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

const GoToHomeBtn = () => {
  const navigate = useNavigate();

  const handleGoToHome = async () => {
    navigate('/');
  };

  return (
    <button onClick={handleGoToHome}>
      Go To Home <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  );
};

export default GoToHomeBtn;
