import './index.css';

import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
  <div>
    <h1>Hello World!</h1>
  </div>
);