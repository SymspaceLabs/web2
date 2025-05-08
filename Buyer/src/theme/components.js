// ===================================================================
// Global Style For
// - MUI Button
// - MUI Typography
// - MUI Textfield
// - MUI MenuItem
// - MUI Tab
// ===================================================================

import { elementalEnd } from "@/app/layout";
import { dark, grey, primary, secondary, success } from "./theme-colors";
import { classes } from "./utils";

// ===================================================================

export const components = {
  MuiCssBaseline: {
    styleOverrides: {
      "*": {
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        scrollBehavior: "smooth"
      },
      html: {
        scrollBehavior: "smooth"
      },
      p: {
        lineHeight: 1.75
      },
      button: {
        fontSize: 14,
      },
      ".MuiRating-sizeSmall": {
        fontSize: "20px"
      },
      a: {
        color: "inherit",
        textDecoration: "none"
      },
      ul: {
        margin: 0,
        padding: 0,
        listStyle: "none"
      },
      ".bg-white": {
        backgroundColor: "white"
      },
      ...classes()
    }
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        zIndex: 0
      }
    }
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        borderRadius: 8
      }
    }
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: "8px"
      }
    }
  },
  MuiPagination: {
    defaultProps: {
      variant: "outlined",
      color: "primary"
    }
  },
  MuiMenuItem: {
    styleOverrides: {
      root: {
        paddingTop: 8,
        paddingBottom: 8,
        fontFamily: `${elementalEnd.style.fontFamily}, sans-serif`,
        textTransform: 'lowercase'
      }
    }
  },
  MuiTab: {
    styleOverrides: {
      root: {
        fontFamily: `${elementalEnd.style.fontFamily}, sans-serif`,
        textTransform: 'lowercase'
      }
    }
  },
  MuiSvgIcon: {
    styleOverrides: {
      root: {
        "& .secondary": {
          opacity: 0.4
        }
      }
    }
  },
  MuiTextField: {
    defaultProps: {
      size: "small",
      variant: "outlined"
    },
    styleOverrides: {
      root: ({
        ownerState
      }) => ({ ...(ownerState.color === "info" && {
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            fontWeight: 600
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: grey[300]
          }
        })
      })
    }
  },
          
  // MUI BUTTON
  // THIS IS WHERE THE FONT STYLE OF MUI BUTTON IS CONFIGURED
  MuiButton: {
    styleOverrides: {
      root: ({
        ownerState
      }) => ({
        minWidth: 0,
        minHeight: 0,
        fontWeight: 500,
        borderRadius: "6px",
        textTransform: "lowercase",
        fontFamily: `${elementalEnd.style.fontFamily}, sans-serif`,
        ...(ownerState.color === "info" && {
          borderRadius: "8px"
        }),
        ...(ownerState.color === "dark" && {
          color: "#fff",
          borderRadius: 0,
          transition: "all 0.3s",
          ":hover": {
            backgroundColor: "#343434"
          }
        }),
        ...(ownerState.color === "dark" && ownerState.variant === "outlined" && {
          color: dark.main,
          borderRadius: "3px",
          transition: "all 0.3s",
          ":hover": {
            backgroundColor: dark.main,
            color: "white"
          }
        }),
        ...(ownerState.color === "orange" && {
          color: "white",
          borderRadius: "8px"
        })
      }),
      sizeLarge: {
        padding: ".6rem 2.5rem"
      }
    },
    defaultProps: {
      color: "inherit"
    }
  },
  MuiChip: {
    defaultProps: {
      color: "primary"
    },
    styleOverrides: {
      labelSmall: {
        paddingInline: 12
      },
      colorSuccess: {
        color: success.main,
        backgroundColor: success[100]
      },
      colorPrimary: {
        color: primary[500],
        backgroundColor: primary[100]
      },
      colorSecondary: {
        color: secondary[500],
        backgroundColor: secondary[100]
      }
    }
  },
  MuiContainer: {
    defaultProps: {
      maxWidth: 'lg'
    }
  }
};