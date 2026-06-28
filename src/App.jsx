import { RouterProvider } from 'react-router-dom';
import router from '@/core/routes/router';
import './index.css';

function App() {
  return <RouterProvider router={router} />;
}

export default App;