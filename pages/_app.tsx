import {FC} from 'react';
import {Provider} from 'react-redux';

import store from '../store';

import 'antd/dist/antd.css';

const MyApp: FC<{Component: any; pageProps: any}> = ({
  Component,
  pageProps,
}) => (
  <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
);

export default MyApp;
