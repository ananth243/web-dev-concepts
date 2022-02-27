import React from 'react'

function Json({object}) {
  return (
    <pre>{JSON.stringify(object, null, 4)}</pre>
  )
}

export default Json