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
  inOrderTraverse(cb: (key: key) => void) : void;
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
    return this.searchNode(this.root, key);
  }
  private searchNode(node: BstNode, key: key) {
    // 如果节点的键和要查找的键相等，就返回 true
    if (node.key === key) {
      return true;
    }
    if (key > node.key) {
      // 如果要查找的键大于当前节点的键，并且当前节点有右子节点，就查看右子节点
      if (node.right) return this.searchNode(node.right, key);
      // 否则就说明二叉树中没有这个键
      if (!node.right) return false;
    }
    if (key < node.key) {
      // 如果要查找的键小于当前节点的键，并且当前节点有左子节点，就查看左子节点
      if (node.left) return this.searchNode(node.left, key);
      // 否则就说明二叉树中没有这个键
      if (!node.left) return false;
    }
  }
  min(): key {
    return this.minNode(this.root).key;
  }
  private minNode(node: BstNode): BstNode {
    if (node.left) return this.minNode(node.left);
    else return node;
  }
  max(): key {
    return this.maxNode(this.root).key;
  }
  private maxNode(node: BstNode): BstNode {
    if (node.right) return this.maxNode(node.right);
    else return node;
  }
  remove(key: key) {
  }
  // 从小到大按顺序遍历
  inOrderTraverse(cb: (key: key) => void) {
    this.inOrderTraverseNode(this.root, cb);
  }
  private inOrderTraverseNode(node: BstNode, cb: (key: key) => void) {
    if (node) {
      this.inOrderTraverseNode(node.left, cb);
      cb(node.key);
      this.inOrderTraverseNode(node.right, cb);
    }
  }
}


const BstInstance = new Bst();

BstInstance.insert(6)
BstInstance.insert(3)
BstInstance.insert(1)
BstInstance.insert(5)
BstInstance.insert(9)
BstInstance.insert(7)
BstInstance.insert(10)
BstInstance.insert(0)

console.log(JSON.stringify(BstInstance))
console.log(BstInstance.search(1)) // true
console.log(BstInstance.search(2)) // false
console.log(BstInstance.search(5)) // true
console.log(BstInstance.search(8)) // false
console.log(BstInstance.search(9)) // true

console.log('最小值是 ', BstInstance.min())
console.log('最大值是 ', BstInstance.max())

BstInstance.inOrderTraverse(key => {
  console.log('中序遍历', key);
})