import { elementalEnd } from "@/app/layout"; // Calling custom font

const elementalEndFont = {
    fontFamily: `${elementalEnd.style.fontFamily}, sans-serif`,
    textTransform:'lowercase',
    fontWeight: 500
}

const button = {
  ...elementalEndFont,
  py: 2,
  border: "2px solid #000",
  borderRadius: "50px",
}


export const styles = {
  elementalEndFont,
  productCard : {
    p:5,
    borderRadius: "30px",
    boxSizing: 'border-box',
    backdropFilter: 'blur(12px)',
    boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)',
    background: 'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)',
  },
  addToCartButton: {
    ...button,
    width: '100%',
    fontSize:{xs:'14px', sm:'16px'},
    background: 'transparent',
    color: '#000',
    '&:hover' : {
      background: '#FFF',
    }
  },
  buyNowButton: {
    ...button,
    width: '100%',
    background: '#000',
    color: '#FFF',
    '&:hover' : {
      background: '#FFF',
      color: '#000',
    }
  },
  sizeChart : {
    ...button,
    fontSize:8,
    padding: "8px",
    background: '#52647D',
    color: '#fff',
    '&:hover' : {
      background: '#FFF',
      color: '#000',
    }
  },
  iconButton: {
    position: "absolute",
    zIndex: 1,
    backgroundColor: "white",
  },
  favoriteIconButton: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 2,
  },
  selectedImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    mb: 6,
  },
  colorButton: (selectedColor, color) => ({
    width: 40,
    height: 40,
    borderRadius: "50%",
    backgroundColor: color,
    border: selectedColor === color ? "3px solid black" : "1px solid grey",
    margin: "0 5px",
  }),
  sizeButton: {
    padding: "16px 9px",
    border: "1px solid #000000",
    borderRadius: "8px",
    fontFamily: 'Helvetica',
    fontWeight: 700,
    fontSize: '14px',
    color: '#000',
    flexGrow: 1,
    width: '100%',
  },
  sizeChartButton: {
    fontSize: 8,
    padding: "8px",
    borderRadius: "50px",
    background: '#52647D',
    ...elementalEndFont,
    color: '#fff',
  },

    productInfoBox: {
      p: 5,
      boxSizing: 'border-box',
      background: 'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)',
      boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)',
      backdropFilter: 'blur(12px)',
      borderRadius: "30px",
    },
  };
  
  export default styles;
  