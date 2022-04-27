import React from "react";
import {Grid, Button} from "../elements/index";
import { history } from "../redux/configureStore";


const Main = () => {

    return(
        <Grid is_flex width="100%">
            <Button width="500px" _onClick={()=>{history.push("/search")}}>정책을 검색해보세요!</Button>

        </Grid>
    );


}

export default Main;