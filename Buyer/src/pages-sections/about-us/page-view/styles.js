import { elementalEnd } from "@/app/layout"; // Calling custom font

const elementalEndFont = {
    fontFamily: `${elementalEnd.style.fontFamily}, sans-serif`,
    textTransform:'lowercase',
    fontWeight: 500
}

export const styles = {
    elementalEndFont,
    glassCard : {
        background: 'rgba(255, 255, 255, 0.35)',
        boxShadow: `inset 0px 3.00856px 6.01712px rgba(255, 255, 255, 0.4),
                    inset 0px -3.00856px 9.02569px rgba(255, 255, 255, 0.5),
                    inset 0px -1.50428px 20.0571px rgba(255, 255, 255, 0.24),
                    inset 0px 20.0571px 20.0571px rgba(255, 255, 255, 0.24),
                    inset 0px 1.00285px 20.5585px rgba(255, 255, 255, 0.8)`,
        backdropFilter: 'blur(10.0285px)',
        borderRadius: "40px",
        py: { xs:5, sm:10},
        px: { xs:3, sm:10}
    }
    
};
