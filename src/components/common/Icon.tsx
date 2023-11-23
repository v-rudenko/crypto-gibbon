import { useEffect, useRef } from "react";

type Props = {
  src: string;
  alt?: string;
}


const Icon = (props: Props) => {
  // const imageRef = useRef<HTMLImageElement>(null);

  const onLoad = (element: HTMLImageElement) => {
    // console.log("Baboon loaded");
    if (!element) return;
    element.src = props.src;
    element.addEventListener("error", () => {
      // console.log("error", props.src);
      element.src = `/icons/btc.png`   // Просто заглушка

  });
}
  // useEffect(() => {
  //   if (!props.src) return;
  //   const img = new Image();
  //   img.src = props.src;
  //   imageRef.current.src = img;
  // }, [props.src])

  return (
    <img ref={onLoad } alt={props.alt} />
  )
}

export default Icon