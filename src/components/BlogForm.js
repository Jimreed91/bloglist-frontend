import { useState } from 'react'
import { PropTypes } from 'prop-types'

const BlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <form onSubmit={addBlog}>
      <div>
        Title:
        <input
          id='title'
          type='text'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          placeholder='add the title here'
        />
      </div>
      <div>
        Author:
        <input
          id='author'
          type='text'
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          placeholder='add the author here'
        />
      </div>
      <div>
        URL:
        <input
          id='url'
          type='text'
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          placeholder='add the url here'
        />
      </div>
      <button id='add-blog-button' type='submit'>Add Blog</button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default  BlogForm
