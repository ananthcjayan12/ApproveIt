import { Route, Routes } from 'react-router-dom';
import { BoardViewPage } from './pages/BoardViewPage';
import { ItemViewPage } from './pages/ItemViewPage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<ItemViewPage />} />
      <Route path="/item" element={<ItemViewPage />} />
      <Route path="/board" element={<BoardViewPage />} />
    </Routes>
  );
}
