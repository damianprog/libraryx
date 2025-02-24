import { useState } from "react";
import AddBookModal from "../components/BasicModal/AddBookModal";
import SearchAppBar from "../components/SearchAppBar";

const Home = () => {
  const [searchInput, setSearchInput] = useState("");

  const onSearchInputChange = (input) => {
    setSearchInput(input);
  };

  return (
    <>
      <SearchAppBar onSearchInputChange={onSearchInputChange} />
      <AddBookModal />
    </>
  );
};

export default Home;
