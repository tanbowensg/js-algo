type key = string | number;

interface NodeInterface {
  left?: NodeInterface;
  right?: NodeInterface;
  key: key;
}

interface BstInterface {
  insert(node: key): void;
  search(node: key): Boolean;
  min(): key;
  max(): key;
  remove(node: key): void;
}

class BstNode implements NodeInterface {
  left?: NodeInterface;
  right?: NodeInterface;
  key: key;
  constructor(key) {
     this.left = null;
     this.right = null;
     this.key = key;
  }
}
