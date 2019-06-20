import React from 'react'
import { useSelector } from 'react-redux'

const Header = () => {
  const mentor = useSelector(state => state.mentors_by_id[state.current_mentor])

  try {
    return <div id='header'>{`${mentor.name}: ${mentor.title}`}</div>
  }
  catch (err) {
    return <div id='header'></div>
  }
}

export default Header