import { useEffect, useRef } from "react";
import { styled } from "@mui/material";

type Props = {
  src: string;
  alt?: string;
}

const StyledImage = styled("img")({
  float: "left",
  width: "40px",
  height: "40px",
  marginRight: "10px",
})


const Icon = (props: Props) => {
  // const imageRef = useRef<HTMLImageElement>(null);

  const onLoad = (element: HTMLImageElement) => {
    if (!element) return;

      element.src = props.src;

    element.src = props.src;
    element.addEventListener("error", () => {
      console.log("error with image");
      element.src = `/icons/btc.png`   // Просто заглушка

  }, { once: true });
}

  return (
    // <StyledImage onError={() => {console.log("bob")}} ref={onLoad} alt={props.alt} />
    <StyledImage ref={onLoad} alt={props.alt} />
  )
}

export default Icon