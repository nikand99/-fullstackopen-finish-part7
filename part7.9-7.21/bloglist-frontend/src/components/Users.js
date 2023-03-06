import { useSelector } from 'react-redux'

import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = () => {
  const users = useSelector((state) => state.user)
  // console.log('state.users ', users)

  const userLogin = useSelector((state) => state.login)
  if (!userLogin) return null

  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <thead>
          <tr>
            <td>
              <strong>name</strong>
            </td>
            <td>
              <strong>blogs created</strong>
            </td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>
                {user.blogs.length}
              </td>
            </tr>
          )
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default Users
