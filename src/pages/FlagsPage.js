import React, { useEffect, useState, useCallback } from "react";

export default function FlagsPage(props) {
  const [bosLoaderUrl, setBosLoaderUrl] = useState(
    props.flags?.bosLoaderUrl || ""
  );

  const handleSave = useCallback((e) => {
    e.preventDefault();
    props.setFlags?.({
      bosLoaderUrl,
    });
  });

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        rowGap: "1rem",
        padding: "40px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        <div style={{ verticalAlign: "middle" }}>BOS Loader Url</div>
        <input
          className="form-control"
          placeholder="e.g. http://127.0.0.1:3030/, https://my-loader.ngrok.io"
          value={bosLoaderUrl}
          onChange={(e) => setBosLoaderUrl(e.target.value)}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <button
          className="btn btn-primary"
          style={{ width: "10rem" }}
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </form>
  );
}
