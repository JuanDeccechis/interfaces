import { createMuiTheme } from '@material-ui/core/styles';

const primaryColor = '#1D2533;'
const secondaryColor = '#8DC2DB';
const titlesColor = '#F2F2F2';
const white = '#F9F7F7';
  

const poppins = {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 400,
    src: `local('Poppins'), url('./fonts/Poppins-Regular.ttf') format('tff')`
};

const theme = createMuiTheme(
    {
    props: {
        MuiTypography: {
            variantMapping: {
                h1: 'h2',
                h2: 'h2',
                h3: 'h2',
                h4: 'h2',
                h5: 'h2',
                h6: 'h2',
                subtitle1: 'h2',
                subtitle2: 'h2',
                body1: 'p',
                body2: 'p',
            },
        },
    },
    typography: {
        fontFamily: 'Poppins, Arial',
        h1:{
            fontSize: 40,
            letterSpacing: 7,
            fontWeight: 700,
            color: secondaryColor
        },
        h2:{
            lineHeight: 35,
            textAlign: "center",
            textTransform: "capitalize",
            fontSize: 20,
            letterSpacing: 2,
            fontWeight: 500,
            color: titlesColor
        },
        h3:{
            fontSize: 18,
            letterSpacing: .75,
            fontWeight: 600,
            color: white
        },
        body1: {
            fontSize: 14,
            letterSpacing: 2,
            color: white
        },
        body2: {
            fontSize: 10,
            letterSpacing: .75,
            fontWeight: 600,
            color: white
        }
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                '@font-face': [poppins],
            }
        }
    },
});

export default theme;

