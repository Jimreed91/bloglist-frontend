import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login';
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Toggleable';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()
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
      setErrorMessage('Wrong username or password')
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

  const addBlog = async (blogObj) => {
    blogFormRef.current.toggleVisibility()
    try {
      await blogService.create(blogObj)
      setErrorMessage(`A new blog "${blogObj.title}" by ${blogObj.author} was created`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);

    } catch (exception) {
      setErrorMessage(exception.message.verbose);
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
    }
  }

  const notification = () => (
      <p>{errorMessage}</p>
  )

    return(
      <div>
        {errorMessage &&
          notification()
        }
        <h2>blogs</h2>
        {user === null ?
          <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword ={setPassword}
          /> :
          <>
            <p>{user.name} is logged in </p>
            <button onClick={handleLogout}>Logout</button>
          </>
        }
        {user &&
        <div>
          <Togglable buttonLabel={"New Blog"} ref={blogFormRef}>
            <BlogForm createBlog={addBlog}/>
          </Togglable>

        </div>
        }

          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}

      </div>
    )
};

export default App
