// cardStyles.js
const cardStyle = (downMd) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  gap: "16px", // Space between inputs
  mt: 2,
  ...(downMd && {
    flexDirection: "column", // Stack inputs on smaller screens
    alignItems: "stretch",
  }),
});


export default cardStyle;
