import React from 'react';
import { css } from "@emotion/core";
// import PacmanLoader from "react-spinners/PacmanLoader";
import HashLoader from "react-spinners/HashLoader";

const override = css`
  display: block;
  margin: 0 auto;
`;

export default function Loader({loading}) {

    return (
        <div className="sweet-loading">
            <HashLoader
                css={override}
                size={50}
                color={"#5cc777"}
                loading={loading}
            />
        </div>
    )


}

