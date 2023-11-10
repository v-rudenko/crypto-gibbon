// type Props = {}
import axios from "axios"

import { useState, useEffect } from "react"

const API = 'https://api.coincap.io/v2/assets'


const MainPage = () => {
  const [coins, setCoins] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(API)
      console.log(result.data)
    }
    fetchData()
  }, [])
  return (
    <div>MainPage</div>
  )
}

export default MainPage