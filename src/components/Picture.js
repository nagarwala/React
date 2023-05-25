
import React from "react";

function Picture(url) {
    return (
        // eslint-disable-next-line jsx-a11y/alt-text
        <img src={url.url} style={{maxWidth: '500px', maxHeight: '500px'}}/>
    )
}

export default Picture;