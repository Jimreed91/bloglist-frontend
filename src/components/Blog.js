import { useState } from 'react'

const Blog = ({blog, handleLike, destroyBlog}) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    width: 'full'

  }

  const textStyle = {
    margin: 2
  }

  return (
  <div style={blogStyle}>
    <div style={{display: 'flex'}}>
      <p style={textStyle}> {blog.title} {blog.author} </p>
      <button style={hideWhenVisible} onClick={toggleVisibility}> View </button>
      <button style={showWhenVisible} onClick={toggleVisibility}> Hide</button>
    </div>
    <div style={showWhenVisible}>
      <p style={textStyle}> {blog.url} </p>
      <div style={{display: 'flex'}}>
        <p style={textStyle}> likes: {blog.likes} </p>
        <button onClick={handleLike}> Like </button>
      </div>

      <p style={textStyle}> {blog.user.name} </p>
      <button onClick={destroyBlog}> Remove </button>
    </div>
  </div>
  )
}

export default Blog
