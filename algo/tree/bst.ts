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
  preOrderTraverse(cb: (key: key) => void) : void;
  postOrderTraverse(cb: (key: key) => void) : void;
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
    this.removeNode(null, this.root, key);
  }
  removeNode(parent: BstNode, node: BstNode, key): BstNode {
    if (!node) {
      return null;
    }
    if (key > node.key) {
      this.removeNode(node, node.right, key);
    }
    if (key < node.key) {
      this.removeNode(node, node.left, key);
    }
    if (key === node.key) {
      // 找到了要删除的节点
      if (!node.left && !node.right) {
        // 如果要删除的节点没有子节点，就直接把他父节点的子节点删除
        if (parent.left === node) parent.left = null;
        if (parent.right === node) parent.right = null;
      } 
      else if (!node.left) {
        // 如果要删除的节点只有右节点，就用右节点替代这个节点
        if (parent.left === node) parent.left = node.right;
        if (parent.right === node) parent.right = node.right;
      }
      else if (!node.right) {
        // 如果要删除的节点只有左节点，就用左节点替代这个节点
        if (parent.left === node) parent.left = node.left;
        if (parent.right === node) parent.right = node.left;
      }
      else {
        // 如果要删除的节点有两个节点，就找出右节点树中的最小节点。
        // 然后用最小节点，替代这个节点。
        // 最后删除一开始的最小节点。
        const minNode = this.minNode(node);
        this.remove(minNode.key);
        node.key = minNode.key;
      }
    }
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
  preOrderTraverse(cb: (key: key) => void) {
    this.preOrderTraverseNode(this.root, cb);
  }
  private preOrderTraverseNode(node: BstNode, cb: (key: key) => void) {
    if (node) {
      cb(node.key);
      this.preOrderTraverseNode(node.left, cb);
      this.preOrderTraverseNode(node.right, cb);
    }
  }
  postOrderTraverse(cb: (key: key) => void) {
    this.postOrderTraverseNode(this.root, cb);
  }
  private postOrderTraverseNode(node: BstNode, cb: (key: key) => void) {
    if (node) {
      this.postOrderTraverseNode(node.left, cb);
      this.postOrderTraverseNode(node.right, cb);
      cb(node.key);
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
BstInstance.preOrderTraverse(key => {
  console.log('先序遍历', key);
})
BstInstance.postOrderTraverse(key => {
  console.log('后序遍历', key);
})

console.log('删除了 6')
console.log('6 还存在吗？', BstInstance.search(6))
console.log('删除了 3')
console.log('3 还存在吗？', BstInstance.search(3))
console.log('删除了 1')
BstInstance.remove(1);
console.log('1 还存在吗？', BstInstance.search(1))
console.log('删除了 5')
BstInstance.remove(5);
console.log('5 还存在吗？', BstInstance.search(5))
console.log('删除了 10')
BstInstance.remove(10);
console.log('10 还存在吗？', BstInstance.search(10))
console.log('删除了 0')
BstInstance.remove(0);
console.log('0 还存在吗？', BstInstance.search(0))
console.log('9 还存在吗？', BstInstance.search(9))
console.log('7 还存在吗？', BstInstance.search(7))