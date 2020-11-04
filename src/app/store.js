import { configureStore } from "@reduxjs/toolkit";
import pokemonsSlice from "../features/pokemonsSlice";

export default configureStore({
  reducer: {
    pokemons: pokemonsSlice,
  },
});
