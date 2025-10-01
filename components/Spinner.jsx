'use client'

import ClipLoader from 'react-spinners/ClipLoader'

const override = {
  display: 'block',
  margin: '100px auto'
}

const Spinner = () => {
  return (
    <ClipLoader
      size={50}
      color='#3b82f6'
      cssOverride={override}
      aria-label='Loading Spinner'
    />
  )
}

export default Spinner
