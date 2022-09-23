import { createMuiTheme } from "@material-ui/core";

export default createMuiTheme({
    palette: {
        primary: {
            main: "#127c71",
        },
        secondary: {
            main: "#fff",
        },
    },
    typography: {
        fontFamily: ["Manrope", "sans-serif"].join(","),
        h6: {
            fontSize: 14,
        },
        h5: {
            fontWeight: "bold",
        }
    }
});
