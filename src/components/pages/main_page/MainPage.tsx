//// TODO: Виправити сортування за відсотком зміни ціни.

// type Props = {}
import axios from "axios";
import CoinsTable from "../../CoinsTable";
// import UpdateTable from "../../networking/mainTable/service/UptateTable";

import { useState, useEffect } from "react";
import { Box } from "@mui/material";

const API = "https://api.coincap.io/v2/assets";

type Data = {
  id: string;
  rank: string | number;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: number;
  changePercent24Hr: string;
  vwap24Hr: string;
  explorer: string;
  biggerPrice: boolean;
  smallerPrice: boolean;
};

// const shuffle = (array: any) => {
//   let currentIndex = array.length,
//     randomIndex;

//   while (currentIndex != 0) {
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex--;

//     [array[currentIndex], array[randomIndex]] = [
//       array[randomIndex],
//       array[currentIndex],
//     ];
//   }
//   return array;
// }

const MainPage = () => {
  const [coins, setCoins] = useState([]);
  const [updatedCoins, setUpdatedCoins] = useState([]);
  // const [biggerPrice, setBiggerPrice] = useState(false);
  // const [smallerPrice, setSmallerPrice] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(API);
      const data = result.data.data;
      data.forEach((element: Data) => {
        element.priceUsd = parseFloat(element.priceUsd.slice(0, 8));
        element.rank = parseFloat(element.rank);
      });
      setUpdatedCoins(data);
      // setOldCoins(data);
      // console.log(updatedCoins);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const UpdateData = async () => {
        const result = await axios.get(API);
        const data = result.data.data;

        for (let i = 0; i < data.length; i++) {
          data[i].priceUsd = parseFloat(data[i].priceUsd.slice(0, 8));
          data[i].rank = parseFloat(data[i].rank);

          if (
            parseFloat(data[i].priceUsd) > parseFloat(updatedCoins[i].priceUsd)
          ) {
            // data[i].biggerPrice = true;
            // data[i].smallerPrice = false;
            data[i].biggerPrice = true;
            data[i].smallerPrice = false;

            // console.log(data[i]);
          } else if (
            parseFloat(data[i].priceUsd) < parseFloat(updatedCoins[i].priceUsd)
          ) {
            data[i].biggerPrice = false;
            data[i].smallerPrice = true;
          } else {
            data[i].biggerPrice = updatedCoins[i].biggerPrice;
            data[i].smallerPrice = updatedCoins[i].smallerPrice;
          }

        }
        setUpdatedCoins(data);
        // }

        // setUpdatedCoins(data);
      };
      UpdateData();
    }, 2000);
    return () => clearInterval(interval);
  }, [updatedCoins]);

  return (
    <Box sx={{ width: "70vw" }}>
      <CoinsTable coins={coins} updatedCoins={updatedCoins} />
    </Box>
  );
};

export default MainPage;
