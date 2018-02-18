type keyType = string | number;

interface NodeInterface {
  left: NodeInterfaceOrNull;
  right: NodeInterfaceOrNull;
  key: keyType;
}

type NodeInterfaceOrBoolean = NodeInterface | boolean;
type NodeInterfaceOrNull = NodeInterface | null;

interface BstInterface {
  insert(key: keyType): void;
  search(key: keyType): Boolean;
  min(): keyType;
  max(): keyType;
  remove(key: keyType): void;
  inOrderTraverse(cb: (key: keyType) => void): void;
  preOrderTraverse(cb: (key: keyType) => void): void;
  postOrderTraverse(cb: (key: keyType) => void): void;
}

class BstNode implements NodeInterface {
  left: NodeInterfaceOrNull;
  right: NodeInterfaceOrNull;
  key: keyType;
  constructor(key: keyType) {
    this.left = null;
    this.right = null;
    this.key = key;
  }
}

class Bst implements BstInterface {
  root: BstNode;
  insert(key: keyType) {
    const newNode = new BstNode(key);
    if (!this.root) {
      // 如果根节点为空，就把新节点添加到根节点
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }
  private insertNode(node: NodeInterface, newNode: NodeInterface) {
    if (newNode.key > node.key) {
      // 如果新的键比当前节点的键要大，就查看右子节点
      if (!node.right) {
        // 如果右子节点为空，那就直接插入到右子节点
        node.right = newNode;
      } else {
        // 否则就递归地检查右子节点
        this.insertNode(node.right, newNode);
      }
    }
    if (newNode.key < node.key) {
      // 如果新的键比当前节点的键要小，就查看左子节点
      if (!node.left) {
        // 如果左子节点为空，那就直接插入到左子节点
        node.left = newNode;
      } else {
        // 否则就递归地检查左子节点
        this.insertNode(node.left, newNode);
      }
    }
  }
  search(key: keyType) {
    return !!this.searchNode(this.root, key);
  }
  private searchNode(node: NodeInterface, key: keyType): NodeInterfaceOrBoolean {
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
    return false;
  }
  min(): keyType {
    return this.minNode(this.root).key;
  }
  private minNode(node: NodeInterface): NodeInterface {
    if (node.left) return this.minNode(node.left);
    else return node;
  }
  max(): keyType {
    return this.maxNode(this.root).key;
  }
  private maxNode(node: NodeInterface): NodeInterface {
    if (node.right) return this.maxNode(node.right);
    else return node;
  }
  remove(key: keyType) {
    this.removeNode(this.root, key);
  }
  removeNode(node: NodeInterfaceOrNull, key: keyType): NodeInterfaceOrNull {
    if (!node) {
      return null;
    }
    if (key > node.key) {
      node.right = this.removeNode(node.right, key);
    }
    if (key < node.key) {
      node.left = this.removeNode(node.left, key);
    }
    if (key === node.key) {
      // 找到了要删除的节点，接下来每一步本质上是替换操作。删除就是用 null 替换节点。
      if (!node.left && !node.right) {
        // 如果要删除的节点没有子节点，就直接把他父节点的子节点删除
        return null;
      } 
      // 如果要删除的节点只有右节点，就用右节点替代这个节点
      else if (!node.left) return node.right;
      // 如果要删除的节点只有左节点，就用左节点替代这个节点
      else if (!node.right) return node.right;
      else {
        // 如果要删除的节点有两个节点，就找出右节点树中的最小节点。
        // 然后用最小节点，替代这个节点。
        // 最后删除一开始的最小节点。
        const minNode = this.minNode(node);
        node.key = minNode.key;
        node.right = this.removeNode(node.right, minNode.key);
        return node;
      }
    }
    return null;
  }
  // 从小到大按顺序遍历
  inOrderTraverse(cb: (key: keyType) => void) {
    this.inOrderTraverseNode(this.root, cb);
  }
  private inOrderTraverseNode(node: NodeInterfaceOrNull, cb: (key: keyType) => void) {
    if (node) {
      this.inOrderTraverseNode(node.left, cb);
      cb(node.key);
      this.inOrderTraverseNode(node.right, cb);
    }
  }
  preOrderTraverse(cb: (key: keyType) => void) {
    this.preOrderTraverseNode(this.root, cb);
  }
  private preOrderTraverseNode(node: NodeInterfaceOrNull, cb: (key: keyType) => void) {
    if (node) {
      cb(node.key);
      this.preOrderTraverseNode(node.left, cb);
      this.preOrderTraverseNode(node.right, cb);
    }
  }
  postOrderTraverse(cb: (key: keyType) => void) {
    this.postOrderTraverseNode(this.root, cb);
  }
  private postOrderTraverseNode(node: NodeInterfaceOrNull, cb: (key: keyType) => void) {
    if (node) {
      this.postOrderTraverseNode(node.left, cb);
      this.postOrderTraverseNode(node.right, cb);
      cb(node.key);
    }
  }
  treeHeight(): number {
    return this.nodeHeight(this.root);
  }
  // 计算一个节点的高度，如果一个节点没有任何子元素，就算 -1
  nodeHeight(node: NodeInterfaceOrNull): number {
    if (node === null) {
      return -1;
    } else {
      const leftHeight = this.nodeHeight(node ? node.left : node);
      const rightHeight = this.nodeHeight(node ? node.right : node);
      return Math.max(leftHeight, rightHeight) + 1;
    }
  }
}

const BstInstance = new Bst();

BstInstance.insert(6);
BstInstance.insert(3);
BstInstance.insert(1);
BstInstance.insert(5);
BstInstance.insert(9);
BstInstance.insert(7);
BstInstance.insert(10);
BstInstance.insert(0);

console.log('这棵树的高度是', BstInstance.treeHeight());

console.log(BstInstance.search(1)); // true
console.log(BstInstance.search(2)); // false
console.log(BstInstance.search(5)); // true
console.log(BstInstance.search(8)); // false
console.log(BstInstance.search(9)); // true

console.log('最小值是 ', BstInstance.min());
console.log('最大值是 ', BstInstance.max());

BstInstance.inOrderTraverse(key => {
  console.log('中序遍历', key);
});
BstInstance.preOrderTraverse(key => {
  console.log('先序遍历', key);
});
BstInstance.postOrderTraverse(key => {
  console.log('后序遍历', key);
});

console.log('删除了 6');
console.log('6 还存在吗？', BstInstance.search(5));
console.log('删除了 3');
console.log('3 还存在吗？', BstInstance.search(5));
console.log('删除了 1');
BstInstance.remove(1);
console.log('1 还存在吗？', BstInstance.search(5));
console.log('删除了 5');
BstInstance.remove(5);
console.log('5 还存在吗？', BstInstance.search(5));
console.log('删除了 10');
BstInstance.remove(10);
console.log('10 还存在吗？', BstInstance.search(5));
console.log('删除了 0');
BstInstance.remove(0);
console.log('0 还存在吗？', BstInstance.search(5));
console.log('9 还存在吗？', BstInstance.search(5));
console.log('7 还存在吗？', BstInstance.search(5));

export default Bst;
