module.exports = function check(str, bracketsConfig) {
    // brackets open/close types    
    let brackets = {};    
    for(let b of bracketsConfig)
    {
      brackets[b[0]]=b[1];   
    } 

    let equal = 3; // start identifier of equal open/close brackets
    
    if(str.length%2 !=0 ) return false;
    strArr = str.split('');
    let bracketsType = [];
    for(let i=0;i<strArr.length;i++){
     bracketsType[i] = (strArr[i] in brackets)? 0 : 1; // all different open/close brackets 0-open, 1-close
    } 
    // mark other equal open/close brackets for each next type identifier increased   
    for(let b in brackets){
      if(b== brackets[b]){
        for(let i=0;i<strArr.length;i++){
          if (b==strArr[i]) bracketsType[i] = equal;
        }
        equal++;
      }
    }
    // assume that equal open/close brackets have higher priority 
    // check them sequentially 
    for(b of bracketsType){
      if(b<3) continue;
      let equalOpenInd = bracketsType.indexOf(b);
      bracketsType[equalOpenInd] = 2;
      let equalCloseInd = bracketsType.indexOf(b);      
      bracketsType[equalCloseInd] = 2;
      if(!checkBrackets(bracketsType.slice(equalOpenInd,equalCloseInd+1),
                        strArr.slice(equalOpenInd,equalCloseInd+1), brackets)) return false;    
      
    }
    return checkBrackets(bracketsType, strArr, brackets);
}

function checkBrackets(bracketsType, strArr, brackets)
{
    if(bracketsType.length%2 !=0) return false;     // should be equal quantity of open and close brackets
    let openInd =  bracketsType.lastIndexOf(0);    
    let closeInd = bracketsType.indexOf(1);
    // if there is open bracket than should be the close and vice versa 
    // equal open/close brackets not taken into account
    if((openInd<0 && closeInd>=0) || (openInd>=0 && closeInd<0)) return false;
    // find last open and first close bracket and check if they are of the same type
    // if true mark them and find next pair
    // if false return false
    while(openInd>=0){      
      let nextInd = findIndex(bracketsType.slice(openInd+1));
      if (nextInd<0) return false;
      closeInd = openInd + nextInd + 1;      
      if (strArr[closeInd]!=brackets[strArr[openInd]]) return false;
      bracketsType[openInd] = 2;
      bracketsType[closeInd] = 2;      
      openInd =  bracketsType.lastIndexOf(0);
    }
     return true;
}

// find index of the first close bracket after the given open bracket
// and check if there are even number of brackets between them
function findIndex(arr)
{
  let counter = 0;
  for(let i=0; i<arr.length;i++)
  {
    if (arr[i]>2) counter ++;
    if(arr[i]<2 && counter%2 ==0) return i;    
  }
  return -1;
}
