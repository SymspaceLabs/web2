import { useState } from "react";
export default function useHeader() {
  const [dialogOpen, setDialogOpen] = useState(false);

  //CART
  const [cartOpen, setCartOpen] = useState(false);
  
  //FAVOURITES
  const [favouriteOpen, setFavouriteOpen] = useState(false);


  const [searchBarOpen, setSearchBarOpen] = useState(false);

  const toggleDialog = () => setDialogOpen(state => !state);

  const toggleCartOpen = () => setCartOpen(state => !state);

  const toggleFavouriteOpen = () => setFavouriteOpen(state => !state);


  const toggleSearchBar = () => setSearchBarOpen(state => !state);

  return {
    dialogOpen,
    cartOpen,
    favouriteOpen,
    searchBarOpen,

    toggleDialog,
    toggleCartOpen,
    toggleFavouriteOpen,

    toggleSearchBar
  };
}