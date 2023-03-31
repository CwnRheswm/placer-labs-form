import styled from 'styled-components';

type ButtonProps = {
  label: string;
  action: () => void;
  disabled?: boolean;
}

const StyledButton = styled.button<Partial<ButtonProps>>`
  background: var(--primary);
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  font-size: 1em;
  grid-column: span 2;
  padding: 10px 10px;
  text-align: center;
  width: 100%;

  :disabled {
    background: var(--disabled);
    cursor: initial;
    opacity: .75;
  }
`;

export const Button = ({ label, action, disabled = false }: ButtonProps) => {
  return (
    <StyledButton disabled={disabled} onClick={action}>{label}</StyledButton>
  )
}
