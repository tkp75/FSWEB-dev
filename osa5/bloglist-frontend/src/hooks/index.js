import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')
  const onChange = (event) => {
    event.persist()
    setValue(event.target.value.toString())
  }
  return {
    type,
    value,
    onChange,
  }
}
