import { Box, Divider, Typography, Button } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { Link } from "react-router-dom";
const Article = ({ article }) => {
  return (
    <Box my={2}>
      <Divider sx={{ my: 4, bgcolor: "lightgrey" }} />
      <Typography variant="h6">{article.title}</Typography>
      <Typography>{article.author}</Typography>
      <p>{article.description}</p>
      <Button
        variant="contained"
        to={article.url}
        component={Link}
        endIcon={<ArrowForward />}
        sx={{ borderRadius: 3, bgcolor: "#3da58a", mt: 2 }}
      >
        Visit Source
      </Button>
    </Box>
  );
};

export default Article;
