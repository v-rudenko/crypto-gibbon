import { Box } from "@mui/material"
import Icon from "./Icon"
import { Data } from "../CoinsTable"




/* <Icon src={`/icons/${row.symbol.toLowerCase()}.png`} alt="" />{row.title} */


const CoinNameLayout = (props: Data) => {
  // const baboon = "bob";
  return (
    <Box><Icon src={``} />{props.title}</Box>
  )
}

export default CoinNameLayout