import { LazyImage } from "@/components/LazyImage";
import { MouseEventHandler, useState } from "react";
import { random } from "lodash";

const randomNumber = (): number => Math.floor(Math.random() * 123) + 1;
const randomId = (): string => Math.random().toString(36).substr(2, 9);
// const randomId = () => random(1, 123).toString();

export default function Home() {
  const [images, setImages] = useState<IFoxItem[]>([
    {
      id: randomId(),
      url: `https://randomfox.ca/images/${randomNumber()}.jpg`,
    },
  ]);

  const addNewFox: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    const newFox: IFoxItem = {
      id: randomId(),
      url: `https://randomfox.ca/images/${randomNumber()}.jpg`,
    };

    setImages([...images, newFox]);
  };

  return (
    <>
      <main>
        <h1 className="text-xl">Hello World</h1>
        <button onClick={addNewFox}>Add Fox</button>
        {images.map(({ id, url }, index) => (
          <div key={id} id={id} className="p-4">
            <LazyImage
              src={url}
              alt="fox"
              width={320}
              height="auto"
              className="rounded-md bg-gray-500"
              onClick={() => console.log("ey")}
              onLazyLoad={(img) => {
                console.log(`Image #${index + 1} carga. Nodo`, img);
              }}
            />
          </div>
        ))}
      </main>
      <footer></footer>
    </>
  );
}
