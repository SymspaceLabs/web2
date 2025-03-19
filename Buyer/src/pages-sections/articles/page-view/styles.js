import { elementalEnd } from "@/app/layout"; // Calling custom font

export const elementalEndFont = {
    fontFamily: `${elementalEnd.style.fontFamily}, sans-serif`,
    textTransform:'lowercase',
    fontWeight: 500
}

export const styles = {
    elementalEndFont,
    cardBtn : {
      ...elementalEndFont,
      fontSize: 10,
      px: 3,
      background: "#000",
      border: "2px solid white",
      borderRadius: "50px",
      color: "#fff",
      fontWeight: 400,
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    },
};
