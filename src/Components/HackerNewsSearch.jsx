import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  InputAdornment,
  Paper,
  InputBase,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import SearchOutlined from "@mui/icons-material/SearchOutlined";

const HackerNewsSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://hn.algolia.com/api/v1/search?query=${query}`
        );
        setResults(response.data.hits);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (query.trim() !== "") {
      fetchData();
    } else {
      setResults([]); // Clear results if the query is empty
    }
  }, [query]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <Paper
      elevation={3}
      style={{
        maxWidth: "800px",
        minHeight: "615px",
        margin: "0 auto",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // Center horizontally
      }}
    >
      <Typography variant="h4" style={{ marginBottom: "20px" }}>
        Hacker News Search
      </Typography>
      <InputBase
        fullWidth
        placeholder="Enter your search query"
        value={query}
        onChange={handleInputChange}
        style={{
          fontSize: "16px",
          marginBottom: "20px",
        }}
        startAdornment={
          <InputAdornment position="start" color="black">
            <SearchOutlined />
          </InputAdornment>
        }
      />
      {results.length > 0 ? (
        <List>
          {results.map((result) => (
            <ListItem
              key={result.objectID}
              style={{
                marginBottom: "10px",
                padding: "15px",
                border: "1px solid #ddd",
                borderRadius: "5px",
              }}
            >
              <Typography variant="h6">
                <Link
                  to={`/items/${result.objectID}`}
                  style={{
                    textDecoration: "none",
                    color: "#007BFF",
                    fontWeight: "bold",
                  }}
                >
                  {result.title}
                </Link>
              </Typography>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No results found</Typography>
      )}
    </Paper>
  );
};

export default HackerNewsSearch;
