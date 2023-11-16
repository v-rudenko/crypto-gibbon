//// TODO: Виправити сортування за відсотком зміни ціни.

// type Props = {}
import axios from "axios";
import CoinsTable from "../../CoinsTable";
import UpdateTable from "../../networking/mainTable/service/UptateTable";

import { useState, useEffect } from "react";
import { Box } from "@mui/material";

const API = "https://api.coincap.io/v2/assets";

const MainPage = () => {
  const [coins, setCoins] = useState([]);
  const [oldCoins, setOldCoins] = useState([]);
  const [biggerPrice, setBiggerPrice] = useState(false);
  const [smallerPrice, setSmallerPrice] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(API);
      const data = result.data.data;
      setCoins(data);
      // setOldCoins(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const UpdateData = async () => {
        const result = await axios.get(API);
        const currentCoins = result.data.data;

        // setUpdatedCoins(coins);
        // console.log(updatedCoins);
        setOldCoins(coins);
        setCoins(currentCoins);
        console.log(coins);
      };
      UpdateData();
    }, 2000);
    return () => clearInterval(interval);
  }, [coins]);


  return (
    <Box sx={{ width: "70vw" }}>
      <CoinsTable coins={coins} oldCoins={oldCoins} />
    </Box>
  );
};

export default MainPage;
