import React from 'react';
import ReactDOM from 'react-dom';
import { DeviceThemeProvider } from '@sberdevices/plasma-ui/components/Device'; // Типографика, имеющая размеры, зависимые от типа устройства
import { GlobalStyle } from './GlobalStyles'; // Тема оформления (цветовая схема)
import App from './App';

ReactDOM.render(
    <DeviceThemeProvider>
        <GlobalStyle />
        <App />
    </DeviceThemeProvider>,
    document.getElementById('root'),
);