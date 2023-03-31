import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  const handleLogin = (event) => {
    event.preventDefault();
    console.log('Logging in...', username, password)
  }


  return (
    <div>
      <h2>blogs</h2>
      <form onSubmit={handleLogin}>
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

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  );
};

export default App
