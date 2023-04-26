import { Carousel } from "./components/Carousel";
import { LibraryServices } from "./components/LibraryServices";
import { NewBooks } from "./components/NewBooks";

export const HomePage = () => {
  return (
    <>
      <NewBooks />
      <Carousel />
      <LibraryServices />
    </>
  );
};
