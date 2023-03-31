import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Form } from '@/components/form'
import { TextInput } from '@/components/textInput'
import { Validation } from '@/utils/validations'
import { Select } from '@/components/select'
import { useEffect, useState } from 'react'

type FormData = {
  firstName: string;
  lastName: string;
  state: string;
  city: string;
  email: string;
  password: string;
}

type StateResponse = Array<{ [state_name: string]: string}>;
type CityResponse = Array<{ [city_name: string]: string}>;

export default function Home() {
  const [authToken, setAuthToken] = useState<string|null>(null);
  const [states, setStates] = useState<string[]|null>(null);
  const [cities, setCities] = useState<string[]|null>(null);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    state: '',
    city: '',
    email: '',
    password: '',
  });

  const fetchAuthToken = async () => {
    const { auth_token } = await (await fetch('https://www.universal-tutorial.com/api/getaccesstoken', {
      headers: {
        'Accept': 'application/json',
        'api-token': 'OEnlZ6SGTC9ovZ53JlkBj0hDh7G9cZtFSOQiCxoCPQ9dn61kcqZS2rIXYnuJgNnR5-E',
        'user-email': 'jaramisgrey@gmail.com'
      }
    })).json();
    localStorage.setItem('authToken', auth_token);
    setAuthToken(auth_token);
  }

  useEffect(() => {
    if (!localStorage.getItem('authToken')) fetchAuthToken();
    else setAuthToken(localStorage.getItem('authToken'))
  }, [])

  const fetchStates = async () => {
    const states = await (await fetch('https://www.universal-tutorial.com/api/states/United States', {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    })).json() as StateResponse;
    setStates(states.map(state => state.state_name));
  }

  useEffect(() => {
    if (authToken == null) return;
    fetchStates()
  }, [authToken])

  const fetchCities = async () => {
    const cities = await (await fetch(`https://www.universal-tutorial.com/api/cities/${formData.state}`, {
      headers: {
        'Authorization': `Bearar ${authToken}`
      }
    })).json() as CityResponse;
    setCities(cities.map(city => city.city_name));
  }

  useEffect(() => {
    if (formData.state === '') setCities([])
    else fetchCities();
  }, [formData.state])

  const submitForm = () => {
    console.log(formData);
  }

  return (
    <>
      <Head>
        <title>Placer Labs</title>
        <meta name="description" content="Placer Labs Form Take Home" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Form action={submitForm} data={formData} setData={setFormData}>
          <TextInput name="firstName" validations={[Validation.isRequired]} />
          <TextInput name="lastName" validations={[Validation.isRequired]} />
          <Select name='state' $span={2} options={['', ...states ?? []]} validations={[Validation.isRequired]} />
          <Select name='city' $span={2} options={['', ...cities ?? []]} validations={[Validation.isRequired]} />
          <TextInput name="email" $span={2} validations={[Validation.isRequired, Validation.isValidEmail]} />
          <TextInput name="password" type='password' $span={2} validations={[Validation.isRequired]} />
        </Form>
      </main>
    </>
  )
}
