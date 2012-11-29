function nVizLoadInfo(targetDiv, url)
{

    /* make sure the box is showing: */
    setVisible("boxholder");

    var me = this;

    me.targetDiv  = targetDiv;
    me.url        = url;

    var xmlhttp;

    try { xmlhttp = new ActiveXObject("Msxml2.XMLHTTP"); } 
    catch (e) 
        {
            try { xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); } 
            catch (E) { xmlhttp = false; }
        }

    if (!xmlhttp && typeof XMLHttpRequest!='undefined') 
        {
            try { xmlhttp = new XMLHttpRequest(); }
            catch (e) { xmlhttp=false; }
        }

    if (!xmlhttp && window.createRequest) 
        {
            try { xmlhttp = window.createRequest(); }
            catch (e) { xmlhttp=false; }
        }

    var target = document.getElementById(me.targetDiv);

    xmlhttp.open("GET", me.url);

    xmlhttp.onreadystatechange = function() 
        {
            if(xmlhttp.readyState == 4 && xmlhttp.status == 200) 
                {
                    target.innerHTML = xmlhttp.responseText;
                }
        }

    xmlhttp.send(null);
}

/* Script to show different elements for different algos: */
function showPanel(id) { 
    /*alert("in show panel, id=" + id);*/
    document.getElementById("bls_args1").style.display = "none"; 
    document.getElementById("bls_args2").style.display = "none"; 
    document.getElementById("plav_args1").style.display = "none"; 
    document.getElementById("plav_args2").style.display = "none"; 

    /* wipe the values for stat mean and dev: they're irrelevant after 
     * an algo change */
    /*
    document.getElementById("StatMean").value = ""; 
    document.getElementById("StatStandardDeviation").value = ""; 
    */
    if (id == "bls") { 
        /*alert("Setting bls_args visible");*/
        setVisible("bls_args1");
        setVisible("bls_args2");
        /* clear plav and ls args */
        /*alert("clearing plav_args");*/
        document.getElementById("NumberOfOutliers").value = "";
        document.getElementById("PhaseSmoothingBoxSize").value = "";
        
    } else if (id == "plav") { 
        /*alert("Setting plav_args visible");*/
        setVisible("plav_args1");
        setVisible("plav_args2");
        /* clear bls and ls args */
        /*alert("clearing bls_args");*/
        document.getElementById("NumberOfBins").value = "";

        document.getElementById("FractionOfPeriodInTransitMin").value = "";
        document.getElementById("FractionOfPeriodInTransitMax").value = "";
    } 
    else {
        /* clear plav and bls args */
        /*alert("clearing bls_args and plav_args");*/
        document.getElementById("NumberOfOutliers").value = "";
        document.getElementById("PhaseSmoothingBoxSize").value = "";
        document.getElementById("NumberOfBins").value = "";
        document.getElementById("FractionOfPeriodInTransitMin").value = "";
        document.getElementById("FractionOfPeriodInTransitMax").value = "";
    }
    /*toggleStatDisplay(document.getElementById("StatReuse").value);*/
    /*alert("Got to the end of showPanel");*/
}

/* show different elements for different period increments */
function showStepPanel(id) { 

    document.getElementById("fixedfStep_arg").style.display = "none";
    document.getElementById("plavStep_arg").style.display = "none";
    document.getElementById("oversample_arg").style.display = "none";

    if (id.length == 0) {
        id = document.getElementById("PeriodStepMethod").value;
    }

    var val;
    var osamp;

    if (id == "fixedf" || id == "fixedp") { 
        /*alert("fixed step size selected");*/
        setVisible("fixedfStep_arg");
    } else if (id == "plav") { 
        setVisible("plavStep_arg");
        document.getElementById("oversample_arg").style.display = "none"; 
    } else {
        setVisible("oversample_arg");
    } 

    /* call the update: */
    updateFields('1', '1');
} 

function setOversample(val) { 

    /*alert("Setting oversample to " + val);*/
    id = document.getElementById("PeriodStepMethod").value;

    if (id == "fixedf" || id == "fixedp") { 
        if (val.length > 0) {
            document.getElementById("FixedStepSize").value = "";
            document.getElementById("FixedStepSize").disabled = true;
        }
        else {
            document.getElementById("FixedStepSize").disabled = false;
        }
    }

    /* call the update: */
    updateFields('1', '1');
} 

function setFixedStep(val) {
    /*alert("Setting fixed step size to " + val);*/

    if (val.length > 0) {
        document.getElementById("OversampleFactor").value = "";
        document.getElementById("OversampleFactor").disabled = true;
    }
    else {
        document.getElementById("OversampleFactor").disabled = false;
    }

    /* call the update: */
    updateFields('1', '1');
} 

function showCon() {
	setVisible("constraintRange");
	setVisible("xconstraintRange");
	setVisible("yconstraintRange");
	document.pgargs_f.constrsect.value = 1;
}


function hideCon() {
	document.getElementById("constraintRange").style.display = "none";
	document.getElementById("xconstraintRange").style.display = "none";
	document.getElementById("yconstraintRange").style.display = "none";
	document.pgargs_f.constrsect.value = 0;
}


/* show different elements for different period increments */
function showConstraints(val) {
    if (val == "none") {
        document.getElementById("constraintRange").style.display = "none";
    }
    else {
        setVisible("constraintRange");
    }
    updateFields('1', '1');
} 


/* switch between displaying and not displaying stats */
function toggleStatDisplay(val) { 
    /*alert("my val: " + val);*/
    var algo;
    document.getElementById("stat_num").style.display = "none"; 
    document.getElementById("stat_mean").style.display = "none"; 
    document.getElementById("stat_dev").style.display = "none"; 
    if (val == "1") {
        algo = document.getElementById("PeriodogramType").value;
        if (!algo) {
            if (document.getElementById("lsRadio").checked) {
                document.getElementById("PeriodogramType").value = "ls";
                showPanel("ls");
            }
            else if (document.getElementById("blsRadio").checked) {
                document.getElementById("PeriodogramType").value = "bls";
                showPanel("bls");
            }
            else if (document.getElementById("plavRadio").checked) {
                document.getElementById("PeriodogramType").value = "plav";
                showPanel("plav");
            }
        }
    }
    algo = document.getElementById("PeriodogramType").value;
    setVisible("stat_num");
    if (algo == "bls") { 
        setVisible("stat_mean");
        setVisible("stat_dev");
    } else if (algo == "plav") { 
        setVisible("stat_mean");
        setVisible("stat_dev");
    } else {
        /* clear the fields for ls */
        document.getElementById("stat_mean").style.display = "none"; 
        document.getElementById("StatStandardDeviation").value = ""; 
    } 
} 

function changePeriodogramType() {

    /*alert("Changing periodogram type!");*/
    /*
    document.getElementById("stat_num").style.display = "none"; 
    document.getElementById("stat_mean").style.display = "none"; 
    document.getElementById("stat_dev").style.display = "none"; 

    document.getElementById("StatReuse").value = "0";

    document.getElementById("StatMean").value = ""; 
    document.getElementById("StatStandardDeviation").value = ""; 
    */

    if (document.getElementById("lsRadio").checked) {
	/*alert("setting type to ls");*/
        document.getElementById("PeriodogramType").value = "ls";
        showPanel("ls");
    }
    else if (document.getElementById("blsRadio").checked) {
	/*alert("setting type to bls");*/
        document.getElementById("PeriodogramType").value = "bls";
        showPanel("bls");
    }
    else if (document.getElementById("plavRadio").checked) {
	/*alert("setting type to plav");*/
        document.getElementById("PeriodogramType").value = "plav";
        showPanel("plav");
    }

    /* call the update to get a new time estimate: */
    /*alert("Input file: " + document.getElementById("InputFile").value);*/
    if (document.getElementById("InputFile").value != "") {
        /*alert("Updating time estimate");*/
        updateFields('1', '1');
    }
}

function changeFileType(type) {

    /*alert("Changing file type!");*/
    
    if (type=="fits") {
        document.getElementById("fitsRadio").checked = true;
        document.getElementById("asciiRadio").checked = false;
        document.getElementById("FitsRow").style.display = "";
        document.getElementById("FitsHeaderDataUnit").value = "1";
        document.getElementById("FitsHeaderDataUnit").disabled = false;
    }
    else if (type=="ascii") {
        document.getElementById("asciiRadio").checked = true;
        document.getElementById("fitsRadio").checked = false;
        document.getElementById("FitsRow").style.display = "none";
        document.getElementById("FitsHeaderDataUnit").value = "";
        document.getElementById("FitsHeaderDataUnit").disabled = true;
    }
}

function highlightField(id) {
    document.getElementById(id).style.backgroundColor = "#FFA0A0";
    document.getElementById(id).style.fontWeight = "bold";
    /* document.getElementById(id).style.color = "white";*/
    document.getElementById(id).style.color = "black";

    /* make sure it's showing too: */
    setVisible("allOtherParameters");

    if ((id == "InputFile") ||
        (id == "TimeColumn") || 
        (id == "DataColumn") || 
        (id == "ConstraintColumn")) {

        if (document.getElementById("fileParameters").style.display == 
            "none") {
            toggleDisplay("fileParameters", "fileParametersFlag");
        }
    } 
    else if ((id == "PeriodRangeMin") ||
             (id == "PeriodRangeMax") ||
             (id == "PeriodStepMethod") ||
             (id == "OversampleFactor") ||
             (id == "FixedStepSize") ||
             (id == "PeriodStepFactor")) {
        if (document.getElementById("periodParameters").style.display == 
            "none") {
            toggleDisplay("periodParameters", "periodParametersFlag");
        }
    }
    else if ((id == "NumberOfOutliers") ||
             (id == "PhaseSmoothingBoxSize") ||
             (id == "NumberOfBins") ||
             (id == "FractionOfPeriodInTransitMin") ||
             (id == "FractionOfPeriodInTransitMax")) {
        if (document.getElementById("algoParameters").style.display == 
            "none") {
            toggleDisplay("algoParameters", "algoParametersFlag");
        }
    }
    else if ((id == "NumberOfPeaksToReturn") ||
             (id == "PeakSignificanceThreshold")) {
        if (document.getElementById("outputParameters").style.display == 
            "none") {
            toggleDisplay("outputParameters", "outputParametersFlag");
        }
    }
    else if ((id == "StatNumberOfSamples") ||
             (id == "StatMean") ||
             (id == "StatStandardDeviation")) {
        if (document.getElementById("statParameters").style.display == 
            "none") {
            toggleDisplay("statParameters", "statParametersFlag");
        }
    }
}

function errorLoad(id) {
    highlightField(id);
}

function popHelp(mylink) {
    var w = 
        window.open(mylink, 'help', 'width=500, height=200, scrollbars=yes, toolbar=yes', resizable='yes');
    w.focus();
    /*newWindow(mylink, 'help window', 'W_SMALL', 'H_SMALL');*/
}

function toggleDisplay(id, idFlag) {
    var mydisp = document.getElementById(id).style.display;
    if (mydisp == "none") {
        setVisible(id);
        if (idFlag != "") {
            document.getElementById(idFlag).innerHTML = "<b>-</b>";
        }
        if (id == "algoParameters") {
            /*alert("toggling algoParameters");*/
            showPanel(document.getElementById("PeriodogramType").value);
        }
    }
    else {
        document.getElementById(id).style.display = "none";
        if (idFlag != "") {
            document.getElementById(idFlag).innerHTML = "<b>+</b>";
        }
    }

    if (document.getElementById("BackgroundStatusFile").value != "None" &&
        document.getElementById("BackgroundConfigFile").value != "None") {
        updateStatusFile();
    }
}

function enableUploadButton() {
    /* function to make the Upload button more radiant after a 
     * file name has been entered */
    /*
    document.getElementById("UploadButton").style.backgroundColor="red";
    document.getElementById("UploadButton").style.fontWeight="bolder";
    */
    document.getElementById("UploadButton").setAttribute("class", "redSubmit");
    document.getElementById("UploadButton").disabled = false;
    document.getElementById("FitsHeaderDataUnit").disabled = false;
    document.getElementById("FileFormatRow").style.display = "";
    document.getElementById("fitsRadio").disabled = false;
    document.getElementById("asciiRadio").disabled = false;
    

    /* disable things related to previous file before activating upload: */
    document.getElementById("TimeColumn").disabled = true;
    document.getElementById("DataColumn").disabled = true;
    document.getElementById("ConstraintColumn").disabled = true;
    document.getElementById("ConstraintRangeMin").disabled = true;
    document.getElementById("ConstraintRangeMax").disabled = true;
    document.getElementById("PeriodRangeMin").disabled = true;
    document.getElementById("PeriodRangeMax").disabled = true;
    document.getElementById("FixedStepSize").disabled = true;
    document.getElementById("NumberOfBins").disabled = true;
    document.getElementById("NumberOfBins").disabled = true;


}
function resetUploadButton() {
    /* function to make the Upload button less radiant after upload */
    document.getElementById("UploadButton").setAttribute("class", "");
    document.getElementById("FileFormatRow").style.display = "none";
	

    if (document.getElementById("CurrentFile").value != null)
        document.getElementById("CurrentFile").style.display = "";
    /*document.getElementById("UploadButton").disabled = "disabled";*/
    /* document.getElementById("FitsHeaderDataUnit").disabled = true;*/
}

function updateFields(setcol, setpd) {
    var updatecall;
    var colargs = "";
    var pdargs = "";
    if (setcol == "1") {
        colargs = 
            "&x=" + document.getElementById("TimeColumn").value +
            "&X=" + document.getElementById("ConstraintColumn").value +
            "&y=" + document.getElementById("DataColumn").value +
            "&w=" + document.getElementById("ConstraintRangeMin").value +
            "&W=" + document.getElementById("ConstraintRangeMax").value ;
    }
    if (setpd == "1") {
        pdargs = 
            "&p=" + 
            document.getElementById("PeriodRangeMin").value +
            "&P=" + 
            document.getElementById("PeriodRangeMax").value;
    }

    updateurl = "/cgi-bin/Periodogram/nph-update?long=0&l=1&infile=" + 
        document.getElementById("InputFile").value + 
        "&long=0" +
        "&directory=" + 
        document.getElementById("directory").value +
        "&a=" + 
        document.getElementById("PeriodogramType").value +
        "&o=" + 
        document.getElementById("OversampleFactor").value +
        "&i=" + 
        document.getElementById("PeriodStepMethod").value +
        "&d=" +
        document.getElementById("FixedStepSize").value +
        "&b=" +
        document.getElementById("NumberOfBins").value +
        "&Q=" +
        document.getElementById("FractionOfPeriodInTransitMax").value +
        "&u=" +
        document.getElementById("PeriodStepFactor").value + 
        "&g=";


//     if (document.getElementById("RemoteConfigFile").value != null || document.getElementById("RemoteConfigFile") !== 'undefined' )
//	 updateurl += document.getElementById("RemoteConfigFile").value;
	
     updateurl += colargs + pdargs;



    /*alert("Updateurl: " + updateurl);*/

    evalHttpRequest(updateurl);

}

function readStatusFile() {

    /*alert("readStatusFile has fired!");*/

  	
    readurl = "/cgi-bin/Periodogram/nph-readstatus?config=" + 
        document.getElementById("BackgroundConfigFile").value + 
        "&bgname=" + 
        document.getElementById("BackgroundStatusFile").value;
  
    evalHttpRequest(readurl);

}

function updateStatusFile() {
    /* retrieve the state of each of the things that can be
     * expanded/collapsed: */

    var allOtherParameters = 1; 
    var id = "allOtherParameters";
    var mydisp = document.getElementById(id).style.display;
    if (mydisp == "none") {
        allOtherParameters = 0;
    }

    var fileParameters = 1;
    id = "fileParameters";
    mydisp = document.getElementById(id).style.display;
    if (mydisp == "none") {
        fileParameters = 0;
    }
    
    var periodParameters = 1;
    id = "periodParameters";
    mydisp = document.getElementById(id).style.display;
    if (mydisp == "none") {
        periodParameters = 0;
    }

    var algoParameters = 1;
    id = "algoParameters";
    mydisp = document.getElementById(id).style.display;
    if (mydisp == "none") {
        algoParameters = 0;
    }
    var outputParameters = 1;
    id = "outputParameters";
    mydisp = document.getElementById(id).style.display;
    if (mydisp == "none") {
        outputParameters = 0;
    }
    var statParameters = 1;
    id = "statParameters";
    mydisp = document.getElementById(id).style.display;
    if (mydisp == "none") {
        statParameters = 0;
    }

}

function evalHttpRequest(thisurl) {
    /*alert("about to make request: " + thisurl);*/

    var xmlhttp = createXMLHttpRequest();
    /*alert("created request");*/
    xmlhttp.open("GET", thisurl, "true");

    /*alert("made call");*/
    /* we don't want caching on service calls! */
    xmlhttp.setRequestHeader("If-Modified-Since", 
                             "Sat, 1 Jan 2005 00:00:00 GMT");

    var myresponse = "";
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	    /*alert("getting response:");*/
            myresponse = xmlhttp.responseText;
	    /*alert("About to evaluate" + myresponse);*/
            eval(myresponse);
        }
    }
    xmlhttp.send(null);
}

function setVisible(id) {
    /* function to return the right kind of display setting for ie and ff */
    /* lots of display problems -- reverting to "" to invoke default */
    var browser=navigator.appName;
    if (browser == "Microsoft Internet Explorer") {
        document.getElementById(id).style.display = "";
    }
    else {
        document.getElementById(id).style.display = "";
    }


    
}

/* from "Ajax: the definitive guide", Holdener.  p.70 */
function createXMLHttpRequest() {
    var request = false;
    if (window.XMLHttpRequest) {
        if (typeof XMLHttpRequest != 'undefined')
            try {
                request = new XMLHttpRequest();
            } catch(e) {
                request = false;
            }
    } else if (window.ActiveXObject) {
        try {
            request = new ActiveXObject('Msxml2.XMLHTTP');
        } catch(e) {
            request = false;
        }
    }

    return request;
}
function setInputFile(name) {
	/*	alert("Setting input file name to " + name);*/
	document.getElementById("InputFile").value = name;
	/*	document.getElementById("intblUpload");*/
	return;
}
function setDataHome(value) {
	document.getElementById("DataHome").value = 
	"/stage/msca-links-dev/" + value;
	/*alert("Setting datahome to " + value);*/
	return;
}

function getFormattedTime(t) {
    var secInMin = 60;
    var secInHour = 60*secInMin;
    var secInDay = 24*secInHour;

    var days = Math.floor(t/secInDay);
    var hours = Math.floor((t - days*secInDay)/secInHour);
    var mins = Math.floor((t - days*secInDay - hours*secInHour)/secInMin);
    var sec = Math.floor(t - days*secInDay - hours*secInHour - mins*secInMin);

    var retstr = "";

    if (t < 0) {
        retstr = " [Current time is before start time: please check system clock] ";
    }
    else if (days > 0) {
        retstr = days + "d " + hours + "h " + mins + "m " + sec + "s";
    }
    else if (hours > 0) {
        retstr = hours + "h " + mins + "m " + sec + "s";
    }
    else if (mins > 0) {
        retstr = mins + "m " + sec + "s";
    }
    else if (sec > 0) {
        retstr = sec + "s";
    }
    else {
        retstr = " [Current time is before start time: please check system clock] ";
    }
   return(retstr);
}

function getElapsedTime(starttime) {

    var now = new Date().getTime()/1000;
    var tdiff = now.valueOf() - starttime;
        var secs = Math.floor(tdiff.valueOf());
        return(getFormattedTime(secs));
}

/* function to generate a link to call nph-phaselc with an input period. 
 * relies on the presence of the */
function updatePhaseLink(inputperiod) {

        var period = inputperiod.replace(/^\s+|\s+$/g,"");

	if (period == "") {
	    document.getElementById("rephase_err").innerHTML = "<font size='-1' color='red'>Please provide period</font>"; 
	    return(false);
        }	

	if (isNaN(parseFloat(period)) || !isFinite(period))
	{
	    document.getElementById("rephase_err").innerHTML = "<font size='-1' color='red'>Period value must be non-negative and numeric</font>"; 
	    return(false);
}	

	if (period < 0) {
	    document.getElementById("rephase_err").innerHTML = "<font size='-1' color='red'>Period value must be non-negative and numeric</font>"; 
	    return(false);
	}

	document.do_rephase.infile.value  = document.getElementById("InputFile").value;
	document.do_rephase.directory.value  = document.getElementById("directory").value;
	document.do_rephase.x.value = document.getElementById("TimeColumn").value;
	document.do_rephase.y.value = document.getElementById("DataColumn").value;
	document.do_rephase.p.value = period;
	return(true);
}



function pgramlc_go() {
   var infile = document.getElementByName("infile");
   return (false);
}


function updateConstraintCol() {
	var timeindex = document.getElementById("TimeColumn").selectedIndex;
	var timeOption = document.getElementById("TimeColumn").options[timeindex].text

	var dataindex = document.getElementById("DataColumn").selectedIndex;
	var dataOption = document.getElementById("DataColumn").options[dataindex].text

	var con = document.getElementById("ConstraintColumn");
        for (i=0; i< con.options.length; i++) {
		if (con.options[i].text == timeOption) {
	            con.options[i].disabled = true;
	        } else	if (con.options[i].text == dataOption) {
	            con.options[i].disabled = true;
	        } else
	            con.options[i].disabled = false;

	}
}

function pgram_replot(directory, periodscale) {
   var newpix;
   var pix = document.getElementById("pgram_pix");
   var pixsrc = pix.src;
   if (periodscale == "linear") {
	newpix = pixsrc.replace(/_log.jpg/, '_linear.jpg');
   } else if (periodscale == "log") {
	newpix = pixsrc.replace(/_linear.jpg/, '_log.jpg');
   } 
   pix.src = newpix;
}

function optperiod_switch() {
   var optperiod = document.getElementById("doperiod_id");
   if (optperiod.checked == true) {
      document.getElementById("PeriodRangeMin").disabled = true;
      document.getElementById("PeriodRangeMax").disabled = true;
      document.getElementById("FixedStepSize").disabled = true;
   } else {
      document.getElementById("PeriodRangeMin").disabled = false;
      document.getElementById("PeriodRangeMax").disabled = false;
      document.getElementById("FixedStepSize").disabled = false;
  }
}