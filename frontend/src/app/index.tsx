import type { AppProps } from 'next/app';

import Provider from './providers';

const App = ({ Component, pageProps }: AppProps) => (
    <Provider>
        <Component {...pageProps} />
    </Provider>
);

export default App;
