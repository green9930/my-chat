import { authService } from '../myFirebase';
import styled from 'styled-components';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ShouldRedirectType } from 'types/type';

const SignOutBtn = ({ shouldRedirect }: ShouldRedirectType): JSX.Element => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut(authService);
    navigate('/');
  };

  return <StyledBtn onClick={() => handleSignOut()}>SIGN OUT</StyledBtn>;
};

const StyledBtn = styled.button`
  background: transparent;
  color: ${(props) => props.theme.colors.purple};
`;

StyledBtn.displayName = 'StyledBtn';

export default SignOutBtn;
