import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import DepartmentList from "./DepartmentList";

interface Post {
  id: number;
  title: string;
  description: string;
}

const TableData = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("https://api.sampleapis.com/coffee/iced")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <div>
      <Typography variant="h5" color="inherit" component="div">
        Iced Coffee
      </Typography>
      <Typography variant="h6" color="inherit" component="div">
        Fetched from sample coffee API: https://sampleapis.com/api-list/coffee
      </Typography>

      <TableContainer style={{ marginBottom: "5rem" }} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DepartmentList />
    </div>
  );
};

export default TableData;
