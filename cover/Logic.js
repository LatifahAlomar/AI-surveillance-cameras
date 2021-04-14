function search(list){

  console.log( list);

  console.log(typeof list);
  list = list.split(',');
  for(i=0;i<list.length ; i++){
    if(list[i]=='null')
    list[i]=null;
  }
  var root = arrayToTree(list);
  console.log(cameraCover(root));

  var list2 = treeToArray(root);

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
  console.log( list);



  text = ' <ul>'
  +returnListFromTree(root)
       +'</ul>';
 
     document.getElementById("tree").innerHTML= text;
}


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


function returnList( array,index){
  var list="";
  var left="";
  var right="";
  if(array[index]==null)
  return list;
  else {
   list='<li><span class="tf-nc">'+array[index]+'</span>';
   if((2*index)+1 < array.length)
   left = returnList(array,(2*index)+1);

   if((2*index)+2 < array.length)
   right = returnList(array,(2*index)+2);

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
 
 function cameraCover(root) { // here is the logic
     
     const empty = 0;
     const leaf = 1;
     const covered = 2;
     const needCover = 3;
     const hascamera = 4;
     
     let cameras = 0;
     
     const check = node => { // recursive method to place cameras
         if(!node) return empty;
         if(!node.left && !node.right) return leaf;
         
         let left = check(node.left);
         let right = check(node.right);
         
         if(left == leaf || right == leaf || left == needCover ||
            right == needCover) {
              node.val = "c";
              cameras++;
             return hascamera;
         }
         
         if(left == hascamera || right == hascamera)  return covered;
         
         return needCover;
     }
     
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