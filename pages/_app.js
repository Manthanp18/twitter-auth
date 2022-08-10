import { Provider } from "next-auth/client";

import "../styles/globals.css";
import "react-responsive-modal/styles.css";
import "../styles/customAnimation.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
