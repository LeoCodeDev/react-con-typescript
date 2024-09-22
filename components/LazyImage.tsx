// import type { FunctionComponent, FC } from "react"

import { useEffect, useRef, useState } from "react";
import type { ImgHTMLAttributes } from "react";

// export const RandomFox = () => {
//   return <img alt=""/>
// }

// export const RandomFox: FunctionComponent = (): JSX.Element => {
//   return <img alt=""/>
// }

// export const RandomFox: FC = (): JSX.Element => {
//   return <img alt=""/>
// }

type ImageLazyProps = {
  src: string;
  onLazyLoad?: (img: HTMLImageElement) => void;
};

type ImageNative = ImgHTMLAttributes<HTMLImageElement>;

type Props = ImageLazyProps & ImageNative;

export const LazyImage = ({
  src,
  onLazyLoad,
  ...imgProps
}: Props): JSX.Element => {
  const node = useRef<HTMLImageElement>(null);
  const [isLazyLoaded, setIsLazyLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
  );

  useEffect(() => {
    if (isLazyLoaded) return;
    //Nuevo observador (Investigar que son los observadores)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || !node.current) {
          return;
        }
        setCurrentSrc(src);

        if (typeof onLazyLoad === "function") {
          onLazyLoad(node.current);
        }
      });
    });

    //observe node
    if (node.current) {
      observer.observe(node.current);
    }

    //desconectar
    return () => {
      observer.disconnect();
      setIsLazyLoaded(true)
    };
  }, [src, onLazyLoad, isLazyLoaded]);

  return <img ref={node} src={currentSrc} alt={imgProps.alt} {...imgProps} />;
};
