import * as React from 'react';
import BstNode from './components/bst/bst-node/bst-node';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <BstNode />
        <BstNode />
        <BstNode />
      </div>
    );
  }
}

export default App;
