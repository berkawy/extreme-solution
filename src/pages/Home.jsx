import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import UsersComponent from "../components/UsersComponent";
import Navbar from "../components/Navbar";
import ScrollToTopButton from "../components/ScrollToTopButton";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [lastUserId, setLastUserId] = useState(0);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchUsers = async (since) => {
    try {
      setHasMoreData(false);
      const response = await fetch(
        `https://api.github.com/users?per_page=${5}&since=${since}`,
        {
          headers: {
            Authorization: `token ${import.meta.env.VITE_TOKEN}`, //Token used to not limit fetching
          },
        }
      );
      const data = await response.json();
      const linkHeader = response.headers.get("Link");

      if (linkHeader) {
        const links = linkHeader.split(", ");
        for (const link of links) {
          if (link.includes('rel="next"')) {
            setHasMoreData(true);
          }
        }
      }
      if (data.length > 0) {
        setUsers((prevUsers) => [...prevUsers, ...data]);
        setFilteredUsers((prevUsers) => [...prevUsers, ...data]);
        const lastUser = data[data.length - 1];
        setLastUserId(lastUser.id);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

   // Handle search input
   const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredUsers(users.filter((user) => user.login.toLowerCase().includes(query)));
  };

  useEffect(() => {
    fetchUsers(0);
  }, []);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    fetchUsers(lastUserId);
  };

  return (
    <>
      {isLoading && users.length === 0 ? (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Navbar searchQuery={searchQuery} handleSearch={handleSearch}/>
          <Box sx={{ padding: 2 }}>
            <UsersComponent users={filteredUsers} isFavoritesPage={false} />
            {filteredUsers.length === 0 ? (
              <Typography
                variant="h6"
                sx={{ textAlign: "center", marginTop: 2 }}
              >
                No users available.
              </Typography>
            ) : (
              <Box
                sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}
              >
                {hasMoreData && !isLoadingMore ? (
                  <Button
                    onClick={handleLoadMore}
                    variant="contained"
                    color="primary"
                    sx={{
                      padding: "10px 20px",
                      fontSize: "16px",
                      fontWeight: "bold",
                      transition: "all 0.3s ease",
                      ":hover": {
                        backgroundColor: "#1976d2",
                      },
                    }}
                  >
                    Load More
                  </Button>
                ) : (
                  isLoadingMore && (
                    <CircularProgress sx={{ marginTop: 2 }} />
                  )
                )}
              </Box>
            )}
          </Box>
          <ScrollToTopButton />
        </>
      )}
    </>
  );
}
