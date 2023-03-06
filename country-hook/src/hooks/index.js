import { useState, useEffect } from 'react'
import axios from 'axios'

const baseUrl = 'https://restcountries.com/v3.1/name'

export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }
  
    return {
      type,
      value,
      onChange
    }
  }
  
export const useCountry = (name) => {
    const [country, setCountry] = useState(null)

    useEffect(() => {
        // console.log('test', `${baseUrl}/${name}?fullText=true`)
        axios.get(`${baseUrl}/${name}?fullText=true`)
            .then(res => {
                setCountry(res.data[0])  
            })
            .catch((error) => {
                setCountry('null');
            });
    }, [name])
    // console.log('setCountry: ', country)
    return country
}


