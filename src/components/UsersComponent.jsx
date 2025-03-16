import React from "react";
import { Box, Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../redux/favoritesSlice";
import GradeIcon from '@mui/icons-material/Grade';
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";

export default function UsersComponent({ users, isFavoritesPage }) {
  const dispatch = useDispatch();
  const favoriteUsers = useSelector((state) => state.favorites);

  const isFavorite = (userId) => favoriteUsers.favorites.some((user) => user.id === userId);

  // Handle adding a user to favorites
  const handleAddToFavorites = (user) => {
    dispatch(addFavorite(user));
  };

  // Handle removing a user from favorites
  const handleRemoveFromFavorites = (userId) => {
    dispatch(removeFavorite(userId));
  };

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="center"
      gap={2}
      sx={{
        backgroundColor: (theme) => theme.palette.background.default,
        padding: 3,
      }}
    >
      {users.map((user) => (
        <Card
          key={user.id}
          sx={{
            width: 250,
            height: 270,
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: (theme) => theme.palette.background.paper,
            transition: "transform 0.3s",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          {isFavoritesPage && (
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <CardMedia
                component="img"
                height="140"
                image={user.avatar_url}
                alt={`${user.login}'s avatar`}
                sx={{
                  objectFit: "cover",
                  borderTopLeftRadius: 2,
                  borderTopRightRadius: 2,
                }}
              />
              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  align="center"
                  sx={{ color: (theme) => theme.palette.text.primary }}
                >
                  {user.login}
                </Typography>
              </CardContent>
            </a>
          )}
          {!isFavoritesPage && (
            <>
              <CardMedia
                component="img"
                height="140"
                image={user.avatar_url}
                alt={`${user.login}'s avatar`}
                sx={{
                  objectFit: "cover",
                  borderTopLeftRadius: 2,
                  borderTopRightRadius: 2,
                }}
              />
              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  align="center"
                  sx={{ color: (theme) => theme.palette.text.primary }}
                >
                  {user.login}
                </Typography>
              </CardContent>
            </>
          )}

          <Box
            display="flex"
            justifyContent="center"
            sx={{
              marginTop: 1,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{
                width: "90%",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.primary.dark,
                },
              }}
              startIcon={!isFavorite(user.id) ? <GradeIcon sx={{color: "yellow"}} /> : <GradeOutlinedIcon sx={{color: "white"}} />}
              onClick={() =>
                isFavorite(user.id)
                  ? handleRemoveFromFavorites(user.id)
                  : handleAddToFavorites(user)
              }
            >
              {isFavorite(user.id) ? "Remove from favorites" : "Add to favorites"}
            </Button>
          </Box>
        </Card>
      ))}
    </Box>
  );
}
