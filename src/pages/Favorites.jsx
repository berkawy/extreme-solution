import React, { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import UsersComponent from "../components/UsersComponent";
import { Typography } from "@mui/material";

export default function Favorites(
) {
  const favoriteUsers = useSelector((state) => state.favorites);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFavorites, setFilteredFavorites] = useState(favoriteUsers.favorites);

  // Handle search input
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredFavorites(
      favoriteUsers.favorites.filter((user) => user.login.toLowerCase().includes(query))
    );
  };

  return (
    <>
      <Navbar searchQuery={searchQuery} handleSearch={handleSearch}/>
      {filteredFavorites.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: "center", marginTop: 2 }}>
          No favorite users added yet.
        </Typography>
      ) : (
        <UsersComponent
          users={filteredFavorites}
          isFavoritesPage={true}
        />
      )}
    </>
  );
}
