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
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const HackerNewsSearch = () => {
  const [query, setQuery] = useState(localStorage.getItem("searchQuery") || "");
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
      localStorage.setItem("searchQuery", query);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <Paper
      elevation={3}
      style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}
    >
      <Typography variant="h5" style={{ marginBottom: "20px" }}>
        Search the news
      </Typography>
      <InputBase
        fullWidth
        placeholder="Enter your search query"
        value={query}
        onChange={handleInputChange}
        style={{
          fontSize: "16px",
          marginBottom: "20px",
          border: "1px solid #ccc", // Add border
          padding: "10px",
        }}
        startAdornment={
          <InputAdornment position="start">
            <SearchOutlinedIcon />
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
