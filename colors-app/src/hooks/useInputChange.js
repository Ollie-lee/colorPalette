import { useState } from 'react'

export const useInputChange = () => {
  //state = {input.name : input.value, input.name : input.value}
  const [input, setInput] = useState({})

  const handleInputChange = (e) => setInput({
    ...input,
    [e.target.name]: e.target.value
  })

  const resetInputChange = (name) => setInput({
    ...input,
    [name]: ''
  })

  return [input, handleInputChange, resetInputChange]

}