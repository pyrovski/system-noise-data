function checkConstraint() {
   var retval = true;
   var gotx = 0; goty = 0;
   var temp;
   var xmin = document.getElementById("xConstraintRangeMin").value;
   var xmax = document.getElementById("xConstraintRangeMax").value;
   var ymin = document.getElementById("yConstraintRangeMin").value;
   var ymax = document.getElementById("yConstraintRangeMax").value;

   if (xmin > xmax) {
       document.getElementById("xconstraint_err").innerHTML = "<font size='-1' color='red'>Min must be < Max</font>"; 
       retval = false;
       return(retval);
   }

   if (ymin > ymax) {
       document.getElementById("yconstraint_err").innerHTML = "<font size='-1' color='red'>Min must be < Max</font>"; 
       retval = false;
       return(retval);
   }

   temp = xmin.replace(/^\s+|\s+$/g,"");
   if (temp != "") {
      if (isNaN(parseFloat(xmin)) || !isFinite(xmin))
	{
	    document.getElementById("xconstraint_err").innerHTML = "<font size='-1' color='red'>must be numeric</font>"; 
	    retval = false;
        } else {
            gotx = 1;
        }
    }



    temp = xmax.replace(/^\s+|\s+$/g,"");
    if (temp != "") {
        if (isNaN(parseFloat(xmax)) || !isFinite(xmax))
	{
	    document.getElementById("xconstraint_err").innerHTML = "<font size='-1' color='red'>must be numeric</font>"; 
	    retval = false;
        } else {
           gotx = 1;
        }
    }



    temp = ymin.replace(/^\s+|\s+$/g,"");
    if (temp != "") {
        if (isNaN(parseFloat(ymin)) || !isFinite(ymin))
	{
	    document.getElementById("yconstraint_err").innerHTML = "<font size='-1' color='red'>must be numeric</font>"; 
	    retval = false;
        } else {
          goty = 1;
        }	
    }


    temp = ymax.replace(/^\s+|\s+$/g,"");
    if (temp != "" ) {
        if (isNaN(parseFloat(ymax)) || !isFinite(ymax))
	{
	    document.getElementById("yconstraint_err").innerHTML = "<font size='-1' color='red'>must be numeric</font>"; 
	    retval = false;
        } else {
          goty = 1;
        }
    }

    if (gotx == 1) {
        document.getElementById("dox_id").value = 1;
    }

    if (goty == 1) {
        document.getElementById("doy_id").value = 1;
    }
    return (retval);	
}