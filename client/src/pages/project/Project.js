import React from 'react'
import '../../components/single/single.scss'
import SingleProjectDetails from '../../components/SingleProjectDetails'

function Project() {


  return (
    <div className='single'>
      <div className='project'>
        Single project
      <div className='single-details'>
      <SingleProjectDetails />
      </div>
      </div>
    </div>
  )
}

export default Project