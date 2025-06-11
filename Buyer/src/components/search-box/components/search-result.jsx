// ./components/search-result.js
import MenuItem from "@mui/material/MenuItem";
import { List, Paper } from "@mui/material"; // Imported Paper for styling container

// ==============================================================
// SearchResult component displays the filtered search results.
// It expects 'results' to be an array of objects, where each object has
// 'id', 'title', and 'link' properties.
// ==============================================================
export default function SearchResult({ results }) {
  if (!results || results.length === 0) {
    return null;
  }

  return (
    <Paper elevation={2}>
      <List>
        {results.map(item => (
          <a
            href={item.link}
            key={item.id}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <MenuItem>{item.title}</MenuItem>
          </a>
        ))}
      </List>
    </Paper>
  );
}
