import { useEffect, useState, memo, lazy } from "react";
import { Grid, Card, CardContent, Typography, Avatar, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

// Lazy load the CardMedia component to improve performance
const CardMedia = lazy(() => import("@mui/material/CardMedia"));

// Styled Card component with hover effects
const StyledCard = styled(Card)(({ theme }) => ({
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: theme.shadows[6],
  },
}));

// Styled container for the media section of the card
const StyledCardMedia = styled("div")({
  borderRadius: "8px 8px 0 0",
  overflow: "hidden",
});

// Styled content section of the card
const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(2),
}));

// Styled container for the author information
const AuthorContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

// Styled avatar for the author image
const AuthorImage = styled(Avatar)(({ theme }) => ({
  width: 56,
  height: 56,
  marginBottom: "2em",
}));

const Posts = () => {
  const [posts, setPosts] = useState([]);

  // Fetch posts data when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://codebuddy.review/posts");
        const result = await response.json();
        setPosts(result.data); // Update state with fetched data
      } catch (error) {
        console.error("Fetching error:", error); // Log any errors
      }
    };

    fetchPosts(); // Call the fetch function
  }, []); // Empty dependency array means this runs once on mount

  return (
    <Grid container spacing={2} className="p-6">
      {posts.map((post) => (
        <Grid item xs={12} sm={6} md={4} key={post.id} className="p-4">
          <StyledCard>
            <StyledCardMedia>
              <CardMedia
                component="img"
                height="140"
                image={post.image || "default_image_url"} // Default image URL if none provided
                alt={post.writeup}
              />
            </StyledCardMedia>
            <StyledCardContent>
              <AuthorContainer>
                <AuthorImage src={post.avatar || "default_avatar_url"} />{" "}
                {/* Default avatar if none provided */}
                <Box>
                  <Typography variant="h6" gutterBottom>
                    {post.firstName} {post.lastName} {/* Display author's name */}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {post.writeup} {/* Display the post's writeup */}
                  </Typography>
                </Box>
              </AuthorContainer>
            </StyledCardContent>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default memo(Posts); // Memoize the component to avoid unnecessary re-renders
