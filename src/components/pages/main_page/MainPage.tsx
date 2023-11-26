//// TODO: Виправити сортування за відсотком зміни ціни.

// type Props = {}
import axios from "axios";
import CoinsTable from "../../CoinsTable";
// import UpdateTable from "../../networking/mainTable/service/UptateTable";

import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { Coin } from "../../../types/coins";

const API = "https://api.coincap.io/v2/assets";

const shuffle = (array: Array<any>) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

function formatCompactNumber(number: number) {
  const formatter = Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 2,
  });
  return formatter.format(number);
}

const MainPage = () => {
  const [updatedCoins, setUpdatedCoins] = useState<Array<Coin>>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(API);
      const data = result.data.data;
      data.forEach((element: Coin) => {
        element.priceUsd = parseFloat(element.priceUsd.toString().slice(0, 8));
        element.rank = parseFloat(element.rank.toString());
        element.changePercent24Hr = parseFloat(
          element.changePercent24Hr.toString().slice(0, 4)
        );
        element.marketCapUsd = +formatCompactNumber(
          parseFloat(element.marketCapUsd.toString())
        );
        if (!element.vwap24Hr) {
          element.vwap24Hr = "-";
        } else {
          element.vwap24Hr = parseFloat(element.vwap24Hr.toString().slice(0, 8));
        }
      });
      setUpdatedCoins(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const updateRandomData = async () => {
        const result = await axios.get(API);
        // const data = result.data.data;
        const shuffledData = shuffle(result.data.data);

        const updatedData = updatedCoins.map((el: Coin) => ({ ...el }));
        const updatedIds = new Set();

        for (let i = 0; i < 20 && i < shuffledData.length; i++) {
          // data[i].priceUsd = parseFloat(data[i].priceUsd.slice(0, 8));
          // data[i].rank = parseFloat(data[i].rank);

          const randomIndex = Math.floor(Math.random() * shuffledData.length);
          const randomElement = shuffledData[randomIndex];

          if (!updatedIds.has(randomElement.id)) {
            updatedIds.add(randomElement.id);
            const indexToUpdate = updatedData.findIndex(
              (el) => el.id === randomElement.id
            );
            if (indexToUpdate !== -1) {
              const updatedPriceUsd = parseFloat(
                randomElement.priceUsd.slice(0, 8)
              );
              const prevPriceUsd = updatedData[indexToUpdate].priceUsd;

              updatedData[indexToUpdate] = {
                ...randomElement,
                priceUsd: parseFloat(randomElement.priceUsd.slice(0, 8)),
                rank: parseFloat(randomElement.rank),
                changePercent24Hr: parseFloat(
                  randomElement.changePercent24Hr.slice(0, 4)
                ),
                biggerPrice: updatedPriceUsd > prevPriceUsd,
                smallerPrice: updatedPriceUsd < prevPriceUsd,
                marketCapUsd: formatCompactNumber(
                  parseFloat(randomElement.marketCapUsd)
                ),
                vwap24Hr: randomElement.vwap24Hr
                  ? parseFloat(randomElement.vwap24Hr.slice(0, 8))
                  : "-",
              };
            }
          }
        }
        setUpdatedCoins(updatedData);
      };

      updateRandomData();
    }, 2000);
    return () => clearInterval(interval);
  }, [updatedCoins]);

  return (
    <Box sx={{ width: "70vw" }}>
      <CoinsTable updatedCoins={updatedCoins} />
    </Box>
  );
};

export default MainPage;
