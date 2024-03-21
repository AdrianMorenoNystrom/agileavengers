import './widgets.scss';

import React from 'react'

function TotalHours() {
  return (
<div className='widget-container'>
        <div className='widget-titles'>
            <p className='widget-title'>hours this week</p>
        </div>
        <p className='widget-result'>350</p>
    </div>
  )
}

export default TotalHours