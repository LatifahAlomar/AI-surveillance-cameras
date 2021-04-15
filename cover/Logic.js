//take the list and perform dfs then return the tree with cameras
function search(list){

  //convert list from string to array
  list = list.split(',');
  for(i=0;i<list.length ; i++){
    if(list[i]=='null')
    list[i]=null;
  }

  //convert from array to tree then search 
  var root = arrayToTree(list);
  //convert from tree to array
  var list2 = treeToArray(root);

  //to show in html
  document.getElementById("info").innerHTML= '<div class="col"><h1>'+cameraCover(root)+'</h1></div>'+
  '<div class="col"><h1>'+list2.length+'</h1></div>'+
  '<div class="w-100"></div>'+
  '<div class="col">cameras</div>'+
  '<div class="col">generated nodes</div><br><br>';
  for (var i=0, j=0; i<list.length; i++){
    if (list[i] != null){
       list[i] = list2[j++];
    }
  }
  text = ' <ul>'
  +returnListFromTree(root)
       +'</ul>';
  document.getElementById("tree").innerHTML= text;
}

//tree representation for html page
function returnListFromTree(node){
  var list="";
  var left="";
  var right="";
  if(node==null)
  return "";
  else {
   list='<li><span class="tf-nc">'+node.val+'</span>';
   
   left = returnListFromTree(node.left);
   right = returnListFromTree(node.right);

   if(left != "" || right != "")
   list +='<ul>' +left+right+'</ul>';

   list +='</li>';
  }
  return list;
}



 
 // Ref: https://stackoverflow.com/questions/37941318/how-to-build-an-incomplete-binary-tree-from-array-representation
 function arrayToTree(list){
   if (list == null || list.length == 0)
     return null;
   var treeNodeQueue = new Queue();
   var integerQueue = new Queue();
   for (var i = 1; i < list.length; i++){
     integerQueue.enqueue(list[i]);
   }
   
   var root = new TreeNode(list[0]);
   treeNodeQueue.enqueue(root);
   console.log(treeNodeQueue);
   while (!integerQueue.isEmpty()){
     var leftVal = integerQueue.isEmpty()? null : integerQueue.dequeue();
     var rightVal = integerQueue.isEmpty()? null : integerQueue.dequeue();
     var current = treeNodeQueue.dequeue();
     if (leftVal != null){
       var left = new TreeNode (leftVal);
       current.left = left;
       treeNodeQueue.enqueue(left);
     }
     if (rightVal != null){
       var right = new TreeNode (rightVal);
       current.right = right;
       treeNodeQueue.enqueue(right);
     }
   }
   return root;
 }
 // Ref: https://www.geeksforgeeks.org/level-order-tree-traversal/
 function treeToArray(root){
  var array = [];
  var list = new Queue();
  list.enqueue(root);
  var i = 0;
  while(!list.isEmpty()){
    var temp = list.dequeue();
    array[i++] = temp.val;
    if (temp.left != null)
      list.enqueue(temp.left);
    if (temp.right != null)
      list.enqueue(temp.right);
  }
  return array;
 }
 //REF:https://medium.com/@gokul.jai.soften
 ///binary-tree-cameras-leetcode-solve-using-depth-first-search-recursive-method-dfd59683e49
 function cameraCover(root) { // here is the logic
     
     const empty = 0; // null refrence of node 
     const leaf = 1;
     const covered = 2;
     const needCover = 3;
     const hascamera = 4;
     
     let cameras = 0;
     
     const check = node => { // recursive method to place cameras
         if(!node) return empty; // if there is no node == null 
         if(!node.left && !node.right) return leaf; // if there is no children then it is leaf 
         
		 // recursive call
         let left = check(node.left);
         let right = check(node.right);
         
		 //if left child and right child are leafs or asking for cover 
		 //in this case, we install a camera and update the status to hascamera 
         if(left == leaf || right == leaf || left == needCover ||
            right == needCover) {
              node.val = "c";
              cameras++;
             return hascamera;
         }
         
		// if the node is already covered	
         if(left == hascamera || right == hascamera)  return covered;
         
		 //if none of the previous condition applied, then this node needs to be covered 
         return needCover;
     }
     
	 //root check, if it is needs to cover or if it is a leaf 
     let rootstate = check(root);
     if(rootstate == needCover || rootstate == leaf) {
        root.val = "c";
        cameras++;
     }
     return cameras;
 };
 
 // Definition of a binary tree node.
   function TreeNode(val, left, right) {
       this.val = (val===undefined ? 0 : val)
       this.left = (left===undefined ? null : left)
       this.right = (right===undefined ? null : right)
   }
 
   // Ref: https://www.javascripttutorial.net/javascript-queue/
   function Queue() {
      this.elements = [];
   }

   Queue.prototype.enqueue = function (e) {
      this.elements.push(e);
   };

   Queue.prototype.dequeue = function () {
      return this.elements.shift();
  };

  Queue.prototype.isEmpty = function () {
   return this.elements.length == 0;
};