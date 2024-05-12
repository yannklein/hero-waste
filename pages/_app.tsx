import { AppProps } from "next/app";
// fontawesome setup
import { config } from '@fortawesome/fontawesome-svg-core'
import "../styles/globals.css"
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Component {...pageProps} />
  );
};

export default App;
