import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
  const { id } = useParams()
  console.log('id', id)
  const userLogin = useSelector((state) => state.login)

  const users = useSelector((state) => state.user)
  console.log('users', users)

  const user = users.find((u) => u.id === id)
  console.log('user', user)

  if (!user) return null
  if (!userLogin) return null

  return (
    <div>
      <h2>{ user.name }</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>
            {blog.title}
          </li>
        ))}
      </ul>
    </div>

  )
}

export default User
