import styled from "styled-components";

const StyledInvalid = styled.p`
  bottom: -20px;
  color: var(--warning);
  max-width: 100%;
  position: absolute;
`
type InvalidProps = {
  name: string;
}

export const Invalid = ({ name }: InvalidProps) => {
  return (
    <StyledInvalid>Please input a valid {name}.</StyledInvalid>
  )
}
