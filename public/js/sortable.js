// Table Sorter v2.5; Apache 2; http://neil.fraser.name/software/tablesort/
var TableSort={};TableSort.enabled=true;TableSort.arrowUp=' &#x25b2;';TableSort.arrowDown=' &#x25bc;';TableSort.arrowNone=' &nbsp;';TableSort.titleText='Sort by this column';TableSort.tables_=[];TableSort.lastSort_=[];TableSort.initAll=function(){if(!TableSort.enabled){return}var tableNodeList=document.getElementsByTagName('TABLE');for(var x=0,table;table=tableNodeList[x];x++){TableSort.initTable_(table)}};TableSort.init=function(var_args){if(!TableSort.enabled){return}for(var x=0;x<arguments.length;x++){var table=document.getElementById(arguments[x]);if(table){TableSort.initTable_(table)}}};TableSort.initTable_=function(table){TableSort.tables_.push(table);var t=TableSort.tables_.length-1;if(table.tHead){for(var y=0,row;row=table.tHead.rows[y];y++){for(var x=0,cell;cell=row.cells[x];x++){TableSort.linkCell_(cell,t,x)}}}if(table.tFoot){for(var y=0,row;row=table.tFoot.rows[y];y++){for(var x=0,cell;cell=row.cells[x];x++){TableSort.linkCell_(cell,t,x)}}}TableSort.lastSort_[t]=0};TableSort.linkCell_=function(cell,t,x){if(TableSort.getClass_(cell)){var link=document.createElement('A');link.href='javascript:TableSort.click('+t+', '+x+', "'+escape(TableSort.getClass_(cell))+'");';if(TableSort.titleText){link.title=TableSort.titleText}while(cell.hasChildNodes()){link.appendChild(cell.firstChild)}cell.appendChild(link);var arrow=document.createElement('SPAN');arrow.innerHTML=TableSort.arrowNone;arrow.className='TableSort_'+t+'_'+x;cell.appendChild(arrow)}};TableSort.getClass_=function(cell){var className=(cell.className||'').toLowerCase();var classList=className.split(/\s+/g);for(var x=0;x<classList.length;x++){if(('compare_'+classList[x])in TableSort){return classList[x]}}return''};TableSort.click=function(t,column,mode){var table=TableSort.tables_[t];if(!mode.match(/^[_a-z0-9]+$/)){alert('Illegal sorting mode type.');return}var compareFunction=TableSort['compare_'+mode];if(typeof compareFunction!='function'){alert('Unknown sorting mode: '+mode);return}var reverse=false;if(Math.abs(TableSort.lastSort_[t])==column+1){reverse=TableSort.lastSort_[t]>0;TableSort.lastSort_[t]*=-1}else{TableSort.lastSort_[t]=column+1}var spanMatchAll=new RegExp('\\bTableSort_'+t+'_\\d+\\b');var spanMatchExact=new RegExp('\\bTableSort_'+t+'_'+column+'\\b');var spans=table.getElementsByTagName('SPAN');for(var s=0,span;span=spans[s];s++){if(span.className&&spanMatchAll.test(span.className)){if(spanMatchExact.test(span.className)){if(reverse){span.innerHTML=TableSort.arrowDown}else{span.innerHTML=TableSort.arrowUp}}else{span.innerHTML=TableSort.arrowNone}}}if(!table.tBodies.length){return}var tablebody=table.tBodies[0];var cellDictionary=[];for(var y=0,row;row=tablebody.rows[y];y++){var cell;if(row.cells.length){cell=row.cells[column]}else{cell=row.childNodes[column]}cellDictionary[y]=[TableSort.dom2txt_(cell),row]}cellDictionary.sort(compareFunction);for(y=0;y<cellDictionary.length;y++){var i=reverse?(cellDictionary.length-1-y):y;tablebody.appendChild(cellDictionary[i][1])}};TableSort.dom2txt_=function(obj){if(!obj){return''}if(obj.nodeType==3){return obj.data}var textList=[];for(var x=0,child;child=obj.childNodes[x];x++){textList[x]=TableSort.dom2txt_(child)}return textList.join('')};TableSort['compare_case']=function(a,b){if(a[0]==b[0]){return 0}return(a[0]>b[0])?1:-1};TableSort['compare_nocase']=function(a,b){var aLower=a[0].toLowerCase();var bLower=b[0].toLowerCase();if(aLower==bLower){return 0}return(aLower>bLower)?1:-1};TableSort['compare_num']=function(a,b){var aNum=parseFloat(a[0]);if(isNaN(aNum)){aNum=-Number.MAX_VALUE}var bNum=parseFloat(b[0]);if(isNaN(bNum)){bNum=-Number.MAX_VALUE}if(aNum==bNum){return 0}return(aNum>bNum)?1:-1};if(window.addEventListener){window.addEventListener('load',TableSort.initAll,false)}else if(window.attachEvent){window.attachEvent('onload',TableSort.initAll)}if(navigator.appName=='Microsoft Internet Explorer'&&navigator.platform.indexOf('Mac')==0){TableSort.enabled=false}