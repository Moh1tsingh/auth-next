"use client"

import React from 'react'
import { useFormState } from 'react-dom';
import loginAction from './loginAction';

function Login() {
  const [error, formAction] = useFormState(loginAction, undefined);

  return (
    <div>
      <h1>Login</h1>
      <form action={formAction}>
        <input type="email" name="email" />
        <input type="password" name="password" />
        <button type="submit">Login</button>
      </form>
      {error && <p className=" font-normal text-red-600">{error}</p>}
    </div>
  );
}

export default Login