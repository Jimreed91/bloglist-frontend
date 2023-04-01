import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login';
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  })

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
    }
  }

  const handleLogout = (event) =>{
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedBloglistUser')
  }

  const handleBlog = async (event) => {
    event.preventDefault()
    const blog = {
      title: title,
      author: author,
      url: url
    }
    try {
      await blogService.create(blog)
    } catch (exception) {
      setErrorMessage(exception.message);
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
    }
  }

  const loginForm = () => (
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
  )

  const blogForm = () => (
    <form onSubmit={handleBlog}>
      <div>
        Title:
        <input
        type='text'
        value={title}
        onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        Author:
        <input
        type='text'
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        URL:
        <input
        type='text'
        value={url}
        onChange={({ target }) => setUrl(target.value)}
        />
      </div>
        <button type='submit'>Add Blog</button>
    </form>
  )


    if(user === null) {
      return loginForm()
    }
    return(
      <div>
        <h2>blogs</h2>
          {blogForm()}
          <div>
            <p>{user.name} is logged in </p>
            <button onClick={handleLogout}>Logout</button>
          </div>

          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}

      </div>
    )
};

export default App
