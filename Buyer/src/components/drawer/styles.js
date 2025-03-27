import { elementalEndFont } from "../styles"

const btn = {
    color: "#FFF",
    borderRadius:'50px',
    py: 1.5,
    width:'100%',
    border:'2px solid white',
    wordSpacing: '5px',
    ...elementalEndFont   

}

export const styles = {
    blueBtn : {
        ...btn,
        background: "linear-gradient(90deg, #3084FF 0%, #1D4F99 100%)",
        '&:hover' : {
            background: ' linear-gradient(92.78deg, #3084FF 39.5%, #1D4F99 100%)'
        }
    },
    darkBtn : {
        ...btn,
        background: "#000",
        '&:hover' : {
            background: 'linear-gradient(94.44deg, #666666 29%, #000000 100%)'
        }
    },
    headerCard : {
        px: 2,
        justifyContent: "center",
        height: 74,
        borderRadius: "15px",
        background: "linear-gradient(117.54deg, rgba(255, 255, 255, 0.95) -19.85%, rgba(245, 245, 245, 0.6) 4.2%, rgba(240, 240, 240, 0.5) 13.88%, rgba(230, 230, 230, 0.4) 27.98%, rgba(225, 225, 225, 0.35) 37.8%, rgba(220, 220, 220, 0.3) 44.38%, rgba(215, 215, 215, 0.25) 50.54%, rgba(210, 210, 210, 0.2) 60.21%)",
    }
}