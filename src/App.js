import React from 'react';
import Layout from './hoc/Layout'

function App() {
  return (
    <Layout>
      <div style={{border: '1px solid black', width: '400px'}}>
        <h1>Layout works!</h1>
      </div>
    </Layout>
  );
}

export default App;
