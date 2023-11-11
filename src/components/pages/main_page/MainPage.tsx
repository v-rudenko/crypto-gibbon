// type Props = {}
import axios from "axios"
import CoinsTable from "../../CoinsTable"

import { useState, useEffect } from "react"
import { Box } from "@mui/material"

const API = 'https://api.coincap.io/v2/assets'


const MainPage = () => {
  const [coins, setCoins] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(API)
      const coins = result.data.data
      console.log(coins)
      setCoins(coins)
    }
    fetchData()
  }, [])

  return (
    // dispalyedCoins
    <Box sx={{width: "70vw"}}>
      <CoinsTable coins={coins} />
    </Box>
  )
}

export default MainPage