import { Box } from "@mui/material";
import Icon from "./Icon";
import { Data } from "../CoinsTable";
import defaultIcon from "../../../public/icons/btc.png"
/* <Icon src={`/icons/${row.symbol.toLowerCase()}.png`} alt="" />{row.title} */

type Props = {
  coin: Data;
  title: string;
};

const CoinNameLayout = (props: Props) => {
  // const baboon = "bob";

  // console.log(props);
  return (
    <Box>
      {/* {props.coin.symbol ? (
        <Icon src={`/icons/${props.coin.symbol?.toLowerCase()}.png`} />
      ) : (
        <Icon src={defaultIcon} />
      )} */}
      <Icon src={`/icons/${props.coin.symbol?.toLowerCase()}.png`} />
      <Box>{props.coin.title}</Box>
      <Box>{props.coin.symbol}</Box>
    </Box>
  );
};

export default CoinNameLayout;
