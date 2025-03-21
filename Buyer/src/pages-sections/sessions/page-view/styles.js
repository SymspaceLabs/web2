import { elementalEnd } from "@/app/layout"; // Calling custom font

export const elementalEndFont = {
  fontFamily: `${elementalEnd.style.fontFamily}, sans-serif`,
  textTransform:'lowercase',
  fontWeight: 500
}

export const styles = {
    elementalEndFont,
    btn : {
        fontSize: '16px',
        ...elementalEndFont,
        background: "#000",
        color: "#fff",
        width: "100%",
        border: "2px solid transparent",
        py: 1,
        borderRadius: '12px',
        ":hover": {
            background: "#fff",
            color: "#000",
            border: "2px solid black",
        },
    }
}