export const styles = {
    getStartedBtn : {
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        my: 5,
        borderRadius: "50px",
        py: 1.5,
        background: "#2563EB",
        color: "#fff",
        border: "2px solid #FFF",
        "&:hover": {
            background: "linear-gradient(94.44deg, #666666 29%, #000000 100%)",
        },
    },
    planToggleBg : {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "25px",
        overflow: "hidden",
        width: "200px",
        height: "50px",
        border: "1px solid #E4E4E7",
        position: "relative",
        background:'#FFF'
    },
    planToggleHighlight : {
        position: "absolute",
        top: 0,
        width: "50%",
        height: "100%",
        backgroundColor: "#2563EB",
        border: "5px solid white",
        borderRadius: "50px",
        transition: "left 0.3s ease",
        zIndex: 1,
    },
    planCard : {
        zIndex: 2,
        width: "50%",
        height: "100%",
        textAlign: "center",
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "bold",
        padding: "10px 0",
    }
}
