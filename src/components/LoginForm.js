import { useState } from 'react'

const loginForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword
}) => {

  return(<form onSubmit={handleLogin}>
      <div>
        username:
          <input
          type='text'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          />
      </div>
      <div>
        password:
          <input
          type='text'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          />
      </div>
      <button type="submit">Login</button>
    </form>
  )
}

export default loginForm
