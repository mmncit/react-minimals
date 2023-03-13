import * as React from 'react';

export function LoginFormUsingState() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function onSubmit(e: any) {
    e.preventDefault();
    console.log({ email, password });
  }

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="email">Email</label>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        id="email"
      />
      <label htmlFor="password">Password</label>
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        id="password"
      />
    </form>
  );
}
