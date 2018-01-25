import * as React from 'react';
import BstNode from './bst-node/bst-node';
import BstClass from '../../algo/tree/bst';

class Bst extends React.Component {
  bst: BstClass;
  state: {
    bstKeys: number[];
  };
  constructor(props: Object) {
    super(props);
    this.state = {
      bstKeys: [],
    };
  }
  componentWillMount() {
    const bstKeys: number[] = [];
    this.bst = new BstClass();
    this.bst.insert(12);
    this.bst.insert(5);
    this.bst.insert(88);
    this.bst.insert(65);
    this.bst.insert(24);
    this.bst.insert(65);
    this.bst.insert(23);
    this.bst.insert(87);
    this.bst.insert(38);

    this.bst.inOrderTraverse((key: number) => {
      bstKeys.push(key);
    });

    this.setState({
      bstKeys,
    });
  }

  render() {
    const nodes = this.state.bstKeys.map(key => <BstNode key={key} value={key}/>);
    return (
      <div>
        {nodes}
      </div>
    );
  }
}

export default Bst;
