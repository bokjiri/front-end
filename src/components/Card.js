import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ReactIcon } from "../Icons/Icon";
import { useHistory } from "react-router-dom";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function BasicCard() {
  const history = useHistory();

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          카테고리
        </Typography>
        <Typography variant="h5" component="div">
          서비스명
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          간단한 정책 내용
        </Typography>
        <Typography variant="body2">소관부처명</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          <ReactIcon.BsBookmarkCheck />
        </Button>
        <button onClick={() => history.push("detail")}> 모달 </button>
      </CardActions>
    </Card>
  );
}
