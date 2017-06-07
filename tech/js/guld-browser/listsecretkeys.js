const electron = require('electron')
const ipc = electron.ipcRenderer
  
  function displayData()
{
	var data=['Apple', 'Banana', 'Kiwi'];
	var output="";
	var dataList;
	
	for(var i=0; i< data.length; i++)
	{
		dataList=data[i];
		output+= '<input type="radio" value='+dataList+' name="box2">'  + '   ' + dataList+'   '+'<br><br>';
		document.getElementById("dataList").innerHTML=output;
		
	}
}

ipc.on('dom-ready',()=>{
    console.log('in dom-ready')

    var data=['Apple', 'Banana', 'Kiwi'];
	var output="";
	var dataList;
	
	for(var i=0; i< data.length; i++)
	{
		dataList=data[i];
		output+= '<input type="radio" value='+dataList+' name="box2">'  + '   ' + dataList+'   '+'<br><br>';
		document.getElementById("dataList").innerHTML=output;
		
	}
    //document.getElementById('count').innerHTML=count
})
