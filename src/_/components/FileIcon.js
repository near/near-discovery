import React from "react";

export default function FileIcon({ type, sx }) {
  return (
    <img
      style={{
        height: 15,
        ...sx,
      }}
      src={
        (type === "folder" &&
          "https://cdn-icons-png.flaticon.com/512/3767/3767094.png") ||
        (type === "image" &&
          "https://cdn-icons-png.flaticon.com/512/1829/1829586.png") ||
        (type === "html" &&
          "https://cdn-icons-png.flaticon.com/512/174/174854.png") ||
        (type === "json" &&
          "https://cdn-icons-png.flaticon.com/512/460/460989.png") ||
        (type === "txt" &&
          "https://cdn-icons-png.flaticon.com/512/9704/9704754.png") ||
        (type === "widget" &&
          "https://cdn-icons-png.flaticon.com/512/5968/5968292.png") ||
        (type === "javascript" &&
          "https://cdn-icons-png.flaticon.com/512/5968/5968292.png") ||
        (type === "css" &&
          "https://cdn-icons-png.flaticon.com/512/732/732190.png") ||
        (type === "untitled" &&
          "https://cdn-icons-png.flaticon.com/512/7475/7475768.png")
      }
      alt={type}
    />
  );
}
