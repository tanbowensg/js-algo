import * as React from 'react';
import './bst-node.css';

class BstNode extends React.Component {
  props: {
    value: number | string;
  };
  render() {
    return (
      <div className="bst-node">
        {this.props.value}
      </div>
    );
  }
}

export default BstNode;
