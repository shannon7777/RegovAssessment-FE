import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Box, Button, Stack, Typography } from "@mui/material";
import Article from "./Article";
import { Login } from "@mui/icons-material";
import useAuth from "../../hooks/useAuth";

const Home = ({}) => {
  const {
    auth: { user },
  } = useAuth();
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const {
        data: { articles, status },
      } = await axios(
        `https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=ad4e5423e0144f1e9df989f753cb9cea&pageSize=10`
      );
      if (status === "ok") return setNews(articles);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box m={10}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h3" my={2}>
          HomePage
        </Typography>

        {!user && (
          <Button
            component={Link}
            to={"/login"}
            variant="contained"
            endIcon={<Login />}
            sx={{ borderRadius: 3, bgcolor: "#141b2d", height: 50, mt: 1 }}
          >
            Log in
          </Button>
        )}
      </Stack>
      <Typography variant="h5">News and events</Typography>
      {news.map((article, index) => (
        <Article key={index} article={article} />
      ))}
    </Box>
  );
};

export default Home;
