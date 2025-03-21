import { elementalEnd } from "@/app/layout"; // Calling custom font

export const elementalEndFont = {
  fontFamily: `${elementalEnd.style.fontFamily}, sans-serif`,
  textTransform:'lowercase',
  fontWeight: 500
}

export const styles = {
    elementalEndFont,
    btn : {
        ...elementalEndFont,
        background:'linear-gradient(90deg, #3084FF 0%, #1D4F99 100%)',
        borderRadius: '25px',
        px:10,
        py:2.5,
        color: '#fff',
        fontSize:'20px',
    },
    btn2 : {
        ...elementalEndFont,
        background:'linear-gradient(97.04deg, #666666 0%, #1D1D1D 100%)',
        borderRadius: '50px',
        px:12.5,
        py:2,
        color: '#fff',
        fontSize:'20px',
        border:'1px solid #FFF' 
    }
}