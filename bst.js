function Node (data) {
    this.data = data;
    this.left = null;
    this.right = null;
}


const Tree = (arr) => {
    let root = buildTree(arr,false,0,arr.length); 
    return {root};
}


const buildTree = (arr,sorted,start,end) => {
    if(!sorted){
        arr.sort((a,b)=>a-b);
        uniq = [...new Set(arr)];
        end=uniq.length-1; // if I don't subract -1, the left side is grather than right side
    }
    else{
        uniq = arr; 
    }
    if(start>end){return null};
    let mid = Math.floor((start+end)/2);
    const root = new Node(uniq[mid]);

    root.left = buildTree(uniq,true,start,mid-1);
    root.right = buildTree(uniq,true,mid+1,end);

    return root; 
}


const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
      }
      console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
      if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
      }
}


const search = (root,data) => {
    if(root == null || root.data == data){return root}
    if(root.data < data){return search(root.right,data)}
    else{return search(root.left,data)}
}


const insertNode = (root,data) => {

    if(root == null){
        root = new Node(data);
        return root; 
    }

    if(data<root.data){root.left=insertNode(root.left,data)}
    else if(data>root.data){root.right=insertNode(root.right,data)}
    return root;

}


const deleteNode = (root,data) => {
    if(root==null){return root}
    if(data<root.data){root.left = deleteNode(root.left,data)}
    else if(data>root.data){root.right = deleteNode(root.right,data)}
    else{
        if(root.left == null) {
            return root.right;
        }
        else if(root.right == null){
            return root.left; 
        }
        root.data = minData(root.right);
        root.right = deleteNode(root.right,root.data);
    }
    return root; 
}


const minData = (root) => {
    let min = root.data;
        while(root.left != null){
            min = root.left.data;
            root = root.left;
        }
    return min;
}


const levelOrder = (root,func) => {
    if(root == null){return root}
    let queque = [];
    queque.push(root);
    while(queque.length!=0){
        let currentNode = queque.shift();
        func(currentNode);
        if(currentNode.left != null){queque.push(currentNode.left)}
        if(currentNode.right != null){queque.push(currentNode.right)}
    }
}


const  inorder = (root,func) => {
    if(root == null) return;
    inorder(root.left,func);
    func(root);
    inorder(root.right,func);
}


const preorder = (root,func) => {
    if(root == null) return; 
    func(root);
    preorder(root.left,func);
    preorder(root.right,func);
}


const postorder = (root,func) => {
    if(root == null) return;
    postorder(root.left,func);
    postorder(root.right,func);
    func(root);
}


const heigth = (node) => {
    let leftHeigth = 0;
    let rightHeigth = 0;

    if(node.left != null) {
        leftHeigth = heigth(node.left)+1;    
    }

    if(node.right != null){
        rightHeigth = heigth(node.right,rightHeigth+1)+1; 
    }

    return Math.max(leftHeigth,rightHeigth);
}


const depth = (root,targetNode) => {
    if(root == null){return root}
    let queque = [];
    queque.push({"node": root , "depth":0});
    while(queque.length!=0){
        let currentNode = queque.shift();
        if(currentNode.node == targetNode){return currentNode.depth};
        if(currentNode.node.left != null){
            queque.push({"node": currentNode.node.left,"depth": currentNode.depth +1});
        }
        if(currentNode.node.right != null){
            queque.push({"node":currentNode.node.right,"depth":currentNode.depth+1})};
    }
}


function isBalancedHeigth(node) {
    let leftHeigth = 0;
    let rightHeigth = 0;
    let isTreeBalanced = true;

    if (node.left != null) {
        let nodeHeigths = isBalancedHeigth(node.left);
        leftHeigth = Math.max(nodeHeigths.leftHeigth, nodeHeigths.rightHeigth) + 1;
        if(!nodeHeigths.isTreeBalanced){isTreeBalanced=false}
    }

    if (node.right != null) {
        let nodeHeigths = isBalancedHeigth(node.right);
        rightHeigth = Math.max(nodeHeigths.leftHeigth, nodeHeigths.rightHeigth) + 1;
        if(!nodeHeigths.isTreeBalanced){isTreeBalanced=false}
    }

    if (Math.abs(leftHeigth - rightHeigth) > 1) {
        isTreeBalanced = false;
    }

    return {leftHeigth, rightHeigth,isTreeBalanced};
}


const isBalanced = (node) => {
    return isBalancedHeigth(node).isTreeBalanced; 
}


const rebalance = (root) => {
    let arr = []; 
    levelOrder(root,node => arr.push(node.data));
    return Tree(arr);
}


const findLeaf = (root) => {
    if(root.left != null){findLeaf(root.left)}
    if(root.right != null){findLeaf(root.right)}
    return root; 
}

