import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import TrelloContext from './context/TrelloContext';
import './index.css';
import reportWebVitals from './reportWebVitals';

TimeAgo.addDefaultLocale(en)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <TrelloContext>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </TrelloContext>
  </BrowserRouter>
);

reportWebVitals();
