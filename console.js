/******************************
JavaScript Toolkit              

version 1.0
5/8/2006

author: Andrew Trice
		triceam@gmail.com
		http://www.tricedesigns.com

I encourage the use, enhancement and distribution of this javascript library.
On the honor system, please keep my name and contact information in this file.  :)
Soon enough, it will be open source on sourceforge.net under the LGPL license.  
I have registered it as a project with sourceforge.net, but I'm still waiting for it to be approved.
		
******************************/
 
 
/******************************/
/* GLOBALS                    */
/******************************/

var cmd_default_width = "100%";
var cmd_default_height = "300";
var cmd_default_forecolor = "green";
var cmd_default_backcolor = "black";
var cmd_default_bordercolor = "green";

var toolkit_encodeRegExps = new Array();
toolkit_encodeRegExps.push([/>/, '&gt;']);
toolkit_encodeRegExps.push([/</, '&lt;']);
toolkit_encodeRegExps.push([/\n/, '<br />']);


var vw_instances = new Array();
var vw_sleepInterval = 500;
var vw_renderTimeout = null;





/******************************/
/* TOOLKIT FUNCTIONS          */
/******************************/

function toolkit_HTMLEncode(param_inputString){
	
	for(x=0;x<toolkit_encodeRegExps.length;x++){
		param_inputString = param_inputString.replace(toolkit_encodeRegExps[x][0], toolkit_encodeRegExps[x][1]);
	}
	return 	param_inputString;
}

function toolkit_getUniqueName(){
    return "toolkit-" + Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000) + "-";
}
 
 
 
 
 

/**********************************/
/* COMMAND PROMPT  / COMMAND AREA */
/**********************************/

//CONSTRUCTOR
function CommandPrompt (){ 
    var width       = (arguments[0] ? arguments[0] : cmd_default_width);
    var height      = (arguments[1] ? arguments[1] : cmd_default_height);
    var forecolor   = (arguments[2] ? arguments[2] : cmd_default_forecolor);
    var backcolor   = (arguments[3] ? arguments[3] : cmd_default_backcolor);
    var bordercolor = (arguments[4] ? arguments[4] : cmd_default_bordercolor);
    
    
    var uniqueName = toolkit_getUniqueName();
    var HTML =  "<input type='text' name='" + uniqueName + "cmdText' id='" + uniqueName + "cmdText' onkeypress=\"cmd_handleKeyPress('"+uniqueName+"', event.keyCode)\" />";
        
    var object_HTML = cmd_renderHTMLCmdObject(uniqueName, HTML, width, height, forecolor, backcolor, bordercolor);
	document.write(object_HTML);
}

//CONSTRUCTOR
function CommandArea (){
    var width       = (arguments[0] ? arguments[0] : cmd_default_width);
    var height      = (arguments[1] ? arguments[1] : cmd_default_height);
    var forecolor   = (arguments[2] ? arguments[2] : cmd_default_forecolor);
    var backcolor   = (arguments[3] ? arguments[3] : cmd_default_backcolor);
    var bordercolor = (arguments[4] ? arguments[4] : cmd_default_bordercolor);
    
    var uniqueName = toolkit_getUniqueName();
    var HTML =  "<textarea type='text' rows=10 name='" + uniqueName + "cmdText' id='" + uniqueName + "cmdText'></textarea>" + 
                "<input type=button value=Execute onclick=\"cmd_execute('"+uniqueName+"')\" />";
        
    var object_HTML = cmd_renderHTMLCmdObject(uniqueName, HTML, width, height, forecolor, backcolor, bordercolor);
	document.write(object_HTML);
}
 
function cmd_execute(param_uniqueName){
	
    cmdText = document.getElementById(param_uniqueName + "cmdText");
    
    
    var currentValue = cmdText.value;
    try{
	    evaluatedValue = eval(currentValue);
    }catch(ex){
	    evaluatedValue = 	"Exception.name:    " + ex.name + "\n" +
						    "Exception.code:    " + ex.number + "\n" +
						    "Exception.message: " + ex.message;
    }
    cmdResult = document.getElementById(param_uniqueName + "cmdResult");
	var result=cmdResult.innerHTML;
    result += ((cmdResult.innerHTML.length > 0) ?"<br /><br />" : "") + 
              (currentValue ? toolkit_HTMLEncode(currentValue.toString()): "") + 
              (evaluatedValue ? ("<br />&gt;&gt; " + toolkit_HTMLEncode(evaluatedValue.toString())): "");
   
    cmdResult.innerHTML = result;
	cmdResult.scrollTop = cmdResult.scrollHeight;
	
}

function cmd_handleKeyPress(param_uniqueName, param_keyCode){
   //execute when RETURN key is pressed
    if (param_keyCode == 13){
	    cmd_execute(param_uniqueName);
    }
}   

function cmd_renderHTMLCmdObject(param_uniqueName, param_HTML, param_width, param_height, param_forecolor, param_backcolor, param_bordercolor){

    try{
        return "<style>" + 
            "    #" + param_uniqueName + "cmdContainer{" + 
            "        width:"+param_width+";" + 
            "        height:"+param_height+";" + 
            "        background-color:"+param_backcolor+";" + 
            "        border:1px solid "+param_bordercolor+";" + 
            "    }" + 
            "    #" + param_uniqueName + "cmdResult{" + 
            "        color:"+param_forecolor+";" + 
            "        font-family:Courier;" + 
            "        font-size:10px;" + 
            "        font-weight:bold;" + 
            "        overflow:auto;" + 
            "        width:100%;" + 
            "        padding:1px;" +
            "        height:100%;" + 
            "    }" + 
            "    #" + param_uniqueName + "cmdText{" + 
            "        background-color:white;" + 
            "        color:"+param_forecolor+";" + 
            "        font-family:Courier;" + 
            "        font-size:10px;" + 
            "        font-weight:bold;" + 
            "        width:100%;" + 
            "    }" + 
            "</style>" + 
            "<div id='" + param_uniqueName + "cmdContainer' onclick='document.getElementById(\"" + param_uniqueName + "cmdText\").focus();'>" + 
            "    <div id='" + param_uniqueName + "cmdResult'></div>" +
            param_HTML + 
            "</div>";
            
    }catch(ex){
        return "ERROR in cmd_renderHTMLCmdObject. Object was not instantiated.";
    }
}







/**********************************/
/* WATCH VARIABLES WINDOW         */
/**********************************/

function VarWatch(){
	var _varWatch = new _VarWatch;
	vw_addInstance(_varWatch);
	return _varWatch;
}


function _VarWatch(){
	var uniqueName = toolkit_getUniqueName();
	var watchList = [];
	
	document.write('<div id="' + uniqueName + '"></div>');
	document.write("<input type=text value='' id='"+uniqueName+"_input'>");
	document.write("<input type=button value='Add Watch' id="+uniqueName+"_button onclick=\"vw_addToInstance('" + uniqueName + "', document.getElementById('"+uniqueName+"_input').value);\" >");
	
	return {
		uniqueName : uniqueName,
		
		watchList : watchList,
	
		addWatch : function(){
			this.watchList.push(arguments[0]);
		},
		
		removeWatch : function (){
			var _temp = new Array();
			var _expression = unescape(arguments[0]);
			
			for(x=0;x<this.watchList.length;x++){
				if(this.watchList[x] != _expression){
					_temp.push(this.watchList[x]);
				}
			}
			
			this.watchList = _temp;
			this.render();
		},
		
		render : function(){
			_element = document.getElementById(this.uniqueName);
			
			var _output = "<table cellpaddin=1 cellspacing=1 border=1 width=100% >"
			_output += "<tr><td width=30% ><b>Variable</b></td><td width=70% ><b>Value</b></td><td width=5>&nbsp;</td></tr>";
			for(y=0;y<this.watchList.length;y++){
				try{
					var value = eval(this.watchList[y])
				}catch(ex){
					var value = ex.message;
				}
				_output += "<tr><td valign=top width=30% >" + this.watchList[y] + "</td>";
				_output += "    <td valign=top width=70% >" + value + "</td>";
				_output += "	<td valign=top width=5><a alt='remove watch' href='javascript:void(vw_removeFromInstance(\"" + this.uniqueName + "\", \"" + escape(this.watchList[y]) + "\"))'>x</a></td>";
				_output += "</tr>";
			}
			
			_output += "</table>";
			
			if(_element){
				_element.innerHTML = _output;
			}else{
				throw('Element ' + this.uniqueName + ' does not exist.');	
			}
		},
		
		toString : function(){
			return this.watchList;	
		}
	}
}

function vw_addInstance(param_in){
	if(arguments[0])
		vw_instances.push(arguments[0]);
	if (vw_renderTimeout) 
		window.clearTimeout(vw_renderTimeout);
	vw_render();
}

function vw_addToInstance(param_un, param_value){
	if(arguments[0] && arguments[1]){
		vw_findInstanceByUniqueName(param_un).addWatch(param_value);
	}
}

function vw_removeFromInstance(param_un, param_value){
	if(arguments[0] && arguments[1]){
		vw_findInstanceByUniqueName(param_un).removeWatch(param_value);
	}
}

function vw_findInstanceByUniqueName(param_un){
	for(z=0;z<vw_instances.length;z++){
		if(param_un == vw_instances[z].uniqueName) return vw_instances[z];
	}
	return null;
}

function vw_render(){
	
	for(x=0;x<vw_instances.length;x++){
		vw_instances[x].render();
	}

	setTimeout('vw_render()',vw_sleepInterval);
}





/**********************************/
/* DEBUG CONSOLE		          */
/**********************************/

function DebugConsole(){
	return {
		varWatch: new VarWatch(),
		commandPrompt: new CommandPrompt()
	}
	
		
}
