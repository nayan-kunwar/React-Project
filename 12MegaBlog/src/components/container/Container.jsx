import React from 'react'

function Container({children}) {
    // do not need to use () as only single element is return here
  return <div className='w-full max-w-7xl mx-auto px-4'>{children}</div>;
  
}

export default Container