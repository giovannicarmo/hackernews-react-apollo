import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { useHistory } from "react-router";
import { AUTH_TOKEN } from "../constants";
import { LOGIN_MUTATION, SIGNUP_MUTATION } from "../mutations";

const Login: React.FC = () => {
  const [login, setLogin] = useState<boolean>();
  const [password, setPassword] = useState<string>();
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();

  const history = useHistory();

  const confirm = async (data: any) => {
    const { token } = login ? data.login : data.signup;
    saveUserData(token);
    history.push(`/`);
  };

  const saveUserData = (token: any) => {
    localStorage.setItem(AUTH_TOKEN, token);
  };

  return (
    <div>
      <h4 className='mv3'>{login ? "Login" : "Sign Up"}</h4>
      <div className='flex flex-column'>
        {!login && (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type='text'
            placeholder='Your name'
          />
        )}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type='text'
          placeholder='Your email address'
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type='password'
          placeholder='Choose a safe password'
        />
      </div>
      <div className='flex mt3'>
        <Mutation
          mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
          variables={{ email, password, name }}
          onCompleted={(data: any) => confirm(data)}
        >
          {(mutation: any) => (
            <div className='pointer mr2 button' onClick={mutation}>
              {login ? "login" : "create account"}
            </div>
          )}
        </Mutation>
        <div className='pointer button' onClick={() => setLogin(!login)}>
          {login ? "need to create an account?" : "already have an account?"}
        </div>
      </div>
    </div>
  );
};

export default Login;
