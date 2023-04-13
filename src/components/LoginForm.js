import { PropTypes } from 'prop-types'

const LoginForm = ({
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
        id='username'
        type='text'
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
        password:
      <input
        id='password'
        type='text'
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button id='login-button' type="submit">Login</button>
  </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired
}

export default LoginForm
