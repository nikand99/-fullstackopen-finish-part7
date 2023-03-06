import { useState } from 'react'
import  { useField } from './hooks/index'

import {
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom"

// const Menu = () => {
//   const padding = {
//     paddingRight: 5
//   }
//   return (
//     <Router>
//       <div>
//         <Link style={padding} to="/" >anecdotes</Link>
//         <Link style={padding} to="/CreateNew">create new</Link>
//         <Link style={padding} to="/About">about</Link>
//       </div>

//       <Routes>
//         <Route path="/" element={<AnecdoteList />} />
//         <Route path="/Anecdote:id" element={<Anecdote />} />
//         <Route path="/CreateNew" element={<CreateNew />} />
//         <Route path="/About" element={<About />} />
//       </Routes>
//     </Router>
//   )
// }

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find(n => n.id === Number(id)) 
  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <div>has {anecdote.votes} votes</div>
      <br />
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} ><Link to={`/Anecdote/${anecdote.id}`}>{anecdote.content}</Link></li>)}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.
    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const {reset: resetContent, ...content }= useField('text')
  const { reset: resetAuthor, ...author} = useField('text')
  const { reset: resetInfo, ...info } = useField('text')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('content', content.value)
    console.log('author', author.value)
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
  })
    props.setNotification(`a new anecdote ${content.value}`)
    setTimeout(() => props.setNotification(''), (5000) )
    navigate('/')
    
  }

  const handleReset = (e) => {
    console.log('handlereset', content.value)
    resetContent()
    resetAuthor()
    resetInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} /> 
          {/* <input name='content' value={content} onChange={(e) => setContent(e.target.value)} /> */}
        </div>
        <div>
          author
          <input {...author} /> 
          {/* <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} /> */}
        </div>
        <div>
          url for more info
          <input {...info} /> 
          {/* <input name='info' value={info} onChange={(e)=> setInfo(e.target.value)} /> */}
        </div>
        <button>create</button>
      </form>
      <button onClick={() =>handleReset()}>reset</button>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      
        <div>
          <Link style={padding} to="/" >anecdotes</Link>
          <Link style={padding} to="/CreateNew">create new</Link>
          <Link style={padding} to="/About">about</Link>
        </div>
        { notification && <h2 style={style}>{notification}</h2> }
        <Routes>
          <Route path="/" element={<AnecdoteList anecdotes={anecdotes}/>} />
          <Route path="/anecdote/:id" element={<Anecdote anecdotes={anecdotes}/>} />
          <Route path="/createNew" element={<CreateNew addNew={addNew} setNotification={setNotification}/>} />
          <Route path="/about" element={<About />} />
        </Routes>
      
      <Footer />
    </div>
  )
}

export default App
