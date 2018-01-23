type key = string | number;

interface NodeInterface {
  left?: NodeInterface;
  right?: NodeInterface;
  key: key;
}

interface BstInterface {
  insert(key: key): void;
  search(key: key): Boolean;
  min(): key;
  max(): key;
  remove(key: key): void;
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

class Bst implements BstInterface{
  root: BstNode;
  constructor() {

  }
  insert(key: key) {
    const newNode = new BstNode(key);
    if (!this.root) {
      // 如果根节点为空，就把新节点添加到根节点
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }
  private insertNode(node: BstNode, newNode: BstNode) {
    if (newNode.key > node.key) {
      // 如果新的键比当前节点的键要大，就查看右子节点
      if (!node.right) {
        // 如果右子节点为空，那就直接插入到右子节点
        node.right = newNode;
      } else {
        // 否则就递归地检查右子节点
        this.insertNode(node.right, newNode)
      }
    }
    if (newNode.key < node.key) {
      // 如果新的键比当前节点的键要小，就查看左子节点
      if (!node.left) {
        // 如果左子节点为空，那就直接插入到左子节点
        node.left = newNode;
      } else {
        // 否则就递归地检查左子节点
        this.insertNode(node.left, newNode)
      }
    }
  }
  search(key: key) {
    return true;
  }
  min() {
    return 1; 
  }
  max() {
    return 100;
  }
  remove(key: key) {
  }
}


const BstInstance = new Bst();

BstInstance.insert(1)
BstInstance.insert(3)
BstInstance.insert(2)
BstInstance.insert(4)

console.log(JSON.stringify(BstInstance))