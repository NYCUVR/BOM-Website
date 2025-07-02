import MainLayout from './components/MainLayout';

function App() {
  return (
    <MainLayout>
      <div className="text-center">
        <h1 className="text-4xl font-bold text-brand-pink">
          核心內容區域
        </h1>
        <p className="mt-4">
          這裡是我們每個頁面獨特的內容。
        </p>
      </div>
    </MainLayout>
  );
}

export default App;
