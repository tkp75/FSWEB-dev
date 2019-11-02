import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')
  const onChange = (event) => {
    event.persist()
    setValue(event.target.value.toString())
  }
  const reset = () => {
    setValue('')
  }
  return {
    type,
    value,
    onChange,
    reset,
  }
}
