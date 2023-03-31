import React, { Dispatch, ReactElement, SetStateAction, useEffect, useRef, useState } from "react"
import styled from "styled-components";
import { Button } from "../button";

type FormProps = {
  action: () => void;
  children: ReactElement[];
  data: { [key: string ]: string };
  setData: Dispatch<SetStateAction<any>>
}

type ValidationObj = {[key: string]: ValidationFn[]};
type ValidationEntries = Array<[string, ValidationFn[]]>

const toTitleCase = (s: string) => s.replace(/([A-Z]+)/g, " $1").replace(/^([a-z])/, (match => match.toUpperCase()));

const StyledForm = styled.section`
  background-color: #f2f2f2;
  border-radius: 8px;
  border: 1px #000 solid;
  column-gap: 5px;
  display: grid;
  font: 1em;
  grid-template-columns: repeat(2, 1fr);
  max-width: 75vw;
  min-width: 300px;
  padding: 5px;
  row-gap: 25px;
  width: 100%;
`;

export const Form = ({ action, children, data, setData }: FormProps) => {
  const [isValid, setIsValid] = useState<BooleanObj>({});
  const validations = useRef<ValidationObj>({});

  const runValidations = () => {
    const valid: {[key: string]: boolean} = {};
    (Object.entries(validations.current) as (ValidationEntries)).forEach(([name, fns]) => {
      const validity: boolean[] = []
      fns.forEach(fn => {
        validity.push(fn(data[name]));
      })
      valid[name] = validity.every(v => !!v)
    })
    setIsValid(valid);
  }

  useEffect(() => {
    runValidations();
  }, [data])

  const childClones = () => {
    return children?.map(child => {
      const name = child?.props?.name;
      const label = child?.props?.label;
      const validationFns = child?.props?.validations;
      if (!validations.current?.[name]) validations.current = { ...validations.current, [name]: validationFns };

      return React.cloneElement(child, {
        ...child.props,
        key: name,
        handleChange: (value: string) => setData({ ...data, [name]: value }),
        invalid: !isValid?.[name],
        label: label ?? toTitleCase(name),
        value: data?.[name],
      })
    })
  }

  return (
    <StyledForm>
      {childClones()}
      <Button label="Submit" action={action} disabled={Object.values(isValid).some(valid => !valid)} />
    </StyledForm>
  )
}
