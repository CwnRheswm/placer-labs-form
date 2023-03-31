import { ChangeEvent, useState } from "react";
import styled from "styled-components"
import { Invalid } from "../invalid";

type TextProps = {
  $span?: number;
  handleChange?: (value: string) => void;
  invalid?: boolean;
  label?: string;
  name: string;
  type?: string;
  validations?: ValidationFn[];
  value?: string;
}

const StyledText = styled.div<Partial<TextProps>>`
  grid-column: span ${props => props.$span ?? 1};
  height: 2em;
  position: relative;

  input {
    height: 100%;
    padding: 0 5px;
    width: 100%;
  }
`;

export const TextInput = ({ label, handleChange, value, invalid = false, name, type = 'text', $span }: TextProps) => {
  const [touched, setTouched] = useState(false);
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange?.(e.currentTarget.value);
  }

  return (
    <StyledText $span={$span} >
      <input placeholder={label} type={type} value={value} onChange={handleOnChange} onBlur={() => setTouched(true)} />
      {invalid && touched && <Invalid name={label ?? name} />}
    </StyledText>
  )
}
