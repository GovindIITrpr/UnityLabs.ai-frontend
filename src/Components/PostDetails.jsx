import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Typography, Paper, Divider, List, ListItem } from "@mui/material";

const PostDetail = () => {
  const { objectID } = useParams();
  const [postDetails, setPostDetails] = useState(null);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(
          `http://hn.algolia.com/api/v1/items/${objectID}`
        );

        setPostDetails(response.data);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    if (objectID) {
      fetchPostDetails();
    }
  }, [objectID]);

  const formatCommentText = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const sanitizedHTML = doc.body.innerHTML;
    return { __html: sanitizedHTML };
  };

  return (
    <Paper
      elevation={3}
      style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}
    >
      {postDetails ? (
        <>
          <Typography variant="h4" style={{ marginBottom: "20px" }}>
            {postDetails.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Points: {postDetails.points}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="h6" style={{ marginBottom: "10px" }}>
            Comments:
          </Typography>
          {postDetails.children && postDetails.children.length > 0 ? (
            <List>
              {postDetails.children.map((comment) => (
                <ListItem key={comment.id} style={{ marginBottom: "15px" }}>
                  <Typography
                    variant="body1"
                    dangerouslySetInnerHTML={formatCommentText(comment.text)}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography>No comments</Typography>
          )}
        </>
      ) : (
        <Typography>Loading post details...</Typography>
      )}
    </Paper>
  );
};

export default PostDetail;
