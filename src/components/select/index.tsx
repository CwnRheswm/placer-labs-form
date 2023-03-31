import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { Invalid } from "../invalid";

type SelectProps = {
  disabled?: boolean;
  label?: string;
  options?: string[];
  name: string;
  handleChange?: (value: string) => void;
  validations?: ValidationFn[];
  invalid?: boolean;
  value?: string;
  $span?: number;
}

const StyledSelect = styled.div<Partial<SelectProps>>`
  display: grid;
  gap: 5px;
  grid-column: span ${props => props.$span ?? 1};
  grid-template-columns: 15% 1fr;
  height: 2em;
  position: relative;

  select {
    height: 100%;
    padding: 0 5px;
    width: 100%;
  }
`;

export const Select = ({ disabled = false, handleChange, label, options, name, invalid = false, value, $span }: SelectProps) => {
  const [touched, setTouched] = useState(false);
  const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTouched(true);
    handleChange?.(e.currentTarget.value);
  }

  return (
    <StyledSelect $span={$span}>
      <label htmlFor={name}>{label}</label>
      <select disabled={disabled} id={name} onChange={(e) => handleOnChange(e)} value={value} onBlur={() => setTouched(true)}>
          {options?.map(option => <option key={option} value={option}>{option}</option>)}
      </select>
      {invalid && touched && <Invalid name={label ?? name} />}
    </StyledSelect>
  )
}
