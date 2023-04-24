import { ConfigProvider } from 'antd'
import 'antd/dist/reset.css';

import './App.css'
import Home from './container/Home';

function App() {
  return (
    <ConfigProvider 
      theme={{
        token: {
          colorPrimary: '#00b96b',
        },
      }} 
    >
      <Home />
    </ConfigProvider>
  )
}

export default App;
