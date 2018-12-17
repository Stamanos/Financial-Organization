/**
* @preserve CanvasJS HTML5 & JavaScript Charts - v2.0.2 GA - https://canvasjs.com/ 
* Copyright 2017 fenopix
*
*  --------------------- License Information --------------------
* CanvasJS is a commercial product which requires purchase of license. Without a commercial license you can use it for evaluation purposes for upto 30 days. Please refer to the following link for further details.
*     https://canvasjs.com/license-canvasjs/
* 
**/

/*eslint-disable*/
/*jshint ignore:start*/
(function () {
var isDebugMode = false;
var global = {};

var isCanvasSupported = !!document.createElement("canvas").getContext;
//isCanvasSupported = false;

//Default values for all Chart Elements that can be set by the user. CanvasJSObject.setOptions looks into this while setting the default/user-defined values.
var defaultOptions = {
	Chart: {
		width: 500,
		height: 400,
		zoomEnabled: false,
		zoomType: "x",
		backgroundColor: "white",
		theme: "light1",
		animationEnabled: false,
		animationDuration: 1200,

		dataPointWidth: null,
		dataPointMinWidth: null,
		dataPointMaxWidth: null,

		colorSet: "colorSet1",
		culture: "en",
		creditHref: "",
		creditText: "CanvasJS",
		interactivityEnabled: true,
		exportEnabled: false,
		exportFileName: "Chart",

		rangeChanging: null,
		rangeChanged: null,


		publicProperties: {
			"title": "readWrite",
			"subtitles": "readWrite",
			"toolbar": "readWrite",
			"toolTip": "readWrite",
			"legend": "readWrite",
			"axisX": "readWrite",
			"axisY": "readWrite",
			"axisX2": "readWrite",
			"axisY2": "readWrite",
			"data": "readWrite",

			"options": "readWrite",
			"bounds": "readOnly",
			"container": "readOnly"
		}
	},

	Title: {
		padding: 0,
		text: null,
		verticalAlign: "top",//top, center, bottom
		horizontalAlign: "center",//left, center, right
		fontSize: 20,//in pixels
		fontFamily: "Calibri",
		fontWeight: "normal", //normal, bold, bolder, lighter,
		fontColor: "black",
		fontStyle: "normal", // normal, italic, oblique

		borderThickness: 0,
		borderColor: "black",
		cornerRadius: 0,
		backgroundColor: isCanvasSupported ? "transparent" : null,
		margin: 5,
		wrap: true,
		maxWidth: null,

		dockInsidePlotArea: false,


		publicProperties: {
			"options": "readWrite",
			"bounds": "readOnly",
			"chart": "readOnly"
		}
		//toolTipContent: null//string - To be implemented (TBI)
	},

	Subtitle: {
		padding: 0,
		text: null,
		verticalAlign: "top",//top, center, bottom
		horizontalAlign: "center",//left, center, right
		fontSize: 14,//in pixels
		fontFamily: "Calibri",
		fontWeight: "normal", //normal, bold, bolder, lighter,
		fontColor: "black",
		fontStyle: "normal", // normal, italic, oblique

		borderThickness: 0,
		borderColor: "black",
		cornerRadius: 0,
		backgroundColor: null,
		margin: 2,
		wrap: true,
		maxWidth: null,

		dockInsidePlotArea: false,


		publicProperties: {
			"options": "readWrite",
			"bounds": "readOnly",
			"chart": "readOnly"
		}
		//toolTipContent: null//string - To be implemented (TBI)
	},

	Toolbar: {
		backgroundColor: "white",
		backgroundColorOnHover: "#2196f3",
		borderColor: "#2196f3",
		borderThickness: 1,
		fontColor: "black",
		fontColorOnHover: "white",

		publicProperties: {
			"options": "readWrite",

			"chart": "readOnly"
		}
	},

	Legend: {
		name: null,
		verticalAlign: "center",
		horizontalAlign: "right",

		fontSize: 14,//in pixels
		fontFamily: "calibri",
		fontWeight: "normal", //normal, bold, bolder, lighter,
		fontColor: "black",
		fontStyle: "normal", // normal, italic, oblique

		cursor: null,
		itemmouseover: null,
		itemmouseout: null,
		itemmousemove: null,
		itemclick: null,

		dockInsidePlotArea: false,
		reversed: false,

		backgroundColor: isCanvasSupported ? "transparent" : null,
		borderColor: isCanvasSupported ? "transparent" : null,
		borderThickness: 0,
		cornerRadius: 0,

		maxWidth: null,
		maxHeight: null,
		markerMargin: null,

		itemMaxWidth: null,
		itemWidth: null,
		itemWrap: true,
		itemTextFormatter: null,


		publicProperties: {
			"options": "readWrite",

			"bounds": "readOnly",
			"chart": "readOnly"
		}
	},

	ToolTip: {
		enabled: true,
		shared: false,
		animationEnabled: true,
		content: null,
		contentFormatter: null,

		reversed: false,

		backgroundColor: isCanvasSupported ? "rgba(255,255,255,.9)" : "rgb(255,255,255)",

		borderColor: null,
		borderThickness: 2, //in pixels
		cornerRadius: 5, // in pixels

		fontSize: 14, // in pixels
		fontColor: "black",
		fontFamily: "Calibri, Arial, Georgia, serif;",
		fontWeight: "normal", //normal, bold, bolder, lighter,
		fontStyle: "italic",  // normal, italic, oblique

		publicProperties: {
			"options": "readWrite",

			"chart": "readOnly"
		}
	},

	Axis: {
		minimum: null, //Minimum value to be shown on the Axis
		maximum: null, //Minimum value to be shown on the Axis
		viewportMinimum: null,
		viewportMaximum: null,
		interval: null, // Interval for tick marks and grid lines
		intervalType: null, //number, millisecond, second, minute, hour, day, month, year
		reversed: false,
		logarithmic: false,
		logarithmBase: 10,

		title: null, // string
		titleFontColor: "black",
		titleFontSize: 20,
		titleFontFamily: "arial",
		titleFontWeight: "normal",
		titleFontStyle: "normal",
		titleWrap: true,
		titleMaxWidth: null,
		titleBackgroundColor: isCanvasSupported ? "transparent" : null,
		titleBorderColor: isCanvasSupported ? "transparent" : null,
		titleBorderThickness: 0,
		titleCornerRadius: 0,

		labelAngle: 0,
		labelFontFamily: "arial",
		labelFontColor: "black",
		labelFontSize: 12,
		labelFontWeight: "normal",
		labelFontStyle: "normal",
		labelAutoFit: true,
		labelWrap: true,
		labelMaxWidth: null,//null for auto
		labelFormatter: null,
		labelBackgroundColor: isCanvasSupported ? "transparent" : null,
		labelBorderColor: isCanvasSupported ? "transparent" : null,
		labelBorderThickness: 0,
		labelCornerRadius: 0,
		labelPlacement: "outside",

		prefix: "",
		suffix: "",

		includeZero: true, //Applies only for axisY. Ignored in axisX.

		tickLength: 5,
		tickColor: "black",
		tickThickness: 1,

		lineColor: "black",
		lineThickness: 1,
		lineDashType: "solid",

		gridColor: "A0A0A0",
		gridThickness: 0,
		gridDashType: "solid",

		interlacedColor: isCanvasSupported ? "transparent" : null,

		valueFormatString: null,

		margin: 2,

		publicProperties: {
			"options": "readWrite",
			"stripLines": "readWrite",
			"scaleBreaks": "readWrite",
			"crosshair": "readWrite",

			"bounds": "readOnly",
			"chart": "readOnly"
		}
	},

	StripLine: {
		value: null,
		startValue: null,
		endValue: null,

		color: "orange",
		opacity: null,
		thickness: 2,
		lineDashType: "solid",
		label: "",
		labelPlacement: "inside",//"outside"
		labelAlign: "far",//"near" , "center" , "far"
		labelWrap: true,
		labelMaxWidth: null,
		labelBackgroundColor: null,
		labelBorderColor: isCanvasSupported ? "transparent" : null,
		labelBorderThickness: 0,
		labelCornerRadius: 0,
		labelFontFamily: "arial",
		labelFontColor: "orange",
		labelFontSize: 12,
		labelFontWeight: "normal",
		labelFontStyle: "normal",
		labelFormatter: null,

		showOnTop: false,

		publicProperties: {
			"options": "readWrite",

			"axis": "readOnly",
			"bounds": "readOnly",
			"chart": "readOnly"
		}
	},

	ScaleBreaks: {
		autoCalculate: false,
		collapsibleThreshold: "25%",
		maxNumberOfAutoBreaks: 2,
		spacing: 8,
		type: "straight", // "wavy", "zigzag",
		color: "#FFFFFF",
		fillOpacity: .9,
		lineThickness: 2,
		lineColor: "#E16E6E",
		lineDashType: "solid",

		publicProperties: {
			"options": "readWrite",
			"customBreaks": "readWrite",

			"axis": "readOnly",
			"autoBreaks": "readOnly",
			"bounds": "readOnly",
			"chart": "readOnly"
		}
	},

	Break: {
		startValue: null,
		endValue: null,
		spacing: 8,
		type: "straight", // "wavy", "zigzag",
		color: "#FFFFFF",
		fillOpacity: .9,
		lineThickness: 2,
		lineColor: "#E16E6E",
		lineDashType: "solid",

		publicProperties: {
			"options": "readWrite",

			"scaleBreaks": "readOnly",
			"bounds": "readOnly",
			"chart": "readOnly"
		}
	},

	Crosshair: {
		enabled: false,

		snapToDataPoint: false,

		color: "grey",
		opacity: null,
		thickness: 2,
		lineDashType: "solid",

		label: "",
		labelWrap: true,
		labelMaxWidth: null,
		labelBackgroundColor: isCanvasSupported ? "grey" : null,
		labelBorderColor: isCanvasSupported ? "grey" : null,
		labelBorderThickness: 0,
		labelCornerRadius: 0,
		labelFontFamily: isCanvasSupported ? "Calibri, Optima, Candara, Verdana, Geneva, sans-serif" : "calibri",
		labelFontSize: 12,
		labelFontColor: "#fff",
		labelFontWeight: "normal",
		labelFontStyle: "normal",
		labelFormatter: null,

		valueFormatString: null,
		publicProperties: {
			"options": "readWrite",

			"axis": "readOnly",
			"bounds": "readOnly",
			"chart": "readOnly"
		}
	},

	DataSeries: {
		name: null,
		dataPoints: null,
		label: "",
		bevelEnabled: false,
		highlightEnabled: true,

		cursor: "default",

		indexLabel: "",
		indexLabelPlacement: "auto",  //inside, outside, auto       
		indexLabelOrientation: "horizontal",
		indexLabelFontColor: "black",
		indexLabelFontSize: 12,
		indexLabelFontStyle: "normal", //   italic ,oblique, normal 
		indexLabelFontFamily: "Arial", 	// fx: Arial Verdana "Courier New" Serif 
		indexLabelFontWeight: "normal", 	// bold ,bolder, lighter, normal 
		indexLabelBackgroundColor: null,
		indexLabelLineColor: "gray",
		indexLabelLineThickness: 1,
		indexLabelLineDashType: "solid",
		indexLabelMaxWidth: null,
		indexLabelWrap: true,
		indexLabelFormatter: null,

		lineThickness: 2,
		lineDashType: "solid",
		connectNullData: false,
		nullDataLineDashType: "dash",

		color: null,
		lineColor: null,
		risingColor: "white",
		fallingColor: "red",
		fillOpacity: null,

		startAngle: 0,

		radius: null,
		innerRadius: null,

		neckHeight: null,
		neckWidth: null,
		reversed: false,
		valueRepresents: null,

		linkedDataSeriesIndex: null,

		whiskerThickness: 2,
		whiskerDashType: "solid",
		whiskerColor: null,
		whiskerLength: null,

		stemThickness: 2,
		stemColor: null,
		stemDashType: "solid",

		upperBoxColor: "white",
		lowerBoxColor: "white",

		type: "column", //line, column, bar, area, scatter stackedColumn, stackedBar, stackedArea, stackedColumn100, stackedBar100, stackedArea100, pie, doughnut
		xValueType: "number", //number, dateTime
		axisXType: "primary",
		axisYType: "primary",
		axisXIndex: 0,
		axisYIndex: 0,

		xValueFormatString: null,
		yValueFormatString: null,
		zValueFormatString: null,
		percentFormatString: null,

		showInLegend: null,
		legendMarkerType: null,
		legendMarkerColor: null,
		legendText: null,
		legendMarkerBorderColor: isCanvasSupported ? "transparent" : null,
		legendMarkerBorderThickness: 0,

		markerType: "circle", //none, circle, square, cross, triangle, line
		markerColor: null,
		markerSize: null,
		markerBorderColor: isCanvasSupported ? "transparent" : null,
		markerBorderThickness: 0,
		//animationEnabled: true,
		mouseover: null,
		mouseout: null,
		mousemove: null,
		click: null,
		toolTipContent: null,

		visible: true,

		publicProperties: {
			"options": "readWrite",
			"axisX": "readWrite",
			"axisY": "readWrite",
			"chart": "readOnly"
		}
	},

	//Private
	TextBlock: {
		x: 0,
		y: 0,
		width: null,//read only
		height: null,//read only
		maxWidth: null,
		maxHeight: null,
		padding: 0,
		angle: 0,
		text: "",
		horizontalAlign: "center",//left, center, right
		fontSize: 12,//in pixels
		fontFamily: "calibri",
		fontWeight: "normal", //normal, bold, bolder, lighter,
		fontColor: "black",
		fontStyle: "normal", // normal, italic, oblique

		borderThickness: 0,
		borderColor: "black",
		cornerRadius: 0,
		backgroundColor: null,
		textBaseline: "top"
	},

	CultureInfo: {
		decimalSeparator: ".",
		digitGroupSeparator: ",",
		zoomText: "Zoom",
		panText: "Pan",
		resetText: "Reset",

		menuText: "More Options",
		saveJPGText: "Save as JPEG",
		savePNGText: "Save as PNG",
		printText: "Print",

		days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
		shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],

		months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
	}
};

//#region Cultures

var cultures = {
	"en": {
		//Derives from the default options
	}//,
	//"es": {
	//    decimalSeparator: ",",
	//    digitGroupSeparator: ".",
	//    zoomText: "zoom",
	//    panText: "pan",
	//    resetText: "reset",
	//    days: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
	//}
};

//#endregion Cultures

//#region Themes

var fontStack1 = isCanvasSupported ? "Trebuchet MS, Helvetica, sans-serif" : "Arial";
//var fontStack2 = isCanvasSupported ? "Arial, Helvetica, sans-serif" : "Arial";
//var fontStack3 = isCanvasSupported ? "Tahoma, Geneva, sans-serif" : "Arial";

var fontStack11 = isCanvasSupported ? "Impact, Charcoal, sans-serif" : "Arial";
//var fontStack12 = isCanvasSupported ? "Arial Black, Gadget, sans-serif" : "Arial";

var colorSets = {

	"colorSet1": [
		"#4F81BC",
		"#C0504E",
		"#9BBB58",
		"#23BFAA",
		"#8064A1",
		"#4AACC5",
		"#F79647",
		"#7F6084",
		"#77A033",
		"#33558B",
		"#E59566"
	],
	"colorSet2": [
		"#6D78AD",
		"#51CDA0",
		"#DF7970",
		"#4C9CA0",
		"#AE7D99",
		"#C9D45C",
		"#5592AD",
		"#DF874D",
		"#52BCA8",
		"#8E7AA3",
		"#E3CB64",
		"#C77B85",
		"#C39762",
		"#8DD17E",
		"#B57952",
		"#FCC26C"
	],
	"colorSet3": [
		"#8CA1BC",
		"#36845C",
		"#017E82",
		"#8CB9D0",
		"#708C98",
		"#94838D",
		"#F08891",
		"#0366A7",
		"#008276",
		"#EE7757",
		"#E5BA3A",
		"#F2990B",
		"#03557B",
		"#782970"
	]

};

var axisColor, fontColor1, fontColor2, crosshairColor, labelBackgroundColor, backgroundColor;

//#region Light Themes
var backgroundColor = "#FFFFFF";
var fontColor1 = "#333333";
var fontColor2 = "#000000";
var axisColor = "#666666";
var crosshairColor = "#000000";
var labelBackgroundColor = "#000000";

var fontSize1 = 32;
var fontSize2 = 20;
var fontSize3 = 14;
var light1 = {
	colorSet: "colorSet1",
	backgroundColor: backgroundColor,
	title: {
		fontFamily: fontStack11,
		fontSize: fontSize1,
		fontColor: fontColor1,
		fontWeight: "normal",

		verticalAlign: "top",
		margin: 5
	},
	subtitles: [{
		fontFamily: fontStack11,
		fontSize: fontSize3,
		fontColor: fontColor1,
		fontWeight: "normal",

		verticalAlign: "top",
		margin: 5
	}],

	data: [{
		indexLabelFontFamily: fontStack1,
		indexLabelFontSize: fontSize3,
		indexLabelFontColor: fontColor1,
		indexLabelFontWeight: "normal",

		indexLabelLineThickness: 1
	}],

	axisX: [{
		titleFontFamily: fontStack1,
		titleFontSize: fontSize2,
		titleFontColor: fontColor1,
		titleFontWeight: "normal",

		labelFontFamily: fontStack1,
		labelFontSize: fontSize3,
		labelFontColor: fontColor2,
		labelFontWeight: "normal",

		lineThickness: 1,
		lineColor: axisColor,

		tickThickness: 1,
		tickColor: axisColor,

		gridThickness: 0,
		gridColor: axisColor,

		stripLines: [
		{
			labelFontFamily: fontStack1,
			labelFontSize: fontSize3,
			labelFontColor: "#FF7300",
			labelFontWeight: "normal",

			labelBackgroundColor: null,
			color: "#FF7300",
			thickness: 1
		}],
		crosshair: {
			labelFontFamily: fontStack1,
			labelFontSize: fontSize3,
			labelFontColor: "#EEEEEE",
			labelFontWeight: "normal",
			labelBackgroundColor: labelBackgroundColor,

			color: crosshairColor,
			thickness: 1,

			lineDashType: "dash"
		},
		scaleBreaks: {
			type: "zigzag",
			spacing: "2%",
			lineColor: "#BBBBBB",
			lineThickness: 1,
			lineDashType: "solid"
		}
	}],

	axisX2: [{
		titleFontFamily: fontStack1,
		titleFontSize: fontSize2,
		titleFontColor: fontColor1,
		titleFontWeight: "normal",

		labelFontFamily: fontStack1,
		labelFontSize: fontSize3,
		labelFontColor: fontColor2,
		labelFontWeight: "normal",

		lineThickness: 1,
		lineColor: axisColor,

		tickThickness: 1,
		tickColor: axisColor,

		gridThickness: 0,
		gridColor: axisColor,

		stripLines: [
		{
			labelFontFamily: fontStack1,
			labelFontSize: fontSize3,
			labelFontColor: "#FF7300",
			labelFontWeight: "normal",

			labelBackgroundColor: null,
			color: "#FF7300",
			thickness: 1
		}],
		crosshair: {
			labelFontFamily: fontStack1,
			labelFontSize: fontSize3,
			labelFontColor: "#EEEEEE",
			labelFontWeight: "normal",
			labelBackgroundColor: labelBackgroundColor,

			color: crosshairColor,
			thickness: 1,

			lineDashType: "dash"
		},
		scaleBreaks: {
			type: "zigzag",
			spacing: "2%",
			lineColor: "#BBBBBB",
			lineThickness: 1,
			lineDashType: "solid"
		}
	}],

	axisY: [{
		titleFontFamily: fontStack1,
		titleFontSize: fontSize2,
		titleFontColor: fontColor1,
		titleFontWeight: "normal",

		labelFontFamily: fontStack1,
		labelFontSize: fontSize3,
		labelFontColor: fontColor2,
		labelFontWeight: "normal",

		lineThickness: 1,
		lineColor: axisColor,

		tickThickness: 1,
		tickColor: axisColor,

		gridThickness: 1,
		gridColor: axisColor,

		stripLines: [
		{
			labelFontFamily: fontStack1,
			labelFontSize: fontSize3,
			labelFontColor: "#FF7300",
			labelFontWeight: "normal",

			labelBackgroundColor: null,
			color: "#FF7300",
			thickness: 1
		}],
		crosshair: {
			labelFontFamily: fontStack1,
			labelFontSize: fontSize3,
			labelFontColor: "#EEEEEE",
			labelFontWeight: "normal",
			labelBackgroundColor: labelBackgroundColor,

			color: crosshairColor,
			thickness: 1,

			lineDashType: "dash"
		},
		scaleBreaks: {
			type: "zigzag",
			spacing: "2%",
			lineColor: "#BBBBBB",
			lineThickness: 1,
			lineDashType: "solid"
		}
	}],

	axisY2: [{
		titleFontFamily: fontStack1,
		titleFontSize: fontSize2,
		titleFontColor: fontColor1,
		titleFontWeight: "normal",

		labelFontFamily: fontStack1,
		labelFontSize: fontSize3,
		labelFontColor: fontColor2,
		labelFontWeight: "normal",

		lineThickness: 1,
		lineColor: axisColor,

		tickThickness: 1,
		tickColor: axisColor,

		gridThickness: 1,
		gridColor: axisColor,

		stripLines: [
		{
			labelFontFamily: fontStack1,
			labelFontSize: fontSize3,
			labelFontColor: "#FF7300",
			labelFontWeight: "normal",

			labelBackgroundColor: null,
			color: "#FF7300",
			thickness: 1
		}],
		crosshair: {
			labelFontFamily: fontStack1,
			labelFontSize: fontSize3,
			labelFontColor: "#EEEEEE",
			labelFontWeight: "normal",
			labelBackgroundColor: labelBackgroundColor,

			color: crosshairColor,
			thickness: 1,

			lineDashType: "dash"
		},
		scaleBreaks: {
			type: "zigzag",
			spacing: "2%",
			lineColor: "#BBBBBB",
			lineThickness: 1,
			lineDashType: "solid"
		}
	}],


	legend: {
		fontFamily: fontStack1,
		fontSize: 14,
		fontColor: fontColor1,
		fontWeight: "bold",

		verticalAlign: "bottom",
		horizontalAlign: "center"
	},

	toolTip: {
		fontFamily: fontStack1,
		fontSize: 14,
		fontStyle: "normal",

		cornerRadius: 0,
		borderThickness: 1
	}
};


backgroundColor = "#2A2A2A";
fontColor1 = "#F5F5F5";
fontColor2 = "#F5F5F5";
axisColor = "#FFFFFF";
crosshairColor = "#40BAF1";
labelBackgroundColor = "#F5F5F5";

fontSize1 = 33;
fontSize2 = 20;
fontSize3 = 14;
var light2 = {
	colorSet: "colorSet2",
	title: {
		fontFamily: fontStack1,
		fontSize: fontSize1,
		fontColor: "#3A3A3A",
		fontWeight: "bold",

		verticalAlign: "top",
		margin: 5
	},
	subtitles: [{
		fontFamily: fontStack1,
		fontSize: fontSize3,
		fontColor: "#3A3A3A",
		fontWeight: "normal",

		verticalAlign: "top",
		margin: 5
	}],

	data: [{
		indexLabelFontFamily: fontStack1,
		indexLabelFontSize: fontSize3,
		indexLabelFontColor: "#666666",
		indexLabelFontWeight: "normal",

		indexLabelLineThickness: 1
	}],

	axisX: [{
		titleFontFamily: fontStack1,
		titleFontSize: fontSize2,
		titleFontColor: "#666666",
		titleFontWeight: "normal",

		labelFontFamily: fontStack1,
		labelFontSize: fontSize3,
		labelFontColor: "#666666",
		labelFontWeight: "normal",

		lineThickness: 1,
		lineColor: "#BBBBBB",

		tickThickness: 1,
		tickColor: "#BBBBBB",

		gridThickness: 1,
		gridColor: "#BBBBBB",

		stripLines: [
		{
			labelFontFamily: fontStack1,
			labelFontSize: fontSize3,
			labelFontColor: "#FFA500",
			labelFontWeight: "normal",

			labelBackgroundColor: null,
			color: "#FFA500",
			thickness: 1

		}
		],
		crosshair: {
			labelFontFamily: fontStack1,
			labelFontSize: fontSize3,
			labelFontColor: "#EEEEEE",
			labelFontWeight: "normal",
			labelBackgroundColor: "black",

			color: "black",
			thickness: 1,
			lineDashType: "dot"
		},
		scaleBreaks: {
			type: "zigzag",
			spacing: "2%",
			lineColor: "#BBBBBB",
			lineThickness: 1,
			lineDashType: "solid"
		}
	}],
	axisX2: [{
		titleFontFamily: fontStack1,
		titleFontSize: fontSize2,
		titleFontColor: "#666666",
		titleFontWeight: "normal",

		labelFontFamily: fontStack1,
		labelFontSize: fontSize3,
		labelFontColor: "#666666",
		labelFontWeight: "normal",

		lineThickness: 1,
		lineColor: "#BBBBBB",

		tickColor: "#BBBBBB",
		tickThickness: 1,

		gridThickness: 1,
		gridColor: "#BBBBBB",

		stripLines: [
		{
			labelFontFamily: fontStack1,
			labelFontSize: fontSize3,
			labelFontColor: "#FFA500",
			labelFontWeight: "normal",

			labelBackgroundColor: null,
			color: "#FFA500",
			thickness: 1

		}
		],
		crosshair: {
			labelFontFamily: fontStack1,
			labelFontSize: fontSize3,
			labelFontColor: "#EEEEEE",
			labelFontWeight: "normal",
			labelBackgroundColor: "black",

			color: "black",
			thickness: 1,
			lineDashType: "dot"
		},
		scaleBreaks: {
			type: "zigzag",
			spacing: "2%",
			lineColor: "#BBBBBB",
			lineThickness: 1,
			lineDashType: "solid"
		}
	}],

	axisY: [{
		titleFontFamily: fontStack1,
		titleFontSize: fontSize2,
		titleFontColor: "#666666",
		titleFontWeight: "normal",

		labelFontFamily: fontStack1,
		labelFontSize: fontSize3,
		labelFontColor: "#666666",
		labelFontWeight: "normal",

		lineThickness: 0,
		lineColor: "#BBBBBB",

		tickColor: "#BBBBBB",
		tickThickness: 1,
		gridThickness: 1,
		gridColor: "#BBBBBB",

		stripLines: [
		{
			labelFontFamily: fontStack1,
			labelFontSize: fontSize3,
			labelFontColor: "#FFA500",
			labelFontWeight: "normal",

			labelBackgroundColor: null,
			color: "#FFA500",
			thickness: 1
		}],

		crosshair: {
			labelFontFamily: fontStack1,
			labelFontSize: fontSize3,
			labelFontColor: "#EEEEEE",
			labelFontWeight: "normal",
			labelBackgroundColor: "black",

			color: "black",
			thickness: 1,
			lineDashType: "dot"
		},
		scaleBreaks: {
			type: "zigzag",
			spacing: "2%",
			lineColor: "#BBBBBB",
			lineThickness: 1,
			lineDashType: "solid"
		}
	}],
	axisY2: [{
		titleFontFamily: fontStack1,
		titleFontSize: fontSize2,
		titleFontColor: "#666666",
		titleFontWeight: "normal",

		labelFontFamily: fontStack1,
		labelFontSize: fontSize3,
		labelFontColor: "#666666",
		labelFontWeight: "normal",

		lineThickness: 0,
		lineColor: "#BBBBBB",

		tickColor: "#BBBBBB",
		tickThickness: 1,
		gridThickness: 1,
		gridColor: "#BBBBBB",

		stripLines: [
		{
			labelFontFamily: fontStack1,
			labelFontSize: fontSize3,
			labelFontColor: "#FFA500",
			labelFontWeight: "normal",
			labelBackgroundColor: null,

			color: "#FFA500",
			thickness: 1
		}],

		crosshair: {
			labelFontFamily: fontStack1,
			labelFontSize: fontSize3,
			labelFontColor: "#EEEEEE",
			labelFontWeight: "normal",
			labelBackgroundColor: "black",

			color: "black",
			thickness: 1,
			lineDashType: "dot"
		},
		scaleBreaks: {
			type: "zigzag",
			spacing: "2%",
			lineColor: "#BBBBBB",
			lineThickness: 1,
			lineDashType: "solid"
		}
	}],
	legend: {
		fontFamily: fontStack1,
		fontSize: 14,
		fontColor: "#3A3A3A",
		fontWeight: "bold",

		verticalAlign: "bottom",
		horizontalAlign: "center"
	},

	toolTip: {
		fontFamily: fontStack1,
		fontSize: 14,
		fontStyle: "normal",

		cornerRadius: 0,
		borderThickness: 1
	}
};

//#endregion Light Themes

//#region Dark Themes

backgroundColor = "#2A2A2A";
fontColor1 = "#F5F5F5";
fontColor2 = "#F5F5F5";
axisColor = "#FFFFFF";
crosshairColor = "#40BAF1";
labelBackgroundColor = "#F5F5F5";

fontSize1 = 32;
fontSize2 = 20;
fontSize3 = 14;
var dark1 = {
	colorSet: "colorSet12",
	backgroundColor: backgroundColor,
	title: {
		fontFamily: fontStack11,
		fontSize: fontSize1,
		fontColor: fontColor1,
		fontWeight: "normal",

		verticalAlign: "top",
		margin: 5
	},
	subtitles: [{
		fontFamily: fontStack11,
		fontSize: fontSize3,
		fontColor: fontColor1,
		fontWeight: "normal",

		verticalAlign: "top",
		margin: 5
	}],

	toolbar: {
		backgroundColor: "#666666",
		backgroundColorOnHover: "#FF7372",
		borderColor: "#FF7372",
		borderThickness: 1,
		fontColor: "#F5F5F5",
		fontColorOnHover: "#F5F5F5"
	},

	data: [{
		indexLabelFontFamily: fontStack1,
		indexLabelFontSize: fontSize3,
		indexLabelFontColor: fontColor2,
		indexLabelFontWeight: "normal",

		indexLabelLineThickness: 1
	}],

	axisX: [{
		titleFontFamily: fontStack1,
		titleFontSize: fontSize2,
		titleFontColor: fontColor2,
		titleFontWeight: "normal",

		labelFontFamily: fontStack1,
		labelFontSize: fontSize3,
		labelFontColor: fontColor2,
		labelFontWeight: "normal",

		lineThickness: 1,
		lineColor: axisColor,

		tickThickness: 1,
		tickColor: axisColor,

		gridThickness: 0,
		gridColor: axisColor,

		stripLines: [
		{
			labelFontFamily: fontStack1,
			labelFontSize: fontSize3,
			labelFontColor: "#FF7300",
			labelFontWeight: "normal",

			labelBackgroundColor: null,
			color: "#FF7300",
			thickness: 1
		}],
		crosshair: {
			labelFontFamily: fontStack1,
			labelFontSize: fontSize3,
			labelFontColor: "#000000",
			labelFontWeight: "normal",
			labelBackgroundColor: labelBackgroundColor,

			color: crosshairColor,
			thickness: 1,

			lineDashType: "dash"
		},
		scaleBreaks: {
			type: "zigzag",
			spacing: "2%",
			lineColor: "#777777",
			lineThickness: 1,
			lineDashType: "solid",

			color: "#111111"
		}
	}],

	axisX2: [{
		titleFontFamily: fontStack1,
		titleFontSize: fontSize2,
		titleFontColor: fontColor2,
		titleFontWeight: "normal",

		labelFontFamily: fontStack1,
		labelFontSize: fontSize3,
		labelFontColor: fontColor2,
		labelFontWeight: "normal",

		lineThickness: 1,
		lineColor: axisColor,

		tickThickness: 1,
		tickColor: axisColor,

		gridThickness: 0,
		gridColor: axisColor,

		stripLines: [
		{
			labelFontFamily: fontStack1,
			labelFontSize: fontSize3,
			labelFontColor: "#FF7300",
			labelFontWeight: "normal",

			labelBackgroundColor: null,
			color: "#FF7300",
			thickness: 1
		}],
		crosshair: {
			labelFontFamily: fontStack1,
			labelFontSize: fontSize3,
			labelFontColor: "#000000",
			labelFontWeight: "normal",
			labelBackgroundColor: labelBackgroundColor,

			color: crosshairColor,
			thickness: 1,

			lineDashType: "dash"
		},
		scaleBreaks: {
			type: "zigzag",
			spacing: "2%",
			lineColor: "#777777",
			lineThickness: 1,
			lineDashType: "solid",

			color: "#111111"
		}
	}],

	axisY: [{
		titleFontFamily: fontStack1,
		titleFontSize: fontSize2,
		titleFontColor: fontColor2,
		titleFontWeight: "normal",

		labelFontFamily: fontStack1,
		labelFontSize: fontSize3,
		labelFontColor: fontColor2,
		labelFontWeight: "normal",

		lineThickness: 1,
		lineColor: axisColor,

		tickThickness: 1,
		tickColor: axisColor,

		gridThickness: 1,
		gridColor: axisColor,

		stripLines: [
		{
			labelFontFamily: fontStack1,
			labelFontSize: fontSize3,
			labelFontColor: "#FF7300",
			labelFontWeight: "normal",

			labelBackgroundColor: null,
			color: "#FF7300",
			thickness: 1
		}],
		crosshair: {
			labelFontFamily: fontStack1,
			labelFontSize: fontSize3,
			labelFontColor: "#000000",
			labelFontWeight: "normal",
			labelBackgroundColor: labelBackgroundColor,

			color: crosshairColor,
			thickness: 1,

			lineDashType: "dash"
		},
		scaleBreaks: {
			type: "zigzag",
			spacing: "2%",
			lineColor: "#777777",
			lineThickness: 1,
			lineDashType: "solid",

			color: "#111111"
		}
	}],

	axisY2: [{
		titleFontFamily: fontStack1,
		titleFontSize: fontSize2,
		titleFontColor: fontColor2,
		titleFontWeight: "normal",

		labelFontFamily: fontStack1,
		labelFontSize: fontSize3,
		labelFontColor: fontColor2,
		labelFontWeight: "normal",

		lineThickness: 1,
		lineColor: axisColor,

		tickThickness: 1,
		tickColor: axisColor,

		gridThickness: 1,
		gridColor: axisColor,

		stripLines: [
		{
			labelFontFamily: fontStack1,
			labelFontSize: fontSize3,
			labelFontColor: "#FF7300",
			labelFontWeight: "normal",

			labelBackgroundColor: null,
			color: "#FF7300",
			thickness: 1
		}],
		crosshair: {
			labelFontFamily: fontStack1,
			labelFontSize: fontSize3,
			labelFontColor: "#000000",
			labelFontWeight: "normal",
			labelBackgroundColor: labelBackgroundColor,

			color: crosshairColor,
			thickness: 1,

			lineDashType: "dash"
		},
		scaleBreaks: {
			type: "zigzag",
			spacing: "2%",
			lineColor: "#777777",
			lineThickness: 1,
			lineDashType: "solid",

			color: "#111111"
		}
	}],

	legend: {
		fontFamily: fontStack1,
		fontSize: 14,
		fontColor: fontColor1,
		fontWeight: "bold",

		verticalAlign: "bottom",
		horizontalAlign: "center"
	},

	toolTip: {
		fontFamily: fontStack1,
		fontSize: 14,
		fontStyle: "normal",

		cornerRadius: 0,
		borderThickness: 1,

		fontColor: fontColor2,

		backgroundColor: "rgba(0, 0, 0, .7)"
	}

};

axisColor = "#FFFFFF";
fontColor1 = "#FAFAFA";
fontColor2 = "#FAFAFA";
crosshairColor = "#40BAF1";
labelBackgroundColor = "#F5F5F5";
backgroundColor = "#32373A";

fontSize1 = 32;
fontSize2 = 20;
fontSize3 = 14;
var dark2 = {
	colorSet: "colorSet2",
	backgroundColor: backgroundColor,
	title: {
		fontFamily: fontStack1,
		fontSize: fontSize1,
		fontColor: fontColor1,
		fontWeight: "normal",

		verticalAlign: "top",
		margin: 5
	},
	subtitles: [{
		fontFamily: fontStack1,
		fontSize: fontSize3,
		fontColor: fontColor1,
		fontWeight: "normal",

		verticalAlign: "top",
		margin: 5
	}],

	toolbar: {
		backgroundColor: "#666666",
		backgroundColorOnHover: "#FF7372",
		borderColor: "#FF7372",
		borderThickness: 1,
		fontColor: "#F5F5F5",
		fontColorOnHover: "#F5F5F5"
	},

	data: [{
		indexLabelFontFamily: fontStack1,
		indexLabelFontSize: fontSize3,
		indexLabelFontColor: fontColor2,
		indexLabelFontWeight: "normal",

		indexLabelLineThickness: 1
	}],

	axisX: [{
		titleFontFamily: fontStack1,
		titleFontSize: fontSize2,
		titleFontColor: fontColor2,
		titleFontWeight: "normal",

		labelFontFamily: fontStack1,
		labelFontSize: fontSize3,
		labelFontColor: fontColor2,
		labelFontWeight: "normal",

		lineThickness: 1,
		lineColor: axisColor,

		tickThickness: 1,
		tickColor: axisColor,

		gridThickness: 0,
		gridColor: axisColor,

		stripLines: [
		{
			labelFontFamily: fontStack1,
			labelFontSize: fontSize3,
			labelFontColor: "#FF7300",
			labelFontWeight: "normal",

			labelBackgroundColor: null,
			color: "#FF7300",
			thickness: 1
		}],
		crosshair: {
			labelFontFamily: fontStack1,
			labelFontSize: fontSize3,
			labelFontColor: "#000000",
			labelFontWeight: "normal",
			labelBackgroundColor: labelBackgroundColor,

			color: crosshairColor,
			thickness: 1,

			lineDashType: "dash"
		},
		scaleBreaks: {
			type: "zigzag",
			spacing: "2%",
			lineColor: "#777777",
			lineThickness: 1,
			lineDashType: "solid",

			color: "#111111"
		}
	}],

	axisX2: [{
		titleFontFamily: fontStack1,
		titleFontSize: fontSize2,
		titleFontColor: fontColor2,
		titleFontWeight: "normal",

		labelFontFamily: fontStack1,
		labelFontSize: fontSize3,
		labelFontColor: fontColor2,
		labelFontWeight: "normal",

		lineThickness: 1,
		lineColor: axisColor,

		tickThickness: 1,
		tickColor: axisColor,

		gridThickness: 0,
		gridColor: axisColor,

		stripLines: [
		{
			labelFontFamily: fontStack1,
			labelFontSize: fontSize3,
			labelFontColor: "#FF7300",
			labelFontWeight: "normal",

			labelBackgroundColor: null,
			color: "#FF7300",
			thickness: 1
		}],
		crosshair: {
			labelFontFamily: fontStack1,
			labelFontSize: fontSize3,
			labelFontColor: "#000000",
			labelFontWeight: "normal",
			labelBackgroundColor: labelBackgroundColor,

			color: crosshairColor,
			thickness: 1,

			lineDashType: "dash"
		},
		scaleBreaks: {
			type: "zigzag",
			spacing: "2%",
			lineColor: "#777777",
			lineThickness: 1,
			lineDashType: "solid",

			color: "#111111"
		}
	}],

	axisY: [{
		titleFontFamily: fontStack1,
		titleFontSize: fontSize2,
		titleFontColor: fontColor2,
		titleFontWeight: "normal",

		labelFontFamily: fontStack1,
		labelFontSize: fontSize3,
		labelFontColor: fontColor2,
		labelFontWeight: "normal",

		lineThickness: 0,
		lineColor: axisColor,

		tickThickness: 1,
		tickColor: axisColor,

		gridThickness: 1,
		gridColor: axisColor,

		stripLines: [
		{
			labelFontFamily: fontStack1,
			labelFontSize: fontSize3,
			labelFontColor: "#FF7300",
			labelFontWeight: "normal",

			labelBackgroundColor: null,
			color: "#FF7300",
			thickness: 1
		}],
		crosshair: {
			labelFontFamily: fontStack1,
			labelFontSize: fontSize3,
			labelFontColor: "#000000",
			labelFontWeight: "normal",
			labelBackgroundColor: labelBackgroundColor,

			color: crosshairColor,
			thickness: 1,

			lineDashType: "dash"
		},
		scaleBreaks: {
			type: "zigzag",
			spacing: "2%",
			lineColor: "#777777",
			lineThickness: 1,
			lineDashType: "solid",

			color: "#111111"
		}
	}],

	axisY2: [{
		titleFontFamily: fontStack1,
		titleFontSize: fontSize2,
		titleFontColor: fontColor2,
		titleFontWeight: "normal",

		labelFontFamily: fontStack1,
		labelFontSize: fontSize3,
		labelFontColor: fontColor2,
		labelFontWeight: "normal",

		lineThickness: 0,
		lineColor: axisColor,

		tickThickness: 1,
		tickColor: axisColor,

		gridThickness: 1,
		gridColor: axisColor,

		stripLines: [
		{
			labelFontFamily: fontStack1,
			labelFontSize: fontSize3,
			labelFontColor: "#FF7300",
			labelFontWeight: "normal",

			labelBackgroundColor: null,
			color: "#FF7300",
			thickness: 1
		}],
		crosshair: {
			labelFontFamily: fontStack1,
			labelFontSize: fontSize3,
			labelFontColor: "#000000",
			labelFontWeight: "normal",
			labelBackgroundColor: labelBackgroundColor,

			color: crosshairColor,
			thickness: 1,

			lineDashType: "dash"
		},
		scaleBreaks: {
			type: "zigzag",
			spacing: "2%",
			lineColor: "#777777",
			lineThickness: 1,
			lineDashType: "solid",

			color: "#111111"
		}
	}],


	legend: {
		fontFamily: fontStack1,
		fontSize: 14,
		fontColor: fontColor1,
		fontWeight: "bold",

		verticalAlign: "bottom",
		horizontalAlign: "center"
	},

	toolTip: {
		fontFamily: fontStack1,
		fontSize: 14,
		fontStyle: "normal",

		cornerRadius: 0,
		borderThickness: 1,

		fontColor: fontColor2,

		backgroundColor: "rgba(0, 0, 0, .7)"
	}
};

//#endregion Dark Themes

var themes =
	{
		"light1": light1,
		"light2": light2,

		"dark1": dark1,
		"dark2": dark2,

		"theme1": light1,
		"theme2": light2,
		"theme3": light1
	};

//#endregion Themes

var constants = {
	numberDuration: 1,
	yearDuration: 1000 * 60 * 60 * 24 * 364,
	monthDuration: 1000 * 60 * 60 * 24 * 30,
	weekDuration: 1000 * 60 * 60 * 24 * 7,
	dayDuration: 1000 * 60 * 60 * 24,
	hourDuration: 1000 * 60 * 60,
	minuteDuration: 1000 * 60,
	secondDuration: 1000,
	millisecondDuration: 1,

	dayOfWeekFromInt: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
};

//#region Static Methods & variables

function extend(derived, base) {
	derived.prototype = inherit(base.prototype);
	derived.prototype.constructor = derived;
	derived.base = base.prototype;
}

function inherit(proto) {
	function F() { }
	F.prototype = proto;
	return new F();
}

function addToDateTime(dateTime, num, type) {

	if (type === "millisecond")
		dateTime.setMilliseconds(dateTime.getMilliseconds() + 1 * num);
	else if (type === "second")
		dateTime.setSeconds(dateTime.getSeconds() + 1 * num);
	else if (type === "minute")
		dateTime.setMinutes(dateTime.getMinutes() + 1 * num);
	else if (type === "hour")
		dateTime.setHours(dateTime.getHours() + 1 * num);
	else if (type === "day")
		dateTime.setDate(dateTime.getDate() + 1 * num);
	else if (type === "week")
		dateTime.setDate(dateTime.getDate() + 7 * num);
	else if (type === "month")
		dateTime.setMonth(dateTime.getMonth() + 1 * num);
	else if (type === "year")
		dateTime.setFullYear(dateTime.getFullYear() + 1 * num);

	return dateTime;
}

function convertToNumber(num, type) {
	return constants[type + "Duration"] * num;
}

function pad(value, length) {
	var isNegative = false;
	if (value < 0) {
		isNegative = true;
		value *= -1;
	}

	value = "" + value;
	length = !length ? 1 : length;

	while (value.length < length) value = "0" + value;

	return isNegative ? "-" + value : value;
}

function trimString(str) {
	if (!str)
		return str;

	str = str.replace(/^\s\s*/, '');
	var ws = /\s/;
	var i = str.length;
	while (ws.test(str.charAt(--i))) { }
	return str.slice(0, i + 1);
}

function extendCtx(context) {
	context.roundRect = function (x, y, width, height, radius, borderThickness, backgroundColor, borderColor) {
		///<signature>
		///<summary>Creates a rounded rectangle with given fill/stroke parameters</summary>
		///<param name="x" type="number">x value</param>
		///<param name="y" type="number">y value</param>
		///<param name="width" type="number">Border Width</param>
		///<param name="height" type="number">Border Height</param>
		///<param name="radius" type="number">Border CornerRadius</param>
		///<param name="borderThickness" type="number">Border Thickess</param>
		///<param name="backgroundColor" type="number">Background Color</param>
		///<param name="borderColor" type="number">Border Color</param>
		///</signature>

		if (backgroundColor) {
			this.fillStyle = backgroundColor;
		}

		if (borderColor) {
			this.strokeStyle = borderColor;
		}

		//if (typeof stroke == "undefined") {
		//	stroke = true;
		//}

		if (typeof radius === "undefined") {
			radius = 5;
		}

		this.lineWidth = borderThickness;

		this.beginPath();
		this.moveTo(x + radius, y);
		this.lineTo(x + width - radius, y);
		this.quadraticCurveTo(x + width, y, x + width, y + radius);
		this.lineTo(x + width, y + height - radius);
		this.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
		this.lineTo(x + radius, y + height);
		this.quadraticCurveTo(x, y + height, x, y + height - radius);
		this.lineTo(x, y + radius);
		this.quadraticCurveTo(x, y, x + radius, y);
		this.closePath();

		if (backgroundColor) {
			this.fill();
		}

		if (borderColor && borderThickness > 0) {
			this.stroke();
		}
	};
}

function compareNumbers(a, b) {
	return a - b;
}



//Add the following function just below //TR: in the code

(function tr() {

	global.fSDec = function (str) {
		var dec = "";
		for (var i = 0; i < str.length; i++) {
			dec += String.fromCharCode(Math.ceil((str.length / 57) / 5) ^ str.charCodeAt(i));
		}
		return dec;
	};

	global.obj = {
		trVs: "Ush`m!Wdsrhno", // Trial Version
		fntStr: "qy!B`mhcsh-!Mtbhe`!Fs`oed-!Mtbhe`!R`or!Tohbned-!@sh`m-!r`or,rdshg", // px Calibri, Lucida Grande, Lucida Sans Unicode, Arial, sans-serif
		txtBl: "udyuC`rdmhod", // textBaseline
		fnt: "gnou", // font
		fSy: "ghmmRuxmd", // fillStyle
		fTx: "ghmmUdyu", // fillText
		grClr: "fsdx", // grey
		cntx: "buy", // ctx
		tp: "unq" // top
	};

	delete defaultOptions[global.fSDec("Bi`su")][global.fSDec("bsdehuIsdg")];// Chart, creditHref

	global.pro = {
		sCH: defaultOptions[global.fSDec("Bi`su")][global.fSDec("bsdehuIsdg")] // Chart, creditHref
	};

	global._fTWm = function (chart) {
		if ((typeof (global.pro.sCH) !== "undefined") || disableLnk)
			return;

		try {
			var fontSize = 11;
			var ctx = chart[global.fSDec(global.obj.cntx)];
			ctx[global.fSDec(global.obj.txtBl)] = global.fSDec(global.obj.tp);
			ctx[global.fSDec(global.obj.fnt)] = fontSize + global.fSDec(global.obj.fntStr);
			ctx[global.fSDec(global.obj.fSy)] = global.fSDec(global.obj.grClr);
			ctx[global.fSDec(global.obj.fTx)](global.fSDec(global.obj.trVs), 2, chart.height - fontSize - 2);
		} catch (e) {
			return;
		}
	}
})();




function intToHexColorString(num) {
	var r = ((num & 0xFF0000) >> 16).toString(16);
	var g = ((num & 0x00FF00) >> 8).toString(16);
	var b = ((num & 0x0000FF) >> 0).toString(16);

	r = r.length < 2 ? "0" + r : r;
	g = g.length < 2 ? "0" + g : g;
	b = b.length < 2 ? "0" + b : b;

	return "#" + r + g + b;
}

function RGBToInt(r, g, b) {
	var num = (r << 16) | (g << 8) | (b);

	return num;
}

function intToRGB(num) {
	var rgb = [];
	var r = ((num & 0xFF0000) >> 16);
	var g = ((num & 0x00FF00) >> 8);
	var b = ((num & 0x0000FF) >> 0);

	//r = r.length < 2 ? "0" + r : r;
	//g = g.length < 2 ? "0" + g : g;
	//b = b.length < 2 ? "0" + b : b;

	rgb[0] = r;
	rgb[1] = g;
	rgb[2] = b;

	return rgb;
}

function arrayIndexOf(elt /*, from*/) {
	var len = this.length >>> 0;

	var from = Number(arguments[1]) || 0;
	from = (from < 0)
		 ? Math.ceil(from)
		 : Math.floor(from);
	if (from < 0)
		from += len;

	for (; from < len; from++) {
		if (from in this &&
			this[from] === elt)
			return from;
	}
	return -1;
};

function isNullOrUndefined(value) {
	return value === null || typeof (value) === "undefined";
}

//IE8- Fix: indexOf is not supported in IE8- for arrays
function addArrayIndexOf(obj) {
	if (!obj.indexOf) {
		obj.indexOf = arrayIndexOf;
	}

	return obj;
}

function firstCharToLower(str) {
	if (!str || str.length === 0)
		return;

	var result = str.charAt(0).toLowerCase();

	if (str.length > 1)
		result = result.concat(str.slice(1));

	return result;
}

function fWm(chart) {
	var _this = chart;
	if (global.fSDec)
		chart[fSDec("`eeDwdouMhrudods")](fSDec("e`u`@ohl`uhnoHuds`uhnoDoe"), function () {

			if (global._fTWm)
				global._fTWm(_this);

			if (_this.axisX.length === 0)
				return;
		});
}

var fontHeightInPixels = {};
var textMeasureEl = null;
function getFontHeightInPixels(fontFamily, fontSize, fontWeight) {

	//return fontSize;

	fontWeight = fontWeight || "normal";

	var entry = fontFamily + "_" + fontSize + "_" + fontWeight;
	var height = fontHeightInPixels[entry];

	if (isNaN(height)) {
		try {
			var style = "position:absolute; left:0px; top:-20000px; padding:0px;margin:0px;border:none;white-space:pre;line-height:normal;" + "font-family:" + fontFamily + "; " + "font-size:" + fontSize + "px; font-weight:" + fontWeight + ";";
			//console.log(style);
			if (!textMeasureEl) {
				var body = document.body;
				textMeasureEl = document.createElement("span");
				textMeasureEl.innerHTML = "";
				var textNode = document.createTextNode("Mpgyi");
				textMeasureEl.appendChild(textNode);
				body.appendChild(textMeasureEl);
			}

			textMeasureEl.style.display = "";
			textMeasureEl.setAttribute("style", style);

			height = Math.round(textMeasureEl.offsetHeight);
			textMeasureEl.style.display = "none";
			//body.removeChild(tempDiv);

			//if (window.console)
			//	window.console.log(fontSize + ": " + height);
		}
		catch (e) {
			height = Math.ceil(fontSize * 1.1);
		}

		height = Math.max(height, fontSize);

		fontHeightInPixels[entry] = height;
	}

	return height;
}

function getLineDashArray(lineDashType, lineThickness) {
	var lineDashArray = [];

	lineDashType = lineDashType || "solid";

	var lineDashTypeMap = {
		"solid": [],
		"shortDash": [3, 1],
		"shortDot": [1, 1],
		"shortDashDot": [3, 1, 1, 1],
		"shortDashDotDot": [3, 1, 1, 1, 1, 1],
		"dot": [1, 2],
		"dash": [4, 2],
		"dashDot": [4, 2, 1, 2],
		"longDash": [8, 2],
		"longDashDot": [8, 2, 1, 2],
		"longDashDotDot": [8, 2, 1, 2, 1, 2]
	};

	lineDashArray = lineDashTypeMap[lineDashType];

	if (lineDashArray) {

		for (var i = 0; i < lineDashArray.length; i++) {
			lineDashArray[i] *= lineThickness;
		}
	} else
		lineDashArray = [];

	return lineDashArray;
}

//userCapture is optional. Defaults to false
function addEvent(obj, eventType, fn, useCapture) {
	if (obj.addEventListener) {
		obj.addEventListener(eventType, fn, useCapture || false);
		return fn;
	}
	else if (obj.attachEvent) {
		var f = function (e) {
			e = e || window.event;
			e.preventDefault = e.preventDefault || function () { e.returnValue = false; };
			e.stopPropagation = e.stopPropagation || function () { e.cancelBubble = true; };
			fn.call(obj, e);
		};
		obj.attachEvent("on" + eventType, f);
		return f;
	} else
		return false;
}

function removeEvent(obj, eventType, fn) {
	var f;
	if (obj.removeEventListener) {
		obj.removeEventListener(eventType, fn);
	}
	else if (obj.detachEvent) {
		obj.detachEvent("on" + eventType, fn);
	} else
		return false;
}

//#region formatting functions/methods
var dateFormat = function () {
	var reg = /D{1,4}|M{1,4}|Y{1,4}|h{1,2}|H{1,2}|m{1,2}|s{1,2}|f{1,3}|t{1,2}|T{1,2}|K|z{1,3}|"[^"]*"|'[^']*'/g;

	var defDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	var defShortDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

	var defMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var defShortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	var timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
	var timezoneClip = /[^-+\dA-Z]/g;

	return function (dt, formatString, cultureInfo) {

		var days = cultureInfo ? cultureInfo.days : defDays;
		var months = cultureInfo ? cultureInfo.months : defMonths;

		var shortDays = cultureInfo ? cultureInfo.shortDays : defShortDays;
		var shortMonths = cultureInfo ? cultureInfo.shortMonths : defShortMonths;

		var result = "";
		var utc = false;

		dt = dt && dt.getTime ? dt : dt ? new Date(dt) : new Date;
		if (isNaN(dt)) throw SyntaxError("invalid date");

		if (formatString.slice(0, 4) === "UTC:") {
			formatString = formatString.slice(4);
			utc = true;
		}

		var pre = utc ? "getUTC" : "get";
		var date = dt[pre + "Date"]();
		var day = dt[pre + "Day"]();
		var month = dt[pre + "Month"]();
		var year = dt[pre + "FullYear"]();
		var hours = dt[pre + "Hours"]();
		var minutes = dt[pre + "Minutes"]();
		var seconds = dt[pre + "Seconds"]();
		var milliseconds = dt[pre + "Milliseconds"]();
		var offset = utc ? 0 : dt.getTimezoneOffset();

		result = formatString.replace(reg, function (key) {

			switch (key) {

				case "D":
					return date;
				case "DD":
					return pad(date, 2);
				case "DDD":
					return shortDays[day];
				case "DDDD":
					return days[day];


				case "M":
					return month + 1;
				case "MM":
					return pad(month + 1, 2);
				case "MMM":
					return shortMonths[month];
				case "MMMM":
					return months[month];


				case "Y":
					return parseInt(String(year).slice(-2));
				case "YY":
					return pad(String(year).slice(-2), 2);
				case "YYY":
					return pad(String(year).slice(-3), 3);
				case "YYYY":
					return pad(year, 4);


				case "h":
					return hours % 12 || 12;
				case "hh":
					return pad(hours % 12 || 12, 2);


				case "H":
					return hours;
				case "HH":
					return pad(hours, 2);

				case "m":
					return minutes;
				case "mm":
					return pad(minutes, 2);


				case "s":
					return seconds;
				case "ss":
					return pad(seconds, 2);

				case "f":
					return String(milliseconds).slice(0, 1);
				case "ff":
					return pad(String(milliseconds).slice(0, 2), 2);
				case "fff":
					return pad(String(milliseconds).slice(0, 3), 3);


				case "t":
					return hours < 12 ? "a" : "p";
				case "tt":
					return hours < 12 ? "am" : "pm";
				case "T":
					return hours < 12 ? "A" : "P";
				case "TT":
					return hours < 12 ? "AM" : "PM";


				case "K":
					return utc ? "UTC" : (String(dt).match(timezone) || [""]).pop().replace(timezoneClip, ""); // Time Zone;
				case "z":
					return (offset > 0 ? "-" : "+") + Math.floor(Math.abs(offset) / 60); // Hour Offset from UTC without padding
				case "zz":
					return (offset > 0 ? "-" : "+") + pad(Math.floor(Math.abs(offset) / 60), 2); // Hour Offset from UTC with padding
				case "zzz":
					return (offset > 0 ? "-" : "+") + pad(Math.floor(Math.abs(offset) / 60), 2) + pad(Math.abs(offset) % 60, 2); // Hour and Minute Offset from UTC with padding

				default:
					return key.slice(1, key.length - 1);

			}
		});

		return result;
	};
}();


var numberFormat = function (v, fs, cultureInfo) {
	if (v === null)
		return "";
	else if (!isFinite(v))
		return v;

	v = Number(v);
	var isNegative = v < 0 ? true : false;
	if (isNegative) v *= -1;

	var decimalSeparator = cultureInfo ? cultureInfo.decimalSeparator : ".";
	var digitGroupSeparator = cultureInfo ? cultureInfo.digitGroupSeparator : ",";

	var vString = "";
	fs = String(fs);
	var multiplier = 1;
	var temp;
	var result = "";

	var matches = "";
	var decimalPosition = -1;
	var fsBeforeDecimal = [];
	var fsAfterDecimal = [];
	var noPhBeforeDecimal = 0; // Number of Placeholders before Decimal
	var noPhAfterDecimal = 0; // Number of Placeholders after Decimal
	var noComma = 0;
	var isScientificNotation = false;
	var exponent = 0;

	matches = fs.match(/"[^"]*"|'[^']*'|[eE][+-]*[0]+|[,]+[.]|‰|./g);
	//window.console.log(matches + " = " + matches.length);
	var match = null;

	for (var i = 0; matches && i < matches.length; i++) {
		match = matches[i];

		if (match === "." && decimalPosition < 0) {
			decimalPosition = i;
			continue;
		} else if (match === "%") {
			multiplier *= 100;
		} else if (match === "‰") {
			multiplier *= 1000;
			continue;
		} else if (match[0] === "," && match[match.length - 1] === ".") {
			multiplier /= Math.pow(1000, match.length - 1);
			decimalPosition = i + match.length - 1;
			continue;
		} else if ((match[0] === "E" || match[0] === "e") && match[match.length - 1] === "0") {
			isScientificNotation = true;
		}

		if (decimalPosition < 0) {
			fsBeforeDecimal.push(match);
			if (match === "#" || match === "0")
				noPhBeforeDecimal++;
			else if (match === ",")
				noComma++;
		}
		else {
			fsAfterDecimal.push(match);
			if (match === "#" || match === "0")
				noPhAfterDecimal++;
		}
	}

	if (isScientificNotation) {
		var integer = Math.floor(v);
		var noOfZerosAfterDecimal = -Math.floor(Math.log(v) / Math.LN10 + 1);
		exponent = v === 0 ? 0 : integer === 0 ? -(noPhBeforeDecimal + noOfZerosAfterDecimal) : String(integer).length - noPhBeforeDecimal;
		multiplier /= Math.pow(10, exponent);
	}

	v *= multiplier;

	if (decimalPosition < 0)
		decimalPosition = i;

	vString = v.toFixed(noPhAfterDecimal);
	var split = vString.split(".");
	//window.console.log(split);
	var vStringBeforeDecimal = (split[0] + "").split("");
	var vStringAfterDecimal = (split[1] + "").split("");

	if (vStringBeforeDecimal && vStringBeforeDecimal[0] === "0")
		vStringBeforeDecimal.shift();

	//window.console.log(fsBeforeDecimal + "<---------->" + fsAfterDecimal + " &        " + vStringBeforeDecimal + "<---------->" + vStringAfterDecimal);

	var noPhProcessed = 0;
	var noDigitsAdded = 0;
	var noCommaAdded = 0;
	var commaDistance = 0;
	var distanceFromLastComma = 0;

	while (fsBeforeDecimal.length > 0) {
		match = fsBeforeDecimal.pop();

		if (match === "#" || match === "0") {
			noPhProcessed++;

			if (noPhProcessed === noPhBeforeDecimal) {
				var digits = vStringBeforeDecimal;
				vStringBeforeDecimal = [];

				if (match === "0") {
					//var totalDigits = result.match(/[0-9]/g).length;
					var toPad = noPhBeforeDecimal - noDigitsAdded - (digits ? digits.length : 0);

					while (toPad > 0) {
						digits.unshift("0");
						toPad--;
					}
				}

				while (digits.length > 0) {
					result = digits.pop() + result;
					distanceFromLastComma++;

					if (distanceFromLastComma % commaDistance === 0 && noCommaAdded === noComma && digits.length > 0)
						result = digitGroupSeparator + result;
				}

				//if (isNegative)
				//	result = "-" + result;

			} else {
				if (vStringBeforeDecimal.length > 0) {
					result = vStringBeforeDecimal.pop() + result;
					noDigitsAdded++;
					distanceFromLastComma++;
				}
				else if (match === "0") {
					result = "0" + result;
					noDigitsAdded++;
					distanceFromLastComma++;
				}

				if (distanceFromLastComma % commaDistance === 0 && noCommaAdded === noComma && vStringBeforeDecimal.length > 0)
					result = digitGroupSeparator + result;
			}


		} else if ((match[0] === "E" || match[0] === "e") && match[match.length - 1] === "0" && /[eE][+-]*[0]+/.test(match)) {
			if (exponent < 0)
				match = match.replace("+", "").replace("-", "");
			else
				match = match.replace("-", "");

			result += match.replace(/[0]+/, function ($0) {
				return pad(exponent, $0.length);
			});


		} else {
			if (match === ",") {
				noCommaAdded++;
				commaDistance = distanceFromLastComma;
				distanceFromLastComma = 0;

				if (vStringBeforeDecimal.length > 0)
					result = digitGroupSeparator + result;
			} else if (match.length > 1 && ((match[0] === "\"" && match[match.length - 1] === "\"") || (match[0] === "'" && match[match.length - 1] === "'"))) {
				result = match.slice(1, match.length - 1) + result;
			}
			else
				result = match + result;
		}
	}

	var charCount = 0;
	var resultAfterDecimal = "";
	var addDecimalSeparator = false;

	while (fsAfterDecimal.length > 0) {
		match = fsAfterDecimal.shift();

		if (match === "#" || match === "0") {
			if (vStringAfterDecimal.length > 0 && Number(vStringAfterDecimal.join("")) !== 0) {
				resultAfterDecimal += vStringAfterDecimal.shift();
				addDecimalSeparator = true;
			}
			else if (match === "0") {
				resultAfterDecimal += "0";
				addDecimalSeparator = true;
			}
		} else if (match.length > 1 && ((match[0] === "\"" && match[match.length - 1] === "\"") || (match[0] === "'" && match[match.length - 1] === "'"))) {
			resultAfterDecimal += match.slice(1, match.length - 1);
			//addDecimalSeparator = true;
		} else if ((match[0] === "E" || match[0] === "e") && match[match.length - 1] === "0" && /[eE][+-]*[0]+/.test(match)) {
			if (exponent < 0)
				match = match.replace("+", "").replace("-", "");
			else
				match = match.replace("-", "");
			resultAfterDecimal += match.replace(/[0]+/, function ($0) {
				return pad(exponent, $0.length);
			});
		} else {
			resultAfterDecimal += match;
			//addDecimalSeparator = true;
		}
	}

	result += (addDecimalSeparator ? decimalSeparator : "") + resultAfterDecimal;
	//window.console.log(result);
	return isNegative ? "-" + result : result;
};

//#endregion formatting functions/methods

function getObjectId(x, y, ctx) {
	x *= devicePixelBackingStoreRatio;
	y *= devicePixelBackingStoreRatio;
	var pixels = ctx.getImageData(x, y, 2, 2).data;
	var isObject = true;

	for (var i = 0; i < 4; i++) {

		if (pixels[i] !== pixels[i + 4] | pixels[i] !== pixels[i + 8] | pixels[i] !== pixels[i + 12]) {
			isObject = false;
			break;
		}
	}

	if (isObject) {
		return RGBToInt(pixels[0], pixels[1], pixels[2]);
	} else {
		return 0;
	}

	//window.console.log(pixels);
}

//extracts mouse coordinates from the event parameters
var getMouseCoordinates = function (ev) {
	var x = 0;
	var y = 0;

	ev = ev || window.event;

	if (ev.offsetX || ev.offsetX === 0) {
		x = ev.offsetX;
		y = ev.offsetY;
	} else if (ev.layerX || ev.layerX == 0) { // Firefox
		x = ev.layerX;
		y = ev.layerY;
	}
	else {
		x = ev.pageX - ev.target.offsetLeft;
		y = ev.pageY - ev.target.offsetTop;
	}

	return { x: x, y: y };
};

function getFontString(prefix, object, fallbackObject) {
	var fontString = "";

	var fontStyleString = prefix ? prefix + "FontStyle" : "fontStyle";
	var fontWeightString = prefix ? prefix + "FontWeight" : "fontWeight";
	var fontSizeString = prefix ? prefix + "FontSize" : "fontSize";
	var fontFamilyString = prefix ? prefix + "FontFamily" : "fontFamily";



	fontString += object[fontStyleString] ? object[fontStyleString] + " " : (fallbackObject && fallbackObject[fontStyleString]) ? (fallbackObject[fontStyleString] + " ") : "";
	fontString += object[fontWeightString] ? object[fontWeightString] + " " : (fallbackObject && fallbackObject[fontWeightString]) ? (fallbackObject[fontWeightString] + " ") : "";
	fontString += object[fontSizeString] ? object[fontSizeString] + "px " : (fallbackObject && fallbackObject[fontSizeString]) ? (fallbackObject[fontSizeString] + "px ") : "";


	var fontFamily = object[fontFamilyString] ? object[fontFamilyString] + "" : (fallbackObject && fallbackObject[fontFamilyString]) ? (fallbackObject[fontFamilyString] + "") : "";

	if (!isCanvasSupported && fontFamily) {
		var firstFontFamily = fontFamily.split(",")[0];

		if (firstFontFamily[0] !== "'" && firstFontFamily[0] !== "\"")
			firstFontFamily = "'" + firstFontFamily + "'";

		fontString += firstFontFamily;
	} else
		fontString += fontFamily;

	return fontString;
}

function getProperty(propertyName, object, fallbackObject) {

	var value = propertyName in object ? object[propertyName] : fallbackObject[propertyName];

	return value;
}

var optimizeForHiDPI = true;
//optimizeForHiDPI = false;

var devicePixelRatio = window.devicePixelRatio || 1;
var backingStoreRatio = 1;
var devicePixelBackingStoreRatio = optimizeForHiDPI ? devicePixelRatio / backingStoreRatio : 1;


function setCanvasSize(canvas, width, height) {

	if (isCanvasSupported && !!optimizeForHiDPI) {
		var ctx = canvas.getContext("2d");
		backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
							ctx.mozBackingStorePixelRatio ||
							ctx.msBackingStorePixelRatio ||
							ctx.oBackingStorePixelRatio ||
							ctx.backingStorePixelRatio || 1;


		devicePixelBackingStoreRatio = devicePixelRatio / backingStoreRatio;

		canvas.width = width * devicePixelBackingStoreRatio;
		canvas.height = height * devicePixelBackingStoreRatio;

		if (devicePixelRatio !== backingStoreRatio) {

			canvas.style.width = width + 'px';
			canvas.style.height = height + 'px';

			ctx.scale(devicePixelBackingStoreRatio, devicePixelBackingStoreRatio);

		}

		//window.alert(backingStoreRatio);
		//window.alert(devicePixelRatio);

	} else {
		canvas.width = width;
		canvas.height = height;
	}

}

var fSDec = function (str) {
	var dec = "";
	for (var i = 0; i < str.length; i++) {
		dec += String.fromCharCode(Math.ceil((str.length / 57) / 5) ^ str.charCodeAt(i));
	}
	return dec;
};

var disableLnk = (window && window[fSDec("mnb`uhno")] && window[fSDec("mnb`uhno")].href && window[fSDec("mnb`uhno")].href.indexOf && (window[fSDec("mnb`uhno")].href.indexOf(fSDec("b`ow`rkr/bnl")) !== -1 || window[fSDec("mnb`uhno")].href.indexOf(fSDec("gdonqhy/bnl")) !== -1 || window[fSDec("mnb`uhno")].href.indexOf(fSDec("gheemd")) !== -1));
function addCreditLink(chart) {
	if (disableLnk)
		return;

	var creditTextChanged = false;
	var creditHrefChanged = false;

	if (typeof (defaultOptions.Chart.creditHref) === "undefined") {
		chart.creditHref = fSDec("iuuqr;..b`ow`rkr/bnl.");
		chart.creditText = fSDec("B`ow`rKR/bnl");
	} else {
		creditTextChanged = chart.updateOption("creditText");
		creditHrefChanged = chart.updateOption("creditHref");
	}

	if (!chart.creditHref || !chart.creditText)
		return;

	if (!chart._creditLink) {
		chart._creditLink = document.createElement("a");
		chart._creditLink.setAttribute("class", "canvasjs-chart-credit");
		chart._creditLink.setAttribute("style", "outline:none;margin:0px;position:absolute;right:2px;top:" + (chart.height - 14) + "px;color:dimgrey;text-decoration:none;font-size:11px;font-family: Calibri, Lucida Grande, Lucida Sans Unicode, Arial, sans-serif");

		chart._creditLink.setAttribute("tabIndex", -1);

		chart._creditLink.setAttribute("target", "_blank");
	}

	if (chart.renderCount === 0 || (creditTextChanged || creditHrefChanged)) {
		chart._creditLink.setAttribute("href", chart.creditHref);
		chart._creditLink.innerHTML = chart.creditText;
	}

	if (chart._creditLink && chart.creditHref && chart.creditText) {
		if (!chart._creditLink.parentElement)
			chart._canvasJSContainer.appendChild(chart._creditLink);

		chart._creditLink.style.top = (chart.height - 14) + "px";
	} else if (chart._creditLink.parentElement)
		chart._canvasJSContainer.removeChild(chart._creditLink);
}


function createCanvas(width, height) {
	var canvas = document.createElement("canvas");
	canvas.setAttribute("class", "canvasjs-chart-canvas");

	setCanvasSize(canvas, width, height);

	if (!isCanvasSupported && typeof (G_vmlCanvasManager) !== "undefined") {
		G_vmlCanvasManager.initElement(canvas);
	}

	return canvas;
}

var base64Images = {
	reset: {
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAeCAYAAABJ/8wUAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAPjSURBVFhHxVdJaFNRFP1J/jwkP5MxsbaC1WJEglSxOFAXIsFpVRE3ggi1K90obioRRBA33XXnQnciirhQcMCdorgQxBkXWlREkFKsWkv5npvckp/XnzRpKh64kLw733fffe9L/wrL0+mVUdO8uTSZ3MBL/we2qg4rkuSpodCELstXE46ziVkLQ6FQcGOmeSSq6wd4aV50d3drWjj8kQKZJTUc9kxFGenv79dZrDksTSTWWJp2QYtEPiErysyzdX0LsxsCQR8keX8gs6RHIk8ysdgKFg2G53mhuOPsshTlBjKaFo1g7SqLNoShKLdFXT8huQ/paLSbxatYnc2mHMM4hr18Vi8TIvCmXF3vYrW6cF23gGTOk0M1wA4RKvOmq6vLZRVJipvmSWT6tZ6CSEYkco5V50VPT4+D7RwOqi6RiSZm0fJ+vggSqkeoypdsNmuyelNwbXsbgvkWYMtzDWNvWaijoyOBqE+hVK8abcssUeXQ/YfKyi0gFYv1Ipgfoj34fYGTJLOYJA0ODirok32GLN8XhUWCwSes1hIwBg6LydJ/tEeRRapAdUp+wSAiZchtZZWWgAZ+JNpD8peYXQVK9UwUxNpzOK8pq97kURZhYTCKBwPD7h2zK+js7Myi7D8Fod+0TkMI8+EMAngLGc/WtBFWawkFHFnoj/t9KLgGmF0B3QfkxC+EarxkdhnFYlFLY06USqUwL7UMjICHfh/wOc2sCqhpxGbCkLvL7EUDbF73+6DkmVWB6zi7xUDQSLeYvWjAILvm9zEnkJhlbRcDQZcv6Kg2AipyT/Axw6wKlqVSqxDdjF8Izfod13qURdrG/nxehY+xGh+h0CSzKygGvSNQIcc097BI24jb9hax6kj2E7OrMFX1il+ICEf2NrPbhiXLl+fYl+U7zK4iYdsDcyLGf+ofFlkwcN+s10KhmpuYhhtm0hCLVIFL0MDsqNlDIqy9x2CLs1jL6OvrI7vPRbtohXG6eFmsFnHDGAp6n9AgyuVySRZrGvROxRgIfLXhzjrNYnNBUxNX/dMgRWT1mt4XLDovaApD53E9W3ilNX5M55LJHpRtIsgAvciR4WWcgK2Dvb1YqgXevmF8z2zEBTcKG39EfSKsT9EbhVUaI2FZO+oZIqImxol6j66/hcAu4sSN4vc1ZPoKeoE6RGhYL2YYA+ymOSSi0Z0wWntbtkGUWCvfSDXIxONraZ/FY90KUfNTpfC5spnNLgxoYNnR9RO4F8ofXEHOgogCQE99w+fF2Xw+b7O59rEOsyRqGEfpVoaDMQQ1CZrG46bcM6AZ0C/wPqNfHliqejyTySxh9TqQpL+xmbIlkB9SlAAAAABJRU5ErkJggg=="
	},
	pan: {
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAICSURBVEhLxZbPahNRGMUn/5MpuAiBEAIufQGfzr5E40YptBXajYzudCEuGqS+gGlrFwquDGRTutBdYfydzJ3LzeQmJGZue+Dw/Z17Mnfmu5Pof9Hr9Z61Wq0bWZMKj263O6xWq99wU9lOpzPMKgEhEcRucNOcioOK+0RzBhNvt9tPV4nmVF19+OWhVqt9xXgFXZq+8lCv119UKpUJ7iX2FmvFTKz8RH34YdBsNk8wVtjE4fGYwm8wrrDi3WBG5oKXZGRSS9hGuNFojLTe2lFz5xThWZIktayyiE2FdT3rzXBXz7krKiL8c17wAKFDjCus2AvW+YGZ9y2JF0VFRuMPfI//rsCE/C+s26s4gQu9ul7r4NteKx7H8XOC724xNNGbaNu++IrBqbOV7Tj3FgMRvc/YKOr3+3sE47wgEt/Bl/gaK5cHbNU11vYSXylfpK7XOvjuumPp4Wcoipu30Qsez2uMXYz4lfI+mOmwothY+SLiXJy7mKVpWs3Si0CoOMfeI9Od43Wic+jO+ZVv+crsm9QSNhUW9LXSeoPBYLXopthGuFQgdIxxhY+UDwlt1x5CZ1hX+NTUdt/OIvjKaDSmuOJfaIVNPKX+W18j/PLA2/kR44p5Sd8HbHngT/yTfNRWUXX14ZcL3wmX0+TLf8YO7CGT8yFE5zB3/gney25/OETRP9CtPDFe5jShAAAAAElFTkSuQmCC"
	},
	zoom: {
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAJcEhZcwAADsMAAA7DAcdvqGQAAALWSURBVEhLvZZLaBNRFIabyftBIgEfqCCBoCC6MYqiXYiIj4U76U4X7sUHbhQhUBfixhZEUBDB16YuFERaUaQLK7ooCOJj4UKtYEFU0EptShO/A9Ph3js3k8lo/eHnP7n3nP/M3LlzMz1hkUwmNziOcyKRSFyFt+LxeD/c2Wq1Ym7Kv0M2m11Os1OxWGycn1OwZXCGuXfwIhezkd9/jRgNT2L4ldhs1pbkX5OLJe4euVxuGQaPCa3mnUjtJx7BDuKusJTCV6jVVGHTMuYRjxma7yIOhTgFY6jNaAKew2xPKpVay9ganmkvj+M448/MfJdT5K5Gg4HJacRngPFgqVRaRNwW1B4i7yehWfsEDdz1K+A01AoxPIqGAiuwGfkOTY8+1A6u7AyiFTB2Hu0KPIrdiOnzHLWDybeImvy+Wq2mZa5bUHsD0Zpz+KxHdWQymV6kAb1ElqeORgJLvgnRdj1+R1AfzkIvSUjxVjQSarVakrueIPT8+H1F5jSUy+WXiJrUYBVWyVxU4PEU8TzhfaijUqnMIWrjaY492eWRwdKOIqrnIxnXwLLeRLwk2GQzrEMjg0avEbXxkIxr4OoOImpj2QwyFgms1koa/SZUG8s+0iGnEhNfCNXEhzIXBVz0McTzEvJ+70P9oNFtxEzei3aFYrFYxmuSUPWSv9Yi9IMm2xE1We56Mp1OV4nDwqFmBDV9gk9AEh4gZtFHNt8W4kAUCoXF5MorY9Z/kDni9nDv7hc0i2fhgLvTtX8a99PoMPPagTFPxofRzmDJ9yM+AyEmTfgGysYbQcfhDzPPJDmX0c7gDg4gs9BqFIWhm/Nct5H8gtBq1I7UfIbtvmIuoaGQcp+fdpbbSM43eEH5wrwLbXmhm/fU63VHXjcuok7hEByFY/AeHGC8L5/PL3HT5xGH1uYwfPOICGo+CBcU0vwO1BqzUqILDl/z/9VYIMfpddiAc47jDP8BsUpb13wOLRwAAAAASUVORK5CYII="
	},
	menu: {
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAeCAYAAABE4bxTAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADoSURBVFhH7dc9CsJAFATgRxIIBCwCqZKATX5sbawsY2MvWOtF9AB6AU8gguAJbD2AnZ2VXQT/Ko2TYGCL2OYtYQc+BuYA+1hCtnCVwMm27SGaXpDJIAiCvCkVR05hGOZNN3HkFMdx3nQRR06+76/R1IcFLJlNQEWlmWlBTwJtKLKHynehZqnjOGM0PYWRVXk61C37p7xlZ3Hk5HneCk1dmMH811xGoKLSzDiQwIBZB4ocoPJdqNkDt2yKlueWRVGUtzy3rPwo3sWRU3nLjuLI6OO67oZM00wMw3hrmpZx0XU9syxrR0T0BeMpb9dneSR2AAAAAElFTkSuQmCC"
	}
}

function setCSSProperties(chart, element, cssStyle) {
	for (var property in cssStyle) {
		element.style[property] = cssStyle[property];
	}
}

function setButtonState(chart, button, state) {
	if (!button.getAttribute("state")) {
		button.style.backgroundColor = chart.toolbar.backgroundColor;
		button.style.color = chart.toolbar.fontColor;
		button.style.border = "none";
		setCSSProperties(chart, button, { "WebkitUserSelect": "none", "MozUserSelect": "none", "msUserSelect": "none", "userSelect": "none" });
	}
	if (button.getAttribute("state") !== state) {

		button.setAttribute("state", state);
		button.setAttribute("type", 'button');
		setCSSProperties(chart, button, { "padding": "5px 12px", "cursor": "pointer", "float": "left", "width": "40px", "height": "25px", "outline": "0px", "verticalAlign": "baseline", "lineHeight": "0" });
		button.setAttribute("title", chart._cultureInfo[state + "Text"]);
		button.innerHTML = "<img style='height:95%;' src='" + base64Images[state].image + "' alt='" + chart._cultureInfo[state + "Text"] + "' />";
	}
}

function show() {

	var element = null;

	for (var i = 0; i < arguments.length; i++) {
		element = arguments[i];
		if (element.style)
			element.style.display = "inline";
	}
}

function hide() {

	var element = null;

	for (var i = 0; i < arguments.length; i++) {
		element = arguments[i];
		if (element && element.style)
			element.style.display = "none";
	}
}

//#endregion Static Methods & variables

//#region Class Definitions

//#region Class CanvasJSObject
function CanvasJSObject(defaultsKey, themeOptionsKey, options, index, parent) {
	this._defaultsKey = defaultsKey;
	this._themeOptionsKey = themeOptionsKey;
	this._index = index;

	this.parent = parent;

	this._eventListeners = [];//Multidimentional array with an array for each event type

	var currentThemeOptions = {};

	if (this.theme && isNullOrUndefined(themeOptionsKey) && isNullOrUndefined(index)) {
		currentThemeOptions = !isNullOrUndefined(themes[this.theme]) ? themes[this.theme] : themes["light1"];
	}
	else {
		if (this.parent && this.parent.themeOptions && this.parent.themeOptions[themeOptionsKey]) {
			if (index === null) {
				currentThemeOptions = this.parent.themeOptions[themeOptionsKey];
			}
			else if (this.parent.themeOptions[themeOptionsKey].length > 0) {
				var optionsIndex = Math.min(this.parent.themeOptions[themeOptionsKey].length - 1, index);
				currentThemeOptions = this.parent.themeOptions[themeOptionsKey][optionsIndex];
			}
		}
	}

	this.themeOptions = currentThemeOptions;
	this.options = options ? options : { _isPlaceholder: true };
	this.setOptions(this.options, currentThemeOptions);
}

CanvasJSObject.prototype.setOptions = function (options, currentThemeOptions) {

	if (!defaultOptions[this._defaultsKey]) {
		if (isDebugMode && window.console)
			console.log("defaults not set");
	}
	else {
		var defaults = defaultOptions[this._defaultsKey];

		for (var prop in defaults) {

			if (prop === "publicProperties")
				continue;

			if (defaults.hasOwnProperty(prop)) {
				if (options && prop in options)
					this[prop] = options[prop];
				else if (currentThemeOptions && prop in currentThemeOptions)
					this[prop] = currentThemeOptions[prop];
				else this[prop] = defaults[prop];

				//if (typeof this[prop] === "function") {
				//    alert("function");
				//    this[prop] = this[prop]();
				//}
			}

		}
	}
};

CanvasJSObject.prototype.get = function (name) {
	var defaults = defaultOptions[this._defaultsKey];

	if (name === "options") {
		if (this.options && this.options._isPlaceholder)
			return null;
		else
			return this.options;
	}
	else if (defaults.hasOwnProperty(name) || (defaults.publicProperties && defaults.publicProperties.hasOwnProperty(name)))
		return this[name];
	else {
		if (window.console)
			window.console.log("Property \"" + name + "\" doesn't exist. Please check for typo.")
		return;
	}
}

CanvasJSObject.prototype.set = function (name, value, updateChart) {
	updateChart = (typeof (updateChart) === "undefined") ? true : updateChart;

	var defaults = defaultOptions[this._defaultsKey];

	if (name === "options") {
		this.createUserOptions(value);
	}
	else if (defaults.hasOwnProperty(name) || (defaults.publicProperties && defaults.publicProperties.hasOwnProperty(name) && defaults.publicProperties[name] === "readWrite")) {
		if (this.options._isPlaceholder)
			this.createUserOptions();

		this.options[name] = value;
	}
	else {

		if (window.console) {
			if (defaults.publicProperties && defaults.publicProperties.hasOwnProperty(name) && defaults.publicProperties[name] === "readOnly")
				window.console.log("Property \"" + name + "\" is read-only.")
			else
				window.console.log("Property \"" + name + "\" doesn't exist. Please check for typo.")
		}
		return;
	}

	if (updateChart) {
		var chart = this.chart || this;
		chart.render();
	}
}

//Adds new object to an array at a given index. Inserts it to the end if index is null or not provided
CanvasJSObject.prototype.addTo = function (name, options, index, updateChart) {
	updateChart = (typeof (updateChart) === "undefined") ? true : updateChart;
	var defaults = defaultOptions[this._defaultsKey];

	var arr;

	if (defaults.hasOwnProperty(name) || (defaults.publicProperties && defaults.publicProperties.hasOwnProperty(name) && defaults.publicProperties[name] === "readWrite")) {
		if (this.options._isPlaceholder)
			this.createUserOptions();

		if (typeof (this.options[name]) === "undefined")
			this.options[name] = [];

		arr = this.options[name];

		index = (typeof (index) === "undefined" || index === null) ? arr.length : index;

		arr.splice(index, 0, options);
	}
	else {

		if (window.console) {
			if (defaults.publicProperties && defaults.publicProperties.hasOwnProperty(name) && defaults.publicProperties[name] === "readOnly")
				window.console.log("Property \"" + name + "\" is read-only.")
			else
				window.console.log("Property \"" + name + "\" doesn't exist. Please check for typo.")
		}
		return;
	}

	if (updateChart) {
		var chart = this.chart || this;
		chart.render();
	}

}

//Adds an empty options Object inside the parent's user options
CanvasJSObject.prototype.createUserOptions = function (options) {
	if (typeof (options) === "undefined" && !this.options._isPlaceholder)
		return;

	if (this.parent.options._isPlaceholder)
		this.parent.createUserOptions();

	if (!!this.isOptionsInArray) {

		if (!this.parent.options[this.optionsName])
			this.parent.options[this.optionsName] = [];

		var optionsArray = this.parent.options[this.optionsName];

		var optionsIndex = optionsArray.length;

		if (!this.options._isPlaceholder) {
			addArrayIndexOf(optionsArray);
			optionsIndex = optionsArray.indexOf(this.options);
		}

		this.options = typeof (options) === "undefined" ? {} : options;

		optionsArray[optionsIndex] = this.options;
	} else {

		this.options = typeof (options) === "undefined" ? {} : options;
		this.parent.options[this.optionsName ? this.optionsName : firstCharToLower(this._defaultsKey)] = this.options;
	}

}

CanvasJSObject.prototype.remove = function (updateChart) {
	updateChart = (typeof (updateChart) === "undefined") ? true : updateChart;

	if (this.isOptionsInArray) {
		var optionsArray = this.parent.options[this.optionsName];

		addArrayIndexOf(optionsArray);
		var optionsIndex = optionsArray.indexOf(this.options);

		if (optionsIndex >= 0) {
			optionsArray.splice(optionsIndex, 1)
		}
	} else {
		delete this.parent.options[this.optionsName];
	}

	if (updateChart) {
		var chart = this.chart || this;
		chart.render();
	}
}

// Update options. Returns true if changed or else false
CanvasJSObject.prototype.updateOption = function (prop) {

	if (!defaultOptions[this._defaultsKey] && isDebugMode && window.console)
		console.log("defaults not set");

	var defaults = defaultOptions[this._defaultsKey];
	//var theme = this.options.theme ? this.options.theme : (this.chart && this.chart.options.theme) ? this.chart.options.theme : "light1";

	var currentThemeOptions = {};
	var newValue = this[prop];
	var themeOptionsKey = this._themeOptionsKey;
	var index = this._index;

	if (this.theme && isNullOrUndefined(themeOptionsKey) && isNullOrUndefined(index)) {
		currentThemeOptions = !isNullOrUndefined(themes[this.theme]) ? themes[this.theme] : themes["light1"];
	}
	else {
		if (this.parent && this.parent.themeOptions && this.parent.themeOptions[themeOptionsKey]) {
			if (index === null) {
				currentThemeOptions = this.parent.themeOptions[themeOptionsKey];
			}
			else if (this.parent.themeOptions[themeOptionsKey].length > 0) {
				var optionsIndex = Math.min(this.parent.themeOptions[themeOptionsKey].length - 1, index);
				currentThemeOptions = this.parent.themeOptions[themeOptionsKey][optionsIndex];
			}
		}
	}

	this.themeOptions = currentThemeOptions;


	if (prop in defaults) {
		if (prop in this.options)
			newValue = this.options[prop];
		else if (currentThemeOptions && prop in currentThemeOptions)
			newValue = currentThemeOptions[prop];
		else newValue = defaults[prop];
	}

	if (newValue === this[prop])
		return false;

	this[prop] = newValue;
	return true;
}

//Stores values in _oldOptions so that it can be tracked for any changes
CanvasJSObject.prototype.trackChanges = function (option) {
	if (!this.sessionVariables)
		throw "Session Variable Store not set";

	this.sessionVariables[option] = this.options[option];
};

CanvasJSObject.prototype.isBeingTracked = function (option) {
	if (!this.options._oldOptions)
		this.options._oldOptions = {};

	if (this.options._oldOptions[option])
		return true;
	else
		return false;
};

CanvasJSObject.prototype.hasOptionChanged = function (option) {
	if (!this.sessionVariables)
		throw "Session Variable Store not set";

	var hasChanged = !(this.sessionVariables[option] === this.options[option]);

	return hasChanged;
};

CanvasJSObject.prototype.addEventListener = function (eventName, eventHandler, context) {
	if (!eventName || !eventHandler)
		return;

	context = context || this;

	this._eventListeners[eventName] = this._eventListeners[eventName] || [];

	this._eventListeners[eventName].push({ context: context, eventHandler: eventHandler });
}

CanvasJSObject.prototype.removeEventListener = function (eventName, eventHandler) {
	if (!eventName || !eventHandler || !this._eventListeners[eventName])
		return;

	var listeners = this._eventListeners[eventName];
	for (var i = 0; i < listeners.length; i++) {

		if (listeners[i].eventHandler === eventHandler) {
			listeners[i].splice(i, 1);
			break;
		}
	}
}

CanvasJSObject.prototype.removeAllEventListeners = function () {
	this._eventListeners = [];
}

CanvasJSObject.prototype.dispatchEvent = function (eventName, eventParameter, context) {

	//For Internal Events
	if (eventName && this._eventListeners[eventName]) {

		eventParameter = eventParameter || {};

		var listeners = this._eventListeners[eventName];
		for (var i = 0; i < listeners.length; i++) {

			listeners[i].eventHandler.call(listeners[i].context, eventParameter);
		}
	}

	//External Events do not require registering as the property name is suffient to fire the event.
	if (typeof (this[eventName]) === "function") {
		this[eventName].call(context || this.chart, eventParameter);
	}
}

//#endregion Class CanvasJSObject

//#region Class LayoutManager
function LayoutManager(x1, y1, x2, y2, padding) {

	if (typeof (padding) === "undefined")
		padding = 0;

	this._padding = padding;

	this._x1 = x1;
	this._y1 = y1;
	this._x2 = x2;
	this._y2 = y2;

	this._topOccupied = this._padding;
	this._bottomOccupied = this._padding;
	this._leftOccupied = this._padding;
	this._rightOccupied = this._padding;
}

LayoutManager.prototype.registerSpace = function (position, size) {
	if (position === "top") {
		this._topOccupied += size.height;
	}
	else if (position === "bottom") {
		this._bottomOccupied += size.height;
	} else if (position === "left") {
		this._leftOccupied += size.width; // this is width when seen upright/vertically
	} else if (position === "right") {
		this._rightOccupied += size.width;// this is width when seen upright/vertically
	}
}

LayoutManager.prototype.unRegisterSpace = function (position, size) {
	if (position === "top") {
		this._topOccupied -= size.height;
	}
	else if (position === "bottom") {
		this._bottomOccupied -= size.height;
	} else if (position === "left") {
		this._leftOccupied -= size.width;// this is width when seen upright/vertically
	} else if (position === "right") {
		this._rightOccupied -= size.width;// this is width when seen upright/vertically
	}
}

LayoutManager.prototype.getFreeSpace = function () {
	///<signature>
	///<summary>Returns available free space {x1:number, y1:number, x2:number, y2:number}</summary>
	///</signature>

	return {
		x1: this._x1 + this._leftOccupied,
		y1: this._y1 + this._topOccupied,
		x2: this._x2 - this._rightOccupied,
		y2: this._y2 - this._bottomOccupied,
		width: (this._x2 - this._x1) - this._rightOccupied - this._leftOccupied,
		height: (this._y2 - this._y1) - this._bottomOccupied - this._topOccupied
	};
}

LayoutManager.prototype.reset = function () {
	//so that there is enough padding.
	this._topOccupied = this._padding;
	this._bottomOccupied = this._padding;
	this._leftOccupied = this._padding;
	this._rightOccupied = this._padding;
}
//#endregion Class LayoutManager

//#region Class TextBlock
function TextBlock(ctx, options) {
	TextBlock.base.constructor.call(this, "TextBlock", null, options, null, null);

	this.ctx = ctx;
	this._isDirty = true;
	this._wrappedText = null;

	this._initialize();
}
extend(TextBlock, CanvasJSObject);

TextBlock.prototype._initialize = function () {
	if (!isNullOrUndefined(this.padding) && typeof this.padding === "object") {
		this.topPadding = !isNullOrUndefined(this.padding.top) ? Number(this.padding.top) | 0 : 0;
		this.rightPadding = !isNullOrUndefined(this.padding.right) ? Number(this.padding.right) | 0 : 0;
		this.bottomPadding = !isNullOrUndefined(this.padding.bottom) ? Number(this.padding.bottom) | 0 : 0;
		this.leftPadding = !isNullOrUndefined(this.padding.left) ? Number(this.padding.left) | 0 : 0;
	}
	else {
		this.topPadding = this.rightPadding = this.bottomPadding = this.leftPadding = Number(this.padding) | 0;
	}
}

TextBlock.prototype.render = function (preserveContext) {
	if (this.fontSize === 0)
		return;

	if (preserveContext)
		this.ctx.save();

	var font = this.ctx.font;
	this.ctx.textBaseline = this.textBaseline;

	var offsetY = 0;

	if (this._isDirty)
		this.measureText(this.ctx);

	this.ctx.translate(this.x, this.y + offsetY);

	if (this.textBaseline === "middle") {
		offsetY = -this._lineHeight / 2;
	}

	this.ctx.font = this._getFontString();

	this.ctx.rotate(Math.PI / 180 * this.angle);

	var textLeft = 0;
	var textTop = this.topPadding;
	//var textTop = this.padding;
	var line = null;

	if (!this.ctx.roundRect) extendCtx(this.ctx);

	if ((this.borderThickness > 0 && this.borderColor) || this.backgroundColor) {
		this.ctx.roundRect(0, offsetY, this.width, this.height, this.cornerRadius, this.borderThickness, this.backgroundColor, this.borderColor);

		//if (this.textBaseline === "middle") {
		//	//textTop += this.fontSize / 2;
		//	textTop += this._lineHeight / 2;
		//}
	}

	this.ctx.fillStyle = this.fontColor;

	for (var i = 0; i < this._wrappedText.lines.length; i++) {

		line = this._wrappedText.lines[i];
		if (this.horizontalAlign === "right")
			textLeft = (this.width - (this.leftPadding + this.rightPadding)) / 2 - line.width / 2 + this.leftPadding;
		else if (this.horizontalAlign === "left")
			textLeft = this.leftPadding;
		else if (this.horizontalAlign === "center")
			textLeft = (this.width - (this.leftPadding + this.rightPadding)) / 2 - line.width / 2 + this.leftPadding;

		this.ctx.fillText(line.text, textLeft, textTop);

		textTop += line.height;
	}

	this.ctx.font = font;

	if (preserveContext)
		this.ctx.restore();
}

TextBlock.prototype.setText = function (text) {
	this.text = text;
	this._isDirty = true;
	this._wrappedText = null;
}

TextBlock.prototype.measureText = function () {
	this._lineHeight = getFontHeightInPixels(this.fontFamily, this.fontSize, this.fontWeight);

	if (this.maxWidth === null) {
		throw ("Please set maxWidth and height for TextBlock");
	}

	this._wrapText(this.ctx);
	this._isDirty = false;

	return {
		width: this.width, height: this.height
	}
}

TextBlock.prototype._getLineWithWidth = function (text, width, clipWord) {
	text = String(text);
	clipWord = clipWord || false;

	if (!text)
		return {
			text: "", width: 0
		};

	var textWidth = 0,
		min = 0,
		max = text.length - 1,
		mid = Infinity;

	this.ctx.font = this._getFontString();

	while (min <= max) {
		mid = Math.floor((min + max) / 2);
		var tempText = text.substr(0, mid + 1);

		textWidth = this.ctx.measureText(tempText).width;

		if (textWidth < width) {
			min = mid + 1;
		} else if (textWidth > width) {
			max = mid - 1;
		} else {
			break;
		}
	}

	//edge cases
	if (textWidth > width && tempText.length > 1) {
		tempText = tempText.substr(0, tempText.length - 1);
		textWidth = this.ctx.measureText(tempText).width;
	}

	var isClipped = true;

	if (tempText.length === text.length || text[tempText.length] === " ")
		isClipped = false;

	if (isClipped) {
		var resultWords = tempText.split(" ");
		if (resultWords.length > 1)
			resultWords.pop();

		tempText = resultWords.join(" ");
		textWidth = this.ctx.measureText(tempText).width;
	}

	return {
		text: tempText, width: textWidth
	};
}

TextBlock.prototype._wrapText = function wrapText() {
	//this.ctx.save();
	var text = new String(trimString(String(this.text)));
	var lines = [];
	var font = this.ctx.font; // Save the current Font
	var height = 0;
	var width = 0;

	this.ctx.font = this._getFontString();

	if (this.frontSize === 0)
		width = height = 0;
	else {
		while (text.length > 0) {

			var maxWidth = this.maxWidth - (this.leftPadding + this.rightPadding);
			var maxHeight = this.maxHeight - (this.topPadding + this.bottomPadding);

			var line = this._getLineWithWidth(text, maxWidth, false);
			line.height = this._lineHeight;

			lines.push(line);

			var prevWidth = width;
			width = Math.max(width, line.width);
			height += line.height;
			text = trimString(text.slice(line.text.length, text.length));

			if (maxHeight && height > maxHeight) {
				var line = lines.pop();
				height -= line.height;
				width = prevWidth;
			}
		}
	}

	this._wrappedText = {
		lines: lines, width: width, height: height
	};
	this.width = width + (this.leftPadding + this.rightPadding);
	this.height = height + (this.topPadding + this.bottomPadding);

	this.ctx.font = font; // Restore the font
}

TextBlock.prototype._getFontString = function () {
	//return this.fontStyle + " " + this.fontWeight + " " + this.fontSize + "px " + this.fontFamily
	return getFontString("", this, null);
}

//#endregion Class TextBlock

//#region Class Toolbar

function Toolbar(chart, options) {
	Toolbar.base.constructor.call(this, "Toolbar", "toolbar", options, null, chart);

	this.chart = chart;
	this.canvas = chart.canvas;
	this.ctx = this.chart.ctx;

	this.optionsName = "toolbar";
}

extend(Toolbar, CanvasJSObject);

//#endregion Class Toolbar

//#region Class Title

function Title(chart, options) {
	Title.base.constructor.call(this, "Title", "title", options, null, chart);

	this.chart = chart;
	this.canvas = chart.canvas;
	this.ctx = this.chart.ctx;

	this.optionsName = "title";

	//For assigning zero margin if title and subtitle situated at the same place
	if (isNullOrUndefined(this.options.margin) && chart.options.subtitles) {
		var subtitles = chart.options.subtitles;
		for (var i = 0; i < subtitles.length; i++) {
			if ((isNullOrUndefined(subtitles[i].horizontalAlign) && this.horizontalAlign === "center" || subtitles[i].horizontalAlign === this.horizontalAlign) && (isNullOrUndefined(subtitles[i].verticalAlign) && this.verticalAlign === "top" || subtitles[i].verticalAlign === this.verticalAlign) && (!subtitles[i].dockInsidePlotArea === !this.dockInsidePlotArea)) {
				this.margin = 0;
				break;
			}
		}
	}

	if (typeof (this.options.fontSize) === "undefined") {

		this.fontSize = this.chart.getAutoFontSize(this.fontSize);

		//window.console.log("Chart Title fontSize: " + this.fontSize);
	}

	this.width = null,//read only
	this.height = null//read only
	this.bounds = {
		x1: null, y1: null, x2: null, y2: null
	};
}

extend(Title, CanvasJSObject);
Title.prototype.render = function () {

	if (!this.text)
		return;

	var container = (!this.dockInsidePlotArea ? this.chart : this.chart.plotArea);
	var freespace = container.layoutManager.getFreeSpace();
	var left = freespace.x1;
	var top = freespace.y1;
	var angle = 0;
	var maxHeight = 0;
	var containerMargin = 2; //Margin towards the container
	var rightOffset = this.chart._menuButton && this.chart.exportEnabled && this.verticalAlign === "top" ? 22 : 0; //So that Title doesn't overlap menu button.

	var textBlockHorizontalAlign;
	var position;

	if (this.verticalAlign === "top" || this.verticalAlign === "bottom") {
		if (this.maxWidth === null)
			this.maxWidth = freespace.width - containerMargin * 2 - rightOffset * (this.horizontalAlign === "center" ? 2 : 1);

		maxHeight = freespace.height * .5 - this.margin - containerMargin;
		angle = 0;
	}
	else if (this.verticalAlign === "center") {

		if (this.horizontalAlign === "left" || this.horizontalAlign === "right") {
			if (this.maxWidth === null)
				this.maxWidth = freespace.height - containerMargin * 2;

			maxHeight = freespace.width * .5 - this.margin - containerMargin;
		} else if (this.horizontalAlign === "center") {
			if (this.maxWidth === null)
				this.maxWidth = freespace.width - containerMargin * 2;

			maxHeight = freespace.height * .5 - containerMargin * 2;
		}
	}

	var padding;
	if (!isNullOrUndefined(this.padding) && typeof this.padding === "number") {
		padding = this.padding * 2.5;
	}
	else if (!isNullOrUndefined(this.padding) && typeof this.padding === "object") {
		padding = this.padding.top ? this.padding.top : this.padding.bottom ? this.padding.bottom : 0;
		padding += this.padding.bottom ? this.padding.bottom : this.padding.top ? this.padding.top : 0;
		padding *= 1.25;
	}

	if (!this.wrap)
		maxHeight = Math.min(maxHeight, Math.max(this.fontSize * 1.5, this.fontSize + padding));
	//console.log(this.maxWidth);

	var textBlock = new TextBlock(this.ctx, {
		fontSize: this.fontSize, fontFamily: this.fontFamily, fontColor: this.fontColor,
		fontStyle: this.fontStyle, fontWeight: this.fontWeight,
		horizontalAlign: this.horizontalAlign, verticalAlign: this.verticalAlign,
		borderColor: this.borderColor, borderThickness: this.borderThickness,
		backgroundColor: this.backgroundColor,
		maxWidth: this.maxWidth, maxHeight: maxHeight,
		cornerRadius: this.cornerRadius,
		text: this.text,
		padding: this.padding,
		textBaseline: "top"
	});

	var textBlockSize = textBlock.measureText();

	if (this.verticalAlign === "top" || this.verticalAlign === "bottom") {

		if (this.verticalAlign === "top") {
			top = freespace.y1 + containerMargin;
			position = "top";
		}
		else if (this.verticalAlign === "bottom") {
			top = freespace.y2 - containerMargin - textBlockSize.height;
			position = "bottom";
		}

		if (this.horizontalAlign === "left") {
			left = freespace.x1 + containerMargin;
		}
		else if (this.horizontalAlign === "center") {
			left = freespace.x1 + freespace.width / 2 - textBlockSize.width / 2;
		}
		else if (this.horizontalAlign === "right") {
			left = freespace.x2 - containerMargin - textBlockSize.width - rightOffset;
		}

		textBlockHorizontalAlign = this.horizontalAlign;

		this.width = textBlockSize.width;
		this.height = textBlockSize.height;
	}
	else if (this.verticalAlign === "center") {

		if (this.horizontalAlign === "left") {

			left = freespace.x1 + containerMargin;
			top = freespace.y2 - containerMargin - (this.maxWidth / 2 - textBlockSize.width / 2);
			angle = -90;

			position = "left";
			this.width = textBlockSize.height;
			this.height = textBlockSize.width;
		}
		else if (this.horizontalAlign === "right") {
			left = freespace.x2 - containerMargin;
			top = freespace.y1 + containerMargin + (this.maxWidth / 2 - textBlockSize.width / 2);
			angle = 90;

			position = "right";
			this.width = textBlockSize.height;
			this.height = textBlockSize.width;
		}
		else if (this.horizontalAlign === "center") {
			top = container.y1 + (container.height / 2 - textBlockSize.height / 2);
			left = container.x1 + (container.width / 2 - textBlockSize.width / 2);

			position = "center";
			this.width = textBlockSize.width;
			this.height = textBlockSize.height;
		}

		textBlockHorizontalAlign = "center";
	}

	textBlock.x = left;
	textBlock.y = top;
	textBlock.angle = angle;
	textBlock.horizontalAlign = textBlockHorizontalAlign;
	textBlock.render(true);

	container.layoutManager.registerSpace(position, {
		width: this.width + (position === "left" || position === "right" ? this.margin + containerMargin : 0),
		height: this.height + (position === "top" || position === "bottom" ? this.margin + containerMargin : 0)
	});

	this.bounds = {
		x1: left, y1: top, x2: left + this.width, y2: top + this.height
	};

	this.ctx.textBaseline = "top";
}


//#endregion Class Title

//#region Class SubTitle

function Subtitle(chart, options, index) {
	Subtitle.base.constructor.call(this, "Subtitle", "subtitles", options, index, chart);

	this.chart = chart;
	this.canvas = chart.canvas;
	this.ctx = this.chart.ctx;

	this.optionsName = "subtitles"
	this.isOptionsInArray = true;

	if (typeof (this.options.fontSize) === "undefined") {

		this.fontSize = this.chart.getAutoFontSize(this.fontSize);

		//window.console.log("Chart Title fontSize: " + this.fontSize);
	}

	this.width = null,//read only
	this.height = null//read only
	this.bounds = {
		x1: null, y1: null, x2: null, y2: null
	};
}

extend(Subtitle, CanvasJSObject);

Subtitle.prototype.render = Title.prototype.render;

//#endregion Class SubTitle

//#region Class CultureInfo

function CultureInfo(culture) {

	var cultureInfo;

	if (culture && cultures[culture])
		cultureInfo = cultures[culture];

	CultureInfo.base.constructor.call(this, "CultureInfo", null, cultureInfo, null, null);
}

extend(CultureInfo, CanvasJSObject);

//#endregion Class CultureInfo

//#endregion Class Definitions

//#region Public API

var CanvasJS = {

	addTheme: function (name, theme) {
		themes[name] = theme;
	},
	addColorSet: function (name, colorSet) {
		colorSets[name] = colorSet;
	},
	addCultureInfo: function (name, cultureInfo) {
		cultures[name] = cultureInfo;
	},
	formatNumber: function (number, formatString, culture) {
		culture = culture || "en";
		formatString = formatString || "#,##0.##";

		if (!cultures[culture])
			throw "Unknown Culture Name";
		else {
			return numberFormat(number, formatString, new CultureInfo(culture));
		}
	},
	formatDate: function (date, formatString, culture) {
		culture = culture || "en";
		formatString = formatString || "DD MMM YYYY";

		if (!cultures[culture])
			throw "Unknown Culture Name";
		else {
			return dateFormat(date, formatString, new CultureInfo(culture));
		}
	}

}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	module.exports = CanvasJS;
}
else {
	if (typeof define === 'function' && define.amd) {
		define([], function () {
			return CanvasJS;
		});
	}
	else {
		window.CanvasJS = CanvasJS;
	}
}
//#endregion Public API


CanvasJS.Chart = (function () {

	//#region Static Methods & variables
	function compareDataPointX(dataPoint1, dataPoint2) {
		return dataPoint1.x - dataPoint2.x;
	}

	function exportCanvas(canvas, format, fileName) {
		if (!canvas || !format || !fileName)
			return;

		var fullFileName = fileName + "." + format;
		var mimeType = "image/" + format;
		var img = canvas.toDataURL(mimeType);
		var saved = false;

		var downloadLink = document.createElement("a");
		downloadLink.download = fullFileName;
		downloadLink.href = img;
		//downloadLink.target = "_blank";
		var e;


		if (typeof (Blob) !== "undefined" && !!new Blob()) {

			var imgData = img.replace(/^data:[a-z\/]*;base64,/, '');

			var byteString = atob(imgData);
			var buffer = new ArrayBuffer(byteString.length);
			var intArray = new Uint8Array(buffer);
			for (var i = 0; i < byteString.length; i++) {
				intArray[i] = byteString.charCodeAt(i);
			}

			var blob = new Blob([intArray.buffer], { type: "image/" + format });

			// Save the blob
			try {
				window.navigator.msSaveBlob(blob, fullFileName);
				saved = true;
			}
			catch (e) {
				downloadLink.dataset.downloadurl = [mimeType, downloadLink.download, downloadLink.href].join(':');
				downloadLink.href = window.URL.createObjectURL(blob);
			}
		}

		if (!saved) {

			try {

				event = document.createEvent("MouseEvents");

				event.initMouseEvent("click", true, false, window,
					0, 0, 0, 0, 0, false, false, false,
					false, 0, null);

				if (downloadLink.dispatchEvent) {
					//alert("dispatchEvent");
					downloadLink.dispatchEvent(event);
				}
				else if (downloadLink.fireEvent) {
					//alert("fireEvent");
					downloadLink.fireEvent("onclick");
				}

			} catch (e) {
				var win = window.open();
				//alert("<IE10");
				//window.console.log("IE");
				win.document.write("<img src='" + img + "'></img><div>Please right click on the image and save it to your device</div>");
				win.document.close();
			}
		}
	}

	//#endregion Static Methods & variables

	//#region Class Definitions

	//#region Class Chart
	function Chart(containerId, options) {

		options = options || {};
		this.theme = (!isNullOrUndefined(options.theme) && !isNullOrUndefined(themes[options.theme])) ? options.theme : "light1";
		Chart.base.constructor.call(this, "Chart", null, options, null, null);

		var _this = this;

		this._containerId = containerId;
		this._objectsInitialized = false;
		this.ctx = null;
		this.overlaidCanvasCtx = null;
		this._indexLabels = [];
		this._panTimerId = 0;
		this._lastTouchEventType = "";
		this._lastTouchData = null;
		this.isAnimating = false;
		this.renderCount = 0;
		this.animatedRender = false;
		this.disableToolTip = false;


		this.panEnabled = false;
		this._defaultCursor = "default";
		this.plotArea = { canvas: null, ctx: null, x1: 0, y1: 0, x2: 0, y2: 0, width: 0, height: 0 };
		this._dataInRenderedOrder = [];

		this.container = typeof (this._containerId) === "string" ? document.getElementById(this._containerId) : this._containerId;

		if (!this.container) {
			if (window.console)
				window.console.log("CanvasJS Error: Chart Container with id \"" + this._containerId + "\" was not found");
			return;
		}

		this.container.innerHTML = "";

		var width = 0;
		var height = 0;

		if (this.options.width)
			width = this.width;
		else
			width = this.container.clientWidth > 0 ? this.container.clientWidth : this.width;

		if (this.options.height)
			height = this.height;
		else
			height = this.container.clientHeight > 0 ? this.container.clientHeight : this.height;

		this.width = width;
		this.height = height;

		this.x1 = this.y1 = 0;
		this.x2 = this.width;
		this.y2 = this.height;


		this._selectedColorSet = typeof (colorSets[this.colorSet]) !== "undefined" ? colorSets[this.colorSet] : colorSets["colorSet1"];

		this._canvasJSContainer = document.createElement("div");
		this._canvasJSContainer.setAttribute("class", "canvasjs-chart-container");

		this._canvasJSContainer.style.position = "relative";
		this._canvasJSContainer.style.textAlign = "left";
		this._canvasJSContainer.style.cursor = "auto";
		if (!isCanvasSupported) {
			this._canvasJSContainer.style.height = "0px";//In IE6 toolTip doesn't show at proper position if not set.
		}
		this.container.appendChild(this._canvasJSContainer);


		this.canvas = createCanvas(width, height);
		this._preRenderCanvas = createCanvas(width, height);

		this.canvas.style.position = "absolute";
		if (this.canvas.getContext) {
			//try {
			//	this.canvas.style.background = this.backgroundColor;
			//} catch (e) { }
			this._canvasJSContainer.appendChild(this.canvas);
			this.ctx = this.canvas.getContext("2d");
			this.ctx.textBaseline = "top";
			extendCtx(this.ctx);
			this._preRenderCtx = this._preRenderCanvas.getContext("2d");
			this._preRenderCtx.textBaseline = "top";
			extendCtx(this._preRenderCtx);
		} else
			return;

		//this.canvas.style.cursor = "pointer";

		if (!isCanvasSupported) {
			this.plotArea.canvas = createCanvas(width, height);
			this.plotArea.canvas.style.position = "absolute";
			this.plotArea.canvas.setAttribute("class", "plotAreaCanvas");
			this._canvasJSContainer.appendChild(this.plotArea.canvas);

			this.plotArea.ctx = this.plotArea.canvas.getContext("2d");
		} else {
			this.plotArea.ctx = this.ctx;
		}

		this.overlaidCanvas = createCanvas(width, height);
		this.overlaidCanvas.style.position = "absolute";
		this.overlaidCanvas.style.webkitTapHighlightColor = "transparent";
		if (this.overlaidCanvas.getContext) {
			this._canvasJSContainer.appendChild(this.overlaidCanvas);
			this.overlaidCanvasCtx = this.overlaidCanvas.getContext("2d");
			this.overlaidCanvasCtx.textBaseline = "top";
			extendCtx(this.overlaidCanvasCtx);
		}

		this._eventManager = new EventManager(this);

		this.windowResizeHandler = addEvent(window, "resize", function () {

			if (_this._updateSize())
				_this.render();
		});


		this._toolBar = document.createElement("div");
		this._toolBar.setAttribute("class", "canvasjs-chart-toolbar");
		this._toolBar.style.cssText = "position: absolute; right: 1px; top: 1px;";
		this._canvasJSContainer.appendChild(this._toolBar);


		this.bounds = { x1: 0, y1: 0, x2: this.width, y2: this.height };

		addEvent(this.overlaidCanvas, 'click', function (e) {
			_this._mouseEventHandler(e);
		});

		addEvent(this.overlaidCanvas, 'mousemove', function (e) {
			_this._mouseEventHandler(e);
		});

		addEvent(this.overlaidCanvas, 'mouseup', function (e) {
			_this._mouseEventHandler(e);
		});

		addEvent(this.overlaidCanvas, 'mousedown', function (e) {
			_this._mouseEventHandler(e);
			hide(_this._dropdownMenu);
		});

		addEvent(this.overlaidCanvas, 'mouseout', function (e) {
			_this._mouseEventHandler(e);
		});


		addEvent(this.overlaidCanvas, window.navigator.msPointerEnabled ? "MSPointerDown" : "touchstart", function (e) {
			_this._touchEventHandler(e);
		});

		addEvent(this.overlaidCanvas, window.navigator.msPointerEnabled ? "MSPointerMove" : 'touchmove', function (e) {
			_this._touchEventHandler(e);
		});

		addEvent(this.overlaidCanvas, window.navigator.msPointerEnabled ? "MSPointerUp" : 'touchend', function (e) {
			_this._touchEventHandler(e);
		});

		addEvent(this.overlaidCanvas, window.navigator.msPointerEnabled ? "MSPointerCancel" : 'touchcancel', function (e) {
			_this._touchEventHandler(e);
		});

		this.toolTip = new ToolTip(this, this.options.toolTip);


		this.data = null;
		this.axisX = [];
		this.axisX2 = [];
		this.axisY = [];
		this.axisY2 = [];



		this.sessionVariables = {
			axisX: [],
			axisX2: [],
			axisY: [],
			axisY2: []
		};
	}

	extend(Chart, CanvasJSObject);

	//Clear Chart from memory
	Chart.prototype.destroy = function () {
		removeEvent(window, "resize", this.windowResizeHandler);
	};

	//Update Chart Properties
	Chart.prototype._updateOptions = function () {
		var _this = this;

		this.updateOption("width");
		this.updateOption("height");

		this.updateOption("dataPointWidth");
		this.updateOption("dataPointMinWidth");
		this.updateOption("dataPointMaxWidth");

		this.updateOption("interactivityEnabled");
		this.updateOption("theme");

		if (this.updateOption("colorSet"))
			this._selectedColorSet = typeof (colorSets[this.colorSet]) !== "undefined" ? colorSets[this.colorSet] : colorSets["colorSet1"];

		this.updateOption("backgroundColor");
		if (!this.backgroundColor)
			this.backgroundColor = "rgba(0,0,0,0)";

		this.updateOption("culture");
		this._cultureInfo = new CultureInfo(this.options.culture);

		this.updateOption("animationEnabled");
		this.animationEnabled = this.animationEnabled && isCanvasSupported;
		this.updateOption("animationDuration");

		this.updateOption("rangeChanging");
		this.updateOption("rangeChanged");

		this.updateOption("exportEnabled");
		this.updateOption("exportFileName");

		this.updateOption("zoomType");

		//Need to check this.options.zoomEnabled because this.zoomEnabled is used internally to keep track of state - and hence changes.
		if (this.options.zoomEnabled) {

			if (!this._zoomButton) {
				var preventMouseEvent = false;
				hide(this._zoomButton = document.createElement("button"));

				setButtonState(this, this._zoomButton, "pan");

				this._toolBar.appendChild(this._zoomButton);
				this._zoomButton.style.borderRight = this.toolbar.borderThickness + "px solid " + this.toolbar.borderColor;

				addEvent(this._zoomButton, "touchstart", function (e) {
					preventMouseEvent = true;
				});

				addEvent(this._zoomButton, "click", function () {
					if (_this.zoomEnabled) {
						_this.zoomEnabled = false;
						_this.panEnabled = true;

						setButtonState(_this, _this._zoomButton, "zoom");

					} else {
						_this.zoomEnabled = true;
						_this.panEnabled = false;

						setButtonState(_this, _this._zoomButton, "pan");
					}

					_this.render();
				});

				addEvent(this._zoomButton, "mouseover", function () {
					if (!preventMouseEvent) {
						var cssStyle = { backgroundColor: _this.toolbar.backgroundColorOnHover, color: _this.toolbar.fontColorOnHover, transition: "0.4s", WebkitTransition: "0.4s" };
						setCSSProperties(_this, _this._zoomButton, cssStyle);
						if (navigator.userAgent.search("MSIE") <= 0)
							setCSSProperties(_this, _this._zoomButton.childNodes[0], { WebkitFilter: "invert(100%)", filter: "invert(100%)" });
					}
					else {
						preventMouseEvent = false;
					}
				});

				addEvent(this._zoomButton, "mouseout", function () {
					if (!preventMouseEvent) {
						var cssStyle = { backgroundColor: _this.toolbar.backgroundColor, color: _this.toolbar.fontColor, transition: "0.4s", WebkitTransition: "0.4s" };
						setCSSProperties(_this, _this._zoomButton, cssStyle);
						if (navigator.userAgent.search("MSIE") <= 0)
							setCSSProperties(_this, _this._zoomButton.childNodes[0], { WebkitFilter: "invert(0%)", filter: "invert(0%)" });
					}
				});
			}


			if (!this._resetButton) {
				var preventMouseEvent = false;
				hide(this._resetButton = document.createElement("button"));
				setButtonState(this, this._resetButton, "reset");
				this._resetButton.style.borderRight = (this.exportEnabled ? this.toolbar.borderThickness : 0) + "px solid " + this.toolbar.borderColor;
				this._toolBar.appendChild(this._resetButton);

				addEvent(this._resetButton, "touchstart", function (e) {
					preventMouseEvent = true;
				});

				addEvent(this._resetButton, "click", function () {

					_this.toolTip.hide();

					if (_this.zoomEnabled || _this.panEnabled) {
						_this.zoomEnabled = true;
						_this.panEnabled = false;
						setButtonState(_this, _this._zoomButton, "pan");

						_this._defaultCursor = "default";
						_this.overlaidCanvas.style.cursor = _this._defaultCursor;
					} else {
						_this.zoomEnabled = false;
						_this.panEnabled = false;
					}
					//Reset axisX
					if (_this.sessionVariables.axisX) {
						for (var k = 0; k < _this.sessionVariables["axisX"].length; k++) {
							_this.sessionVariables["axisX"][k].newViewportMinimum = null;
							_this.sessionVariables["axisX"][k].newViewportMaximum = null;
						}
					}

					//Reset axisX2
					if (_this.sessionVariables.axisX2) {
						for (var k = 0; k < _this.sessionVariables["axisX2"].length; k++) {
							_this.sessionVariables["axisX2"][k].newViewportMinimum = null;
							_this.sessionVariables["axisX2"][k].newViewportMaximum = null;
						}
					}

					//Reset axisY
					if (_this.sessionVariables.axisY) {
						for (var k = 0; k < _this.sessionVariables["axisY"].length; k++) {
							_this.sessionVariables["axisY"][k].newViewportMinimum = null;
							_this.sessionVariables["axisY"][k].newViewportMaximum = null;
						}
					}

					//Reset axisY2
					if (_this.sessionVariables.axisY2) {
						for (var k = 0; k < _this.sessionVariables["axisY2"].length; k++) {
							_this.sessionVariables["axisY2"][k].newViewportMinimum = null;
							_this.sessionVariables["axisY2"][k].newViewportMaximum = null;
						}
					}

					_this.resetOverlayedCanvas();

					hide(_this._zoomButton, _this._resetButton);

					_this._dispatchRangeEvent("rangeChanging", "reset");
					_this.render();
					_this._dispatchRangeEvent("rangeChanged", "reset");
				});

				addEvent(this._resetButton, "mouseover", function () {
					if (!preventMouseEvent) {
						var cssStyle = { backgroundColor: _this.toolbar.backgroundColorOnHover, color: _this.toolbar.hoverFfontColorOnHoverontColor, transition: "0.4s", WebkitTransition: "0.4s" };
						setCSSProperties(_this, _this._resetButton, cssStyle);
						if (navigator.userAgent.search("MSIE") <= 0)
							setCSSProperties(_this, _this._resetButton.childNodes[0], { WebkitFilter: "invert(100%)", filter: "invert(100%)" });
					}
				});

				addEvent(this._resetButton, "mouseout", function () {
					if (!preventMouseEvent) {
						var cssStyle = { backgroundColor: _this.toolbar.backgroundColor, color: _this.toolbar.fontColor, transition: "0.4s", WebkitTransition: "0.4s" };
						setCSSProperties(_this, _this._resetButton, cssStyle);
						if (navigator.userAgent.search("MSIE") <= 0)
							setCSSProperties(_this, _this._resetButton.childNodes[0], { WebkitFilter: "invert(0%)", filter: "invert(0%)" });
					}
				});
				this.overlaidCanvas.style.cursor = _this._defaultCursor;
			}

			if (!this.zoomEnabled && !this.panEnabled) {
				if (!this._zoomButton) {
					this.zoomEnabled = true;
					this.panEnabled = false;
				} else {

					if (_this._zoomButton.getAttribute("state") === _this._cultureInfo.zoomText) {
						this.panEnabled = true;
						this.zoomEnabled = false;
					}
					else {
						this.zoomEnabled = true;
						this.panEnabled = false;
					}

					show(_this._zoomButton, _this._resetButton);
				}
			}



		} else {
			this.zoomEnabled = false;
			this.panEnabled = false;
		}



		if (this._menuButton) {
			if (this.exportEnabled)
				show(this._menuButton);
			else
				hide(this._menuButton);
		} else if (this.exportEnabled && isCanvasSupported) {
			var preventMouseEvent = false;
			this._menuButton = document.createElement("button");
			setButtonState(this, this._menuButton, "menu");
			this._toolBar.appendChild(this._menuButton);

			addEvent(this._menuButton, "touchstart", function (e) {
				preventMouseEvent = true;
			});

			addEvent(this._menuButton, "click", function () {
				if (_this._dropdownMenu.style.display === "none") {

					if (_this._dropDownCloseTime && ((new Date()).getTime() - _this._dropDownCloseTime.getTime() <= 500))
						return;

					_this._dropdownMenu.style.display = "block";
					_this._menuButton.blur();
					_this._dropdownMenu.focus();
				}

			}, true);
			addEvent(this._menuButton, "mouseover", function () {
				if (!preventMouseEvent) {
					setCSSProperties(_this, _this._menuButton, { backgroundColor: _this.toolbar.backgroundColorOnHover, color: _this.toolbar.fontColorOnHover })
					if (navigator.userAgent.search("MSIE") <= 0)
						setCSSProperties(_this, _this._menuButton.childNodes[0], { WebkitFilter: "invert(100%)", filter: "invert(100%)" });
				}
			}, true);

			addEvent(this._menuButton, "mouseout", function () {
				if (!preventMouseEvent) {
					setCSSProperties(_this, _this._menuButton, { backgroundColor: _this.toolbar.backgroundColor, color: _this.toolbar.fontColor })
					if (navigator.userAgent.search("MSIE") <= 0)
						setCSSProperties(_this, _this._menuButton.childNodes[0], { WebkitFilter: "invert(0%)", filter: "invert(0%)" });
				}
			}, true);
		}


		if (!this._dropdownMenu && this.exportEnabled && isCanvasSupported) {
			var preventMouseEvent = false;
			this._dropdownMenu = document.createElement("div");
			this._dropdownMenu.setAttribute("tabindex", -1);
			var shadowColor = this.theme.indexOf("dark") !== -1 ? "black" : "#888888";
			this._dropdownMenu.style.cssText = "position: absolute; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; cursor: pointer;right: 0px;top: 25px;min-width: 120px;outline: 0;font-size: 14px; font-family: Arial, Helvetica, sans-serif;padding: 5px 0px 5px 0px;text-align: left;line-height: 10px;background-color:" + this.toolbar.backgroundColor + ";box-shadow: 2px 2px 10px " + shadowColor;
			_this._dropdownMenu.style.display = "none";
			this._toolBar.appendChild(this._dropdownMenu);

			addEvent(this._dropdownMenu, "blur", function () {
				hide(_this._dropdownMenu);

				_this._dropDownCloseTime = new Date();
			}, true);

			var exportOption = document.createElement("div");
			exportOption.style.cssText = "padding: 12px 8px 12px 8px"
			exportOption.innerHTML = this._cultureInfo.printText;
			exportOption.style.backgroundColor = this.toolbar.backgroundColor;
			exportOption.style.color = this.toolbar.fontColor;
			this._dropdownMenu.appendChild(exportOption);

			addEvent(exportOption, "touchstart", function (e) {
				preventMouseEvent = true;
			});

			addEvent(exportOption, "mouseover", function () {
				if (!preventMouseEvent) {
					this.style.backgroundColor = _this.toolbar.backgroundColorOnHover;
					this.style.color = _this.toolbar.fontColorOnHover;
				}
			}, true);

			addEvent(exportOption, "mouseout", function () {
				if (!preventMouseEvent) {
					this.style.backgroundColor = _this.toolbar.backgroundColor;
					this.style.color = _this.toolbar.fontColor;
				}
			}, true);

			addEvent(exportOption, "click", function () {
				_this.print();
				hide(_this._dropdownMenu);
			}, true);


			var exportOption = document.createElement("div");
			exportOption.style.cssText = "padding: 12px 8px 12px 8px"
			exportOption.innerHTML = this._cultureInfo.saveJPGText;
			exportOption.style.backgroundColor = this.toolbar.backgroundColor;
			exportOption.style.color = this.toolbar.fontColor;
			this._dropdownMenu.appendChild(exportOption);

			addEvent(exportOption, "touchstart", function (e) {
				preventMouseEvent = true;
			});

			addEvent(exportOption, "mouseover", function () {
				if (!preventMouseEvent) {
					this.style.backgroundColor = _this.toolbar.backgroundColorOnHover;
					this.style.color = _this.toolbar.fontColorOnHover;
				}
			}, true);

			addEvent(exportOption, "mouseout", function () {
				if (!preventMouseEvent) {
					this.style.backgroundColor = _this.toolbar.backgroundColor;
					this.style.color = _this.toolbar.fontColor;
				}
			}, true);

			addEvent(exportOption, "click", function () {
				exportCanvas(_this.canvas, "jpeg", _this.exportFileName);
				hide(_this._dropdownMenu);
			}, true);

			var exportOption = document.createElement("div");
			exportOption.style.cssText = "padding: 12px 8px 12px 8px"
			exportOption.innerHTML = this._cultureInfo.savePNGText;
			exportOption.style.backgroundColor = this.toolbar.backgroundColor;
			exportOption.style.color = this.toolbar.fontColor;
			this._dropdownMenu.appendChild(exportOption);

			addEvent(exportOption, "touchstart", function (e) {
				preventMouseEvent = true;
			});

			addEvent(exportOption, "mouseover", function () {
				if (!preventMouseEvent) {
					this.style.backgroundColor = _this.toolbar.backgroundColorOnHover;
					this.style.color = _this.toolbar.fontColorOnHover;
				}
			}, true);

			addEvent(exportOption, "mouseout", function () {
				if (!preventMouseEvent) {
					this.style.backgroundColor = _this.toolbar.backgroundColor;
					this.style.color = _this.toolbar.fontColor;
				}
			}, true);

			addEvent(exportOption, "click", function () {
				exportCanvas(_this.canvas, "png", _this.exportFileName);
				hide(_this._dropdownMenu);
			}, true);
		}


		if (this._toolBar.style.display !== "none" && this._zoomButton) {

			this.panEnabled ? setButtonState(_this, _this._zoomButton, "zoom") : setButtonState(_this, _this._zoomButton, "pan");


			if (_this._resetButton.getAttribute("state") !== _this._cultureInfo.resetText)
				setButtonState(_this, _this._resetButton, "reset");
		}

		if (this.options.toolTip && this.toolTip.options !== this.options.toolTip)
			this.toolTip.options = this.options.toolTip

		for (var prop in this.toolTip.options) {

			if (this.toolTip.options.hasOwnProperty(prop)) {
				this.toolTip.updateOption(prop);
			}
		}

	}

	Chart.prototype._updateSize = function () {
		var width = 0;
		var height = 0;

		if (this.options.width)
			width = this.width;
		else
			this.width = width = this.container.clientWidth > 0 ? this.container.clientWidth : this.width;

		if (this.options.height)
			height = this.height;
		else
			this.height = height = this.container.clientHeight > 0 ? this.container.clientHeight : this.height;

		if (this.canvas.width !== width * devicePixelBackingStoreRatio || this.canvas.height !== height * devicePixelBackingStoreRatio) {
			setCanvasSize(this.canvas, width, height);
			setCanvasSize(this._preRenderCanvas, width, height);

			setCanvasSize(this.overlaidCanvas, width, height);
			setCanvasSize(this._eventManager.ghostCanvas, width, height);

			this.bounds = { x1: 0, y1: 0, x2: this.width, y2: this.height };

			return true;
		}

		return false;
	}

	// initialize chart objects
	Chart.prototype._initialize = function () {
		///<signature>
		///<summary>Initializes Chart objects/state. Creates DataSeries class instance for each DataSeries provided by ther user. Sets the Axis Type based on the user data</summary>
		///</signature>
		//this.width = this.width;

		this.toolbar = new Toolbar(this, this.options.toolbar);

		if (!this._animator)
			this._animator = new Animator(this);
		else {
			this._animator.cancelAllAnimations();
		}

		this.removeAllEventListeners();

		this.disableToolTip = false;

		this._axes = [];

		this.pieDoughnutClickHandler = null;
		this.funnelPyramidClickHandler = null;
		//this._touchCurrentCoordinates = null;

		if (this.animationRequestId)
			this.cancelRequestAnimFrame.call(window, this.animationRequestId);

		this._updateOptions();

		this.animatedRender = isCanvasSupported && this.animationEnabled && (this.renderCount === 0);

		this._updateSize();

		//this._selectedColorSet = colorSets["colorSet2"];

		//this.ctx.clearRect(0, 0, this.width, this.height);
		this.clearCanvas();
		this.ctx.beginPath();

		this.axisX = [];
		this.axisX2 = [];
		this.axisY = [];
		this.axisY2 = [];
		this._indexLabels = [];
		this._dataInRenderedOrder = [];

		this._events = [];
		if (this._eventManager)
			this._eventManager.reset();

		this.plotInfo = {
			axisPlacement: null,
			plotTypes: []//array of plotType: {type:"", axisYType: "primary", dataSeriesIndexes:[]}
		};

		this.layoutManager = new LayoutManager(0, 0, this.width, this.height, 2);

		if (this.plotArea.layoutManager)
			this.plotArea.layoutManager.reset();


		this.data = [];
		var dataSeriesIndex = 0;
		var errorAxisPlacement = null;

		if (this.options.data) {
			for (var series = 0; series < this.options.data.length; series++) {
				//for (series in this.options.data) {

				dataSeriesIndex++;

				if (!(!this.options.data[series].type || Chart._supportedChartTypes.indexOf(this.options.data[series].type) >= 0))
					continue;

				var dataSeries = new DataSeries(this, this.options.data[series], dataSeriesIndex - 1, ++this._eventManager.lastObjectId);

				if (dataSeries.type === "error") {
					dataSeries.linkedDataSeriesIndex = !isNullOrUndefined(this.options.data[series].linkedDataSeriesIndex) ? this.options.data[series].linkedDataSeriesIndex : series - 1;

					if (dataSeries.linkedDataSeriesIndex < 0 || dataSeries.linkedDataSeriesIndex >= this.options.data.length || typeof dataSeries.linkedDataSeriesIndex !== "number" || this.options.data[dataSeries.linkedDataSeriesIndex].type === "error")
						dataSeries.linkedDataSeriesIndex = null;
				}

				if (dataSeries.name === null)
					dataSeries.name = "DataSeries " + (dataSeriesIndex);

				if (dataSeries.color === null) {
					if (this.options.data.length > 1) {
						dataSeries._colorSet = [this._selectedColorSet[dataSeries.index % this._selectedColorSet.length]];
						dataSeries.color = this._selectedColorSet[dataSeries.index % this._selectedColorSet.length];
					} else {
						if (dataSeries.type === "line" || dataSeries.type === "stepLine" || dataSeries.type === "spline" || dataSeries.type === "area"
							|| dataSeries.type === "stepArea" || dataSeries.type === "splineArea" || dataSeries.type === "stackedArea" || dataSeries.type === "stackedArea100"
							|| dataSeries.type === "rangeArea" || dataSeries.type === "rangeSplineArea" || dataSeries.type === "candlestick" || dataSeries.type === "ohlc" || dataSeries.type === "waterfall" || dataSeries.type === "boxAndWhisker") {
							dataSeries._colorSet = [this._selectedColorSet[0]];
						}
						else
							dataSeries._colorSet = this._selectedColorSet;
					}
				} else {
					dataSeries._colorSet = [dataSeries.color];
				}

				if (dataSeries.markerSize === null) {
					if (((dataSeries.type === "line" || dataSeries.type === "stepLine" || dataSeries.type === "spline" || dataSeries.type.toLowerCase().indexOf("area") >= 0) && dataSeries.dataPoints && dataSeries.dataPoints.length < this.width / 16) || dataSeries.type === "scatter") {
						//if (dataSeries.type === "line") {
						dataSeries.markerSize = 8;
					}
				}

				if ((dataSeries.type === "bubble" || dataSeries.type === "scatter") && dataSeries.dataPoints) {
					if (dataSeries.dataPoints.some) {
						if (dataSeries.dataPoints.some(function (element) { return element.x; }))
							dataSeries.dataPoints.sort(compareDataPointX);
					}
					else
						dataSeries.dataPoints.sort(compareDataPointX);
				}

				this.data.push(dataSeries);

				var seriesAxisPlacement = dataSeries.axisPlacement;

				errorAxisPlacement = errorAxisPlacement || seriesAxisPlacement;

				var errorMessage;
				//if (datasSeries.type === "error") continue;
				if (seriesAxisPlacement === "normal") {

					if (this.plotInfo.axisPlacement === "xySwapped") {
						errorMessage = "You cannot combine \"" + dataSeries.type + "\" with bar chart";
					} else if (this.plotInfo.axisPlacement === "none") {
						errorMessage = "You cannot combine \"" + dataSeries.type + "\" with pie chart";
					} else if (this.plotInfo.axisPlacement === null)
						this.plotInfo.axisPlacement = "normal";
				}
				else if (seriesAxisPlacement === "xySwapped") {

					if (this.plotInfo.axisPlacement === "normal") {
						errorMessage = "You cannot combine \"" + dataSeries.type + "\" with line, area, column or pie chart";
					} else if (this.plotInfo.axisPlacement === "none") {
						errorMessage = "You cannot combine \"" + dataSeries.type + "\" with pie chart";
					} else if (this.plotInfo.axisPlacement === null)
						this.plotInfo.axisPlacement = "xySwapped";
				}
				else if (seriesAxisPlacement === "none") {

					if (this.plotInfo.axisPlacement === "normal") {
						errorMessage = "You cannot combine \"" + dataSeries.type + "\" with line, area, column or bar chart";
					} else if (this.plotInfo.axisPlacement === "xySwapped") {
						errorMessage = "You cannot combine \"" + dataSeries.type + "\" with bar chart";
					} else if (this.plotInfo.axisPlacement === null) {
						this.plotInfo.axisPlacement = "none";
					}
				}
				else if (seriesAxisPlacement === null) {
					if (this.plotInfo.axisPlacement === "none") {
						errorMessage = "You cannot combine \"" + dataSeries.type + "\" with pie chart";
					}
				}

				if (errorMessage && window.console) {
					window.console.log(errorMessage);
					return;
				}
			}

			for (var series = 0; series < this.data.length; series++) {
				if (errorAxisPlacement == "none" && (this.data[series].type === "error") && window.console) {
					window.console.log("You cannot combine \"" + dataSeries.type + "\" with error chart");
					return;
				}

				if (this.data[series].type === "error") {
					this.data[series].axisPlacement = this.plotInfo.axisPlacement = errorAxisPlacement || "normal";
					this.data[series]._linkedSeries = this.data[series].linkedDataSeriesIndex === null ? null : this.data[this.data[series].linkedDataSeriesIndex];
				}
			}
		}

		//if (isDebugMode && window.console) {
		//    window.console.log("xMin: " + this.plotInfo.viewPortXMin + "; xMax: " + this.plotInfo.viewPortXMax + "; yMin: " + this.plotInfo.yMin + "; yMax: " + this.plotInfo.yMax);
		//}

		var _this = this;
		
		this._objectsInitialized = true;
	}

	//indexOf is not supported in IE8-
	Chart._supportedChartTypes = addArrayIndexOf(["line", "stepLine", "spline", "column", "area", "stepArea", "splineArea", "bar", "bubble", "scatter",
		"stackedColumn", "stackedColumn100", "stackedBar", "stackedBar100",
		"stackedArea", "stackedArea100",
		"candlestick",
		"ohlc",
		"boxAndWhisker",
		"rangeColumn",
		"error",
		"rangeBar",
		"rangeArea",
		"rangeSplineArea",
		"pie", "doughnut", "funnel", "pyramid",
		"waterfall"
	]);

	Chart.prototype.render = function (options) {
		if (options)
			this.options = options;
		
		this._initialize();
				
		var plotAreaElements = []; //Elements to be rendered inside the plotArea

		//Create Primary and Secondary axis and assign them to the series
		for (var i = 0; i < this.data.length; i++) {

			if (this.plotInfo.axisPlacement === "normal" || this.plotInfo.axisPlacement === "xySwapped") {
				if (!this.data[i].axisYType || this.data[i].axisYType === "primary") {

					if (this.options.axisY && this.options.axisY.length > 0) {
						if (!this.axisY.length) {
							for (var k = 0; k < this.options.axisY.length; k++) {
								if (this.plotInfo.axisPlacement === "normal") {
									this._axes.push(this.axisY[k] = new Axis(this, "axisY", this.options.axisY[k], k, "axisY", "left"));
								}
								else if (this.plotInfo.axisPlacement === "xySwapped") {
									this._axes.push(this.axisY[k] = new Axis(this, "axisY", this.options.axisY[k], k, "axisY", "bottom"));
								}
							}
						}
						this.data[i].axisY = this.axisY[(this.data[i].axisYIndex >= 0 && this.data[i].axisYIndex < this.axisY.length) ? this.data[i].axisYIndex : 0];
						this.axisY[(this.data[i].axisYIndex >= 0 && this.data[i].axisYIndex < this.axisY.length) ? this.data[i].axisYIndex : 0].dataSeries.push(this.data[i]);
					}
					else {
						if (!this.axisY.length) {
							if (this.plotInfo.axisPlacement === "normal") {
								this._axes.push(this.axisY[0] = new Axis(this, "axisY", this.options.axisY, 0, "axisY", "left"));
							}
							else if (this.plotInfo.axisPlacement === "xySwapped") {
								this._axes.push(this.axisY[0] = new Axis(this, "axisY", this.options.axisY, 0, "axisY", "bottom"));
							}
						}

						this.data[i].axisY = this.axisY[0];
						this.axisY[0].dataSeries.push(this.data[i]);
					}
				}
				if (this.data[i].axisYType === "secondary") {

					if (this.options.axisY2 && this.options.axisY2.length > 0) {
						if (!this.axisY2.length) {
							for (var k = 0; k < this.options.axisY2.length; k++) {
								if (this.plotInfo.axisPlacement === "normal") {
									this._axes.push(this.axisY2[k] = new Axis(this, "axisY2", this.options.axisY2[k], k, "axisY", "right"));
								}
								else if (this.plotInfo.axisPlacement === "xySwapped") {
									this._axes.push(this.axisY2[k] = new Axis(this, "axisY2", this.options.axisY2[k], k, "axisY", "top"));
								}
							}
						}
						this.data[i].axisY = this.axisY2[(this.data[i].axisYIndex >= 0 && this.data[i].axisYIndex < this.axisY2.length) ? this.data[i].axisYIndex : 0];
						this.axisY2[(this.data[i].axisYIndex >= 0 && this.data[i].axisYIndex < this.axisY2.length) ? this.data[i].axisYIndex : 0].dataSeries.push(this.data[i]);
					}
					else {
						if (!this.axisY2.length) {
							if (this.plotInfo.axisPlacement === "normal") {
								this._axes.push(this.axisY2[0] = new Axis(this, "axisY2", this.options.axisY2, 0, "axisY", "right"));
							}
							else if (this.plotInfo.axisPlacement === "xySwapped") {
								this._axes.push(this.axisY2[0] = new Axis(this, "axisY2", this.options.axisY2, 0, "axisY", "top"));
							}
						}

						this.data[i].axisY = this.axisY2[0];
						this.axisY2[0].dataSeries.push(this.data[i]);
					}
				}

				if (!this.data[i].axisXType || this.data[i].axisXType === "primary") {

					if (this.options.axisX && this.options.axisX.length > 0) {
						if (!this.axisX.length) {
							for (var k = 0; k < this.options.axisX.length; k++) {
								if (this.plotInfo.axisPlacement === "normal") {
									this._axes.push(this.axisX[k] = new Axis(this, "axisX", this.options.axisX[k], k, "axisX", "bottom"));
								}
								else if (this.plotInfo.axisPlacement === "xySwapped") {
									this._axes.push(this.axisX[k] = new Axis(this, "axisX", this.options.axisX[k], k, "axisX", "left"));
								}
							}
						}
						this.data[i].axisX = this.axisX[(this.data[i].axisXIndex >= 0 && this.data[i].axisXIndex < this.axisX.length) ? this.data[i].axisXIndex : 0];
						this.axisX[(this.data[i].axisXIndex >= 0 && this.data[i].axisXIndex < this.axisX.length) ? this.data[i].axisXIndex : 0].dataSeries.push(this.data[i]);
					}
					else {
						if (!this.axisX.length) {
							if (this.plotInfo.axisPlacement === "normal") {
								this._axes.push(this.axisX[0] = new Axis(this, "axisX", this.options.axisX, 0, "axisX", "bottom"));
							}
							else if (this.plotInfo.axisPlacement === "xySwapped") {
								this._axes.push(this.axisX[0] = new Axis(this, "axisX", this.options.axisX, 0, "axisX", "left"));
							}
						}

						this.data[i].axisX = this.axisX[0];
						this.axisX[0].dataSeries.push(this.data[i]);
					}
				}
				if (this.data[i].axisXType === "secondary") {

					if (this.options.axisX2 && this.options.axisX2.length > 0) {
						if (!this.axisX2.length) {
							for (var k = 0; k < this.options.axisX2.length; k++) {
								if (this.plotInfo.axisPlacement === "normal") {
									this._axes.push(this.axisX2[k] = new Axis(this, "axisX2", this.options.axisX2[k], k, "axisX", "top"));
								}
								else if (this.plotInfo.axisPlacement === "xySwapped") {
									this._axes.push(this.axisX2[k] = new Axis(this, "axisX2", this.options.axisX2[k], k, "axisX", "right"));
								}
							}
						}
						this.data[i].axisX = this.axisX2[(this.data[i].axisXIndex >= 0 && this.data[i].axisXIndex < this.axisX2.length) ? this.data[i].axisXIndex : 0];
						this.axisX2[(this.data[i].axisXIndex >= 0 && this.data[i].axisXIndex < this.axisX2.length) ? this.data[i].axisXIndex : 0].dataSeries.push(this.data[i]);
					}
					else {
						if (!this.axisX2.length) {
							if (this.plotInfo.axisPlacement === "normal") {
								this._axes.push(this.axisX2[0] = new Axis(this, "axisX2", this.options.axisX2, 0, "axisX", "top"));
							}
							else if (this.plotInfo.axisPlacement === "xySwapped") {
								this._axes.push(this.axisX2[0] = new Axis(this, "axisX2", this.options.axisX2, 0, "axisX", "right"));
							}
						}

						this.data[i].axisX = this.axisX2[0];
						this.axisX2[0].dataSeries.push(this.data[i]);
					}
				}
			}
		}
		
		//If Both Primary and Secondary axis are present, disable gridlines for one of them unless the user has set value for both
		if (this.axisY) {
			for (var k = 1; k < this.axisY.length; k++) {
				if (typeof (this.axisY[k].options.gridThickness) === "undefined")
					this.axisY[k].gridThickness = 0;
			}
			for (var k = 0; k < this.axisY.length - 1; k++) {
				if (typeof (this.axisY[k].options.margin) === "undefined")
					this.axisY[k].margin = 10;
			}
		}

		if (this.axisY2) {
			for (var k = 1; k < this.axisY2.length; k++) {
				if (typeof (this.axisY2[k].options.gridThickness) === "undefined")
					this.axisY2[k].gridThickness = 0;
			}
			for (var k = 0; k < this.axisY2.length - 1; k++) {
				if (typeof (this.axisY2[k].options.margin) === "undefined")
					this.axisY2[k].margin = 10;
			}
		}

		if ((this.axisY && this.axisY.length > 0) && (this.axisY2 && this.axisY2.length > 0)) {
			if (this.axisY[0].gridThickness > 0 && typeof (this.axisY2[0].options.gridThickness) === "undefined")
				this.axisY2[0].gridThickness = 0;
			else if (this.axisY2[0].gridThickness > 0 && typeof (this.axisY[0].options.gridThickness) === "undefined")
				this.axisY[0].gridThickness = 0;
		}

		if (this.axisX) {
			for (var k = 0; k < this.axisX.length; k++) {
				if (typeof (this.axisX[k].options.gridThickness) === "undefined")
					this.axisX[k].gridThickness = 0;
			}
		}

		if (this.axisX2) {
			for (var k = 0; k < this.axisX2.length; k++) {
				if (typeof (this.axisX2[k].options.gridThickness) === "undefined")
					this.axisX2[k].gridThickness = 0;
			}
		}

		if ((this.axisX && this.axisX.length > 0) && (this.axisX2 && this.axisX2.length > 0)) {
			if (this.axisX[0].gridThickness > 0 && typeof (this.axisX2[0].options.gridThickness) === "undefined")
				this.axisX2[0].gridThickness = 0;
			else if (this.axisX2[0].gridThickness > 0 && typeof (this.axisX[0].options.gridThickness) === "undefined")
				this.axisX[0].gridThickness = 0;
		}

		//Show toolBar when viewportMinimum/viewportMaximum are set
		var showToolBar = false;
		if (this._axes.length > 0 && (this.zoomEnabled || this.panEnabled)) {
			for (var i = 0; i < this._axes.length; i++) {
				if (this._axes[i].viewportMinimum !== null || this._axes[i].viewportMaximum !== null) {
					showToolBar = true;
					break;
				}
			}
		}

		if (showToolBar) {
			show(this._zoomButton, this._resetButton);
			this._toolBar.style.border = this.toolbar.borderThickness + "px solid " + this.toolbar.borderColor;
			this._zoomButton.style.borderRight = this.toolbar.borderThickness + "px solid " + this.toolbar.borderColor;

			this._resetButton.style.borderRight = (this.exportEnabled ? this.toolbar.borderThickness : 0) + "px solid " + this.toolbar.borderColor;
		} else {
			hide(this._zoomButton, this._resetButton);
			this._toolBar.style.border = this.toolbar.borderThickness + "px solid transparent";
			if (this.options.zoomEnabled) {
				this.zoomEnabled = true;
				this.panEnabled = false;
			}
		}

		fWm(this);
		this._processData();// Categorises the dataSeries and calculates min, max and other values

		if (this.options.title) {
			this.title = new Title(this, this.options.title);

			if (!this.title.dockInsidePlotArea)
				this.title.render();
			else
				plotAreaElements.push(this.title);
		}

		if (this.options.subtitles) {
			this.subtitles = [];
			for (var i = 0; i < this.options.subtitles.length; i++) {
				var subtitle = new Subtitle(this, this.options.subtitles[i], i);
				this.subtitles.push(subtitle);

				if (!subtitle.dockInsidePlotArea)
					subtitle.render();
				else
					plotAreaElements.push(subtitle);
			}
		}


		this.legend = new Legend(this, this.options.legend);
		for (var i = 0; i < this.data.length; i++) {
			if (this.data[i].showInLegend || this.data[i].type === "pie" || this.data[i].type === "doughnut" || this.data[i].type === "funnel" || this.data[i].type === "pyramid") {
				this.legend.dataSeries.push(this.data[i]);
			}
		}

		if (!this.legend.dockInsidePlotArea)
			this.legend.render();
		else
			plotAreaElements.push(this.legend);

		for (var i = 0; i < this._axes.length; i++)
			if (this._axes[i].scaleBreaks && this._axes[i].scaleBreaks._appliedBreaks.length) {
				if (isCanvasSupported) {
					this._breaksCanvas = createCanvas(this.width, this.height, true);
					this._breaksCanvasCtx = this._breaksCanvas.getContext("2d");
				}
				else {
					this._breaksCanvas = this.canvas;
					this._breaksCanvasCtx = this.ctx;
				}
				break;
			}

		this._preRenderCanvas = createCanvas(this.width, this.height);
		this._preRenderCtx = this._preRenderCanvas.getContext("2d");

		//TBI: Revisit and check if the functionality is enough.
		if (this.plotInfo.axisPlacement === "normal" || this.plotInfo.axisPlacement === "xySwapped") {

			//var freeSpace = this.layoutManager.getFreeSpace();

			Axis.setLayoutAndRender(this.axisX, this.axisX2, this.axisY, this.axisY2, this.plotInfo.axisPlacement, this.layoutManager.getFreeSpace());
		} else if (this.plotInfo.axisPlacement === "none") {
			//In case of charts with axis this method is called inside setLayoutAndRender
			this.preparePlotArea();
		}
		else {
			return;
		}

		for (var index = 0; index < plotAreaElements.length; index++) {
			plotAreaElements[index].render();
		}

		var animations = [];
		if (this.animatedRender) {
			var initialState = createCanvas(this.width, this.height);
			var initialStateCtx = initialState.getContext("2d");
			initialStateCtx.drawImage(this.canvas, 0, 0, this.width, this.height);
		}

		addCreditLink(this);

		var defaultMiterLimit = this.ctx.miterLimit, plotUnitDefaultMiterLimit;
		this.ctx.miterLimit = 3;

		if (isCanvasSupported && this._breaksCanvas) {
			this._preRenderCtx.drawImage(this.canvas, 0, 0, this.width, this.height);
			this._preRenderCtx.drawImage(this._breaksCanvas, 0, 0, this.width, this.height);
			//this._breaksCanvasCtx.save();
			this._breaksCanvasCtx.globalCompositeOperation = "source-atop";
			this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height);
			//this._breaksCanvasCtx.restore();
			this._preRenderCtx.clearRect(0, 0, this.width, this.height);
		}

		for (var i = 0; i < this.plotInfo.plotTypes.length; i++) {
			var plotType = this.plotInfo.plotTypes[i];

			for (var j = 0; j < plotType.plotUnits.length; j++) {

				var plotUnit = plotType.plotUnits[j];
				var animationInfo = null;

				plotUnit.targetCanvas = null; //In case chart updates before the animation is complete, previous canvases need to be removed

				if (this.animatedRender) {
					plotUnit.targetCanvas = createCanvas(this.width, this.height);
					plotUnit.targetCanvasCtx = plotUnit.targetCanvas.getContext("2d");
					plotUnitDefaultMiterLimit = plotUnit.targetCanvasCtx.miterLimit;
					plotUnit.targetCanvasCtx.miterLimit = 3;
				}

				if (plotUnit.type === "line")
					animationInfo = this.renderLine(plotUnit);
				else if (plotUnit.type === "stepLine")
					animationInfo = this.renderStepLine(plotUnit);
				else if (plotUnit.type === "spline")
					animationInfo = this.renderSpline(plotUnit);
				else if (plotUnit.type === "column")
					animationInfo = this.renderColumn(plotUnit);
				else if (plotUnit.type === "bar")
					animationInfo = this.renderBar(plotUnit);
				else if (plotUnit.type === "area")
					animationInfo = this.renderArea(plotUnit);
				else if (plotUnit.type === "stepArea")
					animationInfo = this.renderStepArea(plotUnit);
				else if (plotUnit.type === "splineArea")
					animationInfo = this.renderSplineArea(plotUnit);
				else if (plotUnit.type === "stackedColumn")
					animationInfo = this.renderStackedColumn(plotUnit);
				else if (plotUnit.type === "stackedColumn100")
					animationInfo = this.renderStackedColumn100(plotUnit);
				else if (plotUnit.type === "stackedBar")
					animationInfo = this.renderStackedBar(plotUnit);
				else if (plotUnit.type === "stackedBar100")
					animationInfo = this.renderStackedBar100(plotUnit);
				else if (plotUnit.type === "stackedArea")
					animationInfo = this.renderStackedArea(plotUnit);
				else if (plotUnit.type === "stackedArea100")
					animationInfo = this.renderStackedArea100(plotUnit);
				else if (plotUnit.type === "bubble")
					animationInfo = animationInfo = this.renderBubble(plotUnit);
				else if (plotUnit.type === "scatter")
					animationInfo = this.renderScatter(plotUnit);
				else if (plotUnit.type === "pie")
					this.renderPie(plotUnit);
				else if (plotUnit.type === "doughnut")
					this.renderPie(plotUnit);
				else if (plotUnit.type === "funnel")
					animationInfo = this.renderFunnel(plotUnit);
				else if (plotUnit.type === "pyramid")
					animationInfo = this.renderFunnel(plotUnit);
				else if (plotUnit.type === "candlestick")
					animationInfo = this.renderCandlestick(plotUnit);
				else if (plotUnit.type === "ohlc")
					animationInfo = this.renderCandlestick(plotUnit);
				else if (plotUnit.type === "rangeColumn")
					animationInfo = this.renderRangeColumn(plotUnit);
				else if (plotUnit.type === "error")
					animationInfo = this.renderError(plotUnit);
				else if (plotUnit.type === "rangeBar")
					animationInfo = this.renderRangeBar(plotUnit);
				else if (plotUnit.type === "rangeArea")
					animationInfo = this.renderRangeArea(plotUnit);
				else if (plotUnit.type === "rangeSplineArea")
					animationInfo = this.renderRangeSplineArea(plotUnit);
				else if (plotUnit.type === "waterfall")
					animationInfo = this.renderWaterfall(plotUnit);
				else if (plotUnit.type === "boxAndWhisker")
					animationInfo = this.renderBoxAndWhisker(plotUnit);

				for (var k = 0; k < plotUnit.dataSeriesIndexes.length; k++) {
					this._dataInRenderedOrder.push(this.data[plotUnit.dataSeriesIndexes[k]]);
				}

				if (this.animatedRender) {
					plotUnit.targetCanvasCtx.miterLimit = plotUnitDefaultMiterLimit;
					if (animationInfo)
						animations.push(animationInfo);
				}
			}
		}

		this.ctx.miterLimit = defaultMiterLimit;

		if (this.animatedRender && this._breaksCanvasCtx) //Pushing breaks animation
			animations.push({
				source: this._breaksCanvasCtx, dest: this.plotArea.ctx, animationCallback: AnimationHelper.fadeInAnimation, easingFunction: AnimationHelper.easing.easeInQuad, animationBase: 0, startTimePercent: .7
			});

		if (this.animatedRender && this._indexLabels.length > 0) {
			var indexLabelCanvas = createCanvas(this.width, this.height);
			var indexLabelCanvasCtx = indexLabelCanvas.getContext("2d");
			animations.push(this.renderIndexLabels(indexLabelCanvasCtx));
		}

		var _this = this;

		if (animations.length > 0) {
			//var animationCount = 0;
			_this.disableToolTip = true;
			_this._animator.animate(200, _this.animationDuration, function (fractionComplete) {

				//console.log(fractionComplete);
				//animationCount++;

				_this.ctx.clearRect(0, 0, _this.width, _this.height);


				//  _this.ctx.drawImage(initialState, 0, 0, _this.width * devicePixelBackingStoreRatio, _this.height * devicePixelBackingStoreRatio, 0, 0, _this.width, _this.height);                
				_this.ctx.drawImage(initialState, 0, 0, Math.floor(_this.width * devicePixelBackingStoreRatio), Math.floor(_this.height * devicePixelBackingStoreRatio), 0, 0, _this.width, _this.height);

				for (var l = 0; l < animations.length; l++) {

					animationInfo = animations[l];

					if (fractionComplete < 1 && typeof (animationInfo.startTimePercent) !== "undefined") {
						if (fractionComplete >= animationInfo.startTimePercent) {
							//animationInfo.animationCallback(AnimationHelper.easing.linear(fractionComplete - animationInfo.startTimePercent, 0, 1, 1 - animationInfo.startTimePercent), animationInfo);

							animationInfo.animationCallback(animationInfo.easingFunction(fractionComplete - animationInfo.startTimePercent, 0, 1, 1 - animationInfo.startTimePercent), animationInfo);
						}
					} else {

						animationInfo.animationCallback(animationInfo.easingFunction(fractionComplete, 0, 1, 1), animationInfo);
					}
				}

				_this.dispatchEvent("dataAnimationIterationEnd",
					{
						chart: _this
					});

			}, function () {

				animations = [];

				var count = 0;

				//Delete all render target canvases used for animation.
				for (var i = 0; i < _this.plotInfo.plotTypes.length; i++) {
					var plotType = _this.plotInfo.plotTypes[i];

					for (var j = 0; j < plotType.plotUnits.length; j++) {
						var plotUnit = plotType.plotUnits[j];
						plotUnit.targetCanvas = null;
					}
				}

				initialState = null;
				_this.disableToolTip = false;
				//console.log("*********** Animation Complete - " + animationCount + " ***********");

			});
		} else {
			if (_this._breaksCanvas) //rendering Breaks on Main Canvas
				if (isCanvasSupported)
					_this.plotArea.ctx.drawImage(_this._breaksCanvas, 0, 0, this.width, this.height);
				else // for IE <= 8 breaks will be directly on top of main Canvas					
					for (var k = 0; k < _this._axes.length; k++)
						_this._axes[k].createMask();

			if (_this._indexLabels.length > 0)
				_this.renderIndexLabels();

			_this.dispatchEvent("dataAnimationIterationEnd",
				{
					chart: _this
				});
		}

		this.attachPlotAreaEventHandlers();

		if (!this.zoomEnabled && !this.panEnabled && this._zoomButton && this._zoomButton.style.display !== "none") {
			hide(this._zoomButton, this._resetButton);
		}

		this.toolTip._updateToolTip();

		this.renderCount++;

		//if (window.console) {
		//    window.console.log(new Date().getTime() - dt);
		//}

		if (isDebugMode) {

			var _this = this;
			setTimeout(function () {
				var ghostCanvasCopy = document.getElementById("ghostCanvasCopy");

				if (ghostCanvasCopy) {
					//console.log(ghostCanvasCopy.clientWidth);
					setCanvasSize(ghostCanvasCopy, _this.width, _this.height);
					var ghostCanvasCopyCtx = ghostCanvasCopy.getContext("2d");

					//ghostCanvasCopyCtx.scale(1, 1);
					//var imageData = this._eventManager.ghostCtx.getImageData(0, 0, this.container.clientWidth, this.container.clientHeight);
					//this._eventManager.ghostCtx.drawImage(this._eventManager.ghostCanvas, 0, 0);
					//this.ctx.drawImage(this._eventManager.ghostCanvas, 0, 0);

					ghostCanvasCopyCtx.drawImage(_this._eventManager.ghostCanvas, 0, 0);
					//_this._canvasJSContainer.appendChild(_this._eventManager.ghostCanvas);
					//_this.overlaidCanvasCtx.drawImage(_this._eventManager.ghostCanvas, 0, 0);
				}
			}, 2000);
		}		

		if (this._breaksCanvas) {
			delete this._breaksCanvas;
			delete this._breaksCanvasCtx;
		}

		for (var k = 0; k < this._axes.length; k++)
			if (this._axes[k].maskCanvas) {
				delete this._axes[k].maskCanvas;
				delete this._axes[k].maskCtx;
			}
	}

	Chart.prototype.attachPlotAreaEventHandlers = function () {

		//this._toolBar.style.display = "inline";

		this.attachEvent({
			context: this,
			chart: this,
			mousedown: this._plotAreaMouseDown,
			mouseup: this._plotAreaMouseUp,
			mousemove: this._plotAreaMouseMove,
			cursor: this.panEnabled ? "move" : "default",
			capture: true,
			bounds: this.plotArea
		});

	}

	Chart.prototype.categoriseDataSeries = function () {
		var dataSeries = "";

		for (var i = 0; i < this.data.length; i++) {
			dataSeries = this.data[i]
			if (!dataSeries.dataPoints || dataSeries.dataPoints.length === 0 || !dataSeries.visible)
				continue;

			if (Chart._supportedChartTypes.indexOf(dataSeries.type) >= 0) {

				var plotType = null;
				var plotTypeExists = false;

				var plotUnit = null;
				var plotUnitExists = false;

				for (var j = 0; j < this.plotInfo.plotTypes.length; j++) {
					if (this.plotInfo.plotTypes[j].type === dataSeries.type) {
						plotTypeExists = true;
						var plotType = this.plotInfo.plotTypes[j];
						break;
					}
				}

				if (!plotTypeExists) {
					plotType = {
						type: dataSeries.type,
						totalDataSeries: 0,
						plotUnits: []
					};
					this.plotInfo.plotTypes.push(plotType)
				}

				for (var j = 0; j < plotType.plotUnits.length; j++) {
					if ((plotType.plotUnits[j].axisYType === dataSeries.axisYType && plotType.plotUnits[j].axisXType === dataSeries.axisXType) && (plotType.plotUnits[j].axisYIndex === dataSeries.axisYIndex && plotType.plotUnits[j].axisXIndex === dataSeries.axisXIndex)) {
						plotUnitExists = true;
						var plotUnit = plotType.plotUnits[j];
						break;
					}
				}

				if (!plotUnitExists) {
					plotUnit = {
						type: dataSeries.type,
						previousDataSeriesCount: 0, //to be set next
						index: plotType.plotUnits.length,
						plotType: plotType,
						axisXType: dataSeries.axisXType,
						axisYType: dataSeries.axisYType,
						axisYIndex: dataSeries.axisYIndex,
						axisXIndex: dataSeries.axisXIndex,
						axisY: dataSeries.axisYType === "primary" ? (this.axisY[(dataSeries.axisYIndex >= 0 && dataSeries.axisYIndex < this.axisY.length) ? dataSeries.axisYIndex : 0]) : (this.axisY2[(dataSeries.axisYIndex >= 0 && dataSeries.axisYIndex < this.axisY2.length) ? dataSeries.axisYIndex : 0]),
						axisX: dataSeries.axisXType === "primary" ? (this.axisX[(dataSeries.axisXIndex >= 0 && dataSeries.axisXIndex < this.axisX.length) ? dataSeries.axisXIndex : 0]) : (this.axisX2[(dataSeries.axisXIndex >= 0 && dataSeries.axisXIndex < this.axisX2.length) ? dataSeries.axisXIndex : 0]),
						dataSeriesIndexes: [], //index of dataSeries
						yTotals: []
					}
					plotType.plotUnits.push(plotUnit);
				}

				plotType.totalDataSeries++;

				plotUnit.dataSeriesIndexes.push(i);

				dataSeries.plotUnit = plotUnit;

			}
		}

		for (var i = 0; i < this.plotInfo.plotTypes.length; i++) {
			var plotType = this.plotInfo.plotTypes[i];
			var previousDataSeriesCount = 0;

			for (var j = 0; j < plotType.plotUnits.length; j++) {

				plotType.plotUnits[j].previousDataSeriesCount = previousDataSeriesCount;

				previousDataSeriesCount += plotType.plotUnits[j].dataSeriesIndexes.length;
			}
		}
	}

	Chart.prototype.assignIdToDataPoints = function () {

		for (var i = 0; i < this.data.length; i++) {
			var dataSeries = this.data[i];

			if (!dataSeries.dataPoints)
				continue;

			var length = dataSeries.dataPoints.length;

			for (var j = 0; j < length; j++) {
				dataSeries.dataPointIds[j] = ++this._eventManager.lastObjectId;
			}
		}
	}

	Chart.prototype._processData = function () {
		this.assignIdToDataPoints();
		this.categoriseDataSeries();

		for (var i = 0; i < this.plotInfo.plotTypes.length; i++) {
			var plotType = this.plotInfo.plotTypes[i];

			for (var j = 0; j < plotType.plotUnits.length; j++) {

				var plotUnit = plotType.plotUnits[j];

				if (plotUnit.type === "line" || plotUnit.type === "stepLine" || plotUnit.type === "spline" || plotUnit.type === "column" || plotUnit.type === "area" || plotUnit.type === "stepArea" || plotUnit.type === "splineArea" || plotUnit.type === "bar" || plotUnit.type === "bubble" || plotUnit.type === "scatter")
					this._processMultiseriesPlotUnit(plotUnit);
				else if (plotUnit.type === "stackedColumn" || plotUnit.type === "stackedBar" || plotUnit.type === "stackedArea")
					this._processStackedPlotUnit(plotUnit);
				else if (plotUnit.type === "stackedColumn100" || plotUnit.type === "stackedBar100" || plotUnit.type === "stackedArea100")
					this._processStacked100PlotUnit(plotUnit);
				else if (plotUnit.type === "candlestick" || plotUnit.type === "ohlc" || plotUnit.type === "rangeColumn" || plotUnit.type === "rangeBar" || plotUnit.type === "rangeArea" || plotUnit.type === "rangeSplineArea" || plotUnit.type === "error" || plotUnit.type === "boxAndWhisker")
					this._processMultiYPlotUnit(plotUnit);
				else if (plotUnit.type === "waterfall")
					this._processSpecificPlotUnit(plotUnit);
			}
		}

		this.calculateAutoBreaks();
	}

	Chart.prototype._processMultiseriesPlotUnit = function (plotUnit) {
		if (!plotUnit.dataSeriesIndexes || plotUnit.dataSeriesIndexes.length < 1)
			return;

		var axisYDataInfo = plotUnit.axisY.dataInfo;
		var axisXDataInfo = plotUnit.axisX.dataInfo;
		var dataPointX, dataPointY;
		var isDateTime = false;


		for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {
			var dataSeries = this.data[plotUnit.dataSeriesIndexes[j]];
			var i = 0;
			var isFirstDPInViewPort = false;
			var isLastDPInViewPort = false;
			var prevNonNullX;

			if (dataSeries.axisPlacement === "normal" || dataSeries.axisPlacement === "xySwapped") {

				var plotAreaXMin = plotUnit.axisX.sessionVariables.newViewportMinimum ? plotUnit.axisX.sessionVariables.newViewportMinimum : (this.options.axisX && this.options.axisX.viewportMinimum) ?
					this.options.axisX.viewportMinimum : (this.options.axisX && this.options.axisX.minimum) ? this.options.axisX.minimum : plotUnit.axisX.logarithmic ? 0 : -Infinity;

				var plotAreaXMax = plotUnit.axisX.sessionVariables.newViewportMaximum ? plotUnit.axisX.sessionVariables.newViewportMaximum : (this.options.axisX && this.options.axisX.viewportMaximum) ?
					this.options.axisX.viewportMaximum : (this.options.axisX && this.options.axisX.maximum) ? this.options.axisX.maximum : Infinity;
			}


			if (dataSeries.dataPoints[i].x && dataSeries.dataPoints[i].x.getTime || dataSeries.xValueType === "dateTime") {
				isDateTime = true;
			}

			for (i = 0; i < dataSeries.dataPoints.length; i++) {

				if (typeof dataSeries.dataPoints[i].x === "undefined") {
					dataSeries.dataPoints[i].x = i + (plotUnit.axisX.logarithmic ? 1 : 0);
				}

				if (dataSeries.dataPoints[i].x.getTime) {
					isDateTime = true;
					dataPointX = dataSeries.dataPoints[i].x.getTime();//dataPointX is used so that getTime is called only once in case of dateTime values
				}
				else
					dataPointX = dataSeries.dataPoints[i].x;

				dataPointY = dataSeries.dataPoints[i].y;


				if (dataPointX < axisXDataInfo.min)
					axisXDataInfo.min = dataPointX;
				if (dataPointX > axisXDataInfo.max)
					axisXDataInfo.max = dataPointX;

				if (dataPointY < axisYDataInfo.min && typeof dataPointY === "number")
					axisYDataInfo.min = dataPointY;

				if (dataPointY > axisYDataInfo.max && typeof dataPointY === "number")
					axisYDataInfo.max = dataPointY;


				if (i > 0) {
					if (plotUnit.axisX.logarithmic) {
						var xDiff = dataPointX / dataSeries.dataPoints[i - 1].x;
						xDiff < 1 && (xDiff = 1 / xDiff); //If Condition shortcut

						if (axisXDataInfo.minDiff > xDiff && xDiff !== 1) {
							axisXDataInfo.minDiff = xDiff;
						}
					}
					else {
						var xDiff = dataPointX - dataSeries.dataPoints[i - 1].x;
						xDiff < 0 && (xDiff = xDiff * -1); //If Condition shortcut

						if (axisXDataInfo.minDiff > xDiff && xDiff !== 0) {
							axisXDataInfo.minDiff = xDiff;
						}
					}

					if (dataPointY !== null && dataSeries.dataPoints[i - 1].y !== null) {
						if (plotUnit.axisY.logarithmic) {
							var yDiff = dataPointY / dataSeries.dataPoints[i - 1].y;
							yDiff < 1 && (yDiff = 1 / yDiff); //If Condition shortcut

							if (axisYDataInfo.minDiff > yDiff && yDiff !== 1) {
								axisYDataInfo.minDiff = yDiff;
							}
						}
						else {
							var yDiff = dataPointY - dataSeries.dataPoints[i - 1].y;
							yDiff < 0 && (yDiff = yDiff * -1); //If Condition shortcut

							if (axisYDataInfo.minDiff > yDiff && yDiff !== 0) {
								axisYDataInfo.minDiff = yDiff;
							}
						}
					}
				}

				// This section makes sure that partially visible dataPoints are included in the begining
				if (dataPointX < plotAreaXMin && !isFirstDPInViewPort) {
					if (dataPointY !== null)
						prevNonNullX = dataPointX;
					continue;
				} else if (!isFirstDPInViewPort) {
					isFirstDPInViewPort = true;

					if (i > 0) {
						i -= 2;
						continue;
					}
				}

				// This section makes sure that partially visible dataPoints are included at the end
				if (dataPointX > plotAreaXMax && !isLastDPInViewPort) {
					isLastDPInViewPort = true;
				} else if (dataPointX > plotAreaXMax && isLastDPInViewPort) {
					continue;
				}

				if (dataSeries.dataPoints[i].label)
					plotUnit.axisX.labels[dataPointX] = dataSeries.dataPoints[i].label;


				if (dataPointX < axisXDataInfo.viewPortMin)
					axisXDataInfo.viewPortMin = dataPointX;
				if (dataPointX > axisXDataInfo.viewPortMax)
					axisXDataInfo.viewPortMax = dataPointX;

				if (dataPointY === null) {
					if (axisXDataInfo.viewPortMin === dataPointX && prevNonNullX < dataPointX)
						axisXDataInfo.viewPortMin = prevNonNullX;
					continue;
				}


				if (dataPointY < axisYDataInfo.viewPortMin && typeof dataPointY === "number")
					axisYDataInfo.viewPortMin = dataPointY;
				if (dataPointY > axisYDataInfo.viewPortMax && typeof dataPointY === "number")
					axisYDataInfo.viewPortMax = dataPointY;
			}

			dataSeries.axisX.valueType = dataSeries.xValueType = isDateTime ? "dateTime" : "number";
		}

		//this.dataPoints.sort(compareDataPointX);
		//this.dataPoints.sort(function (dataPoint1, dataPoint2) { return dataPoint1.x - dataPoint2.x; });
	}

	Chart.prototype._processStackedPlotUnit = function (plotUnit) {
		if (!plotUnit.dataSeriesIndexes || plotUnit.dataSeriesIndexes.length < 1)
			return;

		var axisYDataInfo = plotUnit.axisY.dataInfo;
		var axisXDataInfo = plotUnit.axisX.dataInfo;

		var dataPointX, dataPointY;
		var isDateTime = false;

		var dataPointYPositiveSums = [];
		var dataPointYNegativeSums = [];

		var yMinLimit = Infinity;
		var yMaxLimit = -Infinity;

		for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {
			var dataSeries = this.data[plotUnit.dataSeriesIndexes[j]];
			var i = 0;
			var isFirstDPInViewPort = false;
			var isLastDPInViewPort = false;
			var prevNonNullX;

			if (dataSeries.axisPlacement === "normal" || dataSeries.axisPlacement === "xySwapped") {

				var plotAreaXMin = this.sessionVariables.axisX.newViewportMinimum ? this.sessionVariables.axisX.newViewportMinimum : (this.options.axisX && this.options.axisX.viewportMinimum) ?
					this.options.axisX.viewportMinimum : (this.options.axisX && this.options.axisX.minimum) ? this.options.axisX.minimum : -Infinity;

				var plotAreaXMax = this.sessionVariables.axisX.newViewportMaximum ? this.sessionVariables.axisX.newViewportMaximum : (this.options.axisX && this.options.axisX.viewportMaximum) ?
					this.options.axisX.viewportMaximum : (this.options.axisX && this.options.axisX.maximum) ? this.options.axisX.maximum : Infinity;
			}


			if (dataSeries.dataPoints[i].x && dataSeries.dataPoints[i].x.getTime || dataSeries.xValueType === "dateTime") {
				isDateTime = true;
			}

			for (i = 0; i < dataSeries.dataPoints.length; i++) {

				// Requird when no x values are provided 
				if (typeof dataSeries.dataPoints[i].x === "undefined") {
					dataSeries.dataPoints[i].x = i + (plotUnit.axisX.logarithmic ? 1 : 0);
				}

				if (dataSeries.dataPoints[i].x.getTime) {
					isDateTime = true;
					dataPointX = dataSeries.dataPoints[i].x.getTime();//dataPointX is used so that getTime is called only once in case of dateTime values
				}
				else
					dataPointX = dataSeries.dataPoints[i].x;

				if (!isNullOrUndefined(dataSeries.dataPoints[i].y)) {
					dataPointY = dataSeries.dataPoints[i].y;
				}
				else {
					dataPointY = 0;
				}

				if (dataPointX < axisXDataInfo.min)
					axisXDataInfo.min = dataPointX;
				if (dataPointX > axisXDataInfo.max)
					axisXDataInfo.max = dataPointX;

				if (i > 0) {
					if (plotUnit.axisX.logarithmic) {
						var xDiff = dataPointX / dataSeries.dataPoints[i - 1].x;
						xDiff < 1 && (xDiff = 1 / xDiff); //If Condition shortcut

						if (axisXDataInfo.minDiff > xDiff && xDiff !== 1) {
							axisXDataInfo.minDiff = xDiff;
						}
					} else {
						var xDiff = dataPointX - dataSeries.dataPoints[i - 1].x;
						xDiff < 0 && (xDiff = xDiff * -1); //If Condition shortcut

						if (axisXDataInfo.minDiff > xDiff && xDiff !== 0) {
							axisXDataInfo.minDiff = xDiff;
						}
					}

					if (dataPointY !== null && dataSeries.dataPoints[i - 1].y !== null) {
						if (plotUnit.axisY.logarithmic) {
							if (dataPointY > 0) {
								var yDiff = dataPointY / dataSeries.dataPoints[i - 1].y;
								yDiff < 1 && (yDiff = 1 / yDiff); //If Condition shortcut

								if (axisYDataInfo.minDiff > yDiff && yDiff !== 1) {
									axisYDataInfo.minDiff = yDiff;
								}
							}
						} else {
							var yDiff = dataPointY - dataSeries.dataPoints[i - 1].y;
							yDiff < 0 && (yDiff = yDiff * -1); //If Condition shortcut

							if (axisYDataInfo.minDiff > yDiff && yDiff !== 0) {
								axisYDataInfo.minDiff = yDiff;
							}
						}

					}
				}

				// This section makes sure that partially visible dataPoints are included in the begining
				if (dataPointX < plotAreaXMin && !isFirstDPInViewPort) {
					if (dataSeries.dataPoints[i].y !== null)
						prevNonNullX = dataPointX;
					continue;
				} else if (!isFirstDPInViewPort) {
					isFirstDPInViewPort = true;

					if (i > 0) {
						i -= 2;
						continue;
					}
				}

				// This section makes sure that partially visible dataPoints are included at the end
				if (dataPointX > plotAreaXMax && !isLastDPInViewPort) {
					isLastDPInViewPort = true;
				} else if (dataPointX > plotAreaXMax && isLastDPInViewPort) {
					continue;
				}


				if (dataSeries.dataPoints[i].label)
					plotUnit.axisX.labels[dataPointX] = dataSeries.dataPoints[i].label;

				if (dataPointX < axisXDataInfo.viewPortMin)
					axisXDataInfo.viewPortMin = dataPointX;
				if (dataPointX > axisXDataInfo.viewPortMax)
					axisXDataInfo.viewPortMax = dataPointX;

				if (dataSeries.dataPoints[i].y === null) {
					if (axisXDataInfo.viewPortMin === dataPointX && prevNonNullX < dataPointX)
						axisXDataInfo.viewPortMin = prevNonNullX;
					continue;
				}

				plotUnit.yTotals[dataPointX] = (!plotUnit.yTotals[dataPointX] ? 0 : plotUnit.yTotals[dataPointX]) + dataPointY;

				if (dataPointY >= 0) {
					if (dataPointYPositiveSums[dataPointX])
						dataPointYPositiveSums[dataPointX] += dataPointY;
					else {
						dataPointYPositiveSums[dataPointX] = dataPointY;
						yMinLimit = Math.min(dataPointY, yMinLimit);
					}
				} else {
					if (dataPointYNegativeSums[dataPointX])
						dataPointYNegativeSums[dataPointX] += dataPointY;
					else {
						dataPointYNegativeSums[dataPointX] = dataPointY;
						yMaxLimit = Math.max(dataPointY, yMaxLimit);
					}
				}
			}

			if (plotUnit.axisY.scaleBreaks && plotUnit.axisY.scaleBreaks.autoCalculate && plotUnit.axisY.scaleBreaks.maxNumberOfAutoBreaks >= 1) {
				if (!axisYDataInfo.dataPointYPositiveSums) {
					axisYDataInfo.dataPointYPositiveSums = dataPointYPositiveSums;
					axisYDataInfo.dataPointYNegativeSums = dataPointYNegativeSums;
				}
				else {
					axisYDataInfo.dataPointYPositiveSums.push.apply(axisYDataInfo.dataPointYPositiveSums, dataPointYPositiveSums);
					axisYDataInfo.dataPointYNegativeSums.push.apply(axisYDataInfo.dataPointYPositiveSums, dataPointYNegativeSums);
				}
			}
			dataSeries.axisX.valueType = dataSeries.xValueType = isDateTime ? "dateTime" : "number";
		}

		for (i in dataPointYPositiveSums) {
			if (dataPointYPositiveSums.hasOwnProperty(i)) {
				if (isNaN(i)) {
					continue;
				}
				var ySum = dataPointYPositiveSums[i];

				if (ySum < axisYDataInfo.min)
					axisYDataInfo.min = Math.min(ySum, yMinLimit);

				if (ySum > axisYDataInfo.max)
					axisYDataInfo.max = ySum;

				if (i < axisXDataInfo.viewPortMin || i > axisXDataInfo.viewPortMax)
					continue;

				if (ySum < axisYDataInfo.viewPortMin)
					axisYDataInfo.viewPortMin = Math.min(ySum, yMinLimit);
				if (ySum > axisYDataInfo.viewPortMax)
					axisYDataInfo.viewPortMax = ySum;
			}

		}

		for (i in dataPointYNegativeSums) {

			if (dataPointYNegativeSums.hasOwnProperty(i)) {
				if (isNaN(i)) {
					continue;
				}

				var ySum = dataPointYNegativeSums[i];

				if (ySum < axisYDataInfo.min)
					axisYDataInfo.min = ySum;

				if (ySum > axisYDataInfo.max)
					axisYDataInfo.max = Math.max(ySum, yMaxLimit);

				if (i < axisXDataInfo.viewPortMin || i > axisXDataInfo.viewPortMax)
					continue;

				if (ySum < axisYDataInfo.viewPortMin)
					axisYDataInfo.viewPortMin = ySum;
				if (ySum > axisYDataInfo.viewPortMax)
					axisYDataInfo.viewPortMax = Math.max(ySum, yMaxLimit);
			}

		}



		//this.dataPoints.sort(compareDataPointX);
		//this.dataPoints.sort(function (dataPoint1, dataPoint2) { return dataPoint1.x - dataPoint2.x; });

		//window.console.log("viewPortYMin: " + plotInfo.viewPortYMin + "; viewPortYMax: " + plotInfo.viewPortYMax);
	}

	Chart.prototype._processStacked100PlotUnit = function (plotUnit) {
		if (!plotUnit.dataSeriesIndexes || plotUnit.dataSeriesIndexes.length < 1)
			return;

		var axisYDataInfo = plotUnit.axisY.dataInfo;
		var axisXDataInfo = plotUnit.axisX.dataInfo;

		var dataPointX, dataPointY;
		var isDateTime = false;
		var containsPositiveY = false;
		var containsNegativeY = false;

		var dataPointYSums = [];

		for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {
			var dataSeries = this.data[plotUnit.dataSeriesIndexes[j]];
			var i = 0;
			var isFirstDPInViewPort = false;
			var isLastDPInViewPort = false;
			var prevNonNullX;

			if (dataSeries.axisPlacement === "normal" || dataSeries.axisPlacement === "xySwapped") {

				var plotAreaXMin = this.sessionVariables.axisX.newViewportMinimum ? this.sessionVariables.axisX.newViewportMinimum : (this.options.axisX && this.options.axisX.viewportMinimum) ?
					this.options.axisX.viewportMinimum : (this.options.axisX && this.options.axisX.minimum) ? this.options.axisX.minimum : -Infinity;

				var plotAreaXMax = this.sessionVariables.axisX.newViewportMaximum ? this.sessionVariables.axisX.newViewportMaximum : (this.options.axisX && this.options.axisX.viewportMaximum) ?
					this.options.axisX.viewportMaximum : (this.options.axisX && this.options.axisX.maximum) ? this.options.axisX.maximum : Infinity;
			}


			if (dataSeries.dataPoints[i].x && dataSeries.dataPoints[i].x.getTime || dataSeries.xValueType === "dateTime") {
				isDateTime = true;
			}

			for (i = 0; i < dataSeries.dataPoints.length; i++) {

				// Requird when no x values are provided 
				if (typeof dataSeries.dataPoints[i].x === "undefined") {
					dataSeries.dataPoints[i].x = i + (plotUnit.axisX.logarithmic ? 1 : 0);
				}

				if (dataSeries.dataPoints[i].x.getTime) {
					isDateTime = true;
					dataPointX = dataSeries.dataPoints[i].x.getTime();//dataPointX is used so that getTime is called only once in case of dateTime values
				}
				else
					dataPointX = dataSeries.dataPoints[i].x;
				if (!isNullOrUndefined(dataSeries.dataPoints[i].y))
					dataPointY = dataSeries.dataPoints[i].y;
				else
					dataPointY = null;



				if (dataPointX < axisXDataInfo.min)
					axisXDataInfo.min = dataPointX;
				if (dataPointX > axisXDataInfo.max)
					axisXDataInfo.max = dataPointX;

				if (i > 0) {
					if (plotUnit.axisX.logarithmic) {
						var xDiff = dataPointX / dataSeries.dataPoints[i - 1].x;
						xDiff < 1 && (xDiff = 1 / xDiff); //If Condition shortcut

						if (axisXDataInfo.minDiff > xDiff && xDiff !== 1) {
							axisXDataInfo.minDiff = xDiff;
						}
					} else {
						var xDiff = dataPointX - dataSeries.dataPoints[i - 1].x;
						xDiff < 0 && (xDiff = xDiff * -1); //If Condition shortcut

						if (axisXDataInfo.minDiff > xDiff && xDiff !== 0) {
							axisXDataInfo.minDiff = xDiff;
						}
					}

					if (!isNullOrUndefined(dataPointY) && dataSeries.dataPoints[i - 1].y !== null) {
						if (plotUnit.axisY.logarithmic) {
							if (dataPointY > 0) {
								var yDiff = dataPointY / dataSeries.dataPoints[i - 1].y;
								yDiff < 1 && (yDiff = 1 / yDiff); //If Condition shortcut

								if (axisYDataInfo.minDiff > yDiff && yDiff !== 1) {
									axisYDataInfo.minDiff = yDiff;
								}
							}
						} else {
							var yDiff = dataPointY - dataSeries.dataPoints[i - 1].y;
							yDiff < 0 && (yDiff = yDiff * -1); //If Condition shortcut

							if (axisYDataInfo.minDiff > yDiff && yDiff !== 0) {
								axisYDataInfo.minDiff = yDiff;
							}
						}
					}
				}

				// This section makes sure that partially visible dataPoints are included in the begining
				if (dataPointX < plotAreaXMin && !isFirstDPInViewPort) {
					if (dataPointY !== null)
						prevNonNullX = dataPointX;
					continue;
				} else if (!isFirstDPInViewPort) {
					isFirstDPInViewPort = true;

					if (i > 0) {
						i -= 2;
						continue;
					}
				}

				// This section makes sure that partially visible dataPoints are included at the end
				if (dataPointX > plotAreaXMax && !isLastDPInViewPort) {
					isLastDPInViewPort = true;
				} else if (dataPointX > plotAreaXMax && isLastDPInViewPort) {
					continue;
				}

				if (dataSeries.dataPoints[i].label)
					plotUnit.axisX.labels[dataPointX] = dataSeries.dataPoints[i].label;

				if (dataPointX < axisXDataInfo.viewPortMin)
					axisXDataInfo.viewPortMin = dataPointX;
				if (dataPointX > axisXDataInfo.viewPortMax)
					axisXDataInfo.viewPortMax = dataPointX;

				if (dataPointY === null) {
					if (axisXDataInfo.viewPortMin === dataPointX && prevNonNullX < dataPointX)
						axisXDataInfo.viewPortMin = prevNonNullX;
					continue;
				}

				plotUnit.yTotals[dataPointX] = (!plotUnit.yTotals[dataPointX] ? 0 : plotUnit.yTotals[dataPointX]) + dataPointY;

				if (dataPointY >= 0) {
					containsPositiveY = true;
				} else if (dataPointY < 0) {//If dataPointY is undefied or null
					containsNegativeY = true;
				}

				if (dataPointYSums[dataPointX])
					dataPointYSums[dataPointX] += Math.abs(dataPointY);
				else
					dataPointYSums[dataPointX] = Math.abs(dataPointY);
			}

			dataSeries.axisX.valueType = dataSeries.xValueType = isDateTime ? "dateTime" : "number";
		}

		if (plotUnit.axisY.logarithmic) {
			axisYDataInfo.max = (!isNullOrUndefined(axisYDataInfo.viewPortMax)) ? Math.max(axisYDataInfo.viewPortMax, 99 * Math.pow(plotUnit.axisY.logarithmBase, -0.05)) : 99 * Math.pow(plotUnit.axisY.logarithmBase, -0.05);
			axisYDataInfo.min = (!isNullOrUndefined(axisYDataInfo.viewPortMin)) ? Math.min(axisYDataInfo.viewPortMin, 1) : 1;
		}
		else if (containsPositiveY && !containsNegativeY) {
			axisYDataInfo.max = (!isNullOrUndefined(axisYDataInfo.viewPortMax)) ? Math.max(axisYDataInfo.viewPortMax, 99) : 99;
			axisYDataInfo.min = (!isNullOrUndefined(axisYDataInfo.viewPortMin)) ? Math.min(axisYDataInfo.viewPortMin, 1) : 1;
		} else if (containsPositiveY && containsNegativeY) {
			axisYDataInfo.max = (!isNullOrUndefined(axisYDataInfo.viewPortMax)) ? Math.max(axisYDataInfo.viewPortMax, 99) : 99;
			axisYDataInfo.min = (!isNullOrUndefined(axisYDataInfo.viewPortMin)) ? Math.min(axisYDataInfo.viewPortMin, -99) : -99;
		} else if (!containsPositiveY && containsNegativeY) {
			axisYDataInfo.max = (!isNullOrUndefined(axisYDataInfo.viewPortMax)) ? Math.max(axisYDataInfo.viewPortMax, -1) : -1;
			axisYDataInfo.min = (!isNullOrUndefined(axisYDataInfo.viewPortMin)) ? Math.min(axisYDataInfo.viewPortMin, -99) : -99;
		}
		//Max of array to max

		axisYDataInfo.viewPortMin = axisYDataInfo.min;
		axisYDataInfo.viewPortMax = axisYDataInfo.max;

		plotUnit.dataPointYSums = dataPointYSums;

		//this.dataPoints.sort(compareDataPointX);
		//this.dataPoints.sort(function (dataPoint1, dataPoint2) { return dataPoint1.x - dataPoint2.x; });

		//window.console.log("viewPortYMin: " + plotInfo.viewPortYMin + "; viewPortYMax: " + plotInfo.viewPortYMax);
	}

	Chart.prototype._processMultiYPlotUnit = function (plotUnit) {
		if (!plotUnit.dataSeriesIndexes || plotUnit.dataSeriesIndexes.length < 1)
			return;

		var axisYDataInfo = plotUnit.axisY.dataInfo;
		var axisXDataInfo = plotUnit.axisX.dataInfo;
		var dataPointX, dataPointY, dataPointYMin, dataPointYMax;
		var isDateTime = false;


		for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {
			var dataSeries = this.data[plotUnit.dataSeriesIndexes[j]];
			var i = 0;
			var isFirstDPInViewPort = false;
			var isLastDPInViewPort = false;
			var prevNonNullX;
			var currentDataNonNull;
			var firstNonNullX;

			if (dataSeries.axisPlacement === "normal" || dataSeries.axisPlacement === "xySwapped") {

				var plotAreaXMin = plotUnit.axisX.sessionVariables.newViewportMinimum ? plotUnit.axisX.sessionVariables.newViewportMinimum : (this.options.axisX && this.options.axisX.viewportMinimum) ?
										this.options.axisX.viewportMinimum : (this.options.axisX && this.options.axisX.minimum) ? this.options.axisX.minimum : plotUnit.axisX.logarithmic ? 0 : -Infinity;

				var plotAreaXMax = plotUnit.axisX.sessionVariables.newViewportMaximum ? plotUnit.axisX.sessionVariables.newViewportMaximum : (this.options.axisX && this.options.axisX.viewportMaximum) ?
									this.options.axisX.viewportMaximum : (this.options.axisX && this.options.axisX.maximum) ? this.options.axisX.maximum : Infinity;
			}


			if (dataSeries.dataPoints[i].x && dataSeries.dataPoints[i].x.getTime || dataSeries.xValueType === "dateTime") {
				isDateTime = true;
			}

			for (i = 0; i < dataSeries.dataPoints.length; i++) {

				if (typeof dataSeries.dataPoints[i].x === "undefined") {
					dataSeries.dataPoints[i].x = i + (plotUnit.axisX.logarithmic ? 1 : 0);
				}

				if (dataSeries.dataPoints[i].x.getTime) {
					isDateTime = true;
					dataPointX = dataSeries.dataPoints[i].x.getTime();//dataPointX is used so that getTime is called only once in case of dateTime values
				}
				else
					dataPointX = dataSeries.dataPoints[i].x;

				dataPointY = dataSeries.dataPoints[i].y;

				if (dataPointY && dataPointY.length) {
					dataPointYMin = Math.min.apply(null, dataPointY);
					dataPointYMax = Math.max.apply(null, dataPointY);

					currentDataNonNull = true;
					for (var k = 0; k < dataPointY.length; k++)
						if (dataPointY.k === null)
							currentDataNonNull = false;
					if (currentDataNonNull) {
						if (!isFirstDPInViewPort)
							firstNonNullX = prevNonNullX;
						prevNonNullX = dataPointX;
					}
				}


				if (dataPointX < axisXDataInfo.min)
					axisXDataInfo.min = dataPointX;
				if (dataPointX > axisXDataInfo.max)
					axisXDataInfo.max = dataPointX;

				if (dataPointYMin < axisYDataInfo.min)
					axisYDataInfo.min = dataPointYMin;

				if (dataPointYMax > axisYDataInfo.max)
					axisYDataInfo.max = dataPointYMax;


				if (i > 0) {
					if (plotUnit.axisX.logarithmic) {
						var xDiff = dataPointX / dataSeries.dataPoints[i - 1].x;
						xDiff < 1 && (xDiff = 1 / xDiff); //If Condition shortcut

						if (axisXDataInfo.minDiff > xDiff && xDiff !== 1) {
							axisXDataInfo.minDiff = xDiff;
						}
					}
					else {
						var xDiff = dataPointX - dataSeries.dataPoints[i - 1].x;
						xDiff < 0 && (xDiff = xDiff * -1); //If Condition shortcut

						if (axisXDataInfo.minDiff > xDiff && xDiff !== 0) {
							axisXDataInfo.minDiff = xDiff;
						}
					}

					if (dataPointY && dataPointY[0] !== null && dataSeries.dataPoints[i - 1].y && dataSeries.dataPoints[i - 1].y[0] !== null) {
						if (plotUnit.axisY.logarithmic) {
							var yDiff = dataPointY[0] / dataSeries.dataPoints[i - 1].y[0];
							yDiff < 1 && (yDiff = 1 / yDiff); //If Condition shortcut

							if (axisYDataInfo.minDiff > yDiff && yDiff !== 1) {
								axisYDataInfo.minDiff = yDiff;
							}
						}
						else {
							var yDiff = dataPointY[0] - dataSeries.dataPoints[i - 1].y[0];
							yDiff < 0 && (yDiff = yDiff * -1); //If Condition shortcut

							if (axisYDataInfo.minDiff > yDiff && yDiff !== 0) {
								axisYDataInfo.minDiff = yDiff;
							}
						}
					}
				}

				// This section makes sure that partially visible dataPoints are included in the begining
				if (dataPointX < plotAreaXMin && !isFirstDPInViewPort) {
					continue;
				} else if (!isFirstDPInViewPort) {
					isFirstDPInViewPort = true;

					if (i > 0) {
						i -= 2;
						prevNonNullX = firstNonNullX;
						continue;
					}
				}

				// This section makes sure that partially visible dataPoints are included at the end
				if (dataPointX > plotAreaXMax && !isLastDPInViewPort) {
					isLastDPInViewPort = true;
				} else if (dataPointX > plotAreaXMax && isLastDPInViewPort) {
					continue;
				}

				if (dataSeries.dataPoints[i].label)
					plotUnit.axisX.labels[dataPointX] = dataSeries.dataPoints[i].label;


				if (dataPointX < axisXDataInfo.viewPortMin)
					axisXDataInfo.viewPortMin = dataPointX;
				if (dataPointX > axisXDataInfo.viewPortMax)
					axisXDataInfo.viewPortMax = dataPointX;

				if (axisXDataInfo.viewPortMin === dataPointX && dataPointY)
					for (var k = 0; k < dataPointY.length ; k++)
						if (dataPointY[k] === null && prevNonNullX < dataPointX) {
							axisXDataInfo.viewPortMin = prevNonNullX;
							break;
						}

				if (dataPointY === null) {
					if (axisXDataInfo.viewPortMin === dataPointX && prevNonNullX < dataPointX)
						axisXDataInfo.viewPortMin = prevNonNullX;
					continue;
				}

				if (dataPointYMin < axisYDataInfo.viewPortMin)
					axisYDataInfo.viewPortMin = dataPointYMin;
				if (dataPointYMax > axisYDataInfo.viewPortMax)
					axisYDataInfo.viewPortMax = dataPointYMax;
			}

			dataSeries.axisX.valueType = dataSeries.xValueType = isDateTime ? "dateTime" : "number";
		}

		//this.dataPoints.sort(compareDataPointX);
		//this.dataPoints.sort(function (dataPoint1, dataPoint2) { return dataPoint1.x - dataPoint2.x; });
	}

	// Plot Unit Processed of Chart Types: "Waterfall"
	Chart.prototype._processSpecificPlotUnit = function (plotUnit) {
		var _this = this;

		if (plotUnit.type === "waterfall")
			(function processWaterfallPlotUnit() {
				if (!plotUnit.dataSeriesIndexes || plotUnit.dataSeriesIndexes.length < 1)
					return;

				var axisYDataInfo = plotUnit.axisY.dataInfo;
				var axisXDataInfo = plotUnit.axisX.dataInfo;
				var dataPointX, dataPointY;
				var isDateTime = false;

				for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {
					var dataSeries = _this.data[plotUnit.dataSeriesIndexes[j]];
					var i = 0;
					var isFirstDPInViewPort = false;
					var isLastDPInViewPort = false;
					var prevNonNullX;
					var intermediateSum = 0;
					var intermediateSumYStartValue = 0;

					if (dataSeries.axisPlacement === "normal" || dataSeries.axisPlacement === "xySwapped") {

						var plotAreaXMin = plotUnit.axisX.sessionVariables.newViewportMinimum ? plotUnit.axisX.sessionVariables.newViewportMinimum : (_this.options.axisX && _this.options.axisX.viewportMinimum) ?
							_this.options.axisX.viewportMinimum : (_this.options.axisX && _this.options.axisX.minimum) ? _this.options.axisX.minimum : plotUnit.axisX.logarithmic ? 0 : -Infinity;

						var plotAreaXMax = plotUnit.axisX.sessionVariables.newViewportMaximum ? plotUnit.axisX.sessionVariables.newViewportMaximum : (_this.options.axisX && _this.options.axisX.viewportMaximum) ?
							_this.options.axisX.viewportMaximum : (_this.options.axisX && _this.options.axisX.maximum) ? _this.options.axisX.maximum : Infinity;
					}


					if (dataSeries.dataPoints[i].x && dataSeries.dataPoints[i].x.getTime || dataSeries.xValueType === "dateTime") {
						isDateTime = true;
					}

					for (i = 0; i < dataSeries.dataPoints.length; i++) {
						if (typeof dataSeries.dataPoints[i].isCumulativeSum !== "undefined" && dataSeries.dataPoints[i].isCumulativeSum === true) {
							dataSeries.dataPointEOs[i].cumulativeSumYStartValue = 0;
							dataSeries.dataPointEOs[i].cumulativeSum = i === 0 ? 0 : dataSeries.dataPointEOs[i - 1].cumulativeSum;
							dataSeries.dataPoints[i].y = i === 0 ? 0 : dataSeries.dataPointEOs[i - 1].cumulativeSum;
							//intermediateSum = 0;
						} else if (typeof dataSeries.dataPoints[i].isIntermediateSum !== "undefined" && dataSeries.dataPoints[i].isIntermediateSum === true) {
							dataSeries.dataPointEOs[i].cumulativeSumYStartValue = intermediateSumYStartValue;
							dataSeries.dataPointEOs[i].cumulativeSum = i === 0 ? 0 : dataSeries.dataPointEOs[i - 1].cumulativeSum;
							dataSeries.dataPoints[i].y = i === 0 ? 0 : intermediateSum;
							intermediateSumYStartValue = i === 0 ? 0 : dataSeries.dataPointEOs[i - 1].cumulativeSum;
							intermediateSum = 0;
						} else {
							dataPointY = typeof dataSeries.dataPoints[i].y !== "number" ? 0 : dataSeries.dataPoints[i].y;
							dataSeries.dataPointEOs[i].cumulativeSumYStartValue = i === 0 ? 0 : dataSeries.dataPointEOs[i - 1].cumulativeSum;
							dataSeries.dataPointEOs[i].cumulativeSum = i === 0 ? dataPointY : (dataSeries.dataPointEOs[i - 1].cumulativeSum + dataPointY)
							intermediateSum += dataPointY;
						}
					}

					for (i = 0; i < dataSeries.dataPoints.length; i++) {

						if (typeof dataSeries.dataPoints[i].x === "undefined") {
							dataSeries.dataPoints[i].x = i + (plotUnit.axisX.logarithmic ? 1 : 0);
						}

						if (dataSeries.dataPoints[i].x.getTime) {
							isDateTime = true;
							dataPointX = dataSeries.dataPoints[i].x.getTime();//dataPointX is used so that getTime is called only once in case of dateTime values
						}
						else
							dataPointX = dataSeries.dataPoints[i].x;

						dataPointY = dataSeries.dataPoints[i].y;

						if (dataPointX < axisXDataInfo.min)
							axisXDataInfo.min = dataPointX;
						if (dataPointX > axisXDataInfo.max)
							axisXDataInfo.max = dataPointX;

						if (dataSeries.dataPointEOs[i].cumulativeSum < axisYDataInfo.min)
							axisYDataInfo.min = dataSeries.dataPointEOs[i].cumulativeSum;

						if (dataSeries.dataPointEOs[i].cumulativeSum > axisYDataInfo.max)
							axisYDataInfo.max = dataSeries.dataPointEOs[i].cumulativeSum;

						if (i > 0) {
							if (plotUnit.axisX.logarithmic) {
								var xDiff = dataPointX / dataSeries.dataPoints[i - 1].x;
								xDiff < 1 && (xDiff = 1 / xDiff); //If Condition shortcut

								if (axisXDataInfo.minDiff > xDiff && xDiff !== 1) {
									axisXDataInfo.minDiff = xDiff;
								}
							}
							else {
								var xDiff = dataPointX - dataSeries.dataPoints[i - 1].x;
								xDiff < 0 && (xDiff = xDiff * -1); //If Condition shortcut

								if (axisXDataInfo.minDiff > xDiff && xDiff !== 0) {
									axisXDataInfo.minDiff = xDiff;
								}
							}

							if (dataPointY !== null && dataSeries.dataPoints[i - 1].y !== null) {
								if (plotUnit.axisY.logarithmic) {
									var yDiff = dataSeries.dataPointEOs[i].cumulativeSum / dataSeries.dataPointEOs[i - 1].cumulativeSum;
									yDiff < 1 && (yDiff = 1 / yDiff); //If Condition shortcut

									if (axisYDataInfo.minDiff > yDiff && yDiff !== 1) {
										axisYDataInfo.minDiff = yDiff;
									}
								}
								else {
									var yDiff = dataSeries.dataPointEOs[i].cumulativeSum - dataSeries.dataPointEOs[i - 1].cumulativeSum;
									yDiff < 0 && (yDiff = yDiff * -1); //If Condition shortcut

									if (axisYDataInfo.minDiff > yDiff && yDiff !== 0) {
										axisYDataInfo.minDiff = yDiff;
									}
								}
							}
						}

						// This section makes sure that partially visible dataPoints are included in the begining
						if (dataPointX < plotAreaXMin && !isFirstDPInViewPort) {
							if (dataPointY !== null)
								prevNonNullX = dataPointX;
							continue;
						} else if (!isFirstDPInViewPort) {
							isFirstDPInViewPort = true;

							if (i > 0) {
								i -= 2;
								continue;
							}
						}

						// This section makes sure that partially visible dataPoints are included at the end
						if (dataPointX > plotAreaXMax && !isLastDPInViewPort) {
							isLastDPInViewPort = true;
						} else if (dataPointX > plotAreaXMax && isLastDPInViewPort) {
							continue;
						}

						if (dataSeries.dataPoints[i].label)
							plotUnit.axisX.labels[dataPointX] = dataSeries.dataPoints[i].label;


						if (dataPointX < axisXDataInfo.viewPortMin)
							axisXDataInfo.viewPortMin = dataPointX;
						if (dataPointX > axisXDataInfo.viewPortMax)
							axisXDataInfo.viewPortMax = dataPointX;

						if (i > 0) {
							if (dataSeries.dataPointEOs[i - 1].cumulativeSum < axisYDataInfo.viewPortMin)
								axisYDataInfo.viewPortMin = dataSeries.dataPointEOs[i - 1].cumulativeSum;
							if (dataSeries.dataPointEOs[i - 1].cumulativeSum > axisYDataInfo.viewPortMax)
								axisYDataInfo.viewPortMax = dataSeries.dataPointEOs[i - 1].cumulativeSum;
						}

						if (dataSeries.dataPointEOs[i].cumulativeSum < axisYDataInfo.viewPortMin)
							axisYDataInfo.viewPortMin = dataSeries.dataPointEOs[i].cumulativeSum;
						if (dataSeries.dataPointEOs[i].cumulativeSum > axisYDataInfo.viewPortMax)
							axisYDataInfo.viewPortMax = dataSeries.dataPointEOs[i].cumulativeSum;
					}


					dataSeries.axisX.valueType = dataSeries.xValueType = isDateTime ? "dateTime" : "number";
				}

				//_this.dataPoints.sort(compareDataPointX);
				//_this.dataPoints.sort(function (dataPoint1, dataPoint2) { return dataPoint1.x - dataPoint2.x; });
			})();
	}


	Chart.prototype.calculateAutoBreaks = function () {
		var niceRange;
		var chart = this;
		var isAutoBreaksPresent = false;
		for (var i = 0; i < this._axes.length; i++)
			if (this._axes[i].scaleBreaks && this._axes[i].scaleBreaks.autoCalculate && this._axes[i].scaleBreaks.maxNumberOfAutoBreaks >= 1) {

				isAutoBreaksPresent = true;
				this._axes[i].dataInfo._dataRanges = [];
				for (var j = 0; j < 100 / Math.max(parseFloat(this._axes[i].scaleBreaks.collapsibleThreshold) || 10, 10) ; j++)
					this._axes[i].dataInfo._dataRanges.push({ min: Infinity, max: -Infinity });
			}

		if (!isAutoBreaksPresent)
			return;
		for (var i = 0; i < this.plotInfo.plotTypes.length; i++) {
			var plotType = this.plotInfo.plotTypes[i];

			for (var j = 0; j < plotType.plotUnits.length; j++) {

				var plotUnit = plotType.plotUnits[j];

				if (plotUnit.type === "line" || plotUnit.type === "stepLine" || plotUnit.type === "spline" || plotUnit.type === "column" || plotUnit.type === "area" || plotUnit.type === "stepArea" || plotUnit.type === "splineArea" || plotUnit.type === "bar" || plotUnit.type === "bubble" || plotUnit.type === "scatter" || plotUnit.type === "candlestick" || plotUnit.type === "ohlc" || plotUnit.type === "rangeColumn" || plotUnit.type === "rangeBar" || plotUnit.type === "rangeArea" || plotUnit.type === "rangeSplineArea" || plotUnit.type === "waterfall" || plotUnit.type === "error" || plotUnit.type === "boxAndWhisker")
					calculateAutoBreaksNonStackedPlotUnit(plotUnit);
				else if (plotUnit.type.indexOf("stacked") >= 0)
					calculateXAxisAutoBreaksStackedPlotUnit(plotUnit);
			}
		}

		for (var i = 0; i < this._axes.length; i++) {

			if (this._axes[i].dataInfo._dataRanges) {
				var plotAreaYMin = this._axes[i].dataInfo.min;
				var plotAreaYMax = this._axes[i].dataInfo.max;
				var yDivisor = (plotAreaYMax + 1 - plotAreaYMin) * Math.max(parseFloat(this._axes[i].scaleBreaks.collapsibleThreshold) || 10, 10) / 100;
				var dataRanges = this._axes[i].dataInfo._dataRanges;
				var end, start, diff, possibleBreaks = [];

				//Start of calculation of yRanges for Stacked Charts
				if (this._axes[i].dataInfo.dataPointYPositiveSums) {
					var dataPointYPositiveSums = this._axes[i].dataInfo.dataPointYPositiveSums;
					var yRanges = dataRanges;
					for (j in dataPointYPositiveSums) {
						if (dataPointYPositiveSums.hasOwnProperty(j)) {
							if (isNaN(j)) {
								continue;
							}
							var ySum = dataPointYPositiveSums[j];
							if (isNullOrUndefined(ySum))
								continue;

							index = Math.floor((ySum - plotAreaYMin) / yDivisor);
							if (ySum < yRanges[index].min) {
								yRanges[index].min = ySum;
							}
							if (ySum > yRanges[index].max) {
								yRanges[index].max = ySum;
							}
						}
					}
					delete this._axes[i].dataInfo.dataPointYPositiveSums;
				}
				if (this._axes[i].dataInfo.dataPointYNegativeSums) {
					var dataPointYNegativeSums = this._axes[i].dataInfo.dataPointYNegativeSums;
					var yRanges = dataRanges;
					for (j in dataPointYNegativeSums) {
						if (dataPointYNegativeSums.hasOwnProperty(j)) {
							if (isNaN(j)) {
								continue;
							}
							var ySum = dataPointYNegativeSums[j] * -1;
							if (isNullOrUndefined(ySum))
								continue;

							index = Math.floor((ySum - plotAreaYMin) / yDivisor);
							if (ySum < yRanges[index].min) {
								yRanges[index].min = ySum;
							}
							if (ySum > yRanges[index].max) {
								yRanges[index].max = ySum;
							}
						}
					}
					delete this._axes[i].dataInfo.dataPointYNegativeSums;
				}
				//End of calculation of yRanges for Stacked Charts


				for (var j = 0; j < dataRanges.length - 1; j++) {
					start = dataRanges[j].max;
					if (isFinite(start))
						while (j < dataRanges.length - 1) {
							end = dataRanges[j + 1].min;
							if (isFinite(end)) {
								diff = end - start;
								if (diff > yDivisor) {
									possibleBreaks.push({
										diff: diff,
										start: start,
										end: end
									});
								}
								break;
							}
							else
								j++;
						}
				}

				if (this._axes[i].scaleBreaks.customBreaks) {
					for (var j = 0; j < this._axes[i].scaleBreaks.customBreaks.length; j++) {
						for (var k = 0; k < possibleBreaks.length ; k++) {
							if (this._axes[i].scaleBreaks.customBreaks[j].startValue <= possibleBreaks[k].start && possibleBreaks[k].start <= this._axes[i].scaleBreaks.customBreaks[j].endValue ||
								this._axes[i].scaleBreaks.customBreaks[j].startValue <= possibleBreaks[k].start && possibleBreaks[k].start <= this._axes[i].scaleBreaks.customBreaks[j].endValue ||
								possibleBreaks[k].start <= this._axes[i].scaleBreaks.customBreaks[j].startValue && this._axes[i].scaleBreaks.customBreaks[j].startValue <= possibleBreaks[k].end ||
								possibleBreaks[k].start <= this._axes[i].scaleBreaks.customBreaks[j].endValue && this._axes[i].scaleBreaks.customBreaks[j].endValue <= possibleBreaks[k].end) {
								possibleBreaks.splice(k, 1);
								k--;
							}
						}
					}
				}

				possibleBreaks.sort(function (possibleBreak1, possibleBreak2) {
					return possibleBreak2.diff - possibleBreak1.diff;
				});

				for (var j = 0; j < Math.min(possibleBreaks.length, this._axes[i].scaleBreaks.maxNumberOfAutoBreaks) ; j++) {
					niceRange = calculateAutoBreakWithPadding(possibleBreaks[j].start, possibleBreaks[j].end, this._axes[i].logarithmic ? this._axes[i].dataInfo.max / this._axes[i].dataInfo.min : this._axes[i].dataInfo.max - this._axes[i].dataInfo.min, this._axes[i].logarithmic);
					this._axes[i].scaleBreaks.autoBreaks.push(new Break(this, "autoBreaks", niceRange, j, ++this._eventManager.lastObjectId, this._axes[i].scaleBreaks));
					this._axes[i].scaleBreaks._appliedBreaks.push(this._axes[i].scaleBreaks.autoBreaks[this._axes[i].scaleBreaks.autoBreaks.length - 1]);
				}

				this._axes[i].scaleBreaks._appliedBreaks.sort(function (break1, break2) {
					return break1.startValue - break2.startValue;
				});
			}
		}

		function calculateAutoBreakWithPadding(startValue, endValue, dataRangeDiff, isLogarithmic) {
			//var paddingFactor = isLogarithmic ? 0.05 : Math.max(Math.min(0.05, minDiff / dataRangeDiff), 1 / (1 << 30));
			//return {
			//	startValue: isLogarithmic ? startValue * Math.pow(dataRangeDiff, paddingFactor) : startValue + dataRangeDiff * paddingFactor,
			//	endValue: isLogarithmic ? endValue / Math.pow(dataRangeDiff, paddingFactor) : endValue - dataRangeDiff * paddingFactor
			//};

			if (isLogarithmic) {
				var padding = Math.pow(Math.min(dataRangeDiff * startValue / endValue, endValue / startValue), .2);
				if (padding <= 1) {
					padding = Math.pow(startValue < 1 ? 1 / startValue : Math.min(endValue / startValue, startValue), .25);
				}
				return {
					startValue: startValue * padding,
					endValue: endValue / padding
				};
			}
			else {
				var padding = .2 * Math.min(dataRangeDiff - endValue + startValue, endValue - startValue);
				if (padding <= 0) {
					padding = .25 * Math.min(endValue - startValue, Math.abs(startValue));
				}
				return {
					startValue: startValue + padding,
					endValue: endValue - padding
				};
			}

		}

		function calculateAutoBreaksNonStackedPlotUnit(plotUnit) {
			if (!plotUnit.dataSeriesIndexes || plotUnit.dataSeriesIndexes.length < 1)
				return;
			var axisXAutoBreakEnabled = plotUnit.axisX.scaleBreaks && plotUnit.axisX.scaleBreaks.autoCalculate && plotUnit.axisX.scaleBreaks.maxNumberOfAutoBreaks >= 1;
			var axisYAutoBreakEnabled = plotUnit.axisY.scaleBreaks && plotUnit.axisY.scaleBreaks.autoCalculate && plotUnit.axisY.scaleBreaks.maxNumberOfAutoBreaks >= 1;
			if (!(axisXAutoBreakEnabled || axisYAutoBreakEnabled))
				return;

			var axisYDataInfo = plotUnit.axisY.dataInfo;
			var axisXDataInfo = plotUnit.axisX.dataInfo;
			var dataPointX, dataPointY, dataPointYMin, dataPointYMax;
			var plotAreaXMin = axisXDataInfo.min;
			var plotAreaXMax = axisXDataInfo.max;
			var plotAreaYMin = axisYDataInfo.min;
			var plotAreaYMax = axisYDataInfo.max;
			var xRanges = axisXDataInfo._dataRanges;
			var yRanges = axisYDataInfo._dataRanges;
			var index;
			var i = 0;


			for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {
				var dataSeries = chart.data[plotUnit.dataSeriesIndexes[j]];
				if (dataSeries.dataPoints.length < 4)
					continue;

				for (i = 0; i < dataSeries.dataPoints.length; i++) {



					if (axisXAutoBreakEnabled) {
						var xDivisor = (plotAreaXMax + 1 - plotAreaXMin) * Math.max(parseFloat(plotUnit.axisX.scaleBreaks.collapsibleThreshold) || 10, 10) / 100;
						if (dataSeries.dataPoints[i].x.getTime) {
							dataPointX = dataSeries.dataPoints[i].x.getTime();//dataPointX is used so that getTime is called only once in case of dateTime values
						}
						else
							dataPointX = dataSeries.dataPoints[i].x;

						index = Math.floor((dataPointX - plotAreaXMin) / xDivisor);
						if (dataPointX < xRanges[index].min) {
							xRanges[index].min = dataPointX;
						}
						if (dataPointX > xRanges[index].max) {
							xRanges[index].max = dataPointX;
						}
					}

					if (axisYAutoBreakEnabled) {
						var yDivisor = (plotAreaYMax + 1 - plotAreaYMin) * Math.max(parseFloat(plotUnit.axisY.scaleBreaks.collapsibleThreshold) || 10, 10) / 100;
						dataPointY = plotUnit.type === "waterfall" ? dataSeries.dataPointEOs[i].cumulativeSum : dataSeries.dataPoints[i].y;
						if (dataPointY && dataPointY.length) {
							for (var k = 0; k < dataPointY.length; k++) {
								index = Math.floor((dataPointY[k] - plotAreaYMin) / yDivisor);
								if (dataPointY[k] < yRanges[index].min) {
									yRanges[index].min = dataPointY[k];
								}
								if (dataPointY[k] > yRanges[index].max) {
									yRanges[index].max = dataPointY[k];
								}
							}
						}
						else if (!isNullOrUndefined(dataPointY)) {

							index = Math.floor((dataPointY - plotAreaYMin) / yDivisor);
							if (dataPointY < yRanges[index].min) {
								yRanges[index].min = dataPointY;
							}
							if (dataPointY > yRanges[index].max) {
								yRanges[index].max = dataPointY;
							}
						}
					}
				}
			}
		}

		function calculateXAxisAutoBreaksStackedPlotUnit(plotUnit) {
			if (!plotUnit.dataSeriesIndexes || plotUnit.dataSeriesIndexes.length < 1)
				return;
			var axisXAutoBreakEnabled = plotUnit.axisX.scaleBreaks && plotUnit.axisX.scaleBreaks.autoCalculate && plotUnit.axisX.scaleBreaks.maxNumberOfAutoBreaks >= 1;
			if (!axisXAutoBreakEnabled)
				return;

			var axisXDataInfo = plotUnit.axisX.dataInfo;
			var dataPointX;
			var plotAreaXMin = axisXDataInfo.min;
			var plotAreaXMax = axisXDataInfo.max;
			var xRanges = axisXDataInfo._dataRanges;
			var index;
			var i = 0;


			for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {
				var dataSeries = chart.data[plotUnit.dataSeriesIndexes[j]];
				if (dataSeries.dataPoints.length < 4)
					continue;

				for (i = 0; i < dataSeries.dataPoints.length; i++) {



					var xDivisor = (plotAreaXMax + 1 - plotAreaXMin) * Math.max(parseFloat(plotUnit.axisX.scaleBreaks.collapsibleThreshold) || 10, 10) / 100;
					if (dataSeries.dataPoints[i].x.getTime) {
						dataPointX = dataSeries.dataPoints[i].x.getTime();//dataPointX is used so that getTime is called only once in case of dateTime values
					}
					else
						dataPointX = dataSeries.dataPoints[i].x;

					index = Math.floor((dataPointX - plotAreaXMin) / xDivisor);
					if (dataPointX < xRanges[index].min) {
						xRanges[index].min = dataPointX;
					}
					if (dataPointX > xRanges[index].max) {
						xRanges[index].max = dataPointX;
					}

				}
			}
		}
	}




	//getClosest returns objects nearby and hence shouldn't be used for events like click, mouseover, mousemove, etc which require object that is exactly under the mouse.
	Chart.prototype.getDataPointAtXY = function (mouseX, mouseY, getClosest) {

		getClosest = getClosest || false;
		var results = [];

		for (var i = this._dataInRenderedOrder.length - 1; i >= 0; i--) {
			var dataSeries = this._dataInRenderedOrder[i];

			var result = null;

			result = dataSeries.getDataPointAtXY(mouseX, mouseY, getClosest);
			if (result)
				results.push(result);
		}

		var closestResult = null;
		var onlyLineAreaTypes = false;

		for (var m = 0; m < results.length; m++) {

			if (results[m].dataSeries.type === "line" || results[m].dataSeries.type === "stepLine" || results[m].dataSeries.type === "area" || results[m].dataSeries.type === "stepArea") {
				var markerSize = getProperty("markerSize", results[m].dataPoint, results[m].dataSeries) || 8;
				if (results[m].distance <= markerSize / 2) {
					onlyLineAreaTypes = true;
					break;
				}
			}
		}

		for (m = 0; m < results.length; m++) {

			if (onlyLineAreaTypes && results[m].dataSeries.type !== "line" && results[m].dataSeries.type !== "stepLine" && results[m].dataSeries.type !== "area" && results[m].dataSeries.type !== "stepArea")
				continue;

			if (!closestResult) {
				closestResult = results[m];
			} else if (results[m].distance <= closestResult.distance) {
				closestResult = results[m];
			}
		}

		return closestResult;
	}

	Chart.prototype.getObjectAtXY = function (mouseX, mouseY, getClosest) {
		getClosest = getClosest || false;
		var id = null;

		var dataPointInfo = this.getDataPointAtXY(mouseX, mouseY, getClosest);

		if (dataPointInfo) {
			id = dataPointInfo.dataSeries.dataPointIds[dataPointInfo.dataPointIndex];
		} else if (isCanvasSupported) {//IE9+
			id = getObjectId(mouseX, mouseY, this._eventManager.ghostCtx);
		}
		else {
			for (var i = 0; i < this.legend.items.length; i++) {
				var item = this.legend.items[i];

				if (mouseX >= item.x1 && mouseX <= item.x2 && mouseY >= item.y1 && mouseY <= item.y2) {
					id = item.id;
				}
			}
		}

		return id;
	}

	/// <summary>Calculates Font Size based on standardSize and Chart Size</summary>
	/// <param name="standardSize" type="Number">Standard font size for a Chart with min(width,height) = 400px</param>
	/// <returns type="Number">The area.</returns>	
	Chart.prototype.getAutoFontSize = function (standardSize, width, height) {

		width = width || this.width;
		height = height || this.height;
		var size = Math.min(this.width, this.height);

		var fontSizeScaleFactor = standardSize / 400;

		return Math.max(this.theme === "theme4" ? 0 : (size >= 300 ? 12 : 10), Math.round(size * fontSizeScaleFactor));
	}

	//#region Events

	Chart.prototype.resetOverlayedCanvas = function () {
		//var width = this.overlaidCanvas.width;
		//this.overlaidCanvas.width = 0;
		//this.overlaidCanvas.width = width;
		this.overlaidCanvasCtx.clearRect(0, 0, this.width, this.height);
	}

	Chart.prototype.clearCanvas = function () {
		this.ctx.clearRect(0, 0, this.width, this.height);

		if (this.backgroundColor) {
			this.ctx.fillStyle = this.backgroundColor;
			this.ctx.fillRect(0, 0, this.width, this.height);
		}
	}

	Chart.prototype.attachEvent = function (param) {
		this._events.push(param);
	}

	Chart.prototype._touchEventHandler = function (ev) {
		if (!ev.changedTouches || !this.interactivityEnabled)
			return;

		var mouseEvents = [];
		var touches = ev.changedTouches;
		var first = touches ? touches[0] : ev;
		var touchCurrentCoordinates = null;

		//window.console.log(touches.length);

		switch (ev.type) {
			case "touchstart": case "MSPointerDown":
				mouseEvents = ["mousemove", "mousedown"];
				this._lastTouchData = getMouseCoordinates(first);
				this._lastTouchData.time = new Date();
				break;
			case "touchmove": case "MSPointerMove": mouseEvents = ["mousemove"]; break;
			case "touchend": case "MSPointerUp":
				var dt = this._lastTouchData && this._lastTouchData.time ? (new Date() - this._lastTouchData.time) : 0;
				mouseEvents = (this._lastTouchEventType === "touchstart" || this._lastTouchEventType === "MSPointerDown" || dt < 300) ? ["mouseup", "click"] : ["mouseup"];
				break;
			default: return;
		}

		if (touches && touches.length > 1) return;


		touchCurrentCoordinates = getMouseCoordinates(first);
		touchCurrentCoordinates.time = new Date();
		try {
			var dy = touchCurrentCoordinates.y - this._lastTouchData.y;
			var dx = touchCurrentCoordinates.x - this._lastTouchData.x;
			var dt = touchCurrentCoordinates.time - this._lastTouchData.time;

			if (Math.abs(dy) > 15 && (!!this._lastTouchData.scroll || dt < 300)) {
				//if (Math.abs(dy) > 15 && (!!this._lastTouchData.scroll)) {
				//this._lastTouchData.y = touchCurrentCoordinates.y;
				this._lastTouchData.scroll = true;

				var win = window.parent || window;
				if (win && win.scrollBy)
					win.scrollBy(0, -dy);
			}
		} catch (e) { };

		this._lastTouchEventType = ev.type;

		if (!!this._lastTouchData.scroll && this.zoomEnabled) {
			if (this.isDrag)
				this.resetOverlayedCanvas();

			this.isDrag = false;
			return;
		}

		for (var i = 0; i < mouseEvents.length; i++) {

			var type = mouseEvents[i];
			var simulatedEvent = document.createEvent("MouseEvent");
			simulatedEvent.initMouseEvent(type, true, true, window, 1,
				first.screenX, first.screenY,
				first.clientX, first.clientY, false,
				false, false, false, 0, null);

			first.target.dispatchEvent(simulatedEvent);

			if (ev.preventManipulation) {
				//alert("preventManipulation");
				ev.preventManipulation();
			}

			if (ev.preventDefault) {
				//alert("preventDefault");
				ev.preventDefault();
			}
		}
	}

	Chart.prototype._dispatchRangeEvent = function (eventName, triggerSource) {
		var eventParameter = {};

		eventParameter.chart = this;
		eventParameter.type = eventName;
		eventParameter.trigger = triggerSource;

		var axes = [];

		if (this.axisX && this.axisX.length > 0)
			axes.push("axisX");
		if (this.axisX2 && this.axisX2.length > 0)
			axes.push("axisX2");
		if (this.axisY && this.axisY.length > 0)
			axes.push("axisY");
		if (this.axisY2 && this.axisY2.length > 0)
			axes.push("axisY2");

		for (var i = 0; i < axes.length; i++) {
			if (isNullOrUndefined(eventParameter[axes[i]]))
				eventParameter[axes[i]] = [];

			if (axes[i] === "axisY") {
				for (var k = 0; k < this.axisY.length; k++) {
					eventParameter[axes[i]].push({
						viewportMinimum: this[axes[i]][k].sessionVariables.newViewportMinimum,
						viewportMaximum: this[axes[i]][k].sessionVariables.newViewportMaximum
					});
				}
			}
			else if (axes[i] === "axisY2") {
				for (var k = 0; k < this.axisY2.length; k++) {
					eventParameter[axes[i]].push({
						viewportMinimum: this[axes[i]][k].sessionVariables.newViewportMinimum,
						viewportMaximum: this[axes[i]][k].sessionVariables.newViewportMaximum
					});
				}
			}
			else {
				if (axes[i] === "axisX") {
					for (var k = 0; k < this.axisX.length; k++) {
						eventParameter[axes[i]].push({
							viewportMinimum: this[axes[i]][k].sessionVariables.newViewportMinimum,
							viewportMaximum: this[axes[i]][k].sessionVariables.newViewportMaximum
						});
					}
				}
				else if (axes[i] === "axisX2") {
					for (var k = 0; k < this.axisX2.length; k++) {
						eventParameter[axes[i]].push({
							viewportMinimum: this[axes[i]][k].sessionVariables.newViewportMinimum,
							viewportMaximum: this[axes[i]][k].sessionVariables.newViewportMaximum
						});
					}
				}

			}
		}

		this.dispatchEvent(eventName, eventParameter, this);
	}

	Chart.prototype._mouseEventHandler = function (ev) {
		//IE8- uses srcElement instead of target. So instead of checking this condition everytime, its better to create a reference called target.
		if (typeof (ev.target) === "undefined" && ev.srcElement)
			ev.target = ev.srcElement;

		var xy = getMouseCoordinates(ev);
		var type = ev.type;
		var eventParam;
		var rightclick;

		if (!ev) var e = window.event;
		if (ev.which) rightclick = (ev.which == 3);
		else if (ev.button) rightclick = (ev.button == 2);

		releaseCapturedEvent();

		if (!this.interactivityEnabled)
			return;

		if (this._ignoreNextEvent) {
			this._ignoreNextEvent = false;
			return;
		}

		// stop panning and zooming so we can draw
		if (ev.preventManipulation) {
			//alert("preventManipulation");
			ev.preventManipulation();
		}

		// we are handling this event
		if (ev.preventDefault) {
			//alert("preventDefault");
			ev.preventDefault();
		}

		var bounds;

		//window.console.log(type + " --> x: " + xy.x + "; y:" + xy.y);

		//if (type === "mouseout") {
		//    this.toolTip.hide();
		//}

		if (isDebugMode && window.console) {
			window.console.log(type + " --> x: " + xy.x + "; y:" + xy.y);
			if (rightclick)
				window.console.log(ev.which);

			if (type === "mouseup")
				window.console.log("mouseup");
		}

		if (rightclick)
			return;

		//if (this.plotInfo.axisPlacement === "xySwapped") {
		//    //var temp = xy.x;
		//    //xy.x = xy.y;
		//    //xy.y = temp;
		//    xy = {x: xy.y, y: xy.x};
		//}

		function releaseCapturedEvent() {
			if (Chart.capturedEventParam) {
				eventParam = Chart.capturedEventParam;
				bounds = eventParam.bounds;

				if (type === "mouseup") {
					Chart.capturedEventParam = null;

					if (eventParam.chart.overlaidCanvas.releaseCapture)
						eventParam.chart.overlaidCanvas.releaseCapture();
					else
						document.documentElement.removeEventListener("mouseup", eventParam.chart._mouseEventHandler, false);
				}

				if (eventParam.hasOwnProperty(type)) {

					if (type === "mouseup" && !eventParam.chart.overlaidCanvas.releaseCapture) {
						if (ev.target !== eventParam.chart.overlaidCanvas)
							eventParam.chart.isDrag = false;
					} else if (ev.target === eventParam.chart.overlaidCanvas || !isCanvasSupported)
						eventParam[type].call(eventParam.context, xy.x, xy.y);

				}
			}
		}

		if (!Chart.capturedEventParam && this._events) {

			for (var i = 0; i < this._events.length; i++) {
				if (!this._events[i].hasOwnProperty(type))
					continue;

				eventParam = this._events[i];
				bounds = eventParam.bounds;

				if (xy.x >= bounds.x1 && xy.x <= bounds.x2 && xy.y >= bounds.y1 && xy.y <= bounds.y2) {
					eventParam[type].call(eventParam.context, xy.x, xy.y);

					if (type === "mousedown" && eventParam.capture === true) {
						Chart.capturedEventParam = eventParam;

						if (this.overlaidCanvas.setCapture)
							this.overlaidCanvas.setCapture();
						else {
							document.documentElement.addEventListener("mouseup", this._mouseEventHandler, false);
							//addEvent(document.body, "mouseup", this._mouseEventHandler);
						}
					} else if (type === "mouseup") {
						if (eventParam.chart.overlaidCanvas.releaseCapture)
							eventParam.chart.overlaidCanvas.releaseCapture();
						else
							document.documentElement.removeEventListener("mouseup", this._mouseEventHandler, false);
					}

					break;
				}
				else
					eventParam = null;
			}

			if (eventParam && eventParam.cursor) {
				ev.target.style.cursor = eventParam.cursor;
			}
			else
				ev.target.style.cursor = this._defaultCursor;

			//eventParam = 
		}

		var plotArea = this.plotArea;
		if (xy.x < plotArea.x1 || xy.x > plotArea.x2 || xy.y < plotArea.y1 || xy.y > plotArea.y2) {
			if (this.toolTip && this.toolTip.enabled) {
				this.toolTip.hide();
			} else {
				this.resetOverlayedCanvas();
			}
		}


		if ((!this.isDrag || !this.zoomEnabled) && this._eventManager) {
			this._eventManager.mouseEventHandler(ev);
			//this._updateToolTip(ev.x, ev.y);            
		}

		//if (this.toolTip.enabled)
		//    this.toolTip.mouseMoveHandler(ev.x, ev.y);
	}

	Chart.prototype._plotAreaMouseDown = function (x, y) {
		this.isDrag = true;
		this.dragStartPoint = {
			x: x, y: y
		};
	}

	Chart.prototype._plotAreaMouseUp = function (x, y) {
		var plotArea = this.plotArea;

		if (this.plotInfo.axisPlacement === "normal" || this.plotInfo.axisPlacement === "xySwapped") {
			if (this.isDrag) {
				var dragDelta = 0,
					dragDeltaPY = y - this.dragStartPoint.y,
					dragDeltaPX = x - this.dragStartPoint.x,
					zoomPX = this.zoomType.indexOf("x") >= 0, //Whether to zoom horizontally
					zoomPY = this.zoomType.indexOf("y") >= 0, //Whether to zoom vertically
					reRender = false;

				this.resetOverlayedCanvas();

				if (this.plotInfo.axisPlacement === "xySwapped") {
					var temp = zoomPY;
					zoomPY = zoomPX;
					zoomPX = temp;
				}

				if (this.panEnabled || this.zoomEnabled) {
					if (this.panEnabled) {

						var overflow = 0;

						for (var i = 0; i < this._axes.length; i++) {
							var axis = this._axes[i];
							if (axis.logarithmic) {
								if (axis.viewportMinimum < axis.minimum) {

									overflow = axis.minimum / axis.viewportMinimum;

									axis.sessionVariables.newViewportMinimum = axis.viewportMinimum * overflow;
									axis.sessionVariables.newViewportMaximum = axis.viewportMaximum * overflow;

									reRender = true;
								} else if (axis.viewportMaximum > axis.maximum) {

									overflow = axis.viewportMaximum / axis.maximum;
									axis.sessionVariables.newViewportMinimum = axis.viewportMinimum / overflow;
									axis.sessionVariables.newViewportMaximum = axis.viewportMaximum / overflow;

									reRender = true;
								}
							}
							else {
								if (axis.viewportMinimum < axis.minimum) {

									overflow = axis.minimum - axis.viewportMinimum;

									axis.sessionVariables.newViewportMinimum = axis.viewportMinimum + overflow;
									axis.sessionVariables.newViewportMaximum = axis.viewportMaximum + overflow;

									reRender = true;
								} else if (axis.viewportMaximum > axis.maximum) {

									overflow = axis.viewportMaximum - axis.maximum;
									axis.sessionVariables.newViewportMinimum = axis.viewportMinimum - overflow;
									axis.sessionVariables.newViewportMaximum = axis.viewportMaximum - overflow;

									reRender = true;
								}
							}
						}

					}
					else if (((!zoomPX || Math.abs(dragDeltaPX) > 2) && (!zoomPY || Math.abs(dragDeltaPY) > 2)) && this.zoomEnabled) {

						if (!this.dragStartPoint)
							return;

						var selectedRegion = {
							x1: zoomPX ? this.dragStartPoint.x : this.plotArea.x1,
							y1: zoomPY ? this.dragStartPoint.y : this.plotArea.y1,
							x2: zoomPX ? x : this.plotArea.x2,
							y2: zoomPY ? y : this.plotArea.y2
						};

						if (Math.abs(selectedRegion.x1 - selectedRegion.x2) > 2 && Math.abs(selectedRegion.y1 - selectedRegion.y2) > 2) {

							if (this._zoomPanToSelectedRegion(selectedRegion.x1, selectedRegion.y1, selectedRegion.x2, selectedRegion.y2)) {

								reRender = true;
							}
						}
					}

					if (reRender) {
						this._ignoreNextEvent = true;//Required so that click event doesn't fire after zooming into a section of the chart.

						this._dispatchRangeEvent("rangeChanging", "zoom");
						this.render();
						this._dispatchRangeEvent("rangeChanged", "zoom");

						if (reRender && this.zoomEnabled && this._zoomButton.style.display === "none") {
							show(this._zoomButton, this._resetButton);
							setButtonState(this, this._zoomButton, "pan");
							setButtonState(this, this._resetButton, "reset");
						}
					}
				}
			}

		}

		this.isDrag = false;

		if (this.plotInfo.axisPlacement !== "none") {
			this.resetOverlayedCanvas();
			if (this.axisX && this.axisX.length > 0) {
				for (var k = 0; k < this.axisX.length; k++) {
					if (this.axisX[k].crosshair && this.axisX[k].crosshair.enabled) {
						this.axisX[k].renderCrosshair(x, y);
					}
				}
			}
			if (this.axisX2 && this.axisX2.length > 0) {
				for (var k = 0; k < this.axisX2.length; k++) {
					if (this.axisX2[k].crosshair && this.axisX2[k].crosshair.enabled) {
						this.axisX2[k].renderCrosshair(x, y);
					}
				}
			}
			if (this.axisY && this.axisY.length > 0) {
				for (var k = 0; k < this.axisY.length; k++) {
					if (this.axisY[k].crosshair && this.axisY[k].crosshair.enabled) {
						this.axisY[k].renderCrosshair(x, y);
					}
				}
			}
			if (this.axisY2 && this.axisY2.length > 0) {
				for (var k = 0; k < this.axisY2.length; k++) {
					if (this.axisY2[k].crosshair && this.axisY2[k].crosshair.enabled) {
						this.axisY2[k].renderCrosshair(x, y);
					}
				}
			}
		}
	}

	Chart.prototype._plotAreaMouseMove = function (x, y) {
		if (this.isDrag && this.plotInfo.axisPlacement !== "none") {

			var dragDeltaPX = 0,
				dragDeltaPY = 0,
				alpha = null,
				selectedRegion = null,
				zoomPX = this.zoomType.indexOf("x") >= 0, //Whether to zoom horizontally
				zoomPY = this.zoomType.indexOf("y") >= 0, //Whether to zoom vertically
				_this = this;

			if (this.plotInfo.axisPlacement === "xySwapped") {
				var temp = zoomPY;
				zoomPY = zoomPX;
				zoomPX = temp;
			}

			dragDeltaPX = this.dragStartPoint.x - x;
			dragDeltaPY = this.dragStartPoint.y - y;

			if (Math.abs(dragDeltaPX) > 2 && Math.abs(dragDeltaPX) < 8 && (this.panEnabled || this.zoomEnabled)) {
				this.toolTip.hide();
			} else if (!this.panEnabled && !this.zoomEnabled) {
				this.toolTip.mouseMoveHandler(x, y);
			}

			if (((!zoomPX || Math.abs(dragDeltaPX) > 2) || (!zoomPY || Math.abs(dragDeltaPY) > 2)) && (this.panEnabled || this.zoomEnabled)) {
				if (this.panEnabled) {

					selectedRegion =
						{
							x1: zoomPX ? this.plotArea.x1 + dragDeltaPX : this.plotArea.x1,
							y1: zoomPY ? this.plotArea.y1 + dragDeltaPY : this.plotArea.y1,
							x2: zoomPX ? this.plotArea.x2 + dragDeltaPX : this.plotArea.x2,
							y2: zoomPY ? this.plotArea.y2 + dragDeltaPY : this.plotArea.y2
						};

					clearTimeout(_this._panTimerId);
					_this._panTimerId = setTimeout((function (x1, y1, x2, y2) {
						return function () {
							if (_this._zoomPanToSelectedRegion(x1, y1, x2, y2, true)) {
								//console.log(x1, "->", x2);
								_this._dispatchRangeEvent("rangeChanging", "pan");
								_this.render();
								_this._dispatchRangeEvent("rangeChanged", "pan");

								_this.dragStartPoint.x = x;
								_this.dragStartPoint.y = y;
							}
						};
					})(selectedRegion.x1, selectedRegion.y1, selectedRegion.x2, selectedRegion.y2), 0);

				} else if (this.zoomEnabled) {

					this.resetOverlayedCanvas();

					alpha = this.overlaidCanvasCtx.globalAlpha;


					this.overlaidCanvasCtx.fillStyle = "#A89896";

					var rect = {
						x1: zoomPX ? this.dragStartPoint.x : this.plotArea.x1,
						y1: zoomPY ? this.dragStartPoint.y : this.plotArea.y1,
						x2: zoomPX ? x - this.dragStartPoint.x : this.plotArea.x2 - this.plotArea.x1,
						y2: zoomPY ? y - this.dragStartPoint.y : this.plotArea.y2 - this.plotArea.y1
					};

					if (this.validateRegion(rect.x1, rect.y1, zoomPX ? x : this.plotArea.x2 - this.plotArea.x1, zoomPY ? y : this.plotArea.y2 - this.plotArea.y1, this.zoomType !== "xy").isValid) {
						this.resetOverlayedCanvas();
						this.overlaidCanvasCtx.fillStyle = "#99B2B5"; //"#A0ABB8";
					}

					this.overlaidCanvasCtx.globalAlpha = .7;
					this.overlaidCanvasCtx.fillRect(rect.x1, rect.y1, rect.x2, rect.y2);

					this.overlaidCanvasCtx.globalAlpha = alpha;
				}
			}

		} else {
			this.toolTip.mouseMoveHandler(x, y);

			if (this.plotInfo.axisPlacement !== "none") {
				if (this.axisX && this.axisX.length > 0) {
					for (var k = 0; k < this.axisX.length; k++) {
						if (this.axisX[k].crosshair && this.axisX[k].crosshair.enabled) {
							this.axisX[k].renderCrosshair(x, y);
						}
					}
				}
				if (this.axisX2 && this.axisX2.length > 0) {
					for (var k = 0; k < this.axisX2.length; k++) {
						if (this.axisX2[k].crosshair && this.axisX2[k].crosshair.enabled) {
							this.axisX2[k].renderCrosshair(x, y);
						}
					}
				}
				if (this.axisY && this.axisY.length > 0) {
					for (var k = 0; k < this.axisY.length; k++) {
						if (this.axisY[k].crosshair && this.axisY[k].crosshair.enabled) {
							this.axisY[k].renderCrosshair(x, y);
						}
					}
				}
				if (this.axisY2 && this.axisY2.length > 0) {
					for (var k = 0; k < this.axisY2.length; k++) {
						if (this.axisY2[k].crosshair && this.axisY2[k].crosshair.enabled) {
							this.axisY2[k].renderCrosshair(x, y);
						}
					}
				}
			}
		}
	}

	//#endregion Events

	//Sets the viewport range of Axis based on the given rect bounds (pixels). Also limits the zooming/panning based on axis bounds. Returns a boolean to indicate whether it was succesful or not based on the selected region.
	Chart.prototype._zoomPanToSelectedRegion = function (px1, py1, px2, py2, keepAxisIndependent) {

		var validateRegion = this.validateRegion(px1, py1, px2, py2, keepAxisIndependent);
		var axesWithValidRange = validateRegion.axesWithValidRange,
			axesRanges = validateRegion.axesRanges;


		if (validateRegion.isValid) {
			for (var i = 0; i < axesWithValidRange.length; i++) {
				var axis = axesWithValidRange[i];
				var param = axesRanges[i];

				axis.setViewPortRange(param.val1, param.val2);
			}
		}
		//else console.log(px1,px2, val2, "-", val1, "=", Math.abs(val2 - val1));

		return validateRegion.isValid;
	}

	Chart.prototype.validateRegion = function (px1, py1, px2, py2, keepAxisIndependent) {

		keepAxisIndependent = keepAxisIndependent || false;

		var zoomPX = this.zoomType.indexOf("x") >= 0, //Whether to zoom horizontally
			zoomPY = this.zoomType.indexOf("y") >= 0, //Whether to zoom vertically
			isValid = false,
			isWithinBreaks,
			axesWithValidRange = [],
			axes = [],
			axesRanges = [];

		for (var k = 0; k < this._axes.length; k++)
			if (this._axes[k].type === "axisX" && zoomPX || this._axes[k].type === "axisY" && zoomPY)
				axes.push(this._axes[k]);

		for (var i = 0; i < axes.length; i++) {
			var axis = axes[i];
			//var range = Math.abs(axis.viewportMaximum - axis.viewportMinimum);
			isWithinBreaks = false;

			var val1 = axis.convertPixelToValue({ x: px1, y: py1 });
			var val2 = axis.convertPixelToValue({ x: px2, y: py2 });

			if (val1 > val2) {
				var temp = val2;
				val2 = val1;
				val1 = temp;
			}

			if (axis.scaleBreaks)
				for (var j = 0; !isWithinBreaks && j < axis.scaleBreaks._appliedBreaks.length; j++)
					isWithinBreaks = axis.scaleBreaks._appliedBreaks[j].startValue <= val1 && axis.scaleBreaks._appliedBreaks[j].endValue >= val2;

			if (isFinite(axis.dataInfo.minDiff)) {
				var valueDiff = axis.getApparentDifference(val1, val2, null, true);

				if (!(isWithinBreaks || !(this.panEnabled && axis.scaleBreaks && axis.scaleBreaks._appliedBreaks.length) && (axis.logarithmic && valueDiff < Math.pow(axis.dataInfo.minDiff, 3) || !axis.logarithmic && valueDiff < 3 * Math.abs(axis.dataInfo.minDiff))
					|| (val1 < axis.minimum) || (val2 > axis.maximum))) {
					axesWithValidRange.push(axis);
					axesRanges.push({ val1: val1, val2: val2 });

					isValid = true;
				} else if (!keepAxisIndependent) {
					isValid = false;
					break;
				}
			}
		}

		return {
			isValid: isValid, axesWithValidRange: axesWithValidRange, axesRanges: axesRanges
		};
	}

	Chart.prototype.preparePlotArea = function () {

		var plotArea = this.plotArea;

		if (!isCanvasSupported && (plotArea.x1 > 0 || plotArea.y1 > 0)) {
			plotArea.ctx.translate(plotArea.x1, plotArea.y1);
		}

		if ((this.axisX[0] || this.axisX2[0]) && (this.axisY[0] || this.axisY2[0])) {
			var lineCoordinates = this.axisX[0] ? this.axisX[0].lineCoordinates : this.axisX2[0].lineCoordinates;

			if (this.axisY && this.axisY.length > 0) {
				if (this.axisY[0]) {
					var yAxis = this.axisY[0];
					plotArea.x1 = lineCoordinates.x1 < lineCoordinates.x2 ? lineCoordinates.x1 : yAxis.lineCoordinates.x1;
					plotArea.y1 = (lineCoordinates.y1 < yAxis.lineCoordinates.y1 ? lineCoordinates.y1 : yAxis.lineCoordinates.y1);

					plotArea.x2 = (lineCoordinates.x2 > yAxis.lineCoordinates.x2 ? lineCoordinates.x2 : yAxis.lineCoordinates.x2);
					plotArea.y2 = lineCoordinates.y2 > lineCoordinates.y1 ? lineCoordinates.y2 : yAxis.lineCoordinates.y2;

					plotArea.width = plotArea.x2 - plotArea.x1;
					plotArea.height = plotArea.y2 - plotArea.y1;
					//plotArea = { x1: x1, y1: y1, x2: x2, y2: y2, width: x2 - x1, height: y2 - y1 };
				}
			}
			if (this.axisY2 && this.axisY2.length > 0) {
				if (this.axisY2[0]) {
					var yAxis = this.axisY2[0];
					plotArea.x1 = lineCoordinates.x1 < lineCoordinates.x2 ? lineCoordinates.x1 : yAxis.lineCoordinates.x1;
					plotArea.y1 = (lineCoordinates.y1 < yAxis.lineCoordinates.y1 ? lineCoordinates.y1 : yAxis.lineCoordinates.y1);

					plotArea.x2 = (lineCoordinates.x2 > yAxis.lineCoordinates.x2 ? lineCoordinates.x2 : yAxis.lineCoordinates.x2);
					plotArea.y2 = lineCoordinates.y2 > lineCoordinates.y1 ? lineCoordinates.y2 : yAxis.lineCoordinates.y2;

					plotArea.width = plotArea.x2 - plotArea.x1;
					plotArea.height = plotArea.y2 - plotArea.y1;
					//plotArea = { x1: x1, y1: y1, x2: x2, y2: y2, width: x2 - x1, height: y2 - y1 };
				}
			}
		} else {
			//ToDo: @sunil
			var freeSpace = this.layoutManager.getFreeSpace();
			plotArea.x1 = freeSpace.x1;
			plotArea.x2 = freeSpace.x2;
			plotArea.y1 = freeSpace.y1;
			plotArea.y2 = freeSpace.y2;

			plotArea.width = freeSpace.width;
			plotArea.height = freeSpace.height;
		}

		if (!isCanvasSupported) {

			plotArea.canvas.width = plotArea.width;
			plotArea.canvas.height = plotArea.height;

			plotArea.canvas.style.left = plotArea.x1 + "px";
			plotArea.canvas.style.top = plotArea.y1 + "px";

			if (plotArea.x1 > 0 || plotArea.y1 > 0) {
				plotArea.ctx.translate(-plotArea.x1, -plotArea.y1);
			}
		}

		plotArea.layoutManager = new LayoutManager(plotArea.x1, plotArea.y1, plotArea.x2, plotArea.y2, 2);
	}

	//#region Render Methods

	Chart.prototype.renderIndexLabels = function (targetCtx) {
		var ctx = targetCtx || this.plotArea.ctx;

		var plotArea = this.plotArea;

		var mid = 0;
		var yMinLimit = 0;
		var yMaxLimit = 0;
		var xMinLimit = 0;
		var xMaxLimit = 0;
		var marginX = 0, marginY = 0; // Margin between label and dataPoint / PlotArea
		var offSetX = 0, offSetY = 0; // Distance to offSet textBlock (top) from dataPoint inorder to position it
		var offset = 0;
		var visibleWidth = 0;
		var visibleHeight = 0;

		for (var i = 0; i < this._indexLabels.length; i++) {

			var indexLabel = this._indexLabels[i];
			var chartTypeLower = indexLabel.chartType.toLowerCase();

			var x, y, angle;

			var fontColor = getProperty("indexLabelFontColor", indexLabel.dataPoint, indexLabel.dataSeries);
			var fontSize = getProperty("indexLabelFontSize", indexLabel.dataPoint, indexLabel.dataSeries);
			var fontFamily = getProperty("indexLabelFontFamily", indexLabel.dataPoint, indexLabel.dataSeries);
			var fontStyle = getProperty("indexLabelFontStyle", indexLabel.dataPoint, indexLabel.dataSeries);
			var fontWeight = getProperty("indexLabelFontWeight", indexLabel.dataPoint, indexLabel.dataSeries);
			var backgroundColor = getProperty("indexLabelBackgroundColor", indexLabel.dataPoint, indexLabel.dataSeries);
			var maxWidth = getProperty("indexLabelMaxWidth", indexLabel.dataPoint, indexLabel.dataSeries);
			var indexLabelWrap = getProperty("indexLabelWrap", indexLabel.dataPoint, indexLabel.dataSeries);
			var indexLabelLineDashType = getProperty("indexLabelLineDashType", indexLabel.dataPoint, indexLabel.dataSeries);
			var indexLabelLineColor = getProperty("indexLabelLineColor", indexLabel.dataPoint, indexLabel.dataSeries);
			var indexLabelLineThickness = isNullOrUndefined(indexLabel.dataPoint.indexLabelLineThickness) ?
				isNullOrUndefined(indexLabel.dataSeries.options.indexLabelLineThickness) ? 0 : indexLabel.dataSeries.options.indexLabelLineThickness
				: indexLabel.dataPoint.indexLabelLineThickness;
			offset = indexLabelLineThickness > 0 ? Math.min(10, (this.plotInfo.axisPlacement === "normal" ? this.plotArea.height : this.plotArea.width) << 0) : 0;

			var percentAndTotal = {
				percent: null, total: null
			};
			var formatterParameter = null;

			if (indexLabel.dataSeries.type.indexOf("stacked") >= 0 || indexLabel.dataSeries.type === "pie" || indexLabel.dataSeries.type === "doughnut")
				percentAndTotal = this.getPercentAndTotal(indexLabel.dataSeries, indexLabel.dataPoint);

			if (indexLabel.dataSeries.indexLabelFormatter || indexLabel.dataPoint.indexLabelFormatter)
				formatterParameter = {
					chart: this, dataSeries: indexLabel.dataSeries, dataPoint: indexLabel.dataPoint, index: indexLabel.indexKeyword, total: percentAndTotal.total, percent: percentAndTotal.percent
				};


			var indexLabelText = indexLabel.dataPoint.indexLabelFormatter ? indexLabel.dataPoint.indexLabelFormatter(formatterParameter)
				: indexLabel.dataPoint.indexLabel ? this.replaceKeywordsWithValue(indexLabel.dataPoint.indexLabel, indexLabel.dataPoint, indexLabel.dataSeries, null, indexLabel.indexKeyword)
					: indexLabel.dataSeries.indexLabelFormatter ? indexLabel.dataSeries.indexLabelFormatter(formatterParameter)
						: indexLabel.dataSeries.indexLabel ? this.replaceKeywordsWithValue(indexLabel.dataSeries.indexLabel, indexLabel.dataPoint, indexLabel.dataSeries, null, indexLabel.indexKeyword) : null;

			if (indexLabelText === null || indexLabelText === "")
				continue;

			var placement = getProperty("indexLabelPlacement", indexLabel.dataPoint, indexLabel.dataSeries);
			var orientation = getProperty("indexLabelOrientation", indexLabel.dataPoint, indexLabel.dataSeries);
			var angle = 0;

			var direction = indexLabel.direction; // +1 for above the point and -1 for below the point

			var axisX = indexLabel.dataSeries.axisX;
			var axisY = indexLabel.dataSeries.axisY;
			var isInside = false;


			var textBlock = new TextBlock(ctx, {
				x: 0,
				y: 0,
				maxWidth: maxWidth ? maxWidth : this.width * .5,
				maxHeight: indexLabelWrap ? fontSize * 5 : fontSize * 1.5,
				angle: orientation === "horizontal" ? 0 : -90,
				text: indexLabelText,
				padding: 0,
				backgroundColor: backgroundColor,
				horizontalAlign: "left",//left, center, right
				fontSize: fontSize,//in pixels
				fontFamily: fontFamily,
				fontWeight: fontWeight, //normal, bold, bolder, lighter,
				fontColor: fontColor,
				fontStyle: fontStyle, // normal, italic, oblique
				textBaseline: "top"
			});

			var textSize = textBlock.measureText();

			indexLabel.dataSeries.indexLabelMaxWidth = textBlock.maxWidth;
			//if (indexLabel.dataPoint.x < axisX.viewportMinimum || indexLabel.dataPoint.x > axisX.viewportMaximum || indexLabel.dataPoint.y < axisY.viewportMinimum || indexLabel.dataPoint.y > axisY.viewportMaximum)
			//	continue;

			if (chartTypeLower === "stackedarea100") {
				if (indexLabel.point.x < plotArea.x1 || indexLabel.point.x > plotArea.x2 || indexLabel.point.y < plotArea.y1 - 1 || indexLabel.point.y > plotArea.y2 + 1)
					continue;
			}
			else if (chartTypeLower === "rangearea" || chartTypeLower === "rangesplinearea") {
				if (indexLabel.dataPoint.x < axisX.viewportMinimum || indexLabel.dataPoint.x > axisX.viewportMaximum || Math.max.apply(null, indexLabel.dataPoint.y) < axisY.viewportMinimum || Math.min.apply(null, indexLabel.dataPoint.y) > axisY.viewportMaximum)
					continue;
			}
			else if (chartTypeLower.indexOf("line") >= 0 || chartTypeLower.indexOf("area") >= 0
				|| chartTypeLower.indexOf("bubble") >= 0 || chartTypeLower.indexOf("scatter") >= 0) {

				if (indexLabel.dataPoint.x < axisX.viewportMinimum || indexLabel.dataPoint.x > axisX.viewportMaximum || indexLabel.dataPoint.y < axisY.viewportMinimum || indexLabel.dataPoint.y > axisY.viewportMaximum)
					continue;
			}
			else if (chartTypeLower.indexOf("column") >= 0 || chartTypeLower === "waterfall" || (chartTypeLower === "error" && !indexLabel.axisSwapped)) {
				if (indexLabel.dataPoint.x < axisX.viewportMinimum || indexLabel.dataPoint.x > axisX.viewportMaximum || indexLabel.bounds.y1 > plotArea.y2 || indexLabel.bounds.y2 < plotArea.y1)
					continue;
			}
			else if (chartTypeLower.indexOf("bar") >= 0 || chartTypeLower === "error") {
				if (indexLabel.dataPoint.x < axisX.viewportMinimum || indexLabel.dataPoint.x > axisX.viewportMaximum || indexLabel.bounds.x1 > plotArea.x2 || indexLabel.bounds.x2 < plotArea.x1)
					continue;
			}
			else if (chartTypeLower === "candlestick" || chartTypeLower === "ohlc") {
				if (indexLabel.dataPoint.x < axisX.viewportMinimum || indexLabel.dataPoint.x > axisX.viewportMaximum || Math.max.apply(null, indexLabel.dataPoint.y) < axisY.viewportMinimum || Math.min.apply(null, indexLabel.dataPoint.y) > axisY.viewportMaximum)
					continue;
			}
			else {
				if (indexLabel.dataPoint.x < axisX.viewportMinimum || indexLabel.dataPoint.x > axisX.viewportMaximum)
					continue;
			}

			marginY = 2;
			marginX = 2;

			if (orientation === "horizontal") {
				visibleWidth = textBlock.width;
				visibleHeight = textBlock.height;
			} else {
				visibleHeight = textBlock.width;
				visibleWidth = textBlock.height;
			}

			if (this.plotInfo.axisPlacement === "normal") {

				if (chartTypeLower.indexOf("line") >= 0 || chartTypeLower.indexOf("area") >= 0) {

					placement = "auto";
					marginY = 4;

				} else if (chartTypeLower.indexOf("stacked") >= 0) {

					if (placement === "auto")
						placement = "inside";

				} else if (chartTypeLower === "bubble" || chartTypeLower === "scatter") {

					placement = "inside";

				}

				x = indexLabel.point.x - visibleWidth / 2;

				if (placement !== "inside") {	//outside or auto

					yMinLimit = plotArea.y1;
					yMaxLimit = plotArea.y2;

					if (direction > 0) {
						y = indexLabel.point.y - visibleHeight - marginY - offset;

						if (y < yMinLimit) {
							if (placement === "auto") {
								y = Math.max(indexLabel.point.y, yMinLimit) + marginY + offset;
							}
							else {
								y = yMinLimit + marginY + offset;
							}
							isInside = y + visibleHeight > indexLabel.point.y;
						}
					}
					else {
						y = indexLabel.point.y + marginY + offset;

						if (y > yMaxLimit - visibleHeight - marginY - offset) {
							if (placement === "auto") {
								y = Math.min(indexLabel.point.y, yMaxLimit) - visibleHeight - marginY - offset;
							}
							else {
								y = yMaxLimit - visibleHeight - marginY - offset;
							}
							isInside = y < indexLabel.point.y;
						}
					}

				} else {


					yMinLimit = Math.max(indexLabel.bounds.y1, plotArea.y1);
					yMaxLimit = Math.min(indexLabel.bounds.y2, plotArea.y2);


					if (chartTypeLower.indexOf("range") >= 0 || chartTypeLower === "error") {
						if (direction > 0)
							mid = Math.max(indexLabel.bounds.y1, plotArea.y1) + visibleHeight / 2 + marginY;
						else
							mid = Math.min(indexLabel.bounds.y2, plotArea.y2) - visibleHeight / 2 - marginY;
					}
					else
						mid = (Math.max(indexLabel.bounds.y1, plotArea.y1) + Math.min(indexLabel.bounds.y2, plotArea.y2)) / 2

					if (direction > 0) {
						y = Math.max(indexLabel.point.y, mid) - visibleHeight / 2;

						if (y < yMinLimit && (chartTypeLower === "bubble" || chartTypeLower === "scatter")) {
							y = Math.max(indexLabel.point.y - visibleHeight - marginY, plotArea.y1 + marginY);
						}
					}
					else {
						y = Math.min(indexLabel.point.y, mid) - visibleHeight / 2;

						if (y > yMaxLimit - visibleHeight - marginY && (chartTypeLower === "bubble" || chartTypeLower === "scatter")) {
							y = Math.min(indexLabel.point.y + marginY, plotArea.y2 - visibleHeight - marginY);
						}
					}

					// Make Sure that it does not overlap the axis line
					y = Math.min(y, yMaxLimit - visibleHeight);
				}
			}
			else {

				if (chartTypeLower.indexOf("line") >= 0 || chartTypeLower.indexOf("area") >= 0
					|| chartTypeLower.indexOf("scatter") >= 0) {

					placement = "auto";
					marginX = 4;

				} else if (chartTypeLower.indexOf("stacked") >= 0) {

					if (placement === "auto")
						placement = "inside";

				} else if (chartTypeLower === "bubble") {

					placement = "inside";

				}

				y = indexLabel.point.y - visibleHeight / 2;

				if (placement !== "inside") {	//outside or auto

					xMinLimit = plotArea.x1;
					xMaxLimit = plotArea.x2;

					if (direction < 0) {
						x = indexLabel.point.x - visibleWidth - marginX - offset;

						if (x < xMinLimit) {
							if (placement === "auto") {
								x = Math.max(indexLabel.point.x, xMinLimit) + marginX + offset;
							}
							else {
								x = xMinLimit + marginX + offset;
							}
							isInside = x + visibleWidth > indexLabel.point.x;
						}
					}
					else {
						x = indexLabel.point.x + marginX + offset;

						if (x > xMaxLimit - visibleWidth - marginX - offset) {
							if (placement === "auto") {
								x = Math.min(indexLabel.point.x, xMaxLimit) - visibleWidth - marginX - offset;
							}
							else {
								x = xMaxLimit - visibleWidth - marginX - offset;
							}
							isInside = x < indexLabel.point.x;
						}
					}

				} else {

					xMinLimit = Math.max(indexLabel.bounds.x1, plotArea.x1);
					xMaxLimit = Math.min(indexLabel.bounds.x2, plotArea.x2);

					if (chartTypeLower.indexOf("range") >= 0 || chartTypeLower === "error") {
						if (direction < 0)
							mid = Math.max(indexLabel.bounds.x1, plotArea.x1) + visibleWidth / 2 + marginX;
						else
							mid = Math.min(indexLabel.bounds.x2, plotArea.x2) - visibleWidth / 2 - marginX;
					}
					else
						var mid = (Math.max(indexLabel.bounds.x1, plotArea.x1) + Math.min(indexLabel.bounds.x2, plotArea.x2)) / 2;

					if (direction < 0) {
						x = Math.max(indexLabel.point.x, mid) - visibleWidth / 2;

						//if (y < xMinLimit) {
						//	y = Math.max(indexLabel.point.y - visibleHeight - marginY, plotArea.y1 + marginY);
						//}
					}
					else {
						x = Math.min(indexLabel.point.x, mid) - visibleWidth / 2;

						//if (y > xMaxLimit - visibleHeight - marginY) {
						//	y = Math.min(indexLabel.point.y + marginY, plotArea.y2 - visibleHeight - marginY);
						//}
					}

					// Make Sure that it does not overlap the axis line
					x = Math.max(x, xMinLimit);
				}
			}

			if (orientation === "vertical") {
				y += visibleHeight;
			}

			//y -= 5;
			textBlock.x = x;
			textBlock.y = y;

			//console.log(textBlock.text + ": " + textBlock.x + "; " + textBlock.y);

			textBlock.render(true);

			//indexLabel connection line rendering logic not for pie and doughnut, use textSize later on
			if (indexLabelLineThickness && placement !== "inside" &&
				((chartTypeLower.indexOf("bar") < 0 && !(chartTypeLower === "error" && indexLabel.axisSwapped)) && indexLabel.point.x > plotArea.x1 && indexLabel.point.x < plotArea.x2 || !isInside) &&
				((chartTypeLower.indexOf("column") < 0 && !(chartTypeLower === "error" && !indexLabel.axisSwapped)) && indexLabel.point.y > plotArea.y1 && indexLabel.point.y < plotArea.y2 || !isInside)) {

				ctx.lineWidth = indexLabelLineThickness;
				ctx.strokeStyle = indexLabelLineColor ? indexLabelLineColor : "gray";
				if (ctx.setLineDash) {
					ctx.setLineDash(getLineDashArray(indexLabelLineDashType, indexLabelLineThickness));
				}
				ctx.beginPath();
				ctx.moveTo(indexLabel.point.x, indexLabel.point.y);

				if (chartTypeLower.indexOf("bar") >= 0 || chartTypeLower === "error" && indexLabel.axisSwapped)
					ctx.lineTo(x + (indexLabel.direction > 0 ? 0 : visibleWidth), y + (orientation === "horizontal" ? visibleHeight : -visibleHeight) / 2);
				else if (chartTypeLower.indexOf("column") >= 0 || chartTypeLower === "error" && !indexLabel.axisSwapped)
					ctx.lineTo(x + visibleWidth / 2, y + ((indexLabel.direction > 0 ? visibleHeight : -visibleHeight) + (orientation === "horizontal" ? visibleHeight : -visibleHeight)) / 2);
				else
					ctx.lineTo(x + visibleWidth / 2, y + ((y < indexLabel.point.y ? visibleHeight : -visibleHeight) + (orientation === "horizontal" ? visibleHeight : -visibleHeight)) / 2);
				ctx.stroke();
			}
		}

		//source and dest would be same when animation is not enabled
		var animationInfo = {
			source: ctx, dest: this.plotArea.ctx, animationCallback: AnimationHelper.fadeInAnimation, easingFunction: AnimationHelper.easing.easeInQuad, animationBase: 0, startTimePercent: .7
		};

		for (var i = 0; i < this._indexLabels.length; i++) {
			var indexLabel = this._indexLabels[i];
			var backgroundColor = getProperty("indexLabelBackgroundColor", indexLabel.dataPoint, indexLabel.dataSeries);
			indexLabel.dataSeries.indexLabelBackgroundColor = !isNullOrUndefined(backgroundColor) ? backgroundColor : (isCanvasSupported ? "transparent" : null);
		}
		return animationInfo;
	}

	Chart.prototype.renderLine = function (plotUnit) {

		var targetCtx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
		var ctx = isCanvasSupported ? this._preRenderCtx : targetCtx;

		var totalDataSeries = plotUnit.dataSeriesIndexes.length;
		if (totalDataSeries <= 0)
			return;

		var ghostCtx = this._eventManager.ghostCtx;
		//var ghostCtx = this.overlaidCanvasCtx;

		ctx.save();

		var plotArea = this.plotArea;

		ctx.beginPath();
		ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
		ctx.clip();

		var markers = [];
		var markerPropsColor = null;
		var previousNotNullDataPoint;
		//var defaultLineJoinType = ctx.lineJoin;
		//ctx.lineJoin = "round";

		for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

			var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

			var dataSeries = this.data[dataSeriesIndex];
			ctx.lineWidth = dataSeries.lineThickness;
			var dataPoints = dataSeries.dataPoints;
			var currentLineDashType = "solid";

			if (ctx.setLineDash) {
				var nullDataLineDashType = getLineDashArray(dataSeries.nullDataLineDashType, dataSeries.lineThickness);
				currentLineDashType = dataSeries.lineDashType;
				var lineDashType = getLineDashArray(currentLineDashType, dataSeries.lineThickness);
				ctx.setLineDash(lineDashType);
			}

			var seriesId = dataSeries.id;
			this._eventManager.objectMap[seriesId] = {
				objectType: "dataSeries", dataSeriesIndex: dataSeriesIndex
			};
			var hexColor = intToHexColorString(seriesId);
			ghostCtx.strokeStyle = hexColor;
			//ghostCtx.lineWidth = dataSeries.lineThickness;
			ghostCtx.lineWidth = dataSeries.lineThickness > 0 ? Math.max(dataSeries.lineThickness, 4) : 0;

			var colorSet = dataSeries._colorSet;
			var color = dataSeries.lineColor = dataSeries.options.lineColor ? dataSeries.options.lineColor : colorSet[0];
			var currentStrokeStyle = color;
			ctx.strokeStyle = color;

			var isFirstDataPointInPlotArea = true;
			var i = 0, x, y;
			var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number back and forth.

			//if (!dataSeries.options.markerSize && dataSeries.dataPoints.length < 1000)
			//    dataSeries.markerSize = 8;
			ctx.beginPath();
			if (dataPoints.length > 0) {
				//dataSeries.noDataPointsInPlotArea = 0
				var prevDataNull = false;
				for (i = 0; i < dataPoints.length; i++) {

					dataPointX = dataPoints[i].x.getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;

					if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax && !(dataSeries.connectNullData && prevDataNull))
						continue;

					//if (!isFinite(dataPoints[i].y))
					//    continue;

					if (typeof (dataPoints[i].y) !== "number") {
						if (i > 0 && !(dataSeries.connectNullData || prevDataNull || isFirstDataPointInPlotArea)) {// if first dataPoint is null then no need to call stroke method
							ctx.stroke();
							if (isCanvasSupported) {
								ghostCtx.stroke();
							}
						}


						prevDataNull = true;
						continue;
					}

					x = plotUnit.axisX.convertValueToPixel(dataPointX);
					y = plotUnit.axisY.convertValueToPixel(dataPoints[i].y);

					var id = dataSeries.dataPointIds[i];
					this._eventManager.objectMap[id] = {
						id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x, y1: y
					};


					//dataSeries.noDataPointsInPlotArea++;

					if (isFirstDataPointInPlotArea || prevDataNull) {

						//For drawing line over nonNull dataPoints
						if (!isFirstDataPointInPlotArea && dataSeries.connectNullData) {
							//Applying nullLineDashType if lineDashType at dataPoints not mentioned in previous dataPoints
							if (ctx.setLineDash && (dataSeries.options.nullDataLineDashType || (currentLineDashType === dataSeries.lineDashType && dataSeries.lineDashType !== dataSeries.nullDataLineDashType))) {
								ctx.stroke();
								//if (isCanvasSupported) {
								//	ghostCtx.stroke();
								//}
								ctx.beginPath();
								ctx.moveTo(previousNotNullDataPoint.x, previousNotNullDataPoint.y);
								currentLineDashType = dataSeries.nullDataLineDashType;
								ctx.setLineDash(nullDataLineDashType);
							}

							ctx.lineTo(x, y);
							if (isCanvasSupported)
								ghostCtx.lineTo(x, y);

						} else { //If connectNullData = false
							ctx.beginPath();
							ctx.moveTo(x, y);
							if (isCanvasSupported) {
								ghostCtx.beginPath();
								ghostCtx.moveTo(x, y);
							}
						}

						isFirstDataPointInPlotArea = false;
						prevDataNull = false;
					} else {

						ctx.lineTo(x, y);

						if (isCanvasSupported)
							ghostCtx.lineTo(x, y);

						if (i % 500 == 0) {
							ctx.stroke();
							ctx.beginPath();
							ctx.moveTo(x, y);

							if (isCanvasSupported) {
								ghostCtx.stroke();
								ghostCtx.beginPath();
								ghostCtx.moveTo(x, y);
							}
						}
					}

					previousNotNullDataPoint = { x: x, y: y };

					if (i < dataPoints.length - 1 && (currentStrokeStyle !== (dataPoints[i].lineColor || color) || currentLineDashType !== (dataPoints[i].lineDashType || dataSeries.lineDashType))) { //Applieng new ctx on DataPoint

						ctx.stroke();
						ctx.beginPath();
						ctx.moveTo(x, y);
						//if (isCanvasSupported) {
						//	ghostCtx.stroke();
						//	ghostCtx.beginPath();
						//	ghostCtx.moveTo(x, y);
						//}

						currentStrokeStyle = dataPoints[i].lineColor || color;
						ctx.strokeStyle = currentStrokeStyle;
						if (ctx.setLineDash)
							if (dataPoints[i].lineDashType) {
								currentLineDashType = dataPoints[i].lineDashType;
								ctx.setLineDash(getLineDashArray(currentLineDashType, dataSeries.lineThickness));
							}
							else {
								currentLineDashType = dataSeries.lineDashType;
								ctx.setLineDash(lineDashType);
							}
					}


					//Render Marker
					if (dataPoints[i].markerSize > 0 || dataSeries.markerSize > 0) {

						var markerProps = dataSeries.getMarkerProperties(i, x, y, ctx);
						markerPropsColor = markerProps.color;
						markers.push(markerProps);

						//if (!dataSeries.maxWidthInX || markerProps.size > dataSeries.maxWidthInX) {
						//	dataSeries.maxWidthInX = markerProps.size / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);
						//}

						var markerColor = intToHexColorString(id);

						//window.console.log("index: " + i + "; id: " + id + "; hex: " + markerColor);

						if (isCanvasSupported) {
							markers.push({
								x: x, y: y, ctx: ghostCtx,
								type: markerProps.type,
								size: markerProps.size,
								color: markerColor,
								borderColor: markerColor,
								borderThickness: markerProps.borderThickness
							});
						}
					}

					if (dataPoints[i].indexLabel || dataSeries.indexLabel || dataPoints[i].indexLabelFormatter || dataSeries.indexLabelFormatter) {

						this._indexLabels.push({
							chartType: "line",
							dataPoint: dataPoints[i],
							dataSeries: dataSeries,
							point: {
								x: x, y: y
							},
							direction: dataPoints[i].y < 0 === plotUnit.axisY.reversed ? 1 : -1,
							color: color
						});

					}

				}

				ctx.stroke();

				if (isCanvasSupported)
					ghostCtx.stroke();
			}

		}


		RenderHelper.drawMarkers(markers);
		//dataSeries.markerColor = markerPropsColor;
		//ctx.lineJoin = defaultLineJoinType;

		if (isCanvasSupported) {
			targetCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height);

			ctx.globalCompositeOperation = "source-atop";
			if (plotUnit.axisX.maskCanvas)
				ctx.drawImage(plotUnit.axisX.maskCanvas, 0, 0, this.width, this.height);
			if (plotUnit.axisY.maskCanvas)
				ctx.drawImage(plotUnit.axisY.maskCanvas, 0, 0, this.width, this.height);
			if (this._breaksCanvasCtx)
				this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height);
			ctx.clearRect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);

			ghostCtx.beginPath();
		}
		ctx.restore();

		ctx.beginPath();

		//source and dest would be same when animation is not enabled
		var animationInfo = {
			source: targetCtx, dest: this.plotArea.ctx, animationCallback: AnimationHelper.xClipAnimation, easingFunction: AnimationHelper.easing.linear, animationBase: 0
		};
		return animationInfo;
	}

	Chart.prototype.renderStepLine = function (plotUnit) {
		var targetCtx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
		var ctx = isCanvasSupported ? this._preRenderCtx : targetCtx;

		var totalDataSeries = plotUnit.dataSeriesIndexes.length;
		if (totalDataSeries <= 0)
			return;

		var ghostCtx = this._eventManager.ghostCtx;
		//var ghostCtx = this.overlaidCanvasCtx;

		ctx.save();

		var plotArea = this.plotArea;

		ctx.beginPath();
		ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
		ctx.clip();

		var markers = [];
		var markerPropsColor = null;
		var previousNotNullDataPoint;

		for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

			var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

			var dataSeries = this.data[dataSeriesIndex];
			ctx.lineWidth = dataSeries.lineThickness;
			var dataPoints = dataSeries.dataPoints;
			var currentLineDashType = "solid";

			if (ctx.setLineDash) {
				var nullDataLineDashType = getLineDashArray(dataSeries.nullDataLineDashType, dataSeries.lineThickness);
				currentLineDashType = dataSeries.lineDashType;
				var lineDashType = getLineDashArray(currentLineDashType, dataSeries.lineThickness);
				ctx.setLineDash(lineDashType);
			}

			var seriesId = dataSeries.id;
			this._eventManager.objectMap[seriesId] = {
				objectType: "dataSeries", dataSeriesIndex: dataSeriesIndex
			};
			var hexColor = intToHexColorString(seriesId);
			ghostCtx.strokeStyle = hexColor;
			//ghostCtx.lineWidth = dataSeries.lineThickness;
			ghostCtx.lineWidth = dataSeries.lineThickness > 0 ? Math.max(dataSeries.lineThickness, 4) : 0;

			var colorSet = dataSeries._colorSet;
			var color = dataSeries.lineColor = dataSeries.options.lineColor ? dataSeries.options.lineColor : colorSet[0];
			var currentStrokeStyle = color;
			ctx.strokeStyle = color;

			var isFirstDataPointInPlotArea = true;
			var i = 0, x, y;
			var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number back and forth.

			//if (!dataSeries.options.markerSize && dataSeries.dataPoints.length < 1000)
			//    dataSeries.markerSize = 8;
			ctx.beginPath();
			if (dataPoints.length > 0) {
				//dataSeries.noDataPointsInPlotArea = 0
				var prevDataNull = false;
				for (i = 0; i < dataPoints.length; i++) {

					dataPointX = dataPoints[i].getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;

					if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax && !(dataSeries.connectNullData && prevDataNull))
						continue;

					//if (!isFinite(dataPoints[i].y))
					//    continue;

					if (typeof (dataPoints[i].y) !== "number") {
						if (i > 0 && !(dataSeries.connectNullData || prevDataNull || isFirstDataPointInPlotArea)) {// if first dataPoint is null then no need to call stroke method
							ctx.stroke();

							if (isCanvasSupported) {
								ghostCtx.stroke();
							}
						}

						prevDataNull = true;
						continue;
					}

					var prevY = y;

					x = plotUnit.axisX.convertValueToPixel(dataPointX);
					y = plotUnit.axisY.convertValueToPixel(dataPoints[i].y);

					var id = dataSeries.dataPointIds[i];
					this._eventManager.objectMap[id] = {
						id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x, y1: y
					};


					//dataSeries.noDataPointsInPlotArea++;

					if (isFirstDataPointInPlotArea || prevDataNull) {

						if (!isFirstDataPointInPlotArea && dataSeries.connectNullData) {

							if (ctx.setLineDash && (dataSeries.options.nullDataLineDashType || (currentLineDashType === dataSeries.lineDashType && dataSeries.lineDashType !== dataSeries.nullDataLineDashType))) {
								ctx.stroke();
								ctx.beginPath();
								ctx.moveTo(previousNotNullDataPoint.x, previousNotNullDataPoint.y);
								//if(!dataPoints[prevNonNullDataPointIndex].lineDashType)
								currentLineDashType = dataSeries.nullDataLineDashType;
								ctx.setLineDash(nullDataLineDashType);
							}
							ctx.lineTo(x, prevY);
							ctx.lineTo(x, y);
							if (isCanvasSupported) {
								ghostCtx.lineTo(x, prevY);
								ghostCtx.lineTo(x, y);
							}
						}
						else { //connectNullData = false
							ctx.beginPath();
							ctx.moveTo(x, y);
							if (isCanvasSupported) {
								ghostCtx.beginPath();
								ghostCtx.moveTo(x, y);
							}
						}

						isFirstDataPointInPlotArea = false;
						prevDataNull = false;
					} else {

						ctx.lineTo(x, prevY);
						if (isCanvasSupported)
							ghostCtx.lineTo(x, prevY);

						ctx.lineTo(x, y);
						if (isCanvasSupported)
							ghostCtx.lineTo(x, y);

						if (i % 500 == 0) {
							ctx.stroke();
							ctx.beginPath();
							ctx.moveTo(x, y);

							if (isCanvasSupported) {
								ghostCtx.stroke();
								ghostCtx.beginPath();
								ghostCtx.moveTo(x, y);
							}
						}

					}

					previousNotNullDataPoint = { x: x, y: y };

					if (i < dataPoints.length - 1 && (currentStrokeStyle !== (dataPoints[i].lineColor || color) || currentLineDashType !== (dataPoints[i].lineDashType || dataSeries.lineDashType))) { //Applieng new ctx on DataPoint
						ctx.stroke();
						ctx.beginPath();
						ctx.moveTo(x, y);
						currentStrokeStyle = dataPoints[i].lineColor || color;
						ctx.strokeStyle = currentStrokeStyle;
						if (ctx.setLineDash)
							if (dataPoints[i].lineDashType) {
								currentLineDashType = dataPoints[i].lineDashType;
								ctx.setLineDash(getLineDashArray(currentLineDashType, dataSeries.lineThickness));
							}
							else {
								currentLineDashType = dataSeries.lineDashType;
								ctx.setLineDash(lineDashType);
							}
					}

					//Render Marker
					if (dataPoints[i].markerSize > 0 || dataSeries.markerSize > 0) {

						var markerProps = dataSeries.getMarkerProperties(i, x, y, ctx);
						markerPropsColor = markerProps.color;
						markers.push(markerProps);

						//if (!dataSeries.maxWidthInX || markerProps.size > dataSeries.maxWidthInX) {
						//	dataSeries.maxWidthInX = markerProps.size / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);
						//}

						var markerColor = intToHexColorString(id);

						//window.console.log("index: " + i + "; id: " + id + "; hex: " + markerColor);
						if (isCanvasSupported) {
							markers.push({
								x: x, y: y, ctx: ghostCtx,
								type: markerProps.type,
								size: markerProps.size,
								color: markerColor,
								borderColor: markerColor,
								borderThickness: markerProps.borderThickness
							});
						}
					}

					if (dataPoints[i].indexLabel || dataSeries.indexLabel || dataPoints[i].indexLabelFormatter || dataSeries.indexLabelFormatter) {

						this._indexLabels.push({
							chartType: "stepLine",
							dataPoint: dataPoints[i],
							dataSeries: dataSeries,
							point: {
								x: x, y: y
							},
							direction: dataPoints[i].y < 0 === plotUnit.axisY.reversed ? 1 : -1,
							color: color
						});

					}

				}

				ctx.stroke();
				if (isCanvasSupported)
					ghostCtx.stroke();
			}
		}


		RenderHelper.drawMarkers(markers);
		//dataSeries.markerColor = markerPropsColor;

		if (isCanvasSupported) {
			targetCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height);

			ctx.globalCompositeOperation = "source-atop";
			if (plotUnit.axisX.maskCanvas)
				ctx.drawImage(plotUnit.axisX.maskCanvas, 0, 0, this.width, this.height);
			if (plotUnit.axisY.maskCanvas)
				ctx.drawImage(plotUnit.axisY.maskCanvas, 0, 0, this.width, this.height);
			if (this._breaksCanvasCtx)
				this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height);
			ctx.clearRect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);

			ghostCtx.beginPath();
		}
		ctx.restore();

		ctx.beginPath();

		//source and dest would be same when animation is not enabled
		var animationInfo = {
			source: targetCtx, dest: this.plotArea.ctx, animationCallback: AnimationHelper.xClipAnimation, easingFunction: AnimationHelper.easing.linear, animationBase: 0
		};
		return animationInfo;
	}

	function getBezierPoints(points, defaultTension) {
		var bezierPoints = [],
			tension;

		for (var i = 0; i < points.length; i++) {

			if (i == 0) {
				bezierPoints.push(points[0]);
				continue;
			}

			var i1, i2, pointIndex;

			pointIndex = i - 1;
			i1 = pointIndex === 0 ? 0 : pointIndex - 1;
			i2 = pointIndex === points.length - 1 ? pointIndex : pointIndex + 1;
			tension = Math.abs((points[i2].x - points[i1].x) / ((points[i2].x - points[pointIndex].x) === 0 ? 0.01 : (points[i2].x - points[pointIndex].x))) * (defaultTension - 1) / 2 + 1;

			var drv1 = {
				x: (points[i2].x - points[i1].x) / tension, y: (points[i2].y - points[i1].y) / tension
			}

			if (points[pointIndex].x > points[i1].x && drv1.x > 0 || points[pointIndex].x < points[i1].x && drv1.x < 0)
				var cp1 = {
					x: points[pointIndex].x + drv1.x / 3, y: points[pointIndex].y + drv1.y / 3
				}
			else
				var cp1 = {
					x: points[pointIndex].x, y: points[pointIndex].y + drv1.y / 9
				}

			bezierPoints[bezierPoints.length] = cp1;


			pointIndex = i;
			i1 = pointIndex === 0 ? 0 : pointIndex - 1;
			i2 = pointIndex === points.length - 1 ? pointIndex : pointIndex + 1;
			tension = Math.abs((points[i2].x - points[i1].x) / ((points[pointIndex].x - points[i1].x) === 0 ? 0.01 : (points[pointIndex].x - points[i1].x))) * (defaultTension - 1) / 2 + 1;
			var drv2 = {
				x: (points[i2].x - points[i1].x) / tension, y: (points[i2].y - points[i1].y) / tension
			}

			if (points[pointIndex].x > points[i1].x && drv2.x > 0 || points[pointIndex].x < points[i1].x && drv2.x < 0)
				var cp2 = {
					x: points[pointIndex].x - drv2.x / 3, y: points[pointIndex].y - drv2.y / 3
				}
			else
				var cp2 = {
					x: points[pointIndex].x, y: points[pointIndex].y - drv2.y / 9
				}

			bezierPoints[bezierPoints.length] = cp2;

			bezierPoints[bezierPoints.length] = points[i];
		}

		return bezierPoints;
	}

	Chart.prototype.renderSpline = function (plotUnit) {
		var targetCtx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
		var ctx = isCanvasSupported ? this._preRenderCtx : targetCtx;
		var totalDataSeries = plotUnit.dataSeriesIndexes.length;
		if (totalDataSeries <= 0)
			return;

		var ghostCtx = this._eventManager.ghostCtx;

		ctx.save();

		var plotArea = this.plotArea;

		ctx.beginPath();
		ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
		ctx.clip();

		var markers = [];
		var markerPropsColor = null;

		for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

			var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

			var dataSeries = this.data[dataSeriesIndex];
			ctx.lineWidth = dataSeries.lineThickness;
			var dataPoints = dataSeries.dataPoints;
			var currentLineDashType = "solid";

			if (ctx.setLineDash) {
				var nullDataLineDashType = getLineDashArray(dataSeries.nullDataLineDashType, dataSeries.lineThickness);
				currentLineDashType = dataSeries.lineDashType;
				var lineDashType = getLineDashArray(currentLineDashType, dataSeries.lineThickness);
				ctx.setLineDash(lineDashType);
			}

			var seriesId = dataSeries.id;
			this._eventManager.objectMap[seriesId] = {
				objectType: "dataSeries", dataSeriesIndex: dataSeriesIndex
			};
			var hexColor = intToHexColorString(seriesId);
			ghostCtx.strokeStyle = hexColor;
			//ghostCtx.lineWidth = dataSeries.lineThickness;
			ghostCtx.lineWidth = dataSeries.lineThickness > 0 ? Math.max(dataSeries.lineThickness, 4) : 0;

			var colorSet = dataSeries._colorSet;
			var color = dataSeries.lineColor = dataSeries.options.lineColor ? dataSeries.options.lineColor : colorSet[0];
			var currentStrokeStyle = color;
			ctx.strokeStyle = color;

			var isFirstDataPointInPlotArea = true;
			var i = 0, x, y;
			var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number back and forth.

			//if (!dataSeries.options.markerSize && dataSeries.dataPoints.length < 1000)
			//    dataSeries.markerSize = 8;

			var pixels = [];

			ctx.beginPath();
			if (dataPoints.length > 0) {

				var prevDataNull = false;
				for (i = 0; i < dataPoints.length; i++) {

					dataPointX = dataPoints[i].getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;

					if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax && !(dataSeries.connectNullData && prevDataNull))
						continue;

					//if (!isFinite(dataPoints[i].y))
					//    continue;

					if (typeof (dataPoints[i].y) !== "number") {
						if (i > 0 && !prevDataNull) {// if first dataPoint is null then no need to call stroke method
							if (dataSeries.connectNullData) {
								if (ctx.setLineDash && pixels.length > 0 && (dataSeries.options.nullDataLineDashType || !dataPoints[i - 1].lineDashType)) {
									pixels[pixels.length - 1].newLineDashArray = nullDataLineDashType;
									currentLineDashType = dataSeries.nullDataLineDashType;
								}
							}
							else {
								renderBezier(pixels);
								pixels = [];
							}

						}

						prevDataNull = true;
						continue;
					}

					x = plotUnit.axisX.convertValueToPixel(dataPointX);
					y = plotUnit.axisY.convertValueToPixel(dataPoints[i].y);

					var id = dataSeries.dataPointIds[i];
					this._eventManager.objectMap[id] = {
						id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x, y1: y
					};

					pixels[pixels.length] = {
						x: x, y: y
					};

					//Drawing cunnectNullData
					/*if (prevDataNull && dataSeries.connectNullData && ctx.setLineDash && !isFirstDataPointInPlotArea && (currentLineDashType === dataSeries.nullDataLineDashType && dataSeries.nullDataLineDashType !== dataSeries.lineDashType )) {
						newLineDashArray = lineDashType;
							currentLineDashType = dataSeries.lineDashType;
					}*/

					if (i < dataPoints.length - 1 && (currentStrokeStyle !== (dataPoints[i].lineColor || color) || currentLineDashType !== (dataPoints[i].lineDashType || dataSeries.lineDashType))) { //Applieng new ctx on DataPoint

						currentStrokeStyle = dataPoints[i].lineColor || color;
						pixels[pixels.length - 1].newStrokeStyle = currentStrokeStyle;
						if (ctx.setLineDash)
							if (dataPoints[i].lineDashType) {
								currentLineDashType = dataPoints[i].lineDashType;
								pixels[pixels.length - 1].newLineDashArray = getLineDashArray(currentLineDashType, dataSeries.lineThickness);
							}
							else {
								currentLineDashType = dataSeries.lineDashType;
								pixels[pixels.length - 1].newLineDashArray = lineDashType;
							}
					}


					//Add Markers
					if (dataPoints[i].markerSize > 0 || dataSeries.markerSize > 0) {

						var markerProps = dataSeries.getMarkerProperties(i, x, y, ctx);
						markerPropsColor = markerProps.color;
						markers.push(markerProps);

						//if (!dataSeries.maxWidthInX || markerProps.size > dataSeries.maxWidthInX) {
						//	dataSeries.maxWidthInX = markerProps.size / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);
						//}

						var markerColor = intToHexColorString(id);

						//window.console.log("index: " + i + "; id: " + id + "; hex: " + markerColor);
						if (isCanvasSupported) {
							markers.push({
								x: x, y: y, ctx: ghostCtx,
								type: markerProps.type,
								size: markerProps.size,
								color: markerColor,
								borderColor: markerColor,
								borderThickness: markerProps.borderThickness
							});
						}
					}

					//Add Labels
					if (dataPoints[i].indexLabel || dataSeries.indexLabel || dataPoints[i].indexLabelFormatter || dataSeries.indexLabelFormatter) {

						this._indexLabels.push({
							chartType: "spline",
							dataPoint: dataPoints[i],
							dataSeries: dataSeries,
							point: {
								x: x, y: y
							},
							direction: dataPoints[i].y < 0 === plotUnit.axisY.reversed ? 1 : -1,
							color: color
						});

					}

					isFirstDataPointInPlotArea = false;
					prevDataNull = false;

				}
			}

			renderBezier(pixels);
		}

		RenderHelper.drawMarkers(markers);
		//dataSeries.markerColor = markerPropsColor;

		if (isCanvasSupported) {
			targetCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height);

			ctx.globalCompositeOperation = "source-atop";
			if (plotUnit.axisX.maskCanvas)
				ctx.drawImage(plotUnit.axisX.maskCanvas, 0, 0, this.width, this.height);
			if (plotUnit.axisY.maskCanvas)
				ctx.drawImage(plotUnit.axisY.maskCanvas, 0, 0, this.width, this.height);
			if (this._breaksCanvasCtx)
				this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height);
			ctx.clearRect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);

			ghostCtx.beginPath();
		}
		ctx.restore();

		ctx.beginPath();


		function renderBezier(pixels) {

			var bp = getBezierPoints(pixels, 2);

			if (bp.length > 0) {
				ctx.beginPath();
				if (isCanvasSupported)
					ghostCtx.beginPath();

				ctx.moveTo(bp[0].x, bp[0].y);
				if (bp[0].newStrokeStyle)
					ctx.strokeStyle = bp[0].newStrokeStyle;
				if (bp[0].newLineDashArray)
					ctx.setLineDash(bp[0].newLineDashArray);

				if (isCanvasSupported)
					ghostCtx.moveTo(bp[0].x, bp[0].y);

				for (var i = 0; i < bp.length - 3; i += 3) {

					ctx.bezierCurveTo(bp[i + 1].x, bp[i + 1].y, bp[i + 2].x, bp[i + 2].y, bp[i + 3].x, bp[i + 3].y);

					if (isCanvasSupported)
						ghostCtx.bezierCurveTo(bp[i + 1].x, bp[i + 1].y, bp[i + 2].x, bp[i + 2].y, bp[i + 3].x, bp[i + 3].y);

					if (i > 0 && i % 3000 === 0 || bp[i + 3].newStrokeStyle || bp[i + 3].newLineDashArray) {
						ctx.stroke();
						ctx.beginPath();
						ctx.moveTo(bp[i + 3].x, bp[i + 3].y);
						if (bp[i + 3].newStrokeStyle)
							ctx.strokeStyle = bp[i + 3].newStrokeStyle;
						if (bp[i + 3].newLineDashArray)
							ctx.setLineDash(bp[i + 3].newLineDashArray);

						if (isCanvasSupported) {
							ghostCtx.stroke();
							ghostCtx.beginPath();
							ghostCtx.moveTo(bp[i + 3].x, bp[i + 3].y);
						}
					}
				}

				ctx.stroke();

				if (isCanvasSupported)
					ghostCtx.stroke();
			}
		}



		//source and dest would be same when animation is not enabled
		var animationInfo = {
			source: targetCtx, dest: this.plotArea.ctx, animationCallback: AnimationHelper.xClipAnimation, easingFunction: AnimationHelper.easing.linear, animationBase: 0
		};
		return animationInfo;
	}

	var drawRect = function (ctx, x1, y1, x2, y2, color, borderThickness, borderColor, top, bottom, left, right, fillOpacity) {
		if (typeof (fillOpacity) === "undefined")
			fillOpacity = 1;

		borderThickness = borderThickness || 0;
		borderColor = borderColor || "black";

		var a1 = x1, a2 = x2, b1 = y1, b2 = y2, edgeY, edgeX;
		if (x2 - x1 > 15 && y2 - y1 > 15)
			var bevelDepth = 8;
		else
			var bevelDepth = 0.35 * Math.min((x2 - x1), (y2 - y1));

		var color2 = "rgba(255, 255, 255, .4)";
		var color3 = "rgba(255, 255, 255, 0.1)";
		//color1 = "rgba(" + r + "," + g + ", " + b + ",1)";
		var color1 = color;

		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.save();
		ctx.fillStyle = color1;

		ctx.globalAlpha = fillOpacity;
		ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
		ctx.globalAlpha = 1;

		if (borderThickness > 0) {
			var offset = borderThickness % 2 === 0 ? 0 : .5;
			ctx.beginPath();
			ctx.lineWidth = borderThickness;
			ctx.strokeStyle = borderColor;
			ctx.moveTo(x1, y1);
			ctx.rect(x1 - offset, y1 - offset, x2 - x1 + 2 * offset, y2 - y1 + 2 * offset);
			ctx.stroke();
		}

		ctx.restore();
		//ctx.beginPath();
		if (top === true) {
			ctx.save();
			ctx.beginPath();
			ctx.moveTo(x1, y1);
			ctx.lineTo(x1 + bevelDepth, y1 + bevelDepth);
			ctx.lineTo(x2 - bevelDepth, y1 + bevelDepth);
			ctx.lineTo(x2, y1);
			ctx.closePath();
			var grd = ctx.createLinearGradient((x2 + x1) / 2, b1 + bevelDepth, (x2 + x1) / 2, b1);
			grd.addColorStop(0, color1);
			grd.addColorStop(1, color2);
			ctx.fillStyle = grd;
			ctx.fill();
			//              ctx.stroke();
			ctx.restore();
		}


		if (bottom === true) {
			ctx.save();
			ctx.beginPath();
			ctx.moveTo(x1, y2);
			ctx.lineTo(x1 + bevelDepth, y2 - bevelDepth);
			ctx.lineTo(x2 - bevelDepth, y2 - bevelDepth);
			ctx.lineTo(x2, y2);
			ctx.closePath();
			var grd = ctx.createLinearGradient((x2 + x1) / 2, b2 - bevelDepth, (x2 + x1) / 2, b2);
			grd.addColorStop(0, color1);
			grd.addColorStop(1, color2);
			ctx.fillStyle = grd;
			//       ctx.stroke();
			ctx.fill();
			ctx.restore();
		}

		if (left === true) {
			ctx.save();
			ctx.beginPath();
			ctx.moveTo(x1, y1)
			ctx.lineTo(x1 + bevelDepth, y1 + bevelDepth);
			ctx.lineTo(x1 + bevelDepth, y2 - bevelDepth);
			ctx.lineTo(x1, y2);
			ctx.closePath();
			var grd = ctx.createLinearGradient(a1 + bevelDepth, (y2 + y1) / 2, a1, (y2 + y1) / 2);
			grd.addColorStop(0, color1);
			grd.addColorStop(1, color3);
			ctx.fillStyle = grd;
			ctx.fill();
			//     ctx.stroke();
			ctx.restore();
		}


		if (right === true) {
			ctx.save();
			ctx.beginPath();
			ctx.moveTo(x2, y1)
			ctx.lineTo(x2 - bevelDepth, y1 + bevelDepth);
			ctx.lineTo(x2 - bevelDepth, y2 - bevelDepth);
			ctx.lineTo(x2, y2);
			var grd = ctx.createLinearGradient(a2 - bevelDepth, (y2 + y1) / 2, a2, (y2 + y1) / 2);
			grd.addColorStop(0, color1);
			grd.addColorStop(1, color3);
			ctx.fillStyle = grd;
			grd.addColorStop(0, color1);
			grd.addColorStop(1, color3);
			ctx.fillStyle = grd;
			ctx.fill();
			ctx.closePath();
			//          ctx.stroke();
			ctx.restore();
		}
		//	

	}

	Chart.prototype.renderColumn = function (plotUnit) {

		var targetCtx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
		var ctx = isCanvasSupported ? this._preRenderCtx : targetCtx;

		var totalDataSeries = plotUnit.dataSeriesIndexes.length;

		if (totalDataSeries <= 0)
			return;

		var color = null;

		var plotArea = this.plotArea;

		var i = 0, x, y;
		var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number from dataTime everytime it is used.

		var yZeroToPixel = plotUnit.axisY.convertValueToPixel(plotUnit.axisY.logarithmic ? plotUnit.axisY.viewportMinimum : 0);

		var minBarWidth = this.dataPointMinWidth = this.dataPointMinWidth ? this.dataPointMinWidth : this.dataPointWidth ? this.dataPointWidth : 1;
		var maxBarWidth = this.dataPointMaxWidth = this.dataPointMaxWidth ? this.dataPointMaxWidth : this.dataPointWidth ? this.dataPointWidth : Math.min((this.width * .15), this.plotArea.width / plotUnit.plotType.totalDataSeries * .9) << 0;

		var xMinDiff = plotUnit.axisX.dataInfo.minDiff;

		if (!isFinite(xMinDiff))
			xMinDiff = Math.abs(plotUnit.axisX.range) * .3;

		var barWidth = this.dataPointWidth = this.dataPointWidth ? this.dataPointWidth : (plotArea.width * (plotUnit.axisX.logarithmic ? Math.log(xMinDiff) / Math.log(plotUnit.axisX.range) : Math.abs(xMinDiff) / Math.abs(plotUnit.axisX.range)) / plotUnit.plotType.totalDataSeries * .9) << 0;

		if (this.dataPointMaxWidth && minBarWidth > maxBarWidth)
			minBarWidth = Math.min(this.dataPointWidth ? this.dataPointWidth : Infinity, maxBarWidth);

		if (!this.dataPointMaxWidth && this.dataPointMinWidth && maxBarWidth < minBarWidth)
			maxBarWidth = Math.max(this.dataPointWidth ? this.dataPointWidth : -Infinity, minBarWidth);

		if (barWidth < minBarWidth)
			barWidth = minBarWidth;

		if (barWidth > maxBarWidth)
			barWidth = maxBarWidth;


		ctx.save();
		if (isCanvasSupported)
			this._eventManager.ghostCtx.save();

		ctx.beginPath();
		ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
		ctx.clip();

		if (isCanvasSupported) {
			this._eventManager.ghostCtx.beginPath();
			this._eventManager.ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
			this._eventManager.ghostCtx.clip();
		}
		//ctx.beginPath();

		for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

			var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

			var dataSeries = this.data[dataSeriesIndex];
			var dataPoints = dataSeries.dataPoints;
			var isFirstDataPointInPlotArea = true;


			// Reducing pixelPerUnit by 1 just to overcome any problems due to rounding off of pixels.
			//dataSeries.maxWidthInX = barWidth / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);

			//var offsetX = barWidth * plotUnit.index << 0;


			if (dataPoints.length > 0) {
				var bevelEnabled = (barWidth > 5) && dataSeries.bevelEnabled ? true : false;

				for (i = 0; i < dataPoints.length; i++) {

					dataPoints[i].getTime ? dataPointX = dataPoints[i].x.getTime() : dataPointX = dataPoints[i].x;

					if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) {
						continue;
					}

					if (typeof (dataPoints[i].y) !== "number")
						continue;

					x = plotUnit.axisX.convertValueToPixel(dataPointX);
					y = plotUnit.axisY.convertValueToPixel(dataPoints[i].y);

					var x1 = plotUnit.axisX.reversed ? x + (plotUnit.plotType.totalDataSeries * barWidth / 2) - ((plotUnit.previousDataSeriesCount + j) * barWidth) << 0 : x - (plotUnit.plotType.totalDataSeries * barWidth / 2) + ((plotUnit.previousDataSeriesCount + j) * barWidth) << 0;
					var x2 = plotUnit.axisX.reversed ? x1 - barWidth << 0 : x1 + barWidth << 0;
					var y1;
					var y2;

					if (dataPoints[i].y >= 0) {
						y1 = y;

						y2 = yZeroToPixel;

						if (y1 > y2) {
							var temp = y1;
							y1 = y2;
							y2 = temp;
						}

					} else {
						y2 = y;

						y1 = yZeroToPixel;

						if (y1 > y2) {
							var temp = y1;
							y1 = y2;
							y2 = temp;
						}
					}

					color = dataPoints[i].color ? dataPoints[i].color : dataSeries._colorSet[i % dataSeries._colorSet.length];
					drawRect(ctx, x1, y1, x2, y2, color, 0, null, bevelEnabled && (dataPoints[i].y >= 0), (dataPoints[i].y < 0) && bevelEnabled, false, false, dataSeries.fillOpacity);

					//if (dataSeries.markerType && dataSeries.markerSize > 0) {
					//    RenderHelper.drawMarker(x1 + (x2 - x1) / 2, y, ctx, dataSeries.markerType, dataSeries.markerSize, color, dataSeries.markerBorderColor, dataSeries.markerBorderThickness ? dataSeries.markerBorderThickness : 1);
					//}

					var id = dataSeries.dataPointIds[i];
					this._eventManager.objectMap[id] = {
						id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x1, y1: y1, x2: x2, y2: y2
					};

					color = intToHexColorString(id);
					if (isCanvasSupported)
						drawRect(this._eventManager.ghostCtx, x1, y1, x2, y2, color, 0, null, false, false, false, false);

					if (dataPoints[i].indexLabel || dataSeries.indexLabel || dataPoints[i].indexLabelFormatter || dataSeries.indexLabelFormatter) {

						this._indexLabels.push({
							chartType: "column",
							dataPoint: dataPoints[i],
							dataSeries: dataSeries,
							point: {
								x: x1 + (x2 - x1) / 2, y: dataPoints[i].y < 0 === plotUnit.axisY.reversed ? y1 : y2
							},
							direction: dataPoints[i].y < 0 === plotUnit.axisY.reversed ? 1 : -1,
							bounds: {
								x1: x1, y1: Math.min(y1, y2), x2: x2, y2: Math.max(y1, y2)
							},
							color: color
						});

					}
				}
			}
		}

		if (isCanvasSupported) {
			targetCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height);

			ctx.globalCompositeOperation = "source-atop";
			if (plotUnit.axisX.maskCanvas)
				ctx.drawImage(plotUnit.axisX.maskCanvas, 0, 0, this.width, this.height);
			if (plotUnit.axisY.maskCanvas)
				ctx.drawImage(plotUnit.axisY.maskCanvas, 0, 0, this.width, this.height);
			if (this._breaksCanvasCtx)
				this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height);
			ctx.clearRect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);

			this._eventManager.ghostCtx.restore();
		}
		ctx.restore();

		//source and dest would be same when animation is not enabled		
		var animationBase = yZeroToPixel < plotUnit.axisY.bounds.y1 ? plotUnit.axisY.bounds.y1 : yZeroToPixel > plotUnit.axisY.bounds.y2 ? plotUnit.axisY.bounds.y2 : yZeroToPixel;

		var animationInfo = {
			source: targetCtx, dest: this.plotArea.ctx, animationCallback: AnimationHelper.yScaleAnimation, easingFunction: AnimationHelper.easing.easeOutQuart, animationBase: animationBase
		};
		return animationInfo;
	}

	Chart.prototype.renderStackedColumn = function (plotUnit) {
		var targetCtx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
		var ctx = isCanvasSupported ? this._preRenderCtx : targetCtx;
		var totalDataSeries = plotUnit.dataSeriesIndexes.length;

		if (totalDataSeries <= 0)
			return;

		var color = null;

		var plotArea = this.plotArea;

		var offsetPositiveY = [];
		var offsetNegativeY = [];
		var stackedY = [];
		var negativeStackedY = [];

		var i = 0, x, y;
		var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number everytime it is accessed.

		//var yZeroToPixel = (axisYProps.y2 - axisYProps.height / rangeY * Math.abs(0 - plotUnit.axisY.viewportMinimum) + .5) << 0;
		var yZeroToPixel = plotUnit.axisY.convertValueToPixel(plotUnit.axisY.logarithmic ? plotUnit.axisY.viewportMinimum : 0);

		var minBarWidth = this.dataPointMinWidth ? this.dataPointMinWidth : this.dataPointWidth ? this.dataPointWidth : 1;
		var maxBarWidth = this.dataPointMaxWidth ? this.dataPointMaxWidth : this.dataPointWidth ? this.dataPointWidth : this.width * .15 << 0;

		var xMinDiff = plotUnit.axisX.dataInfo.minDiff;

		if (!isFinite(xMinDiff))
			xMinDiff = Math.abs(plotUnit.axisX.range) * .3;

		var barWidth = this.dataPointWidth ? this.dataPointWidth : (plotArea.width * (plotUnit.axisX.logarithmic ? Math.log(xMinDiff) / Math.log(plotUnit.axisX.range) : Math.abs(xMinDiff) / Math.abs(plotUnit.axisX.range)) / plotUnit.plotType.plotUnits.length * .9) << 0;

		if (this.dataPointMaxWidth && minBarWidth > maxBarWidth)
			minBarWidth = Math.min(this.dataPointWidth ? this.dataPointWidth : Infinity, maxBarWidth);

		if (!this.dataPointMaxWidth && this.dataPointMinWidth && maxBarWidth < minBarWidth)
			maxBarWidth = Math.max(this.dataPointWidth ? this.dataPointWidth : -Infinity, minBarWidth);

		if (barWidth < minBarWidth)
			barWidth = minBarWidth;

		if (barWidth > maxBarWidth)
			barWidth = maxBarWidth;


		ctx.save();
		if (isCanvasSupported)
			this._eventManager.ghostCtx.save();

		ctx.beginPath();
		ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
		ctx.clip();

		if (isCanvasSupported) {
			this._eventManager.ghostCtx.beginPath();
			this._eventManager.ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
			this._eventManager.ghostCtx.clip();
		}

		for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

			var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];
			var dataSeries = this.data[dataSeriesIndex];
			var dataPoints = dataSeries.dataPoints;
			var isFirstDataPointInPlotArea = true;

			// Reducing pixelPerUnit by 1 just to overcome any problems due to rounding off of pixels.
			//dataSeries.maxWidthInX = barWidth / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);


			if (dataPoints.length > 0) {
				var bevelEnabled = (barWidth > 5) && dataSeries.bevelEnabled ? true : false;

				ctx.strokeStyle = "#4572A7 ";

				for (i = 0; i < dataPoints.length; i++) {

					dataPointX = dataPoints[i].x.getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;


					if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) {
						continue;
					}

					if (typeof (dataPoints[i].y) !== "number")
						continue;

					x = plotUnit.axisX.convertValueToPixel(dataPointX);

					var x1 = x - (plotUnit.plotType.plotUnits.length * barWidth / 2) + (plotUnit.index * barWidth) << 0;
					var x2 = x1 + barWidth << 0;
					var y1;
					var y2;

					if (plotUnit.axisY.logarithmic || plotUnit.axisY.scaleBreaks && plotUnit.axisY.scaleBreaks._appliedBreaks.length > 0 && dataPoints[i].y > 0) {
						stackedY[dataPointX] = dataPoints[i].y + (stackedY[dataPointX] ? stackedY[dataPointX] : 0);
						if (stackedY[dataPointX] > 0) {
							y1 = plotUnit.axisY.convertValueToPixel(stackedY[dataPointX]);
							y2 = typeof offsetPositiveY[dataPointX] !== "undefined" ? offsetPositiveY[dataPointX] : yZeroToPixel;

							offsetPositiveY[dataPointX] = y1;
						}

					}
					else if (plotUnit.axisY.scaleBreaks && plotUnit.axisY.scaleBreaks._appliedBreaks.length > 0 && dataPoints[i].y <= 0) {
						negativeStackedY[dataPointX] = dataPoints[i].y + (negativeStackedY[dataPointX] ? negativeStackedY[dataPointX] : 0);//
						y2 = plotUnit.axisY.convertValueToPixel(negativeStackedY[dataPointX]);
						y1 = typeof offsetNegativeY[dataPointX] !== "undefined" ? offsetNegativeY[dataPointX] : yZeroToPixel;
						offsetNegativeY[dataPointX] = y2;
					}
					else {

						y = plotUnit.axisY.convertValueToPixel(dataPoints[i].y);

						if (dataPoints[i].y >= 0) {
							var offset = typeof offsetPositiveY[dataPointX] !== "undefined" ? offsetPositiveY[dataPointX] : 0;

							y1 = y - offset;
							y2 = yZeroToPixel - offset;

							offsetPositiveY[dataPointX] = offset + (y2 - y1);

						} else {
							var offset = offsetNegativeY[dataPointX] ? offsetNegativeY[dataPointX] : 0;

							y2 = y + offset;
							y1 = yZeroToPixel + offset;

							offsetNegativeY[dataPointX] = offset + (y2 - y1);
						}

					}

					color = dataPoints[i].color ? dataPoints[i].color : dataSeries._colorSet[i % dataSeries._colorSet.length];

					drawRect(ctx, x1, y1, x2, y2, color, 0, null, bevelEnabled && (dataPoints[i].y >= 0), (dataPoints[i].y < 0) && bevelEnabled, false, false, dataSeries.fillOpacity);

					//if (dataSeries.markerType && dataSeries.markerSize > 0) {
					//    RenderHelper.drawMarker(x1 + (x2 - x1)/2, y1, ctx, dataSeries.markerType, dataSeries.markerSize, color, dataSeries.markerBorderColor, dataSeries.markerBorderThickness ? dataSeries.markerBorderThickness : 1);
					//}

					var id = dataSeries.dataPointIds[i];
					this._eventManager.objectMap[id] = {
						id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x1, y1: y1, x2: x2, y2: y2
					};
					color = intToHexColorString(id);

					if (isCanvasSupported)
						drawRect(this._eventManager.ghostCtx, x1, y1, x2, y2, color, 0, null, false, false, false, false);


					if (dataPoints[i].indexLabel || dataSeries.indexLabel || dataPoints[i].indexLabelFormatter || dataSeries.indexLabelFormatter) {

						this._indexLabels.push({
							chartType: "stackedColumn",
							dataPoint: dataPoints[i],
							dataSeries: dataSeries,
							point: {
								x: x, y: dataPoints[i].y >= 0 ? y1 : y2
							},
							direction: dataPoints[i].y < 0 === plotUnit.axisY.reversed ? 1 : -1,
							bounds: {
								x1: x1, y1: Math.min(y1, y2), x2: x2, y2: Math.max(y1, y2)
							},
							color: color
						});

					}
				}
			}
		}

		if (isCanvasSupported) {
			targetCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height);

			ctx.globalCompositeOperation = "source-atop";
			if (plotUnit.axisX.maskCanvas)
				ctx.drawImage(plotUnit.axisX.maskCanvas, 0, 0, this.width, this.height);
			if (plotUnit.axisY.maskCanvas)
				ctx.drawImage(plotUnit.axisY.maskCanvas, 0, 0, this.width, this.height);
			if (this._breaksCanvasCtx)
				this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height);
			ctx.clearRect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);

			this._eventManager.ghostCtx.restore();
		}
		ctx.restore();

		//source and dest would be same when animation is not enabled
		var animationBase = yZeroToPixel < plotUnit.axisY.bounds.y1 ? plotUnit.axisY.bounds.y1 : yZeroToPixel > plotUnit.axisY.bounds.y2 ? plotUnit.axisY.bounds.y2 : yZeroToPixel;

		var animationInfo = {
			source: targetCtx, dest: this.plotArea.ctx, animationCallback: AnimationHelper.yScaleAnimation, easingFunction: AnimationHelper.easing.easeOutQuart, animationBase: animationBase
		};
		return animationInfo;
	}

	Chart.prototype.renderStackedColumn100 = function (plotUnit) {
		var targetCtx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
		var ctx = isCanvasSupported ? this._preRenderCtx : targetCtx;

		var totalDataSeries = plotUnit.dataSeriesIndexes.length;

		if (totalDataSeries <= 0)
			return;

		var color = null;

		var plotArea = this.plotArea;

		var offsetPositiveY = [];
		var offsetNegativeY = [];
		var stackedY = [];
		var negativeStackedY = [];

		var i = 0, x, y;
		var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number everytime it is accessed.

		//var yZeroToPixel = (axisYProps.y2 - axisYProps.height / rangeY * Math.abs(0 - plotUnit.axisY.viewportMinimum) + .5) << 0;
		var yZeroToPixel = plotUnit.axisY.convertValueToPixel(plotUnit.axisY.logarithmic ? plotUnit.axisY.viewportMinimum : 0);

		var minBarWidth = this.dataPointMinWidth ? this.dataPointMinWidth : this.dataPointWidth ? this.dataPointWidth : 1;
		var maxBarWidth = this.dataPointMaxWidth ? this.dataPointMaxWidth : this.dataPointWidth ? this.dataPointWidth : this.width * .15 << 0;
		var xMinDiff = plotUnit.axisX.dataInfo.minDiff;

		if (!isFinite(xMinDiff))
			xMinDiff = Math.abs(plotUnit.axisX.range) * .3;

		var barWidth = this.dataPointWidth ? this.dataPointWidth : (plotArea.width * (plotUnit.axisX.logarithmic ? Math.log(xMinDiff) / Math.log(plotUnit.axisX.range) : Math.abs(xMinDiff) / Math.abs(plotUnit.axisX.range)) / plotUnit.plotType.plotUnits.length * .9) << 0;

		if (this.dataPointMaxWidth && minBarWidth > maxBarWidth)
			minBarWidth = Math.min(this.dataPointWidth ? this.dataPointWidth : Infinity, maxBarWidth);

		if (!this.dataPointMaxWidth && this.dataPointMinWidth && maxBarWidth < minBarWidth)
			maxBarWidth = Math.max(this.dataPointWidth ? this.dataPointWidth : -Infinity, minBarWidth);

		if (barWidth < minBarWidth)
			barWidth = minBarWidth;

		if (barWidth > maxBarWidth)
			barWidth = maxBarWidth;

		ctx.save();
		if (isCanvasSupported)
			this._eventManager.ghostCtx.save();

		ctx.beginPath();
		ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
		ctx.clip();

		if (isCanvasSupported) {
			this._eventManager.ghostCtx.beginPath();
			this._eventManager.ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
			this._eventManager.ghostCtx.clip();
		}

		for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

			var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

			var dataSeries = this.data[dataSeriesIndex];
			var dataPoints = dataSeries.dataPoints;
			var isFirstDataPointInPlotArea = true;


			//dataSeries.maxWidthInX = barWidth / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);


			if (dataPoints.length > 0) {
				var bevelEnabled = (barWidth > 5) && dataSeries.bevelEnabled ? true : false;

				//ctx.strokeStyle = "#4572A7 ";

				for (i = 0; i < dataPoints.length; i++) {

					dataPointX = dataPoints[i].x.getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;


					if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) {
						continue;
					}

					if (typeof (dataPoints[i].y) !== "number")
						continue;

					x = plotUnit.axisX.convertValueToPixel(dataPointX);

					var yPercent;
					if (plotUnit.dataPointYSums[dataPointX] !== 0)
						yPercent = dataPoints[i].y / plotUnit.dataPointYSums[dataPointX] * 100;
					else
						yPercent = 0;

					//y = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (yPercent - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;

					var x1 = x - (plotUnit.plotType.plotUnits.length * barWidth / 2) + (plotUnit.index * barWidth) << 0;
					var x2 = x1 + barWidth << 0;
					var y1;
					var y2;

					if (plotUnit.axisY.logarithmic || plotUnit.axisY.scaleBreaks && plotUnit.axisY.scaleBreaks._appliedBreaks.length > 0 && dataPoints[i].y > 0) {
						stackedY[dataPointX] = yPercent + (typeof stackedY[dataPointX] !== "undefined" ? stackedY[dataPointX] : 0);
						if (stackedY[dataPointX] <= 0)
							continue;

						y1 = plotUnit.axisY.convertValueToPixel(stackedY[dataPointX]);
						y2 = offsetPositiveY[dataPointX] ? offsetPositiveY[dataPointX] : yZeroToPixel;

						offsetPositiveY[dataPointX] = y1;
					} else if (plotUnit.axisY.scaleBreaks && plotUnit.axisY.scaleBreaks._appliedBreaks.length > 0 && dataPoints[i].y <= 0) {
						negativeStackedY[dataPointX] = yPercent + (typeof negativeStackedY[dataPointX] !== "undefined" ? negativeStackedY[dataPointX] : 0);

						y2 = plotUnit.axisY.convertValueToPixel(negativeStackedY[dataPointX]);
						y1 = offsetNegativeY[dataPointX] ? offsetNegativeY[dataPointX] : yZeroToPixel;

						offsetNegativeY[dataPointX] = y2;
					}
					else {
						y = plotUnit.axisY.convertValueToPixel(yPercent);
						if (dataPoints[i].y >= 0) {
							var offset = typeof offsetPositiveY[dataPointX] !== "undefined" ? offsetPositiveY[dataPointX] : 0;

							y1 = y - offset;
							y2 = yZeroToPixel - offset;

							if (plotUnit.dataSeriesIndexes.length - 1 === j && Math.abs(plotArea.y1 - y1) <= 1) {
								y1 = plotArea.y1;
							}

							offsetPositiveY[dataPointX] = offset + (y2 - y1);

						} else {
							var offset = typeof offsetNegativeY[dataPointX] !== "undefined" ? offsetNegativeY[dataPointX] : 0;

							y2 = y + offset;
							y1 = yZeroToPixel + offset;

							if (plotUnit.dataSeriesIndexes.length - 1 === j && Math.abs(plotArea.y2 - y2) <= 1) {
								y2 = plotArea.y2;
							}

							offsetNegativeY[dataPointX] = offset + (y2 - y1);
						}
					}


					color = dataPoints[i].color ? dataPoints[i].color : dataSeries._colorSet[i % dataSeries._colorSet.length];
					drawRect(ctx, x1, y1, x2, y2, color, 0, null, bevelEnabled && (dataPoints[i].y >= 0), (dataPoints[i].y < 0) && bevelEnabled, false, false, dataSeries.fillOpacity);

					var id = dataSeries.dataPointIds[i];
					this._eventManager.objectMap[id] = {
						id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x1, y1: y1, x2: x2, y2: y2
					};
					color = intToHexColorString(id);

					if (isCanvasSupported)
						drawRect(this._eventManager.ghostCtx, x1, y1, x2, y2, color, 0, null, false, false, false, false);


					if (dataPoints[i].indexLabel || dataSeries.indexLabel || dataPoints[i].indexLabelFormatter || dataSeries.indexLabelFormatter) {

						this._indexLabels.push({
							chartType: "stackedColumn100",
							dataPoint: dataPoints[i],
							dataSeries: dataSeries,
							point: {
								x: x, y: dataPoints[i].y >= 0 ? y1 : y2
							},
							direction: dataPoints[i].y < 0 === plotUnit.axisY.reversed ? 1 : -1,
							bounds: {
								x1: x1, y1: Math.min(y1, y2), x2: x2, y2: Math.max(y1, y2)
							},
							color: color
						});

					}
				}
			}
		}

		if (isCanvasSupported) {
			targetCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height);

			ctx.globalCompositeOperation = "source-atop";
			if (plotUnit.axisX.maskCanvas)
				ctx.drawImage(plotUnit.axisX.maskCanvas, 0, 0, this.width, this.height);
			if (plotUnit.axisY.maskCanvas)
				ctx.drawImage(plotUnit.axisY.maskCanvas, 0, 0, this.width, this.height);
			if (this._breaksCanvasCtx)
				this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height);
			ctx.clearRect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);

			this._eventManager.ghostCtx.restore();
		}
		ctx.restore();

		//source and dest would be same when animation is not enabled
		var animationBase = yZeroToPixel < plotUnit.axisY.bounds.y1 ? plotUnit.axisY.bounds.y1 : yZeroToPixel > plotUnit.axisY.bounds.y2 ? plotUnit.axisY.bounds.y2 : yZeroToPixel;

		var animationInfo = {
			source: targetCtx, dest: this.plotArea.ctx, animationCallback: AnimationHelper.yScaleAnimation, easingFunction: AnimationHelper.easing.easeOutQuart, animationBase: animationBase
		};
		return animationInfo;
	}

	Chart.prototype.renderBar = function (plotUnit) {
		var targetCtx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
		var ctx = isCanvasSupported ? this._preRenderCtx : targetCtx;
		var totalDataSeries = plotUnit.dataSeriesIndexes.length;

		if (totalDataSeries <= 0)
			return;

		var color = null;

		var plotArea = this.plotArea;

		var i = 0, x, y;
		var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number from dataTime everytime it is used.

		//In case of Bar Chart, yZeroToPixel is x co-ordinate!
		var yZeroToPixel = plotUnit.axisY.convertValueToPixel(plotUnit.axisY.logarithmic ? plotUnit.axisY.viewportMinimum : 0);

		var minBarWidth = this.dataPointMinWidth ? this.dataPointMinWidth : this.dataPointWidth ? this.dataPointWidth : 1;
		var maxBarWidth = this.dataPointMaxWidth ? this.dataPointMaxWidth : this.dataPointWidth ? this.dataPointWidth : Math.min((this.height * .15), this.plotArea.height / plotUnit.plotType.totalDataSeries * .9) << 0;
		var xMinDiff = plotUnit.axisX.dataInfo.minDiff;

		if (!isFinite(xMinDiff))
			xMinDiff = Math.abs(plotUnit.axisX.range) * .3;

		var barWidth = this.dataPointWidth ? this.dataPointWidth : (plotArea.height * (plotUnit.axisX.logarithmic ? Math.log(xMinDiff) / Math.log(plotUnit.axisX.range) : Math.abs(xMinDiff) / Math.abs(plotUnit.axisX.range)) / plotUnit.plotType.totalDataSeries * .9) << 0;

		if (this.dataPointMaxWidth && minBarWidth > maxBarWidth)
			minBarWidth = Math.min(this.dataPointWidth ? this.dataPointWidth : Infinity, maxBarWidth);

		if (!this.dataPointMaxWidth && this.dataPointMinWidth && maxBarWidth < minBarWidth)
			maxBarWidth = Math.max(this.dataPointWidth ? this.dataPointWidth : -Infinity, minBarWidth);

		if (barWidth < minBarWidth)
			barWidth = minBarWidth;

		if (barWidth > maxBarWidth)
			barWidth = maxBarWidth;

		ctx.save();

		if (isCanvasSupported)
			this._eventManager.ghostCtx.save();

		ctx.beginPath();
		ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
		ctx.clip();

		if (isCanvasSupported) {
			this._eventManager.ghostCtx.beginPath();
			this._eventManager.ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
			this._eventManager.ghostCtx.clip();
		}

		for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

			var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

			var dataSeries = this.data[dataSeriesIndex];
			var dataPoints = dataSeries.dataPoints;
			var isFirstDataPointInPlotArea = true;


			//dataSeries.maxWidthInX = barWidth / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);


			if (dataPoints.length > 0) {
				var bevelEnabled = (barWidth > 5) && dataSeries.bevelEnabled ? true : false;

				ctx.strokeStyle = "#4572A7 ";

				for (i = 0; i < dataPoints.length; i++) {

					dataPoints[i].getTime ? dataPointX = dataPoints[i].x.getTime() : dataPointX = dataPoints[i].x;

					if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) {
						continue;
					}

					if (typeof (dataPoints[i].y) !== "number")
						continue;

					//x and y are pixel co-ordinates of point and should not be confused with X and Y values
					y = plotUnit.axisX.convertValueToPixel(dataPointX);
					x = plotUnit.axisY.convertValueToPixel(dataPoints[i].y);


					var y1 = plotUnit.axisX.reversed ? (y + (plotUnit.plotType.totalDataSeries * barWidth / 2) - ((plotUnit.previousDataSeriesCount + j) * barWidth)) << 0 : (y - (plotUnit.plotType.totalDataSeries * barWidth / 2) + ((plotUnit.previousDataSeriesCount + j) * barWidth)) << 0;
					var y2 = plotUnit.axisX.reversed ? y1 - barWidth << 0 : y1 + barWidth << 0;
					var x1;
					var x2;

					if (dataPoints[i].y >= 0) {
						x1 = yZeroToPixel;
						x2 = x;
					} else {
						x1 = x;
						x2 = yZeroToPixel;
					}

					//drawRect(ctx, x1, y1, plotArea.x2, y2, "#EEEEEE", 0, null, false, false, false, false);
					//drawRect(ctx, x1, y1, plotArea.x2, y2, "#BDCED3", 0, null, false, false, false, false);

					color = dataPoints[i].color ? dataPoints[i].color : dataSeries._colorSet[i % dataSeries._colorSet.length];
					//color = "#1B4962";
					drawRect(ctx, x1, y1, x2, y2, color, 0, null, bevelEnabled, false, false, false, dataSeries.fillOpacity);


					var id = dataSeries.dataPointIds[i];
					this._eventManager.objectMap[id] = {
						id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x1, y1: y1, x2: x2, y2: y2
					};
					color = intToHexColorString(id);

					if (isCanvasSupported)
						drawRect(this._eventManager.ghostCtx, x1, y1, x2, y2, color, 0, null, false, false, false, false);

					if (dataPoints[i].indexLabel || dataSeries.indexLabel || dataPoints[i].indexLabelFormatter || dataSeries.indexLabelFormatter)
						this._indexLabels.push({
							chartType: "bar",
							dataPoint: dataPoints[i],
							dataSeries: dataSeries,
							point: {
								x: dataPoints[i].y >= 0 ? x2 : x1, y: y1 + (y2 - y1) / 2
							},
							direction: dataPoints[i].y < 0 === plotUnit.axisY.reversed ? 1 : -1,
							bounds: {
								x1: Math.min(x1, x2), y1: y1, x2: Math.max(x1, x2), y2: y2
							},
							color: color
						});
				}
			}
		}

		if (isCanvasSupported) {
			targetCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height);

			ctx.globalCompositeOperation = "source-atop";
			if (plotUnit.axisX.maskCanvas)
				ctx.drawImage(plotUnit.axisX.maskCanvas, 0, 0, this.width, this.height);
			if (plotUnit.axisY.maskCanvas)
				ctx.drawImage(plotUnit.axisY.maskCanvas, 0, 0, this.width, this.height);
			if (this._breaksCanvasCtx)
				this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height);
			ctx.clearRect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);

			this._eventManager.ghostCtx.restore();
		}
		ctx.restore();

		//source and dest would be same when animation is not enabled		
		var animationBase = yZeroToPixel < plotUnit.axisY.bounds.x1 ? plotUnit.axisY.bounds.x1 : yZeroToPixel > plotUnit.axisY.bounds.x2 ? plotUnit.axisY.bounds.x2 : yZeroToPixel;

		var animationInfo = {
			source: targetCtx, dest: this.plotArea.ctx, animationCallback: AnimationHelper.xScaleAnimation, easingFunction: AnimationHelper.easing.easeOutQuart, animationBase: animationBase
		};
		return animationInfo;
	}

	Chart.prototype.renderStackedBar = function (plotUnit) {
		var targetCtx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
		var ctx = isCanvasSupported ? this._preRenderCtx : targetCtx;
		var totalDataSeries = plotUnit.dataSeriesIndexes.length;

		if (totalDataSeries <= 0)
			return;

		var color = null;

		var plotArea = this.plotArea;

		var offsetPositiveY = [];
		var offsetNegativeY = [];
		var stackedY = [];
		var negativeStackedY = [];

		var i = 0, x, y;
		var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number everytime it is accessed.

		//var yZeroToPixel = (axisYProps.y2 - axisYProps.height / rangeY * Math.abs(0 - plotUnit.axisY.viewportMinimum) + .5) << 0;
		var yZeroToPixel = plotUnit.axisY.convertValueToPixel(plotUnit.axisY.logarithmic ? plotUnit.axisY.viewportMinimum : 0);

		var minBarWidth = this.dataPointMinWidth ? this.dataPointMinWidth : this.dataPointWidth ? this.dataPointWidth : 1;
		var maxBarWidth = this.dataPointMaxWidth ? this.dataPointMaxWidth : this.dataPointWidth ? this.dataPointWidth : this.height * .15 << 0;
		var xMinDiff = plotUnit.axisX.dataInfo.minDiff;

		if (!isFinite(xMinDiff))
			xMinDiff = Math.abs(plotUnit.axisX.range) * .3;

		var barWidth = this.dataPointWidth ? this.dataPointWidth : (plotArea.height * (plotUnit.axisX.logarithmic ? Math.log(xMinDiff) / Math.log(plotUnit.axisX.range) : Math.abs(xMinDiff) / Math.abs(plotUnit.axisX.range)) / plotUnit.plotType.plotUnits.length * .9) << 0;

		if (this.dataPointMaxWidth && minBarWidth > maxBarWidth)
			minBarWidth = Math.min(this.dataPointWidth ? this.dataPointWidth : Infinity, maxBarWidth);

		if (!this.dataPointMaxWidth && this.dataPointMinWidth && maxBarWidth < minBarWidth)
			maxBarWidth = Math.max(this.dataPointWidth ? this.dataPointWidth : -Infinity, minBarWidth);

		if (barWidth < minBarWidth)
			barWidth = minBarWidth;

		if (barWidth > maxBarWidth)
			barWidth = maxBarWidth;

		ctx.save();

		if (isCanvasSupported)
			this._eventManager.ghostCtx.save();

		ctx.beginPath();
		ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
		ctx.clip();

		if (isCanvasSupported) {
			this._eventManager.ghostCtx.beginPath();
			this._eventManager.ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
			this._eventManager.ghostCtx.clip();
		}

		for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

			var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

			var dataSeries = this.data[dataSeriesIndex];
			var dataPoints = dataSeries.dataPoints;
			var isFirstDataPointInPlotArea = true;

			//dataSeries.maxWidthInX = barWidth / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);

			if (dataPoints.length > 0) {
				var bevelEnabled = (barWidth > 5) && dataSeries.bevelEnabled ? true : false;

				ctx.strokeStyle = "#4572A7 ";

				for (i = 0; i < dataPoints.length; i++) {

					dataPointX = dataPoints[i].x.getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;


					if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) {
						continue;
					}

					if (typeof (dataPoints[i].y) !== "number")
						continue;

					y = plotUnit.axisX.convertValueToPixel(dataPointX);
					//x = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;

					//var x1 = x - (plotUnit.plotType.plotUnits.length * barWidth / 2) + (plotUnit.index * barWidth) << 0;

					var y1 = y - (plotUnit.plotType.plotUnits.length * barWidth / 2) + (plotUnit.index * barWidth) << 0;
					var y2 = y1 + barWidth << 0;
					var x1;
					var x2;

					if (plotUnit.axisY.logarithmic || plotUnit.axisY.scaleBreaks && plotUnit.axisY.scaleBreaks._appliedBreaks.length > 0 && dataPoints[i].y > 0) {
						stackedY[dataPointX] = dataPoints[i].y + (stackedY[dataPointX] ? stackedY[dataPointX] : 0);
						if (stackedY[dataPointX] > 0) {
							x1 = offsetPositiveY[dataPointX] ? offsetPositiveY[dataPointX] : yZeroToPixel;
							offsetPositiveY[dataPointX] = x2 = plotUnit.axisY.convertValueToPixel(stackedY[dataPointX]);
						}
					}
					else if (plotUnit.axisY.scaleBreaks && plotUnit.axisY.scaleBreaks._appliedBreaks.length > 0 && dataPoints[i].y <= 0) {
						negativeStackedY[dataPointX] = dataPoints[i].y + (negativeStackedY[dataPointX] ? negativeStackedY[dataPointX] : 0);
						x2 = offsetNegativeY[dataPointX] ? offsetNegativeY[dataPointX] : yZeroToPixel;
						offsetNegativeY[dataPointX] = x1 = plotUnit.axisY.convertValueToPixel(negativeStackedY[dataPointX]);
					}
					else {
						x = plotUnit.axisY.convertValueToPixel(dataPoints[i].y);
						if (dataPoints[i].y >= 0) {
							var offset = offsetPositiveY[dataPointX] ? offsetPositiveY[dataPointX] : 0;

							x1 = yZeroToPixel + offset;
							x2 = x + offset;

							offsetPositiveY[dataPointX] = offset + (x2 - x1);

						} else {
							var offset = offsetNegativeY[dataPointX] ? offsetNegativeY[dataPointX] : 0;

							x1 = x - offset;
							x2 = yZeroToPixel - offset;

							offsetNegativeY[dataPointX] = offset + (x2 - x1);
						}
					}


					color = dataPoints[i].color ? dataPoints[i].color : dataSeries._colorSet[i % dataSeries._colorSet.length];
					drawRect(ctx, x1, y1, x2, y2, color, 0, null, bevelEnabled, false, false, false, dataSeries.fillOpacity);

					var id = dataSeries.dataPointIds[i];
					this._eventManager.objectMap[id] = {
						id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x1, y1: y1, x2: x2, y2: y2
					};
					color = intToHexColorString(id);

					if (isCanvasSupported)
						drawRect(this._eventManager.ghostCtx, x1, y1, x2, y2, color, 0, null, false, false, false, false);

					if (dataPoints[i].indexLabel || dataSeries.indexLabel || dataPoints[i].indexLabelFormatter || dataSeries.indexLabelFormatter)
						this._indexLabels.push({
							chartType: "stackedBar",
							dataPoint: dataPoints[i],
							dataSeries: dataSeries,
							point: {
								x: dataPoints[i].y >= 0 ? x2 : x1, y: y
							},
							direction: dataPoints[i].y < 0 === plotUnit.axisY.reversed ? 1 : -1,
							bounds: {
								x1: Math.min(x1, x2), y1: y1, x2: Math.max(x1, x2), y2: y2
							},
							color: color
						});
				}
			}
		}

		if (isCanvasSupported) {
			targetCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height);

			ctx.globalCompositeOperation = "source-atop";
			if (plotUnit.axisX.maskCanvas)
				ctx.drawImage(plotUnit.axisX.maskCanvas, 0, 0, this.width, this.height);
			if (plotUnit.axisY.maskCanvas)
				ctx.drawImage(plotUnit.axisY.maskCanvas, 0, 0, this.width, this.height);
			if (this._breaksCanvasCtx)
				this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height);
			ctx.clearRect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);

			this._eventManager.ghostCtx.restore();
		}
		ctx.restore();

		//source and dest would be same when animation is not enabled
		var animationBase = yZeroToPixel < plotUnit.axisY.bounds.x1 ? plotUnit.axisY.bounds.x1 : yZeroToPixel > plotUnit.axisY.bounds.x2 ? plotUnit.axisY.bounds.x2 : yZeroToPixel;

		var animationInfo = {
			source: targetCtx, dest: this.plotArea.ctx, animationCallback: AnimationHelper.xScaleAnimation, easingFunction: AnimationHelper.easing.easeOutQuart, animationBase: animationBase
		};
		return animationInfo;
	}

	Chart.prototype.renderStackedBar100 = function (plotUnit) {
		var targetCtx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
		var ctx = isCanvasSupported ? this._preRenderCtx : targetCtx;
		var totalDataSeries = plotUnit.dataSeriesIndexes.length;

		if (totalDataSeries <= 0)
			return;

		var color = null;

		var plotArea = this.plotArea;

		var offsetPositiveY = [];
		var offsetNegativeY = [];
		var stackedY = [];
		var negativeStackedY = [];

		var i = 0, x, y;
		var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number everytime it is accessed.

		//var yZeroToPixel = (axisYProps.y2 - axisYProps.height / rangeY * Math.abs(0 - plotUnit.axisY.viewportMinimum) + .5) << 0;
		var yZeroToPixel = plotUnit.axisY.convertValueToPixel(plotUnit.axisY.logarithmic ? plotUnit.axisY.viewportMinimum : 0);

		var minBarWidth = this.dataPointMinWidth ? this.dataPointMinWidth : this.dataPointWidth ? this.dataPointWidth : 1;
		var maxBarWidth = this.dataPointMaxWidth ? this.dataPointMaxWidth : this.dataPointWidth ? this.dataPointWidth : this.height * .15 << 0;
		var xMinDiff = plotUnit.axisX.dataInfo.minDiff;

		if (!isFinite(xMinDiff))
			xMinDiff = Math.abs(plotUnit.axisX.range) * .3;

		var barWidth = this.dataPointWidth ? this.dataPointWidth : (plotArea.height * (plotUnit.axisX.logarithmic ? Math.log(xMinDiff) / Math.log(plotUnit.axisX.range) : Math.abs(xMinDiff) / Math.abs(plotUnit.axisX.range)) / plotUnit.plotType.plotUnits.length * .9) << 0;

		if (this.dataPointMaxWidth && minBarWidth > maxBarWidth)
			minBarWidth = Math.min(this.dataPointWidth ? this.dataPointWidth : Infinity, maxBarWidth);

		if (!this.dataPointMaxWidth && this.dataPointMinWidth && maxBarWidth < minBarWidth)
			maxBarWidth = Math.max(this.dataPointWidth ? this.dataPointWidth : -Infinity, minBarWidth);

		if (barWidth < minBarWidth)
			barWidth = minBarWidth;

		if (barWidth > maxBarWidth)
			barWidth = maxBarWidth;

		ctx.save();

		if (isCanvasSupported)
			this._eventManager.ghostCtx.save();

		ctx.beginPath();
		ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
		ctx.clip();

		if (isCanvasSupported) {
			this._eventManager.ghostCtx.beginPath();
			this._eventManager.ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
			this._eventManager.ghostCtx.clip();
		}

		for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

			var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

			var dataSeries = this.data[dataSeriesIndex];
			var dataPoints = dataSeries.dataPoints;
			var isFirstDataPointInPlotArea = true;

			//dataSeries.maxWidthInX = barWidth / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);

			if (dataPoints.length > 0) {
				var bevelEnabled = (barWidth > 5) && dataSeries.bevelEnabled ? true : false;

				ctx.strokeStyle = "#4572A7 ";

				for (i = 0; i < dataPoints.length; i++) {

					dataPointX = dataPoints[i].x.getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;


					if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) {
						continue;
					}

					if (typeof (dataPoints[i].y) !== "number")
						continue;

					y = plotUnit.axisX.convertValueToPixel(dataPointX);

					var yPercent;
					if (plotUnit.dataPointYSums[dataPointX] !== 0)
						yPercent = dataPoints[i].y / plotUnit.dataPointYSums[dataPointX] * 100;
					else
						yPercent = 0;

					//x = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (yPercent - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;

					var y1 = y - (plotUnit.plotType.plotUnits.length * barWidth / 2) + (plotUnit.index * barWidth) << 0;
					var y2 = y1 + barWidth << 0;
					var x1;
					var x2;

					if (plotUnit.axisY.logarithmic || plotUnit.axisY.scaleBreaks && plotUnit.axisY.scaleBreaks._appliedBreaks.length > 0 && dataPoints[i].y > 0) {
						stackedY[dataPointX] = yPercent + (stackedY[dataPointX] ? stackedY[dataPointX] : 0);
						if (stackedY[dataPointX] <= 0)
							continue;

						x1 = offsetPositiveY[dataPointX] ? offsetPositiveY[dataPointX] : yZeroToPixel;
						offsetPositiveY[dataPointX] = x2 = plotUnit.axisY.convertValueToPixel(stackedY[dataPointX]);

					}
					else if (plotUnit.axisY.scaleBreaks && plotUnit.axisY.scaleBreaks._appliedBreaks.length > 0 && dataPoints[i].y <= 0) {
						negativeStackedY[dataPointX] = yPercent + (negativeStackedY[dataPointX] ? negativeStackedY[dataPointX] : 0);

						x2 = offsetNegativeY[dataPointX] ? offsetNegativeY[dataPointX] : yZeroToPixel;
						offsetNegativeY[dataPointX] = x1 = plotUnit.axisY.convertValueToPixel(negativeStackedY[dataPointX]);
					}
					else {
						x = plotUnit.axisY.convertValueToPixel(yPercent);
						if (dataPoints[i].y >= 0) {
							var offset = offsetPositiveY[dataPointX] ? offsetPositiveY[dataPointX] : 0;

							x1 = yZeroToPixel + offset;
							x2 = x + offset;

							if (plotUnit.dataSeriesIndexes.length - 1 === j && Math.abs(plotArea.x2 - x2) <= 1) {
								x2 = plotArea.x2;
							}

							offsetPositiveY[dataPointX] = offset + (x2 - x1);

						} else {
							var offset = offsetNegativeY[dataPointX] ? offsetNegativeY[dataPointX] : 0;

							x1 = x - offset;
							x2 = yZeroToPixel - offset;

							if (plotUnit.dataSeriesIndexes.length - 1 === j && Math.abs(plotArea.x1 - x1) <= 1) {
								x1 = plotArea.x1;
							}

							offsetNegativeY[dataPointX] = offset + (x2 - x1);
						}
					}


					color = dataPoints[i].color ? dataPoints[i].color : dataSeries._colorSet[i % dataSeries._colorSet.length];
					drawRect(ctx, x1, y1, x2, y2, color, 0, null, bevelEnabled, false, false, false, dataSeries.fillOpacity);

					var id = dataSeries.dataPointIds[i];
					this._eventManager.objectMap[id] = {
						id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x1, y1: y1, x2: x2, y2: y2
					};
					color = intToHexColorString(id);

					if (isCanvasSupported)
						drawRect(this._eventManager.ghostCtx, x1, y1, x2, y2, color, 0, null, false, false, false, false);

					if (dataPoints[i].indexLabel || dataSeries.indexLabel || dataPoints[i].indexLabelFormatter || dataSeries.indexLabelFormatter)
						this._indexLabels.push({
							chartType: "stackedBar100",
							dataPoint: dataPoints[i],
							dataSeries: dataSeries,
							point: {
								x: dataPoints[i].y >= 0 ? x2 : x1, y: y
							},
							direction: dataPoints[i].y < 0 === plotUnit.axisY.reversed ? 1 : -1,
							bounds: {
								x1: Math.min(x1, x2), y1: y1, x2: Math.max(x1, x2), y2: y2
							},
							color: color
						});
				}
			}
		}

		if (isCanvasSupported) {
			targetCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height);

			ctx.globalCompositeOperation = "source-atop";
			if (plotUnit.axisX.maskCanvas)
				ctx.drawImage(plotUnit.axisX.maskCanvas, 0, 0, this.width, this.height);
			if (plotUnit.axisY.maskCanvas)
				ctx.drawImage(plotUnit.axisY.maskCanvas, 0, 0, this.width, this.height);
			if (this._breaksCanvasCtx)
				this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height);
			ctx.clearRect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);

			this._eventManager.ghostCtx.restore();
		}
		ctx.restore();

		//source and dest would be same when animation is not enabled
		var animationBase = yZeroToPixel < plotUnit.axisY.bounds.x1 ? plotUnit.axisY.bounds.x1 : yZeroToPixel > plotUnit.axisY.bounds.x2 ? plotUnit.axisY.bounds.x2 : yZeroToPixel;

		var animationInfo = {
			source: targetCtx, dest: this.plotArea.ctx, animationCallback: AnimationHelper.xScaleAnimation, easingFunction: AnimationHelper.easing.easeOutQuart, animationBase: animationBase
		};
		return animationInfo;
	}

	Chart.prototype.renderArea = function (plotUnit) {
		var targetCtx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
		var ctx = isCanvasSupported ? this._preRenderCtx : targetCtx;

		var totalDataSeries = plotUnit.dataSeriesIndexes.length;

		if (totalDataSeries <= 0)
			return;

		var ghostCtx = this._eventManager.ghostCtx;

		var axisXProps = plotUnit.axisX.lineCoordinates;
		var axisYProps = plotUnit.axisY.lineCoordinates;
		var markers = [];
		var markerPropsColor = null;

		var plotArea = this.plotArea;
		var previousNotNullDataPoint, currentDataPoint;
		ctx.save();

		if (isCanvasSupported)
			ghostCtx.save();

		ctx.beginPath();
		ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
		ctx.clip();

		//var defaultLineJoinType = ctx.lineJoin;
		//ctx.lineJoin = "round";

		if (isCanvasSupported) {
			ghostCtx.beginPath();
			ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
			ghostCtx.clip();
		}

		for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

			var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

			var dataSeries = this.data[dataSeriesIndex];

			var dataPoints = dataSeries.dataPoints;

			var seriesId = dataSeries.id;
			this._eventManager.objectMap[seriesId] = {
				objectType: "dataSeries", dataSeriesIndex: dataSeriesIndex
			};

			var hexColor = intToHexColorString(seriesId);
			ghostCtx.fillStyle = hexColor;
			//ghostCtx.lineWidth = dataSeries.lineThickness;
			//ghostCtx.lineWidth = 20;

			markers = [];

			var isFirstDataPointInPlotArea = true;
			var i = 0, x, y;
			var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number back and forth.

			var yZeroToPixel = plotUnit.axisY.convertValueToPixel(plotUnit.axisY.logarithmic ? plotUnit.axisY.viewportMinimum : 0);
			var baseY;

			var startPoint = null;

			if (dataPoints.length > 0) {
				//ctx.strokeStyle = "#4572A7 ";                
				var color = dataSeries._colorSet[i % dataSeries._colorSet.length];
				var lineColor = dataSeries.lineColor = dataSeries.options.lineColor || color;
				var currentStrokeStyle = lineColor;
				//ctx.strokeStyle = "red";
				ctx.fillStyle = color;
				ctx.strokeStyle = lineColor;
				ctx.lineWidth = dataSeries.lineThickness;
				var currentLineDashType = "solid";

				if (ctx.setLineDash) {
					var nullDataLineDashType = getLineDashArray(dataSeries.nullDataLineDashType, dataSeries.lineThickness);
					currentLineDashType = dataSeries.lineDashType;
					var lineDashType = getLineDashArray(currentLineDashType, dataSeries.lineThickness);
					ctx.setLineDash(lineDashType);
				}

				var prevDataNull = true;
				for (; i < dataPoints.length; i++) {

					dataPointX = dataPoints[i].x.getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;

					if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax && !(dataSeries.connectNullData && prevDataNull)) {
						continue;
					}

					if (typeof (dataPoints[i].y) !== "number") {
						if (!(dataSeries.connectNullData || prevDataNull || isFirstDataPointInPlotArea))
							closeArea();

						prevDataNull = true;
						continue;
					}

					x = plotUnit.axisX.convertValueToPixel(dataPointX);
					y = plotUnit.axisY.convertValueToPixel(dataPoints[i].y);

					if (isFirstDataPointInPlotArea || prevDataNull) {

						if (!isFirstDataPointInPlotArea && dataSeries.connectNullData) {
							//Applying nullLineDshType If lineDashType at dataPoints not mentoioned in prevuous dataPoints
							if (ctx.setLineDash && (dataSeries.options.nullDataLineDashType || (currentLineDashType === dataSeries.lineDashType && dataSeries.lineDashType !== dataSeries.nullDataLineDashType))) {
								currentDataPoint = { x: x, y: y };
								x = previousNotNullDataPoint.x;
								y = previousNotNullDataPoint.y;
								//ctx.stroke();
								closeArea();
								//ctx.beginPath();
								ctx.moveTo(previousNotNullDataPoint.x, previousNotNullDataPoint.y);
								x = currentDataPoint.x;
								y = currentDataPoint.y;
								startPoint = previousNotNullDataPoint;
								currentLineDashType = dataSeries.nullDataLineDashType;
								ctx.setLineDash(nullDataLineDashType);
							}

							ctx.lineTo(x, y);
							if (isCanvasSupported)
								ghostCtx.lineTo(x, y);

						} else { //If connectNullData = false
							ctx.beginPath();
							ctx.moveTo(x, y);
							if (isCanvasSupported) {
								ghostCtx.beginPath();
								ghostCtx.moveTo(x, y);
							}
							startPoint = {
								x: x, y: y
							};
						}

						isFirstDataPointInPlotArea = false;
						prevDataNull = false;
					}
					else {

						ctx.lineTo(x, y);

						if (isCanvasSupported)
							ghostCtx.lineTo(x, y);

						if (i % 250 == 0) {
							closeArea();
						}
					}

					previousNotNullDataPoint = { x: x, y: y };

					if (i < dataPoints.length - 1 && (currentStrokeStyle !== (dataPoints[i].lineColor || lineColor) || currentLineDashType !== (dataPoints[i].lineDashType || dataSeries.lineDashType))) { //Applieng new ctx on DataPoint

						closeArea();
						//ctx.stroke();
						//ctx.beginPath();
						//ctx.moveTo(x, y);

						currentStrokeStyle = dataPoints[i].lineColor || lineColor;
						ctx.strokeStyle = currentStrokeStyle;
						if (ctx.setLineDash)
							if (dataPoints[i].lineDashType) {
								currentLineDashType = dataPoints[i].lineDashType;
								ctx.setLineDash(getLineDashArray(currentLineDashType, dataSeries.lineThickness));
							}
							else {
								currentLineDashType = dataSeries.lineDashType;
								ctx.setLineDash(lineDashType);
							}
					}

					var id = dataSeries.dataPointIds[i];
					this._eventManager.objectMap[id] = {
						id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x, y1: y
					};

					//Render Marker
					if (dataPoints[i].markerSize !== 0) {
						if (dataPoints[i].markerSize > 0 || dataSeries.markerSize > 0) {
							var markerProps = dataSeries.getMarkerProperties(i, x, y, ctx);
							markerPropsColor = markerProps.color;
							markers.push(markerProps);

							//if (!dataSeries.maxWidthInX || markerProps.size > dataSeries.maxWidthInX) {
							//	dataSeries.maxWidthInX = markerProps.size / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);
							//}

							var markerColor = intToHexColorString(id);

							if (isCanvasSupported) {
								markers.push({
									x: x, y: y, ctx: ghostCtx,
									type: markerProps.type,
									size: markerProps.size,
									color: markerColor,
									borderColor: markerColor,
									borderThickness: markerProps.borderThickness
								});
							}
						}
					}

					if (dataPoints[i].indexLabel || dataSeries.indexLabel || dataPoints[i].indexLabelFormatter || dataSeries.indexLabelFormatter) {

						this._indexLabels.push({
							chartType: "area",
							dataPoint: dataPoints[i],
							dataSeries: dataSeries,
							point: {
								x: x, y: y
							},
							direction: dataPoints[i].y < 0 === plotUnit.axisY.reversed ? 1 : -1,
							color: color
						});

					}
				}

				closeArea();

				//startPoint = { x: x, y: y };
				RenderHelper.drawMarkers(markers);
				//dataSeries.markerColor = markerPropsColor;
			}
		}

		//ctx.lineJoin = defaultLineJoinType;

		if (isCanvasSupported) {
			targetCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height);

			ctx.globalCompositeOperation = "source-atop";
			if (plotUnit.axisX.maskCanvas)
				ctx.drawImage(plotUnit.axisX.maskCanvas, 0, 0, this.width, this.height);
			if (plotUnit.axisY.maskCanvas)
				ctx.drawImage(plotUnit.axisY.maskCanvas, 0, 0, this.width, this.height);
			if (this._breaksCanvasCtx)
				this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height);
			ctx.clearRect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
			this._eventManager.ghostCtx.restore();
		}
		ctx.restore();

		function closeArea() {

			if (!startPoint)
				return;

			if (dataSeries.lineThickness > 0)
				ctx.stroke();

			if (plotUnit.axisY.logarithmic || plotUnit.axisY.viewportMinimum <= 0 && plotUnit.axisY.viewportMaximum >= 0) {
				baseY = yZeroToPixel;
			}
			else if (plotUnit.axisY.viewportMaximum < 0)
				baseY = axisYProps.y1;
			else if (plotUnit.axisY.viewportMinimum > 0)
				baseY = axisXProps.y2;

			ctx.lineTo(x, baseY);
			ctx.lineTo(startPoint.x, baseY);
			ctx.closePath();

			ctx.globalAlpha = dataSeries.fillOpacity;
			ctx.fill();
			ctx.globalAlpha = 1;

			if (isCanvasSupported) {
				ghostCtx.lineTo(x, baseY);
				ghostCtx.lineTo(startPoint.x, baseY);
				ghostCtx.closePath();
				ghostCtx.fill();
			}

			ctx.beginPath();
			ctx.moveTo(x, y);
			ghostCtx.beginPath();
			ghostCtx.moveTo(x, y);

			startPoint = {
				x: x, y: y
			};
		}

		//source and dest would be same when animation is not enabled
		var animationInfo = {
			source: targetCtx, dest: this.plotArea.ctx, animationCallback: AnimationHelper.xClipAnimation, easingFunction: AnimationHelper.easing.linear, animationBase: 0
		};
		return animationInfo;
	}

	Chart.prototype.renderSplineArea = function (plotUnit) {
		var targetCtx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
		var ctx = isCanvasSupported ? this._preRenderCtx : targetCtx;

		var totalDataSeries = plotUnit.dataSeriesIndexes.length;

		if (totalDataSeries <= 0)
			return;

		var ghostCtx = this._eventManager.ghostCtx;

		var axisXProps = plotUnit.axisX.lineCoordinates;
		var axisYProps = plotUnit.axisY.lineCoordinates;
		var markers = [];
		var markerPropsColor = null;

		var plotArea = this.plotArea;
		ctx.save();

		if (isCanvasSupported)
			ghostCtx.save();

		ctx.beginPath();
		ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
		ctx.clip();

		if (isCanvasSupported) {
			ghostCtx.beginPath();
			ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
			ghostCtx.clip();
		}

		for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

			var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

			var dataSeries = this.data[dataSeriesIndex];

			var dataPoints = dataSeries.dataPoints;

			var seriesId = dataSeries.id;
			this._eventManager.objectMap[seriesId] = {
				objectType: "dataSeries", dataSeriesIndex: dataSeriesIndex
			};

			var hexColor = intToHexColorString(seriesId);
			ghostCtx.fillStyle = hexColor;
			//ghostCtx.lineWidth = dataSeries.lineThickness;
			//ghostCtx.lineWidth = 20;

			markers = [];

			var isFirstDataPointInPlotArea = true;
			var i = 0, x, y;
			var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number back and forth.

			var yZeroToPixel = plotUnit.axisY.convertValueToPixel(plotUnit.axisY.logarithmic ? plotUnit.axisY.viewportMinimum : 0);
			var baseY;

			var startPoint = null;

			var pixels = [];

			if (dataPoints.length > 0) {
				//ctx.strokeStyle = "#4572A7 ";                
				var color = dataSeries._colorSet[i % dataSeries._colorSet.length];
				var lineColor = dataSeries.lineColor = dataSeries.options.lineColor || color;
				var currentStrokeStyle = lineColor;
				ctx.fillStyle = color;
				ctx.strokeStyle = lineColor;
				ctx.lineWidth = dataSeries.lineThickness;
				var currentLineDashType = "solid";

				if (ctx.setLineDash) {
					var nullDataLineDashType = getLineDashArray(dataSeries.nullDataLineDashType, dataSeries.lineThickness);
					currentLineDashType = dataSeries.lineDashType;
					var lineDashType = getLineDashArray(currentLineDashType, dataSeries.lineThickness);
					ctx.setLineDash(lineDashType);
				}

				var prevDataNull = false;
				for (; i < dataPoints.length; i++) {

					dataPointX = dataPoints[i].x.getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;

					if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax && !(dataSeries.connectNullData && prevDataNull)) {
						continue;
					}

					if (typeof (dataPoints[i].y) !== "number") {
						if (i > 0 && !prevDataNull) {
							if (dataSeries.connectNullData) {
								if (ctx.setLineDash && pixels.length > 0 && (dataSeries.options.nullDataLineDashType || !dataPoints[i - 1].lineDashType)) {
									pixels[pixels.length - 1].newLineDashArray = nullDataLineDashType;
									currentLineDashType = dataSeries.nullDataLineDashType;
								}
							}
							else {
								renderBezierArea();
								pixels = [];
							}
						}

						prevDataNull = true;
						continue;
					}

					x = plotUnit.axisX.convertValueToPixel(dataPointX);
					y = plotUnit.axisY.convertValueToPixel(dataPoints[i].y);


					var id = dataSeries.dataPointIds[i];
					this._eventManager.objectMap[id] = {
						id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x, y1: y
					};

					pixels[pixels.length] = {
						x: x, y: y
					};

					if (i < dataPoints.length - 1 && (currentStrokeStyle !== (dataPoints[i].lineColor || lineColor) || currentLineDashType !== (dataPoints[i].lineDashType || dataSeries.lineDashType))) { //Applieng new ctx on DataPoint

						currentStrokeStyle = dataPoints[i].lineColor || lineColor;
						pixels[pixels.length - 1].newStrokeStyle = currentStrokeStyle;
						if (ctx.setLineDash)
							if (dataPoints[i].lineDashType) {
								currentLineDashType = dataPoints[i].lineDashType;
								pixels[pixels.length - 1].newLineDashArray = getLineDashArray(currentLineDashType, dataSeries.lineThickness);
							}
							else {
								currentLineDashType = dataSeries.lineDashType;
								pixels[pixels.length - 1].newLineDashArray = lineDashType;
							}
					}

					//Render Marker
					if (dataPoints[i].markerSize !== 0) {
						if (dataPoints[i].markerSize > 0 || dataSeries.markerSize > 0) {
							var markerProps = dataSeries.getMarkerProperties(i, x, y, ctx);
							markerPropsColor = markerProps.color;
							markers.push(markerProps);

							//if (!dataSeries.maxWidthInX || markerProps.size > dataSeries.maxWidthInX) {
							//	dataSeries.maxWidthInX = markerProps.size / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);
							//}

							var markerColor = intToHexColorString(id);

							if (isCanvasSupported) {
								markers.push({
									x: x, y: y, ctx: ghostCtx,
									type: markerProps.type,
									size: markerProps.size,
									color: markerColor,
									borderColor: markerColor,
									borderThickness: markerProps.borderThickness
								});
							}
						}
					}


					//Render Index Labels
					if (dataPoints[i].indexLabel || dataSeries.indexLabel || dataPoints[i].indexLabelFormatter || dataSeries.indexLabelFormatter) {

						this._indexLabels.push({
							chartType: "splineArea",
							dataPoint: dataPoints[i],
							dataSeries: dataSeries,
							point: {
								x: x, y: y
							},
							direction: dataPoints[i].y < 0 === plotUnit.axisY.reversed ? 1 : -1,
							color: color
						});

					}

					isFirstDataPointInPlotArea = false;
					prevDataNull = false;
				}

				renderBezierArea();

				RenderHelper.drawMarkers(markers);
				//dataSeries.markerColor = markerPropsColor;
			}
		}

		if (isCanvasSupported) {
			targetCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height);

			ctx.globalCompositeOperation = "source-atop";
			if (plotUnit.axisX.maskCanvas)
				ctx.drawImage(plotUnit.axisX.maskCanvas, 0, 0, this.width, this.height);
			if (plotUnit.axisY.maskCanvas)
				ctx.drawImage(plotUnit.axisY.maskCanvas, 0, 0, this.width, this.height);
			if (this._breaksCanvasCtx)
				this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height);
			ctx.clearRect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);

			this._eventManager.ghostCtx.restore();
		}
		ctx.restore();

		function renderBezierArea() {
			var bp = getBezierPoints(pixels, 2);

			if (bp.length > 0) {

				if (dataSeries.lineThickness > 0) {
					ctx.beginPath();
					ctx.moveTo(bp[0].x, bp[0].y);
					if (bp[0].newStrokeStyle)
						ctx.strokeStyle = bp[0].newStrokeStyle;
					if (bp[0].newLineDashArray)
						ctx.setLineDash(bp[0].newLineDashArray);

					for (var i = 0; i < bp.length - 3; i += 3) {

						ctx.bezierCurveTo(bp[i + 1].x, bp[i + 1].y, bp[i + 2].x, bp[i + 2].y, bp[i + 3].x, bp[i + 3].y);

						if (isCanvasSupported)
							ghostCtx.bezierCurveTo(bp[i + 1].x, bp[i + 1].y, bp[i + 2].x, bp[i + 2].y, bp[i + 3].x, bp[i + 3].y);

						if (bp[i + 3].newStrokeStyle || bp[i + 3].newLineDashArray) {
							ctx.stroke();
							ctx.beginPath();
							ctx.moveTo(bp[i + 3].x, bp[i + 3].y);
							if (bp[i + 3].newStrokeStyle)
								ctx.strokeStyle = bp[i + 3].newStrokeStyle;
							if (bp[i + 3].newLineDashArray)
								ctx.setLineDash(bp[i + 3].newLineDashArray);
						}

					}

					ctx.stroke();
				}

				ctx.beginPath();
				ctx.moveTo(bp[0].x, bp[0].y);
				if (isCanvasSupported) {
					ghostCtx.beginPath();
					ghostCtx.moveTo(bp[0].x, bp[0].y);
				}

				for (var i = 0; i < bp.length - 3; i += 3) {

					ctx.bezierCurveTo(bp[i + 1].x, bp[i + 1].y, bp[i + 2].x, bp[i + 2].y, bp[i + 3].x, bp[i + 3].y);

					if (isCanvasSupported)
						ghostCtx.bezierCurveTo(bp[i + 1].x, bp[i + 1].y, bp[i + 2].x, bp[i + 2].y, bp[i + 3].x, bp[i + 3].y);

				}

				if (plotUnit.axisY.logarithmic || plotUnit.axisY.viewportMinimum <= 0 && plotUnit.axisY.viewportMaximum >= 0) {
					baseY = yZeroToPixel;
				}
				else if (plotUnit.axisY.viewportMaximum < 0)
					baseY = axisYProps.y1;
				else if (plotUnit.axisY.viewportMinimum > 0)
					baseY = axisXProps.y2;

				startPoint = {
					x: bp[0].x, y: bp[0].y
				};

				ctx.lineTo(bp[bp.length - 1].x, baseY);
				ctx.lineTo(startPoint.x, baseY);
				ctx.closePath();

				ctx.globalAlpha = dataSeries.fillOpacity;
				ctx.fill();
				ctx.globalAlpha = 1;

				if (isCanvasSupported) {
					ghostCtx.lineTo(bp[bp.length - 1].x, baseY);
					ghostCtx.lineTo(startPoint.x, baseY);
					ghostCtx.closePath();
					ghostCtx.fill();
				}
			}
		}

		//source and dest would be same when animation is not enabled
		var animationInfo = {
			source: targetCtx, dest: this.plotArea.ctx, animationCallback: AnimationHelper.xClipAnimation, easingFunction: AnimationHelper.easing.linear, animationBase: 0
		};
		return animationInfo;
	}

	Chart.prototype.renderStepArea = function (plotUnit) {
		var targetCtx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
		var ctx = isCanvasSupported ? this._preRenderCtx : targetCtx;

		var totalDataSeries = plotUnit.dataSeriesIndexes.length;

		if (totalDataSeries <= 0)
			return;

		var ghostCtx = this._eventManager.ghostCtx;

		var axisXProps = plotUnit.axisX.lineCoordinates;
		var axisYProps = plotUnit.axisY.lineCoordinates;
		var markers = [];
		var markerPropsColor = null;

		var plotArea = this.plotArea;
		var previousNotNullDataPoint, currentDataPoint;
		ctx.save();

		if (isCanvasSupported)
			ghostCtx.save();

		ctx.beginPath();
		ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
		ctx.clip();

		if (isCanvasSupported) {
			ghostCtx.beginPath();
			ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
			ghostCtx.clip();
		}

		for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

			var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

			var dataSeries = this.data[dataSeriesIndex];

			var dataPoints = dataSeries.dataPoints;

			var seriesId = dataSeries.id;
			this._eventManager.objectMap[seriesId] = {
				objectType: "dataSeries", dataSeriesIndex: dataSeriesIndex
			};

			var hexColor = intToHexColorString(seriesId);
			ghostCtx.fillStyle = hexColor;
			//ghostCtx.lineWidth = dataSeries.lineThickness;
			//ghostCtx.lineWidth = 20;

			markers = [];

			var isFirstDataPointInPlotArea = true;
			var i = 0, x, y;
			var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number back and forth.

			var yZeroToPixel = plotUnit.axisY.convertValueToPixel(plotUnit.axisY.logarithmic ? plotUnit.axisY.viewportMinimum : 0);
			var baseY;

			var startPoint = null;

			var prevDataNull = false;
			if (dataPoints.length > 0) {
				//ctx.strokeStyle = "#4572A7 ";                
				var color = dataSeries._colorSet[i % dataSeries._colorSet.length];
				var lineColor = dataSeries.lineColor = dataSeries.options.lineColor || color;
				var currentStrokeStyle = lineColor;
				//ctx.strokeStyle = "red";
				ctx.fillStyle = color;
				ctx.strokeStyle = lineColor;
				ctx.lineWidth = dataSeries.lineThickness;
				var currentLineDashType = "solid";

				if (ctx.setLineDash) {
					var nullDataLineDashType = getLineDashArray(dataSeries.nullDataLineDashType, dataSeries.lineThickness);
					currentLineDashType = dataSeries.lineDashType;
					var lineDashType = getLineDashArray(currentLineDashType, dataSeries.lineThickness);
					ctx.setLineDash(lineDashType);
				}

				for (; i < dataPoints.length; i++) {

					dataPointX = dataPoints[i].x.getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;

					if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax && !(dataSeries.connectNullData && prevDataNull)) {
						continue;
					}

					var prevY = y;

					if (typeof (dataPoints[i].y) !== "number") {
						if (!(dataSeries.connectNullData || prevDataNull || isFirstDataPointInPlotArea))
							closeArea();

						prevDataNull = true;
						continue;
					}

					x = plotUnit.axisX.convertValueToPixel(dataPointX);
					y = plotUnit.axisY.convertValueToPixel(dataPoints[i].y);



					if (isFirstDataPointInPlotArea || prevDataNull) {
						if (!isFirstDataPointInPlotArea && dataSeries.connectNullData) {
							//Applying nullLineDshType If lineDashType at dataPoints not mentoioned in prevuous dataPoints
							if (ctx.setLineDash && (dataSeries.options.nullDataLineDashType || (currentLineDashType === dataSeries.lineDashType && dataSeries.lineDashType !== dataSeries.nullDataLineDashType))) {
								currentDataPoint = { x: x, y: y };
								x = previousNotNullDataPoint.x;
								y = previousNotNullDataPoint.y;
								closeArea();
								ctx.moveTo(previousNotNullDataPoint.x, previousNotNullDataPoint.y);
								x = currentDataPoint.x;
								y = currentDataPoint.y;
								startPoint = previousNotNullDataPoint;
								currentLineDashType = dataSeries.nullDataLineDashType;
								ctx.setLineDash(nullDataLineDashType);
							}
							ctx.lineTo(x, prevY);
							ctx.lineTo(x, y);
							if (isCanvasSupported) {
								ghostCtx.lineTo(x, prevY);
								ghostCtx.lineTo(x, y);
							}

						} else { //If connectNullData = false
							ctx.beginPath();
							ctx.moveTo(x, y);
							if (isCanvasSupported) {
								ghostCtx.beginPath();
								ghostCtx.moveTo(x, y);
							}
							startPoint = {
								x: x, y: y
							};
						}

						isFirstDataPointInPlotArea = false;
						prevDataNull = false;
					}
					else {

						ctx.lineTo(x, prevY);
						if (isCanvasSupported)
							ghostCtx.lineTo(x, prevY);

						ctx.lineTo(x, y);

						if (isCanvasSupported)
							ghostCtx.lineTo(x, y);

						if (i % 250 == 0) {
							closeArea();
						}
					}

					previousNotNullDataPoint = { x: x, y: y };

					if (i < dataPoints.length - 1 && (currentStrokeStyle !== (dataPoints[i].lineColor || lineColor) || currentLineDashType !== (dataPoints[i].lineDashType || dataSeries.lineDashType))) { //Applieng new ctx on DataPoint

						closeArea();

						currentStrokeStyle = dataPoints[i].lineColor || lineColor;
						ctx.strokeStyle = currentStrokeStyle;
						if (ctx.setLineDash)
							if (dataPoints[i].lineDashType) {
								currentLineDashType = dataPoints[i].lineDashType;
								ctx.setLineDash(getLineDashArray(currentLineDashType, dataSeries.lineThickness));
							}
							else {
								currentLineDashType = dataSeries.lineDashType;
								ctx.setLineDash(lineDashType);
							}
					}

					var id = dataSeries.dataPointIds[i];
					this._eventManager.objectMap[id] = {
						id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x, y1: y
					};

					//Render Marker
					if (dataPoints[i].markerSize !== 0) {
						if (dataPoints[i].markerSize > 0 || dataSeries.markerSize > 0) {
							var markerProps = dataSeries.getMarkerProperties(i, x, y, ctx);
							markerPropsColor = markerProps.color;
							markers.push(markerProps);

							//if (!dataSeries.maxWidthInX || markerProps.size > dataSeries.maxWidthInX) {
							//	dataSeries.maxWidthInX = markerProps.size / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);
							//}

							var markerColor = intToHexColorString(id);

							if (isCanvasSupported) {
								markers.push({
									x: x, y: y, ctx: ghostCtx,
									type: markerProps.type,
									size: markerProps.size,
									color: markerColor,
									borderColor: markerColor,
									borderThickness: markerProps.borderThickness
								});
							}
						}
					}

					if (dataPoints[i].indexLabel || dataSeries.indexLabel || dataPoints[i].indexLabelFormatter || dataSeries.indexLabelFormatter) {

						this._indexLabels.push({
							chartType: "stepArea",
							dataPoint: dataPoints[i],
							dataSeries: dataSeries,
							point: {
								x: x, y: y
							},
							direction: dataPoints[i].y < 0 === plotUnit.axisY.reversed ? 1 : -1,
							color: color
						});

					}
				}

				closeArea();

				RenderHelper.drawMarkers(markers);
				//dataSeries.markerColor = markerPropsColor;
			}
		}

		if (isCanvasSupported) {
			targetCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height);

			ctx.globalCompositeOperation = "source-atop";
			if (plotUnit.axisX.maskCanvas)
				ctx.drawImage(plotUnit.axisX.maskCanvas, 0, 0, this.width, this.height);
			if (plotUnit.axisY.maskCanvas)
				ctx.drawImage(plotUnit.axisY.maskCanvas, 0, 0, this.width, this.height);
			if (this._breaksCanvasCtx)
				this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height);
			ctx.clearRect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
			this._eventManager.ghostCtx.restore();
		}
		ctx.restore();

		function closeArea() {

			if (!startPoint)
				return;

			if (dataSeries.lineThickness > 0)
				ctx.stroke();

			if (plotUnit.axisY.logarithmic || plotUnit.axisY.viewportMinimum <= 0 && plotUnit.axisY.viewportMaximum >= 0) {
				baseY = yZeroToPixel;
			}
			else if (plotUnit.axisY.viewportMaximum < 0)
				baseY = axisYProps.y1;
			else if (plotUnit.axisY.viewportMinimum > 0)
				baseY = axisXProps.y2;

			ctx.lineTo(x, baseY);
			ctx.lineTo(startPoint.x, baseY);
			ctx.closePath();

			ctx.globalAlpha = dataSeries.fillOpacity;
			ctx.fill();
			ctx.globalAlpha = 1;

			if (isCanvasSupported) {
				ghostCtx.lineTo(x, baseY);
				ghostCtx.lineTo(startPoint.x, baseY);
				ghostCtx.closePath();
				ghostCtx.fill();
			}

			ctx.beginPath();
			ctx.moveTo(x, y);
			ghostCtx.beginPath();
			ghostCtx.moveTo(x, y);

			startPoint = {
				x: x, y: y
			};
		}

		//source and dest would be same when animation is not enabled
		var animationInfo = {
			source: targetCtx, dest: this.plotArea.ctx, animationCallback: AnimationHelper.xClipAnimation, easingFunction: AnimationHelper.easing.linear, animationBase: 0
		};
		return animationInfo;
	}

	Chart.prototype.renderStackedArea = function (plotUnit) {
		var targetCtx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
		var ctx = isCanvasSupported ? this._preRenderCtx : targetCtx;

		var totalDataSeries = plotUnit.dataSeriesIndexes.length;

		if (totalDataSeries <= 0)
			return;

		var color = null;
		var markers = [];
		var markerPropsColor = null;

		var plotArea = this.plotArea;

		var offsetY = [];
		var currentBaseValues = [];

		var allXValues = [];
		//var offsetNegativeY = [];
		var stackedY = [];

		var i = 0, x, y;
		var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number everytime it is accessed.

		//var yZeroToPixel = (axisYProps.y2 - axisYProps.height / rangeY * Math.abs(0 - plotUnit.axisY.viewportMinimum) + .5) << 0;
		var yZeroToPixel = plotUnit.axisY.convertValueToPixel(plotUnit.axisY.logarithmic ? plotUnit.axisY.viewportMinimum : 0);

		var xMinDiff = plotUnit.axisX.dataInfo.minDiff;

		var ghostCtx = this._eventManager.ghostCtx;
		var previousNotNullDataPoint, temp1, temp2;

		if (isCanvasSupported)
			ghostCtx.beginPath();

		ctx.save();

		if (isCanvasSupported)
			ghostCtx.save();

		ctx.beginPath();
		ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
		ctx.clip();
		//var defaultLineJoinType = ctx.lineJoin;
		//ctx.lineJoin = "round";

		if (isCanvasSupported) {
			ghostCtx.beginPath();
			ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
			ghostCtx.clip();
		}

		var xValuePresent = [];
		for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

			var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];
			var dataSeries = this.data[dataSeriesIndex];
			var dataPoints = dataSeries.dataPoints;
			var xValue;

			dataSeries.dataPointIndexes = [];

			for (i = 0; i < dataPoints.length; i++) {
				xValue = dataPoints[i].x.getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;
				dataSeries.dataPointIndexes[xValue] = i;

				if (!xValuePresent[xValue]) {
					allXValues.push(xValue);
					xValuePresent[xValue] = true;
				}
			}

			allXValues.sort(compareNumbers);
		}

		for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

			var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

			var dataSeries = this.data[dataSeriesIndex];
			var dataPoints = dataSeries.dataPoints;
			var isFirstDataPointInPlotArea = true;

			currentBaseValues = [];


			var seriesId = dataSeries.id;
			this._eventManager.objectMap[seriesId] = {
				objectType: "dataSeries", dataSeriesIndex: dataSeriesIndex
			};
			var hexColor = intToHexColorString(seriesId);
			ghostCtx.fillStyle = hexColor;



			if (allXValues.length > 0) {

				color = dataSeries._colorSet[0];
				//ctx.strokeStyle = "red";
				var lineColor = dataSeries.lineColor = dataSeries.options.lineColor || color;
				var currentStrokeStyle = lineColor;
				ctx.fillStyle = color;
				ctx.strokeStyle = lineColor;
				ctx.lineWidth = dataSeries.lineThickness;
				var currentLineDashType = "solid";

				if (ctx.setLineDash) {
					var nullDataLineDashType = getLineDashArray(dataSeries.nullDataLineDashType, dataSeries.lineThickness);
					currentLineDashType = dataSeries.lineDashType;
					var lineDashType = getLineDashArray(currentLineDashType, dataSeries.lineThickness);
					ctx.setLineDash(lineDashType);
				}

				var prevDataNull = true;
				for (i = 0; i < allXValues.length; i++) {

					dataPointX = allXValues[i];
					var dataPoint = null;

					if (dataSeries.dataPointIndexes[dataPointX] >= 0)
						dataPoint = dataPoints[dataSeries.dataPointIndexes[dataPointX]];
					else
						dataPoint = {
							x: dataPointX, y: null
						};

					if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax && !(dataSeries.connectNullData && prevDataNull)) {
						continue;
					}

					if (typeof (dataPoint.y) !== "number") {
						if (!(dataSeries.connectNullData || prevDataNull || isFirstDataPointInPlotArea))
							closeArea();

						prevDataNull = true;
						continue;
					}

					var x = plotUnit.axisX.convertValueToPixel(dataPointX);
					//var y = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoint.y - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;
					var offset = offsetY[dataPointX] ? offsetY[dataPointX] : 0;


					if (plotUnit.axisY.logarithmic || plotUnit.axisY.scaleBreaks && plotUnit.axisY.scaleBreaks._appliedBreaks.length > 0) {

						stackedY[dataPointX] = dataPoint.y + (stackedY[dataPointX] ? stackedY[dataPointX] : 0);
						if (stackedY[dataPointX] <= 0 && plotUnit.axisY.logarithmic)
							continue;
						var y = plotUnit.axisY.convertValueToPixel(stackedY[dataPointX]);

					} else {
						var y = plotUnit.axisY.convertValueToPixel(dataPoint.y);
						y = y - offset;
					}

					currentBaseValues.push({ x: x, y: yZeroToPixel - offset });
					offsetY[dataPointX] = yZeroToPixel - y;

					if (isFirstDataPointInPlotArea || prevDataNull) {

						if (!isFirstDataPointInPlotArea && dataSeries.connectNullData) {
							//Applying nullLineDshType If lineDashType at dataPoints not mentoioned in prevuous dataPoints
							if (ctx.setLineDash && (dataSeries.options.nullDataLineDashType || (currentLineDashType === dataSeries.lineDashType && dataSeries.lineDashType !== dataSeries.nullDataLineDashType))) {
								temp1 = currentBaseValues.pop();
								temp2 = currentBaseValues[currentBaseValues.length - 1];
								closeArea();
								ctx.moveTo(previousNotNullDataPoint.x, previousNotNullDataPoint.y);
								currentBaseValues.push(temp2);
								currentBaseValues.push(temp1);
								currentLineDashType = dataSeries.nullDataLineDashType;
								ctx.setLineDash(nullDataLineDashType);
							}

							ctx.lineTo(x, y);
							if (isCanvasSupported)
								ghostCtx.lineTo(x, y);

						} else {
							ctx.beginPath();
							ctx.moveTo(x, y);

							if (isCanvasSupported) {
								ghostCtx.beginPath();
								ghostCtx.moveTo(x, y);
							}
						}
						//currentBaseValues.push({ x: x, y: yZeroToPixel - offset });
						isFirstDataPointInPlotArea = false;
						prevDataNull = false;
					}
					else {

						ctx.lineTo(x, y);

						if (isCanvasSupported)
							ghostCtx.lineTo(x, y);

						if (i % 250 == 0) {

							closeArea();
							ctx.moveTo(x, y);

							if (isCanvasSupported) {
								ghostCtx.moveTo(x, y);
							}

							currentBaseValues.push({ x: x, y: yZeroToPixel - offset });
						}

					}

					previousNotNullDataPoint = { x: x, y: y };

					if (i < dataPoints.length - 1 && (currentStrokeStyle !== (dataPoints[i].lineColor || lineColor) || currentLineDashType !== (dataPoints[i].lineDashType || dataSeries.lineDashType))) { //Applieng new ctx on DataPoint

						closeArea();
						//ctx.stroke();
						ctx.beginPath();
						ctx.moveTo(x, y);
						currentBaseValues.push({ x: x, y: yZeroToPixel - offset });

						currentStrokeStyle = dataPoints[i].lineColor || lineColor;
						ctx.strokeStyle = currentStrokeStyle;
						if (ctx.setLineDash)
							if (dataPoints[i].lineDashType) {
								currentLineDashType = dataPoints[i].lineDashType;
								ctx.setLineDash(getLineDashArray(currentLineDashType, dataSeries.lineThickness));
							}
							else {
								currentLineDashType = dataSeries.lineDashType;
								ctx.setLineDash(lineDashType);
							}
					}

					if (dataSeries.dataPointIndexes[dataPointX] >= 0) {
						var id = dataSeries.dataPointIds[dataSeries.dataPointIndexes[dataPointX]];
						this._eventManager.objectMap[id] = {
							id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: dataSeries.dataPointIndexes[dataPointX], x1: x, y1: y
						};
					}

					//Render Marker
					if (dataSeries.dataPointIndexes[dataPointX] >= 0 && dataPoint.markerSize !== 0) {
						if (dataPoint.markerSize > 0 || dataSeries.markerSize > 0) {

							var markerProps = dataSeries.getMarkerProperties(dataSeries.dataPointIndexes[dataPointX], x, y, ctx);
							markerPropsColor = markerProps.color;
							markers.push(markerProps);

							//if (!dataSeries.maxWidthInX || markerProps.size > dataSeries.maxWidthInX) {
							//	dataSeries.maxWidthInX = markerProps.size / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);
							//}

							markerColor = intToHexColorString(id);

							if (isCanvasSupported) {
								markers.push({
									x: x, y: y, ctx: ghostCtx,
									type: markerProps.type,
									size: markerProps.size,
									color: markerColor,
									borderColor: markerColor,
									borderThickness: markerProps.borderThickness
								});
							}
						}
					}

					if (dataPoint.indexLabel || dataSeries.indexLabel || dataPoint.indexLabelFormatter || dataSeries.indexLabelFormatter) {

						this._indexLabels.push({
							chartType: "stackedArea",
							dataPoint: dataPoint,
							dataSeries: dataSeries,
							point: {
								x: x, y: y
							},
							direction: dataPoints[i].y < 0 === plotUnit.axisY.reversed ? 1 : -1,
							color: color
						});

					}
				}

				closeArea();
				ctx.moveTo(x, y);

				if (isCanvasSupported) {
					ghostCtx.moveTo(x, y);
				}
			}

			delete (dataSeries.dataPointIndexes);
			//dataSeries.markerColor = markerPropsColor;
		}

		RenderHelper.drawMarkers(markers);
		//ctx.lineJoin = defaultLineJoinType;

		if (isCanvasSupported) {
			targetCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height);

			ctx.globalCompositeOperation = "source-atop";
			if (plotUnit.axisX.maskCanvas)
				ctx.drawImage(plotUnit.axisX.maskCanvas, 0, 0, this.width, this.height);
			if (plotUnit.axisY.maskCanvas)
				ctx.drawImage(plotUnit.axisY.maskCanvas, 0, 0, this.width, this.height);
			if (this._breaksCanvasCtx)
				this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height);
			ctx.clearRect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);

			ghostCtx.restore();
		}
		ctx.restore();

		//source and dest would be same when animation is not enabled
		var animationInfo = {
			source: targetCtx, dest: this.plotArea.ctx, animationCallback: AnimationHelper.xClipAnimation, easingFunction: AnimationHelper.easing.linear, animationBase: 0
		};
		return animationInfo;

		function closeArea() {

			if (currentBaseValues.length < 1)
				return;

			if (dataSeries.lineThickness > 0)
				ctx.stroke();

			while (currentBaseValues.length > 0) {
				var point = currentBaseValues.pop();
				ctx.lineTo(point.x, point.y);

				if (isCanvasSupported)
					ghostCtx.lineTo(point.x, point.y);

			}

			ctx.closePath();

			ctx.globalAlpha = dataSeries.fillOpacity;
			ctx.fill();
			ctx.globalAlpha = 1;

			ctx.beginPath();

			if (isCanvasSupported) {
				ghostCtx.closePath();
				ghostCtx.fill();

				ghostCtx.beginPath();
			}
			currentBaseValues = [];
		}
	}

	Chart.prototype.renderStackedArea100 = function (plotUnit) {
		var targetCtx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
		var ctx = isCanvasSupported ? this._preRenderCtx : targetCtx;

		var totalDataSeries = plotUnit.dataSeriesIndexes.length;

		if (totalDataSeries <= 0)
			return;

		var color = null;

		var plotArea = this.plotArea;
		var markers = [];
		var markerPropsColor = null;

		var offsetY = [];
		var currentBaseValues = [];
		var allXValues = [];
		//var offsetNegativeY = [];
		var stackedY = [];

		var i = 0, x, y;
		var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number everytime it is accessed.
		var previousNotNullDataPoint, temp1, temp2;


		//var yZeroToPixel = (axisYProps.y2 - axisYProps.height / rangeY * Math.abs(0 - plotUnit.axisY.viewportMinimum) + .5) << 0;
		var yZeroToPixel = plotUnit.axisY.convertValueToPixel(plotUnit.axisY.logarithmic ? plotUnit.axisY.viewportMinimum : 0);


		var ghostCtx = this._eventManager.ghostCtx;

		ctx.save();

		if (isCanvasSupported)
			ghostCtx.save();


		ctx.beginPath();
		ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
		ctx.clip();
		//var defaultLineJoinType = ctx.lineJoin;
		//ctx.lineJoin = "round";

		if (isCanvasSupported) {
			ghostCtx.beginPath();
			ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
			ghostCtx.clip();
		}

		var xValuePresent = [];
		for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

			var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];
			var dataSeries = this.data[dataSeriesIndex];
			var dataPoints = dataSeries.dataPoints;
			var xValue;

			dataSeries.dataPointIndexes = [];

			for (i = 0; i < dataPoints.length; i++) {
				xValue = dataPoints[i].x.getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;
				dataSeries.dataPointIndexes[xValue] = i;

				if (!xValuePresent[xValue]) {
					allXValues.push(xValue);
					xValuePresent[xValue] = true;
				}
			}

			allXValues.sort(compareNumbers);
		}

		for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

			var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

			var dataSeries = this.data[dataSeriesIndex];
			var dataPoints = dataSeries.dataPoints;
			var isFirstDataPointInPlotArea = true;


			var seriesId = dataSeries.id;
			this._eventManager.objectMap[seriesId] = {
				objectType: "dataSeries", dataSeriesIndex: dataSeriesIndex
			};
			var hexColor = intToHexColorString(seriesId);
			ghostCtx.fillStyle = hexColor;


			currentBaseValues = [];

			if (allXValues.length > 0) {

				color = dataSeries._colorSet[i % dataSeries._colorSet.length];
				//ctx.strokeStyle = "red";
				var lineColor = dataSeries.lineColor = dataSeries.options.lineColor || color;
				var currentStrokeStyle = lineColor;
				ctx.fillStyle = color;
				ctx.strokeStyle = lineColor;
				ctx.lineWidth = dataSeries.lineThickness;
				var currentLineDashType = "solid";

				if (ctx.setLineDash) {
					var nullDataLineDashType = getLineDashArray(dataSeries.nullDataLineDashType, dataSeries.lineThickness);
					currentLineDashType = dataSeries.lineDashType;
					var lineDashType = getLineDashArray(currentLineDashType, dataSeries.lineThickness);
					ctx.setLineDash(lineDashType);
				}


				//ctx.strokeStyle = "#4572A7 ";
				var prevDataNull = true;
				for (i = 0; i < allXValues.length; i++) {

					dataPointX = allXValues[i];
					var dataPoint = null;

					if (dataSeries.dataPointIndexes[dataPointX] >= 0)
						dataPoint = dataPoints[dataSeries.dataPointIndexes[dataPointX]];
					else
						dataPoint = {
							x: dataPointX, y: null
						};

					if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax && !(dataSeries.connectNullData && prevDataNull)) {
						continue;
					}

					if (typeof (dataPoint.y) !== "number") {
						if (!(dataSeries.connectNullData || prevDataNull || isFirstDataPointInPlotArea))
							closeArea();

						prevDataNull = true;
						continue;
					}

					var yPercent;
					if (plotUnit.dataPointYSums[dataPointX] !== 0)
						yPercent = dataPoint.y / plotUnit.dataPointYSums[dataPointX] * 100;
					else
						yPercent = 0;

					var x = plotUnit.axisX.convertValueToPixel(dataPointX);

					var offset = offsetY[dataPointX] ? offsetY[dataPointX] : 0;

					if (plotUnit.axisY.logarithmic || plotUnit.axisY.scaleBreaks && plotUnit.axisY.scaleBreaks._appliedBreaks.length > 0) {

						stackedY[dataPointX] = yPercent + (stackedY[dataPointX] ? stackedY[dataPointX] : 0);
						if (stackedY[dataPointX] <= 0 && plotUnit.axisY.logarithmic)
							continue;
						var y = plotUnit.axisY.convertValueToPixel(stackedY[dataPointX]);

					} else {
						var y = plotUnit.axisY.convertValueToPixel(yPercent);
						y = y - offset;
					}
					currentBaseValues.push({ x: x, y: yZeroToPixel - offset });
					offsetY[dataPointX] = yZeroToPixel - y;

					if (isFirstDataPointInPlotArea || prevDataNull) {

						if (!isFirstDataPointInPlotArea && dataSeries.connectNullData) {
							//Applying nullLineDshType If lineDashType at dataPoints not mentoioned in prevuous dataPoints
							if (ctx.setLineDash && (dataSeries.options.nullDataLineDashType || (currentLineDashType === dataSeries.lineDashType && dataSeries.lineDashType !== dataSeries.nullDataLineDashType))) {
								temp1 = currentBaseValues.pop();
								temp2 = currentBaseValues[currentBaseValues.length - 1];
								closeArea();
								ctx.moveTo(previousNotNullDataPoint.x, previousNotNullDataPoint.y);
								currentBaseValues.push(temp2);
								currentBaseValues.push(temp1);
								currentLineDashType = dataSeries.nullDataLineDashType;
								ctx.setLineDash(nullDataLineDashType);
							}

							ctx.lineTo(x, y);
							if (isCanvasSupported)
								ghostCtx.lineTo(x, y);

						} else {
							ctx.beginPath();
							ctx.moveTo(x, y);

							if (isCanvasSupported) {
								ghostCtx.beginPath();
								ghostCtx.moveTo(x, y);
							}
						}
						isFirstDataPointInPlotArea = false;
						prevDataNull = false;
					}
					else {

						ctx.lineTo(x, y);

						if (isCanvasSupported)
							ghostCtx.lineTo(x, y);

						if (i % 250 == 0) {

							closeArea();
							ctx.moveTo(x, y);

							if (isCanvasSupported) {
								ghostCtx.moveTo(x, y);
							}

							currentBaseValues.push({ x: x, y: yZeroToPixel - offset });
						}
					}

					previousNotNullDataPoint = { x: x, y: y };

					if (i < dataPoints.length - 1 && (currentStrokeStyle !== (dataPoints[i].lineColor || lineColor) || currentLineDashType !== (dataPoints[i].lineDashType || dataSeries.lineDashType))) { //Applieng new ctx on DataPoint

						closeArea();
						//ctx.stroke();
						ctx.beginPath();
						ctx.moveTo(x, y);
						currentBaseValues.push({ x: x, y: yZeroToPixel - offset });

						currentStrokeStyle = dataPoints[i].lineColor || lineColor;
						ctx.strokeStyle = currentStrokeStyle;
						if (ctx.setLineDash)
							if (dataPoints[i].lineDashType) {
								currentLineDashType = dataPoints[i].lineDashType;
								ctx.setLineDash(getLineDashArray(currentLineDashType, dataSeries.lineThickness));
							}
							else {
								currentLineDashType = dataSeries.lineDashType;
								ctx.setLineDash(lineDashType);
							}
					}


					if (dataSeries.dataPointIndexes[dataPointX] >= 0) {
						var id = dataSeries.dataPointIds[dataSeries.dataPointIndexes[dataPointX]];
						this._eventManager.objectMap[id] = {
							id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: dataSeries.dataPointIndexes[dataPointX], x1: x, y1: y
						};
					}

					//Render Marker
					if (dataSeries.dataPointIndexes[dataPointX] >= 0 && dataPoint.markerSize !== 0) {
						if (dataPoint.markerSize > 0 || dataSeries.markerSize > 0) {
							var markerProps = dataSeries.getMarkerProperties(i, x, y, ctx);
							markerPropsColor = markerProps.color;
							markers.push(markerProps);

							//if (!dataSeries.maxWidthInX || markerProps.size > dataSeries.maxWidthInX) {
							//	dataSeries.maxWidthInX = markerProps.size / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);
							//}

							markerColor = intToHexColorString(id);

							if (isCanvasSupported) {
								markers.push({
									x: x, y: y, ctx: ghostCtx,
									type: markerProps.type,
									size: markerProps.size,
									color: markerColor,
									borderColor: markerColor,
									borderThickness: markerProps.borderThickness
								});
							}
						}
					}

					if (dataPoint.indexLabel || dataSeries.indexLabel || dataPoint.indexLabelFormatter || dataSeries.indexLabelFormatter) {

						this._indexLabels.push({
							chartType: "stackedArea100",
							dataPoint: dataPoint,
							dataSeries: dataSeries,
							point: {
								x: x, y: y
							},
							direction: dataPoints[i].y < 0 === plotUnit.axisY.reversed ? 1 : -1,
							color: color
						});

					}
				}

				closeArea();
				ctx.moveTo(x, y);
				if (isCanvasSupported) {
					ghostCtx.moveTo(x, y);
				}
			}

			delete (dataSeries.dataPointIndexes);
			//dataSeries.markerColor = markerPropsColor;
		}

		RenderHelper.drawMarkers(markers);

		//ctx.lineJoin = defaultLineJoinType;
		if (isCanvasSupported) {
			targetCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height);

			ctx.globalCompositeOperation = "source-atop";
			if (plotUnit.axisX.maskCanvas)
				ctx.drawImage(plotUnit.axisX.maskCanvas, 0, 0, this.width, this.height);
			if (plotUnit.axisY.maskCanvas)
				ctx.drawImage(plotUnit.axisY.maskCanvas, 0, 0, this.width, this.height);
			if (this._breaksCanvasCtx)
				this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height);
			ctx.clearRect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);

			ghostCtx.restore();
		}
		ctx.restore();

		//source and dest would be same when animation is not enabled
		var animationInfo = {
			source: targetCtx, dest: this.plotArea.ctx, animationCallback: AnimationHelper.xClipAnimation, easingFunction: AnimationHelper.easing.linear, animationBase: 0
		};
		return animationInfo;

		function closeArea() {
			if (dataSeries.lineThickness > 0)
				ctx.stroke();

			while (currentBaseValues.length > 0) {
				var point = currentBaseValues.pop();
				ctx.lineTo(point.x, point.y);

				if (isCanvasSupported)
					ghostCtx.lineTo(point.x, point.y);
			}

			ctx.closePath();

			ctx.globalAlpha = dataSeries.fillOpacity;
			ctx.fill();
			ctx.globalAlpha = 1;

			ctx.beginPath();

			if (isCanvasSupported) {
				ghostCtx.closePath();
				ghostCtx.fill();
				ghostCtx.beginPath();
			}

			currentBaseValues = [];
		}
	}

	Chart.prototype.renderBubble = function (plotUnit) {

		var targetCtx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
		var ctx = isCanvasSupported ? this._preRenderCtx : targetCtx;

		var totalDataSeries = plotUnit.dataSeriesIndexes.length;

		if (totalDataSeries <= 0)
			return;

		var color = null;

		var plotArea = this.plotArea;

		var i = 0, x, y;
		var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number from dataTime everytime it is used.


		ctx.save();

		if (isCanvasSupported)
			this._eventManager.ghostCtx.save();

		ctx.beginPath();
		ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
		ctx.clip();

		if (isCanvasSupported) {
			this._eventManager.ghostCtx.beginPath();
			this._eventManager.ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
			this._eventManager.ghostCtx.clip();
		}

		var maxZ = -Infinity;
		var minZ = Infinity;

		for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

			var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];
			var dataSeries = this.data[dataSeriesIndex];
			var dataPoints = dataSeries.dataPoints;
			var z = 0;

			for (var i = 0; i < dataPoints.length; i++) {

				dataPointX = dataPoints[i].getTime ? dataPointX = dataPoints[i].x.getTime() : dataPointX = dataPoints[i].x;

				if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) {
					continue;
				}

				if (typeof (dataPoints[i].z) !== "undefined") {

					z = dataPoints[i].z;

					if (z > maxZ)
						maxZ = z;

					if (z < minZ)
						minZ = z;
				}
			}
		}

		var minArea = Math.PI * 5 * 5;
		var maxArea = Math.max(Math.pow(Math.min(plotArea.height, plotArea.width) * .25 / 2, 2) * Math.PI, minArea);

		for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

			var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

			var dataSeries = this.data[dataSeriesIndex];
			var dataPoints = dataSeries.dataPoints;
			var isFirstDataPointInPlotArea = true;


			if (dataPoints.length > 0) {

				ctx.strokeStyle = "#4572A7 ";



				for (var i = 0; i < dataPoints.length; i++) {

					dataPointX = dataPoints[i].getTime ? dataPointX = dataPoints[i].x.getTime() : dataPointX = dataPoints[i].x;

					if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) {
						continue;
					}

					if (typeof (dataPoints[i].y) !== "number")
						continue;

					x = plotUnit.axisX.convertValueToPixel(dataPointX);
					y = plotUnit.axisY.convertValueToPixel(dataPoints[i].y);

					var z = dataPoints[i].z;

					var area = (maxZ === minZ) ? maxArea / 2 : minArea + (maxArea - minArea) / (maxZ - minZ) * (z - minZ);
					var radius = Math.max(Math.sqrt(area / Math.PI) << 0, 1);

					var markerSize = radius * 2;
					var markerProps = dataSeries.getMarkerProperties(i, ctx);
					markerProps.size = markerSize;


					ctx.globalAlpha = dataSeries.fillOpacity;
					RenderHelper.drawMarker(x, y, ctx, markerProps.type, markerProps.size, markerProps.color, markerProps.borderColor, markerProps.borderThickness);
					ctx.globalAlpha = 1;

					var id = dataSeries.dataPointIds[i];
					this._eventManager.objectMap[id] = {
						id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x, y1: y, size: markerSize
					};
					var markerColor = intToHexColorString(id);
					//RenderHelper.drawMarker(x, y, this._eventManager.ghostCtx, markerType, markerSize, markerColor, markerColor, dataSeries.markerBorderThickness);
					if (isCanvasSupported)
						RenderHelper.drawMarker(x, y, this._eventManager.ghostCtx, markerProps.type, markerProps.size, markerColor, markerColor, markerProps.borderThickness);


					if (dataPoints[i].indexLabel || dataSeries.indexLabel || dataPoints[i].indexLabelFormatter || dataSeries.indexLabelFormatter) {

						this._indexLabels.push({
							chartType: "bubble",
							dataPoint: dataPoints[i],
							dataSeries: dataSeries,
							point: {
								x: x, y: y
							},
							direction: 1,
							bounds: {
								x1: x - markerProps.size / 2, y1: y - markerProps.size / 2, x2: x + markerProps.size / 2, y2: y + markerProps.size / 2
							},
							color: color
						});
					}
				}
			}
		}

		if (isCanvasSupported) {
			targetCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height);

			ctx.globalCompositeOperation = "source-atop";
			if (plotUnit.axisX.maskCanvas)
				ctx.drawImage(plotUnit.axisX.maskCanvas, 0, 0, this.width, this.height);
			if (plotUnit.axisY.maskCanvas)
				ctx.drawImage(plotUnit.axisY.maskCanvas, 0, 0, this.width, this.height);
			if (this._breaksCanvasCtx)
				this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height);
			ctx.clearRect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);

			this._eventManager.ghostCtx.restore();
		}
		ctx.restore();

		//source and dest would be same when animation is not enabled
		var animationInfo = {
			source: targetCtx, dest: this.plotArea.ctx, animationCallback: AnimationHelper.fadeInAnimation, easingFunction: AnimationHelper.easing.easeInQuad, animationBase: 0
		};
		return animationInfo;
	}

	Chart.prototype.renderScatter = function (plotUnit) {
		var targetCtx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
		var ctx = isCanvasSupported ? this._preRenderCtx : targetCtx;
		var totalDataSeries = plotUnit.dataSeriesIndexes.length;

		if (totalDataSeries <= 0)
			return;

		var color = null;

		var plotArea = this.plotArea;

		var i = 0, x, y;
		var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number from dataTime everytime it is used.


		ctx.save();
		if (isCanvasSupported)
			this._eventManager.ghostCtx.save();

		ctx.beginPath();
		ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
		ctx.clip();

		if (isCanvasSupported) {
			this._eventManager.ghostCtx.beginPath();
			this._eventManager.ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
			this._eventManager.ghostCtx.clip();
		}

		for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

			var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

			var dataSeries = this.data[dataSeriesIndex];
			var dataPoints = dataSeries.dataPoints;
			var isFirstDataPointInPlotArea = true;


			if (dataPoints.length > 0) {

				ctx.strokeStyle = "#4572A7 ";

				var maxArea = Math.pow(Math.min(plotArea.height, plotArea.width) * .3 / 2, 2) * Math.PI;

				var prevDataPointX = 0;
				var prevDataPointY = 0;

				for (var i = 0; i < dataPoints.length; i++) {

					dataPointX = dataPoints[i].getTime ? dataPointX = dataPoints[i].x.getTime() : dataPointX = dataPoints[i].x;

					if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) {
						continue;
					}

					if (typeof (dataPoints[i].y) !== "number")
						continue;

					x = plotUnit.axisX.convertValueToPixel(dataPointX);
					y = plotUnit.axisY.convertValueToPixel(dataPoints[i].y);

					var markerProps = dataSeries.getMarkerProperties(i, x, y, ctx);

					ctx.globalAlpha = dataSeries.fillOpacity;
					RenderHelper.drawMarker(markerProps.x, markerProps.y, markerProps.ctx, markerProps.type, markerProps.size, markerProps.color, markerProps.borderColor, markerProps.borderThickness);
					ctx.globalAlpha = 1;


					//if (Math.abs(prevDataPointX - x) < markerProps.size / 2 && Math.abs(prevDataPointY - y) < markerProps.size / 2) {
					//    continue;
					//}

					//if (!dataSeries.maxWidthInX || markerProps.size > dataSeries.maxWidthInX) {
					//	dataSeries.maxWidthInX = markerProps.size / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);
					//}

					if ((Math.sqrt((prevDataPointX - x) * (prevDataPointX - x) + (prevDataPointY - y) * (prevDataPointY - y)) < Math.min(markerProps.size, 5))
						&& dataPoints.length > (Math.min(this.plotArea.width, this.plotArea.height))) {
						continue;
					}

					//Render ID on Ghost Canvas - for event handling
					var id = dataSeries.dataPointIds[i];
					this._eventManager.objectMap[id] = {
						id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x, y1: y
					};
					var markerColor = intToHexColorString(id);

					if (isCanvasSupported) {
						RenderHelper.drawMarker(
							markerProps.x, markerProps.y, this._eventManager.ghostCtx,
							markerProps.type,
							markerProps.size,
							markerColor,
							markerColor,
							markerProps.borderThickness
						);
					}
					//markers.push();

					if (dataPoints[i].indexLabel || dataSeries.indexLabel || dataPoints[i].indexLabelFormatter || dataSeries.indexLabelFormatter) {

						this._indexLabels.push({
							chartType: "scatter",
							dataPoint: dataPoints[i],
							dataSeries: dataSeries,
							point: {
								x: x, y: y
							},
							direction: 1,
							bounds: {
								x1: x - markerProps.size / 2, y1: y - markerProps.size / 2, x2: x + markerProps.size / 2, y2: y + markerProps.size / 2
							},
							color: color
						});
					}

					prevDataPointX = x;
					prevDataPointY = y;
				}
			}
		}

		if (isCanvasSupported) {
			targetCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height);

			ctx.globalCompositeOperation = "source-atop";
			if (plotUnit.axisX.maskCanvas)
				ctx.drawImage(plotUnit.axisX.maskCanvas, 0, 0, this.width, this.height);
			if (plotUnit.axisY.maskCanvas)
				ctx.drawImage(plotUnit.axisY.maskCanvas, 0, 0, this.width, this.height);
			if (this._breaksCanvasCtx)
				this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height);
			ctx.clearRect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);

			this._eventManager.ghostCtx.restore();
		}
		ctx.restore();

		//source and dest would be same when animation is not enabled
		var animationInfo = {
			source: targetCtx, dest: this.plotArea.ctx, animationCallback: AnimationHelper.fadeInAnimation, easingFunction: AnimationHelper.easing.easeInQuad, animationBase: 0
		};
		return animationInfo;
	}

	Chart.prototype.renderCandlestick = function (plotUnit) {
		var targetCtx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
		var ctx = isCanvasSupported ? this._preRenderCtx : targetCtx;
		var ghostCtx = this._eventManager.ghostCtx;

		var totalDataSeries = plotUnit.dataSeriesIndexes.length;
		if (totalDataSeries <= 0)
			return;

		var color = null, fallingColor = null;

		var plotArea = this.plotArea;

		var i = 0, x, y1, y2, y3, y4;
		var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number from dataTime everytime it is used.

		//var yZeroToPixel = plotUnit.axisY.convertValueToPixel(0);

		var minBarWidth = this.dataPointMinWidth ? this.dataPointMinWidth : this.dataPointWidth ? this.dataPointWidth : 1;
		var maxBarWidth = this.dataPointMaxWidth ? this.dataPointMaxWidth : this.dataPointWidth ? this.dataPointWidth : (this.width * .015);

		var xMinDiff = plotUnit.axisX.dataInfo.minDiff;

		if (!isFinite(xMinDiff))
			xMinDiff = Math.abs(plotUnit.axisX.range) * .3;

		var barWidth = this.dataPointWidth ? this.dataPointWidth : (plotArea.width * (plotUnit.axisX.logarithmic ? Math.log(xMinDiff) / Math.log(plotUnit.axisX.range) : Math.abs(xMinDiff) / Math.abs(plotUnit.axisX.range)) * .7) << 0;

		if (this.dataPointMaxWidth && minBarWidth > maxBarWidth)
			minBarWidth = Math.min(this.dataPointWidth ? this.dataPointWidth : Infinity, maxBarWidth);

		if (!this.dataPointMaxWidth && this.dataPointMinWidth && maxBarWidth < minBarWidth)
			maxBarWidth = Math.max(this.dataPointWidth ? this.dataPointWidth : -Infinity, minBarWidth);

		if (barWidth < minBarWidth)
			barWidth = minBarWidth;

		if (barWidth > maxBarWidth)
			barWidth = maxBarWidth;

		ctx.save();
		if (isCanvasSupported)
			ghostCtx.save();

		ctx.beginPath();
		ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
		ctx.clip();

		if (isCanvasSupported) {
			ghostCtx.beginPath();
			ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
			ghostCtx.clip();
		}
		//ctx.beginPath();

		for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

			var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

			var dataSeries = this.data[dataSeriesIndex];
			var dataPoints = dataSeries.dataPoints;
			var isFirstDataPointInPlotArea = true;


			// Reducing pixelPerUnit by 1 just to overcome any problems due to rounding off of pixels.
			//dataSeries.maxWidthInX = barWidth / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);

			//var offsetX = barWidth * plotUnit.index << 0;


			if (dataPoints.length > 0) {
				var bevelEnabled = (barWidth > 5) && dataSeries.bevelEnabled ? true : false;

				for (i = 0; i < dataPoints.length; i++) {

					dataPoints[i].getTime ? dataPointX = dataPoints[i].x.getTime() : dataPointX = dataPoints[i].x;

					if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) {
						continue;
					}

					if (isNullOrUndefined(dataPoints[i].y) || !dataPoints[i].y.length
						|| typeof (dataPoints[i].y[0]) !== "number" || typeof (dataPoints[i].y[1]) !== "number"
						|| typeof (dataPoints[i].y[2]) !== "number" || typeof (dataPoints[i].y[3]) !== "number")
						continue;

					x = plotUnit.axisX.convertValueToPixel(dataPointX);
					y1 = plotUnit.axisY.convertValueToPixel(dataPoints[i].y[0]);
					y2 = plotUnit.axisY.convertValueToPixel(dataPoints[i].y[1]);

					y3 = plotUnit.axisY.convertValueToPixel(dataPoints[i].y[2]);
					y4 = plotUnit.axisY.convertValueToPixel(dataPoints[i].y[3]);

					var x1 = (x - barWidth / 2) << 0;
					var x2 = (x1 + barWidth) << 0;


					fallingColor = dataSeries.options.fallingColor ? dataSeries.fallingColor : dataSeries._colorSet[0];
					color = dataPoints[i].color ? dataPoints[i].color : dataSeries._colorSet[0];


					//var borderThickness = Math.max(2, ((barWidth * .1) / 2 << 0) * 2); // Set only even numbers for border
					var borderThickness = Math.round(Math.max(1, (barWidth * .15)));
					//borderThickness = (borderThickness / 2 << 0) * 2;
					//borderThickness = 2;
					var offset = borderThickness % 2 === 0 ? 0 : .5;


					var id = dataSeries.dataPointIds[i];
					this._eventManager.objectMap[id] = {
						id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x1, y1: y1, x2: x2, y2: y2,
						x3: x, y3: y3, x4: x, y4: y4, borderThickness: borderThickness, color: color
					};

					ctx.strokeStyle = color;
					ctx.beginPath();
					ctx.lineWidth = borderThickness;
					ghostCtx.lineWidth = Math.max(borderThickness, 4);

					if (dataSeries.type === "candlestick") {

						ctx.moveTo(x - offset, y2);
						ctx.lineTo(x - offset, Math.min(y1, y4));
						ctx.stroke();
						ctx.moveTo(x - offset, Math.max(y1, y4));
						ctx.lineTo(x - offset, y3);
						ctx.stroke();

						drawRect(ctx, x1, Math.min(y1, y4), x2, Math.max(y1, y4), dataPoints[i].y[0] <= dataPoints[i].y[3] ? dataSeries.risingColor : fallingColor, borderThickness, color, bevelEnabled, bevelEnabled, false, false, dataSeries.fillOpacity);


						if (isCanvasSupported) {
							color = intToHexColorString(id);
							ghostCtx.strokeStyle = color;

							ghostCtx.moveTo(x - offset, y2);
							ghostCtx.lineTo(x - offset, Math.min(y1, y4));
							ghostCtx.stroke();
							ghostCtx.moveTo(x - offset, Math.max(y1, y4));
							ghostCtx.lineTo(x - offset, y3);
							ghostCtx.stroke();
							drawRect(ghostCtx, x1, Math.min(y1, y4), x2, Math.max(y1, y4), color, 0, null, false, false, false, false);
						}
					}
					else if (dataSeries.type === "ohlc") {

						ctx.moveTo(x - offset, y2);
						ctx.lineTo(x - offset, y3);
						ctx.stroke();

						ctx.beginPath();
						ctx.moveTo(x, y1);
						ctx.lineTo(x1, y1);
						ctx.stroke();

						ctx.beginPath();
						ctx.moveTo(x, y4);
						ctx.lineTo(x2, y4);
						ctx.stroke();

						if (isCanvasSupported) {

							color = intToHexColorString(id);
							ghostCtx.strokeStyle = color;

							ghostCtx.moveTo(x - offset, y2);
							ghostCtx.lineTo(x - offset, y3);
							ghostCtx.stroke();

							ghostCtx.beginPath();
							ghostCtx.moveTo(x, y1);
							ghostCtx.lineTo(x1, y1);
							ghostCtx.stroke();

							ghostCtx.beginPath();
							ghostCtx.moveTo(x, y4);
							ghostCtx.lineTo(x2, y4);
							ghostCtx.stroke();
						}
					}

					if (dataPoints[i].indexLabel || dataSeries.indexLabel || dataPoints[i].indexLabelFormatter || dataSeries.indexLabelFormatter) {

						this._indexLabels.push({
							chartType: dataSeries.type,
							dataPoint: dataPoints[i],
							dataSeries: dataSeries,
							point: {
								x: x1 + (x2 - x1) / 2, y: plotUnit.axisY.reversed ? y3 : y2
							},
							direction: 1,
							bounds: {
								x1: x1, y1: Math.min(y2, y3), x2: x2, y2: Math.max(y2, y3)
							},
							color: color
						});

					}
				}
			}
		}

		if (isCanvasSupported) {
			targetCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height);

			ctx.globalCompositeOperation = "source-atop";
			if (plotUnit.axisX.maskCanvas)
				ctx.drawImage(plotUnit.axisX.maskCanvas, 0, 0, this.width, this.height);
			if (plotUnit.axisY.maskCanvas)
				ctx.drawImage(plotUnit.axisY.maskCanvas, 0, 0, this.width, this.height);
			if (this._breaksCanvasCtx)
				this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height);
			ctx.clearRect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);

			ghostCtx.restore();
		}
		ctx.restore();

		//source and dest would be same when animation is not enabled
		var animationInfo = {
			source: targetCtx, dest: this.plotArea.ctx, animationCallback: AnimationHelper.fadeInAnimation, easingFunction: AnimationHelper.easing.easeInQuad, animationBase: 0
		};
		return animationInfo;
	}

	Chart.prototype.renderBoxAndWhisker = function (plotUnit) {
		var targetCtx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
		var ctx = isCanvasSupported ? this._preRenderCtx : targetCtx;
		var ghostCtx = this._eventManager.ghostCtx;

		var totalDataSeries = plotUnit.dataSeriesIndexes.length;
		if (totalDataSeries <= 0)
			return;

		var color = null;

		var plotArea = this.plotArea;

		var i = 0, x, y1, y2, y3, y4, y5;
		var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number from dataTime everytime it is used.

		//var yZeroToPixel = plotUnit.axisY.convertValueToPixel(0);

		var minBarWidth = this.dataPointMinWidth ? this.dataPointMinWidth : this.dataPointWidth ? this.dataPointWidth : 1;
		var maxBarWidth = this.dataPointMaxWidth ? this.dataPointMaxWidth : this.dataPointWidth ? this.dataPointWidth : (this.width * .015);

		var xMinDiff = plotUnit.axisX.dataInfo.minDiff;

		if (!isFinite(xMinDiff))
			xMinDiff = Math.abs(plotUnit.axisX.range) * .3;

		var barWidth = this.dataPointWidth ? this.dataPointWidth : (plotArea.width * (plotUnit.axisX.logarithmic ? Math.log(xMinDiff) / Math.log(plotUnit.axisX.range) : Math.abs(xMinDiff) / Math.abs(plotUnit.axisX.range)) * .7) << 0;

		if (this.dataPointMaxWidth && minBarWidth > maxBarWidth)
			minBarWidth = Math.min(this.dataPointWidth ? this.dataPointWidth : Infinity, maxBarWidth);

		if (!this.dataPointMaxWidth && this.dataPointMinWidth && maxBarWidth < minBarWidth)
			maxBarWidth = Math.max(this.dataPointWidth ? this.dataPointWidth : -Infinity, minBarWidth);

		if (barWidth < minBarWidth)
			barWidth = minBarWidth;

		if (barWidth > maxBarWidth)
			barWidth = maxBarWidth;

		ctx.save();
		if (isCanvasSupported)
			ghostCtx.save();

		ctx.beginPath();
		ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
		ctx.clip();

		if (isCanvasSupported) {
			ghostCtx.beginPath();
			ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
			ghostCtx.clip();
		}
		//ctx.beginPath();
		var reversed = false;
		reversed = !!plotUnit.axisY.reversed;

		for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

			var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

			var dataSeries = this.data[dataSeriesIndex];
			var dataPoints = dataSeries.dataPoints;
			var isFirstDataPointInPlotArea = true;


			// Reducing pixelPerUnit by 1 just to overcome any problems due to rounding off of pixels.
			//dataSeries.maxWidthInX = barWidth / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);

			//var offsetX = barWidth * plotUnit.index << 0;


			if (dataPoints.length > 0) {
				var bevelEnabled = (barWidth > 5) && dataSeries.bevelEnabled ? true : false;

				for (i = 0; i < dataPoints.length; i++) {

					dataPoints[i].getTime ? dataPointX = dataPoints[i].x.getTime() : dataPointX = dataPoints[i].x;

					if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) {
						continue;
					}

					if (isNullOrUndefined(dataPoints[i].y) || !dataPoints[i].y.length
						|| typeof (dataPoints[i].y[0]) !== "number" || typeof (dataPoints[i].y[1]) !== "number"
						|| typeof (dataPoints[i].y[2]) !== "number" || typeof (dataPoints[i].y[3]) !== "number"
						|| typeof (dataPoints[i].y[4]) !== "number" || dataPoints[i].y.length !== 5)
						continue;

					x = plotUnit.axisX.convertValueToPixel(dataPointX);

					y1 = plotUnit.axisY.convertValueToPixel(dataPoints[i].y[0]);
					y2 = plotUnit.axisY.convertValueToPixel(dataPoints[i].y[1]);
					y3 = plotUnit.axisY.convertValueToPixel(dataPoints[i].y[2]);
					y4 = plotUnit.axisY.convertValueToPixel(dataPoints[i].y[3]);

					y5 = plotUnit.axisY.convertValueToPixel(dataPoints[i].y[4]);

					var x1 = (x - barWidth / 2) << 0;
					var x2 = (x + barWidth / 2) << 0;

					color = dataPoints[i].color ? dataPoints[i].color : dataSeries._colorSet[0];

					//var borderThickness = Math.max(2, ((barWidth * .1) / 2 << 0) * 2); // Set only even numbers for border
					var borderThickness = Math.round(Math.max(1, (barWidth * .15)));
					//borderThickness = (borderThickness / 2 << 0) * 2;
					var offset = borderThickness % 2 === 0 ? 0 : .5;

					var whiskerColor = dataPoints[i].whiskerColor ? dataPoints[i].whiskerColor : dataPoints[i].color ? dataSeries.whiskerColor ? dataSeries.whiskerColor : dataPoints[i].color : dataSeries.whiskerColor ? dataSeries.whiskerColor : color;
					var whiskerThickness = typeof dataPoints[i].whiskerThickness === "number" ? dataPoints[i].whiskerThickness : typeof dataSeries.options.whiskerThickness === "number" ? dataSeries.whiskerThickness : borderThickness;
					var whiskerDashType = dataPoints[i].whiskerDashType ? dataPoints[i].whiskerDashType : dataSeries.whiskerDashType;
					var whiskerLength = !isNullOrUndefined(dataPoints[i].whiskerLength) ? dataPoints[i].whiskerLength : !isNullOrUndefined(dataSeries.options.whiskerLength) ? dataSeries.whiskerLength : barWidth;
					whiskerLength = (typeof whiskerLength === "number") ? (whiskerLength <= 0) ? 0 : (whiskerLength >= barWidth) ? barWidth : whiskerLength : (typeof whiskerLength === "string") ? (parseInt(whiskerLength) * barWidth / 100 > barWidth) ? barWidth : (parseInt(whiskerLength) * barWidth / 100) : barWidth;
					var whiskerOffset = Math.round(whiskerThickness) % 2 === 1 ? 0.5 : 0;

					var stemColor = dataPoints[i].stemColor ? dataPoints[i].stemColor : dataPoints[i].color ? dataSeries.stemColor ? dataSeries.stemColor : dataPoints[i].color : dataSeries.stemColor ? dataSeries.stemColor : color;
					var stemThickness = typeof dataPoints[i].stemThickness === "number" ? dataPoints[i].stemThickness : typeof dataSeries.options.stemThickness === "number" ? dataSeries.stemThickness : borderThickness;
					var stemOffset = Math.round(stemThickness) % 2 === 1 ? 0.5 : 0;

					var stemDashType = dataPoints[i].stemDashType ? dataPoints[i].stemDashType : dataSeries.stemDashType;

					var lineColor = dataPoints[i].lineColor ? dataPoints[i].lineColor : dataPoints[i].color ? dataSeries.lineColor ? dataSeries.lineColor : dataPoints[i].color : dataSeries.lineColor ? dataSeries.lineColor : color;
					var lineThickness = typeof dataPoints[i].lineThickness === "number" ? dataPoints[i].lineThickness : typeof dataSeries.options.lineThickness === "number" ? dataSeries.lineThickness : borderThickness;
					var lineDashType = dataPoints[i].lineDashType ? dataPoints[i].lineDashType : dataSeries.lineDashType;
					var lineOffset = Math.round(lineThickness) % 2 === 1 ? 0.5 : 0;

					var upperBoxColor = dataSeries.upperBoxColor;
					var lowerBoxColor = dataSeries.lowerBoxColor;
					var fillOpacity = !isNullOrUndefined(dataSeries.options.fillOpacity) ? dataSeries.fillOpacity : 1;

					var id = dataSeries.dataPointIds[i];
					this._eventManager.objectMap[id] = {
						id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i,
						x1: x1, y1: y1, x2: x2, y2: y2, x3: x, y3: y3, x4: x, y4: y4, y5: y5,
						borderThickness: borderThickness, color: color,
						stemThickness: stemThickness, stemColor: stemColor,
						whiskerThickness: whiskerThickness, whiskerLength: whiskerLength, whiskerColor: whiskerColor,
						lineThickness: lineThickness, lineColor: lineColor
					};

					//Stems
					ctx.save();
					if (stemThickness > 0) {
						ctx.beginPath();
						ctx.strokeStyle = stemColor;
						ctx.lineWidth = stemThickness;
						if (ctx.setLineDash)
							ctx.setLineDash(getLineDashArray(stemDashType, stemThickness));
						//ghostCtx.lineWidth = Math.max(stemThickness, 4);
						ctx.moveTo(x - stemOffset, y2);
						ctx.lineTo(x - stemOffset, y1);
						ctx.stroke();
						ctx.moveTo(x - stemOffset, y4);
						ctx.lineTo(x - stemOffset, y3);
						ctx.stroke();
					}
					ctx.restore();

					//ctx.strokeStyle = color;
					//ctx.lineWidth = borderThickness;
					ghostCtx.lineWidth = Math.max(borderThickness, 4);

					//upper and lower rectangle inside another rectangle
					ctx.beginPath();
					drawRect(ctx, x1, Math.min(y5, y2), x2, Math.max(y2, y5), lowerBoxColor, 0, color, reversed ? bevelEnabled : false, reversed ? false : bevelEnabled, false, false, fillOpacity);

					ctx.beginPath();
					drawRect(ctx, x1, Math.min(y3, y5), x2, Math.max(y5, y3), upperBoxColor, 0, color, reversed ? false : bevelEnabled, reversed ? bevelEnabled : false, false, false, fillOpacity);

					//Outer rectangle for border
					ctx.beginPath();
					ctx.lineWidth = borderThickness;
					ctx.strokeStyle = color;
					ctx.rect(x1 - offset, Math.min(y2, y3) - offset, x2 - x1 + 2 * offset, Math.max(y2, y3) - Math.min(y2, y3) + 2 * offset);
					ctx.stroke();

					//drawRect(ctx, x1, Math.min(y2, y3), x2, Math.max(y2, y3), isCanvasSupported ? "transparent" : "white", borderThickness, color, bevelEnabled, bevelEnabled, false, false, dataSeries.fillOpacity);

					//Line for median/mean
					ctx.save();

					if (lineThickness > 0) {
						ctx.beginPath();
						ctx.globalAlpha = 1;
						if (ctx.setLineDash)
							ctx.setLineDash(getLineDashArray(lineDashType, lineThickness));
						ctx.strokeStyle = lineColor;
						ctx.lineWidth = lineThickness;
						ctx.moveTo(x1, y5 - lineOffset);
						ctx.lineTo(x2, y5 - lineOffset);
						ctx.stroke();
					}

					ctx.restore();

					// whiskers
					ctx.save();
					if (whiskerThickness > 0) {
						ctx.beginPath();
						if (ctx.setLineDash)
							ctx.setLineDash(getLineDashArray(whiskerDashType, whiskerThickness));
						ctx.strokeStyle = whiskerColor;
						ctx.lineWidth = whiskerThickness;

						ctx.moveTo((x - whiskerLength / 2) << 0, y4 - whiskerOffset);
						ctx.lineTo((x + whiskerLength / 2) << 0, y4 - whiskerOffset);
						ctx.stroke();

						ctx.moveTo((x - whiskerLength / 2) << 0, y1 + whiskerOffset);
						ctx.lineTo((x + whiskerLength / 2) << 0, y1 + whiskerOffset);
						ctx.stroke();

					}

					ctx.restore();


					if (isCanvasSupported) {
						color = intToHexColorString(id);
						ghostCtx.strokeStyle = color;
						ghostCtx.lineWidth = stemThickness;

						if (stemThickness > 0) {
							ghostCtx.moveTo(x - offset - stemOffset, y2);
							ghostCtx.lineTo(x - offset - stemOffset, Math.max(y1, y4));
							ghostCtx.stroke();
							ghostCtx.moveTo(x - offset - stemOffset, Math.min(y1, y4));
							ghostCtx.lineTo(x - offset - stemOffset, y3);
							ghostCtx.stroke();
						}

						drawRect(ghostCtx, x1, Math.max(y2, y3), x2, Math.min(y2, y3), color, 0, null, false, false, false, false);

						if (whiskerThickness > 0) {
							ghostCtx.beginPath();
							ghostCtx.lineWidth = whiskerThickness;

							ghostCtx.moveTo(x + whiskerLength / 2, y4 - whiskerOffset);
							ghostCtx.lineTo(x - whiskerLength / 2, y4 - whiskerOffset);
							ghostCtx.stroke();

							ghostCtx.moveTo(x + whiskerLength / 2, y1 + whiskerOffset);
							ghostCtx.lineTo(x - whiskerLength / 2, y1 + whiskerOffset);
							ghostCtx.stroke();
						}

					}

					if (dataPoints[i].indexLabel || dataSeries.indexLabel || dataPoints[i].indexLabelFormatter || dataSeries.indexLabelFormatter) {

						this._indexLabels.push({
							chartType: dataSeries.type,
							dataPoint: dataPoints[i],
							dataSeries: dataSeries,
							point: {
								x: x1 + (x2 - x1) / 2, y: plotUnit.axisY.reversed ? y1 : y4
							},
							direction: 1,
							bounds: {
								x1: x1, y1: Math.min(y1, y4), x2: x2, y2: Math.max(y1, y4)
							},
							color: color
						});

					}
				}
			}
		}

		if (isCanvasSupported) {
			targetCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height);

			ctx.globalCompositeOperation = "source-atop";
			if (plotUnit.axisX.maskCanvas)
				ctx.drawImage(plotUnit.axisX.maskCanvas, 0, 0, this.width, this.height);
			if (plotUnit.axisY.maskCanvas)
				ctx.drawImage(plotUnit.axisY.maskCanvas, 0, 0, this.width, this.height);
			if (this._breaksCanvasCtx)
				this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height);
			ctx.clearRect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);

			ghostCtx.restore();
		}
		ctx.restore();

		//source and dest would be same when animation is not enabled
		var animationInfo = {
			source: targetCtx, dest: this.plotArea.ctx, animationCallback: AnimationHelper.fadeInAnimation, easingFunction: AnimationHelper.easing.easeInQuad, animationBase: 0
		};
		return animationInfo;
	}

	Chart.prototype.renderRangeColumn = function (plotUnit) {
		var targetCtx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
		var ctx = isCanvasSupported ? this._preRenderCtx : targetCtx;
		var totalDataSeries = plotUnit.dataSeriesIndexes.length;

		if (totalDataSeries <= 0)
			return;

		var color = null;

		var plotArea = this.plotArea;

		var i = 0, x, y1, y2;
		var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number from dataTime everytime it is used.

		//var yZeroToPixel = plotUnit.axisY.convertValueToPixel(0);

		var minBarWidth = this.dataPointMinWidth ? this.dataPointMinWidth : this.dataPointWidth ? this.dataPointWidth : 1;
		var maxBarWidth = this.dataPointMaxWidth ? this.dataPointMaxWidth : this.dataPointWidth ? this.dataPointWidth : (this.width * .03);
		//var maxBarWidth = (this.width * .015);
		var xMinDiff = plotUnit.axisX.dataInfo.minDiff;

		if (!isFinite(xMinDiff))
			xMinDiff = Math.abs(plotUnit.axisX.range) * .3;

		var barWidth = this.dataPointWidth ? this.dataPointWidth : (plotArea.width * (plotUnit.axisX.logarithmic ? Math.log(xMinDiff) / Math.log(plotUnit.axisX.range) : Math.abs(xMinDiff) / Math.abs(plotUnit.axisX.range)) / plotUnit.plotType.totalDataSeries * .9) << 0;

		if (this.dataPointMaxWidth && minBarWidth > maxBarWidth)
			minBarWidth = Math.min(this.dataPointWidth ? this.dataPointWidth : Infinity, maxBarWidth);

		if (!this.dataPointMaxWidth && this.dataPointMinWidth && maxBarWidth < minBarWidth)
			maxBarWidth = Math.max(this.dataPointWidth ? this.dataPointWidth : -Infinity, minBarWidth);

		if (barWidth < minBarWidth)
			barWidth = minBarWidth;

		if (barWidth > maxBarWidth)
			barWidth = maxBarWidth;

		ctx.save();
		if (isCanvasSupported)
			this._eventManager.ghostCtx.save();

		ctx.beginPath();
		ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
		ctx.clip();

		if (isCanvasSupported) {
			this._eventManager.ghostCtx.beginPath();
			this._eventManager.ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
			this._eventManager.ghostCtx.clip();
		}
		//ctx.beginPath();

		for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

			var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

			var dataSeries = this.data[dataSeriesIndex];
			var dataPoints = dataSeries.dataPoints;
			var isFirstDataPointInPlotArea = true;


			// Reducing pixelPerUnit by 1 just to overcome any problems due to rounding off of pixels.
			//dataSeries.maxWidthInX = barWidth / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);

			//var offsetX = barWidth * plotUnit.index << 0;


			if (dataPoints.length > 0) {
				var bevelEnabled = (barWidth > 5) && dataSeries.bevelEnabled ? true : false;

				for (i = 0; i < dataPoints.length; i++) {

					dataPoints[i].getTime ? dataPointX = dataPoints[i].x.getTime() : dataPointX = dataPoints[i].x;

					if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) {
						continue;
					}

					if (isNullOrUndefined(dataPoints[i].y) || !dataPoints[i].y.length
						|| typeof (dataPoints[i].y[0]) !== "number" || typeof (dataPoints[i].y[1]) !== "number")
						continue;

					x = plotUnit.axisX.convertValueToPixel(dataPointX);
					y1 = plotUnit.axisY.convertValueToPixel(dataPoints[i].y[0]);
					y2 = plotUnit.axisY.convertValueToPixel(dataPoints[i].y[1]);

					//var x1 = x - barWidth / 2 << 0;
					var x1 = plotUnit.axisX.reversed ? x + (plotUnit.plotType.totalDataSeries * barWidth / 2) - ((plotUnit.previousDataSeriesCount + j) * barWidth) << 0 : x - (plotUnit.plotType.totalDataSeries * barWidth / 2) + ((plotUnit.previousDataSeriesCount + j) * barWidth) << 0;
					var x2 = plotUnit.axisX.reversed ? x1 - barWidth << 0 : x1 + barWidth << 0;


					color = dataPoints[i].color ? dataPoints[i].color : dataSeries._colorSet[i % dataSeries._colorSet.length];

					if (y1 > y2) {
						var temp = y1;
						y1 = y2;
						y2 = temp;
					}

					var id = dataSeries.dataPointIds[i];
					this._eventManager.objectMap[id] = {
						id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x1, y1: y1, x2: x2, y2: y2
					};

					//var borderThickness = Math.max(1, (barWidth * .1 << 0));
					var borderThickness = 0;

					drawRect(ctx, x1, y1, x2, y2, color, borderThickness, color, bevelEnabled, bevelEnabled, false, false, dataSeries.fillOpacity);
					color = intToHexColorString(id);

					if (isCanvasSupported)
						drawRect(this._eventManager.ghostCtx, x1, y1, x2, y2, color, 0, null, false, false, false, false);


					if (dataPoints[i].indexLabel || dataSeries.indexLabel || dataPoints[i].indexLabelFormatter || dataSeries.indexLabelFormatter) {

						this._indexLabels.push({
							chartType: "rangeColumn",
							dataPoint: dataPoints[i],
							dataSeries: dataSeries,
							indexKeyword: 0,
							point: {
								x: x1 + (x2 - x1) / 2, y: dataPoints[i].y[1] >= dataPoints[i].y[0] ? y2 : y1
							},
							direction: dataPoints[i].y[1] >= dataPoints[i].y[0] ? -1 : 1,
							bounds: {
								x1: x1, y1: Math.min(y1, y2), x2: x2, y2: Math.max(y1, y2)
							},
							color: color
						});

						this._indexLabels.push({
							chartType: "rangeColumn",
							dataPoint: dataPoints[i],
							dataSeries: dataSeries,
							indexKeyword: 1,
							point: {
								x: x1 + (x2 - x1) / 2, y: dataPoints[i].y[1] >= dataPoints[i].y[0] ? y1 : y2
							},
							direction: dataPoints[i].y[1] >= dataPoints[i].y[0] ? 1 : -1,
							bounds: {
								x1: x1, y1: Math.min(y1, y2), x2: x2, y2: Math.max(y1, y2)
							},
							color: color
						});

					}
				}
			}
		}

		if (isCanvasSupported) {
			targetCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height);

			ctx.globalCompositeOperation = "source-atop";
			if (plotUnit.axisX.maskCanvas)
				ctx.drawImage(plotUnit.axisX.maskCanvas, 0, 0, this.width, this.height);
			if (plotUnit.axisY.maskCanvas)
				ctx.drawImage(plotUnit.axisY.maskCanvas, 0, 0, this.width, this.height);
			if (this._breaksCanvasCtx)
				this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height);
			ctx.clearRect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);

			this._eventManager.ghostCtx.restore();
		}
		ctx.restore();


		//source and dest would be same when animation is not enabled
		var animationInfo = {
			source: targetCtx, dest: this.plotArea.ctx, animationCallback: AnimationHelper.fadeInAnimation, easingFunction: AnimationHelper.easing.easeInQuad, animationBase: 0
		};
		return animationInfo;
	}

	//#renderError starts
	function drawErrorLines(ctx, x1, y1, x2, y2, color, whisker, stem, swapped, opacity) {
		var trimLength = 0;

		if (!opacity) {
			opacity = 1;
			//console.log("Opacity 1");
		} else {
			whisker.color = color;
			stem.color = color;
		}

		var length = swapped ? Math.abs(y2 - y1) : Math.abs(x2 - x1);

		if (whisker.trimLength > 0) {
			trimLength = Math.abs(length * whisker.trimLength / 100);
		} else {
			trimLength = Math.abs(length - whisker.length);
		}

		if (swapped) {
			y1 += (trimLength / 2);
			y2 -= (trimLength / 2);
		} else {
			x1 += (trimLength / 2);
			x2 -= (trimLength / 2);
		}

		var whiskerOffset = Math.round(whisker.thickness) % 2 === 1 ? 0.5 : 0;
		var stemOffset = Math.round(stem.thickness) % 2 === 1 ? 0.5 : 0;

		ctx.save();
		ctx.globalAlpha = opacity;

		//Stem
		ctx.strokeStyle = stem.color || color;
		ctx.lineWidth = stem.thickness || 2;
		if (ctx.setLineDash)
			ctx.setLineDash(getLineDashArray(stem.dashType, stem.thickness));
		ctx.beginPath();

		if (swapped && stem.thickness > 0) {
			ctx.moveTo(x2 - whisker.thickness / 2, Math.round((y1 + y2) / 2) - stemOffset);
			ctx.lineTo(x1 + whisker.thickness / 2, Math.round((y1 + y2) / 2) - stemOffset);
		} else if (stem.thickness > 0) {
			ctx.moveTo(Math.round((x1 + x2) / 2) - stemOffset, y1 + whisker.thickness / 2);
			ctx.lineTo(Math.round((x1 + x2) / 2) - stemOffset, y2 - whisker.thickness / 2);
		}
		ctx.stroke();

		//whisker
		ctx.strokeStyle = whisker.color || color;
		ctx.lineWidth = whisker.thickness || 2;
		if (ctx.setLineDash)
			ctx.setLineDash(getLineDashArray(whisker.dashType, whisker.thickness));
		ctx.beginPath();
		if (swapped && whisker.thickness > 0) {
			ctx.moveTo(x2 - whiskerOffset, y1);
			ctx.lineTo(x2 - whiskerOffset, y2);
			ctx.moveTo(x1 + whiskerOffset, y1);
			ctx.lineTo(x1 + whiskerOffset, y2);
		} else if (whisker.thickness > 0) {
			ctx.moveTo(x1, y1 + whiskerOffset);
			ctx.lineTo(x2, y1 + whiskerOffset);
			ctx.moveTo(x1, y2 - whiskerOffset);
			ctx.lineTo(x2, y2 - whiskerOffset);
		}
		ctx.stroke();

		ctx.restore();
	}

	Chart.prototype.renderError = function (plotUnit) {

		var targetCtx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
		var ctx = isCanvasSupported ? this._preRenderCtx : targetCtx;
		var isXYSwapped = plotUnit.axisY._position ? (plotUnit.axisY._position === "left" || plotUnit.axisY._position === "right") ? false : true : false;
		var totalDataSeries = plotUnit.dataSeriesIndexes.length;

		if (totalDataSeries <= 0)
			return;

		var color = null;
		var isRangeChart = false;

		var plotArea = this.plotArea;

		var i = 0, x, y, x1, x2, y1, y2;
		var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number from dataTime everytime it is used.
		//var yZeroToPixel = plotUnit.axisY.convertValueToPixel(0);


		//var maxBarWidth = (this.width * .015);

		var xMinDiff = plotUnit.axisX.dataInfo.minDiff;

		if (!isFinite(xMinDiff))
			xMinDiff = Math.abs(plotUnit.axisX.range) * .3;

		ctx.save();
		if (isCanvasSupported)
			this._eventManager.ghostCtx.save();

		ctx.beginPath();
		ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
		ctx.clip();

		if (isCanvasSupported) {
			this._eventManager.ghostCtx.beginPath();
			this._eventManager.ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
			this._eventManager.ghostCtx.clip();
		}
		//ctx.beginPath();
		var totalBarTypeSeries = 0;

		for (var k = 0; k < this.data.length; k++) {
			//if (this.data[k].type === "error" && this.data[k]._linkedSeries === null)
			//	totalUnlinkedErrorSeries++;
			if (this.data[k].type.match(/(bar|column)/ig) && this.data[k].visible) {
				if (this.data[k].type.match(/(stacked)/ig)) {
					if (totalBarTypeSeries)
						continue;
				}
				totalBarTypeSeries++;
			}

		}

		for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

			var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

			var dataSeries = this.data[dataSeriesIndex];
			var dataPoints = dataSeries.dataPoints;
			var isFirstDataPointInPlotArea = true;

			var isSeriesLinkedToBar = !isNullOrUndefined(dataSeries._linkedSeries) ? (dataSeries._linkedSeries.type.match(/(bar|column)/ig) && dataSeries._linkedSeries.visible) ? true : false : false;

			var numberOfPreviousBars = 0;

			if (isSeriesLinkedToBar) {
				var linkedIndex = dataSeries._linkedSeries.id;

				for (var k = 0; k < linkedIndex; k++) {
					if (this.data[k].type.match(/(bar|column)/ig) && this.data[k].visible) {
						if (this.data[k].type.match(/(stacked)/ig)) {
							if (numberOfPreviousBars)
								continue;
						}
						if (this.data[k].type.match(/(range)/ig)) {
							isRangeChart = true;
						}
						numberOfPreviousBars++;
					}
				}
			}

			//var numberOfSeriesOtherThanError = plotUnit.plotType.totalDataSeries - totalUnlinkedErrorSeries;

			// Calculating bar/column width
			var minBarWidth = this.dataPointMinWidth ? this.dataPointMinWidth : this.dataPointWidth ? this.dataPointWidth : 1;
			var maxBarWidth = this.dataPointMaxWidth ? this.dataPointMaxWidth : this.dataPointWidth ? this.dataPointWidth : (isXYSwapped) ? (Math.min((this.height * .15), this.plotArea.height / (isSeriesLinkedToBar ? totalBarTypeSeries : 1) * .9) << 0) : (this.width * .3);
			if (isRangeChart)
				maxBarWidth = this.dataPointMaxWidth ? this.dataPointMaxWidth : this.dataPointWidth ? this.dataPointWidth : (isXYSwapped) ? (Math.min((this.height * .15), this.plotArea.height / (isSeriesLinkedToBar ? totalBarTypeSeries : 1) * .9) << 0) : (this.width * .03);

			var barWidth = this.options.dataPointWidth ? this.dataPointWidth : ((isXYSwapped ? plotArea.height : plotArea.width) * (plotUnit.axisX.logarithmic ? Math.log(xMinDiff) / Math.log(plotUnit.axisX.range) : Math.abs(xMinDiff) / Math.abs(plotUnit.axisX.range)) / (isSeriesLinkedToBar ? totalBarTypeSeries : 1) * .9) << 0;
			//var barWidth = this.dataPointWidth ? this.dataPointWidth : ((isXYSwapped ? plotArea.height : plotArea.width) * (plotUnit.axisX.logarithmic ? Math.log(xMinDiff) / Math.log(plotUnit.axisX.range) : Math.abs(xMinDiff) / Math.abs(plotUnit.axisX.range)) / (isSeriesLinkedToBar ? totalBarTypeSeries : 1) * .9) << 0;
			//console.log("selected", this.dataPointWidth)
			//console.log(isSeriesLinkedToBar, maxBarWidth, barWidth)

			if (this.dataPointMaxWidth && minBarWidth > maxBarWidth)
				minBarWidth = Math.min(this.dataPointWidth ? this.dataPointWidth : Infinity, maxBarWidth);

			if (!this.dataPointMaxWidth && this.dataPointMinWidth && maxBarWidth < minBarWidth)
				maxBarWidth = Math.max(this.dataPointWidth ? this.dataPointWidth : -Infinity, minBarWidth);

			if (barWidth < minBarWidth)
				barWidth = minBarWidth;

			if (barWidth > maxBarWidth)
				barWidth = maxBarWidth;

			// Reducing pixelPerUnit by 1 just to overcome any problems due to rounding off of pixels.
			//dataSeries.maxWidthInX = barWidth / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);

			//var offsetX = barWidth * plotUnit.index << 0;

			if (dataPoints.length > 0) {
				var colorSet = dataSeries._colorSet;

				for (i = 0; i < dataPoints.length; i++) {

					color = dataSeries.lineColor = dataSeries.options.color ? dataSeries.options.color : colorSet[0];

					var whiskerProperties = {
						color: dataPoints[i].whiskerColor ? dataPoints[i].whiskerColor : dataPoints[i].color ? dataSeries.whiskerColor ? dataSeries.whiskerColor : dataPoints[i].color : dataSeries.whiskerColor ? dataSeries.whiskerColor : color,
						thickness: !isNullOrUndefined(dataPoints[i].whiskerThickness) ? dataPoints[i].whiskerThickness : dataSeries.whiskerThickness,
						dashType: dataPoints[i].whiskerDashType ? dataPoints[i].whiskerDashType : dataSeries.whiskerDashType,
						length: !isNullOrUndefined(dataPoints[i].whiskerLength) ? dataPoints[i].whiskerLength : !isNullOrUndefined(dataSeries.options.whiskerLength) ? dataSeries.options.whiskerLength : barWidth,
						trimLength: !isNullOrUndefined(dataPoints[i].whiskerLength) ? 0 : !isNullOrUndefined(dataSeries.options.whiskerLength) ? 0 : 50
					};

					whiskerProperties.length = (typeof whiskerProperties.length === "number") ? (whiskerProperties.length <= 0) ? 0 : (whiskerProperties.length >= barWidth) ? barWidth : whiskerProperties.length : (typeof whiskerProperties.length === "string") ? (parseInt(whiskerProperties.length) * barWidth / 100) > barWidth ? barWidth : (parseInt(whiskerProperties.length) * barWidth / 100) > barWidth : barWidth;
					whiskerProperties.thickness = typeof whiskerProperties.thickness === "number" ? whiskerProperties.thickness < 0 ? 0 : Math.round(whiskerProperties.thickness) : 2;

					var stemProperties = {
						color: dataPoints[i].stemColor ? dataPoints[i].stemColor : dataPoints[i].color ? dataSeries.stemColor ? dataSeries.stemColor : dataPoints[i].color : dataSeries.stemColor ? dataSeries.stemColor : color,
						thickness: dataPoints[i].stemThickness ? dataPoints[i].stemThickness : dataSeries.stemThickness,
						dashType: dataPoints[i].stemDashType ? dataPoints[i].stemDashType : dataSeries.stemDashType
					};
					stemProperties.thickness = typeof stemProperties.thickness === "number" ? stemProperties.thickness < 0 ? 0 : Math.round(stemProperties.thickness) : 2;

					//barWidth = whiskerProperties.length;
					dataPoints[i].getTime ? dataPointX = dataPoints[i].x.getTime() : dataPointX = dataPoints[i].x;

					if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) {
						continue;
					}

					if (isNullOrUndefined(dataPoints[i].y) || !dataPoints[i].y.length
						|| typeof (dataPoints[i].y[0]) !== "number" || typeof (dataPoints[i].y[1]) !== "number")
						continue;

					var temp = plotUnit.axisX.convertValueToPixel(dataPointX);
					isXYSwapped ? y = temp : x = temp;
					temp = plotUnit.axisY.convertValueToPixel(dataPoints[i].y[0]);
					isXYSwapped ? x1 = temp : y1 = temp;
					temp = plotUnit.axisY.convertValueToPixel(dataPoints[i].y[1]);
					isXYSwapped ? x2 = temp : y2 = temp;

					//var x1 = x - barWidth / 2 << 0;
					if (isXYSwapped) {
						y1 = plotUnit.axisX.reversed ? (y + ((isSeriesLinkedToBar ? totalBarTypeSeries : 1) * barWidth / 2) - ((isSeriesLinkedToBar ? numberOfPreviousBars - 1 : 0) * barWidth)) << 0 : (y - ((isSeriesLinkedToBar ? totalBarTypeSeries : 1) * barWidth / 2) + ((isSeriesLinkedToBar ? numberOfPreviousBars - 1 : 0) * barWidth)) << 0;
						y2 = plotUnit.axisX.reversed ? y1 - barWidth << 0 : y1 + barWidth << 0;
					} else {
						x1 = plotUnit.axisX.reversed ? x + ((isSeriesLinkedToBar ? totalBarTypeSeries : 1) * barWidth / 2) - ((isSeriesLinkedToBar ? numberOfPreviousBars - 1 : 0) * barWidth) << 0 : x - ((isSeriesLinkedToBar ? totalBarTypeSeries : 1) * barWidth / 2) + ((isSeriesLinkedToBar ? numberOfPreviousBars - 1 : 0) * barWidth) << 0;
						x2 = plotUnit.axisX.reversed ? x1 - barWidth << 0 : x1 + barWidth << 0;
					}

					//color = dataPoints[i].color ? dataPoints[i].color : dataSeries._colorSet[i % dataSeries._colorSet.length];

					if (!isXYSwapped && y1 > y2) {
						temp = y1;
						y1 = y2;
						y2 = temp;
					}

					if (isXYSwapped && x1 > x2) {
						temp = x1;
						x1 = x2;
						x2 = temp;
					}

					var id = dataSeries.dataPointIds[i];
					this._eventManager.objectMap[id] = {
						id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: Math.min(x1, x2), y1: Math.min(y1, y2), x2: Math.max(x2, x1), y2: Math.max(y2, y1),
						isXYSwapped: isXYSwapped,
						stemProperties: stemProperties,
						whiskerProperties: whiskerProperties
					};


					drawErrorLines(ctx, Math.min(x1, x2), Math.min(y1, y2), Math.max(x2, x1), Math.max(y2, y1), color, whiskerProperties, stemProperties, isXYSwapped);

					if (isCanvasSupported) {
						drawErrorLines(this._eventManager.ghostCtx, x1, y1, x2, y2, color, whiskerProperties, stemProperties, isXYSwapped);
					}

					if (dataPoints[i].indexLabel || dataSeries.indexLabel || dataPoints[i].indexLabelFormatter || dataSeries.indexLabelFormatter) {

						this._indexLabels.push({
							chartType: "error",
							dataPoint: dataPoints[i],
							dataSeries: dataSeries,
							indexKeyword: 0,
							point: {
								x: isXYSwapped ? (dataPoints[i].y[1] >= dataPoints[i].y[0]) ? x1 : x2 : x1 + (x2 - x1) / 2,
								y: isXYSwapped ? (y1 + (y2 - y1) / 2) : (dataPoints[i].y[1] >= dataPoints[i].y[0]) ? y2 : y1
							},
							direction: dataPoints[i].y[1] >= dataPoints[i].y[0] ? -1 : 1,
							bounds: {
								x1: isXYSwapped ? Math.min(x1, x2) : x1,
								y1: isXYSwapped ? y1 : Math.min(y1, y2),
								x2: isXYSwapped ? Math.max(x1, x2) : x2,
								y2: isXYSwapped ? y2 : Math.max(y1, y2)
							},
							color: color,
							axisSwapped: isXYSwapped
						});

						this._indexLabels.push({
							chartType: "error",
							dataPoint: dataPoints[i],
							dataSeries: dataSeries,
							indexKeyword: 1,
							point: {
								x: isXYSwapped ? dataPoints[i].y[1] >= dataPoints[i].y[0] ? x2 : x1 : x1 + (x2 - x1) / 2,
								y: isXYSwapped ? y1 + (y2 - y1) / 2 : dataPoints[i].y[1] >= dataPoints[i].y[0] ? y1 : y2
							},
							direction: dataPoints[i].y[1] >= dataPoints[i].y[0] ? 1 : -1,
							bounds: {
								x1: isXYSwapped ? Math.min(x1, x2) : x1,
								y1: isXYSwapped ? y1 : Math.min(y1, y2),
								x2: isXYSwapped ? Math.max(x1, x2) : x2,
								y2: isXYSwapped ? y2 : Math.max(y1, y2)
							},
							color: color,
							axisSwapped: isXYSwapped
						});
					}
				}
			}
		}

		if (isCanvasSupported) {
			targetCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height);

			ctx.globalCompositeOperation = "source-atop";
			if (plotUnit.axisX.maskCanvas)
				ctx.drawImage(plotUnit.axisX.maskCanvas, 0, 0, this.width, this.height);
			if (plotUnit.axisY.maskCanvas)
				ctx.drawImage(plotUnit.axisY.maskCanvas, 0, 0, this.width, this.height);
			if (this._breaksCanvasCtx)
				this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height);
			ctx.clearRect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);

			this._eventManager.ghostCtx.restore();
		}
		ctx.restore();

		//source and dest would be same when animation is not enabled
		var animationInfo = {
			source: targetCtx, dest: this.plotArea.ctx, animationCallback: AnimationHelper.fadeInAnimation, easingFunction: AnimationHelper.easing.easeInQuad, animationBase: 0
		};
		return animationInfo;
	}
	//#endregion errorChart

	Chart.prototype.renderRangeBar = function (plotUnit) {
		var targetCtx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
		var ctx = isCanvasSupported ? this._preRenderCtx : targetCtx;
		var totalDataSeries = plotUnit.dataSeriesIndexes.length;

		if (totalDataSeries <= 0)
			return;

		var color = null;

		var plotArea = this.plotArea;

		var i = 0, x1, x2, y;
		var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number from dataTime everytime it is used.

		//In case of Bar Chart, yZeroToPixel is x co-ordinate!
		//var yZeroToPixel = plotUnit.axisY.convertValueToPixel(0);

		var minBarWidth = this.dataPointMinWidth ? this.dataPointMinWidth : this.dataPointWidth ? this.dataPointWidth : 1;
		var maxBarWidth = this.dataPointMaxWidth ? this.dataPointMaxWidth : this.dataPointWidth ? this.dataPointWidth : Math.min((this.height * .15), this.plotArea.height / plotUnit.plotType.totalDataSeries * .9) << 0;
		var xMinDiff = plotUnit.axisX.dataInfo.minDiff;

		if (!isFinite(xMinDiff))
			xMinDiff = Math.abs(plotUnit.axisX.range) * .3;

		var barWidth = this.dataPointWidth ? this.dataPointWidth : (plotArea.height * (plotUnit.axisX.logarithmic ? Math.log(xMinDiff) / Math.log(plotUnit.axisX.range) : Math.abs(xMinDiff) / Math.abs(plotUnit.axisX.range)) / plotUnit.plotType.totalDataSeries * .9) << 0;

		if (this.dataPointMaxWidth && minBarWidth > maxBarWidth)
			minBarWidth = Math.min(this.dataPointWidth ? this.dataPointWidth : Infinity, maxBarWidth);

		if (!this.dataPointMaxWidth && this.dataPointMinWidth && maxBarWidth < minBarWidth)
			maxBarWidth = Math.max(this.dataPointWidth ? this.dataPointWidth : -Infinity, minBarWidth);

		if (barWidth < minBarWidth)
			barWidth = minBarWidth;

		if (barWidth > maxBarWidth)
			barWidth = maxBarWidth;

		ctx.save();

		if (isCanvasSupported)
			this._eventManager.ghostCtx.save();

		ctx.beginPath();
		ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
		ctx.clip();

		if (isCanvasSupported) {
			this._eventManager.ghostCtx.beginPath();
			this._eventManager.ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
			this._eventManager.ghostCtx.clip();
		}

		for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

			var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

			var dataSeries = this.data[dataSeriesIndex];
			var dataPoints = dataSeries.dataPoints;
			var isFirstDataPointInPlotArea = true;


			//dataSeries.maxWidthInX = barWidth / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);


			if (dataPoints.length > 0) {
				var bevelEnabled = (barWidth > 5) && dataSeries.bevelEnabled ? true : false;

				ctx.strokeStyle = "#4572A7 ";

				for (i = 0; i < dataPoints.length; i++) {

					dataPoints[i].getTime ? dataPointX = dataPoints[i].x.getTime() : dataPointX = dataPoints[i].x;

					if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) {
						continue;
					}

					if (isNullOrUndefined(dataPoints[i].y) || !dataPoints[i].y.length
						|| typeof (dataPoints[i].y[0]) !== "number" || typeof (dataPoints[i].y[1]) !== "number")
						continue;

					//x and y are pixel co-ordinates of point and should not be confused with X and Y values
					x1 = plotUnit.axisY.convertValueToPixel(dataPoints[i].y[0]);
					x2 = plotUnit.axisY.convertValueToPixel(dataPoints[i].y[1]);

					y = plotUnit.axisX.convertValueToPixel(dataPointX);


					var y1 = plotUnit.axisX.reversed ? (y + (plotUnit.plotType.totalDataSeries * barWidth / 2) - ((plotUnit.previousDataSeriesCount + j) * barWidth)) << 0 : (y - (plotUnit.plotType.totalDataSeries * barWidth / 2) + ((plotUnit.previousDataSeriesCount + j) * barWidth)) << 0;
					var y2 = plotUnit.axisX.reversed ? y1 - barWidth << 0 : y1 + barWidth << 0;

					if (x1 > x2) {
						var temp = x1;
						x1 = x2;
						x2 = temp;
					}

					//drawRect(ctx, x1, y1, plotArea.x2, y2, "#EEEEEE", 0, null, false, false, false, false);
					//drawRect(ctx, x1, y1, plotArea.x2, y2, "#BDCED3", 0, null, false, false, false, false);

					color = dataPoints[i].color ? dataPoints[i].color : dataSeries._colorSet[i % dataSeries._colorSet.length];
					//color = "#1B4962";
					drawRect(ctx, x1, y1, x2, y2, color, 0, null, bevelEnabled, false, false, false, dataSeries.fillOpacity);

					var id = dataSeries.dataPointIds[i];
					this._eventManager.objectMap[id] = {
						id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x1, y1: y1, x2: x2, y2: y2
					};
					color = intToHexColorString(id);

					if (isCanvasSupported)
						drawRect(this._eventManager.ghostCtx, x1, y1, x2, y2, color, 0, null, false, false, false, false);


					if (dataPoints[i].indexLabel || dataSeries.indexLabel || dataPoints[i].indexLabelFormatter || dataSeries.indexLabelFormatter) {

						this._indexLabels.push({
							chartType: "rangeBar",
							dataPoint: dataPoints[i],
							dataSeries: dataSeries,
							indexKeyword: 0,
							point: {
								x: dataPoints[i].y[1] >= dataPoints[i].y[0] ? x1 : x2, y: y1 + (y2 - y1) / 2
							},
							direction: dataPoints[i].y[1] >= dataPoints[i].y[0] ? -1 : 1,
							bounds: {
								x1: Math.min(x1, x2), y1: y1, x2: Math.max(x1, x2), y2: y2
							},
							color: color
						});

						this._indexLabels.push({
							chartType: "rangeBar",
							dataPoint: dataPoints[i],
							dataSeries: dataSeries,
							indexKeyword: 1,
							point: {
								x: dataPoints[i].y[1] >= dataPoints[i].y[0] ? x2 : x1, y: y1 + (y2 - y1) / 2
							},
							direction: dataPoints[i].y[1] >= dataPoints[i].y[0] ? 1 : -1,
							bounds: {
								x1: Math.min(x1, x2), y1: y1, x2: Math.max(x1, x2), y2: y2
							},
							color: color
						});
					}
				}
			}
		}

		if (isCanvasSupported) {
			targetCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height);

			ctx.globalCompositeOperation = "source-atop";
			if (plotUnit.axisX.maskCanvas)
				ctx.drawImage(plotUnit.axisX.maskCanvas, 0, 0, this.width, this.height);
			if (plotUnit.axisY.maskCanvas)
				ctx.drawImage(plotUnit.axisY.maskCanvas, 0, 0, this.width, this.height);
			if (this._breaksCanvasCtx)
				this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height);
			ctx.clearRect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);

			this._eventManager.ghostCtx.restore();
		}
		ctx.restore();

		//source and dest would be same when animation is not enabled
		var animationInfo = {
			source: targetCtx, dest: this.plotArea.ctx, animationCallback: AnimationHelper.fadeInAnimation, easingFunction: AnimationHelper.easing.easeInQuad, animationBase: 0
		};
		return animationInfo;
	}

	Chart.prototype.renderRangeArea = function (plotUnit) {
		var targetCtx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
		var ctx = isCanvasSupported ? this._preRenderCtx : targetCtx;
		var totalDataSeries = plotUnit.dataSeriesIndexes.length;

		if (totalDataSeries <= 0)
			return;

		var ghostCtx = this._eventManager.ghostCtx;

		var axisXProps = plotUnit.axisX.lineCoordinates;
		var axisYProps = plotUnit.axisY.lineCoordinates;
		var markers = [];
		var markerPropsColor = null;

		var plotArea = this.plotArea;
		ctx.save();

		if (isCanvasSupported)
			ghostCtx.save();

		ctx.beginPath();
		ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
		ctx.clip();
		//var defaultLineJoinType = ctx.lineJoin;
		//ctx.lineJoin = "round";

		if (isCanvasSupported) {
			ghostCtx.beginPath();
			ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
			ghostCtx.clip();
		}

		for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

			var closingPath = [];

			var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

			var dataSeries = this.data[dataSeriesIndex];

			var dataPoints = dataSeries.dataPoints;

			var seriesId = dataSeries.id;
			this._eventManager.objectMap[seriesId] = {
				objectType: "dataSeries", dataSeriesIndex: dataSeriesIndex
			};

			var hexColor = intToHexColorString(seriesId);
			ghostCtx.fillStyle = hexColor;
			//ghostCtx.lineWidth = dataSeries.lineThickness;
			//ghostCtx.lineWidth = 20;

			markers = [];

			var isFirstDataPointInPlotArea = true;
			var i = 0, x, y1, y2;
			var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number back and forth.

			//var yZeroToPixel = plotUnit.axisY.convertValueToPixel(0);
			//var baseY;

			var startPoint = null;

			if (dataPoints.length > 0) {
				//ctx.strokeStyle = "#4572A7 ";                
				var color = dataSeries._colorSet[i % dataSeries._colorSet.length];
				//ctx.strokeStyle = "red";
				var lineColor = dataSeries.lineColor = dataSeries.options.lineColor || color;
				var currentStrokeStyle = lineColor;
				ctx.fillStyle = color;
				ctx.strokeStyle = lineColor;
				ctx.lineWidth = dataSeries.lineThickness;
				var currentLineDashType = "solid";

				if (ctx.setLineDash) {
					var nullDataLineDashType = getLineDashArray(dataSeries.nullDataLineDashType, dataSeries.lineThickness);
					currentLineDashType = dataSeries.lineDashType;
					var lineDashType = getLineDashArray(currentLineDashType, dataSeries.lineThickness);
					ctx.setLineDash(lineDashType);
				}

				var prevDataNull = true;
				for (; i < dataPoints.length; i++) {

					dataPointX = dataPoints[i].x.getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;

					if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax && !(dataSeries.connectNullData && prevDataNull)) {
						continue;
					}

					if (dataPoints[i].y === null || !dataPoints[i].y.length
						|| typeof (dataPoints[i].y[0]) !== "number" || typeof (dataPoints[i].y[1]) !== "number") {

						if (!(prevDataNull || isFirstDataPointInPlotArea))
							closeArea();

						prevDataNull = true;
						continue;
					}

					x = plotUnit.axisX.convertValueToPixel(dataPointX);

					y1 = plotUnit.axisY.convertValueToPixel(dataPoints[i].y[0]);
					y2 = plotUnit.axisY.convertValueToPixel(dataPoints[i].y[1]);

					if (isFirstDataPointInPlotArea || prevDataNull) {

						if (dataSeries.connectNullData && !isFirstDataPointInPlotArea) {
							if (ctx.setLineDash && (dataSeries.options.nullDataLineDashType || (currentLineDashType === dataSeries.lineDashType && dataSeries.lineDashType !== dataSeries.nullDataLineDashType))) {
								closingPath[closingPath.length - 1].newLineDashArray = lineDashType;
								currentLineDashType = dataSeries.nullDataLineDashType;
								ctx.setLineDash(nullDataLineDashType);
							}

							ctx.lineTo(x, y1);
							if (isCanvasSupported)
								ghostCtx.lineTo(x, y1);
							closingPath.push({ x: x, y: y2 });

						} else {

							ctx.beginPath();
							ctx.moveTo(x, y1);
							startPoint = {
								x: x, y: y1
							};
							closingPath = [];
							closingPath.push({ x: x, y: y2 });

							if (isCanvasSupported) {
								ghostCtx.beginPath();
								ghostCtx.moveTo(x, y1);
							}
						}

						isFirstDataPointInPlotArea = false;
						prevDataNull = false;

					}
					else {

						ctx.lineTo(x, y1);
						closingPath.push({ x: x, y: y2 });

						if (isCanvasSupported)
							ghostCtx.lineTo(x, y1);

						if (i % 250 == 0) {
							closeArea();
						}
					}


					var id = dataSeries.dataPointIds[i];
					this._eventManager.objectMap[id] = {
						id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x, y1: y1, y2: y2
					};

					if (i < dataPoints.length - 1) {

						if (currentStrokeStyle !== (dataPoints[i].lineColor || lineColor) || currentLineDashType !== (dataPoints[i].lineDashType || dataSeries.lineDashType)) { //Applieng new ctx on DataPoint

							closeArea();

							currentStrokeStyle = dataPoints[i].lineColor || lineColor;
							closingPath[closingPath.length - 1].newStrokeStyle = currentStrokeStyle;
							ctx.strokeStyle = currentStrokeStyle;

							if (ctx.setLineDash)
								if (dataPoints[i].lineDashType) {
									currentLineDashType = dataPoints[i].lineDashType;
									closingPath[closingPath.length - 1].newLineDashArray = getLineDashArray(currentLineDashType, dataSeries.lineThickness);
									ctx.setLineDash(closingPath[closingPath.length - 1].newLineDashArray);
								}
								else {
									currentLineDashType = dataSeries.lineDashType;
									closingPath[closingPath.length - 1].newLineDashArray = lineDashType;
									ctx.setLineDash(lineDashType);
								}
						}
					}

					//Render Marker
					if (dataPoints[i].markerSize !== 0) {
						if (dataPoints[i].markerSize > 0 || dataSeries.markerSize > 0) {
							var markerProps = dataSeries.getMarkerProperties(i, x, y2, ctx);
							markers.push(markerProps);

							//if (!dataSeries.maxWidthInX || markerProps.size > dataSeries.maxWidthInX) {
							//	dataSeries.maxWidthInX = markerProps.size / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);
							//}

							var markerColor = intToHexColorString(id);

							if (isCanvasSupported) {
								markers.push({
									x: x, y: y2, ctx: ghostCtx,
									type: markerProps.type,
									size: markerProps.size,
									color: markerColor,
									borderColor: markerColor,
									borderThickness: markerProps.borderThickness
								});
							}

							markerProps = dataSeries.getMarkerProperties(i, x, y1, ctx);
							markerPropsColor = markerProps.color;
							markers.push(markerProps);



							var markerColor = intToHexColorString(id);

							if (isCanvasSupported) {
								markers.push({
									x: x, y: y1, ctx: ghostCtx,
									type: markerProps.type,
									size: markerProps.size,
									color: markerColor,
									borderColor: markerColor,
									borderThickness: markerProps.borderThickness
								});
							}
						}
					}

					if (dataPoints[i].indexLabel || dataSeries.indexLabel || dataPoints[i].indexLabelFormatter || dataSeries.indexLabelFormatter) {

						this._indexLabels.push({
							chartType: "rangeArea",
							dataPoint: dataPoints[i],
							dataSeries: dataSeries,
							indexKeyword: 0,
							point: {
								x: x, y: y1
							},
							direction: dataPoints[i].y[0] > dataPoints[i].y[1] === plotUnit.axisY.reversed ? -1 : 1,
							color: color
						});

						this._indexLabels.push({
							chartType: "rangeArea",
							dataPoint: dataPoints[i],
							dataSeries: dataSeries,
							indexKeyword: 1,
							point: {
								x: x, y: y2
							},
							direction: dataPoints[i].y[0] > dataPoints[i].y[1] === plotUnit.axisY.reversed ? 1 : -1,
							color: color
						});

					}
				}

				closeArea();

				//startPoint = { x: x, y: y };
				RenderHelper.drawMarkers(markers);
				//dataSeries.markerColor = markerPropsColor;
			}
		}

		//ctx.lineJoin = defaultLineJoinType;

		if (isCanvasSupported) {
			targetCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height);

			ctx.globalCompositeOperation = "source-atop";
			if (plotUnit.axisX.maskCanvas)
				ctx.drawImage(plotUnit.axisX.maskCanvas, 0, 0, this.width, this.height);
			if (plotUnit.axisY.maskCanvas)
				ctx.drawImage(plotUnit.axisY.maskCanvas, 0, 0, this.width, this.height);
			if (this._breaksCanvasCtx)
				this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height);
			ctx.clearRect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
			this._eventManager.ghostCtx.restore();
		}
		ctx.restore();

		function closeArea() {

			if (!startPoint)
				return;

			var point = null;

			if (dataSeries.lineThickness > 0)
				ctx.stroke();

			for (var i = closingPath.length - 1; i >= 0; i--) {
				point = closingPath[i];
				ctx.lineTo(point.x, point.y);
				ghostCtx.lineTo(point.x, point.y);
			}



			ctx.closePath();
			//ctx.lineTo(startPoint.x, startPoint.y);

			ctx.globalAlpha = dataSeries.fillOpacity;
			ctx.fill();
			ctx.globalAlpha = 1;

			ghostCtx.fill();

			//if (isCanvasSupported) {
			//	ghostCtx.lineTo(x, baseY);
			//	ghostCtx.lineTo(startPoint.x, baseY);
			//	ghostCtx.closePath();
			//	ghostCtx.fill();
			//}

			if (dataSeries.lineThickness > 0) {
				ctx.beginPath();
				ctx.moveTo(point.x, point.y);
				for (var i = 0; i < closingPath.length; i++) {
					point = closingPath[i];
					ctx.lineTo(point.x, point.y);
				}

				ctx.stroke();
			}


			ctx.beginPath();
			ctx.moveTo(x, y1);
			ghostCtx.beginPath();
			ghostCtx.moveTo(x, y1);

			startPoint = {
				x: x, y: y1
			};
			closingPath = [];
			closingPath.push({ x: x, y: y2 });
		}

		//ctx.beginPath();
		//source and dest would be same when animation is not enabled
		var animationInfo = {
			source: targetCtx, dest: this.plotArea.ctx, animationCallback: AnimationHelper.xClipAnimation, easingFunction: AnimationHelper.easing.linear, animationBase: 0
		};
		return animationInfo;
	}

	Chart.prototype.renderRangeSplineArea = function (plotUnit) {
		var targetCtx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
		var ctx = isCanvasSupported ? this._preRenderCtx : targetCtx;
		var totalDataSeries = plotUnit.dataSeriesIndexes.length;

		if (totalDataSeries <= 0)
			return;

		var ghostCtx = this._eventManager.ghostCtx;

		var axisXProps = plotUnit.axisX.lineCoordinates;
		var axisYProps = plotUnit.axisY.lineCoordinates;
		var markers = [];
		var markerPropsColor = null;

		var plotArea = this.plotArea;
		ctx.save();

		if (isCanvasSupported)
			ghostCtx.save();

		ctx.beginPath();
		ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
		ctx.clip();

		if (isCanvasSupported) {
			ghostCtx.beginPath();
			ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
			ghostCtx.clip();
		}

		for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

			var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

			var dataSeries = this.data[dataSeriesIndex];

			var dataPoints = dataSeries.dataPoints;

			var seriesId = dataSeries.id;
			this._eventManager.objectMap[seriesId] = {
				objectType: "dataSeries", dataSeriesIndex: dataSeriesIndex
			};

			var hexColor = intToHexColorString(seriesId);
			ghostCtx.fillStyle = hexColor;
			//ghostCtx.lineWidth = dataSeries.lineThickness;
			//ghostCtx.lineWidth = 20;

			markers = [];

			var isFirstDataPointInPlotArea = true;
			var i = 0, x, y1, y2;
			var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number back and forth.

			//var yZeroToPixel = plotUnit.axisY.convertValueToPixel(0);
			//var baseY;

			var startPoint = null;

			var pixelsY1 = [];
			var pixelsY2 = [];

			if (dataPoints.length > 0) {
				//ctx.strokeStyle = "#4572A7 ";                
				var color = dataSeries._colorSet[i % dataSeries._colorSet.length];
				//ctx.strokeStyle = "red";
				var lineColor = dataSeries.lineColor = dataSeries.options.lineColor || color;
				var currentStrokeStyle = lineColor;
				ctx.fillStyle = color;
				//ctx.strokeStyle = lineColor;
				ctx.lineWidth = dataSeries.lineThickness;
				var currentLineDashType = "solid";
				var lineDashType;

				if (ctx.setLineDash) {
					var nullDataLineDashType = getLineDashArray(dataSeries.nullDataLineDashType, dataSeries.lineThickness);
					currentLineDashType = dataSeries.lineDashType;
					lineDashType = getLineDashArray(currentLineDashType, dataSeries.lineThickness);
					//ctx.setLineDash(lineDashType);
				}

				var prevDataNull = false;

				for (; i < dataPoints.length; i++) {

					dataPointX = dataPoints[i].x.getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;

					if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax && !(dataSeries.connectNullData && prevDataNull)) {
						continue;
					}

					if (dataPoints[i].y === null || !dataPoints[i].y.length || typeof (dataPoints[i].y[0]) !== "number" || typeof (dataPoints[i].y[1]) !== "number") {
						if (i > 0 && !prevDataNull) {
							if (dataSeries.connectNullData) {
								if (ctx.setLineDash && pixelsY1.length > 0 && (dataSeries.options.nullDataLineDashType || !dataPoints[i - 1].lineDashType)) {
									pixelsY1[pixelsY1.length - 1].newLineDashArray = nullDataLineDashType;
									currentLineDashType = dataSeries.nullDataLineDashType;
								}
							}
							else {
								renderBezierArea(lineDashType, lineColor);
								pixelsY1 = [];
								pixelsY2 = [];
							}
						}
						prevDataNull = true;
						continue;
					}

					x = plotUnit.axisX.convertValueToPixel(dataPointX);
					y1 = plotUnit.axisY.convertValueToPixel(dataPoints[i].y[0]);
					y2 = plotUnit.axisY.convertValueToPixel(dataPoints[i].y[1]);


					var id = dataSeries.dataPointIds[i];
					this._eventManager.objectMap[id] = {
						id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x, y1: y1, y2: y2
					};

					pixelsY1[pixelsY1.length] = {
						x: x, y: y1
					};
					pixelsY2[pixelsY2.length] = {
						x: x, y: y2
					};

					if (i < dataPoints.length - 1 && (currentStrokeStyle !== (dataPoints[i].lineColor || lineColor) || currentLineDashType !== (dataPoints[i].lineDashType || dataSeries.lineDashType))) { //Applieng new ctx on DataPoint

						currentStrokeStyle = dataPoints[i].lineColor || lineColor;
						pixelsY1[pixelsY1.length - 1].newStrokeStyle = currentStrokeStyle;
						if (ctx.setLineDash)
							if (dataPoints[i].lineDashType) {
								currentLineDashType = dataPoints[i].lineDashType;
								pixelsY1[pixelsY1.length - 1].newLineDashArray = getLineDashArray(currentLineDashType, dataSeries.lineThickness);
							}
							else {
								currentLineDashType = dataSeries.lineDashType;
								pixelsY1[pixelsY1.length - 1].newLineDashArray = lineDashType;
							}
					}

					//Render Marker
					if (dataPoints[i].markerSize !== 0) {
						if (dataPoints[i].markerSize > 0 || dataSeries.markerSize > 0) {
							var markerProps = dataSeries.getMarkerProperties(i, x, y1, ctx);
							markerPropsColor = markerProps.color;
							markers.push(markerProps);

							//if (!dataSeries.maxWidthInX || markerProps.size > dataSeries.maxWidthInX) {
							//	dataSeries.maxWidthInX = markerProps.size / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);
							//}

							var markerColor = intToHexColorString(id);

							if (isCanvasSupported) {
								markers.push({
									x: x, y: y1, ctx: ghostCtx,
									type: markerProps.type,
									size: markerProps.size,
									color: markerColor,
									borderColor: markerColor,
									borderThickness: markerProps.borderThickness
								});
							}

							var markerProps = dataSeries.getMarkerProperties(i, x, y2, ctx);
							markers.push(markerProps);

							//if (!dataSeries.maxWidthInX || markerProps.size > dataSeries.maxWidthInX) {
							//	dataSeries.maxWidthInX = markerProps.size / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);
							//}

							var markerColor = intToHexColorString(id);

							if (isCanvasSupported) {
								markers.push({
									x: x, y: y2, ctx: ghostCtx,
									type: markerProps.type,
									size: markerProps.size,
									color: markerColor,
									borderColor: markerColor,
									borderThickness: markerProps.borderThickness
								});
							}
						}
					}


					//Render Index Labels
					if (dataPoints[i].indexLabel || dataSeries.indexLabel || dataPoints[i].indexLabelFormatter || dataSeries.indexLabelFormatter) {

						this._indexLabels.push({
							chartType: "rangeSplineArea",
							dataPoint: dataPoints[i],
							dataSeries: dataSeries,
							indexKeyword: 0,
							point: {
								x: x, y: y1
							},
							direction: dataPoints[i].y[0] <= dataPoints[i].y[1] ? -1 : 1,
							color: color
						});

						this._indexLabels.push({
							chartType: "rangeSplineArea",
							dataPoint: dataPoints[i],
							dataSeries: dataSeries,
							indexKeyword: 1,
							point: {
								x: x, y: y2
							},
							direction: dataPoints[i].y[0] <= dataPoints[i].y[1] ? 1 : -1,
							color: color
						});

					}

					isFirstDataPointInPlotArea = false;
					prevDataNull = false;
				}

				renderBezierArea(lineDashType, lineColor);

				RenderHelper.drawMarkers(markers);
				//dataSeries.markerColor = markerPropsColor;
			}
		}

		if (isCanvasSupported) {
			targetCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height);

			ctx.globalCompositeOperation = "source-atop";
			if (plotUnit.axisX.maskCanvas)
				ctx.drawImage(plotUnit.axisX.maskCanvas, 0, 0, this.width, this.height);
			if (plotUnit.axisY.maskCanvas)
				ctx.drawImage(plotUnit.axisY.maskCanvas, 0, 0, this.width, this.height);
			if (this._breaksCanvasCtx)
				this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height);
			ctx.clearRect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);

			this._eventManager.ghostCtx.restore();
		}
		ctx.restore();

		function renderBezierArea(lineDashType, lineColor) {

			var bp = getBezierPoints(pixelsY1, 2);

			if (bp.length > 0) {

				if (dataSeries.lineThickness > 0) {
					ctx.strokeStyle = lineColor;
					if (ctx.setLineDash)
						ctx.setLineDash(lineDashType);
					ctx.beginPath();
					ctx.moveTo(bp[0].x, bp[0].y);
					for (var i = 0; i < bp.length - 3; i += 3) {

						if (bp[i].newStrokeStyle || bp[i].newLineDashArray) {
							ctx.stroke();
							ctx.beginPath();
							ctx.moveTo(bp[i].x, bp[i].y);
							if (bp[i].newStrokeStyle)
								ctx.strokeStyle = bp[i].newStrokeStyle;
							if (bp[i].newLineDashArray)
								ctx.setLineDash(bp[i].newLineDashArray);
						}

						ctx.bezierCurveTo(bp[i + 1].x, bp[i + 1].y, bp[i + 2].x, bp[i + 2].y, bp[i + 3].x, bp[i + 3].y);

					}
					ctx.stroke();
				}

				ctx.beginPath();
				ctx.moveTo(bp[0].x, bp[0].y);

				if (isCanvasSupported) {
					ghostCtx.beginPath();
					ghostCtx.moveTo(bp[0].x, bp[0].y);
				}

				for (var i = 0; i < bp.length - 3; i += 3) {

					ctx.bezierCurveTo(bp[i + 1].x, bp[i + 1].y, bp[i + 2].x, bp[i + 2].y, bp[i + 3].x, bp[i + 3].y);

					if (isCanvasSupported)
						ghostCtx.bezierCurveTo(bp[i + 1].x, bp[i + 1].y, bp[i + 2].x, bp[i + 2].y, bp[i + 3].x, bp[i + 3].y);
				}




				bp = getBezierPoints(pixelsY2, 2);

				ctx.lineTo(pixelsY2[pixelsY2.length - 1].x, pixelsY2[pixelsY2.length - 1].y);

				for (var i = bp.length - 1; i > 2; i -= 3) {

					ctx.bezierCurveTo(bp[i - 1].x, bp[i - 1].y, bp[i - 2].x, bp[i - 2].y, bp[i - 3].x, bp[i - 3].y);

					if (isCanvasSupported)
						ghostCtx.bezierCurveTo(bp[i - 1].x, bp[i - 1].y, bp[i - 2].x, bp[i - 2].y, bp[i - 3].x, bp[i - 3].y);
				}

				ctx.closePath();

				ctx.globalAlpha = dataSeries.fillOpacity;
				ctx.fill();
				if (isCanvasSupported) {
					ghostCtx.closePath();
					ghostCtx.fill();
				}

				ctx.globalAlpha = 1;


				if (dataSeries.lineThickness > 0) {
					ctx.strokeStyle = lineColor;
					if (ctx.setLineDash)
						ctx.setLineDash(lineDashType);
					ctx.beginPath();
					ctx.moveTo(bp[0].x, bp[0].y);
					for (var i = 0, j = 0; i < bp.length - 3; i += 3, j++) {

						if (pixelsY1[j].newStrokeStyle || pixelsY1[j].newLineDashArray) {
							ctx.stroke();
							ctx.beginPath();
							ctx.moveTo(bp[i].x, bp[i].y);
							if (pixelsY1[j].newStrokeStyle)
								ctx.strokeStyle = pixelsY1[j].newStrokeStyle;
							if (pixelsY1[j].newLineDashArray)
								ctx.setLineDash(pixelsY1[j].newLineDashArray);
						}

						ctx.bezierCurveTo(bp[i + 1].x, bp[i + 1].y, bp[i + 2].x, bp[i + 2].y, bp[i + 3].x, bp[i + 3].y);

					}
					ctx.stroke();
				}

				ctx.beginPath();



			}
		}

		//source and dest would be same when animation is not enabled
		var animationInfo = {
			source: targetCtx, dest: this.plotArea.ctx, animationCallback: AnimationHelper.xClipAnimation, easingFunction: AnimationHelper.easing.linear, animationBase: 0
		};
		return animationInfo;
	}

	Chart.prototype.renderWaterfall = function (plotUnit) {
		var targetCtx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
		var ctx = isCanvasSupported ? this._preRenderCtx : targetCtx;
		var totalDataSeries = plotUnit.dataSeriesIndexes.length;

		if (totalDataSeries <= 0)
			return;

		var ghostCtx = this._eventManager.ghostCtx;

		var color = null;

		var plotArea = this.plotArea;

		var i = 0, x, y1, y2;
		var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number from dataTime everytime it is used.

		var yZeroToPixel = plotUnit.axisY.convertValueToPixel(plotUnit.axisY.logarithmic ? plotUnit.axisY.viewportMinimum : 0);

		var minBarWidth = this.dataPointMinWidth ? this.dataPointMinWidth : this.dataPointWidth ? this.dataPointWidth : 1;
		var maxBarWidth = this.dataPointMaxWidth ? this.dataPointMaxWidth : this.dataPointWidth ? this.dataPointWidth : Math.min((this.width * .15), this.plotArea.width / plotUnit.plotType.totalDataSeries * .9) << 0;

		var xMinDiff = plotUnit.axisX.dataInfo.minDiff;

		if (!isFinite(xMinDiff))
			xMinDiff = Math.abs(plotUnit.axisX.range) * .3;

		var barWidth = this.dataPointWidth ? this.dataPointWidth : (plotArea.width * (plotUnit.axisX.logarithmic ? Math.log(xMinDiff) / Math.log(plotUnit.axisX.range) : Math.abs(xMinDiff) / Math.abs(plotUnit.axisX.range)) / plotUnit.plotType.totalDataSeries * .6) << 0;

		if (this.dataPointMaxWidth && minBarWidth > maxBarWidth)
			minBarWidth = Math.min(this.dataPointWidth ? this.dataPointWidth : Infinity, maxBarWidth);

		if (!this.dataPointMaxWidth && this.dataPointMinWidth && maxBarWidth < minBarWidth)
			maxBarWidth = Math.max(this.dataPointWidth ? this.dataPointWidth : -Infinity, minBarWidth);

		if (barWidth < minBarWidth)
			barWidth = minBarWidth;

		if (barWidth > maxBarWidth)
			barWidth = maxBarWidth;

		ctx.save();
		if (isCanvasSupported)
			this._eventManager.ghostCtx.save();

		ctx.beginPath();
		ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
		ctx.clip();

		if (isCanvasSupported) {
			this._eventManager.ghostCtx.beginPath();
			this._eventManager.ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
			this._eventManager.ghostCtx.clip();
		}
		//ctx.beginPath();

		for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

			var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

			var dataSeries = this.data[dataSeriesIndex];
			var dataPoints = dataSeries.dataPoints;
			//var isFirstDataPointInPlotArea = true;

			color = dataSeries._colorSet[0];
			dataSeries.risingColor = dataSeries.options.risingColor ? dataSeries.options.risingColor : color;
			dataSeries.fallingColor = dataSeries.options.fallingColor ? dataSeries.options.fallingColor : "#e40a0a";

			var currentLineThickness = typeof dataSeries.options.lineThickness === "number" ? Math.round(dataSeries.lineThickness) : 1;
			var currentLineOffset = Math.round(currentLineThickness) % 2 === 1 ? -0.5 : 0;

			// Reducing pixelPerUnit by 1 just to overcome any problems due to rounding off of pixels.
			//dataSeries.maxWidthInX = barWidth / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);

			//var offsetX = barWidth * plotUnit.index << 0;


			if (dataPoints.length > 0) {
				var bevelEnabled = (barWidth > 5) && dataSeries.bevelEnabled ? true : false;
				var prevDataNull = false;
				var prevX = null;
				var prevY = null;

				for (i = 0; i < dataPoints.length; i++) {

					dataPoints[i].getTime ? dataPointX = dataPoints[i].x.getTime() : dataPointX = dataPoints[i].x;

					//if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) {
					//    continue;
					//}

					if (typeof (dataPoints[i].y) !== "number") {
						if (i > 0 && !prevDataNull && dataSeries.connectNullData) {
							var nullDataLineDashType = dataSeries.options.nullDataLineDashType || !dataPoints[i - 1].lineDashType ? dataSeries.nullDataLineDashType : dataPoints[i - 1].lineDashType;
						}

						prevDataNull = true;
						continue;
					}

					x = plotUnit.axisX.convertValueToPixel(dataPointX);

					y1 = dataSeries.dataPointEOs[i].cumulativeSum === 0 ? yZeroToPixel : plotUnit.axisY.convertValueToPixel(dataSeries.dataPointEOs[i].cumulativeSum);
					y2 = dataSeries.dataPointEOs[i].cumulativeSumYStartValue === 0 ? yZeroToPixel : plotUnit.axisY.convertValueToPixel(dataSeries.dataPointEOs[i].cumulativeSumYStartValue);

					//var x1 = x - barWidth / 2 << 0;
					var x1 = plotUnit.axisX.reversed ? x + (plotUnit.plotType.totalDataSeries * barWidth / 2) - ((plotUnit.previousDataSeriesCount + j) * barWidth) << 0 : x - (plotUnit.plotType.totalDataSeries * barWidth / 2) + ((plotUnit.previousDataSeriesCount + j) * barWidth) << 0;
					var x2 = plotUnit.axisX.reversed ? x1 - barWidth << 0 : x1 + barWidth << 0;

					if (y1 > y2) {
						var temp = y1;
						y1 = y2;
						y2 = temp;
					}

					if (plotUnit.axisY.reversed) {
						var temp = y1;
						y1 = y2;
						y2 = temp;
					}

					var id = dataSeries.dataPointIds[i];
					this._eventManager.objectMap[id] = {
						id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x1, y1: y1, x2: x2, y2: y2
					};

					//var borderThickness = Math.max(1, (barWidth * .1 << 0));
					var borderThickness = 0;

					// // color = dataPoints[i].color ? dataPoints[i].color : dataSeries._colorSet[i % dataSeries._colorSet.length];

					var barColor = dataPoints[i].color ? dataPoints[i].color : dataPoints[i].y > -1 ? dataSeries.risingColor : dataSeries.fallingColor;

					drawRect(ctx, x1, y1, x2, y2, barColor, borderThickness, barColor, bevelEnabled, bevelEnabled, false, false, dataSeries.fillOpacity);
					color = intToHexColorString(id);

					if (isCanvasSupported)
						drawRect(this._eventManager.ghostCtx, x1, y1, x2, y2, color, 0, null, false, false, false, false);

					//var prevX;
					//var prevY;
					var currentX;
					var currentY;

					currentX = x1;

					if ((typeof dataPoints[i].isIntermediateSum !== "undefined" && dataPoints[i].isIntermediateSum === true) || (typeof dataPoints[i].isCumulativeSum !== "undefined" && dataPoints[i].isCumulativeSum === true))
						currentY = dataPoints[i].y > -1 ? y1 : y2;
					else
						currentY = dataPoints[i].y > -1 ? y2 : y1;

					if (i > 0 && prevX) {
						if (!prevDataNull || dataSeries.connectNullData) {

							if (prevDataNull) {
								if (ctx.setLineDash) {
									ctx.setLineDash(getLineDashArray(nullDataLineDashType, currentLineThickness));
								}
							}

							ctx.beginPath();
							ctx.moveTo(prevX, prevY - currentLineOffset);
							ctx.lineTo(currentX, currentY - currentLineOffset);
							if (currentLineThickness > 0)
								ctx.stroke();

							if (isCanvasSupported) {
								ghostCtx.beginPath();
								ghostCtx.moveTo(prevX, prevY - currentLineOffset);
								ghostCtx.lineTo(currentX, currentY - currentLineOffset);
								if (currentLineThickness > 0)
									ghostCtx.stroke();
							}
						}
					}

					prevDataNull = false;

					prevX = x2;
					prevY = dataPoints[i].y > -1 ? y1 : y2;

					var currentLineDashType = dataPoints[i].lineDashType ? dataPoints[i].lineDashType : dataSeries.options.lineDashType ? dataSeries.options.lineDashType : "shortDash";
					var currentStrokeStyle = dataPoints[i].lineColor ? dataPoints[i].lineColor : dataSeries.options.lineColor ? dataSeries.options.lineColor : "#9e9e9e";
					ctx.strokeStyle = currentStrokeStyle;

					ctx.lineWidth = currentLineThickness;

					if (ctx.setLineDash) {
						var lineDashType = getLineDashArray(currentLineDashType, currentLineThickness);
						ctx.setLineDash(lineDashType);
					}


					if (dataPoints[i].indexLabel || dataSeries.indexLabel || dataPoints[i].indexLabelFormatter || dataSeries.indexLabelFormatter) {

						this._indexLabels.push({
							chartType: "waterfall",
							dataPoint: dataPoints[i],
							dataSeries: dataSeries,
							point: {
								x: x1 + (x2 - x1) / 2, y: dataPoints[i].y >= 0 ? y1 : y2
							},
							direction: dataPoints[i].y < 0 === plotUnit.axisY.reversed ? 1 : -1,
							bounds: {
								x1: x1, y1: Math.min(y1, y2), x2: x2, y2: Math.max(y1, y2)
							},
							color: color
						});
					}
				}
			}
		}

		if (isCanvasSupported) {
			targetCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height);

			ctx.globalCompositeOperation = "source-atop";
			if (plotUnit.axisX.maskCanvas)
				ctx.drawImage(plotUnit.axisX.maskCanvas, 0, 0, this.width, this.height);
			if (plotUnit.axisY.maskCanvas)
				ctx.drawImage(plotUnit.axisY.maskCanvas, 0, 0, this.width, this.height);
			if (this._breaksCanvasCtx)
				this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height);
			ctx.clearRect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);

			this._eventManager.ghostCtx.restore();
		}
		ctx.restore();


		//source and dest would be same when animation is not enabled
		var animationInfo = {
			source: targetCtx, dest: this.plotArea.ctx, animationCallback: AnimationHelper.fadeInAnimation, easingFunction: AnimationHelper.easing.easeInQuad, animationBase: 0
		};
		return animationInfo;
	}


	//#region pieChart

	var drawSegment = function (ctx, center, radius, color, type, theta1, theta2, fillOpacity, percentInnerRadius) {
		if (radius < 0)
			return;
		if (typeof (fillOpacity) === "undefined")
			fillOpacity = 1;

		//IE8- FIX: In IE8- segment doesn't get draw if theta2 is equal to theta1 + 2*PI.
		if (!isCanvasSupported) {
			var theta2Mod = Number((theta2 % (2 * Math.PI)).toFixed(8));
			var theta1Mod = Number((theta1 % (2 * Math.PI)).toFixed(8));
			if (theta1Mod === theta2Mod)
				theta2 -= .0001;
		}

		ctx.save();
		ctx.globalAlpha = fillOpacity;

		if (type === "pie") {
			ctx.beginPath();
			ctx.moveTo(center.x, center.y);
			ctx.arc(center.x, center.y, radius, theta1, theta2, false);
			ctx.fillStyle = color;
			ctx.strokeStyle = "white";
			ctx.lineWidth = 2;
			//    ctx.shadowOffsetX = 2;
			//    ctx.shadowOffsetY = 1;
			//     ctx.shadowBlur = 2;
			//    ctx.shadowColor = '#BFBFBF';
			ctx.closePath();
			//ctx.stroke();
			ctx.fill();
		}
		else if (type === "doughnut") {
			ctx.beginPath();
			ctx.arc(center.x, center.y, radius, theta1, theta2, false);
			if (percentInnerRadius >= 0)
				ctx.arc(center.x, center.y, percentInnerRadius * radius, theta2, theta1, true);
			ctx.closePath();
			ctx.fillStyle = color;
			ctx.strokeStyle = "white";
			ctx.lineWidth = 2;
			// shadow properties
			//     ctx.shadowOffsetX = 1;
			//    ctx.shadowOffsetY = 1;
			//     ctx.shadowBlur = 1;
			//    ctx.shadowColor = '#BFBFBF';  //grey shadow
			//ctx.stroke();
			ctx.fill();
		}

		ctx.globalAlpha = 1;

		ctx.restore();
	};

	function convertPercentToValue(input, referenceValue, defaultValue, max, min) {
		//input can be a number or string
		if (input === null || typeof (input) === "undefined")
			return typeof defaultValue === "undefined" ? referenceValue : defaultValue;

		var result = parseFloat(input.toString()) * (input.toString().indexOf("%") >= 0 ? referenceValue / 100 : 1);
		if (typeof max !== "undefined") {
			result = Math.min(max, result);
			if (typeof min !== "undefined")
				result = Math.max(min, result);
		}
		// limit to plot area
		if (!isNaN(result) && result <= referenceValue && result >= 0)
			return result;

		return typeof defaultValue === "undefined" ? referenceValue : defaultValue;
	}

	Chart.prototype.renderPie = function (plotUnit) {
		var _this = this;
		var totalDataSeries = plotUnit.dataSeriesIndexes.length;

		if (totalDataSeries <= 0)
			return;

		var dataSeriesIndex = plotUnit.dataSeriesIndexes[0];
		var dataSeries = this.data[dataSeriesIndex];
		var dataPoints = dataSeries.dataPoints;
		var indexLabelLineEdgeLength = 10;
		var explodeDuration = 500;

		var plotArea = this.plotArea;

		//var maxFrame = isCanvasSupported ? 300 : 4;
		//var totalRecursions = 0;

		//var dataPointEOs = [];
		var dataPointEOs = dataSeries.dataPointEOs; //dataPoint Extension Objects Behaves like a storage place for all additional data relating to dataPoints. Requred because actual dataPoints should not be modified.

		var minDistanceBetweenLabels = 2;
		var indexLabelRadius;
		var indexLabelRadiusToRadiusRatio = 1.3;
		var poleAnglularDistance = (20 / 180) * Math.PI; //Anglular Distance from 90 & 270 to be considered pole
		var precision = 6;

		var center = {
			x: (plotArea.x2 + plotArea.x1) / 2, y: (plotArea.y2 + plotArea.y1) / 2
		};

		var sum = 0;
		var isIndexLabelPresent = false;
		for (var j = 0; j < dataPoints.length; j++) {
			sum += Math.abs(dataPoints[j].y);

			if (!isIndexLabelPresent && typeof (dataPoints[j].indexLabel) !== "undefined" && dataPoints[j].indexLabel !== null && dataPoints[j].indexLabel.toString().length > 0)
				isIndexLabelPresent = true;

			if (!isIndexLabelPresent && typeof (dataPoints[j].label) !== "undefined" && dataPoints[j].label !== null && dataPoints[j].label.toString().length > 0)
				isIndexLabelPresent = true;
		}

		if (sum === 0)
			return;

		isIndexLabelPresent = isIndexLabelPresent || (typeof (dataSeries.indexLabel) !== "undefined" && dataSeries.indexLabel !== null && dataSeries.indexLabel.toString().length > 0);

		var outerRadius = dataSeries.indexLabelPlacement !== "inside" && isIndexLabelPresent ? (Math.min(plotArea.width, plotArea.height) * 0.75) / 2 : (Math.min(plotArea.width, plotArea.height) * .92) / 2;

		if (dataSeries.radius)
			outerRadius = convertPercentToValue(dataSeries.radius, outerRadius);


		var innerRadius = (typeof dataSeries.innerRadius !== 'undefined' && dataSeries.innerRadius !== null) ? convertPercentToValue(dataSeries.innerRadius, outerRadius) : 0.7 * outerRadius;

		dataSeries.radius = outerRadius;

		if (dataSeries.type === "doughnut")
			dataSeries.innerRadius = innerRadius;

		var percentInnerRadius = Math.min(innerRadius / outerRadius, (outerRadius - 1) / outerRadius);

		function initLabels() {

			if (!dataSeries || !dataPoints)
				return;


			var noDPNearSouthPole = 0;
			var noDPNearNorthPole = 0;
			var firstDPCloseToSouth = 0;
			var firstDPCloseToNorth = 0;

			for (var j = 0; j < dataPoints.length; j++) {

				var dataPoint = dataPoints[j];
				var id = dataSeries.dataPointIds[j];

				//var dataPointEO = {
				//	id: id, objectType: "dataPoint", dataPointIndex: j, dataSeriesIndex: 0
				//};
				//dataPointEOs.push(dataPointEO);

				dataPointEOs[j].id = id;
				dataPointEOs[j].objectType = "dataPoint";
				dataPointEOs[j].dataPointIndex = j;
				dataPointEOs[j].dataSeriesIndex = 0;

				var dataPointEO = dataPointEOs[j];

				var percentAndTotal = {
					percent: null, total: null
				};
				var formatterParameter = null;

				percentAndTotal = _this.getPercentAndTotal(dataSeries, dataPoint);

				if (dataSeries.indexLabelFormatter || dataPoint.indexLabelFormatter)
					formatterParameter = {
						chart: _this.options, dataSeries: dataSeries, dataPoint: dataPoint, total: percentAndTotal.total, percent: percentAndTotal.percent
					};

				var indexLabelText = dataPoint.indexLabelFormatter ? dataPoint.indexLabelFormatter(formatterParameter)
					: dataPoint.indexLabel ? _this.replaceKeywordsWithValue(dataPoint.indexLabel, dataPoint, dataSeries, j)
						: dataSeries.indexLabelFormatter ? dataSeries.indexLabelFormatter(formatterParameter)
							: dataSeries.indexLabel ? _this.replaceKeywordsWithValue(dataSeries.indexLabel, dataPoint, dataSeries, j) : dataPoint.label ? dataPoint.label : '';

				_this._eventManager.objectMap[id] = dataPointEO;

				//dataPointEO.indexLabelText = j.toString() + " " + "kingfisher: " + dataPoint.y.toString();;
				dataPointEO.center = {
					x: center.x, y: center.y
				};
				dataPointEO.y = dataPoint.y;
				dataPointEO.radius = outerRadius;
				dataPointEO.percentInnerRadius = percentInnerRadius;
				dataPointEO.indexLabelText = indexLabelText;
				dataPointEO.indexLabelPlacement = dataSeries.indexLabelPlacement;
				dataPointEO.indexLabelLineColor = dataPoint.indexLabelLineColor ? dataPoint.indexLabelLineColor : dataSeries.options.indexLabelLineColor ? dataSeries.options.indexLabelLineColor : dataPoint.color ? dataPoint.color : dataSeries._colorSet[j % dataSeries._colorSet.length];
				dataPointEO.indexLabelLineThickness = (!isNullOrUndefined(dataPoint.indexLabelLineThickness)) ? dataPoint.indexLabelLineThickness : dataSeries.indexLabelLineThickness;
				dataPointEO.indexLabelLineDashType = dataPoint.indexLabelLineDashType ? dataPoint.indexLabelLineDashType : dataSeries.indexLabelLineDashType;
				dataPointEO.indexLabelFontColor = dataPoint.indexLabelFontColor ? dataPoint.indexLabelFontColor : dataSeries.indexLabelFontColor;
				dataPointEO.indexLabelFontStyle = dataPoint.indexLabelFontStyle ? dataPoint.indexLabelFontStyle : dataSeries.indexLabelFontStyle;
				dataPointEO.indexLabelFontWeight = dataPoint.indexLabelFontWeight ? dataPoint.indexLabelFontWeight : dataSeries.indexLabelFontWeight;
				dataPointEO.indexLabelFontSize = !isNullOrUndefined(dataPoint.indexLabelFontSize) ? dataPoint.indexLabelFontSize : dataSeries.indexLabelFontSize;
				dataPointEO.indexLabelFontFamily = dataPoint.indexLabelFontFamily ? dataPoint.indexLabelFontFamily : dataSeries.indexLabelFontFamily;
				dataPointEO.indexLabelBackgroundColor = dataPoint.indexLabelBackgroundColor ? dataPoint.indexLabelBackgroundColor : dataSeries.options.indexLabelBackgroundColor ? dataSeries.options.indexLabelBackgroundColor : dataSeries.indexLabelBackgroundColor;
				dataPointEO.indexLabelMaxWidth = dataPoint.indexLabelMaxWidth ? dataPoint.indexLabelMaxWidth : dataSeries.indexLabelMaxWidth ? dataSeries.indexLabelMaxWidth : plotArea.width * .33;
				dataPointEO.indexLabelWrap = typeof (dataPoint.indexLabelWrap) !== "undefined" ? dataPoint.indexLabelWrap : dataSeries.indexLabelWrap;

				dataPointEO.startAngle = j === 0 ? dataSeries.startAngle ? (dataSeries.startAngle / 180) * Math.PI : 0 : dataPointEOs[j - 1].endAngle;

				dataPointEO.startAngle = (dataPointEO.startAngle + (2 * Math.PI)) % (2 * Math.PI);

				dataPointEO.endAngle = dataPointEO.startAngle + ((2 * Math.PI / sum) * Math.abs(dataPoint.y));

				//var midAngle = dataPointEO.startAngle + Math.abs(dataPointEO.endAngle - dataPointEO.startAngle) / 2;
				var midAngle = (dataPointEO.endAngle + dataPointEO.startAngle) / 2;

				//var midAngle = (180 / Math.PI * midAngle);

				midAngle = (midAngle + (2 * Math.PI)) % (2 * Math.PI);

				dataPointEO.midAngle = midAngle;

				if (dataPointEO.midAngle > (Math.PI / 2) - poleAnglularDistance && dataPointEO.midAngle < (Math.PI / 2) + poleAnglularDistance) {
					if (noDPNearSouthPole === 0 || dataPointEOs[firstDPCloseToSouth].midAngle > dataPointEO.midAngle)
						firstDPCloseToSouth = j;

					noDPNearSouthPole++;
				}
				else if (dataPointEO.midAngle > (3 * Math.PI / 2) - poleAnglularDistance && dataPointEO.midAngle < (3 * Math.PI / 2) + poleAnglularDistance) {
					if (noDPNearNorthPole === 0 || dataPointEOs[firstDPCloseToNorth].midAngle > dataPointEO.midAngle)
						firstDPCloseToNorth = j;

					noDPNearNorthPole++;
				}


				if (midAngle > (Math.PI / 2) && midAngle <= (3 * Math.PI / 2))
					dataPointEO.hemisphere = "left";
				else
					dataPointEO.hemisphere = "right";

				//dataPointEO.indexLabelText = j.toString() + "; " + dataPoint.y.toString() + "; " + midAngle.toString() + "; junk";				
				dataPointEO.indexLabelTextBlock = new TextBlock(_this.plotArea.ctx, {
					fontSize: dataPointEO.indexLabelFontSize, fontFamily: dataPointEO.indexLabelFontFamily, fontColor: dataPointEO.indexLabelFontColor,
					fontStyle: dataPointEO.indexLabelFontStyle, fontWeight: dataPointEO.indexLabelFontWeight,
					horizontalAlign: "left",
					backgroundColor: dataPointEO.indexLabelBackgroundColor,
					maxWidth: dataPointEO.indexLabelMaxWidth, maxHeight: dataPointEO.indexLabelWrap ? dataPointEO.indexLabelFontSize * 5 : dataPointEO.indexLabelFontSize * 1.5,
					text: dataPointEO.indexLabelText,
					padding: 0,
					//textBaseline: dataPointEO.indexLabelBackgroundColor ? "middle" : "top"
					textBaseline: "top"
				});

				dataPointEO.indexLabelTextBlock.measureText();

				//dataPoint.labelWidth = ctx.measureText(j.toString() + "; " + dataPoint.label).width;
				//console.log(dataPoint.label);
			}

			var noOfDPToRightOfSouthPole = 0;
			var noOfDPToLeftOfNorthPole = 0;
			var keepSameDirection = false; // once a dataPoint's hemisphere is changed, others should follow the same so that there are no labes near pole pointing in opposite direction.

			for (var j = 0; j < dataPoints.length; j++) {

				var dataPointEO = dataPointEOs[(firstDPCloseToSouth + j) % dataPoints.length];

				if (noDPNearSouthPole > 1 && dataPointEO.midAngle > (Math.PI / 2) - poleAnglularDistance && dataPointEO.midAngle < (Math.PI / 2) + poleAnglularDistance) {

					if (noOfDPToRightOfSouthPole <= noDPNearSouthPole / 2 && !keepSameDirection) {
						dataPointEO.hemisphere = "right";
						noOfDPToRightOfSouthPole++;
					}
					else {
						dataPointEO.hemisphere = "left";
						keepSameDirection = true;
					}
				}
			}

			keepSameDirection = false;
			for (var j = 0; j < dataPoints.length; j++) {

				var dataPointEO = dataPointEOs[(firstDPCloseToNorth + j) % dataPoints.length];

				//if (dataPoint.hemisphere = "right")
				//	break;

				if (noDPNearNorthPole > 1 && dataPointEO.midAngle > (3 * Math.PI / 2) - poleAnglularDistance && dataPointEO.midAngle < (3 * Math.PI / 2) + poleAnglularDistance) {

					if (noOfDPToLeftOfNorthPole <= noDPNearNorthPole / 2 && !keepSameDirection) {
						dataPointEO.hemisphere = "left";
						noOfDPToLeftOfNorthPole++;
					}
					else {
						dataPointEO.hemisphere = "right";
						keepSameDirection = true;
					}
				}
			}
		}//End of initLabels()

		function renderLabels() {

			var ctx = _this.plotArea.ctx;
			ctx.save();

			ctx.fillStyle = "black";
			ctx.strokeStyle = "grey";
			var fontSize = 16;
			//ctx.font = fontSize + "px Arial";
			ctx.textBaseline = "middle";
			ctx.lineJoin = "round";
			var i = 0, j = 0;

			for (i = 0; i < dataPoints.length; i++) {
				var dataPointEO = dataPointEOs[i];

				if (!dataPointEO.indexLabelText)
					continue;

				dataPointEO.indexLabelTextBlock.y -= dataPointEO.indexLabelTextBlock.height / 2;

				var xOffset = 0;

				if (dataPointEO.hemisphere === "left") {
					var xOffset = dataSeries.indexLabelPlacement !== "inside" ? -(dataPointEO.indexLabelTextBlock.width + indexLabelLineEdgeLength) : -dataPointEO.indexLabelTextBlock.width / 2;
				}
				else {
					var xOffset = dataSeries.indexLabelPlacement !== "inside" ? indexLabelLineEdgeLength : -dataPointEO.indexLabelTextBlock.width / 2;
				}

				dataPointEO.indexLabelTextBlock.x += xOffset;
				dataPointEO.indexLabelTextBlock.render(true);
				dataPointEO.indexLabelTextBlock.x -= xOffset;

				//if (i < 4)
				//	customPrompt(i + "; " + center.y + "; " + dataPointEO.indexLabelTextBlock.y.toFixed(2));

				dataPointEO.indexLabelTextBlock.y += dataPointEO.indexLabelTextBlock.height / 2;

				if (dataPointEO.indexLabelPlacement !== "inside" && dataPointEO.indexLabelLineThickness > 0) {
					var indexLabelLineStartX = dataPointEO.center.x + outerRadius * Math.cos(dataPointEO.midAngle);
					var indexLabelLineStartY = dataPointEO.center.y + outerRadius * Math.sin(dataPointEO.midAngle);

					//ctx.strokeStyle = dataPoints[i].color ? dataPoints[i].color : dataSeries._colorSet[i % dataSeries._colorSet.length];
					ctx.strokeStyle = dataPointEO.indexLabelLineColor;
					ctx.lineWidth = dataPointEO.indexLabelLineThickness;

					if (ctx.setLineDash) {
						ctx.setLineDash(getLineDashArray(dataPointEO.indexLabelLineDashType, dataPointEO.indexLabelLineThickness));
					}

					//ctx.lineWidth = 4;
					ctx.beginPath();
					ctx.moveTo(indexLabelLineStartX, indexLabelLineStartY);
					ctx.lineTo(dataPointEO.indexLabelTextBlock.x, dataPointEO.indexLabelTextBlock.y);
					ctx.lineTo(dataPointEO.indexLabelTextBlock.x + (dataPointEO.hemisphere === "left" ? -indexLabelLineEdgeLength : indexLabelLineEdgeLength), dataPointEO.indexLabelTextBlock.y);
					ctx.stroke();
					//ctx.closePath();
					//window.alert("contine??");
					//animate();
				}

				ctx.lineJoin = "miter";
			}

			ctx.save();
		}

		function animate(fractionComplete) {

			var ctx = _this.plotArea.ctx;

			ctx.clearRect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
			ctx.fillStyle = _this.backgroundColor;
			ctx.fillRect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);

			var maxAngle = dataPointEOs[0].startAngle + (2 * Math.PI * fractionComplete);

			for (var i = 0; i < dataPoints.length; i++) {

				var startAngle = i === 0 ? dataPointEOs[i].startAngle : endAngle;
				var endAngle = startAngle + (dataPointEOs[i].endAngle - dataPointEOs[i].startAngle);

				var shouldBreak = false;

				if (endAngle > maxAngle) {
					endAngle = maxAngle;
					shouldBreak = true;
				}

				var color = dataPoints[i].color ? dataPoints[i].color : dataSeries._colorSet[i % dataSeries._colorSet.length];

				if (endAngle > startAngle)
					drawSegment(_this.plotArea.ctx, dataPointEOs[i].center, dataPointEOs[i].radius, color, dataSeries.type, startAngle, endAngle, dataSeries.fillOpacity, dataPointEOs[i].percentInnerRadius);

				if (shouldBreak)
					break;
			}
		}

		function explodeToggle(fractionComplete) {

			var ctx = _this.plotArea.ctx;

			ctx.clearRect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
			ctx.fillStyle = _this.backgroundColor;
			ctx.fillRect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);

			for (var i = 0; i < dataPoints.length; i++) {

				var startAngle = dataPointEOs[i].startAngle;
				var endAngle = dataPointEOs[i].endAngle;

				if (endAngle > startAngle) {


					var offsetX = (outerRadius * .07 * Math.cos(dataPointEOs[i].midAngle));
					var offsetY = (outerRadius * .07 * Math.sin(dataPointEOs[i].midAngle));
					var isInTransition = false;

					if (dataPoints[i].exploded) {
						if (Math.abs(dataPointEOs[i].center.x - (center.x + offsetX)) > 0.000000001 || Math.abs(dataPointEOs[i].center.y - (center.y + offsetY)) > 0.000000001) {

							dataPointEOs[i].center.x = center.x + offsetX * fractionComplete;
							dataPointEOs[i].center.y = center.y + offsetY * fractionComplete;

							isInTransition = true;
						}
					} else if (Math.abs(dataPointEOs[i].center.x - center.x) > 0 || Math.abs(dataPointEOs[i].center.y - center.y) > 0) {
						dataPointEOs[i].center.x = center.x + offsetX * (1 - fractionComplete);
						dataPointEOs[i].center.y = center.y + offsetY * (1 - fractionComplete);

						isInTransition = true;
					}

					if (isInTransition) {
						var entry = {
						};
						entry.dataSeries = dataSeries;
						entry.dataPoint = dataSeries.dataPoints[i];
						entry.index = i;
						_this.toolTip.highlightObjects([entry]);
					}

					var color = dataPoints[i].color ? dataPoints[i].color : dataSeries._colorSet[i % dataSeries._colorSet.length];

					drawSegment(_this.plotArea.ctx, dataPointEOs[i].center, dataPointEOs[i].radius, color, dataSeries.type, startAngle, endAngle, dataSeries.fillOpacity, dataPointEOs[i].percentInnerRadius);
				}
			}

			//window.alert("next??");
			renderLabels();
		}

		function areDataPointsTooClose(first, second) {

			var label1 = {
				x1: first.indexLabelTextBlock.x, y1: first.indexLabelTextBlock.y - first.indexLabelTextBlock.height / 2, x2: first.indexLabelTextBlock.x + first.indexLabelTextBlock.width, y2: first.indexLabelTextBlock.y + first.indexLabelTextBlock.height / 2
			};
			var label2 = {
				x1: second.indexLabelTextBlock.x, y1: second.indexLabelTextBlock.y - second.indexLabelTextBlock.height / 2, x2: second.indexLabelTextBlock.x + second.indexLabelTextBlock.width, y2: second.indexLabelTextBlock.y + second.indexLabelTextBlock.height / 2
			};

			if (label1.x2 < label2.x1 - indexLabelLineEdgeLength || label1.x1 > label2.x2 + indexLabelLineEdgeLength || label1.y1 > label2.y2 + indexLabelLineEdgeLength || label1.y2 < label2.y1 - indexLabelLineEdgeLength)
				return false;

			return true;
		}

		function getVerticalDistanceBetweenLabels(first, second) {

			var distance = 0;
			var label1 = {
				y: first.indexLabelTextBlock.y, y1: first.indexLabelTextBlock.y - first.indexLabelTextBlock.height / 2, y2: first.indexLabelTextBlock.y + first.indexLabelTextBlock.height / 2
			};
			var label2 = {
				y: second.indexLabelTextBlock.y, y1: second.indexLabelTextBlock.y - second.indexLabelTextBlock.height / 2, y2: second.indexLabelTextBlock.y + second.indexLabelTextBlock.height / 2
			};

			if (label2.y > label1.y) {
				distance = label2.y1 - label1.y2;
			}
			else {
				distance = label1.y1 - label2.y2;
			}

			return distance;
		}

		function getNextLabelIndex(currentLabelIndex) {
			var nextLabelIndex = null;

			for (var i = 1; i < dataPoints.length; i++) {

				nextLabelIndex = (currentLabelIndex + i + dataPointEOs.length) % dataPointEOs.length;

				if (dataPointEOs[nextLabelIndex].hemisphere !== dataPointEOs[currentLabelIndex].hemisphere) {
					nextLabelIndex = null;
					break;
				}
				else if ((dataPointEOs[nextLabelIndex].indexLabelText) && (nextLabelIndex !== currentLabelIndex)
					&& ((getVerticalDistanceBetweenLabels(dataPointEOs[nextLabelIndex], dataPointEOs[currentLabelIndex]) < 0) || (dataPointEOs[currentLabelIndex].hemisphere === "right" ? dataPointEOs[nextLabelIndex].indexLabelTextBlock.y >= dataPointEOs[currentLabelIndex].indexLabelTextBlock.y : dataPointEOs[nextLabelIndex].indexLabelTextBlock.y <= dataPointEOs[currentLabelIndex].indexLabelTextBlock.y)))
					break;
				else {
					nextLabelIndex = null;
				}
			}

			return nextLabelIndex;
		}

		function getPreviousLabelIndex(currentLabelIndex) {
			var prevLabelIndex = null;

			for (var i = 1; i < dataPoints.length; i++) {

				prevLabelIndex = (currentLabelIndex - i + dataPointEOs.length) % dataPointEOs.length;

				if (dataPointEOs[prevLabelIndex].hemisphere !== dataPointEOs[currentLabelIndex].hemisphere) {
					prevLabelIndex = null;
					break;
				}
				else if ((dataPointEOs[prevLabelIndex].indexLabelText) && (dataPointEOs[prevLabelIndex].hemisphere === dataPointEOs[currentLabelIndex].hemisphere) && (prevLabelIndex !== currentLabelIndex)
					&& ((getVerticalDistanceBetweenLabels(dataPointEOs[prevLabelIndex], dataPointEOs[currentLabelIndex]) < 0) || (dataPointEOs[currentLabelIndex].hemisphere === "right" ? dataPointEOs[prevLabelIndex].indexLabelTextBlock.y <= dataPointEOs[currentLabelIndex].indexLabelTextBlock.y : dataPointEOs[prevLabelIndex].indexLabelTextBlock.y >= dataPointEOs[currentLabelIndex].indexLabelTextBlock.y)))
					break;
				else {
					prevLabelIndex = null;
				}

			}

			return prevLabelIndex;
		}

		function rePositionLabels(dataPointIndex, offset, recursionCount) {
			recursionCount = (recursionCount || 0) + 1;

			if (recursionCount > 1000)
				return 0;

			offset = offset || 0;

			var actualOffset = 0;

			//var labelYMin = 2;
			//var labelYMax = ctx.canvas.height - 2;
			//var labelYMin = _this.plotArea.ctx.canvas.height / 2 - indexLabelRadius * 1;
			//var labelYMax = _this.plotArea.ctx.canvas.height / 2 + indexLabelRadius * 1;

			var labelYMin = center.y - indexLabelRadius * 1;
			var labelYMax = center.y + indexLabelRadius * 1;

			//console.log(totalRecursions);

			if (dataPointIndex >= 0 && dataPointIndex < dataPoints.length) {

				var dataPointEO = dataPointEOs[dataPointIndex];
				//if (dataPointIndex === 0)
				//	customPrompt(labelYMin.toFixed(2) + "; " + labelYMax.toFixed(2) + "; " + dataPointEO.indexLabelTextBlock.y.toFixed(2));

				// If label is already outside the bounds, return
				if ((offset < 0 && dataPointEO.indexLabelTextBlock.y < labelYMin) || (offset > 0 && dataPointEO.indexLabelTextBlock.y > labelYMax))
					return 0;


				var validOffset = offset;


				//Check if the offset falls within the bounds (labelYMin, labelYMax, tangential bounds) without considering overlap. Else use the closest offset that is possible - validOffset.
				{
					var distFromIndexLineStart = 0;
					var indexLabelLineStartX = 0;
					var indexLabelLineStartY = 0;
					var indexLabelAngle = 0;
					var indexLabelAngleWhenTangent = 0;

					if (validOffset < 0) {
						if (dataPointEO.indexLabelTextBlock.y - dataPointEO.indexLabelTextBlock.height / 2 > labelYMin && dataPointEO.indexLabelTextBlock.y - dataPointEO.indexLabelTextBlock.height / 2 + validOffset < labelYMin)
							validOffset = -(labelYMin - (dataPointEO.indexLabelTextBlock.y - dataPointEO.indexLabelTextBlock.height / 2 + validOffset));
					} else {
						if (dataPointEO.indexLabelTextBlock.y + dataPointEO.indexLabelTextBlock.height / 2 < labelYMin && dataPointEO.indexLabelTextBlock.y + dataPointEO.indexLabelTextBlock.height / 2 + validOffset > labelYMax)
							validOffset = (dataPointEO.indexLabelTextBlock.y + dataPointEO.indexLabelTextBlock.height / 2 + validOffset) - labelYMax;
					}

					var newlabelY = dataPointEO.indexLabelTextBlock.y + validOffset;
					var newlabelX = 0;

					if (dataPointEO.hemisphere === "right") {
						newlabelX = center.x + Math.sqrt(Math.pow(indexLabelRadius, 2) - Math.pow(newlabelY - center.y, 2));
					}
					else
						newlabelX = center.x - Math.sqrt(Math.pow(indexLabelRadius, 2) - Math.pow(newlabelY - center.y, 2));


					indexLabelLineStartX = center.x + outerRadius * Math.cos(dataPointEO.midAngle);
					indexLabelLineStartY = center.y + outerRadius * Math.sin(dataPointEO.midAngle);

					distFromIndexLineStart = Math.sqrt(Math.pow(newlabelX - indexLabelLineStartX, 2) + Math.pow(newlabelY - indexLabelLineStartY, 2));

					indexLabelAngleWhenTangent = Math.acos(outerRadius / indexLabelRadius);

					//indexLabelAngle = Math.acos((outerRadius * outerRadius + distFromIndexLineStart * distFromIndexLineStart - indexLabelRadius * indexLabelRadius) / (2 * outerRadius * distFromIndexLineStart));
					indexLabelAngle = Math.acos((indexLabelRadius * indexLabelRadius + outerRadius * outerRadius - distFromIndexLineStart * distFromIndexLineStart) / (2 * outerRadius * indexLabelRadius));

					if (indexLabelAngle < indexLabelAngleWhenTangent) {
						validOffset = newlabelY - dataPointEO.indexLabelTextBlock.y;
						//dataPointEO.indexLabelTextBlock.x = newlabelX;
					}
					else {

						validOffset = 0;

						//dataPointEO.indexLabelTextBlock.x = newlabelX;

						//Index Line is overlapping the pie. So lets find out the point where indexline becomes a tangent.

						//distFromIndexLineStart = Math.sqrt(indexLabelRadius * indexLabelRadius - outerRadius * outerRadius);
						////distFromIndexLineStart *= offset < 0 ? -1 : 1;
						////indexLabelAngle = Math.acos((indexLabelRadius * indexLabelRadius + outerRadius * outerRadius - distFromIndexLineStart * distFromIndexLineStart) / (2 * outerRadius * indexLabelRadius));
						//indexLabelAngle = Math.atan2(distFromIndexLineStart, outerRadius);

						//newlabelX = center.x + indexLabelRadius * Math.cos(indexLabelAngle);
						//newlabelY = center.y + indexLabelRadius * Math.sin(indexLabelAngle);

						//actualOffset = newlabelY - dataPointEO.indexLabelTextBlock.y;

						//dataPointEO.indexLabelTextBlock.y = newlabelY;
						//dataPointEO.indexLabelTextBlock.x = newlabelX;

					}

				}

				//var tempIndex = (dataPointIndex + dataPointEOs.length - 1) % dataPointEOs.length;

				//var prevDataPointIndex = dataPointEOs[tempIndex].hemisphere === dataPointEO.hemisphere ? tempIndex : null;

				var prevDataPointIndex = getPreviousLabelIndex(dataPointIndex);

				//tempIndex = (dataPointIndex + dataPointEOs.length + 1) % dataPointEOs.length;

				//var nextDataPointIndex = dataPointEOs[tempIndex].hemisphere === dataPointEO.hemisphere ? tempIndex : null;

				var nextDataPointIndex = getNextLabelIndex(dataPointIndex);

				var otherdataPointEO, otherDataPointIndex, distanceFromOtherLabel;
				var otherDataPointOffset = 0;
				var otherDataPointActualOffset = 0;


				if (validOffset < 0) {

					otherDataPointIndex = dataPointEO.hemisphere === "right" ? prevDataPointIndex : nextDataPointIndex;

					actualOffset = validOffset;

					if (otherDataPointIndex !== null) {

						//if (dataPointIndex < 4)
						//	customPrompt("valid: " + validOffset);

						var tempOffset = -validOffset;

						var distanceFromOtherLabel = (dataPointEO.indexLabelTextBlock.y - dataPointEO.indexLabelTextBlock.height / 2) - (dataPointEOs[otherDataPointIndex].indexLabelTextBlock.y + dataPointEOs[otherDataPointIndex].indexLabelTextBlock.height / 2);

						if (distanceFromOtherLabel - tempOffset < minDistanceBetweenLabels) {
							otherDataPointOffset = -tempOffset;
							//totalRecursions++;                            
							otherDataPointActualOffset = rePositionLabels(otherDataPointIndex, otherDataPointOffset, recursionCount + 1);

							//if (dataPointIndex < 4)
							//	customPrompt(dataPointIndex + "; " + "offset: " + otherDataPointOffset);


							if (+otherDataPointActualOffset.toFixed(precision) > +otherDataPointOffset.toFixed(precision)) {

								if (distanceFromOtherLabel > minDistanceBetweenLabels)
									actualOffset = -(distanceFromOtherLabel - minDistanceBetweenLabels);
								//else
								//	actualOffset = 0;
								else
									actualOffset = -(tempOffset - (otherDataPointActualOffset - otherDataPointOffset));
							}

							//if (dataPointIndex < 4)
							//	customPrompt("actual: " + actualOffset);
						}

					}

				} else if (validOffset > 0) {

					otherDataPointIndex = dataPointEO.hemisphere === "right" ? nextDataPointIndex : prevDataPointIndex;

					actualOffset = validOffset;

					if (otherDataPointIndex !== null) {

						var tempOffset = validOffset;

						var distanceFromOtherLabel = (dataPointEOs[otherDataPointIndex].indexLabelTextBlock.y - dataPointEOs[otherDataPointIndex].indexLabelTextBlock.height / 2) - (dataPointEO.indexLabelTextBlock.y + dataPointEO.indexLabelTextBlock.height / 2);

						if (distanceFromOtherLabel - tempOffset < minDistanceBetweenLabels) {
							otherDataPointOffset = tempOffset;
							//totalRecursions++;                            
							otherDataPointActualOffset = rePositionLabels(otherDataPointIndex, otherDataPointOffset, recursionCount + 1);

							if (+otherDataPointActualOffset.toFixed(precision) < +otherDataPointOffset.toFixed(precision)) {

								if (distanceFromOtherLabel > minDistanceBetweenLabels)
									actualOffset = distanceFromOtherLabel - minDistanceBetweenLabels;
								//else
								//	actualOffset = 0;
								else
									actualOffset = tempOffset - (otherDataPointOffset - otherDataPointActualOffset);
							}
						}

					}

					//if (!(dataPointEO.indexLabelTextBlock.y + dataPointEO.indexLabelTextBlock.height / 2 + actualOffset < labelYMax)) {
					//	if (dataPointEO.indexLabelTextBlock.y + dataPointEO.indexLabelTextBlock.height / 2 < labelYMax) {
					//		actualOffset = labelYMax - (dataPointEO.indexLabelTextBlock.y + dataPointEO.indexLabelTextBlock.height / 2);
					//	}
					//	else {
					//		actualOffset = 0;
					//	}
					//}

				}

				if (actualOffset) {

					var newLabelY = dataPointEO.indexLabelTextBlock.y + actualOffset;




					var newLabelX = 0;

					if (dataPointEO.hemisphere === "right") {
						newLabelX = center.x + Math.sqrt(Math.pow(indexLabelRadius, 2) - Math.pow(newLabelY - center.y, 2));
					}
					else
						newLabelX = center.x - Math.sqrt(Math.pow(indexLabelRadius, 2) - Math.pow(newLabelY - center.y, 2));

					if (dataPointEO.midAngle > (Math.PI / 2) - poleAnglularDistance && dataPointEO.midAngle < (Math.PI / 2) + poleAnglularDistance) {

						var prevDPIndex = (dataPointIndex - 1 + dataPointEOs.length) % dataPointEOs.length;
						var prevDP = dataPointEOs[prevDPIndex];
						var nextDP = dataPointEOs[(dataPointIndex + 1 + dataPointEOs.length) % dataPointEOs.length];

						if (dataPointEO.hemisphere === "left" && prevDP.hemisphere === "right" && newLabelX > prevDP.indexLabelTextBlock.x) {
							newLabelX = prevDP.indexLabelTextBlock.x - 15;
						} else if (dataPointEO.hemisphere === "right" && nextDP.hemisphere === "left" && newLabelX < nextDP.indexLabelTextBlock.x) {
							newLabelX = nextDP.indexLabelTextBlock.x + 15;
						}
					} else if (dataPointEO.midAngle > (3 * Math.PI / 2) - poleAnglularDistance && dataPointEO.midAngle < (3 * Math.PI / 2) + poleAnglularDistance) {

						var prevDPIndex = (dataPointIndex - 1 + dataPointEOs.length) % dataPointEOs.length;
						var prevDP = dataPointEOs[prevDPIndex];
						var nextDP = dataPointEOs[(dataPointIndex + 1 + dataPointEOs.length) % dataPointEOs.length];

						if (dataPointEO.hemisphere === "right" && prevDP.hemisphere === "left" && newLabelX < prevDP.indexLabelTextBlock.x) {
							newLabelX = prevDP.indexLabelTextBlock.x + 15;
						} else if (dataPointEO.hemisphere === "left" && nextDP.hemisphere === "right" && newLabelX > nextDP.indexLabelTextBlock.x) {
							newLabelX = nextDP.indexLabelTextBlock.x - 15;
						}
					}

					//if (actualOffset < 0 && dataPointIndex < 4)
					//	customPrompt(actualOffset.toFixed(2) + "; " + dataPointEO.indexLabelTextBlock.y.toFixed(2) + "; " + newLabelY.toFixed(2));

					dataPointEO.indexLabelTextBlock.y = newLabelY;

					dataPointEO.indexLabelTextBlock.x = newLabelX;

					dataPointEO.indexLabelAngle = Math.atan2((dataPointEO.indexLabelTextBlock.y - center.y), (dataPointEO.indexLabelTextBlock.x - center.x));

				}


			}

			return actualOffset;
		}


		function positionLabels() {
			var ctx = _this.plotArea.ctx;

			ctx.fillStyle = "grey";
			ctx.strokeStyle = "grey";
			var fontSize = 16;
			ctx.font = fontSize + "px Arial";
			ctx.textBaseline = "middle";
			var i = 0, j = 0;
			var deltaR = 0;

			var resizeFlag = true;

			for (j = 0; j < 10 && (j < 1 || deltaR > 0) ; j++) {

				if (dataSeries.radius || (!dataSeries.radius && typeof dataSeries.innerRadius !== 'undefined' && dataSeries.innerRadius !== null && outerRadius - deltaR <= innerRadius))
					resizeFlag = false;

				if (resizeFlag)
					outerRadius -= deltaR;

				deltaR = 0;

				if (dataSeries.indexLabelPlacement !== "inside") {

					indexLabelRadius = outerRadius * indexLabelRadiusToRadiusRatio;

					for (i = 0; i < dataPoints.length; i++) {
						var dataPointEO = dataPointEOs[i];

						dataPointEO.indexLabelTextBlock.x = center.x + indexLabelRadius * Math.cos(dataPointEO.midAngle);
						dataPointEO.indexLabelTextBlock.y = center.y + indexLabelRadius * Math.sin(dataPointEO.midAngle);

						dataPointEO.indexLabelAngle = dataPointEO.midAngle;
						dataPointEO.radius = outerRadius;
						dataPointEO.percentInnerRadius = percentInnerRadius;
						//dataPointEO.indexLabelFontSize = dataPoint.indexLabelFontSize ? dataPoint.indexLabelFontSize : dataSeries.indexLabelFontSize;
					}

					var currentDataPoint, nextDataPoint;
					for (i = 0; i < dataPoints.length; i++) {

						var dataPointEO = dataPointEOs[i];
						//dataPointEO.lab
						//resetAnimationFrame();
						//animate();
						//renderLabels();

						//var prevDataPointIndex = (i - 1 + dataPointEOs.length) % dataPointEOs.length;

						//var nextDataPointIndex = (i + 1 + dataPointEOs.length) % dataPointEOs.length;
						//nextDataPointIndex = dataPointEOs[nextDataPointIndex].hemisphere === dataPointEO.hemisphere && nextDataPointIndex !== i ? nextDataPointIndex : null;

						var nextDataPointIndex = getNextLabelIndex(i);

						if (nextDataPointIndex === null)
							continue;

						currentDataPoint = dataPointEOs[i];
						nextDataPoint = dataPointEOs[nextDataPointIndex];


						var distanceFromNextLabel = 0;

						//if (dataPointEO.hemisphere === "right")
						//	distanceFromNextLabel = (nextDataPoint.indexLabelTextBlock.y - nextDataPoint.indexLabelTextBlock.height / 2) - (currentDataPoint.indexLabelTextBlock.y + currentDataPoint.indexLabelTextBlock.height / 2) - minDistanceBetweenLabels;
						//else
						//	distanceFromNextLabel = (currentDataPoint.indexLabelTextBlock.y - currentDataPoint.indexLabelTextBlock.height / 2) - (nextDataPoint.indexLabelTextBlock.y + nextDataPoint.indexLabelTextBlock.height / 2) - minDistanceBetweenLabels;

						distanceFromNextLabel = getVerticalDistanceBetweenLabels(currentDataPoint, nextDataPoint) - minDistanceBetweenLabels;


						if (distanceFromNextLabel < 0) {

							var dataPointsAbove = 0;
							var dataPointsBelow = 0;
							//var indexLabelAngleWhenTangent = Math.acos(outerRadius / indexLabelRadius) / Math.PI * 180;


							for (var k = 0; k < dataPoints.length; k++) {

								if (k === i)
									continue;

								//if (dataPointEOs[k].hemisphere !== dataPointEO.hemisphere || Math.abs(dataPointEOs[k].midAngle - dataPointEO.midAngle) > 30)
								//	continue;
								//if (dataPointEOs[k].hemisphere !== dataPointEO.hemisphere || Math.abs(dataPointEOs[k].labelAngle - dataPointEO.indexLabelAngle) > 30)
								//	continue;
								//if (dataPointEOs[k].hemisphere !== dataPointEO.hemisphere || Math.abs(dataPointEOs[k].midAngle - dataPointEO.midAngle) > indexLabelAngleWhenTangent)
								//	continue;
								if (dataPointEOs[k].hemisphere !== dataPointEO.hemisphere)
									continue;

								if (dataPointEOs[k].indexLabelTextBlock.y < dataPointEO.indexLabelTextBlock.y)
									dataPointsAbove++;
								else
									dataPointsBelow++;
							}

							//var upWardsOffset = (distanceFromNextLabel) / dataPoints.length * (dataPointsBelow);
							var upWardsOffset = (distanceFromNextLabel) / (dataPointsAbove + dataPointsBelow || 1) * (dataPointsBelow);
							var downWardsOffset = -1 * (distanceFromNextLabel - upWardsOffset);

							var actualUpwardOffset = 0;
							var actualDownwardOffset = 0;

							if (dataPointEO.hemisphere === "right") {
								actualUpwardOffset = rePositionLabels(i, upWardsOffset);

								//if (i < 4 && actualDownwardOffset !== upWardsOffset)
								//	customPrompt(i + "; " + upWardsOffset.toFixed(2) + "; " + actualUpwardOffset.toFixed(2));


								downWardsOffset = -1 * (distanceFromNextLabel - actualUpwardOffset);

								actualDownwardOffset = rePositionLabels(nextDataPointIndex, downWardsOffset);

								//window.alert(typeof +downWardsOffset.toFixed(precision));
								//Setting precision to make sure that they don't become not equal become of minor differences - like a difference of .000001
								if (+actualDownwardOffset.toFixed(precision) < +downWardsOffset.toFixed(precision) && +actualUpwardOffset.toFixed(precision) <= +upWardsOffset.toFixed(precision))
									rePositionLabels(i, -(downWardsOffset - actualDownwardOffset));

							} else {
								actualUpwardOffset = rePositionLabels(nextDataPointIndex, upWardsOffset);

								downWardsOffset = -1 * (distanceFromNextLabel - actualUpwardOffset);

								actualDownwardOffset = rePositionLabels(i, downWardsOffset);

								//Setting precision to make sure that they don't become not equal become of minor differences - like a difference of .000001
								if (+actualDownwardOffset.toFixed(precision) < +downWardsOffset.toFixed(precision) && +actualUpwardOffset.toFixed(precision) <= +upWardsOffset.toFixed(precision))
									rePositionLabels(nextDataPointIndex, -(downWardsOffset - actualDownwardOffset));
							}
						}


						//resetAnimationFrame();
						//animate();
						//renderLabels();
						//window.alert("next??");
					}
				} else {
					for (i = 0; i < dataPoints.length; i++) {

						var dataPointEO = dataPointEOs[i];
						indexLabelRadius = dataSeries.type === "pie" ? outerRadius * .7 : outerRadius * .8;


						var dx = center.x + indexLabelRadius * (Math.cos((dataPointEO.midAngle)));
						var dy = center.y + indexLabelRadius * (Math.sin((dataPointEO.midAngle)));

						dataPointEO.indexLabelTextBlock.x = dx;
						dataPointEO.indexLabelTextBlock.y = dy;
					}
				}

				// Resize Pie based on the label length.
				for (i = 0; i < dataPoints.length; i++) {

					dataPointEO = dataPointEOs[i];

					var size = dataPointEO.indexLabelTextBlock.measureText();
					// To make sure that null text or empty strings don't affect the radius. Required when user is not showing any labels
					if (size.height === 0 || size.width === 0)
						continue;

					var xOverflow = 0;
					var xdr = 0;

					if (dataPointEO.hemisphere === "right") {
						xOverflow = plotArea.x2 - (dataPointEO.indexLabelTextBlock.x + dataPointEO.indexLabelTextBlock.width + indexLabelLineEdgeLength);
						xOverflow *= -1;
					} else {
						xOverflow = plotArea.x1 - (dataPointEO.indexLabelTextBlock.x - dataPointEO.indexLabelTextBlock.width - indexLabelLineEdgeLength);
					}
					if (xOverflow > 0) {
						if (!resizeFlag && dataPointEO.indexLabelText) {
							var newIndexLabelMaxWidth = dataPointEO.hemisphere === "right" ? plotArea.x2 - dataPointEO.indexLabelTextBlock.x : dataPointEO.indexLabelTextBlock.x - plotArea.x1;
							dataPointEO.indexLabelTextBlock.maxWidth * .3 > newIndexLabelMaxWidth ? dataPointEO.indexLabelText = "" : dataPointEO.indexLabelTextBlock.maxWidth = newIndexLabelMaxWidth * .85;
							if (dataPointEO.indexLabelTextBlock.maxWidth * .3 < newIndexLabelMaxWidth) dataPointEO.indexLabelTextBlock.x -= dataPointEO.hemisphere === "right" ? 2 : -2;
						}

						if (Math.abs(dataPointEO.indexLabelTextBlock.y - dataPointEO.indexLabelTextBlock.height / 2 - center.y) < outerRadius
							|| Math.abs(dataPointEO.indexLabelTextBlock.y + dataPointEO.indexLabelTextBlock.height / 2 - center.y) < outerRadius) {

							xdr = xOverflow / Math.abs(Math.cos(dataPointEO.indexLabelAngle));

							if (xdr > 9)
								xdr = xdr * .3;

							if (xdr > deltaR)
								deltaR = xdr;
						}
					}

					var yOverflow = 0;
					var ydr = 0;

					if (dataPointEO.indexLabelAngle > 0 && dataPointEO.indexLabelAngle < Math.PI) {
						yOverflow = plotArea.y2 - (dataPointEO.indexLabelTextBlock.y + dataPointEO.indexLabelTextBlock.height / 2 + 5);
						yOverflow *= -1;
					} else {
						yOverflow = plotArea.y1 - (dataPointEO.indexLabelTextBlock.y - dataPointEO.indexLabelTextBlock.height / 2 - 5);
					}

					if (yOverflow > 0) {
						if (!resizeFlag && dataPointEO.indexLabelText) {
							var positionMultiplier = dataPointEO.indexLabelAngle > 0 && dataPointEO.indexLabelAngle < Math.PI ? -1 : 1;
							if (rePositionLabels(i, yOverflow * positionMultiplier) === 0)
								rePositionLabels(i, 2 * positionMultiplier);
						}
						if (Math.abs(dataPointEO.indexLabelTextBlock.x - center.x) < outerRadius) {

							ydr = yOverflow / Math.abs(Math.sin(dataPointEO.indexLabelAngle));

							if (ydr > 9)
								ydr = ydr * .3;

							if (ydr > deltaR)
								deltaR = ydr;

						}
					}

				}

				function removeLabelsForSmallSegments(totalOverlap, startIndex, endIndex) {

					var dpEOs = [];
					var totalRemovedLabelHeight = 0;

					for (var i = startIndex; true; i = (i + 1 + dataPoints.length) % dataPoints.length) {
						dpEOs.push(dataPointEOs[i]);

						if (i === endIndex)
							break;
					}

					dpEOs.sort(function (entry1, entry2) {
						return entry1.y - entry2.y;
					});

					for (var i = 0; i < dpEOs.length; i++) {
						var dpEO = dpEOs[i];

						if (totalRemovedLabelHeight < totalOverlap * .7) {
							totalRemovedLabelHeight += dpEO.indexLabelTextBlock.height;
							dpEO.indexLabelTextBlock.text = "";
							dpEO.indexLabelText = "";
							dpEO.indexLabelTextBlock.measureText();
						} else
							break;
					}

				}

				//resetAnimationFrame(1);
				//animate();
				//window.alert("next??");
				function skipLabels() {
					var overlapStartIndex = -1;
					var overlapEndIndex = -1;
					var totalOverlap = 0;
					var removeLabels = false;

					for (var k = 0; k < dataPoints.length; k++) {
						removeLabels = false;
						currentDataPoint = dataPointEOs[k];

						if (!currentDataPoint.indexLabelText)
							continue;

						var nextLabelIndex = getNextLabelIndex(k);
						if (nextLabelIndex === null)
							continue;

						var nextDataPoint = dataPointEOs[nextLabelIndex];

						distanceFromNextLabel = 0;

						//if (nextDataPoint.indexLabelTextBlock.y > currentDataPoint.indexLabelTextBlock.y)
						//	distanceFromNextLabel = (nextDataPoint.indexLabelTextBlock.y - (nextDataPoint.indexLabelTextBlock.height / 2)) - (currentDataPoint.indexLabelTextBlock.y + (currentDataPoint.indexLabelTextBlock.height / 2));
						//else
						//	distanceFromNextLabel = (currentDataPoint.indexLabelTextBlock.y - (currentDataPoint.indexLabelTextBlock.height / 2)) - (nextDataPoint.indexLabelTextBlock.y + (nextDataPoint.indexLabelTextBlock.height / 2));

						distanceFromNextLabel = getVerticalDistanceBetweenLabels(currentDataPoint, nextDataPoint);

						if (distanceFromNextLabel < 0 && areDataPointsTooClose(currentDataPoint, nextDataPoint)) {
							//if (distanceFromNextLabel < 0 && areDataPointsTooClose(currentDataPoint, nextDataPoint) ) {
							if (overlapStartIndex < 0)
								overlapStartIndex = k;

							if (nextLabelIndex !== overlapStartIndex) {
								overlapEndIndex = nextLabelIndex;

								totalOverlap += -distanceFromNextLabel;
							}

							if (k % Math.max(dataPoints.length / 10, 3) === 0)
								removeLabels = true;

							//nextDataPoint.indexLabelText = "";
							//nextDataPoint.indexLabelTextBlock.text = "";
							//nextDataPoint.indexLabelTextBlock.measureText();
						} else {

							removeLabels = true;
						}

						if (removeLabels) {

							if (totalOverlap > 0 && overlapStartIndex >= 0 && overlapEndIndex >= 0) {
								removeLabelsForSmallSegments(totalOverlap, overlapStartIndex, overlapEndIndex);

								overlapStartIndex = -1;
								overlapEndIndex = -1;
								totalOverlap = 0;
							}
						}
					}

					if (totalOverlap > 0)
						removeLabelsForSmallSegments(totalOverlap, overlapStartIndex, overlapEndIndex);
				}

				skipLabels();


			}
			//window.alert("next??");


			//resetAnimationFrame(_this.animationEnabled && _this.renderCount === 0 ? isCanvasSupported ? 60 : 30 : 1);
			//animate();

			//console.log("totalRecursions: " + totalRecursions);
		}


		this.pieDoughnutClickHandler = function (e) {
			if (_this.isAnimating) {
				return;
			}

			//if explodeOnClick === true
			if ((isNullOrUndefined(e.dataSeries.explodeOnClick) || e.dataSeries.explodeOnClick)) {
				var i = e.dataPointIndex;
				var dataPoint = e.dataPoint;
				var dataSeries = this;


				var id = dataSeries.dataPointIds[i];

				//dataPointEO = _this._eventManager.objectMap[id];

				if (dataPoint.exploded)
					dataPoint.exploded = false;
				else
					dataPoint.exploded = true;


				// So that it doesn't try to explode when there is only one segment
				if (dataSeries.dataPoints.length > 1) {
					_this._animator.animate(0, explodeDuration, function (fractionComplete) {

						explodeToggle(fractionComplete);
						renderChartElementsInPlotArea();
						//console.log("Explode Start");

					});
				}
			}
			return;
		}

		initLabels();

		positionLabels();
		positionLabels();
		positionLabels();
		positionLabels();

		this.disableToolTip = true;
		this._animator.animate(0, this.animatedRender ? this.animationDuration : 0, function (fractionComplete) {

			animate(fractionComplete);
			renderChartElementsInPlotArea();

		}, function () {

			_this.disableToolTip = false;
			_this._animator.animate(0, _this.animatedRender ? explodeDuration : 0, function (fractionComplete) {

				explodeToggle(fractionComplete);
				renderChartElementsInPlotArea();

			});

			//console.log("Animation Complete");
		});

		function renderChartElementsInPlotArea() {

			_this.plotArea.layoutManager.reset();

			if (_this.title) {
				if (_this.title.dockInsidePlotArea || (_this.title.horizontalAlign === "center" && _this.title.verticalAlign === "center"))
					_this.title.render();

			}

			if (_this.subtitles)
				for (var i = 0; i < _this.subtitles.length; i++) {
					var subtitle = _this.subtitles[i];
					if (subtitle.dockInsidePlotArea || (subtitle.horizontalAlign === "center" && subtitle.verticalAlign === "center"))
						subtitle.render();
				}

			if (_this.legend) {
				if (_this.legend.dockInsidePlotArea || (_this.legend.horizontalAlign === "center" && _this.legend.verticalAlign === "center"))
					_this.legend.render();
			}						
		}

		//this.ctx.strokeRect(plotArea.x1 + 1, plotArea.y1, plotArea.width - 2, plotArea.height);
	}

	//#endregion pieChart


	//#region funnelChart
	var drawSectionOfFunnel = function (ctx, sectionOfFunnel, fillOpacity, color) {
		if (typeof (fillOpacity) === "undefined") {
			fillOpacity = 1;
		}
		if (Math.round(sectionOfFunnel.y4 - sectionOfFunnel.y1) <= 0)
			return;
		ctx.save();
		ctx.globalAlpha = fillOpacity;

		ctx.beginPath();
		ctx.moveTo(Math.round(sectionOfFunnel.x1), Math.round(sectionOfFunnel.y1));
		ctx.lineTo(Math.round(sectionOfFunnel.x2), Math.round(sectionOfFunnel.y2));
		ctx.lineTo(Math.round(sectionOfFunnel.x3), Math.round(sectionOfFunnel.y3));
		ctx.lineTo(Math.round(sectionOfFunnel.x4), Math.round(sectionOfFunnel.y4));
		if (sectionOfFunnel.x5 !== "undefined") {
			ctx.lineTo(Math.round(sectionOfFunnel.x5), Math.round(sectionOfFunnel.y5));
			ctx.lineTo(Math.round(sectionOfFunnel.x6), Math.round(sectionOfFunnel.y6));
		}
		ctx.closePath();
		// ctx.lineWidth = 3;
		// ctx.strokeStyle = "#fff";
		// ctx.stroke();
		ctx.fillStyle = (!color) ? sectionOfFunnel.color : color;
		ctx.fill();

		ctx.globalAplha = 1;
		ctx.restore();
	}

	Chart.prototype.renderFunnel = function (plotUnit) {
		var _this = this;
		var totalDataSeries = plotUnit.dataSeriesIndexes.length;

		if (totalDataSeries <= 0)
			return;

		var dataSeriesIndex = plotUnit.dataSeriesIndexes[0];
		var dataSeries = this.data[dataSeriesIndex];
		var dataPoints = dataSeries.dataPoints;

		var plotArea = this.plotArea;

		var topBottomPadding = 0.025 * plotArea.width; // 2.5% of plotUnit height
		var sidePadding = 0.01 * plotArea.width; // 1% of plotUnit if indexLabels are present
		var sideOffset = 0;
		var explodeDuration = 500;

		var height = plotArea.height - (2 * topBottomPadding);
		var width = Math.min(plotArea.width - 2 * sidePadding, plotArea.height * 2.8);
		//var width = plotArea.width - 2 * sidePadding;

		var isIndexLabelPresent = false;

		for (var j = 0; j < dataPoints.length; j++) {
			if (!isIndexLabelPresent && typeof (dataPoints[j].indexLabel) !== "undefined" && dataPoints[j].indexLabel !== null && dataPoints[j].indexLabel.toString().length > 0)
				isIndexLabelPresent = true;

			if (!isIndexLabelPresent && typeof (dataPoints[j].label) !== "undefined" && dataPoints[j].label !== null && dataPoints[j].label.toString().length > 0)
				isIndexLabelPresent = true;

			if (!isIndexLabelPresent && (typeof dataSeries.indexLabelFormatter === "function") || (typeof dataPoints[j].indexLabelFormatter === "function"))
				isIndexLabelPresent = true;
		}

		isIndexLabelPresent = isIndexLabelPresent || (typeof (dataSeries.indexLabel) !== "undefined" && dataSeries.indexLabel !== null && dataSeries.indexLabel.toString().length > 0);

		if (dataSeries.indexLabelPlacement === "inside" || !isIndexLabelPresent) {
			//sidePadding = 12.5 * plotArea.width / 100;
			sidePadding = (plotArea.width - (.75 * width)) / 2;
		}

		var plotAreaX1 = plotArea.x1 + sidePadding;
		var plotAreaX2 = plotArea.x2 - sidePadding;
		var plotAreaY1 = plotArea.y1 + topBottomPadding;
		var plotAreaY2 = plotArea.y2 - topBottomPadding;

		//var ctx = this.ctx;
		var ctx = plotUnit.targetCanvasCtx || this.plotArea.ctx || this.ctx;

		if (dataSeries.length == 0 || !dataSeries.dataPoints || !dataSeries.visible) {
			return;
		}

		if (dataPoints.length === 0) return;

		var neckHeight, neckWidth;

		var headWidth = 75 * width / 100;

		var tickLength = 30 * (plotAreaX2 - headWidth) / 100;

		if (dataSeries.type === "funnel") {
			neckHeight = !isNullOrUndefined(dataSeries.options.neckHeight) ? dataSeries.neckHeight : .35 * height;
			neckWidth = !isNullOrUndefined(dataSeries.options.neckWidth) ? dataSeries.neckWidth : .25 * headWidth;

			if (typeof neckHeight === "string" && neckHeight.match(/%$/)) {
				neckHeight = parseInt(neckHeight);
				neckHeight = (neckHeight * height) / 100;
			} else {
				neckHeight = parseInt(neckHeight);
			}

			if (typeof neckWidth === "string" && neckWidth.match(/%$/)) {
				neckWidth = parseInt(neckWidth);
				neckWidth = (neckWidth * headWidth) / 100;
			} else {
				neckWidth = parseInt(neckWidth);
			}

			if (neckHeight > height) {
				neckHeight = height;
			} else if (neckHeight <= 0) {
				neckHeight = 0;
			}

			if (neckWidth > headWidth) {
				neckWidth = headWidth - 0.5;
			} else if (neckWidth <= 0) {
				neckWidth = 0;
			}
		} else if (dataSeries.type === "pyramid") {
			neckHeight = 0; // neckHeight and neckWidth is 0 for Pyramid Chart
			neckWidth = 0;
			// Check if user has tried to reverse the pyramid
			if (!dataSeries.reversed)
				dataSeries.reversed = true;
			else {
				dataSeries.reversed = false;
			}
		}

		var headHeight = height - neckHeight;

		var midPointWidthOfFunnel = plotAreaX1 + headWidth / 2; //We need this for drawing neck at centre

		var headStartPositionLeftX = plotAreaX1;
		var headStartPositionRightX = plotAreaX1 + headWidth;
		var headStartPositionY = (!dataSeries.reversed) ? plotAreaY1 : plotAreaY2;

		var neckLeftPositionX = midPointWidthOfFunnel - neckWidth / 2;
		var neckRightPositionX = midPointWidthOfFunnel + neckWidth / 2;

		var neckTopPositionY = (!dataSeries.reversed) ? (plotAreaY2 - neckHeight) : (plotAreaY1 + neckHeight);
		var neckBottomPositionY = (!dataSeries.reversed) ? plotAreaY2 : plotAreaY1;

		var sectionType = dataSeries.valueRepresents ? dataSeries.valueRepresents : "height";
		var sectionHeight;

		var sectionLeftPositionX = [];
		var sectionRightPositionX = [];
		var sectionsOfFunnel = [];

		var sectionDivPositionY = [];
		var initialYPosition = plotAreaY1;
		var midRegion;

		//Calculate slope of slanted lines in Funnel
		var m1 = (neckTopPositionY - headStartPositionY) / (neckLeftPositionX - headStartPositionLeftX);
		var m2 = -m1;
		sectionHeight = (sectionType === "area") ? dataToAreaRatio() : dataToHeightRatio();

		if (sectionHeight === -1) return;

		if (!dataSeries.reversed) {
			for (var i = 0; i < sectionHeight.length; i++) {
				initialYPosition += sectionHeight[i];
				sectionDivPositionY.push(initialYPosition);
			}
		} else {
			sectionDivPositionY.push(initialYPosition);
			for (var i = sectionHeight.length - 1; i > 0; i--) {
				initialYPosition += sectionHeight[i];
				sectionDivPositionY.push(initialYPosition);
			}
		}

		if (!dataSeries.reversed) {
			for (var i = 0; i < sectionHeight.length; i++) {
				if (sectionDivPositionY[i] < neckTopPositionY) {
					sectionLeftPositionX.push((sectionDivPositionY[i] - headStartPositionY + m1 * headStartPositionLeftX) / m1);
					sectionRightPositionX.push((sectionDivPositionY[i] - headStartPositionY + m2 * headStartPositionRightX) / m2);
					midRegion = i;
				}
				else {
					sectionLeftPositionX.push(neckLeftPositionX);
					sectionRightPositionX.push(neckRightPositionX);
				}
			}
		} else {
			for (var i = 0; i < sectionHeight.length; i++) {
				if (sectionDivPositionY[i] < neckTopPositionY) {
					sectionLeftPositionX.push(neckLeftPositionX);
					sectionRightPositionX.push(neckRightPositionX);
					midRegion = i;
				} else {
					sectionLeftPositionX.push((sectionDivPositionY[i] - headStartPositionY + m1 * headStartPositionLeftX) / m1);
					sectionRightPositionX.push((sectionDivPositionY[i] - headStartPositionY + m2 * headStartPositionRightX) / m2);
				}
			}
		}

		for (var i = 0; i < sectionHeight.length - 1; i++) {
			var color = (!dataSeries.reversed) ? dataPoints[i].color ? dataPoints[i].color : dataSeries._colorSet[i % dataSeries._colorSet.length] : dataPoints[dataPoints.length - 1 - i].color ? dataPoints[dataPoints.length - 1 - i].color : dataSeries._colorSet[(dataPoints.length - 1 - i) % dataSeries._colorSet.length];
			if (i === midRegion) {
				sectionsOfFunnel.push({
					x1: sectionLeftPositionX[i],
					y1: sectionDivPositionY[i],
					x2: sectionRightPositionX[i],
					y2: sectionDivPositionY[i],
					x3: neckRightPositionX,
					y3: neckTopPositionY,
					x4: sectionRightPositionX[i + 1],
					y4: sectionDivPositionY[i + 1],
					x5: sectionLeftPositionX[i + 1],
					y5: sectionDivPositionY[i + 1],
					x6: neckLeftPositionX,
					y6: neckTopPositionY,
					id: i,
					height: sectionDivPositionY[i + 1] - sectionDivPositionY[i],
					color: color
				});
			} else {
				sectionsOfFunnel.push({
					x1: sectionLeftPositionX[i],
					y1: sectionDivPositionY[i],
					x2: sectionRightPositionX[i],
					y2: sectionDivPositionY[i],
					x3: sectionRightPositionX[i + 1],
					y3: sectionDivPositionY[i + 1],
					x4: sectionLeftPositionX[i + 1],
					y4: sectionDivPositionY[i + 1],
					id: i,
					height: sectionDivPositionY[i + 1] - sectionDivPositionY[i],
					color: color
				});
			}
		}

		function dataToHeightRatio() {
			var total = 0;
			var sectionalHeight = [];
			for (var i = 0; i < dataPoints.length; i++) {
				if (typeof dataPoints[i].y === "undefined") return -1;
				dataPoints[i].y = typeof dataPoints[i].y === "number" ? dataPoints[i].y : 0;
				total += (Math.abs(dataPoints[i].y));
			}

			if (total === 0) return -1;

			sectionalHeight[0] = 0; // First line should be at 0 distance from top of plotArea
			for (var i = 0; i < dataPoints.length; i++) {
				sectionalHeight.push(Math.abs(dataPoints[i].y) * height / total);
			}
			return sectionalHeight;
		}

		function dataToAreaRatio() {
			var x1 = headStartPositionLeftX;
			var x2 = headStartPositionRightX;
			var x3 = neckLeftPositionX;
			var x4 = neckRightPositionX;
			var y1, y2, y3, y4;
			y1 = y2 = plotAreaY1;
			y3 = y4 = plotAreaY2 - neckHeight;

			headArea = (y3 - y1) * ((x2 - x1) + (x4 - x3)) / 2;
			headArea = Math.abs(headArea);

			var lengthOfNeck = neckRightPositionX - neckLeftPositionX;
			var heightOfNeck = y3 - plotAreaY2;

			var heightOfHead = y3 - y1;

			var neckArea = lengthOfNeck * heightOfNeck;
			neckArea = Math.abs(neckArea);

			var areaOfFunnel = headArea + neckArea;
			var heightOfFunnel = plotAreaY2 - y1;

			var sectionalHeight = [];
			var total = 0;
			for (var i = 0; i < dataPoints.length; i++) {
				if (typeof dataPoints[i].y === "undefined") return -1;
				dataPoints[i].y = typeof dataPoints[i].y === "number" ? dataPoints[i].y : 0;
				total += (Math.abs(dataPoints[i].y));
			}

			if (total === 0) return -1;

			sectionalHeight[0] = 0;
			var areaOccupied = 0;
			var heightOccupied = 0;
			var heightForThisDataPoint, areaForThisDataPoint;
			var width1, width2, lastUsedHeight;
			width1 = x2 - x1;
			var neckRegion = false;
			for (var i = 0; i < dataPoints.length; i++) {
				areaForThisDataPoint = (Math.abs(dataPoints[i].y) * areaOfFunnel) / total; // Given value represents this area in funnel
				if (!neckRegion) {
					sqrt = m1 * m1 * width1 * width1 - (4 * Math.abs(m1) * areaForThisDataPoint);
					if (sqrt < 0) {
						width2 = lengthOfNeck;
						areaOccupied = (width1 + width2) * (heightOfHead - heightOccupied) / 2;
						areaForThisDataPoint -= areaOccupied;
						heightForThisDataPoint = (heightOfHead - heightOccupied);
						heightOccupied += (heightOfHead - heightOccupied);
						//areaForThisDataPoint = Number(areaForThisDataPoint.toFixed(2));
						heightForThisDataPoint += (width2 == 0 ? 0 : (areaForThisDataPoint / width2));
						heightOccupied += (areaForThisDataPoint / width2);
						neckRegion = true;
						sectionalHeight.push(heightForThisDataPoint);
						continue;
					} else {
						heightForThisDataPoint = ((Math.abs(m1) * width1) - Math.sqrt(sqrt)) / 2;
					}
				} else {
					heightForThisDataPoint = Number(lengthOfNeck.toFixed(3)) == 0 ? 0 : areaForThisDataPoint / lengthOfNeck;
					sectionalHeight.push(heightForThisDataPoint);
					continue;
				}
				width2 = width1 - (2 * heightForThisDataPoint / Math.abs(m1));
				heightOccupied += heightForThisDataPoint;

				if (heightOccupied > heightOfHead) {
					heightOccupied -= heightForThisDataPoint;
					width2 = lengthOfNeck;
					areaOccupied = (width1 + width2) * (heightOfHead - heightOccupied) / 2;
					areaForThisDataPoint -= areaOccupied;
					heightForThisDataPoint = (heightOfHead - heightOccupied);
					heightOccupied += (heightOfHead - heightOccupied);
					heightForThisDataPoint += (areaForThisDataPoint / width2);
					heightOccupied += (areaForThisDataPoint / width2);
					neckRegion = true;
				}
				width1 = width2;
				sectionalHeight.push(heightForThisDataPoint);
			}
			return sectionalHeight;
		}

		// Label portion starts from here
		var minDistanceBetweenLabels = 2;
		var indexLabels = [];

		function initLabels() {
			if (!dataSeries || !dataPoints) {
				return;
			}

			var color,
				indexLabelText,
				indexLabelPlacement,
				indexLabelBackgroundColor,
				indexLabelFontColor,
				indexLabelFontSize,
				indexLabelFontStyle,
				indexLabelFontFamily,
				indexLabelFontWeight,
				indexLabelLineColor,
				indexLabelLineThickness,
				indexLabelLineDashType,
				indexLabelWrap,
				indexLabelMaxWidth,
				indexLabelLineDashType,
				indexLabelFormatter;
			var labelPaddingLeft = 8;
			var labelPaddingRight = 3

			var section, labelX, labelY;
			var widthForLabel = [];
			var indexLabelMaxHeight = [];

			var percentAndTotal = {
				percent: null, total: null
			};

			var formatterParameter = null;

			var dataPoint;

			// Width of indexLabel when placed outside
			for (var i = 0; i < dataPoints.length; i++) {
				section = sectionsOfFunnel[i];
				labelY = typeof (section.x5) !== "undefined" ? (section.y2 + section.y4) / 2 : (section.y2 + section.y3) / 2;
				labelX = calculateX(labelY).x2 + 1;
				widthForLabel[i] = plotAreaX2 - labelX - tickLength;
			}

			//var k = dataPoints.length - 1;
			var adjustableLengthOfLineToLabel = .5 * tickLength;
			for (var i = 0, k = dataPoints.length - 1; i < dataPoints.length || k >= 0; i++, k--) {
				dataPoint = (!dataSeries.reversed) ? dataPoints[i] : dataPoints[k];
				color = dataPoint.color ? dataPoint.color : (dataSeries.reversed) ? dataSeries._colorSet[(dataPoints.length - 1 - i) % dataSeries._colorSet.length] : dataSeries._colorSet[i % dataSeries._colorSet.length];
				indexLabelPlacement = dataPoint.indexLabelPlacement || dataSeries.indexLabelPlacement || "outside";
				indexLabelBackgroundColor = dataPoint.indexLabelBackgroundColor || dataSeries.indexLabelBackgroundColor || (isCanvasSupported ? "transparent" : null);
				indexLabelFontColor = dataPoint.indexLabelFontColor || dataSeries.indexLabelFontColor || "#979797";
				indexLabelFontSize = !isNullOrUndefined(dataPoint.indexLabelFontSize) ? dataPoint.indexLabelFontSize : dataSeries.indexLabelFontSize;
				//indexLabelFontSize = dataPoint.indexLabelFontSize || dataSeries.indexLabelFontSize || 12;
				indexLabelFontStyle = dataPoint.indexLabelFontStyle || dataSeries.indexLabelFontStyle || "normal";
				indexLabelFontFamily = dataPoint.indexLabelFontFamily || dataSeries.indexLabelFontFamily || "arial";
				indexLabelFontWeight = dataPoint.indexLabelFontWeight || dataSeries.indexLabelFontWeight || "normal";
				indexLabelLineColor = dataPoint.indexLabelLineColor || dataSeries.options.indexLabelLineColor || color;
				indexLabelLineThickness = typeof dataPoint.indexLabelLineThickness === "number" ? dataPoint.indexLabelLineThickness : typeof dataSeries.indexLabelLineThickness === "number" ? dataSeries.indexLabelLineThickness : 2;
				indexLabelLineDashType = dataPoint.indexLabelLineDashType || dataSeries.indexLabelLineDashType || "solid";
				indexLabelWrap = typeof (dataPoint.indexLabelWrap) !== "undefined" ? dataPoint.indexLabelWrap : typeof (dataSeries.indexLabelWrap) !== "undefined" ? dataSeries.indexLabelWrap : true;

				// check dataPointIndex and id for reversed
				var id = dataSeries.dataPointIds[i];
				var dataPointEO = {
					id: id, objectType: "dataPoint", dataPointIndex: i, dataSeriesIndex: 0, funnelSection: sectionsOfFunnel[dataSeries.reversed ? dataPoints.length - 1 - i : i]
				};
				_this._eventManager.objectMap[id] = dataPointEO;

				if (dataSeries.indexLabelPlacement === "inside") {
					widthForLabel[i] = (i !== midRegion) ? (dataSeries.reversed) ? (sectionsOfFunnel[i].x2 - sectionsOfFunnel[i].x1) : (sectionsOfFunnel[i].x3 - sectionsOfFunnel[i].x4) : (sectionsOfFunnel[i].x3 - sectionsOfFunnel[i].x6);
					if (widthForLabel[i] < 20) {
						widthForLabel[i] = (i !== midRegion) ? (dataSeries.reversed) ? (sectionsOfFunnel[i].x3 - sectionsOfFunnel[i].x4) : (sectionsOfFunnel[i].x2 - sectionsOfFunnel[i].x1) : (sectionsOfFunnel[i].x2 - sectionsOfFunnel[i].x1);
						widthForLabel[i] /= 2;
					}
				}

				indexLabelMaxWidth = dataPoint.indexLabelMaxWidth ? dataPoint.indexLabelMaxWidth : dataSeries.options.indexLabelMaxWidth ? dataSeries.indexLabelMaxWidth : widthForLabel[i];

				if (indexLabelMaxWidth > widthForLabel[i] || indexLabelMaxWidth < 0) indexLabelMaxWidth = widthForLabel[i];

				indexLabelMaxHeight[i] = (dataSeries.indexLabelPlacement === "inside") ? sectionsOfFunnel[i].height : false;

				percentAndTotal = _this.getPercentAndTotal(dataSeries, dataPoint);

				if (dataSeries.indexLabelFormatter || dataPoint.indexLabelFormatter) {
					formatterParameter = {
						chart: _this.options, dataSeries: dataSeries, dataPoint: dataPoint, total: percentAndTotal.total, percent: percentAndTotal.percent
					};
				}

				indexLabelText = dataPoint.indexLabelFormatter ? dataPoint.indexLabelFormatter(formatterParameter)
					: dataPoint.indexLabel ? _this.replaceKeywordsWithValue(dataPoint.indexLabel, dataPoint, dataSeries, i)
						: dataSeries.indexLabelFormatter ? dataSeries.indexLabelFormatter(formatterParameter)
							: dataSeries.indexLabel ? _this.replaceKeywordsWithValue(dataSeries.indexLabel, dataPoint, dataSeries, i) : dataPoint.label ? dataPoint.label : '';

				if (indexLabelLineThickness <= 0) indexLabelLineThickness = 0;

				//if (Math.round(indexLabelMaxWidth) === 0) {
				//	indexLabelText = '';
				//	//indexLabelMaxWidth = (dataSeries.reversed) ? (sectionsOfFunnel[i].x4 - sectionsOfFunnel[i].x5) / 2 : (sectionsOfFunnel[i].x2 - sectionsOfFunnel[i].x1) / 2;
				//	//indexLabelMaxHeight[i] = (indexLabelMaxHeight[i] === false) ? indexLabelMaxHeight[i] / 2 : false;
				//}

				// Find width of text in pixels and push it little towards left if wrapping can be avoided
				var lengthOfTextInPixel = 1000; //pixelWidthOfText(indexLabelText, indexLabelFontSize, indexLabelFontFamily);

				if (lengthOfTextInPixel > indexLabelMaxWidth && ((lengthOfTextInPixel - indexLabelMaxWidth) < adjustableLengthOfLineToLabel)) {
					indexLabelMaxWidth += (lengthOfTextInPixel - indexLabelMaxWidth);
				}

				if (!ctx.roundRect) extendCtx(ctx);

				var textBlock = new TextBlock(ctx, {
					fontSize: indexLabelFontSize,
					fontFamily: indexLabelFontFamily,
					fontColor: indexLabelFontColor,
					fontStyle: indexLabelFontStyle,
					fontWeight: indexLabelFontWeight,
					horizontalAlign: indexLabelPlacement,
					backgroundColor: indexLabelBackgroundColor,
					maxWidth: indexLabelMaxWidth,
					maxHeight: (indexLabelMaxHeight[i] === false) ? indexLabelWrap ? indexLabelFontSize * 4.28571429 : indexLabelFontSize * 1.5 : indexLabelMaxHeight[i],
					text: indexLabelText,
					padding: minDistanceBetweenLabels
				});
				textBlock.measureText();
				var height = textBlock.height < textBlock.maxHeight ? textBlock.height : textBlock.maxHeight;
				var width = textBlock.width < textBlock.maxWidth ? textBlock.width : textBlock.maxWidth;

				indexLabels.push({
					textBlock: textBlock,
					id: (dataSeries.reversed) ? k : i,
					isDirty: false,
					lineColor: indexLabelLineColor,
					lineThickness: indexLabelLineThickness,
					lineDashType: indexLabelLineDashType,
					height: height,
					width: width
					// stringLength: indexLabelText.length
				});
			}

			function pixelWidthOfText(text, fontSize, fontName) {
				this.elem = document.createElement('span');
				this.elem.style.fontSize = fontSize;
				this.elem.style.fontFamily = fontName;
				this.elem.innerHTML = text;
				document.body.appendChild(this.elem);
				var width = this.elem.offsetWidth;
				document.body.removeChild(this.elem);
				return width;
			}
		}

		function ifLabelsAreOverlappingChangeMaxWidth() {
			var nextLabel, nextTextBlock, currentLabel, currentTextBlock;
			var height, width;
			var maxWidth = [];
			var isOverlapping = false;
			var temp = 0;
			var commonMaxWidth = plotAreaX2 - headStartPositionRightX - tickLength / 2;
			commonMaxWidth = dataSeries.options.indexLabelMaxWidth ? dataSeries.indexLabelMaxWidth > commonMaxWidth ? commonMaxWidth : dataSeries.indexLabelMaxWidth : commonMaxWidth;
			for (var i = indexLabels.length - 1; i >= 0; i--) {
				dataPoint = dataPoints[indexLabels[i].id];
				currentLabel = indexLabels[i];
				currentTextBlock = currentLabel.textBlock;
				nextLabel = getNextLabelIndex(i) < sectionsOfFunnel.length ? indexLabels[getNextLabelIndex(i)] : null;
				nextTextBlock = nextLabel ? nextLabel.textBlock : null;
				height = currentLabel.height;

				if (nextLabel && ((currentTextBlock.y + height + minDistanceBetweenLabels) > (nextTextBlock.y))) {
					isOverlapping = true;
					//break;
				}

				temp = dataPoint.indexLabelMaxWidth || commonMaxWidth;
				if (temp > commonMaxWidth || temp < 0) {
					temp = commonMaxWidth;
				}
				maxWidth.push(temp);
			}
			if (isOverlapping) {
				var y, section;
				for (var i = indexLabels.length - 1; i >= 0; i--) {
					section = sectionsOfFunnel[i];
					indexLabels[i].textBlock.maxWidth = maxWidth[maxWidth.length - (i + 1)];
					indexLabels[i].textBlock.measureText();
					indexLabels[i].textBlock.x = plotAreaX2 - commonMaxWidth;
					height = indexLabels[i].textBlock.height < indexLabels[i].textBlock.maxHeight ? indexLabels[i].textBlock.height : indexLabels[i].textBlock.maxHeight;
					width = indexLabels[i].textBlock.width < indexLabels[i].textBlock.maxWidth ? indexLabels[i].textBlock.width : indexLabels[i].textBlock.maxWidth;
					indexLabels[i].height = height;
					indexLabels[i].width = width;
					y = typeof (section.x5) !== "undefined" ? (section.y2 + section.y4) / 2 : (section.y2 + section.y3) / 2;
					indexLabels[i].textBlock.y = y - (indexLabels[i].height / 2);

					if (!dataSeries.reversed) {
						if (indexLabels[i].textBlock.y < (headStartPositionY - topBottomPadding)) {
							indexLabels[i].textBlock.y = headStartPositionY - topBottomPadding;
						}
						if ((indexLabels[i].textBlock.y + indexLabels[i].height) > (neckBottomPositionY + topBottomPadding)) {
							indexLabels[i].textBlock.y = neckBottomPositionY + topBottomPadding - indexLabels[i].height;
						}
					} else {
						if ((indexLabels[i].textBlock.y + indexLabels[i].height) > (headStartPositionY + topBottomPadding)) {
							indexLabels[i].textBlock.y = headStartPositionY + topBottomPadding - indexLabels[i].height;
						}
						if ((indexLabels[i].textBlock.y) < (neckBottomPositionY - topBottomPadding)) {
							indexLabels[i].textBlock.y = neckBottomPositionY - topBottomPadding;
						}
					}
				}
			}
		}

		// Figures out initial position for each indexLabel which may overlap with each other
		function positionLabels() {
			var section;
			var x1, y1;
			var sectionHeight, labelHeight, labelWidth;

			if (dataSeries.indexLabelPlacement !== "inside") {
				for (var i = 0; i < sectionsOfFunnel.length; i++) {
					if (indexLabels[i].textBlock.text.length == 0) {
						indexLabels[i].isDirty = true;
						continue;
					}
					section = sectionsOfFunnel[i];

					y1 = typeof (section.x5) !== "undefined" ? (section.y2 + section.y4) / 2 : (section.y2 + section.y3) / 2;
					if (!dataSeries.reversed) {
						x1 = typeof (section.x5) !== "undefined" ? y1 < neckTopPositionY ? calculateX(y1).x2 + 1 : (section.x4 + section.x3) / 2 + 1 : (section.x2 + section.x3) / 2 + 1;
					} else {
						x1 = typeof (section.x5) !== "undefined" ? y1 > neckTopPositionY ? calculateX(y1).x2 + 1 : (section.x2 + section.x3) / 2 + 1 : (section.x2 + section.x3) / 2 + 1;
					}

					indexLabels[i].textBlock.x = x1 + tickLength;
					indexLabels[i].textBlock.y = y1 - (indexLabels[i].height / 2);

					if (!dataSeries.reversed) {
						if (indexLabels[i].textBlock.y < (headStartPositionY - topBottomPadding)) {
							indexLabels[i].textBlock.y = headStartPositionY - topBottomPadding;
						}
						if ((indexLabels[i].textBlock.y + indexLabels[i].height) > (neckBottomPositionY + topBottomPadding)) {
							indexLabels[i].textBlock.y = neckBottomPositionY + topBottomPadding - indexLabels[i].height;
						}
					} else {
						if ((indexLabels[i].textBlock.y + indexLabels[i].height) > (headStartPositionY + topBottomPadding)) {
							indexLabels[i].textBlock.y = headStartPositionY + topBottomPadding - indexLabels[i].height;
						}
						if ((indexLabels[i].textBlock.y) < (neckBottomPositionY - topBottomPadding)) {
							indexLabels[i].textBlock.y = neckBottomPositionY - topBottomPadding;
						}
					}

				}
			} else {
				for (var i = 0; i < sectionsOfFunnel.length; i++) {
					if (indexLabels[i].textBlock.text.length == 0) {
						indexLabels[i].isDirty = true;
						continue;
					}
					section = sectionsOfFunnel[i];
					sectionHeight = section.height;
					labelHeight = indexLabels[i].height;
					labelWidth = indexLabels[i].width;

					if (sectionHeight >= labelHeight) {
						x1 = i != midRegion ? ((section.x4 + section.x3) / 2) - (labelWidth / 2) : ((section.x5 + section.x4) / 2) - (labelWidth / 2);
						y1 = i != midRegion ? ((section.y1 + section.y3) / 2) - (labelHeight / 2) : ((section.y1 + section.y4) / 2) - (labelHeight / 2);
						indexLabels[i].textBlock.x = x1;
						indexLabels[i].textBlock.y = y1;
					}
					else {
						indexLabels[i].isDirty = true;
					}
				}
			}
		}

		// Re-position the indexLabels to avoid overlap and call skip if not possible
		function repositionLabels() {
			var currentHeight, currentY;
			var currentLabel, currentTextBlock, nextLabel, nextTextBlock;
			var requiredSpace, availableSpace, noOfLabelsSkipped;
			var maxNumberOfIndexLabelClusters = 1;
			var precisionLevel = 6;

			for (var k = 0; k < 2 * maxNumberOfIndexLabelClusters; k++) {
				for (var i = indexLabels.length - 1; i >= 0; i--) {
					previousLabel = getPreviousLabelIndex(i) >= 0 ? indexLabels[getPreviousLabelIndex(i)] : null;
					previousTextBlock = previousLabel ? previousLabel.textBlock : null;
					currentLabel = indexLabels[i];
					currentTextBlock = currentLabel.textBlock;
					nextLabel = getNextLabelIndex(i) < sectionsOfFunnel.length ? indexLabels[getNextLabelIndex(i)] : null;
					nextTextBlock = nextLabel ? nextLabel.textBlock : null;
					currentHeight = +currentLabel.height.toFixed(precisionLevel);
					currentY = +currentTextBlock.y.toFixed(precisionLevel);
					// sameIndexCount = 0;

					if (currentLabel.isDirty) continue;

					// Overlaps with nextLabel
					if (!!nextLabel && ((currentY + currentHeight + minDistanceBetweenLabels) > (+nextTextBlock.y.toFixed(precisionLevel)))) {
						requiredSpace = (currentTextBlock.y + currentHeight + minDistanceBetweenLabels) - nextTextBlock.y;
						availableSpace = rearrangeLabels(i, -requiredSpace);

						// Moving up didn't solve the issue, so move down
						if (availableSpace < requiredSpace) {
							if (availableSpace > 0) requiredSpace -= availableSpace;
							availableSpace = rearrangeLabels(getNextLabelIndex(i), requiredSpace);
							if (availableSpace != requiredSpace) break;
						}

					}
				}

				noOfLabelsSkipped = checkOverlapForSkip();
				if (noOfLabelsSkipped > 0) {
					// k = 1;
					continue;
				} else {
					// break;
				}
			}

			function rearrangeLabels(index, offset) {
				// counterForRecursion++;
				var movedUp, movedDown;

				if (index < 0 || index >= indexLabels.length) return 0;

				var previousIndex, nextIndex;
				var newOffset, possibleMove;
				var currentTextBlock = indexLabels[index].textBlock;

				var height = currentTextBlock.height;

				// Move Up if offset is negative
				if (offset < 0) {
					offset *= -1;
					previousIndex = getPreviousLabelIndex(index);
					possibleMove = distanceBetweenTwoLabels(previousIndex, index);

					if (possibleMove >= offset) {
						currentTextBlock.y -= offset;
						return offset;
					}

					newOffset = offset - possibleMove;

					if (index == 0) {
						if (possibleMove > 0) {
							currentTextBlock.y -= possibleMove;
						}
						return possibleMove;
					} else {
						movedUp = possibleMove + rearrangeLabels(previousIndex, -newOffset);
						if (movedUp > 0) {
							currentTextBlock.y -= movedUp;
						}
						return movedUp;
					}

				} else {
					nextIndex = getNextLabelIndex(index);
					possibleMove = distanceBetweenTwoLabels(index, nextIndex);

					if (possibleMove >= offset) {
						currentTextBlock.y += offset;
						return offset;
					}

					newOffset = offset - possibleMove;

					if (index == sectionsOfFunnel.length - 1) {
						if (possibleMove > 0) {
							currentTextBlock.y += possibleMove;
						}
						return possibleMove;
					} else {
						movedDown = possibleMove + rearrangeLabels(nextIndex, newOffset);
						if (movedDown > 0) {
							currentTextBlock.y += movedDown;
						}
						return movedDown;
					}
				}
			}

			function checkOverlapForSkip() {
				var overlap, startIndex, startPosition, previous, i;
				var noOfLabelsSkipped = 0;
				var endPosition, heightAvailable, heightRequired;

				var labelSkipThreshold = (plotAreaY2 - plotAreaY1 + 2 * topBottomPadding) / maxNumberOfIndexLabelClusters;
				separateAtThreshold(labelSkipThreshold, maxNumberOfIndexLabelClusters);
				for (var j = sectionsOfFunnel.length - 1; j > 0; j--) {
					if (indexLabels[j].isDirty) {
						continue;
					}

					previous = getPreviousLabelIndex(j);
					if (previous < 0) {
						previous = 0;
						if (indexLabels[previous].isDirty) break;
					}
					if (indexLabels[j].textBlock.y < (indexLabels[previous].textBlock.y + indexLabels[previous].height)) {
						startIndex = startIndex || j;
						overlap = 0;
						i = j;

						heightRequired = 0;
						// startPosition = (indexLabels[i].textBlock.y + indexLabels[i].height);
						while (indexLabels[i].textBlock.y < (indexLabels[previous].textBlock.y + indexLabels[previous].height + minDistanceBetweenLabels)) {
							startPosition = startPosition || (indexLabels[i].textBlock.y + indexLabels[i].height);
							heightRequired += (indexLabels[i].height);
							heightRequired += minDistanceBetweenLabels;
							i = previous;
							if (i <= 0) {
								i = 0;
								heightRequired += (indexLabels[i].height);
								break;
							}
							previous = getPreviousLabelIndex(i);
							if (previous < 0) {
								i = 0;
								heightRequired += (indexLabels[i].height);
								break;
							}
						}
						if (i == j) continue;

						endPosition = indexLabels[i].textBlock.y;
						heightAvailable = startPosition - endPosition;

						overlap = heightRequired - heightAvailable;

						// if(overlap < 0) continue;

						noOfLabelsSkipped = removeLabelFromSmallSegment(overlap, startIndex, i);
						j = i;
						break;
					}
				}
				return noOfLabelsSkipped;
			}

			function removeLabelFromSmallSegment(totalOverlap, endIndex, startIndex) {
				var labelsToSkip = [];
				var totalRemovedLabelHeight = 0;
				var noOfLabelsRemoved = 0;
				var totalOverlap = Math.abs(totalOverlap);

				for (var i = startIndex; i <= endIndex; i++) {
					labelsToSkip.push(sectionsOfFunnel[i]);
				}

				labelsToSkip.sort(function (entry1, entry2) {
					return entry1.height - entry2.height;
				});

				for (var i = 0; i < labelsToSkip.length; i++) {
					var skippedSection = labelsToSkip[i];
					if (totalRemovedLabelHeight < totalOverlap) {
						noOfLabelsRemoved++;
						totalRemovedLabelHeight += (indexLabels[skippedSection.id].height + minDistanceBetweenLabels);
						indexLabels[skippedSection.id].textBlock.text = "";
						indexLabels[skippedSection.id].indexLabelText = "";
						indexLabels[skippedSection.id].isDirty = true;
						indexLabels[skippedSection.id].textBlock.measureText();
					} else {
						break;
					}
				}
				return noOfLabelsRemoved;
			}

			function separateAtThreshold(threshold, noOfGroups) {
				var currentThreshold, next;
				for (var j = 1; j < noOfGroups; j++) {
					currentThreshold = j * threshold;

					for (var i = indexLabels.length - 1; i >= 0; i--) {
						if (indexLabels[i].isDirty) continue;
						if ((indexLabels[i].textBlock.y < currentThreshold) && (indexLabels[i].textBlock.y + indexLabels[i].height) > currentThreshold) {
							// Label lies on threshold but it needs to overlap with next label to move.
							next = getNextLabelIndex(i);
							if (next >= indexLabels.length - 1) continue;
							// if(indexLabels[next].isDirty) continue;

							if (indexLabels[i].textBlock.y + indexLabels[i].height + minDistanceBetweenLabels > indexLabels[next].textBlock.y) {
								// Moves that particular indexLabel at threshold towards top or bottom based on position of indexLabel (i.e more portion above or below of threshold)
								if (((indexLabels[i].textBlock.y + indexLabels[i].height) - currentThreshold) > (currentThreshold - indexLabels[i].textBlock.y)) {
									// Falls more above threshold
									indexLabels[i].textBlock.y = currentThreshold + 1;
								}
								else {
									indexLabels[i].textBlock.y = currentThreshold - indexLabels[i].height - 1;
								}
							}
						}
					}
				}
			}
		}

		function distanceBetweenTwoLabels(previous, current) {
			var topPosition, bottomPosition;
			if (previous < 0) {
				if (!dataSeries.reversed) {
					topPosition = headStartPositionY - topBottomPadding;
				} else {
					topPosition = neckBottomPositionY - topBottomPadding;
				}
			} else {
				topPosition = indexLabels[previous].textBlock.y + indexLabels[previous].height + minDistanceBetweenLabels;
			}

			if (current < sectionsOfFunnel.length) {
				bottomPosition = indexLabels[current].textBlock.y;
			} else {
				if (!dataSeries.reversed) {
					bottomPosition = neckBottomPositionY + topBottomPadding;
				} else {
					bottomPosition = headStartPositionY + topBottomPadding;
				}
			}
			return (bottomPosition - topPosition);
		}

		var isAnimating = false;

		var explodedSections = [];
		var originalPosition = [];
		var exploded = false;
		var usedWidth = 0;
		var extraWidth = 0;

		addArrayIndexOf(explodedSections);

		// Before printing check if any of the dataPoint is exploded
		for (var i = 0; i < dataPoints.length; i++) {
			if (dataPoints[i].exploded) {
				exploded = true;
				if (dataSeries.reversed) {
					explodedSections.push(dataPoints.length - 1 - i);
				} else {
					explodedSections.push(i);
				}
			}
		}

		//Clear plotArea and print all sections of funnel
		ctx.clearRect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
		ctx.fillStyle = _this.backgroundColor;
		ctx.fillRect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);

		//for (i = 0; i < sectionsOfFunnel.length; i++) {
		//	var currentSection = sectionsOfFunnel[i];
		//	drawSectionOfFunnel(ctx, currentSection, dataSeries.fillOpacity);
		//	originalPosition.push(currentSection.y1)
		//}
		//renderChartElementsInPlotArea(ctx);

		//Check for indexLabels and render if present
		if (isIndexLabelPresent && dataSeries.visible) {
			initLabels();
			positionLabels();
			ifLabelsAreOverlappingChangeMaxWidth();
			if (dataSeries.indexLabelPlacement !== "inside") {
				repositionLabels();
				for (var i = 0; i < dataPoints.length; i++) {
					if (!indexLabels[i].isDirty) {
						usedWidth = indexLabels[i].textBlock.x + indexLabels[i].width;
					} else {
						continue;
					}
					extraWidth = (plotAreaX2 - usedWidth) / 2;
					if (i == 0) sideOffset = extraWidth;
					if (sideOffset > extraWidth) {
						sideOffset = extraWidth;
					}
				}
				for (var i = 0; i < sectionsOfFunnel.length; i++) {
					sectionsOfFunnel[i].x1 += sideOffset;
					sectionsOfFunnel[i].x2 += sideOffset;
					sectionsOfFunnel[i].x3 += sideOffset;
					sectionsOfFunnel[i].x4 += sideOffset;
					if (sectionsOfFunnel[i].x5) {
						sectionsOfFunnel[i].x5 += sideOffset;
						sectionsOfFunnel[i].x6 += sideOffset;
					}
					indexLabels[i].textBlock.x += sideOffset;
				}

				//if (!_this.animationEnabled) { // If animationEnabled is false, immediately draw the indexLabels and lines
				//	drawLineToLabel(ctx);
				//}
			}
			//if (!_this.animationEnabled) {
			//	renderLabels();
			//}
		}

		for (i = 0; i < sectionsOfFunnel.length; i++) {
			var currentSection = sectionsOfFunnel[i];
			drawSectionOfFunnel(ctx, currentSection, dataSeries.fillOpacity);
			originalPosition.push(currentSection.y1)
		}
		renderChartElementsInPlotArea(ctx);

		if (isIndexLabelPresent && dataSeries.visible) {
			if (dataSeries.indexLabelPlacement !== "inside" && !_this.animationEnabled) {
				drawLineToLabel(ctx);
			}
			if (!_this.animationEnabled) {
				renderLabels();
			}
		}

		// For events even though indexLabels aren't present
		if (!isIndexLabelPresent) {
			var id, dataPointEO;
			for (var i = 0; i < dataPoints.length; i++) {
				id = dataSeries.dataPointIds[i];
				dataPointEO = {
					id: id, objectType: "dataPoint", dataPointIndex: i, dataSeriesIndex: 0, funnelSection: sectionsOfFunnel[dataSeries.reversed ? dataPoints.length - 1 - i : i]
				};
				_this._eventManager.objectMap[id] = dataPointEO;
			}
		}

		if (!_this.animationEnabled && exploded) {
			explodeToggle(_this, -1, 0);
		}
		else if (_this.animationEnabled && !_this.animatedRender) {
			explodeToggle(_this, -1, 0);
		}

		this.funnelPyramidClickHandler = function (ev) {
			var selectedSection = -1;
			if (isAnimating || _this.isAnimating) {
				return;
			}

			if ((isNullOrUndefined(ev.dataSeries.explodeOnClick) || ev.dataSeries.explodeOnClick)) {
				selectedSection = dataSeries.reversed ? (dataPoints.length - 1 - ev.dataPointIndex) : ev.dataPointIndex;

				if (selectedSection >= 0) {
					changeExplodedForDataPoints(selectedSection);
					explodeToggle(_this, selectedSection, explodeDuration);
				}
			} else {
				return;
			}
		}

		function changeExplodedForDataPoints(sectionIndex) {
			if (dataSeries.type === "funnel" || dataSeries.type === "pyramid") {
				if (!dataSeries.reversed) {
					if (dataPoints[sectionIndex].exploded) dataPoints[sectionIndex].exploded = false;
					else dataPoints[sectionIndex].exploded = true;
				} else {
					if (dataPoints[(dataPoints.length - 1) - sectionIndex].exploded) dataPoints[(dataPoints.length - 1) - sectionIndex].exploded = false;
					else dataPoints[(dataPoints.length - 1) - sectionIndex].exploded = true;
				}
			}
		}

		function explodeToggle(_this, selectedSection, animDuration) {
			var moveFromAbsBy, gap, moveSectionBy, index;

			var newPosition = [];
			var extraGap = topBottomPadding;
			var previousMoveForSameSection = [];

			if (selectedSection !== -1) {
				var implode = explodedSections.indexOf(selectedSection) >= 0;
				if (!implode) {
					explodedSections.push(selectedSection);
					explodedSections = explodedSections.sort(function (a, b) { return a - b; });
				} else {
					index = explodedSections.indexOf(selectedSection)
					explodedSections.splice(index, 1);
				}
			}

			if (explodedSections.length === 0) {
				newPosition = originalPosition;
			} else {
				gap = topBottomPadding * ((explodedSections.length == 1 && (explodedSections[0] == 0 || explodedSections[0] == sectionsOfFunnel.length - 1)) ? 1 : 2) / gapRequired();
				for (var i = 0; i < sectionsOfFunnel.length; i++) {
					if (explodedSections.length == 1 && explodedSections[0] == 0) {
						if (i === 0) {
							newPosition.push(originalPosition[i]);
							moveFromAbsBy = extraGap;
							continue;
						}
					} else if (i === 0) {
						moveFromAbsBy = -1 * extraGap;
					}

					newPosition.push(originalPosition[i] + moveFromAbsBy);
					if (explodedSections.indexOf(i) >= 0 || i < sectionsOfFunnel.length && explodedSections.indexOf(i + 1) >= 0)
						moveFromAbsBy += gap;
				}
			}

			moveSectionBy = moveForEachSection();

			var animatingObject = {
				startTime: (new Date()).getTime(),
				duration: animDuration || 500,
				easingFunction: function (b, c, t, d) {
					return AnimationHelper.easing.easeOutQuart(b, c, t, d)
				},
				changeSection: function (fractionComplete) {
					var moveCurrentSectionBy;
					var direction, currentSection;

					for (var i = 0; i < sectionsOfFunnel.length; i++) {
						moveCurrentSectionBy = moveSectionBy[i];
						currentSection = sectionsOfFunnel[i];

						newY = moveCurrentSectionBy * fractionComplete;
						if (typeof previousMoveForSameSection[i] === "undefined")
							previousMoveForSameSection[i] = 0;
						if (previousMoveForSameSection < 0) previousMoveForSameSection *= -1;

						currentSection.y1 += (newY - previousMoveForSameSection[i]);
						currentSection.y2 += (newY - previousMoveForSameSection[i]);
						currentSection.y3 += (newY - previousMoveForSameSection[i]);
						currentSection.y4 += (newY - previousMoveForSameSection[i]);
						if (!!currentSection.y5) {
							currentSection.y5 += (newY - previousMoveForSameSection[i]);
							currentSection.y6 += (newY - previousMoveForSameSection[i]);
						}

						previousMoveForSameSection[i] = newY;
					}
				}
			};

			var selectedSectionChange = false;

			_this._animator.animate(0, animDuration, function (fractionComplete) {
				animate(fractionComplete, selectedSection, _this.plotArea.ctx || _this.ctx, animatingObject);
			}, null, AnimationHelper.easing.easeOutQuart);

			function moveForEachSection() {
				var movement = [];
				for (var i = 0; i < sectionsOfFunnel.length; i++) {
					movement.push(newPosition[i] - sectionsOfFunnel[i].y1);
				}
				return movement;
			}

			function animate(fractionComplete, selectedSection, ctx, animatingObject) {
				isAnimating = true;

				clearPlotArea(ctx);
				animatingObject.changeSection(fractionComplete, selectedSection);

				var entry = {};
				entry.dataSeries = dataSeries;
				entry.dataPoint = !dataSeries.reversed ? dataSeries.dataPoints[selectedSection] : dataSeries.dataPoints[dataPoints.length - 1 - selectedSection];
				entry.index = !dataSeries.reversed ? selectedSection : dataPoints.length - 1 - selectedSection;
				_this.toolTip.highlightObjects([entry]);

				for (var i = 0; i < sectionsOfFunnel.length; i++) {
					drawSectionOfFunnel(ctx, sectionsOfFunnel[i], dataSeries.fillOpacity);
				}
				renderChartElementsInPlotArea(ctx);

				if (isIndexLabelPresent) {
					if (dataSeries.indexLabelPlacement !== "inside") {
						drawLineToLabel(ctx);
					} else {
						positionLabels();
					}
					renderLabels(ctx);
				}

				if (fractionComplete >= 1) {
					isAnimating = false;
				}
			}

			function clearPlotArea(ctx) {
				ctx.clearRect(plotArea.x1, plotArea.y1, plotArea.x2 - plotArea.x1, plotArea.y2 - plotArea.y1);
				ctx.fillStyle = _this.backgroundColor;
				ctx.fillRect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
			}
		}

		function gapRequired() {
			var gapCount = 0;
			for (var i = 0; i < sectionsOfFunnel.length - 1; i++) {
				if (explodedSections.indexOf(i) >= 0 || explodedSections.indexOf(i + 1) >= 0) {
					gapCount++;
				}
			}
			return gapCount;
		}

		function drawLineToLabel(ctx) {
			var j = 0;
			var startX, startY, endX, endY, lineOffset;
			for (var k = 0; k < sectionsOfFunnel.length; k++) {
				lineOffset = indexLabels[k].lineThickness % 2 === 1 ? 0.5 : 0;
				startY = (((sectionsOfFunnel[k].y2 + sectionsOfFunnel[k].y4) / 2) << 0) + lineOffset;
				startX = calculateX(startY).x2 - 1;

				endX = indexLabels[k].textBlock.x;
				endY = ((indexLabels[k].textBlock.y + indexLabels[k].height / 2) << 0) + lineOffset;

				if (!indexLabels[k].isDirty && indexLabels[k].lineThickness != 0) {
					ctx.strokeStyle = indexLabels[k].lineColor;
					ctx.lineWidth = indexLabels[k].lineThickness;
					if (ctx.setLineDash) {
						ctx.setLineDash(getLineDashArray(indexLabels[k].lineDashType, indexLabels[k].lineThickness));
					}
					ctx.beginPath();
					ctx.moveTo(startX, startY);
					ctx.lineTo(endX, endY);
					ctx.stroke();
				}
			}
		}

		function getPreviousLabelIndex(index) {
			var k;
			for (k = index - 1; k >= -1; k--) {
				if (k == -1) break;
				if (indexLabels[k].isDirty) {
					continue;
				} else {
					break;
				}
			}
			return k;
		}

		function getNextLabelIndex(index) {
			var k;
			for (k = index + 1; k <= sectionsOfFunnel.length; k++) {
				if (k == sectionsOfFunnel.length) break;
				if (indexLabels[k].isDirty) {
					continue;
				} else {
					break;
				}
			}
			return k;
		}

		function calculateX(y) {
			var x1, x2;
			var funnelSection;
			for (var i = 0; i < dataPoints.length; i++) {
				if (sectionsOfFunnel[i].y1 < y && sectionsOfFunnel[i].y4 > y) {
					funnelSection = sectionsOfFunnel[i];
					break;
				}
			}

			if (funnelSection) {
				if (funnelSection.y6) {
					if (y > funnelSection.y6) {
						x1 = funnelSection.x6 + (funnelSection.x5 - funnelSection.x6) / (funnelSection.y5 - funnelSection.y6) * (y - funnelSection.y6);
						x2 = funnelSection.x3 + (funnelSection.x4 - funnelSection.x3) / (funnelSection.y4 - funnelSection.y3) * (y - funnelSection.y3);
					}
					else {
						x1 = funnelSection.x1 + (funnelSection.x6 - funnelSection.x1) / (funnelSection.y6 - funnelSection.y1) * (y - funnelSection.y1);
						x2 = funnelSection.x2 + (funnelSection.x3 - funnelSection.x2) / (funnelSection.y3 - funnelSection.y2) * (y - funnelSection.y2);
					}
				}
				else {
					x1 = funnelSection.x1 + (funnelSection.x4 - funnelSection.x1) / (funnelSection.y4 - funnelSection.y1) * (y - funnelSection.y1);
					x2 = funnelSection.x2 + (funnelSection.x3 - funnelSection.x2) / (funnelSection.y3 - funnelSection.y2) * (y - funnelSection.y2);
				}
				return { x1: x2, x2: x2 };
			} else {
				return -1;
			}
		}

		function renderLabels(ctx) {
			var indexLabel;
			for (var i = 0; i < sectionsOfFunnel.length; i++) {
				if (!indexLabels[i].isDirty) {
					if (ctx)
						indexLabels[i].textBlock.ctx = ctx;
					indexLabels[i].textBlock.render(true);
				}
			}
		}

		function renderChartElementsInPlotArea(ctx) {
			_this.plotArea.layoutManager.reset();
			if (!ctx.roundRect) extendCtx(ctx);
			if (_this.title) {
				if (_this.title.dockInsidePlotArea || (_this.title.horizontalAlign === "center" && _this.title.verticalAlign === "center")) {
					_this.title.ctx = ctx;
					_this.title.render();
				}

			}

			if (_this.subtitles)
				for (var i = 0; i < _this.subtitles.length; i++) {
					var subtitle = _this.subtitles[i];
					if (subtitle.dockInsidePlotArea || (subtitle.horizontalAlign === "center" && subtitle.verticalAlign === "center")) {
						_this.subtitles.ctx = ctx;
						subtitle.render();
					}
				}

			if (_this.legend) {
				if (_this.legend.dockInsidePlotArea || (_this.legend.horizontalAlign === "center" && _this.legend.verticalAlign === "center")) {
					_this.legend.ctx = ctx;
					_this.legend.render();
				}
			}

			if (global.fNg)
				global.fNg(_this);
		}

		var animationInfo = {
			source: ctx, dest: this.plotArea.ctx, animationCallback: function (fractionComplete, animationInfo) {
				AnimationHelper.fadeInAnimation(fractionComplete, animationInfo)

				if (fractionComplete >= 1) {
					explodeToggle(_this, -1, explodeDuration);
					renderChartElementsInPlotArea(_this.plotArea.ctx || _this.ctx);
				}

			}, easingFunction: AnimationHelper.easing.easeInQuad, animationBase: 0
		};
		return animationInfo;
	}
	//#endregion funnelChart

	//#endregion Render Methods
	Chart.prototype.animationRequestId = null;

	Chart.prototype.requestAnimFrame = (function () {
		return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function (callback) {
				window.setTimeout(callback, 1000 / 60);
			};
	})();

	Chart.prototype.cancelRequestAnimFrame = (function () {
		return window.cancelAnimationFrame ||
			window.webkitCancelRequestAnimationFrame ||
			window.mozCancelRequestAnimationFrame ||
			window.oCancelRequestAnimationFrame ||
			window.msCancelRequestAnimationFrame ||
			clearTimeout
	})();

	//#region Public Methods

	Chart.prototype.set = function (name, value, updateChart) {
		updateChart = (typeof (updateChart) === "undefined") ? true : updateChart;

		if (name === "options") {
			this.options = value;

			if (updateChart)
				this.render();
		}
		else
			Chart.base.set.call(this, name, value, updateChart);
	}

	Chart.prototype.exportChart = function (options) {

		options = typeof (options) === "undefined" ? {} : options;
		var format = options.format ? options.format : "png";
		var fileName = options.fileName ? options.fileName : this.exportFileName;

		if (options.toDataURL) {
			return this.canvas.toDataURL("image/" + format);
		} else {
			exportCanvas(this.canvas, format, fileName);
		}
	}

	Chart.prototype.print = function () {
		var chartImageData = this.exportChart({ toDataURL: true });

		var printFrame = document.createElement("iframe");
		//printFrame.setAttribute("id", "canvasjs-print-frame");
		printFrame.setAttribute("class", "canvasjs-chart-print-frame");
		printFrame.setAttribute("style", "position:absolute; width:100%; border: 0px; margin: 0px 0px 0px 0px; padding 0px 0px 0px 0px;");
		printFrame.style.height = this.height + "px";
		this._canvasJSContainer.appendChild(printFrame);
		var _this = this;

		var printDoc = printFrame.contentWindow || printFrame.contentDocument.document || printFrame.contentDocument;

		printDoc.document.open();
		printDoc.document.write('<!DOCTYPE HTML>\n<html><body style="margin: 0px 0px 0px 0px; padding: 0px 0px 0px 0px;"><img src="' + chartImageData + '"/><body/></html>');
		printDoc.document.close();

		setTimeout(function () {
			printDoc.focus();
			printDoc.print();
			setTimeout(function () {
				_this._canvasJSContainer.removeChild(printFrame);
			}, 1000);
		}, 500);


	}

	//#endregion Public Methods

	Chart.prototype.getPercentAndTotal = function (ds, dp) {

		var dpX = null;
		var total = null;
		var percent = null;

		if (ds.type.indexOf("stacked") >= 0) {
			total = 0;
			dpX = dp.x.getTime ? dp.x.getTime() : dp.x;
			if (dpX in ds.plotUnit.yTotals) {
				total = ds.plotUnit.yTotals[dpX];

				if (!isNaN(dp.y)) {
					//if (total === 0)
					//	percent = 0;
					//else
					percent = (dp.y / total) * 100;
				}
				else
					percent = 0;
			}
		} else if (ds.type === "pie" || ds.type === "doughnut" || ds.type === "funnel" || ds.type === "pyramid") {
			total = 0;
			for (i = 0; i < ds.dataPoints.length; i++) {

				if (!isNaN(ds.dataPoints[i].y))
					total += ds.dataPoints[i].y;
			}

			if (!isNaN(dp.y))
				percent = (dp.y / total) * 100;
			else
				percent = 0;
		}

		return {
			percent: percent, total: total
		};
	}

	Chart.prototype.replaceKeywordsWithValue = function (str, dp, ds, dpIndex, indexKeywordValue) {
		//var regex = /\{\s*[a-zA-Z]+\s*\}|"[^"]*"|'[^']*'/g;
		var regex = /\{.*?\}|"[^"]*"|'[^']*'/g;
		var chart = this;
		indexKeywordValue = typeof (indexKeywordValue) === "undefined" ? 0 : indexKeywordValue;

		if ((ds.type.indexOf("stacked") >= 0 || (ds.type === "pie" || ds.type === "doughnut") || (ds.type === "funnel" || ds.type === "pyramid")) && (str.indexOf("#percent") >= 0 || str.indexOf("#total") >= 0)) {
			var percent = "#percent";
			var total = "#total";
			var dpX = null;

			var percentAndTotal = this.getPercentAndTotal(ds, dp);

			total = isNaN(percentAndTotal.total) ? total : percentAndTotal.total;
			percent = isNaN(percentAndTotal.percent) ? percent : percentAndTotal.percent;

			do {
				var percentFormatString = "";
				if (ds.percentFormatString)
					percentFormatString = ds.percentFormatString;
				else {
					percentFormatString = "#,##0.";
					var numberOfDecimals = Math.max(Math.ceil(Math.log(1 / Math.abs(percent)) / Math.LN10), 2);

					if (isNaN(numberOfDecimals) || !isFinite(numberOfDecimals))
						numberOfDecimals = 2;

					for (var n = 0; n < numberOfDecimals; n++) {
						percentFormatString += "#";
					}
					ds.percentFormatString = percentFormatString;
				}

				str = str.replace("#percent", numberFormat(percent, percentFormatString, chart._cultureInfo));
				str = str.replace("#total", numberFormat(total, ds.yValueFormatString ? ds.yValueFormatString : "#,##0.########", chart._cultureInfo));
			} while (str.indexOf("#percent") >= 0 || str.indexOf("#total") >= 0);
		}


		var fcn = function ($0) {
			if (($0[0] === "\"" && $0[$0.length - 1] === "\"") || ($0[0] === "\'" && $0[$0.length - 1] === "\'"))
				return $0.slice(1, $0.length - 1);

			var key = trimString($0.slice(1, $0.length - 1));
			key = key.replace("#index", indexKeywordValue);

			var index = null;

			try {
				var match = key.match(/(.*?)\s*\[\s*(.*?)\s*\]/);
				if (match && match.length > 0) {
					index = trimString(match[2]);
					key = trimString(match[1]);
				}
			} catch (e) {
			};


			var obj = null;

			if (key === "color") {
				if (ds.type === "waterfall")
					return dp.color ? dp.color : dp.y > -1 ? ds.risingColor : ds.fallingColor;
				if (ds.type === "error") {
					return ds.color ? ds.color : ds._colorSet[index % ds._colorSet.length];
				}

				return dp.color ? dp.color : ds.color ? ds.color : ds._colorSet[dpIndex % ds._colorSet.length];
			}

			if (dp.hasOwnProperty(key))
				obj = dp;
			else if (ds.hasOwnProperty(key))
				obj = ds;
			else return "";

			var value = obj[key];
			if (index !== null)
				value = value[index];

			if (key === "x") {
				if (ds.axisX.valueType === "dateTime" || ds.xValueType === "dateTime" || (dp.x && dp.x.getTime)) {
					if (chart.plotInfo.plotTypes[0].plotUnits[0].axisX && !chart.plotInfo.plotTypes[0].plotUnits[0].axisX.logarithmic)
						return dateFormat(value, dp.xValueFormatString ? dp.xValueFormatString : ds.xValueFormatString ? ds.xValueFormatString : (ds.xValueFormatString = chart.axisX && chart.axisX.autoValueFormatString ? chart.axisX.autoValueFormatString : "DD MMM YY"), chart._cultureInfo);
				}
				else
					return numberFormat(value, dp.xValueFormatString ? dp.xValueFormatString : ds.xValueFormatString ? ds.xValueFormatString : (ds.xValueFormatString = "#,##0.########"), chart._cultureInfo);
			} else if (key === "y")
				return numberFormat(value, dp.yValueFormatString ? dp.yValueFormatString : ds.yValueFormatString ? ds.yValueFormatString : (ds.yValueFormatString = "#,##0.########"), chart._cultureInfo);
			else if (key === "z")
				return numberFormat(value, dp.zValueFormatString ? dp.zValueFormatString : ds.zValueFormatString ? ds.zValueFormatString : (ds.zValueFormatString = "#,##0.########"), chart._cultureInfo);
			else
				return value;
		}
		return str.replace(regex, fcn);
	}

	//#endregion Class Chart


	//#region Legend

	//TBI: Implement Markes for Legend
	function Legend(chart, options) {
		Legend.base.constructor.call(this, "Legend", "legend", options, null, chart);

		this.chart = chart;
		this.canvas = chart.canvas;
		this.ctx = this.chart.ctx;
		this.ghostCtx = this.chart._eventManager.ghostCtx;
		this.items = [];

		this.optionsName = "legend";

		this.width = 0,
			//this.fontSize = 12,
			this.height = 0,
			this.orientation = null,
			this.dataSeries = [];
		this.bounds = {
			x1: null, y1: null, x2: null, y2: null
		};

		if (typeof (this.options.fontSize) === "undefined") {
			this.fontSize = this.chart.getAutoFontSize(this.fontSize);
			//window.console.log("fontSize: " + this.fontSize);
		}

		this.lineHeight = getFontHeightInPixels(this.fontFamily, this.fontSize, this.fontWeight);

		this.horizontalSpacing = this.fontSize;
	}
	extend(Legend, CanvasJSObject);

	Legend.prototype.render = function () {

		var container = (!this.dockInsidePlotArea ? this.chart : this.chart.plotArea);
		var freeSpace = container.layoutManager.getFreeSpace();
		var position = null;
		var top = 0;
		var left = 0;
		var maxWidth = 0;
		var maxHeight = 0;
		var markerMargin = this.markerMargin = this.chart.options.legend && !isNullOrUndefined(this.chart.options.legend.markerMargin) ? this.chart.options.legend.markerMargin : this.fontSize * 0.3;
		this.height = 0;

		var items = [];
		var rows = [];

		//this.ctx.font = getFontString("", this, null);
		//this.ctx.fontColor = this.fontColor;

		if (this.verticalAlign === "top" || this.verticalAlign === "bottom") {
			this.orientation = "horizontal";
			position = this.verticalAlign;

			maxWidth = this.maxWidth = this.maxWidth !== null ? this.maxWidth : freeSpace.width;
			maxHeight = this.maxHeight = this.maxHeight !== null ? this.maxHeight : freeSpace.height * .5;
		}
		else if (this.verticalAlign === "center") {
			this.orientation = "vertical";
			position = this.horizontalAlign;

			maxWidth = this.maxWidth = this.maxWidth !== null ? this.maxWidth : freeSpace.width * .5;
			maxHeight = this.maxHeight = this.maxHeight !== null ? this.maxHeight : freeSpace.height;
		}
		var errorMarkerColor = [];
		var errorMarkerSize;
		for (var i = 0; i < this.dataSeries.length; i++) {
			var dataSeries = this.dataSeries[i];
			//Added to avoid error generation because of absence of dataPoints array or elements
			if (!dataSeries.dataPoints || !dataSeries.dataPoints.length) continue;

			if (dataSeries.type !== "pie" && dataSeries.type !== "doughnut" && dataSeries.type !== "funnel" && dataSeries.type !== "pyramid") {

				var markerType = dataSeries.legendMarkerType = dataSeries.legendMarkerType ? dataSeries.legendMarkerType : (dataSeries.type === "line" || dataSeries.type === "stepLine" || dataSeries.type === "spline" || dataSeries.type === "scatter" || dataSeries.type === "bubble") && dataSeries.markerType ? dataSeries.markerType : (dataSeries.type === "error" && dataSeries._linkedSeries) ? dataSeries._linkedSeries.legendMarkerType ? dataSeries._linkedSeries.legendMarkerType : DataSeries.getDefaultLegendMarker(dataSeries._linkedSeries.type) : DataSeries.getDefaultLegendMarker(dataSeries.type);

				var legendText = dataSeries.legendText ? dataSeries.legendText : this.itemTextFormatter ? this.itemTextFormatter({ chart: this.chart, legend: this.options, dataSeries: dataSeries, dataPoint: null })
					: dataSeries.name;
				var markerColor = dataSeries.legendMarkerColor = dataSeries.legendMarkerColor ? dataSeries.legendMarkerColor : dataSeries.markerColor ? dataSeries.markerColor : dataSeries.type === "error" ? isNullOrUndefined(dataSeries.whiskerColor) ? dataSeries._colorSet[0] : dataSeries.whiskerColor : dataSeries._colorSet[0];
				var markerSize = (!dataSeries.markerSize && (dataSeries.type === "line" || dataSeries.type === "stepLine" || dataSeries.type === "spline")) ? 0 : this.lineHeight * .75;

				//if (dataSeries.type === "error") errorMarkerSize = markerSize / 2;

				var markerBorderColor = dataSeries.legendMarkerBorderColor ? dataSeries.legendMarkerBorderColor : dataSeries.markerBorderColor;
				var markerBorderThickness = dataSeries.legendMarkerBorderThickness ? dataSeries.legendMarkerBorderThickness : dataSeries.markerBorderThickness ? Math.max(1, Math.round(markerSize * .2)) : 0;
				var lineColor = dataSeries._colorSet[0];

				if (dataSeries.type === "error") errorMarkerColor.push(markerColor);

				legendText = this.chart.replaceKeywordsWithValue(legendText, dataSeries.dataPoints[0], dataSeries, i);
				var item = {
					markerType: markerType, markerColor: markerColor, text: legendText, textBlock: null, chartType: dataSeries.type, markerSize: markerSize, lineColor: dataSeries._colorSet[0],
					dataSeriesIndex: dataSeries.index, dataPointIndex: null, markerBorderColor: markerBorderColor, markerBorderThickness: markerBorderThickness
				};

				items.push(item);
			} else {
				for (var dataPointIndex = 0; dataPointIndex < dataSeries.dataPoints.length; dataPointIndex++) {

					var dataPoint = dataSeries.dataPoints[dataPointIndex];

					var markerType = dataPoint.legendMarkerType ? dataPoint.legendMarkerType : dataSeries.legendMarkerType ? dataSeries.legendMarkerType : DataSeries.getDefaultLegendMarker(dataSeries.type);
					var legendText = dataPoint.legendText ? dataPoint.legendText : dataSeries.legendText ? dataSeries.legendText : this.itemTextFormatter ? this.itemTextFormatter({ chart: this.chart, legend: this.options, dataSeries: dataSeries, dataPoint: dataPoint })
						: dataPoint.name ? dataPoint.name : "DataPoint: " + (dataPointIndex + 1);
					var markerColor = dataPoint.legendMarkerColor ? dataPoint.legendMarkerColor : dataSeries.legendMarkerColor ? dataSeries.legendMarkerColor : dataPoint.color ? dataPoint.color : dataSeries.color ? dataSeries.color : dataSeries._colorSet[dataPointIndex % dataSeries._colorSet.length];
					var markerSize = this.lineHeight * .75;
					var markerBorderColor = dataPoint.legendMarkerBorderColor ? dataPoint.legendMarkerBorderColor : dataSeries.legendMarkerBorderColor ? dataSeries.legendMarkerBorderColor : dataPoint.markerBorderColor ? dataPoint.markerBorderColor : dataSeries.markerBorderColor;
					var markerBorderThickness = dataPoint.legendMarkerBorderThickness ? dataPoint.legendMarkerBorderThickness : dataSeries.legendMarkerBorderThickness ? dataSeries.legendMarkerBorderThickness : dataPoint.markerBorderThickness || dataSeries.markerBorderThickness ? Math.max(1, Math.round(markerSize * .2)) : 0;

					legendText = this.chart.replaceKeywordsWithValue(legendText, dataPoint, dataSeries, dataPointIndex);

					var item = {
						markerType: markerType, markerColor: markerColor, text: legendText, textBlock: null, chartType: dataSeries.type, markerSize: markerSize,
						dataSeriesIndex: i, dataPointIndex: dataPointIndex, markerBorderColor: markerBorderColor, markerBorderThickness: markerBorderThickness
					};

					if (dataPoint.showInLegend || (dataSeries.showInLegend && dataPoint.showInLegend !== false)) {
						items.push(item);
					}
				}
			}
			item = null;
		}
		if (this.reversed === true) {
			items.reverse();
		}

		// Find out the required width and height of Legend and position the items relative to the container
		if (items.length > 0) {
			var row = null;
			var rowIndex = 0; // required for vertical orientation
			var textMaxWidth = 0;
			var columnHeight = 0;
			var itemWidth = 0;

			if (this.itemWidth !== null) {
				if (this.itemMaxWidth !== null) {
					textMaxWidth = Math.min(this.itemWidth, this.itemMaxWidth, maxWidth);
				} else {
					textMaxWidth = this.itemMaxWidth = Math.min(this.itemWidth, maxWidth);
				}
			} else {
				if (this.itemMaxWidth !== null) {
					textMaxWidth = Math.min(this.itemMaxWidth, maxWidth);
				} else {
					textMaxWidth = this.itemMaxWidth = maxWidth;
				}
			}

			markerSize = (markerSize === 0 ? this.lineHeight * .75 : markerSize);
			textMaxWidth = textMaxWidth - (markerSize + markerMargin);

			for (var i = 0; i < items.length; i++) {
				var item = items[i];
				var itemTextMaxWidth = textMaxWidth;

				if (item.chartType === "line" || item.chartType === "spline" || item.chartType === "stepLine") {
					itemTextMaxWidth = itemTextMaxWidth - 2 * (this.lineHeight * .1);
				}

				if (maxHeight <= 0 || typeof (maxHeight) === "undefined" || itemTextMaxWidth <= 0 || typeof (itemTextMaxWidth) === "undefined") {
					continue;
				}

				if (this.orientation === "horizontal") {

					item.textBlock = new TextBlock(this.ctx, {
						x: 0,
						y: 0,//TBI
						maxWidth: itemTextMaxWidth,
						maxHeight: this.itemWrap ? maxHeight : this.lineHeight, //TBI: FontSize
						angle: 0,
						text: item.text,
						horizontalAlign: "left",//left, center, right
						fontSize: this.fontSize,//in pixels
						fontFamily: this.fontFamily,
						fontWeight: this.fontWeight, //normal, bold, bolder, lighter,
						fontColor: this.fontColor,
						fontStyle: this.fontStyle, // normal, italic, oblique
						textBaseline: "middle"
					});
					item.textBlock.measureText();

					if (this.itemWidth !== null) {
						item.textBlock.width = this.itemWidth - (markerSize + markerMargin + ((item.chartType === "line" || item.chartType === "spline" || item.chartType === "stepLine") ? 2 * (this.lineHeight * .1) : 0));
					}

					if (!row || row.width + Math.round(item.textBlock.width + markerSize + markerMargin + (row.width === 0 ? 0 : (this.horizontalSpacing)) + ((item.chartType === "line" || item.chartType === "spline" || item.chartType === "stepLine") ? 2 * (this.lineHeight * .1) : 0)) > maxWidth) {
						row = {
							items: [], width: 0
						};
						rows.push(row);
						this.height += columnHeight;
						columnHeight = 0;
					}

					columnHeight = Math.max(columnHeight, item.textBlock.height);

					item.textBlock.x = row.width;
					item.textBlock.y = 0;

					row.width += Math.round(item.textBlock.width + markerSize + markerMargin + (row.width === 0 ? 0 : this.horizontalSpacing) + ((item.chartType === "line" || item.chartType === "spline" || item.chartType === "stepLine") ? 2 * (this.lineHeight * .1) : 0));
					row.items.push(item);

					this.width = Math.max(row.width, this.width);
				} else {

					item.textBlock = new TextBlock(this.ctx, {
						x: 0,
						y: 0,//TBI
						maxWidth: textMaxWidth,
						maxHeight: this.itemWrap === true ? maxHeight : this.fontSize * 1.5, //TBI: FontSize
						angle: 0,
						text: item.text,
						horizontalAlign: "left",//left, center, right
						fontSize: this.fontSize,//in pixels
						fontFamily: this.fontFamily,
						fontWeight: this.fontWeight, //normal, bold, bolder, lighter,
						fontColor: this.fontColor,
						fontStyle: this.fontStyle, // normal, italic, oblique
						textBaseline: "middle"
					});

					item.textBlock.measureText();

					if (this.itemWidth !== null) {
						item.textBlock.width = this.itemWidth - (markerSize + markerMargin + ((item.chartType === "line" || item.chartType === "spline" || item.chartType === "stepLine") ? 2 * (this.lineHeight * .1) : 0));
					}

					if (this.height < maxHeight - this.lineHeight) {
						row = {
							items: [], width: 0
						};
						rows.push(row);
					} else {
						row = rows[rowIndex];
						rowIndex = (rowIndex + 1) % rows.length;
					}

					this.height += item.textBlock.height;

					item.textBlock.x = row.width; // relative to the row                    
					item.textBlock.y = 0; // relative to the row                                   

					row.width += Math.round(item.textBlock.width + markerSize + markerMargin + (row.width === 0 ? 0 : this.horizontalSpacing) + ((item.chartType === "line" || item.chartType === "spline" || item.chartType === "stepLine") ? 2 * (this.lineHeight * .1) : 0));
					row.items.push(item);

					this.width = Math.max(row.width, this.width);
				}
				itemWidth = item.textBlock.width + (markerSize + markerMargin + ((item.chartType === "line" || item.chartType === "spline" || item.chartType === "stepLine") ? 2 * (this.lineHeight * .1) : 0));
			}
			this.itemWidth = itemWidth;

			if (this.itemWrap === false) {
				this.height = rows.length * (this.lineHeight);
			} else {
				this.height += columnHeight;
			}

			this.height = Math.min(maxHeight, this.height);
			this.width = Math.min(maxWidth, this.width);
		}

		if (this.verticalAlign === "top") {
			if (this.horizontalAlign === "left")
				left = freeSpace.x1;
			else if (this.horizontalAlign === "right")
				left = freeSpace.x2 - this.width;
			else
				left = freeSpace.x1 + freeSpace.width / 2 - this.width / 2;

			top = freeSpace.y1;
		} else if (this.verticalAlign === "center") {
			if (this.horizontalAlign === "left")
				left = freeSpace.x1;
			else if (this.horizontalAlign === "right")
				left = freeSpace.x2 - this.width;
			else
				left = freeSpace.x1 + freeSpace.width / 2 - this.width / 2;

			top = freeSpace.y1 + freeSpace.height / 2 - this.height / 2;
		} else if (this.verticalAlign === "bottom") {
			if (this.horizontalAlign === "left")
				left = freeSpace.x1;
			else if (this.horizontalAlign === "right")
				left = freeSpace.x2 - this.width;
			else
				left = freeSpace.x1 + freeSpace.width / 2 - this.width / 2;

			top = freeSpace.y2 - this.height;
		}

		this.items = items;

		//Assign ids to all legendItems
		for (var i = 0; i < this.items.length; i++) {

			var item = items[i];

			item.id = ++this.chart._eventManager.lastObjectId;
			this.chart._eventManager.objectMap[item.id] = {
				id: item.id, objectType: "legendItem", legendItemIndex: i, dataSeriesIndex: item.dataSeriesIndex, dataPointIndex: item.dataPointIndex
			};
			//delete item.textBlock;// Not Required anymore
		}

		if ((this.borderThickness > 0 && this.borderColor) || this.backgroundColor) {
			this.ctx.roundRect(left, top, this.width, this.height, this.cornerRadius, this.borderThickness, this.backgroundColor, this.borderColor);
		}

		var rowHeight = 0;
		for (var i = 0; i < rows.length; i++) {
			var row = rows[i];
			var columnHeight = 0;
			for (var itemIndex = 0; itemIndex < row.items.length; itemIndex++) {
				var item = row.items[itemIndex];

				var itemX = item.textBlock.x + left + (itemIndex === 0 ? markerSize * .2 : this.horizontalSpacing);
				var itemY = top + rowHeight;

				var ghostX = itemX;

				if (!this.chart.data[item.dataSeriesIndex].visible)
					this.ctx.globalAlpha = .5;

				this.ctx.save();
				this.ctx.beginPath();
				this.ctx.rect(left, top, maxWidth, Math.max(maxHeight - (maxHeight % this.lineHeight), 0));
				this.ctx.clip();

				if (item.chartType === "line" || item.chartType === "stepLine" || item.chartType === "spline") {
					this.ctx.strokeStyle = item.lineColor;
					this.ctx.lineWidth = Math.ceil(this.lineHeight / 8);
					this.ctx.beginPath();
					this.ctx.moveTo(itemX - this.lineHeight * .1, itemY + this.lineHeight / 2);
					this.ctx.lineTo(itemX + this.lineHeight * .85, itemY + this.lineHeight / 2);
					this.ctx.stroke();

					ghostX -= this.lineHeight * .1;
				}

				if (item.chartType === "error") {

					this.ctx.strokeStyle = errorMarkerColor[0];
					markerBorderThickness = markerSize / 8;
					this.ctx.lineWidth = markerBorderThickness;

					this.ctx.beginPath();
					var x = itemX - this.lineHeight * .08 + this.lineHeight * .1;
					var y = itemY + this.lineHeight * .15;
					var width = this.lineHeight * .70;
					var height = width + this.lineHeight * .02;

					//this.ctx.rect(x, y, width, height);

					this.ctx.moveTo(x, y);
					this.ctx.lineTo(x + width, y);
					this.ctx.stroke();

					this.ctx.beginPath();
					this.ctx.moveTo(x + width / 2, y);
					this.ctx.lineTo(x + width / 2, y + height);
					this.ctx.stroke();

					this.ctx.beginPath();
					this.ctx.moveTo(x, y + height);
					this.ctx.lineTo(x + width, y + height);

					this.ctx.stroke();

					errorMarkerColor.shift();
				}

				var actualMarkerSize = (item.chartType === "error" || item.chartType === "line" || item.chartType === "spline") ? item.markerSize / 2 : item.markerSize;
				RenderHelper.drawMarker(itemX + markerSize / 2, itemY + (this.lineHeight / 2), this.ctx, item.markerType, actualMarkerSize, item.markerColor, item.markerBorderColor, item.markerBorderThickness);

				item.textBlock.x = itemX + markerMargin + markerSize;

				if (item.chartType === "line" || item.chartType === "stepLine" || item.chartType === "spline") {
					item.textBlock.x = item.textBlock.x + this.lineHeight * .1;
				}

				item.textBlock.y = Math.round(itemY + this.lineHeight / 2);

				item.textBlock.render(true);

				this.ctx.restore();

				if (itemIndex > 0) {
					columnHeight = Math.max(columnHeight, item.textBlock.height);
				} else {
					columnHeight = item.textBlock.height;
				}

				if (!this.chart.data[item.dataSeriesIndex].visible)
					this.ctx.globalAlpha = 1;

				var hexColor = intToHexColorString(item.id);
				this.ghostCtx.fillStyle = hexColor;
				this.ghostCtx.beginPath();
				this.ghostCtx.fillRect(ghostX, item.textBlock.y - this.lineHeight / 2, item.textBlock.x + item.textBlock.width - ghostX, item.textBlock.height);

				item.x1 = this.chart._eventManager.objectMap[item.id].x1 = ghostX;
				item.y1 = this.chart._eventManager.objectMap[item.id].y1 = item.textBlock.y - this.lineHeight / 2;
				item.x2 = this.chart._eventManager.objectMap[item.id].x2 = item.textBlock.x + item.textBlock.width;
				item.y2 = this.chart._eventManager.objectMap[item.id].y2 = item.textBlock.y + item.textBlock.height - this.lineHeight / 2;
			}
			rowHeight = rowHeight + columnHeight;
		}

		//this.ctx.beginPath();
		//this.ctx.lineWidth = 2;
		//this.ctx.strokeStyle = "red";
		//this.ctx.rect(left, top, this.width, this.height);
		//this.ctx.stroke();

		if (items.length > 0)
			container.layoutManager.registerSpace(position, { width: this.width + 2 + 2, height: this.height + 5 + 5 });

		this.bounds = {
			x1: left, y1: top, x2: left + this.width, y2: top + this.height
		};
	}

	//#endregion Legend


	//#region DataSeries

	function DataSeries(chart, options, index, id) {
		DataSeries.base.constructor.call(this, "DataSeries", "data", options, index, chart);

		this.chart = chart;
		this.canvas = chart.canvas;
		this._ctx = chart.canvas.ctx;
		this.index = index;
		this.noDataPointsInPlotArea = 0;
		//this.maxWidthInX = 0;
		this.id = id;
		this.chart._eventManager.objectMap[id] = {
			id: id, objectType: "dataSeries", dataSeriesIndex: index
		}

		var numberOfDataPoints = options.dataPoints ? options.dataPoints.length : 0;
		this.dataPointEOs = [];

		for (var i = 0; i < numberOfDataPoints; i++)
			this.dataPointEOs[i] = {};

		this.dataPointIds = [];
		this.plotUnit = [];

		this.axisX = null;
		this.axisY = null;

		this.optionsName = "data"
		this.isOptionsInArray = true;

		if (this.fillOpacity === null) {
			if (this.type.match(/area/i))
				this.fillOpacity = .7;
			else
				this.fillOpacity = 1;
		}

		this.axisPlacement = this.getDefaultAxisPlacement();

		if (typeof (this.options.indexLabelFontSize) === "undefined") {

			this.indexLabelFontSize = this.chart.getAutoFontSize(this.indexLabelFontSize);
		}
	}
	extend(DataSeries, CanvasJSObject);

	//Static Method that returns the axisPlacement for a given ChartType. Returns one of "normal", "xySwapped", "none"
	DataSeries.prototype.getDefaultAxisPlacement = function () {

		//if (!this.visible)
		//	return "none";

		//type = this.type.toLowerCase();
		var type = this.type;

		if (type === "column" || type === "line" || type === "stepLine" || type === "spline" || type === "area" || type === "stepArea" || type === "splineArea" || type === "stackedColumn" || type === "stackedLine" || type === "bubble" || type === "scatter"
			|| type === "stackedArea" || type === "stackedColumn100" || type === "stackedLine100" || type === "stackedArea100"
			|| type === "candlestick" || type === "ohlc" || type === "rangeColumn" || type === "rangeArea" || type === "rangeSplineArea" || type === "boxAndWhisker"
			|| type === "waterfall") {
			return "normal";
		}
		else if (type === "bar" || type === "stackedBar" || type === "stackedBar100" || type === "rangeBar") {

			return "xySwapped";
		}
		else if (type === "pie" || type === "doughnut" || type === "funnel" || type === "pyramid") {
			return "none";
		} else {
			if (type !== "error")
				window.console.log("Unknown Chart Type: " + type);
			return null;
		}
	}

	DataSeries.getDefaultLegendMarker = function (type) {

		//type = type.toLowerCase();

		if (type === "column" || type === "stackedColumn" || type === "stackedLine" || type === "bar" || type === "stackedBar" || type === "stackedBar100"
			|| type === "bubble" || type === "scatter"
			|| type === "stackedColumn100" || type === "stackedLine100" || type === "stepArea"
			|| type === "candlestick" || type === "ohlc" || type === "rangeColumn" || type === "rangeBar" || type === "rangeArea" || type === "rangeSplineArea" || type === "boxAndWhisker"
			|| type === "waterfall") {
			return "square";
		}
		else if (type === "line" || type === "stepLine" || type === "spline" || type === "pie" || type === "doughnut") {
			return "circle";
		} else if (type === "area" || type === "splineArea" || type === "stackedArea" || type === "stackedArea100" || type === "funnel" || type === "pyramid") {
			return "triangle"
		} else if (type === "error") {
			return "none"
		} else {
			window.console.log("Unknown Chart Type: " + type);
			return null;
		}
	}

	//Finds dataPoint with the given x value. If findClosest is set, finds dataPoint with closest x value. 
	//Returns searchResult object if found, else returns null
	DataSeries.prototype.getDataPointAtX = function (x, findClosest) {

		if (!this.dataPoints || this.dataPoints.length === 0) return null;

		var searchResult = {
			dataPoint: null, distance: Infinity, index: NaN
		};
		var dataPoint = null;

		var j = 0;
		var i = 0;
		var direction = 1; // +1 for foward and -1 for backward.

		var minimumXDistance = Infinity;
		var forwardMissCount = 0, backwardMissCount = 0;
		var maxMissCount = 1000;
		var searchStartIndex = 0;

		if (this.chart.plotInfo.axisPlacement !== "none") {

			//var xRange = (this.dataPoints[this.dataPoints.length - 1].x - this.dataPoints[0].x);

			//if (xRange > 0)
			//	searchStartIndex = ((this.dataPoints.length - 1) / xRange * (x - this.dataPoints[0].x)) >> 0;
			//else
			//	searchStartIndex = 0;
			if (this.axisX.logarithmic) {
				var xRange = Math.log(this.dataPoints[this.dataPoints.length - 1].x / this.dataPoints[0].x);
				if (xRange > 1)
					searchStartIndex = Math.min(Math.max(((this.dataPoints.length - 1) / xRange * Math.log(x / this.dataPoints[0].x)) >> 0, 0), this.dataPoints.length);
				else
					searchStartIndex = 0;
			} else {
				var xRange = (this.dataPoints[this.dataPoints.length - 1].x - this.dataPoints[0].x);

				if (xRange > 0)
					searchStartIndex = Math.min(Math.max(((this.dataPoints.length - 1) / xRange * (x - this.dataPoints[0].x)) >> 0, 0), this.dataPoints.length);
				else
					searchStartIndex = 0;
			}

			//searchStartIndex = ((this.dataPoints[this.dataPoints.length - 1].x - this.dataPoints[0].x) / this.dataPoints.length * (x - this.dataPoints[0].x)) >> 0;
		}

		while (true) {

			i = (direction > 0) ? searchStartIndex + j : searchStartIndex - j;

			if (i >= 0 && i < this.dataPoints.length) {

				dataPoint = this.dataPoints[i];

				var distance = this.axisX.logarithmic ? dataPoint.x > x ? dataPoint.x / x : x / dataPoint.x : Math.abs(dataPoint.x - x);

				if (distance < searchResult.distance) {
					searchResult.dataPoint = dataPoint;
					searchResult.distance = distance;
					searchResult.index = i;
				}

				var xDistance = distance; //Math.abs(dataPoint.x - x);
				if (xDistance <= minimumXDistance)
					minimumXDistance = xDistance;
				else {
					if (direction > 0)
						forwardMissCount++;
					else
						backwardMissCount++;
				}

				if (forwardMissCount > maxMissCount && backwardMissCount > maxMissCount)
					break;


			} else if (searchStartIndex - j < 0 && searchStartIndex + j >= this.dataPoints.length)
				break;

			if (direction === -1) {
				j++;
				direction = 1;
			} else
				direction = -1;
		}


		if (!findClosest && searchResult.dataPoint.x === x)
			return searchResult;
		else if (findClosest && searchResult.dataPoint !== null)
			return searchResult;
		else
			return null;
	}

	// x & y should be in pixels. Can be used only after rendering the chart.
	DataSeries.prototype.getDataPointAtXY = function (x, y, getClosest) {

		if (!this.dataPoints || this.dataPoints.length === 0 || x < this.chart.plotArea.x1 || x > this.chart.plotArea.x2 || y < this.chart.plotArea.y1 || y > this.chart.plotArea.y2) return null;

		getClosest = getClosest || false;
		var results = [];
		var j = 0, i = 0;
		var direction = 1; // +1 for foward and -1 for backward.
		var foundDataPoint = false;
		var minimumXDistance = Infinity;
		var forwardMissCount = 0, backwardMissCount = 0;
		var maxMissCount = 1000;
		var searchStartIndex = 0;

		if (this.chart.plotInfo.axisPlacement !== "none") {
			var xAxis = this.chart.axisX[0] ? this.chart.axisX[0] : this.chart.axisX2[0];
			var xval = xAxis.getXValueAt({ x: x, y: y });

			if (this.axisX.logarithmic) {
				var xRange = Math.log(this.dataPoints[this.dataPoints.length - 1].x / this.dataPoints[0].x);
				if (xRange > 1)
					searchStartIndex = Math.min(Math.max(((this.dataPoints.length - 1) / xRange * Math.log(xval / this.dataPoints[0].x)) >> 0, 0), this.dataPoints.length);
				else
					searchStartIndex = 0;
			} else {
				var xRange = (this.dataPoints[this.dataPoints.length - 1].x - this.dataPoints[0].x);

				if (xRange > 0)
					searchStartIndex = Math.min(Math.max(((this.dataPoints.length - 1) / xRange * (xval - this.dataPoints[0].x)) >> 0, 0), this.dataPoints.length);
				else
					searchStartIndex = 0;

				//var xRange = (this.axisX._absoluteMaximum - this.axisX._absoluteMinimum);

				//if (xRange > 0)
				//	searchStartIndex = Math.min(Math.max(((this.dataPoints.length - 1) / xRange * (xval - this.axisX._absoluteMinimum)) >> 0, 0), this.dataPoints.length);
				//else
				//	searchStartIndex = 0;
			}
		}

		while (true) {

			//i = searchStartIndex + (j * direction);
			i = (direction > 0) ? searchStartIndex + j : searchStartIndex - j;

			if (i >= 0 && i < this.dataPoints.length) {

				var id = this.dataPointIds[i];
				var visualInfo = this.chart._eventManager.objectMap[id];
				var dataPoint = this.dataPoints[i];
				var distance = null;

				if (visualInfo) {

					switch (this.type) {

						case "column":
						case "stackedColumn":
						case "stackedColumn100":
						case "bar":
						case "stackedBar":
						case "stackedBar100":
						case "rangeColumn":
						case "rangeBar":
						case "waterfall":
						case "error":

							if (x >= visualInfo.x1 && x <= visualInfo.x2 && y >= visualInfo.y1 && y <= visualInfo.y2) {
								results.push({
									dataPoint: dataPoint,
									dataPointIndex: i,
									dataSeries: this,
									distance: Math.min(Math.abs(visualInfo.x1 - x), Math.abs(visualInfo.x2 - x), Math.abs(visualInfo.y1 - y), Math.abs(visualInfo.y2 - y))
									//distance:0
								});
								foundDataPoint = true;
							}
							break;

						case "line":
						case "stepLine":
						case "spline":
						case "area":
						case "stepArea":
						case "stackedArea":
						case "stackedArea100":
						case "splineArea":
						case "scatter":
							var markerSize = getProperty("markerSize", dataPoint, this) || 4;
							var snapDistance = getClosest ? 20 : markerSize;

							distance = Math.sqrt(Math.pow(visualInfo.x1 - x, 2) + Math.pow(visualInfo.y1 - y, 2));
							if (distance <= snapDistance) {
								results.push({
									dataPoint: dataPoint,
									dataPointIndex: i,
									dataSeries: this,
									distance: distance
								});
							}

							var xDistance = Math.abs(visualInfo.x1 - x);
							if (xDistance <= minimumXDistance)
								minimumXDistance = xDistance;
							else {
								if (direction > 0)
									forwardMissCount++;
								else
									backwardMissCount++;
							}

							if (distance <= markerSize / 2) {
								foundDataPoint = true;
							}

							break;

						case "rangeArea":
						case "rangeSplineArea":

							var markerSize = getProperty("markerSize", dataPoint, this) || 4;
							var snapDistance = getClosest ? 20 : markerSize;

							distance = Math.min(Math.sqrt(Math.pow(visualInfo.x1 - x, 2) + Math.pow(visualInfo.y1 - y, 2)), Math.sqrt(Math.pow(visualInfo.x1 - x, 2) + Math.pow(visualInfo.y2 - y, 2)));
							if (distance <= snapDistance) {
								results.push({
									dataPoint: dataPoint,
									dataPointIndex: i,
									dataSeries: this,
									distance: distance
								});
							}

							var xDistance = Math.abs(visualInfo.x1 - x);
							if (xDistance <= minimumXDistance)
								minimumXDistance = xDistance;
							else {
								if (direction > 0)
									forwardMissCount++;
								else
									backwardMissCount++;
							}

							if (distance <= markerSize / 2) {
								foundDataPoint = true;
							}

							break;

						case "bubble":
							var markerSize = visualInfo.size;
							distance = Math.sqrt(Math.pow(visualInfo.x1 - x, 2) + Math.pow(visualInfo.y1 - y, 2));
							if (distance <= markerSize / 2) {
								results.push({
									dataPoint: dataPoint,
									dataPointIndex: i,
									dataSeries: this,
									distance: distance
								});

								foundDataPoint = true;
							}
							break;

						case "pie":
						case "doughnut":
							var center = visualInfo.center;
							var innerRadius = this.type === "doughnut" ? visualInfo.percentInnerRadius * visualInfo.radius : 0;

							distance = Math.sqrt(Math.pow(center.x - x, 2) + Math.pow(center.y - y, 2));
							if (distance < visualInfo.radius && distance > innerRadius) {

								var deltaY = y - center.y;
								var deltaX = x - center.x;
								var angle = Math.atan2(deltaY, deltaX);

								if (angle < 0)
									angle += Math.PI * 2;

								angle = Number((((angle / Math.PI * 180 % 360) + 360) % 360).toFixed(12));
								//console.log(angle);


								var startAngle = Number((((visualInfo.startAngle / Math.PI * 180 % 360) + 360) % 360).toFixed(12));
								var endAngle = Number((((visualInfo.endAngle / Math.PI * 180 % 360) + 360) % 360).toFixed(12));

								//So that data point is detected when there is only one dataPoint
								if (endAngle === 0 && visualInfo.endAngle > 1) {
									endAngle = 360;
								}

								if (startAngle >= endAngle && dataPoint.y !== 0) {
									endAngle += 360;

									if (angle < startAngle)
										angle += 360;
								}


								if (angle > startAngle && angle < endAngle) {
									results.push({
										dataPoint: dataPoint,
										dataPointIndex: i,
										dataSeries: this,
										distance: 0
									});

									foundDataPoint = true;
								}

							}

							break;

						case "funnel":
						case "pyramid":
							var funnelSection = visualInfo.funnelSection;
							var x1, x2;
							if (y > funnelSection.y1 && y < funnelSection.y4) {
								if (funnelSection.y6) {
									if (y > funnelSection.y6) {
										x1 = funnelSection.x6 + (funnelSection.x5 - funnelSection.x6) / (funnelSection.y5 - funnelSection.y6) * (y - funnelSection.y6);
										x2 = funnelSection.x3 + (funnelSection.x4 - funnelSection.x3) / (funnelSection.y4 - funnelSection.y3) * (y - funnelSection.y3);
									}
									else {
										x1 = funnelSection.x1 + (funnelSection.x6 - funnelSection.x1) / (funnelSection.y6 - funnelSection.y1) * (y - funnelSection.y1);
										x2 = funnelSection.x2 + (funnelSection.x3 - funnelSection.x2) / (funnelSection.y3 - funnelSection.y2) * (y - funnelSection.y2);
									}
								}
								else {
									x1 = funnelSection.x1 + (funnelSection.x4 - funnelSection.x1) / (funnelSection.y4 - funnelSection.y1) * (y - funnelSection.y1);
									x2 = funnelSection.x2 + (funnelSection.x3 - funnelSection.x2) / (funnelSection.y3 - funnelSection.y2) * (y - funnelSection.y2);
								}

								if (x > x1 && x < x2) {
									results.push({
										dataPoint: dataPoint,
										dataPointIndex: visualInfo.dataPointIndex,
										dataSeries: this,
										distance: 0
									});

									foundDataPoint = true;
								}
							}

							break;

						case "boxAndWhisker":
							if (((x >= (visualInfo.x1 - visualInfo.borderThickness / 2)) && (x <= (visualInfo.x2 + visualInfo.borderThickness / 2))
								&& (y >= visualInfo.y4 - visualInfo.borderThickness / 2) && (y <= visualInfo.y1 + visualInfo.borderThickness / 2))
								|| (Math.abs(visualInfo.x2 - x + visualInfo.x1 - x) < visualInfo.borderThickness && (y >= visualInfo.y1 && y <= visualInfo.y4))) {
								results.push({
									dataPoint: dataPoint,
									dataPointIndex: i,
									dataSeries: this,
									distance: Math.min(Math.abs(visualInfo.x1 - x), Math.abs(visualInfo.x2 - x), Math.abs(visualInfo.y2 - y), Math.abs(visualInfo.y3 - y))
									//distance:0
								});

								foundDataPoint = true;
							}
							break;

						case "candlestick":
							if (((x >= (visualInfo.x1 - visualInfo.borderThickness / 2)) && (x <= (visualInfo.x2 + visualInfo.borderThickness / 2))
								&& (y >= visualInfo.y2 - visualInfo.borderThickness / 2) && (y <= visualInfo.y3 + visualInfo.borderThickness / 2))
								|| (Math.abs(visualInfo.x2 - x + visualInfo.x1 - x) < visualInfo.borderThickness && (y >= visualInfo.y1 && y <= visualInfo.y4))) {
								results.push({
									dataPoint: dataPoint,
									dataPointIndex: i,
									dataSeries: this,
									distance: Math.min(Math.abs(visualInfo.x1 - x), Math.abs(visualInfo.x2 - x), Math.abs(visualInfo.y2 - y), Math.abs(visualInfo.y3 - y))
									//distance:0
								});

								foundDataPoint = true;
							}
							break;

						case "ohlc":

							if ((Math.abs(visualInfo.x2 - x + visualInfo.x1 - x) < visualInfo.borderThickness && (y >= visualInfo.y2 && y <= visualInfo.y3))

								|| (x >= visualInfo.x1 && (x <= (visualInfo.x2 + visualInfo.x1) / 2)
									&& (y >= visualInfo.y1 - visualInfo.borderThickness / 2) && (y <= visualInfo.y1 + visualInfo.borderThickness / 2))

								|| ((x >= (visualInfo.x1 + visualInfo.x2) / 2) && (x <= visualInfo.x2)
									&& (y >= visualInfo.y4 - visualInfo.borderThickness / 2) && (y <= visualInfo.y4 + visualInfo.borderThickness / 2))) {

								results.push({
									dataPoint: dataPoint,
									dataPointIndex: i,
									dataSeries: this,
									distance: Math.min(Math.abs(visualInfo.x1 - x), Math.abs(visualInfo.x2 - x), Math.abs(visualInfo.y2 - y), Math.abs(visualInfo.y3 - y))
									//distance:0
								});

								foundDataPoint = true;
							}
							break;

					}

					if (foundDataPoint || (forwardMissCount > maxMissCount && backwardMissCount > maxMissCount))
						break;
				}

			} else if (searchStartIndex - j < 0 && searchStartIndex + j >= this.dataPoints.length)
				break;

			if (direction === -1) {
				j++;
				direction = 1;
			} else
				direction = -1;

		}



		var closestResult = null;

		for (var m = 0; m < results.length; m++) {
			if (!closestResult) {
				closestResult = results[m];
			} else if (results[m].distance <= closestResult.distance) {
				closestResult = results[m];
			}
		}

		//if (window.console)
		//	window.console.log("forwardMissCount: " + forwardMissCount + "; backwardMissCount: " + backwardMissCount + "; getClosest: " + getClosest);

		//if (window.console && closestResult)
		//    window.console.log(j + ": distance = " + closestResult.distance);

		return closestResult;
	}

	DataSeries.prototype.getMarkerProperties = function (index, x, y, ctx) {
		var dataPoints = this.dataPoints;
		var dataSeries = this;

		var markerColor = dataPoints[index].markerColor ? dataPoints[index].markerColor : dataSeries.markerColor ? dataSeries.markerColor : dataPoints[index].color ? dataPoints[index].color : dataSeries.color ? dataSeries.color : dataSeries._colorSet[index % dataSeries._colorSet.length];
		var markerBorderColor = dataPoints[index].markerBorderColor ? dataPoints[index].markerBorderColor : dataSeries.markerBorderColor ? dataSeries.markerBorderColor : null;
		var markerBorderThickness = dataPoints[index].markerBorderThickness ? dataPoints[index].markerBorderThickness : dataSeries.markerBorderThickness ? dataSeries.markerBorderThickness : null;
		var markerType = dataPoints[index].markerType ? dataPoints[index].markerType : dataSeries.markerType;
		var markerSize = dataPoints[index].markerSize ? dataPoints[index].markerSize : dataSeries.markerSize;


		return {
			x: x, y: y, ctx: ctx,
			type: markerType,
			size: markerSize,
			color: markerColor,
			borderColor: markerBorderColor,
			borderThickness: markerBorderThickness
		}
	}
	//#endregion DataSeries

	//#region Axis

	function Axis(chart, themeOptionsKey, options, index, type, position) {
		Axis.base.constructor.call(this, "Axis", themeOptionsKey, options, index, chart);

		this.chart = chart;
		this.canvas = chart.canvas;
		this.ctx = chart.ctx;
		this.maxWidth = 0;
		this.maxHeight = 0;
		this.intervalStartPosition = 0;
		this.labels = [];
		this.dataSeries = [];
		this._labels = null;
		this._ticks = null;
		this._stripLineLabels = null;

		//Processed information about the data that gets plotted against this axis
		this.dataInfo = {
			min: Infinity,
			max: -Infinity,
			viewPortMin: Infinity,
			viewPortMax: -Infinity,
			minDiff: Infinity // Used only in case of axisX
		};

		this.isOptionsInArray = true;

		if (type === "axisX") {
			if (position === "left" || position === "bottom") {
				this.optionsName = "axisX";
				if (isNullOrUndefined(this.chart.sessionVariables["axisX"][index]))
					this.chart.sessionVariables["axisX"][index] = {};

				this.sessionVariables = this.chart.sessionVariables["axisX"][index];
			}
			else {
				this.optionsName = "axisX2";
				if (isNullOrUndefined(this.chart.sessionVariables["axisX2"][index]))
					this.chart.sessionVariables["axisX2"][index] = {};

				this.sessionVariables = this.chart.sessionVariables["axisX2"][index];
			}

			if (!this.options.interval)
				this.intervalType = null;

		} else {
			if (position === "left" || position === "bottom") {
				this.optionsName = "axisY";
				if (isNullOrUndefined(this.chart.sessionVariables["axisY"][index]))
					this.chart.sessionVariables["axisY"][index] = {};

				this.sessionVariables = this.chart.sessionVariables["axisY"][index];
			}
			else {
				this.optionsName = "axisY2";
				if (isNullOrUndefined(this.chart.sessionVariables["axisY2"][index]))
					this.chart.sessionVariables["axisY2"][index] = {};

				this.sessionVariables = this.chart.sessionVariables["axisY2"][index];
			}
		}


		if (typeof (this.options.titleFontSize) === "undefined") {

			this.titleFontSize = this.chart.getAutoFontSize(this.titleFontSize);

			//window.console.log("titleFontSize: " + this.titleFontSize);
		}

		if (typeof (this.options.labelFontSize) === "undefined") {

			this.labelFontSize = this.chart.getAutoFontSize(this.labelFontSize);

			//window.console.log("labelFontSize: " + this.labelFontSize);

		}

		//Axis Type : axisX, axisY
		this.type = type;
		if (type === "axisX" && (!options || typeof (options.gridThickness) === "undefined"))
			this.gridThickness = 0;

		this._position = position;

		this.lineCoordinates = {
			x1: null, y1: null, x2: null, y2: null, width: null
		};//{x1:, y1:, x2:, y2:, width:}
		//
		{
			this.labelAngle = ((this.labelAngle % 360) + 360) % 360;

			if (this.labelAngle > 90 && this.labelAngle < 270)
				this.labelAngle -= 180;
			else if (this.labelAngle >= 270 && this.labelAngle <= 360)
				this.labelAngle -= 360
		}

		if (this.options.scaleBreaks) {
			this.scaleBreaks = new ScaleBreaks(this.chart, this.options.scaleBreaks, ++this.chart._eventManager.lastObjectId, this);

		}

		this.stripLines = [];

		if (this.options.stripLines && this.options.stripLines.length > 0) {

			for (var i = 0; i < this.options.stripLines.length; i++) {
				this.stripLines.push(new StripLine(this.chart, this.options.stripLines[i], i, ++this.chart._eventManager.lastObjectId, this));
			}
		}

		if (this.options.crosshair)
			this.crosshair = new Crosshair(this.chart, this.options.crosshair, this);

		this._titleTextBlock = null;

		if (this.hasOptionChanged("viewportMinimum") && this.viewportMinimum === null) {
			this.options.viewportMinimum = undefined;
			this.sessionVariables.viewportMinimum = null;
		}

		if (!this.hasOptionChanged("viewportMinimum") && !isNaN(this.sessionVariables.newViewportMinimum) && this.sessionVariables.newViewportMinimum !== null)
			this.viewportMinimum = this.sessionVariables.newViewportMinimum;
		else
			this.sessionVariables.newViewportMinimum = null;


		if (this.hasOptionChanged("viewportMaximum") && this.viewportMaximum === null) {
			this.options.viewportMaximum = undefined;
			this.sessionVariables.viewportMaximum = null;
		}

		if (!this.hasOptionChanged("viewportMaximum") && !isNaN(this.sessionVariables.newViewportMaximum) && this.sessionVariables.newViewportMaximum !== null)
			this.viewportMaximum = this.sessionVariables.newViewportMaximum;
		else
			this.sessionVariables.newViewportMaximum = null;

		if (this.minimum !== null && this.viewportMinimum !== null)
			this.viewportMinimum = Math.max(this.viewportMinimum, this.minimum);

		if (this.maximum !== null && this.viewportMaximum !== null)
			this.viewportMaximum = Math.min(this.viewportMaximum, this.maximum);

		this.trackChanges("viewportMinimum");
		this.trackChanges("viewportMaximum");
	}

	extend(Axis, CanvasJSObject);

	Axis.prototype.createExtraLabelsForLog = function (recursionCount) {
		recursionCount = (recursionCount || 0) + 1;

		if (recursionCount > 5)
			return;
		var start = this.logLabelValues[0] || this.intervalStartPosition;

		if (Math.log(this.range) / Math.log(start / this.viewportMinimum) < this.noTicks - 1) {
			var interval = Axis.getNiceNumber((start - this.viewportMinimum) / Math.min(Math.max(2, this.noTicks - this.logLabelValues.length), 3), true);
			for (var i = Math.ceil(this.viewportMinimum / interval) * interval; i < start; i += interval) {
				if (i < this.viewportMinimum)
					continue;
				this.logLabelValues.push(i);
			}
			this.logLabelValues.sort(compareNumbers);
			this.createExtraLabelsForLog(recursionCount);
		}
		return;
	}

	Axis.prototype.createLabels = function () {
		var textBlock, textBlockNext;
		var sizeNext;
		var i = 0;
		var k = 0;
		var endPoint;

		var labelMaxWidth = 0;
		var labelEffectiveMaxWidth = 0;
		var labelMaxHeight = 0;
		var labelEffectiveMaxHeight = 0;
		var labelInterval = this.interval;
		var intervalInPixels = 0;
		var labelSkipStep = 1; //this.labelStep;
		var textBlockHeight;
		var textBlockWidth = 0;
		var maxTextBlockWidth = 0;
		var labelRoatationAngle = -25;
		var labelMaxHeightLimit = this.chart.height * .6;
		var breaksLabelType, position;
		var isInBreak = false;
		var appliedBreaks = !this.scaleBreaks ? [] : this.scaleBreaks._appliedBreaks;
		var firstBreakIndex = appliedBreaks.length ? isNullOrUndefined(this.scaleBreaks.firstBreakIndex) ? 0 : this.scaleBreaks.firstBreakIndex : 0;
		var minimumConsidarableLabelPosition;

		//var intervalInPixels = this.conversionParameters.pixelPerUnit * this.interval;

		if (this.type === "axisX" && this.valueType === "dateTime" && !this.logarithmic) {
			this.intervalStartPosition = this.getLabelStartPoint(new Date(this.viewportMinimum), this.intervalType, this.interval);
			endPoint = addToDateTime(new Date(this.viewportMaximum), this.interval, this.intervalType);
			for (var j = firstBreakIndex, i = this.intervalStartPosition; i < endPoint; addToDateTime(i, labelInterval, this.intervalType)) {
				//var text = dateFormat(i, this.valueFormatString);
				var timeInMilliseconds = i.getTime();
				for (; j < appliedBreaks.length && timeInMilliseconds > appliedBreaks[j].endValue; j++) { };
				position = timeInMilliseconds;

				isInBreak = j < appliedBreaks.length && timeInMilliseconds >= appliedBreaks[j].startValue && timeInMilliseconds <= appliedBreaks[j].endValue;
				if (!isInBreak) {
					var text = this.labelFormatter ? this.labelFormatter({ chart: this.chart, axis: this.options, value: new Date(position), label: this.labels[position] ? this.labels[position] : null })
						: this.type === "axisX" && this.labels[position] ? this.labels[position] : dateFormat(position, this.valueFormatString, this.chart._cultureInfo);

					textBlock = new TextBlock(this.ctx, {
						x: 0,
						y: 0,
						//maxWidth: this.maxHeight,
						//maxHeight: this.labelFontSize,
						maxWidth: labelMaxWidth,
						backgroundColor: this.labelBackgroundColor,
						borderColor: this.labelBorderColor,
						borderThickness: this.labelBorderThickness,
						cornerRadius: this.labelCornerRadius,
						maxHeight: labelMaxHeight,
						angle: this.labelAngle,
						text: this.prefix + text + this.suffix,
						horizontalAlign: "left",//left, center, right
						fontSize: this.labelFontSize,//in pixels
						fontFamily: this.labelFontFamily,
						fontWeight: this.labelFontWeight, //normal, bold, bolder, lighter,
						fontColor: this.labelFontColor,
						fontStyle: this.labelFontStyle, // normal, italic, oblique
						textBaseline: "middle"
					});

					this._labels.push({ position: position, textBlock: textBlock, effectiveHeight: null, breaksLabelType: breaksLabelType });
					//this._ticks.push({ position: i.getTime() });
				}
			}

		}
		else {

			endPoint = this.viewportMaximum;

			//Check if it should be rendered as a category axis. If yes, then ceil the interval
			if (this.labels) {
				var tempInterval = Math.ceil(labelInterval);
				var tempStartPoint = Math.ceil(this.intervalStartPosition);
				var hasAllLabels = false;
				for (i = tempStartPoint; i < this.viewportMaximum; i += tempInterval) {
					if (this.labels[i]) {
						hasAllLabels = true;
					} else {
						hasAllLabels = false;
						break;
					}
				}

				if (hasAllLabels) {
					labelInterval = this.interval = tempInterval;
					this.intervalStartPosition = tempStartPoint;
				}
			}

			if (this.logarithmic && !this.equidistantInterval) {

				if (!this.logLabelValues) {
					this.logLabelValues = [];
					this.createExtraLabelsForLog();
				}

				for (var k = 0, j = firstBreakIndex; k < this.logLabelValues.length; k++) {
					i = this.logLabelValues[k];
					if (i < this.viewportMinimum) {
						k++;
						continue;
					}
					for (; j < appliedBreaks.length && i > appliedBreaks[j].endValue; j++) { };
					isInBreak = j < appliedBreaks.length && i >= appliedBreaks[j].startValue && i <= appliedBreaks[j].endValue;

					position = i;

					if (!isInBreak) {
						var text = this.labelFormatter ? this.labelFormatter({ chart: this.chart, axis: this.options, value: position, label: this.labels[position] ? this.labels[position] : null })
							: this.type === "axisX" && this.labels[position] ? this.labels[position] : numberFormat(position, this.valueFormatString, this.chart._cultureInfo);
						textBlock = new TextBlock(this.ctx, {
							x: 0,
							y: 0,
							//maxWidth: this.maxHeight,
							//maxHeight: this.labelFontSize,
							maxWidth: labelMaxWidth,
							maxHeight: labelMaxHeight,
							angle: this.labelAngle,
							text: this.prefix + text + this.suffix,
							backgroundColor: this.labelBackgroundColor,
							borderColor: this.labelBorderColor,
							borderThickness: this.labelBorderThickness,
							cornerRadius: this.labelCornerRadius,
							horizontalAlign: "left",//left, center, right
							fontSize: this.labelFontSize,//in pixels
							fontFamily: this.labelFontFamily,
							fontWeight: this.labelFontWeight, //normal, bold, bolder, lighter,
							fontColor: this.labelFontColor,
							fontStyle: this.labelFontStyle, // normal, italic, oblique
							textBaseline: "middle",
							borderThickness: 0
						});
						this._labels.push({ position: position, textBlock: textBlock, effectiveHeight: null });
						//this._ticks.push({ position: i });
					}
				}
			}

			//parseFloat & toPrecision are being used to avoid issues related to precision.
			for (var j = firstBreakIndex, i = this.intervalStartPosition; i <= endPoint ; i = parseFloat(this.interval < 1E-12 ? (this.logarithmic && this.equidistantInterval ? i * Math.pow(this.logarithmBase, this.interval) : i + this.interval) : (this.logarithmic && this.equidistantInterval ? i * Math.pow(this.logarithmBase, this.interval) : i + this.interval).toFixed(12))) {

				for (; j < appliedBreaks.length && i > appliedBreaks[j].endValue; j++) { };

				isInBreak = j < appliedBreaks.length && i >= appliedBreaks[j].startValue && i <= appliedBreaks[j].endValue;
				position = i;

				if (!isInBreak) {
					var text = this.labelFormatter ? this.labelFormatter({ chart: this.chart, axis: this.options, value: position, label: this.labels[position] ? this.labels[position] : null })
						: this.type === "axisX" && this.labels[position] ? this.labels[position] : numberFormat(position, this.valueFormatString, this.chart._cultureInfo);

					textBlock = new TextBlock(this.ctx, {
						x: 0,
						y: 0,
						//maxWidth: this.maxHeight,
						//maxHeight: this.labelFontSize,
						maxWidth: labelMaxWidth,
						maxHeight: labelMaxHeight,
						angle: this.labelAngle,
						text: this.prefix + text + this.suffix,
						horizontalAlign: "left",//left, center, right
						backgroundColor: this.labelBackgroundColor,
						borderColor: this.labelBorderColor,
						borderThickness: this.labelBorderThickness,
						cornerRadius: this.labelCornerRadius,
						fontSize: this.labelFontSize,//in pixels
						fontFamily: this.labelFontFamily,
						fontWeight: this.labelFontWeight, //normal, bold, bolder, lighter,
						fontColor: this.labelFontColor,
						fontStyle: this.labelFontStyle, // normal, italic, oblique
						textBaseline: "middle"
					});

					this._labels.push({ position: position, textBlock: textBlock, effectiveHeight: null });
					//this._ticks.push({ position: i });
				}
			}
		}

		//if (appliedBreaks.length) {
		//	this._labels.sort(function (label1, label2) {
		//		return label1.position - label2.position
		//	});

		//	for (var i = 0; i < this._labels.length - 1; i++) {
		//		if (this._labels[i].position === this._labels[i + 1].position) {
		//			if (this._labels[i].breaksLabelType && !this._labels[i + 1].breaksLabelType)
		//				this._labels.splice(i, 1);
		//			else if (!this._labels[i].breaksLabelType && this._labels[i + 1].breaksLabelType)
		//				this._labels.splice(i + 1, 1);
		//		}
		//	}

		//}

		if (this._position === "bottom" || this._position === "top") {
			//intervalInPixels = this.lineCoordinates.width / Math.abs(this.viewportMaximum - this.viewportMinimum) * convertToNumber(this.interval, this.intervalType);
			if (this.logarithmic && !this.equidistantInterval && this._labels.length >= 2)
				intervalInPixels = this.lineCoordinates.width * Math.log(Math.min(this._labels[this._labels.length - 1].position / this._labels[this._labels.length - 2].position, this._labels[1].position / this._labels[0].position)) / Math.log(this.range);
			else
				intervalInPixels = this.lineCoordinates.width / (this.logarithmic && this.equidistantInterval ? Math.log(this.range) / Math.log(this.logarithmBase) : Math.abs(this.range)) * convertToNumber(this.interval, this.intervalType);

			labelMaxWidth = typeof (this.options.labelMaxWidth) === "undefined" ? this.chart.width * .5 >> 0 : this.options.labelMaxWidth;

			if (!(this.chart.panEnabled))
				labelMaxHeight = typeof (this.options.labelWrap) === "undefined" || this.labelWrap ? this.chart.height * .8 >> 0 : this.labelFontSize * 1.5;
		}
		else if (this._position === "left" || this._position === "right") {
			if (this.logarithmic && !this.equidistantInterval && this._labels.length >= 2)
				intervalInPixels = this.lineCoordinates.height * Math.log(Math.min(this._labels[this._labels.length - 1].position / this._labels[this._labels.length - 2].position, this._labels[1].position / this._labels[0].position)) / Math.log(this.range);
			else
				intervalInPixels = this.lineCoordinates.height / (this.logarithmic && this.equidistantInterval ? Math.log(this.range) / Math.log(this.logarithmBase) : Math.abs(this.range)) * convertToNumber(this.interval, this.intervalType);

			if (!(this.chart.panEnabled))
				labelMaxWidth = typeof (this.options.labelMaxWidth) === "undefined" ? this.chart.width * .3 >> 0 : this.options.labelMaxWidth;

			labelMaxHeight = typeof (this.options.labelWrap) === "undefined" || this.labelWrap ? this.chart.height * .3 >> 0 : this.labelFontSize * 1.5;
		}
		for (var k = 0; k < this._labels.length; k++) {
			textBlock = this._labels[k].textBlock;
			textBlock.maxWidth = labelMaxWidth;
			textBlock.maxHeight = labelMaxHeight;
			var size = textBlock.measureText();
			textBlockHeight = size.height;
		}

		var effectiveLabelHeights = [];
		var effectiveLabelWidths = [];
		var labelOverlapWidth = 0;
		var labelOverLapHeight = 0;
		if (this.labelAutoFit || this.options.labelAutoFit) {
			if (!isNullOrUndefined(this.labelAngle)) {
				this.labelAngle = ((this.labelAngle % 360) + 360) % 360;

				if (this.labelAngle > 90 && this.labelAngle < 270)
					this.labelAngle -= 180;
				else if (this.labelAngle >= 270 && this.labelAngle <= 360)
					this.labelAngle -= 360
			}
			if (this._position === "bottom" || this._position === "top") {
				var j = 0;
				labelMaxWidth = intervalInPixels * .9 >> 0;
				var labelWordMaxWidth = 0;

				if (!(this.chart.panEnabled) && this._labels.length >= 1) {
					this.sessionVariables.labelFontSize = this.labelFontSize;
					this.sessionVariables.labelMaxWidth = labelMaxWidth;
					this.sessionVariables.labelMaxHeight = labelMaxHeight;
					this.sessionVariables.labelAngle = this.labelAngle;
					this.sessionVariables.labelWrap = this.labelWrap;

					for (i = 0; i < this._labels.length; i++) {
						if (this._labels[i].breaksLabelType)
							continue;
						textBlock = this._labels[i].textBlock;
						var labelIndex;
						var words = textBlock.text.split(' ');
						for (var k = 0; k < words.length; k++) {
							var testLine = words[k];
							this.ctx.font = textBlock.fontStyle + ' ' + textBlock.fontWeight + ' ' + textBlock.fontSize + 'px ' + textBlock.fontFamily;
							var metrics = this.ctx.measureText(testLine);

							if (metrics.width > labelWordMaxWidth) {
								labelIndex = i;
								labelWordMaxWidth = metrics.width;
							}
						}
					}
					var autoLabelStartValue = 0;
					autoLabelStartValue = this.intervalStartPosition < this.viewportMinimum ? 1 : 0;
					for (i = autoLabelStartValue; i < this._labels.length; i++) {
						if (this._labels[i].breaksLabelType)
							continue;
						textBlock = this._labels[i].textBlock;
						var size = textBlock.measureText();

						for (j = i + 1; j < this._labels.length; j++) {
							if (this._labels[j].breaksLabelType)
								continue;
							textBlockNext = this._labels[j].textBlock;
							sizeNext = textBlockNext.measureText();
							break;
						}
						effectiveLabelHeights.push(textBlock.height);
						this.sessionVariables.labelMaxHeight = Math.max.apply(Math, effectiveLabelHeights);

						labelEffectiveMaxWidth = (labelMaxWidth * Math.cos(Math.PI / 180 * Math.abs(this.labelAngle))) + ((labelMaxHeight - textBlock.fontSize / 2) * Math.sin(Math.PI / 180 * Math.abs(this.labelAngle)));
						labelEffectiveMaxHeight = (labelMaxWidth * Math.sin(Math.PI / 180 * Math.abs(this.labelAngle))) + ((labelMaxHeight - textBlock.fontSize / 2) * Math.cos(Math.PI / 180 * Math.abs(this.labelAngle)));
						if (!(isNullOrUndefined(this.options.labelAngle) && isNaN(this.options.labelAngle)) || this.options.labelAngle === 0) {//User has set angle -->Rotate
							this.sessionVariables.labelAngle = this.labelAngle;
							this.sessionVariables.labelMaxHeight = (this.labelAngle === 0) ? labelMaxHeight : Math.min((labelEffectiveMaxHeight - labelMaxWidth * Math.cos(Math.PI / 180 * Math.abs(this.labelAngle))) / (Math.sin(Math.PI / 180 * Math.abs(this.labelAngle))), labelEffectiveMaxHeight);
							var labelEffectiveMaxWidthLimit = this.labelAngle != 0 ? (labelMaxHeightLimit - (textBlockHeight + textBlock.fontSize / 2) * Math.cos(Math.PI / 180 * Math.abs(this.labelAngle))) / Math.sin(Math.PI / 180 * Math.abs(this.labelAngle)) : labelMaxWidth;
							this.sessionVariables.labelMaxHeight = labelMaxHeight = this.labelWrap ? (labelMaxHeightLimit - (labelEffectiveMaxWidthLimit) * Math.sin(Math.PI / 180 * Math.abs(this.labelAngle))) / Math.cos(Math.PI / 180 * Math.abs(this.labelAngle)) : this.labelFontSize * 1.5;
							if (!isNullOrUndefined(this.options.labelWrap)) {//User has set wrapping (true/false)
								if (this.options.labelWrap) {//wrap is true -->Rotate+Wrap
									this.sessionVariables.labelWrap = this.labelWrap;
									this.sessionVariables.labelMaxWidth = this.options.labelMaxWidth ? this.options.labelMaxWidth : labelEffectiveMaxWidthLimit;
									this.sessionVariables.labelMaxHeight = labelMaxHeight;
								}
								else {//wrap is false
									if (!isNullOrUndefined(this.options.labelMaxWidth)) {//User has set labelMaxWidth -->Rotate+Clip after user set labelMaxWidth
										this.sessionVariables.labelMaxWidth = this.options.labelMaxWidth ? this.options.labelMaxWidth : labelEffectiveMaxWidthLimit;
										this.sessionVariables.labelWrap = this.labelWrap;
										this.sessionVariables.labelMaxHeight = labelMaxHeight;
									}
									else {//User has not set labelMaxWidth -->Rotate
										this.sessionVariables.labelMaxWidth = this.options.labelMaxWidth ? this.options.labelMaxWidth : labelEffectiveMaxWidthLimit;
										this.sessionVariables.labelWrap = this.labelWrap;
										this.sessionVariables.labelMaxHeight = labelMaxHeight;
									}
								}
							}
							else if (isNullOrUndefined(this.options.labelWrap)) {//User has not set wrap
								if (this.labelWrap && !isNullOrUndefined(this.options.labelMaxWidth)) {//labelwrap->true by default -->Rotate+Wrap
									this.sessionVariables.labelWrap = this.labelWrap;
									this.sessionVariables.labelMaxWidth = this.options.labelMaxWidth ? this.options.labelMaxWidth : labelEffectiveMaxWidthLimit;
									this.sessionVariables.labelMaxHeight = labelMaxHeight;
								}
								else {
									this.sessionVariables.labelAngle = this.labelAngle;
									this.sessionVariables.labelMaxWidth = labelEffectiveMaxWidthLimit;
									this.sessionVariables.labelMaxHeight = labelEffectiveMaxHeight < intervalInPixels * .9 ? intervalInPixels * .9 : labelEffectiveMaxHeight;
									this.sessionVariables.labelWrap = this.labelWrap;
								}
							}
						}//if-angle is not set proceed to else part
						else {
							this.sessionVariables.labelMaxHeight = this.labelAngle === 0 ? labelMaxHeight : Math.min((labelEffectiveMaxHeight - labelMaxWidth * Math.cos(Math.PI / 180 * Math.abs(this.labelAngle))) / (Math.sin(Math.PI / 180 * Math.abs(this.labelAngle))), labelEffectiveMaxHeight);
							var labelEffectiveMaxWidthLimit = (labelMaxHeightLimit - (textBlockHeight + textBlock.fontSize / 2) * Math.cos(Math.PI / 180 * Math.abs(labelRoatationAngle))) / Math.sin(Math.PI / 180 * Math.abs(labelRoatationAngle));
							if (!isNullOrUndefined(this.options.labelWrap)) {//User has set Wrap (true/false)
								if (this.labelWrap) {//wrap is true -->Wrap
									if (!isNullOrUndefined(this.options.labelMaxWidth)) {//User has set labelMaxWidth -->Wrap after user set labelMaxWidth
										this.sessionVariables.labelWrap = this.labelWrap;
										this.sessionVariables.labelMaxWidth = this.options.labelMaxWidth;
										this.sessionVariables.labelAngle = this.sessionVariables.labelMaxWidth > labelMaxWidth ? labelRoatationAngle : this.sessionVariables.labelAngle;
									}
									else {//User has not set labelMaxWidth --> Wrap after AutoCalculated labelMaxWidth
										this.sessionVariables.labelMaxWidth = Math.min(Math.max(labelMaxWidth, labelWordMaxWidth), labelEffectiveMaxWidthLimit);
										this.sessionVariables.labelWrap = this.labelWrap;
										if (((size.width + sizeNext.width) >> 0) > (2 * labelMaxWidth)) {
											this.sessionVariables.labelAngle = labelRoatationAngle;
										}
									}
								}
								else {//wrap is false
									if (!isNullOrUndefined(this.options.labelMaxWidth)) {//User has set labelMaxWidth -->Clip after user set labelMaxWidth
										this.sessionVariables.labelAngle = this.sessionVariables.labelMaxWidth > labelMaxWidth ? labelRoatationAngle : this.sessionVariables.labelAngle;
										this.sessionVariables.labelMaxWidth = this.options.labelMaxWidth;
										this.sessionVariables.labelMaxHeight = labelMaxHeight;
										this.sessionVariables.labelWrap = this.labelWrap;
									}
									else {//User has not set labelMaxWidth --> Rotate+Clip
										this.sessionVariables.labelWrap = this.labelWrap;
										this.sessionVariables.labelMaxHeight = labelMaxHeight;
										this.sessionVariables.labelMaxWidth = labelMaxWidth;
										if (((size.width + sizeNext.width) >> 0) > (2 * labelMaxWidth)) {
											this.sessionVariables.labelAngle = labelRoatationAngle;
											this.sessionVariables.labelMaxWidth = labelEffectiveMaxWidthLimit;

										}
									}
								}
							}
							else if (isNullOrUndefined(this.options.labelWrap)) {//User has not set Wrap, labelWrap is true by default
								if (!isNullOrUndefined(this.options.labelMaxWidth)) {//User has set labelMaxWidth -->Wrap if user set labelMaxWidth<labelMaxWidth else Rotate+Wrap
									if (this.options.labelMaxWidth < labelMaxWidth) {
										this.sessionVariables.labelMaxWidth = this.options.labelMaxWidth;
										this.sessionVariables.labelMaxHeight = labelEffectiveMaxHeight;
									}
									else {
										this.sessionVariables.labelAngle = labelRoatationAngle;
										this.sessionVariables.labelMaxWidth = this.options.labelMaxWidth;
										this.sessionVariables.labelMaxHeight = labelMaxHeight;
									}
								}

								else {//User has not set anything, handle auto-labelling (Rotate or Wrap or Decrease font size for the bestfit)
									//Decide Auto-Labelling based on overlapping
									if (!isNullOrUndefined(sizeNext)) {
										var adjacentLabelsWidth = (size.width + sizeNext.width) >> 0;
										var labelFontSize = this.labelFontSize;
										if (labelWordMaxWidth < labelMaxWidth) {
											if (adjacentLabelsWidth - (2 * labelMaxWidth) > labelOverlapWidth) {
												labelOverlapWidth = adjacentLabelsWidth - (2 * labelMaxWidth);
												if (adjacentLabelsWidth >= (2 * labelMaxWidth) && adjacentLabelsWidth < (2.2 * labelMaxWidth)) {//Reduce Font size											
													this.sessionVariables.labelMaxWidth = labelMaxWidth;
													if (isNullOrUndefined(this.options.labelFontSize)) {
														if (labelFontSize > 12) {
															labelFontSize = Math.floor(12 / 13 * labelFontSize);
															size = textBlock.measureText();
														}
													}
													this.sessionVariables.labelFontSize = isNullOrUndefined(this.options.labelFontSize) ? labelFontSize : this.options.labelFontSize;
													this.sessionVariables.labelAngle = this.labelAngle;
												}
												else if (adjacentLabelsWidth >= (2.2 * labelMaxWidth) && adjacentLabelsWidth < (2.8 * labelMaxWidth)) {//Slant
													this.sessionVariables.labelAngle = labelRoatationAngle;
													this.sessionVariables.labelMaxWidth = labelEffectiveMaxWidthLimit;
													this.sessionVariables.labelFontSize = labelFontSize;
												}
												else if (adjacentLabelsWidth >= (2.8 * labelMaxWidth) && adjacentLabelsWidth < (3.2 * labelMaxWidth)) {//Wrap+Reduce font size
													this.sessionVariables.labelMaxWidth = Math.max(labelMaxWidth, labelWordMaxWidth);
													this.sessionVariables.labelWrap = true;
													if (isNullOrUndefined(this.options.labelFontSize)) {
														if (this.labelFontSize > 12) {
															this.labelFontSize = Math.floor(12 / 13 * this.labelFontSize);//labelFontSize should not go beyond 12
															size = textBlock.measureText();
														}
													}
													this.sessionVariables.labelFontSize = isNullOrUndefined(this.options.labelFontSize) ? labelFontSize : this.options.labelFontSize;
													this.sessionVariables.labelAngle = this.labelAngle;
												}
												else if (adjacentLabelsWidth >= (3.2 * labelMaxWidth) && adjacentLabelsWidth < (3.6 * labelMaxWidth)) {//Rotate+Wrap
													this.sessionVariables.labelAngle = labelRoatationAngle;
													this.sessionVariables.labelWrap = true;
													this.sessionVariables.labelMaxWidth = labelEffectiveMaxWidthLimit;
													this.sessionVariables.labelFontSize = this.labelFontSize;
												}
												else if (adjacentLabelsWidth > (3.6 * labelMaxWidth) && adjacentLabelsWidth < (5 * labelMaxWidth)) {
													if (isNullOrUndefined(this.options.labelFontSize)) {
														if (labelFontSize > 12) {
															labelFontSize = Math.floor(12 / 13 * labelFontSize);//labelFontSize should not go beyond 12
															size = textBlock.measureText();
														}
													}
													this.sessionVariables.labelFontSize = isNullOrUndefined(this.options.labelFontSize) ? labelFontSize : this.options.labelFontSize;
													this.sessionVariables.labelWrap = true;
													this.sessionVariables.labelAngle = labelRoatationAngle;
													this.sessionVariables.labelMaxWidth = labelEffectiveMaxWidthLimit;
												}
												else if (adjacentLabelsWidth > (5 * labelMaxWidth)) {
													this.sessionVariables.labelWrap = true;
													this.sessionVariables.labelMaxWidth = labelMaxWidth;
													this.sessionVariables.labelFontSize = labelFontSize;
													this.sessionVariables.labelMaxHeight = labelMaxHeight;
													this.sessionVariables.labelAngle = this.labelAngle;
												}
											}
										}
										else {
											if (labelIndex === i && ((labelIndex === 0 && (labelWordMaxWidth + this._labels[labelIndex + 1].textBlock.measureText().width) - (2 * labelMaxWidth) > labelOverlapWidth) || (labelIndex === this._labels.length - 1 && (labelWordMaxWidth + this._labels[labelIndex - 1].textBlock.measureText().width) - (2 * labelMaxWidth) > labelOverlapWidth) || ((labelIndex > 0 && labelIndex < this._labels.length - 1) && ((labelWordMaxWidth + this._labels[labelIndex + 1].textBlock.measureText().width) - (2 * labelMaxWidth) > labelOverlapWidth) && ((labelWordMaxWidth + this._labels[labelIndex - 1].textBlock.measureText().width) - (2 * labelMaxWidth) > labelOverlapWidth)))) {
												labelOverlapWidth = labelIndex === 0 ? (labelWordMaxWidth + this._labels[labelIndex + 1].textBlock.measureText().width) - (2 * labelMaxWidth) : (labelWordMaxWidth + this._labels[labelIndex - 1].textBlock.measureText().width) - (2 * labelMaxWidth);
												this.sessionVariables.labelFontSize = isNullOrUndefined(this.options.labelFontSize) ? labelFontSize : this.options.labelFontSize;
												this.sessionVariables.labelWrap = true;
												this.sessionVariables.labelAngle = labelRoatationAngle;
												this.sessionVariables.labelMaxWidth = labelEffectiveMaxWidthLimit;//Math.max(labelMaxWidth, labelWordMaxWidth) > this.chart.height * .8 ? this.chart.height * .8 : Math.max(labelMaxWidth, labelWordMaxWidth);

											}
											else if (labelOverlapWidth === 0) {
												this.sessionVariables.labelFontSize = isNullOrUndefined(this.options.labelFontSize) ? labelFontSize : this.options.labelFontSize;
												this.sessionVariables.labelWrap = true;
												for (k = 0; k < this._labels.length; k++) {
													textBlock = this._labels[k].textBlock;
													textBlock.maxWidth = this.sessionVariables.labelMaxWidth = Math.min(Math.max(labelMaxWidth, labelWordMaxWidth), labelEffectiveMaxWidthLimit)
													size = textBlock.measureText();
													if (k < this._labels.length - 1) {
														j = (k + 1);
														textBlockNext = this._labels[j].textBlock;
														textBlockNext.maxWidth = this.sessionVariables.labelMaxWidth = Math.min(Math.max(labelMaxWidth, labelWordMaxWidth), labelEffectiveMaxWidthLimit);
														sizeNext = textBlockNext.measureText();
														if (((size.width + sizeNext.width) >> 0) > (2 * labelMaxWidth))
															this.sessionVariables.labelAngle = labelRoatationAngle;
													}
												}
											}
										}
									}
								}
							}
						}

					}
					for (k = 0; k < this._labels.length; k++) {
						textBlock = this._labels[k].textBlock;
						textBlock.maxWidth = this.labelMaxWidth = this.sessionVariables.labelMaxWidth;
						textBlock.fontSize = this.sessionVariables.labelFontSize;
						textBlock.angle = this.labelAngle = this.sessionVariables.labelAngle;
						textBlock.wrap = this.labelWrap = this.sessionVariables.labelWrap;
						textBlock.maxHeight = this.sessionVariables.labelMaxHeight;
						textBlock.measureText();
					}
				}
				//Panning Mode
				else {
					for (i = 0; i < this._labels.length; i++) {
						textBlock = this._labels[i].textBlock;
						textBlock.maxWidth = this.labelMaxWidth = isNullOrUndefined(this.options.labelMaxWidth) ? this.sessionVariables.labelMaxWidth : this.options.labelMaxWidth;
						textBlock.fontSize = this.labelFontSize = isNullOrUndefined(this.options.labelFontSize) ? this.sessionVariables.labelFontSize : this.options.labelFontSize;
						textBlock.angle = this.labelAngle = isNullOrUndefined(this.options.labelAngle) ? this.sessionVariables.labelAngle : this.labelAngle;
						textBlock.wrap = this.labelWrap = isNullOrUndefined(this.options.labelWrap) ? this.sessionVariables.labelWrap : this.options.labelWrap;
						textBlock.maxHeight = this.sessionVariables.labelMaxHeight;
						textBlock.measureText();
					}
				}
			}
			else if (this._position === "left" || this._position === "right") {
				var j = 0;
				labelMaxWidth = isNullOrUndefined(this.options.labelMaxWidth) ? this.chart.width * .3 >> 0 : this.options.labelMaxWidth;
				labelMaxHeight = typeof (this.options.labelWrap) === "undefined" || this.labelWrap ? this.chart.height * .3 >> 0 : this.labelFontSize * 1.5;
				if (!(this.chart.panEnabled) && this._labels.length >= 1) {
					this.sessionVariables.labelFontSize = this.labelFontSize;
					this.sessionVariables.labelMaxWidth = labelMaxWidth;
					this.sessionVariables.labelMaxHeight = labelMaxHeight;
					this.sessionVariables.labelAngle = isNullOrUndefined(this.sessionVariables.labelAngle) ? 0 : this.sessionVariables.labelAngle;
					this.sessionVariables.labelWrap = this.labelWrap;

					for (i = 0; i < this._labels.length; i++) {
						if (this._labels[i].breaksLabelType)
							continue;
						textBlock = this._labels[i].textBlock;
						var size = textBlock.measureText();

						for (j = i + 1; j < this._labels.length; j++) {
							if (this._labels[j].breaksLabelType)
								continue;
							textBlockNext = this._labels[j].textBlock;
							sizeNext = textBlockNext.measureText();
							break;
						}
						effectiveLabelHeights.push(textBlock.height);
						this.sessionVariables.labelMaxHeight = Math.max.apply(Math, effectiveLabelHeights);

						labelEffectiveMaxHeight = (labelMaxWidth * Math.sin(Math.PI / 180 * Math.abs(this.labelAngle))) + ((labelMaxHeight - textBlock.fontSize / 2) * Math.cos(Math.PI / 180 * Math.abs(this.labelAngle)));
						labelEffectiveMaxWidth = (labelMaxWidth * Math.cos(Math.PI / 180 * Math.abs(this.labelAngle))) + ((labelMaxHeight - textBlock.fontSize / 2) * Math.sin(Math.PI / 180 * Math.abs(this.labelAngle)));
						if (!(isNullOrUndefined(this.options.labelAngle) && isNaN(this.options.labelAngle)) || this.options.labelAngle === 0) {//User has set angle -->Rotate
							this.sessionVariables.labelAngle = this.labelAngle;
							this.sessionVariables.labelMaxWidth = this.labelAngle === 0 ? labelMaxWidth : Math.min((labelEffectiveMaxHeight - labelMaxHeight * Math.sin(Math.PI / 180 * Math.abs(this.labelAngle))) / (Math.cos(Math.PI / 180 * Math.abs(this.labelAngle))), labelMaxHeight);
							if (!isNullOrUndefined(this.options.labelWrap)) {//User has set wrapping (true/false)
								if (this.options.labelWrap) {//wrap is true -->Rotate+Wrap
									this.sessionVariables.labelMaxHeight = this.labelAngle === 0 ? labelMaxHeight : labelEffectiveMaxHeight;
									this.sessionVariables.labelWrap = this.labelWrap;
									this.sessionVariables.labelMaxWidth = labelMaxWidth;
								}
								else {//wrap is false
									this.sessionVariables.labelMaxHeight = labelMaxHeight;
									if (!isNullOrUndefined(this.options.labelMaxWidth)) {//User has set labelMaxWidth -->Rotate+Clip after user set labelMaxWidth
										this.sessionVariables.labelMaxWidth = this.options.labelMaxWidth ? this.options.labelMaxWidth : this.sessionVariables.labelMaxWidth;
										this.sessionVariables.labelWrap = this.labelWrap;
									}
									else {//User has not set labelMaxWidth -->Rotate
										this.sessionVariables.labelMaxWidth = this.options.labelMaxWidth ? this.options.labelMaxWidth : this.sessionVariables.labelMaxWidth;
										this.sessionVariables.labelWrap = this.labelWrap;
									}
								}
							}
							else if (isNullOrUndefined(this.options.labelWrap)) {//User has not set wrap
								if (this.labelWrap && !isNullOrUndefined(this.options.labelMaxWidth)) {//labelwrap->true by default -->Rotate+Wrap
									this.sessionVariables.labelMaxWidth = this.options.labelMaxWidth ? this.options.labelMaxWidth > this.options.labelMaxWidth : this.sessionVariables.labelMaxWidth;
									this.sessionVariables.labelWrap = this.labelWrap;
									this.sessionVariables.labelMaxHeight = labelEffectiveMaxHeight;
								}
								else {
									this.sessionVariables.labelMaxWidth = this.options.labelMaxWidth ? this.options.labelMaxWidth : labelMaxWidth;
									this.sessionVariables.labelMaxHeight = this.labelAngle === 0 ? labelMaxHeight : labelEffectiveMaxHeight;
									if (isNullOrUndefined(this.options.labelMaxWidth)) {
										this.sessionVariables.labelAngle = this.labelAngle;
									}
								}
							}
						}//if-angle is not set proceed to else part
						else {
							if (!isNullOrUndefined(this.options.labelWrap)) {//User has set Wrap (true/false)
								if (this.labelWrap) {//wrap is true -->Wrap
									this.sessionVariables.labelMaxWidth = this.options.labelMaxWidth ? this.options.labelMaxWidth : this.sessionVariables.labelMaxWidth;
									this.sessionVariables.labelMaxHeight = labelMaxHeight;
								}
								else {//wrap is false
									if (this.labelMaxWidth) {//User has set labelMaxWidth -->Clip after user set labelMaxWidth
										this.sessionVariables.labelMaxWidth = this.options.labelMaxWidth ? this.options.labelMaxWidth : this.sessionVariables.labelMaxWidth;
										this.sessionVariables.labelMaxHeight = labelMaxHeight;
									}
									else {//User has not set labelMaxWidth --> Clip after first line
										this.sessionVariables.labelMaxWidth = labelMaxWidth;
										this.sessionVariables.labelMaxHeight = labelMaxHeight;
									}
								}
							}
							else if (isNullOrUndefined(this.options.labelWrap)) {//User has not set Wrap, labelWrap is true by default
								if (!isNullOrUndefined(this.options.labelMaxWidth)) {//User has set labelMaxWidth -->Wrap if user set labelMaxWidth<labelMaxWidth else Rotate+Wrap
									this.sessionVariables.labelMaxHeight = labelMaxHeight;
									this.sessionVariables.labelMaxWidth = this.options.labelMaxWidth ? this.options.labelMaxWidth : this.sessionVariables.labelMaxWidth;
								}

								else {//User has not set anything, handle auto-labelling (Rotate or Wrap or Decrease font size for the bestfit)
									//Decide Auto-Labelling based on overlapping
									if (!isNullOrUndefined(sizeNext)) {
										var adjacentLabelsHeight = (size.height + sizeNext.height) >> 0;
										if (adjacentLabelsHeight - (2 * labelMaxHeight) > labelOverLapHeight) {
											labelOverLapHeight = adjacentLabelsHeight - (2 * labelMaxHeight);
											if (adjacentLabelsHeight >= (2 * labelMaxHeight) && adjacentLabelsHeight < (2.4 * labelMaxHeight)) {//Reduce Font size
												if (isNullOrUndefined(this.options.labelFontSize)) {
													if (this.labelFontSize > 12) {
														this.labelFontSize = Math.floor(12 / 13 * this.labelFontSize);
														size = textBlock.measureText();
													}
												}
												this.sessionVariables.labelMaxHeight = labelMaxHeight;
												this.sessionVariables.labelFontSize = (isNullOrUndefined(this.options.labelFontSize)) ? this.labelFontSize : this.options.labelFontSize;
											}
											else if (adjacentLabelsHeight >= (2.4 * labelMaxHeight) && adjacentLabelsHeight < (2.8 * labelMaxHeight)) {//Slant
												//this.sessionVariables.labelAngle = labelRoatationAngle;
												this.sessionVariables.labelMaxHeight = labelEffectiveMaxHeight;
												this.sessionVariables.labelFontSize = this.labelFontSize;
												this.sessionVariables.labelWrap = true;
											}
											else if (adjacentLabelsHeight >= (2.8 * labelMaxHeight) && adjacentLabelsHeight < (3.2 * labelMaxHeight)) {//Wrap+Reduce font size
												this.sessionVariables.labelMaxHeight = labelMaxHeight;
												this.sessionVariables.labelWrap = true;
												if (isNullOrUndefined(this.options.labelFontSize)) {
													if (this.labelFontSize > 12) {
														this.labelFontSize = Math.floor(12 / 13 * this.labelFontSize);
														size = textBlock.measureText();
													}
												}
												this.sessionVariables.labelFontSize = isNullOrUndefined(this.options.labelFontSize) ? this.labelFontSize : this.options.labelFontSize;
												this.sessionVariables.labelAngle = isNullOrUndefined(this.sessionVariables.labelAngle) ? 0 : this.sessionVariables.labelAngle;
											}
											else if (adjacentLabelsHeight >= (3.2 * labelMaxHeight) && adjacentLabelsHeight < (3.6 * labelMaxHeight)) {//Rotate+Wrap
												//this.sessionVariables.labelAngle = labelRoatationAngle;
												this.sessionVariables.labelMaxHeight = labelEffectiveMaxHeight;
												this.sessionVariables.labelWrap = true;
												this.sessionVariables.labelFontSize = this.labelFontSize;
											}
											else if (adjacentLabelsHeight > (3.6 * labelMaxHeight) && adjacentLabelsHeight < (10 * labelMaxHeight)) {
												if (isNullOrUndefined(this.options.labelFontSize)) {
													if (this.labelFontSize > 12) {
														this.labelFontSize = Math.floor(12 / 13 * this.labelFontSize);
														size = textBlock.measureText();
													}
												}
												this.sessionVariables.labelFontSize = isNullOrUndefined(this.options.labelFontSize) ? this.labelFontSize : this.options.labelFontSize;
												this.sessionVariables.labelMaxWidth = labelMaxWidth;
												this.sessionVariables.labelMaxHeight = labelMaxHeight;
												this.sessionVariables.labelAngle = isNullOrUndefined(this.sessionVariables.labelAngle) ? 0 : this.sessionVariables.labelAngle;
											}
											else if (adjacentLabelsHeight > (10 * labelMaxHeight) && adjacentLabelsHeight < (50 * labelMaxHeight)) {
												if (isNullOrUndefined(this.options.labelFontSize)) {
													if (this.labelFontSize > 12) {
														this.labelFontSize = Math.floor(12 / 13 * this.labelFontSize);
														size = textBlock.measureText();
													}
												}
												this.sessionVariables.labelFontSize = isNullOrUndefined(this.options.labelFontSize) ? this.labelFontSize : this.options.labelFontSize;
												this.sessionVariables.labelMaxHeight = labelMaxHeight;
												this.sessionVariables.labelMaxWidth = labelMaxWidth;
												this.sessionVariables.labelAngle = isNullOrUndefined(this.sessionVariables.labelAngle) ? 0 : this.sessionVariables.labelAngle;
											}
										}
									}
								}
							}

						}

					}
					for (k = 0; k < this._labels.length; k++) {
						textBlock = this._labels[k].textBlock;
						textBlock.maxWidth = this.labelMaxWidth = this.sessionVariables.labelMaxWidth;
						textBlock.fontSize = this.labelFontSize = this.sessionVariables.labelFontSize;
						textBlock.angle = this.labelAngle = this.sessionVariables.labelAngle;
						textBlock.wrap = this.labelWrap = this.sessionVariables.labelWrap;
						textBlock.maxHeight = this.sessionVariables.labelMaxHeight;
						textBlock.measureText();
					}
				}
				//Panning Mode
				else {
					for (i = 0; i < this._labels.length; i++) {
						textBlock = this._labels[i].textBlock;
						textBlock.maxWidth = this.labelMaxWidth = isNullOrUndefined(this.options.labelMaxWidth) ? this.sessionVariables.labelMaxWidth : this.options.labelMaxWidth;
						textBlock.fontSize = this.labelFontSize = isNullOrUndefined(this.options.labelFontSize) ? this.sessionVariables.labelFontSize : this.options.labelFontSize;
						textBlock.angle = this.labelAngle = isNullOrUndefined(this.options.labelAngle) ? this.sessionVariables.labelAngle : this.labelAngle;
						textBlock.wrap = this.labelWrap = isNullOrUndefined(this.options.labelWrap) ? this.sessionVariables.labelWrap : this.options.labelWrap;
						textBlock.maxHeight = this.sessionVariables.labelMaxHeight;
						textBlock.measureText();
					}
				}
			}
		}//------------------LabelAutoFit-------------------//

		for (var i = 0; i < this.stripLines.length; i++) {
			var stripLine = this.stripLines[i];
			var stripLineLabelMaxWidth;
			var stripLineLabelMaxHeight;

			if (stripLine.labelPlacement === "outside") {
				stripLineLabelMaxWidth = this.sessionVariables.labelMaxWidth;
				if (this._position === "bottom" || this._position === "top") {
					if (isNullOrUndefined(stripLine.options.labelWrap)) {
						stripLineLabelMaxHeight = this.sessionVariables.labelMaxHeight;
					}
					else {
						stripLineLabelMaxHeight = stripLine.labelWrap ? this.chart.height * .8 >> 0 : this.labelFontSize * 1.5;
					}
				}
				if (this._position === "left" || this._position === "right") {
					if (isNullOrUndefined(stripLine.options.labelWrap)) {
						stripLineLabelMaxHeight = this.sessionVariables.labelMaxHeight;
					}
					else {
						stripLineLabelMaxHeight = stripLine.labelWrap ? this.chart.width * .8 >> 0 : this.labelFontSize * 1.5;
					}
				}

				if (isNullOrUndefined(stripLine.labelBackgroundColor))
					stripLine.labelBackgroundColor = "#EEEEEE";
			}
			else {
				stripLineLabelMaxWidth = (this._position === "bottom" || this._position === "top") ? this.chart.width * .9 >> 0 : this.chart.height * .9 >> 0;
				stripLineLabelMaxHeight = isNullOrUndefined(stripLine.options.labelWrap) || stripLine.labelWrap ? (this._position === "bottom" || this._position === "top") ? this.chart.width * .8 >> 0 : this.chart.height * .8 >> 0 : this.labelFontSize * 1.5;
				if (isNullOrUndefined(stripLine.labelBackgroundColor)) {
					if (!isNullOrUndefined(stripLine.startValue) || stripLine.startValue === 0)
						stripLine.labelBackgroundColor = "#EEEEEE";
					else
						stripLine.labelBackgroundColor = isCanvasSupported ? "transparent" : null;
				}
			}

			textBlock = new TextBlock(this.ctx, {
				x: 0,
				y: 0,
				//maxWidth: this.maxHeight,
				//maxHeight: this.labelFontSize,
				backgroundColor: stripLine.labelBackgroundColor,
				borderColor: stripLine.labelBorderColor,
				borderThickness: stripLine.labelBorderThickness,
				cornerRadius: stripLine.labelCornerRadius,
				maxWidth: stripLine.options.labelMaxWidth ? stripLine.options.labelMaxWidth : stripLineLabelMaxWidth,
				maxHeight: stripLineLabelMaxHeight,
				angle: this.labelAngle,
				text: stripLine.labelFormatter ? stripLine.labelFormatter({ chart: this.chart, axis: this, stripLine: stripLine }) : stripLine.label,
				horizontalAlign: "left",//left, center, right
				fontSize: stripLine.labelPlacement === "outside" ? stripLine.options.labelFontSize ? stripLine.labelFontSize : this.labelFontSize : stripLine.labelFontSize,//in pixels
				fontFamily: stripLine.labelPlacement === "outside" ? stripLine.options.labelFontFamily ? stripLine.labelFontFamily : this.labelFontFamily : stripLine.labelFontFamily,
				fontWeight: stripLine.labelPlacement === "outside" ? stripLine.options.labelFontWeight ? stripLine.labelFontWeight : this.labelFontWeight : stripLine.labelFontWeight, //normal, bold, bolder, lighter,
				fontColor: stripLine.labelFontColor || stripLine.color,
				fontStyle: stripLine.labelPlacement === "outside" ? stripLine.options.labelFontStyle ? stripLine.labelFontStyle : this.fontWeight : stripLine.labelFontStyle, // normal, italic, oblique
				textBaseline: "middle"
			});
			this._stripLineLabels.push({ position: stripLine.value, textBlock: textBlock, effectiveHeight: null, stripLine: stripLine });
		}

	}

	Axis.prototype.createLabelsAndCalculateWidth = function () {

		var maxLabelEffectiveWidth = 0;
		var i = 0;
		this._labels = [];
		//this._ticks = [];
		this._stripLineLabels = [];

		if (this._position === "left" || this._position === "right") {

			this.createLabels();

			for (i = 0; i < this._labels.length; i++) {

				var textBlock = this._labels[i].textBlock;

				var size = textBlock.measureText();

				//var hypotenuse = Math.sqrt(Math.pow(size.height / 2, 2) + Math.pow(size.width, 2));
				//labelEffectiveWidth = hypotenuse * Math.cos(Math.abs(Math.PI / 180 * this.labelAngle) - Math.abs(Math.acos(size.width / hypotenuse)));

				var labelEffectiveWidth = 0;

				if (this.labelAngle === 0)
					labelEffectiveWidth = size.width;
				else
					labelEffectiveWidth = (size.width * Math.cos(Math.PI / 180 * Math.abs(this.labelAngle))) + ((size.height - textBlock.fontSize / 2) * Math.sin(Math.PI / 180 * Math.abs(this.labelAngle)));


				if (maxLabelEffectiveWidth < labelEffectiveWidth)
					maxLabelEffectiveWidth = labelEffectiveWidth;

				this._labels[i].effectiveWidth = labelEffectiveWidth;
			}
			for (i = 0; i < this._stripLineLabels.length; i++) {
				if (this._stripLineLabels[i].stripLine.labelPlacement === "outside") {
					if (this._stripLineLabels[i].stripLine.value > this.viewportMinimum && this._stripLineLabels[i].stripLine.value < this.viewportMaximum) {
						var textBlock = this._stripLineLabels[i].textBlock;

						var size = textBlock.measureText();

						//var hypotenuse = Math.sqrt(Math.pow(size.height / 2, 2) + Math.pow(size.width, 2));
						//labelEffectiveWidth = hypotenuse * Math.cos(Math.abs(Math.PI / 180 * this.labelAngle) - Math.abs(Math.acos(size.width / hypotenuse)));

						var labelEffectiveWidth = 0;

						if (this.labelAngle === 0)
							labelEffectiveWidth = size.width;
						else
							labelEffectiveWidth = (size.width * Math.cos(Math.PI / 180 * Math.abs(this.labelAngle))) + ((size.height - textBlock.fontSize / 2) * Math.sin(Math.PI / 180 * Math.abs(this.labelAngle)));


						if (maxLabelEffectiveWidth < labelEffectiveWidth)
							maxLabelEffectiveWidth = labelEffectiveWidth;

						this._stripLineLabels[i].effectiveWidth = labelEffectiveWidth;
					}
				}
			}
		}


		var titleHeight = this.title ? this._titleTextBlock.measureText().height + 2 : 0;

		var axisWidth = (this.labelPlacement === "inside") ? axisWidth = titleHeight + 5 : titleHeight + maxLabelEffectiveWidth + this.tickLength + 5;

		//if (isDebugMode && window.console) {
		//	window.console.log(this.type + "--- axisWidth: " + axisWidth);
		//}

		return axisWidth;
	}

	Axis.prototype.createLabelsAndCalculateHeight = function () {
		var maxLabelEffectiveHeight = 0;
		this._labels = [];
		//this._ticks = [];
		this._stripLineLabels = [];
		var textBlock;
		var i = 0;

		this.createLabels();

		if (this._position === "bottom" || this._position === "top") {

			for (i = 0; i < this._labels.length; i++) {

				textBlock = this._labels[i].textBlock;
				var size = textBlock.measureText();
				//var diagonal = Math.sqrt(Math.pow(size.height, 2) + Math.pow(size.width, 2));

				//var hypotenuse = Math.sqrt(Math.pow(size.height / 2, 2) + Math.pow(size.width, 2));
				//var labelEffectiveHeight = hypotenuse * Math.cos(Math.PI / 2 - (Math.abs(Math.PI / 180 * this.labelAngle) + Math.abs(Math.acos(size.width / hypotenuse))));

				var labelEffectiveHeight = 0;

				if (this.labelAngle === 0)
					labelEffectiveHeight = size.height;
				else
					labelEffectiveHeight = (size.width * Math.sin(Math.PI / 180 * Math.abs(this.labelAngle))) + ((size.height - textBlock.fontSize / 2) * Math.cos(Math.PI / 180 * Math.abs(this.labelAngle)));

				if (maxLabelEffectiveHeight < labelEffectiveHeight)
					maxLabelEffectiveHeight = labelEffectiveHeight;

				this._labels[i].effectiveHeight = labelEffectiveHeight;
			}
			for (i = 0; i < this._stripLineLabels.length; i++) {
				if (this._stripLineLabels[i].stripLine.labelPlacement === "outside") {
					textBlock = this._stripLineLabels[i].textBlock;
					var size = textBlock.measureText();
					var labelEffectiveHeight = 0;

					if (this.labelAngle === 0)
						labelEffectiveHeight = size.height;
					else
						labelEffectiveHeight = (size.width * Math.sin(Math.PI / 180 * Math.abs(this.labelAngle))) + ((size.height - textBlock.fontSize / 2) * Math.cos(Math.PI / 180 * Math.abs(this.labelAngle)));

					if (maxLabelEffectiveHeight < labelEffectiveHeight)
						maxLabelEffectiveHeight = labelEffectiveHeight;

					this._stripLineLabels[i].effectiveHeight = labelEffectiveHeight;
				}
			}
		}


		//var titleHeight = this.title ? this.titleFontSize + 5 : 0;
		var titleHeight = this.title ? this._titleTextBlock.measureText().height + 2 : 0;

		var axisHeight = (this.labelPlacement === "inside") ? axisHeight = titleHeight + 5 : titleHeight + maxLabelEffectiveHeight + this.tickLength + 5;

		return axisHeight;
	}

	//Static Method that co-ordinates between axisX, axisY and renders them
	Axis.setLayoutAndRender = function (axisX, axisX2, axisY, axisY2, axisPlacement, freeSpace) {
		var x1, y1, x2, y2;
		var chart = axisX[0] ? axisX[0].chart : axisX2[0].chart;
		var ctx = chart.ctx;
		var axes = chart._axes;

		if (axisX && axisX.length > 0)
			for (var k = 0; k < axisX.length; k++)
				if (axisX[k])
					axisX[k].calculateAxisParameters();

		if (axisX2 && axisX2.length > 0)
			for (var k = 0; k < axisX2.length; k++)
				axisX2[k].calculateAxisParameters();

		if (axisY && axisY.length > 0)
			for (var k = 0; k < axisY.length; k++)
				axisY[k].calculateAxisParameters();

		if (axisY2 && axisY2.length > 0)
			for (var k = 0; k < axisY2.length; k++)
				axisY2[k].calculateAxisParameters();

		for (var k = 0; k < axes.length; k++)
			if (axes[k] && axes[k].scaleBreaks && axes[k].scaleBreaks._appliedBreaks.length) {
				var appliedBreaks = axes[k].scaleBreaks._appliedBreaks;
				for (var i = 0; i < appliedBreaks.length; i++) {
					if (appliedBreaks[i].startValue > axes[k].viewportMaximum)
						break;
					if (appliedBreaks[i].endValue < axes[k].viewportMinimum)
						continue;
					if (isNullOrUndefined(axes[k].scaleBreaks.firstBreakIndex))
						axes[k].scaleBreaks.firstBreakIndex = i;
					if (appliedBreaks[i].startValue >= axes[k].viewPortMinimum)
						axes[k].scaleBreaks.lastBreakIndex = i;
				}
			}

		//if (axisY && axisY2 && typeof (axisY.options.viewportMaximum) === "undefined" && typeof (axisY.options.viewportMinimum) === "undefined" && typeof (axisY.options.interval) === "undefined"
		//		&& typeof (axisY2.options.viewportMaximum) === "undefined" && typeof (axisY2.options.viewportMinimum) === "undefined" && typeof (axisY2.options.interval) === "undefined") {

		//	var noTicksY = (axisY.viewportMaximum - axisY.viewportMinimum) / axisY.interval;

		//	var noTicksY2 = (axisY2.viewportMaximum - axisY2.viewportMinimum) / axisY2.interval;

		//	if (noTicksY > noTicksY2) {
		//		axisY2.viewportMaximum = axisY2.interval * noTicksY + axisY2.viewportMinimum;
		//	} else if (noTicksY2 > noTicksY) {
		//		axisY.viewportMaximum = axisY.interval * noTicksY2 + axisY.viewportMinimum;
		//	}
		//}


		var i = 0;
		var firstLabelWidthX = 0, lastLabelWidthX = 0, firstLabelWidthY = 0, lastLabelWidthY = 0, firstLabelWidthY2 = 0, lastLabelWidthY2 = 0, firstLabelPosition, lastLabelPosition, lastLabelWidthOutside = 0, firstLabelOutside = 0;
		var xFlag, x2Flag, yFlag, y2Flag;
		xFlag = x2Flag = yFlag = y2Flag = false;

		for (var k = 0; k < axes.length; k++)
			if (axes[k] && axes[k].title)
				axes[k]._titleTextBlock = new TextBlock(axes[k].ctx, {
					text: axes[k].title,
					horizontalAlign: "center",//left, center, right
					fontSize: axes[k].titleFontSize,//in pixels
					fontFamily: axes[k].titleFontFamily,
					fontWeight: axes[k].titleFontWeight, //normal, bold, bolder, lighter,
					fontColor: axes[k].titleFontColor,
					fontStyle: axes[k].titleFontStyle, // normal, italic, oblique
					borderColor: axes[k].titleBorderColor,
					borderThickness: axes[k].titleBorderThickness,
					backgroundColor: axes[k].titleBackgroundColor,
					cornerRadius: axes[k].titleCornerRadius,
					textBaseline: "top"
				});

		for (var k = 0; k < axes.length; k++)
			if (axes[k].title) {
				switch (axes[k]._position) {
					case "left":
						axes[k]._titleTextBlock.maxWidth = axes[k].titleMaxWidth || freeSpace.height;//this.lineCoordinates.height,
						axes[k]._titleTextBlock.maxHeight = axes[k].titleWrap ? freeSpace.width * 0.8 : axes[k].titleFontSize * 1.5;
						axes[k]._titleTextBlock.angle = -90;
						break;
					case "right":
						axes[k]._titleTextBlock.maxWidth = axes[k].titleMaxWidth || freeSpace.height;
						axes[k]._titleTextBlock.maxHeight = axes[k].titleWrap ? freeSpace.width * 0.8 : axes[k].titleFontSize * 1.5;
						axes[k]._titleTextBlock.angle = 90;
						break;
					default: //case:"top" case: "bottom"
						axes[k]._titleTextBlock.maxWidth = axes[k].titleMaxWidth || freeSpace.width;
						axes[k]._titleTextBlock.maxHeight = axes[k].titleWrap ? freeSpace.height * 0.8 : axes[k].titleFontSize * 1.5;
						axes[k]._titleTextBlock.angle = 0;
				}
			}

		if (axisPlacement === "normal") {
			var axisXHeight = [], axisX2Height = [], axisYWidth = [], axisY2Width = [];
			var axisXHeights = [], axisX2Heights = [], axisYWidths = [], axisY2Widths = [];

			while (i < 4) {

				var prevAxisXHeight = 0, prevAxisX2Height = 0, prevAxisYWidth = 0, prevAxisY2Width = 0;
				var axisXMargin = 0, axisX2Margin = 0, axisYMargin = 0, axisY2Margin = 0;
				var axisXTotalHeight = 0, axisX2TotalHeight = 0, axisYTotalWidth = 0, axisY2TotalWidth = 0;

				if (axisY && axisY.length > 0) {
					axisYWidth = []; axisYTotalWidth = 0;
					for (var k = 0; k < axisY.length; k++) {
						axisYWidth.push(Math.ceil(axisY[k] ? axisY[k].createLabelsAndCalculateWidth() : 0));
						axisYTotalWidth += axisYWidth[k];

						axisYMargin += axisY[k] ? axisY[k].margin : 0;
					}
					axisYWidths.push(axisYWidth);
				} else {
					axisYWidth.push(Math.ceil(axisY[0] ? axisY[0].createLabelsAndCalculateWidth() : 0));
					axisYWidths.push(axisYWidth);
				}


				if (axisY2 && axisY2.length > 0) {
					axisY2Width = []; axisY2TotalWidth = 0;
					for (var k = 0; k < axisY2.length; k++) {
						axisY2Width.push(Math.ceil(axisY2[k] ? axisY2[k].createLabelsAndCalculateWidth() : 0));
						axisY2TotalWidth += axisY2Width[k];

						axisY2Margin += axisY2[k] ? axisY2[k].margin : 0;
					}
					axisY2Widths.push(axisY2Width);
				} else {
					axisY2Width.push(Math.ceil(axisY2[0] ? axisY2[0].createLabelsAndCalculateWidth() : 0));
					axisY2Widths.push(axisY2Width);
				}


				x1 = Math.round(freeSpace.x1 + axisYTotalWidth + axisYMargin);

				x2 = Math.round(freeSpace.x2 - axisY2TotalWidth - axisY2Margin > chart.width - 10 ? chart.width - 10 : freeSpace.x2 - axisY2TotalWidth - axisY2Margin);

				if (axisX && axisX.length > 0) {
					axisXHeight = []; axisXTotalHeight = 0;
					for (var k = 0; k < axisX.length; k++) {
						if (axisX[k])
							axisX[k].lineCoordinates = {
							};

						axisX[k].lineCoordinates.width = Math.abs(x2 - x1);

						if (axisX[k].title)
							axisX[k]._titleTextBlock.maxWidth = axisX[k].titleMaxWidth > 0 && axisX[k].titleMaxWidth < axisX[k].lineCoordinates.width ? axisX[k].titleMaxWidth : axisX[k].lineCoordinates.width;


						axisXHeight.push(Math.ceil(axisX[k] ? axisX[k].createLabelsAndCalculateHeight() : 0));
						axisXTotalHeight += axisXHeight[k];

						axisXMargin += axisX[k] ? axisX[k].margin : 0;
					}
					axisXHeights.push(axisXHeight);
				} else {
					axisXHeight.push(Math.ceil(axisX[0] ? axisX[0].createLabelsAndCalculateHeight() : 0));
					axisXHeights.push(axisXHeight);
				}

				if (axisX2 && axisX2.length > 0) {
					axisX2Height = []; axisX2TotalHeight = 0;
					for (var k = 0; k < axisX2.length; k++) {
						if (axisX2[k])
							axisX2[k].lineCoordinates = {
							};

						axisX2[k].lineCoordinates.width = Math.abs(x2 - x1);

						if (axisX2[k].title)
							axisX2[k]._titleTextBlock.maxWidth = axisX2[k].titleMaxWidth > 0 && axisX2[k].titleMaxWidth < axisX2[k].lineCoordinates.width ? axisX2[k].titleMaxWidth : axisX2[k].lineCoordinates.width;

						axisX2Height.push(Math.ceil(axisX2[k] ? axisX2[k].createLabelsAndCalculateHeight() : 0));
						axisX2TotalHeight += axisX2Height[k];

						axisX2Margin += axisX2[k] ? axisX2[k].margin : 0;
					}
					axisX2Heights.push(axisX2Height);
				} else {
					axisX2Height.push(Math.ceil(axisX2[0] ? axisX2[0].createLabelsAndCalculateHeight() : 0));
					axisX2Heights.push(axisX2Height);
				}

				if (axisX && axisX.length > 0) {
					for (var k = 0; k < axisX.length; k++) {
						if (axisX[k]) {
							axisX[k].lineCoordinates.x1 = x1;
							x2 = Math.round(freeSpace.x2 - axisY2TotalWidth - axisY2Margin > chart.width - 10 ? chart.width - 10 : freeSpace.x2 - axisY2TotalWidth - axisY2Margin);

							if (axisX[k]._labels && axisX[k]._labels.length > 1) {
								var firstLabel = 0, lastLabel = 0;
								firstLabel = axisX[k]._labels[1];
								if (axisX[k].valueType === "dateTime") {
									lastLabel = axisX[k]._labels[axisX[k]._labels.length - 2];
								}
								else
									lastLabel = axisX[k]._labels[axisX[k]._labels.length - 1];
								firstLabelWidthX = (firstLabel.textBlock.width * Math.cos(Math.PI / 180 * Math.abs(firstLabel.textBlock.angle))) + ((firstLabel.textBlock.height - lastLabel.textBlock.fontSize / 2) * Math.sin(Math.PI / 180 * Math.abs(firstLabel.textBlock.angle)));
								lastLabelWidthX = (lastLabel.textBlock.width * Math.cos(Math.PI / 180 * Math.abs(lastLabel.textBlock.angle))) + ((lastLabel.textBlock.height - lastLabel.textBlock.fontSize / 2) * Math.sin(Math.PI / 180 * Math.abs(lastLabel.textBlock.angle)));
							}

							if (axisX[k] && axisX[k].labelAutoFit && !isNullOrUndefined(firstLabelPosition) && !isNullOrUndefined(lastLabelPosition)) {
								lastLabelWidthOutside = 0;
								if (axisX[k].labelAngle > 0) {
									if (lastLabelPosition + lastLabelWidthX > x2)
										lastLabelWidthOutside += ((axisX[k].labelAngle > 0) ? (lastLabelPosition + lastLabelWidthX) - x2 - axisY2TotalWidth : 0);
								}
								else if (axisX[k].labelAngle < 0) {
									if (firstLabelPosition - firstLabelWidthX < x1 && firstLabelPosition - firstLabelWidthX < axisX[k].viewportMinimum)
										firstLabelOutside = x1 - (axisYMargin + axisX[k].tickLength + axisYWidth + firstLabelPosition - firstLabelWidthX + axisX[k].labelFontSize / 2);

								}
								else if (axisX[k].labelAngle === 0) {
									if (lastLabelPosition + lastLabelWidthX > x2)
										lastLabelWidthOutside = (lastLabelPosition + lastLabelWidthX / 2) - x2 - axisY2TotalWidth;

									if (firstLabelPosition - firstLabelWidthX < x1 && firstLabelPosition - firstLabelWidthX < axisX[k].viewportMinimum)
										firstLabelOutside = x1 - axisYMargin - axisX[k].tickLength - axisYWidth - firstLabelPosition + (firstLabelWidthX / 2);

								}
								if ((axisX[k].viewportMaximum === axisX[k].maximum && axisX[k].viewportMinimum === axisX[k].minimum) && axisX[k].labelAngle > 0 && lastLabelWidthOutside > 0)
									x2 -= lastLabelWidthOutside;
								else if ((axisX[k].viewportMaximum === axisX[k].maximum && axisX[k].viewportMinimum === axisX[k].minimum) && axisX[k].labelAngle < 0 && firstLabelOutside > 0)
									x1 += firstLabelOutside;
								else if ((axisX[k].viewportMaximum === axisX[k].maximum && axisX[k].viewportMinimum === axisX[k].minimum) && axisX[k].labelAngle === 0) {
									if (firstLabelOutside > 0)
										x1 += firstLabelOutside;

									if (lastLabelWidthOutside > 0)
										x2 -= lastLabelWidthOutside;
								}
							}

							if (!chart.panEnabled)
								chart.sessionVariables.axisX.height = axisXTotalHeight;
							else
								axisXTotalHeight = chart.sessionVariables.axisX.height;

							// Position axisX based on the available free space, Margin and its height
							//x1 = freeSpace.x1 + axisYWidth + axisYMargin + axisYlineThickness / 2;
							y1 = Math.round(freeSpace.y2 - axisXTotalHeight - axisXMargin + prevAxisXHeight);
							y2 = Math.round(freeSpace.y2);

							axisX[k].lineCoordinates.x2 = x2;
							axisX[k].lineCoordinates.width = x2 - x1;
							//axisX.lineCoordinates = { x1: x1, y1: y1, x2: x2, y2: y1, width: Math.abs(x2 - x1) }
							axisX[k].lineCoordinates.y1 = y1;
							axisX[k].lineCoordinates.y2 = y1;

							axisX[k].bounds = {
								x1: x1, y1: y1, x2: x2, y2: y2 - (axisXTotalHeight + axisXMargin - axisXHeight[k] - prevAxisXHeight), width: x2 - x1, height: y2 - y1
							};
						}
						prevAxisXHeight += (axisXHeight[k] + axisX[k].margin);
					}
				}

				if (axisX2 && axisX2.length > 0) {
					for (var k = 0; k < axisX2.length; k++) {

						axisX2[k].lineCoordinates.x1 = Math.round(freeSpace.x1 + axisYTotalWidth + axisYMargin);
						axisX2[k].lineCoordinates.x2 = Math.round(freeSpace.x2 - axisY2TotalWidth - axisY2Margin > chart.width - 10 ? chart.width - 10 : freeSpace.x2 - axisY2TotalWidth - axisY2Margin);

						axisX2[k].lineCoordinates.width = Math.abs(x2 - x1); // required early on inside createLabels of axisX

						//if (axisX2.title)
						//    axisX2._titleTextBlock.maxWidth = axisX2.titleMaxWidth > 0 && axisX2.titleMaxWidth < axisX2.lineCoordinates.width ? axisX2.titleMaxWidth : axisX2.lineCoordinates.width;

						//var axisX2Height = Math.ceil(axisX2.createLabelsAndCalculateHeight());

						if (axisX2[k]._labels && axisX2[k]._labels.length > 1) {
							var firstLabel = 0, lastLabel = 0;
							firstLabel = axisX2[k]._labels[1];
							if (axisX2[k].valueType === "dateTime") {
								lastLabel = axisX2[k]._labels[axisX2[k]._labels.length - 2];
							}
							else
								lastLabel = axisX2[k]._labels[axisX2[k]._labels.length - 1];
							firstLabelWidthX = (firstLabel.textBlock.width * Math.cos(Math.PI / 180 * Math.abs(firstLabel.textBlock.angle))) + ((firstLabel.textBlock.height - lastLabel.textBlock.fontSize / 2) * Math.sin(Math.PI / 180 * Math.abs(firstLabel.textBlock.angle)));
							lastLabelWidthX = (lastLabel.textBlock.width * Math.cos(Math.PI / 180 * Math.abs(lastLabel.textBlock.angle))) + ((lastLabel.textBlock.height - lastLabel.textBlock.fontSize / 2) * Math.sin(Math.PI / 180 * Math.abs(lastLabel.textBlock.angle)));
						}


						if (!chart.panEnabled)
							chart.sessionVariables.axisX2.height = axisX2TotalHeight;
						else
							axisX2TotalHeight = chart.sessionVariables.axisX2.height;

						// Position axisX2 based on the available free space, Margin and its height
						//x1 = freeSpace.x1 + axisYWidth + axisYMargin + axisYlineThickness / 2;
						y1 = Math.round(freeSpace.y1);
						y2 = Math.round(freeSpace.y2 + axisX2[k].margin);

						//axisX.lineCoordinates = { x1: x1, y1: y1, x2: x2, y2: y1, width: Math.abs(x2 - x1) }
						axisX2[k].lineCoordinates.y1 = y1 + axisX2TotalHeight + axisX2Margin - prevAxisX2Height;
						axisX2[k].lineCoordinates.y2 = y1;

						axisX2[k].bounds = {
							x1: x1, y1: y1 + (axisX2TotalHeight + axisX2Margin - axisX2Height[k] - prevAxisX2Height), x2: x2, y2: y2, width: x2 - x1, height: y2 - y1
						};

						prevAxisX2Height += (axisX2Height[k] + axisX2[k].margin);
					}
				}

				//if (isDebugMode) {
				//	axisX.ctx.rect(axisX.bounds.x1, axisX.bounds.y1, axisX.bounds.width, axisX.bounds.height);
				//	axisX.ctx.stroke();
				//}

				// Position axisY based on the available free space, Margin and its height
				if (axisY && axisY.length > 0) {
					for (var k = 0; k < axisY.length; k++) {
						var padding = 10;

						if (axisY[k]) {
							x1 = Math.round(axisX[0] ? axisX[0].lineCoordinates.x1 : axisX2[0].lineCoordinates.x1);
							//x1 = Math.round(axisX.lineCoordinates.x1 - axisYWidth);

							padding = axisY[k]._labels && axisY[k]._labels.length > 0 ? axisY[k]._labels[axisY[k]._labels.length - 1].textBlock.height / 2 : 10;
							y1 = Math.round(freeSpace.y1 + axisX2TotalHeight + axisX2Margin < Math.max(padding, 10) ? Math.max(padding, 10) : freeSpace.y1 + axisX2TotalHeight + axisX2Margin);

							//x2 = Math.round(freeSpace.x1 + axisYWidth + axisY.margin);
							x2 = Math.round(axisX[0] ? axisX[0].lineCoordinates.x1 : axisX2[0].lineCoordinates.x1);
							//y2 = freeSpace.y2 - axisXHeight - axisX.margin - axisX.lineThickness / 2;

							if (!(axisX.length > 0)) {
								padding = axisY[k]._labels && axisY[k]._labels.length > 0 ? axisY[k]._labels[0].textBlock.height / 2 : 10;
							} else {
								padding = 0;
							}
							y2 = Math.round(freeSpace.y2 - axisXTotalHeight - axisXMargin - padding);

							axisY[k].lineCoordinates = {
								x1: x2 - prevAxisYWidth, y1: y1, x2: x2 - prevAxisYWidth, y2: y2, height: Math.abs(y2 - y1)
							}

							axisY[k].bounds = {
								x1: x1 - (axisYWidth[k] + prevAxisYWidth), y1: y1, x2: x2, y2: y2, width: x2 - x1, height: y2 - y1
							};
							if (axisY[k].title)
								axisY[k]._titleTextBlock.maxWidth = axisY[k].titleMaxWidth > 0 && axisY[k].titleMaxWidth < axisY[k].lineCoordinates.height ? axisY[k].titleMaxWidth : axisY[k].lineCoordinates.height;
							prevAxisYWidth += (axisYWidth[k] + axisY[k].margin);
						}
					}
				}

				// Position axisY2 based on the available free space, Margin and its height
				if (axisY2 && axisY2.length > 0) {
					for (var k = 0; k < axisY2.length; k++) {
						var padding = 0;
						if (axisY2[k]) {
							x1 = Math.round(axisX[0] ? axisX[0].lineCoordinates.x2 : axisX2[0].lineCoordinates.x2);
							x2 = Math.round(x1);

							padding = axisY2[k]._labels && axisY2[k]._labels.length > 0 ? axisY2[k]._labels[axisY2[k]._labels.length - 1].textBlock.height / 2 : 0;
							y1 = Math.round(freeSpace.y1 + axisX2TotalHeight + axisX2Margin < Math.max(padding, 10) ? Math.max(padding, 10) : freeSpace.y1 + axisX2TotalHeight + axisX2Margin);

							//y2 = freeSpace.y2 - axisXHeight - axisX.margin - axisX.lineThickness / 2;
							if (!(axisX.length > 0)) {
								padding = axisY2[k]._labels && axisY2[k]._labels.length > 0 ? axisY2[k]._labels[0].textBlock.height / 2 : 0;
							} else {
								padding = 0;
							}
							y2 = Math.round(freeSpace.y2 - (axisXTotalHeight + axisXMargin + padding));

							axisY2[k].lineCoordinates = {
								x1: x1 + prevAxisY2Width, y1: y1, x2: x1 + prevAxisY2Width, y2: y2, height: Math.abs(y2 - y1)
							}

							axisY2[k].bounds = {
								x1: x1, y1: y1, x2: x2 + (axisY2Width[k] + prevAxisY2Width), y2: y2, width: x2 - x1, height: y2 - y1
							};

							if (axisY2[k].title)
								axisY2[k]._titleTextBlock.maxWidth = axisY2[k].titleMaxWidth > 0 && axisY2[k].titleMaxWidth < axisY2[k].lineCoordinates.height ? axisY2[k].titleMaxWidth : axisY2[k].lineCoordinates.height;
							prevAxisY2Width += (axisY2Width[k] + axisY2[k].margin);
						}
					}
				}

				if (axisX && axisX.length > 0) {
					for (var k = 0; k < axisX.length; k++) {
						if (axisX[k]) {
							axisX[k].calculateValueToPixelConversionParameters();
							axisX[k].calculateBreaksSizeInValues();

							if (axisX[k]._labels && axisX[k]._labels.length > 1) {
								firstLabelPosition = (axisX[k].logarithmic ? Math.log(axisX[k]._labels[1].position / axisX[k].viewportMinimum) / axisX[k].conversionParameters.lnLogarithmBase : (axisX[k]._labels[1].position - axisX[k].viewportMinimum)) * Math.abs(axisX[k].conversionParameters.pixelPerUnit) + axisX[k].lineCoordinates.x1;
								var lastLabelVal = axisX[k]._labels[axisX[k]._labels.length - (axisX[k].valueType === "dateTime" ? 2 : 1)].position;
								var lastLabelAboveViewportMin = axisX[k].getApparentDifference(axisX[k].viewportMinimum, lastLabelVal);

								if (axisX[k].logarithmic)
									lastLabelPosition = (lastLabelAboveViewportMin > 1 ? Math.log(lastLabelAboveViewportMin) / axisX[k].conversionParameters.lnLogarithmBase * Math.abs(axisX[k].conversionParameters.pixelPerUnit) : 0) + axisX[k].lineCoordinates.x1;
								else
									lastLabelPosition = (lastLabelAboveViewportMin > 0 ? lastLabelAboveViewportMin * Math.abs(axisX[k].conversionParameters.pixelPerUnit) : 0) + axisX[k].lineCoordinates.x1;
							}
						}
					}
				}

				if (axisX2 && axisX2.length > 0) {
					for (var k = 0; k < axisX2.length; k++) {
						axisX2[k].calculateValueToPixelConversionParameters();
						axisX2[k].calculateBreaksSizeInValues();
						if (axisX2[k]._labels && axisX2[k]._labels.length > 1) {
							firstLabelPosition = (axisX2[k].logarithmic ? Math.log(axisX2[k]._labels[1].position / axisX2[k].viewportMinimum) / axisX2[k].conversionParameters.lnLogarithmBase : (axisX2[k]._labels[1].position - axisX2[k].viewportMinimum)) * Math.abs(axisX2[k].conversionParameters.pixelPerUnit) + axisX2[k].lineCoordinates.x1;
							var lastLabelVal = axisX2[k]._labels[axisX2[k]._labels.length - (axisX2[k].valueType === "dateTime" ? 2 : 1)].position;
							var lastLabelAboveViewportMin = axisX2[k].getApparentDifference(axisX2[k].viewportMinimum, lastLabelVal);

							if (axisX2[k].logarithmic)
								lastLabelPosition = (lastLabelAboveViewportMin > 1 ? Math.log(lastLabelAboveViewportMin) / axisX2[k].conversionParameters.lnLogarithmBase * Math.abs(axisX2[k].conversionParameters.pixelPerUnit) : 0) + axisX2[k].lineCoordinates.x1;
							else
								lastLabelPosition = (lastLabelAboveViewportMin > 0 ? lastLabelAboveViewportMin * Math.abs(axisX2[k].conversionParameters.pixelPerUnit) : 0) + axisX2[k].lineCoordinates.x1;
						}
					}
				}

				for (var k = 0; k < axes.length; k++)
					if (axes[k].type === "axisY") {
						axes[k].calculateValueToPixelConversionParameters();
						axes[k].calculateBreaksSizeInValues();
					}

				if (i > 0) {
					if (axisX && axisX.length > 0) {
						for (var k = 0; k < axisX.length; k++) {
							if (axisXHeights[i - 1][k] === axisXHeights[i][k])
								xFlag = true;
							else
								xFlag = false
						}
					} else {
						xFlag = true;
					}
					if (axisX2 && axisX2.length > 0) {
						for (var k = 0; k < axisX2.length; k++) {
							if (axisX2Heights[i - 1][k] === axisX2Heights[i][k])
								x2Flag = true;
							else
								x2Flag = false;
						}
					} else {
						x2Flag = true;
					}
					if (axisY && axisY.length > 0) {
						for (var k = 0; k < axisY.length; k++) {
							if (axisYWidths[i - 1][k] === axisYWidths[i][k])
								yFlag = true;
							else
								yFlag = false;
						}
					} else {
						yFlag = true;
					}
					if (axisY2 && axisY2.length > 0) {
						for (var k = 0; k < axisY2.length; k++) {
							if (axisY2Widths[i - 1][k] === axisY2Widths[i][k])
								y2Flag = true;
							else
								y2Flag = false;
						}
					} else {
						y2Flag = true;
					}
				}

				if (xFlag && x2Flag && yFlag && y2Flag)
					break;

				i++;
			}

			ctx.save();
			ctx.beginPath();

			if (axisX[0])
				ctx.rect(5, axisX[0].bounds.y1, axisX[0].chart.width - 10, axisX[0].bounds.height);

			if (axisX2[0])
				ctx.rect(5, axisX2[axisX2.length - 1].bounds.y1, axisX2[0].chart.width - 10, axisX2[0].bounds.height);

			ctx.clip();

			if (axisX && axisX.length > 0) {
				for (var k = 0; k < axisX.length; k++) {
					axisX[k].calculateStripLinesThicknessInValues();
					axisX[k].calculateBreaksInPixels();
					axisX[k].renderLabelsTicksAndTitle();
				}
			}

			if (axisX2 && axisX2.length > 0) {
				for (var k = 0; k < axisX2.length; k++) {
					axisX2[k].calculateStripLinesThicknessInValues();
					axisX2[k].calculateBreaksInPixels();
					axisX2[k].renderLabelsTicksAndTitle();
				}
			}

			ctx.restore();

			if (axisY && axisY.length > 0) {
				for (var k = 0; k < axisY.length; k++) {
					axisY[k].calculateStripLinesThicknessInValues();
					axisY[k].calculateBreaksInPixels();
					axisY[k].renderLabelsTicksAndTitle();
				}
			}

			if (axisY2 && axisY2.length > 0) {
				for (var k = 0; k < axisY2.length; k++) {
					axisY2[k].calculateStripLinesThicknessInValues();
					axisY2[k].calculateBreaksInPixels();
					axisY2[k].renderLabelsTicksAndTitle();
				}
			}

		}
		else {
			var axisYHeight = [], axisY2Height = [], axisXWidth = [], axisX2Width = [];
			var axisYHeights = [], axisY2Heights = [], axisXWidths = [], axisX2Widths = [];

			while (i < 4) {

				var prevAxisYHeight = 0, prevAxisY2Height = 0, prevAxisXWidth = 0, prevAxisX2Width = 0;
				var axisXMargin = 0, axisX2Margin = 0, axisYMargin = 0, axisY2Margin = 0;
				var axisYTotalHeight = 0, axisY2TotalHeight = 0, axisXTotalWidth = 0, axisX2TotalWidth = 0;

				if (axisX && axisX.length > 0) {
					axisXWidth = []; axisXTotalWidth = 0;
					for (var k = 0; k < axisX.length; k++) {
						axisXWidth.push(Math.ceil(axisX[k] ? axisX[k].createLabelsAndCalculateWidth() : 0));
						axisXTotalWidth += axisXWidth[k];

						axisXMargin += axisX[k] ? axisX[k].margin : 0;
					}
					axisXWidths.push(axisXWidth);
				} else {
					axisXWidth.push(Math.ceil(axisX[0] ? axisX[0].createLabelsAndCalculateWidth() : 0));
					axisXWidths.push(axisXWidth);
				}

				if (axisX2 && axisX2.length > 0) {
					axisX2Width = []; axisX2TotalWidth = 0;
					for (var k = 0; k < axisX2.length; k++) {
						axisX2Width.push(Math.ceil(axisX2[k] ? axisX2[k].createLabelsAndCalculateWidth() : 0));
						axisX2TotalWidth += axisX2Width[k];

						axisX2Margin += axisX2[k] ? axisX2[k].margin : 0;
					}
					axisX2Widths.push(axisX2Width);
				} else {
					axisX2Width.push(Math.ceil(axisX2[0] ? axisX2[0].createLabelsAndCalculateWidth() : 0));
					axisX2Widths.push(axisX2Width);
				}

				if (axisY && axisY.length > 0) {
					for (var k = 0; k < axisY.length; k++) {
						axisY[k].lineCoordinates = {
						};

						x1 = Math.round(freeSpace.x1 + axisXTotalWidth + axisXMargin);
						x2 = Math.round(freeSpace.x2 - axisX2TotalWidth - axisX2Margin > chart.width - 10 ? chart.width - 10 : freeSpace.x2 - axisX2TotalWidth - axisX2Margin);
						if (axisY[k].labelAutoFit) {
							if (!isNullOrUndefined(firstLabelWidthY)) {
								if (!axisX.length > 0)
									x1 = axisY[k].labelAngle < 0 ? Math.max(x1, firstLabelWidthY) : axisY[k].labelAngle === 0 ? Math.max(x1, firstLabelWidthY / 2) : x1;

								if (!axisX2.length > 0)
									x2 = axisY[k].labelAngle > 0 ? x2 - lastLabelWidthY / 2 : axisY[k].labelAngle === 0 ? x2 - lastLabelWidthY / 2 : x2;
							}
						}
						axisY[k].lineCoordinates.x1 = x1;
						axisY[k].lineCoordinates.x2 = x2;
						axisY[k].lineCoordinates.width = Math.abs(x2 - x1);
						if (axisY[k].title)
							axisY[k]._titleTextBlock.maxWidth = axisY[k].titleMaxWidth > 0 && axisY[k].titleMaxWidth < axisY[k].lineCoordinates.width ? axisY[k].titleMaxWidth : axisY[k].lineCoordinates.width;
					}
				}

				if (axisY2 && axisY2.length > 0) {
					for (var k = 0; k < axisY2.length; k++) {
						axisY2[k].lineCoordinates = {
						};
						x1 = Math.round(freeSpace.x1 + axisXTotalWidth + axisXMargin);
						x2 = Math.round(freeSpace.x2 - axisX2TotalWidth - axisX2Margin > axisY2[k].chart.width - 10 ? axisY2[k].chart.width - 10 : freeSpace.x2 - axisX2TotalWidth - axisX2Margin);
						if (axisY2[k] && axisY2[k].labelAutoFit) {
							if (!isNullOrUndefined(firstLabelWidthY2)) {
								if (!axisX.length > 0)
									x1 = axisY2[k].labelAngle > 0 ? Math.max(x1, firstLabelWidthY2) : axisY2[k].labelAngle === 0 ? Math.max(x1, firstLabelWidthY2 / 2) : x1;

								if (!axisX2.length > 0)
									x2 = axisY2[k].labelAngle < 0 ? x2 - lastLabelWidthY2 / 2 : axisY2[k].labelAngle === 0 ? x2 - lastLabelWidthY2 / 2 : x2 - (lastLabelWidthY2 / 2);
							}
						}
						axisY2[k].lineCoordinates.x1 = x1;
						axisY2[k].lineCoordinates.x2 = x2;

						axisY2[k].lineCoordinates.width = Math.abs(x2 - x1);
						if (axisY2[k].title)
							axisY2[k]._titleTextBlock.maxWidth = axisY2[k].titleMaxWidth > 0 && axisY2[k].titleMaxWidth < axisY2[k].lineCoordinates.width ? axisY2[k].titleMaxWidth : axisY2[k].lineCoordinates.width;
					}
				}

				if (axisY && axisY.length > 0) {
					axisYHeight = []; axisYTotalHeight = 0;
					for (var k = 0; k < axisY.length; k++) {
						axisYHeight.push(Math.ceil(axisY[k] ? axisY[k].createLabelsAndCalculateHeight() : 0));
						axisYTotalHeight += axisYHeight[k] + axisY[k].margin;

						axisYMargin += axisY[k].margin;
					}
					axisYHeights.push(axisYHeight);
				} else {
					axisYHeight.push(Math.ceil(axisY[0] ? axisY[0].createLabelsAndCalculateHeight() : 0));
					axisYHeights.push(axisYHeight);
				}

				if (axisY2 && axisY2.length > 0) {
					axisY2Height = []; axisY2TotalHeight = 0;
					for (var k = 0; k < axisY2.length; k++) {
						axisY2Height.push(Math.ceil(axisY2[k] ? axisY2[k].createLabelsAndCalculateHeight() : 0));
						axisY2TotalHeight += axisY2Height[k];

						axisY2Margin += axisY2[k].margin;
					}
					axisY2Heights.push(axisY2Height);
				} else {
					axisY2Height.push(Math.ceil(axisY2[0] ? axisY2[0].createLabelsAndCalculateHeight() : 0));
					axisY2Heights.push(axisY2Height);
				}

				if (axisY && axisY.length > 0)
					for (var k = 0; k < axisY.length; k++) {
						if (axisY[k]._labels.length > 0) {
							var firstLabel = axisY[k]._labels[0];
							var lastLabel = axisY[k]._labels[axisY[k]._labels.length - 1];
							firstLabelWidthY = (firstLabel.textBlock.width * Math.cos(Math.PI / 180 * Math.abs(firstLabel.textBlock.angle))) + ((firstLabel.textBlock.height - lastLabel.textBlock.fontSize / 2) * Math.sin(Math.PI / 180 * Math.abs(firstLabel.textBlock.angle)));//(axisY2._labels[0].textBlock.width);
							lastLabelWidthY = (lastLabel.textBlock.width * Math.cos(Math.PI / 180 * Math.abs(lastLabel.textBlock.angle))) + ((lastLabel.textBlock.height - lastLabel.textBlock.fontSize / 2) * Math.sin(Math.PI / 180 * Math.abs(lastLabel.textBlock.angle)));//axisY2._labels[axisY2._labels.length - 1].textBlock.width;
						}
					}

				if (axisY2 && axisY2.length > 0) {
					for (var k = 0; k < axisY2.length; k++) {
						if (axisY2[k] && axisY2[k]._labels.length > 0) {
							var firstLabel = axisY2[k]._labels[0];
							var lastLabel = axisY2[k]._labels[axisY2[k]._labels.length - 1];
							firstLabelWidthY2 = (firstLabel.textBlock.width * Math.cos(Math.PI / 180 * Math.abs(firstLabel.textBlock.angle))) + ((firstLabel.textBlock.height - lastLabel.textBlock.fontSize / 2) * Math.sin(Math.PI / 180 * Math.abs(firstLabel.textBlock.angle)));//(axisY2._labels[0].textBlock.width);
							lastLabelWidthY2 = (lastLabel.textBlock.width * Math.cos(Math.PI / 180 * Math.abs(lastLabel.textBlock.angle))) + ((lastLabel.textBlock.height - lastLabel.textBlock.fontSize / 2) * Math.sin(Math.PI / 180 * Math.abs(lastLabel.textBlock.angle)));//axisY2._labels[axisY2._labels.length - 1].textBlock.width;
						}
					}
				}

				if (!chart.panEnabled)
					for (var k = 0; k < axisY.length; k++)
						chart.sessionVariables.axisY.height = axisYHeight[k];
				else
					for (var k = 0; k < axisY.length; k++)
						axisYHeight[k] = chart.sessionVariables.axisY.height;

				// Position axisY based on the available free space, Margin and its height
				if (axisY && axisY.length > 0) {
					for (var k = axisY.length - 1; k >= 0; k--) {
						//x1 = freeSpace.x1 + axisXWidth + axisX.margin + axisX.lineThickness / 2;
						//x2 = freeSpace.x2 > axisY.chart.width - 10 ? axisY.chart.width - 10 : freeSpace.x2;
						y1 = Math.round(freeSpace.y2);
						y2 = Math.round(freeSpace.y2 > axisY[k].chart.height - 10 ? axisY[k].chart.height - 10 : freeSpace.y2);

						//axisY.lineCoordinates = { x1: x1, y1: y1, x2: x2, y2: y1, width: Math.abs(x2 - x1) }
						axisY[k].lineCoordinates.y1 = y1 - (axisYHeight[k] + axisY[k].margin + prevAxisYHeight);
						axisY[k].lineCoordinates.y2 = y1 - (axisYHeight[k] + axisY[k].margin + prevAxisYHeight);

						axisY[k].bounds = {
							x1: x1, y1: y1 - (axisYHeight[k] + prevAxisYHeight + axisY[k].margin), x2: x2, y2: y2 - (prevAxisYHeight + axisY[k].margin), width: x2 - x1, height: axisYHeight[k]
						};

						if (axisY[k].title)
							axisY[k]._titleTextBlock.maxWidth = axisY[k].titleMaxWidth > 0 && axisY[k].titleMaxWidth < axisY[k].lineCoordinates.width ? axisY[k].titleMaxWidth : axisY[k].lineCoordinates.width;
						prevAxisYHeight += (axisYHeight[k] + axisY[k].margin);
					}
				}

				// Position axisY2 based on the available free space, Margin and its height
				if (axisY2 && axisY2.length > 0) {
					for (var k = axisY2.length - 1; k >= 0; k--) {
						if (axisY2[k]) {
							//x1 = freeSpace.x1 + axisXWidth + axisX.margin + axisX.lineThickness / 2;
							//x2 = freeSpace.x2 > axisY2.chart.width - 10 ? axisY2.chart.width - 10 : freeSpace.x2;

							y1 = Math.round(freeSpace.y1);
							y2 = Math.round(freeSpace.y1 + (axisY2Height[k] + axisY2[k].margin + prevAxisY2Height));

							//axisY2.lineCoordinates = { x1: x1, y1: y2, x2: x2, y2: y2, width: Math.abs(x2 - x1) }
							axisY2[k].lineCoordinates.y1 = y2;
							axisY2[k].lineCoordinates.y2 = y2;

							axisY2[k].bounds = {
								x1: x1, y1: y1 + (axisY2[k].margin + prevAxisY2Height), x2: x2, y2: y2, width: x2 - x1, height: axisY2TotalHeight
							};
							if (axisY2[k].title)
								axisY2[k]._titleTextBlock.maxWidth = axisY2[k].titleMaxWidth > 0 && axisY2[k].titleMaxWidth < axisY2[k].lineCoordinates.width ? axisY2[k].titleMaxWidth : axisY2[k].lineCoordinates.width;
							prevAxisY2Height += (axisY2Height[k] + axisY2[k].margin);
						}
					}
				}

				//axisY.ctx.rect(axisY.bounds.x1, axisY.bounds.y1, axisY.bounds.width, axisY.bounds.height);
				//axisY.ctx.stroke();

				// Position axisX based on the available free space, Margin and its height
				if (axisX && axisX.length > 0) {
					for (var k = 0; k < axisX.length; k++) {
						var padding = 0;
						padding = axisX[k]._labels && axisX[k]._labels.length > 0 ? axisX[k]._labels[0].textBlock.fontSize / 2 : 0;
						x1 = Math.round(freeSpace.x1 + axisXMargin);

						if (axisY2 && axisY2.length > 0) {
							y1 = Math.round(axisY2[0] ? axisY2[0].lineCoordinates.y2 : (freeSpace.y1 < Math.max(padding, 10) ? Math.max(padding, 10) : freeSpace.y1));
						} else {
							y1 = freeSpace.y1 < Math.max(padding, 10) ? Math.max(padding, 10) : freeSpace.y1;
						}

						x2 = Math.round(freeSpace.x1 + axisXTotalWidth + axisXMargin);

						if (axisY && axisY.length > 0) {
							y2 = Math.round(axisY[0] ? axisY[0].lineCoordinates.y1 : (freeSpace.y2 - axisYTotalHeight > chart.height - Math.max(padding, 10) ? chart.height - Math.max(padding, 10) : freeSpace.y2 - axisYTotalHeight));
						} else {
							y2 = freeSpace.y2 > chart.height - Math.max(padding, 10) ? chart.height - Math.max(padding, 10) : freeSpace.y2;
						}

						if (axisY && axisY.length > 0) {
							for (var l = 0; l < axisY.length; l++) {
								if (axisY[l] && axisY[l].labelAutoFit) {
									x2 = axisY[l].labelAngle < 0 ? Math.max(x2, firstLabelWidthY) : axisY[l].labelAngle === 0 ? Math.max(x2, firstLabelWidthY / 2) : x2;
									x1 = axisY[l].labelAngle < 0 || axisY[l].labelAngle === 0 ? x2 - axisXTotalWidth : x1;
								}
							}
						}

						if (axisY2 && axisY2.length > 0) {
							for (var l = 0; l < axisY2.length; l++) {
								if (axisY2[l] && axisY2[l].labelAutoFit) {
									x2 = axisY2[l].lineCoordinates.x1;//Math.max(x2, firstLabelWidthY2 / 2);
									x1 = x2 - axisXTotalWidth;
								}
							}
						}

						axisX[k].lineCoordinates = {
							x1: x2 - prevAxisXWidth, y1: y1, x2: x2 - prevAxisXWidth, y2: y2, height: Math.abs(y2 - y1)
						};

						axisX[k].bounds = {
							x1: x2 - (axisXWidth[k] + prevAxisXWidth), y1: y1, x2: x2, y2: y2, width: x2 - x1, height: y2 - y1
						};

						if (axisX[k].title)
							axisX[k]._titleTextBlock.maxWidth = axisX[k].titleMaxWidth > 0 && axisX[k].titleMaxWidth < axisX[k].lineCoordinates.height ? axisX[k].titleMaxWidth : axisX[k].lineCoordinates.height;

						//axisX.ctx.rect(axisX.bounds.x1, axisX.bounds.y1, axisX.bounds.width, axisX.bounds.height);
						//axisX.ctx.stroke();
						axisX[k].calculateValueToPixelConversionParameters();
						axisX[k].calculateBreaksSizeInValues();

						prevAxisXWidth += axisXWidth[k] + axisX[k].margin;
					}
				}

				// Position axisX2 based on the available free space, Margin and its height
				if (axisX2 && axisX2.length > 0) {
					for (var k = 0; k < axisX2.length; k++) {
						var padding = 0;
						padding = axisX2[k]._labels && axisX2[k]._labels.length > 0 ? axisX2[k]._labels[0].textBlock.fontSize / 2 : 0;
						x1 = Math.round(freeSpace.x1 - axisXMargin);

						if (axisY2 && axisY2.length > 0) {
							y1 = Math.round(axisY2[0] ? axisY2[0].lineCoordinates.y2 : (freeSpace.y1 < Math.max(padding, 10) ? Math.max(padding, 10) : freeSpace.y1));
						} else {
							y1 = freeSpace.y1 < Math.max(padding, 10) ? Math.max(padding, 10) : freeSpace.y1;
						}

						x2 = Math.round(freeSpace.x2 - axisX2TotalWidth - axisX2Margin);

						if (axisY && axisY.length > 0) {
							y2 = Math.round(axisY[0] ? axisY[0].lineCoordinates.y1 : (freeSpace.y2 - axisYTotalHeight > chart.height - Math.max(padding, 10) ? chart.height - Math.max(padding, 10) : freeSpace.y2 - axisYTotalHeight));
						} else {
							y2 = freeSpace.y2 > chart.height - Math.max(padding, 10) ? chart.height - Math.max(padding, 10) : freeSpace.y2;
						}

						if (axisY && axisY.length > 0) {
							for (var l = 0; l < axisY.length; l++) {
								if (axisY[l] && axisY[l].labelAutoFit) {
									x2 = axisY[l].labelAngle < 0 ? Math.max(x2, firstLabelWidthY) : axisY[l].labelAngle === 0 ? Math.max(x2, firstLabelWidthY / 2) : x2;
									x1 = axisY[l].labelAngle < 0 || axisY[l].labelAngle === 0 ? x2 - axisX2TotalWidth : x1;
								}
							}
						}

						if (axisY2 && axisY2.length > 0) {
							for (var l = 0; l < axisY2.length; l++) {
								if (axisY2[l] && axisY2[l].labelAutoFit) {
									x2 = axisY2[l].lineCoordinates.x2;//Math.max(x2, firstLabelWidthY2 / 2);
									x1 = x2 - axisX2TotalWidth;
								}
							}
						}


						axisX2[k].lineCoordinates = {
							x1: x2 + prevAxisX2Width, y1: y1, x2: x2 + prevAxisX2Width, y2: y2, height: Math.abs(y2 - y1)
						};

						axisX2[k].bounds = {
							x1: x1, y1: y1, x2: x2 + axisX2Width[k] + prevAxisX2Width, y2: y2, width: x2 - x1, height: y2 - y1
						};

						if (axisX2[k].title)
							axisX2[k]._titleTextBlock.maxWidth = axisX2[k].titleMaxWidth > 0 && axisX2[k].titleMaxWidth < axisX2[k].lineCoordinates.height ? axisX2[k].titleMaxWidth : axisX2[k].lineCoordinates.height;

						//axisX.ctx.rect(axisX.bounds.x1, axisX.bounds.y1, axisX.bounds.width, axisX.bounds.height);
						//axisX.ctx.stroke();
						axisX2[k].calculateValueToPixelConversionParameters();
						axisX2[k].calculateBreaksSizeInValues();

						prevAxisX2Width += axisX2Width[k] + axisX2[k].margin;
					}
				}


				for (var k = 0; k < axes.length; k++)
					if (axes[k].type === "axisY") {
						axes[k].calculateValueToPixelConversionParameters();
						axes[k].calculateBreaksSizeInValues();
						//intervalInPixelsY = axisY.conversionParameters.pixelPerUnit * convertToNumber(axisY.interval, axisY.intervalType);
					}

				if (i > 0) {
					if (axisX && axisX.length > 0) {
						for (var k = 0; k < axisX.length; k++) {
							if (axisXWidths[i - 1][k] === axisXWidths[i][k])
								xFlag = true;
							else
								xFlag = false
						}
					} else {
						xFlag = true;
					}
					if (axisX2 && axisX2.length > 0) {
						for (var k = 0; k < axisX2.length; k++) {
							if (axisX2Widths[i - 1][k] === axisX2Widths[i][k])
								x2Flag = true;
							else
								x2Flag = false;
						}
					} else {
						x2Flag = true;
					}
					if (axisY && axisY.length > 0) {
						for (var k = 0; k < axisY.length; k++) {
							if (axisYHeights[i - 1][k] === axisYHeights[i][k])
								yFlag = true;
							else
								yFlag = false;
						}
					} else {
						yFlag = true;
					}
					if (axisY2 && axisY2.length > 0) {
						for (var k = 0; k < axisY2.length; k++) {
							if (axisY2Heights[i - 1][k] === axisY2Heights[i][k])
								y2Flag = true;
							else
								y2Flag = false;
						}
					} else {
						y2Flag = true;
					}
				}

				if (xFlag && x2Flag && yFlag && y2Flag)
					break;

				i++;
			}

			//axisX.calculateValueToPixelConversionParameters();

			//if (axisY)
			//	axisY.calculateValueToPixelConversionParameters();
			//if (axisY2)
			//	axisY2.calculateValueToPixelConversionParameters();

			//console.log(chart.axisY.conversionParameters.pixelPerUnit * convertToNumber(chart.axisY.interval, chart.axisY.intervalType));
			//ctx.save();
			//ctx.rect(axisY.bounds.x1 - 30, axisY.bounds.y1, axisY.bounds.width + 60, axisY.bounds.height);
			//ctx.clip();

			//calculating and storing axis breaks in pixels

			if (axisY && axisY.length > 0)
				for (var k = 0; k < axisY.length; k++) {
					axisY[k].calculateStripLinesThicknessInValues();
					axisY[k].calculateBreaksInPixels();
					axisY[k].renderLabelsTicksAndTitle();
				}

			if (axisY2 && axisY2.length > 0)
				for (var k = 0; k < axisY2.length; k++) {
					axisY2[k].calculateStripLinesThicknessInValues();
					axisY2[k].calculateBreaksInPixels();
					axisY2[k].renderLabelsTicksAndTitle();
				}

			//ctx.restore();
			if (axisX && axisX.length > 0)
				for (var k = 0; k < axisX.length; k++) {
					axisX[k].calculateStripLinesThicknessInValues();
					axisX[k].calculateBreaksInPixels();
					axisX[k].renderLabelsTicksAndTitle();
				}

			if (axisX2 && axisX2.length > 0)
				for (var k = 0; k < axisX2.length; k++) {
					axisX2[k].calculateStripLinesThicknessInValues();
					axisX2[k].calculateBreaksInPixels();
					axisX2[k].renderLabelsTicksAndTitle();
				}
		}

		chart.preparePlotArea();

		var plotArea = chart.plotArea;

		ctx.save();
		ctx.beginPath();
		ctx.rect(plotArea.x1, plotArea.y1, Math.abs(plotArea.x2 - plotArea.x1), Math.abs(plotArea.y2 - plotArea.y1));

		ctx.clip();

		if (axisX && axisX.length > 0)
			for (var k = 0; k < axes.length; k++)
				axes[k].renderStripLinesOfThicknessType("value");

		if (axisX2 && axisX2.length > 0)
			for (var k = 0; k < axisX2.length; k++)
				axisX2[k].renderStripLinesOfThicknessType("value");

		if (axisY && axisY.length > 0)
			for (var k = 0; k < axisY.length; k++)
				axisY[k].renderStripLinesOfThicknessType("value");

		if (axisY2 && axisY2.length > 0)
			for (var k = 0; k < axisY2.length; k++)
				axisY2[k].renderStripLinesOfThicknessType("value");

		if (axisX && axisX.length > 0)
			for (var k = 0; k < axisX.length; k++)
				axisX[k].renderInterlacedColors();

		if (axisX2 && axisX2.length > 0)
			for (var k = 0; k < axisX2.length; k++)
				axisX2[k].renderInterlacedColors();

		if (axisY && axisY.length > 0)
			for (var k = 0; k < axisY.length; k++)
				axisY[k].renderInterlacedColors();

		if (axisY2 && axisY2.length > 0)
			for (var k = 0; k < axisY2.length; k++)
				axisY2[k].renderInterlacedColors();

		ctx.restore();

		if (axisX && axisX.length > 0)
			for (var k = 0; k < axisX.length; k++) {
				axisX[k].renderGrid();
				if (isCanvasSupported) {
					axisX[k].createMask();
					axisX[k].renderBreaksBackground();
				}
			}

		if (axisX2 && axisX2.length > 0)
			for (var k = 0; k < axisX2.length; k++) {
				axisX2[k].renderGrid();
				if (isCanvasSupported) {
					axisX2[k].createMask();
					axisX2[k].renderBreaksBackground();
				}
			}


		if (axisY && axisY.length > 0)
			for (var k = 0; k < axisY.length; k++) {
				axisY[k].renderGrid();
				if (isCanvasSupported) {
					axisY[k].createMask();
					axisY[k].renderBreaksBackground();
				}
			}

		if (axisY2 && axisY2.length > 0)
			for (var k = 0; k < axisY2.length; k++) {
				axisY2[k].renderGrid();
				if (isCanvasSupported) {
					axisY2[k].createMask();
					axisY2[k].renderBreaksBackground();
				}
			}

		if (axisX && axisX.length > 0)
			for (var k = 0; k < axisX.length; k++)
				axisX[k].renderAxisLine();

		if (axisX2 && axisX2.length > 0)
			for (var k = 0; k < axisX2.length; k++)
				axisX2[k].renderAxisLine();

		if (axisY && axisY.length > 0)
			for (var k = 0; k < axisY.length; k++)
				axisY[k].renderAxisLine();

		if (axisY2 && axisY2.length > 0)
			for (var k = 0; k < axisY2.length; k++)
				axisY2[k].renderAxisLine();

		if (axisX && axisX.length > 0)
			for (var k = 0; k < axisX.length; k++)
				axisX[k].renderStripLinesOfThicknessType("pixel");

		if (axisX2 && axisX2.length > 0)
			for (var k = 0; k < axisX2.length; k++)
				axisX2[k].renderStripLinesOfThicknessType("pixel");

		if (axisY && axisY.length > 0)
			for (var k = 0; k < axisY.length; k++)
				axisY[k].renderStripLinesOfThicknessType("pixel");

		if (axisY2 && axisY2.length > 0)
			for (var k = 0; k < axisY2.length; k++)
				axisY2[k].renderStripLinesOfThicknessType("pixel");

	}

	Axis.prototype.calculateStripLinesThicknessInValues = function () {
		for (var i = 0; i < this.stripLines.length; i++)
			if (this.stripLines[i].startValue !== null && this.stripLines[i].endValue !== null) {

				var val1 = Math.min(this.stripLines[i].startValue, this.stripLines[i].endValue);
				var val2 = Math.max(this.stripLines[i].startValue, this.stripLines[i].endValue);
				var valueDiff = this.getApparentDifference(val1, val2);
				if (this.logarithmic)
					this.stripLines[i].value *= Math.sqrt(Math.log(this.stripLines[i].endValue / this.stripLines[i].startValue) / Math.log(valueDiff));
				else
					this.stripLines[i].value += (Math.abs(this.stripLines[i].endValue - this.stripLines[i].startValue) - valueDiff) / 2;
				this.stripLines[i].thickness = valueDiff;
				this.stripLines[i]._thicknessType = "value";
			}
	}

	Axis.prototype.calculateBreaksSizeInValues = function () {
		var axisLength = (this._position === "left" || this._position === "right") ? this.lineCoordinates.height || this.chart.height : this.lineCoordinates.width || this.chart.width;
		var appliedBreaks = !this.scaleBreaks ? [] : this.scaleBreaks._appliedBreaks;
		var conversionParamPixelPerUnit = this.conversionParameters.pixelPerUnit || (axisLength / (this.logarithmic ? this.conversionParameters.maximum / this.conversionParameters.minimum : this.conversionParameters.maximum - this.conversionParameters.minimum));
		var hasUserSetScaleBreaksSpacing = this.scaleBreaks && !isNullOrUndefined(this.scaleBreaks.options.spacing);
		var hasUserSetSpacing;

		for (var i = 0; i < appliedBreaks.length; i++) {
			hasUserSetSpacing = hasUserSetScaleBreaksSpacing || !isNullOrUndefined(appliedBreaks[i].options.spacing);
			appliedBreaks[i].spacing = convertPercentToValue(appliedBreaks[i].spacing, axisLength, 8, hasUserSetSpacing ? .1 * axisLength : 8, hasUserSetSpacing ? 0 : 3) << 0;
			appliedBreaks[i].size = appliedBreaks[i].spacing < 0 ? 0 : Math.abs(appliedBreaks[i].spacing / conversionParamPixelPerUnit);
			if (this.logarithmic)
				appliedBreaks[i].size = Math.pow(this.logarithmBase, appliedBreaks[i].size);
		}
	}

	Axis.prototype.calculateBreaksInPixels = function () {
		if (this.scaleBreaks && this.scaleBreaks._appliedBreaks.length <= 0)
			return;
		var appliedBreaks = !this.scaleBreaks ? [] : this.scaleBreaks._appliedBreaks;
		if (appliedBreaks.length)
			this.scaleBreaks.firstBreakIndex = this.scaleBreaks.lastBreakIndex = null;
		for (var i = 0; i < appliedBreaks.length; i++) {
			if (appliedBreaks[i].startValue > this.conversionParameters.maximum)
				break;
			if (appliedBreaks[i].endValue < this.conversionParameters.minimum)
				continue;
			if (isNullOrUndefined(this.scaleBreaks.firstBreakIndex))
				this.scaleBreaks.firstBreakIndex = i;
			if (appliedBreaks[i].startValue >= this.conversionParameters.minimum) {
				appliedBreaks[i].startPixel = this.convertValueToPixel(appliedBreaks[i].startValue);
				this.scaleBreaks.lastBreakIndex = i;
			}
			if (appliedBreaks[i].endValue <= this.conversionParameters.maximum)
				appliedBreaks[i].endPixel = this.convertValueToPixel(appliedBreaks[i].endValue);
		}
	}

	Axis.prototype.renderLabelsTicksAndTitle = function () {
		var _this = this;
		var skipLabels = false;
		var totalLabelWidth = 0;
		var totalLabelHeight = 0;
		var thresholdRatio = 1;
		var labelCount = 0;
		var skipStep = 2;
		var intervalInPixels = this.conversionParameters.pixelPerUnit * convertToNumber(this.interval, this.intervalType);

		if (this.labelAngle !== 0 && this.labelAngle !== 360)
			thresholdRatio = 1.2;

		//Don't skip labels when interval is explicitely set
		if (typeof (this.options.interval) === "undefined") {
			if (this._position === "bottom" || this._position === "top") {
				if (this.logarithmic && !this.equidistantInterval && this.labelAutoFit) {
					var labels = [];
					if (this.labelAngle !== 0 && this.labelAngle !== 360)
						thresholdRatio = 1;
					else
						thresholdRatio = 1.2;
					var nextWidth, nextPosition = this.viewportMaximum;
					var pixelPerUnit = this.lineCoordinates.width / Math.log(this.range);
					for (var i = this._labels.length - 1; i >= 0; i--) {
						label = this._labels[i];

						if (label.position < this.viewportMinimum)// don't consider stripLine's lable
							break;
						if (label.position > this.viewportMaximum)// don't consider stripLine's lable
							continue;

						if (i === this._labels.length - 1 || nextWidth < Math.log(nextPosition / label.position) * pixelPerUnit / thresholdRatio) {
							labels.push(label);
							nextPosition = label.position;
							nextWidth = label.textBlock.width * Math.abs(Math.cos(Math.PI / 180 * this.labelAngle)) + label.textBlock.height * Math.abs(Math.sin(Math.PI / 180 * this.labelAngle));
						}
					}
					this._labels = labels;

				} else {
					//thresholdRatio = .9;// More space is preferred between labels when axis is horizontally aligned

					for (var i = 0; i < this._labels.length; i++) {
						label = this._labels[i];
						if (label.position < this.viewportMinimum)// don't consider stripLine's label
							continue;
						var width = label.textBlock.width * Math.abs(Math.cos(Math.PI / 180 * this.labelAngle)) + label.textBlock.height * Math.abs(Math.sin(Math.PI / 180 * this.labelAngle));

						totalLabelWidth += width;
					}

					if (totalLabelWidth > this.lineCoordinates.width * thresholdRatio && this.labelAutoFit) {
						skipLabels = true;
					}
				}
			} if (this._position === "left" || this._position === "right") {

				if (this.logarithmic && !this.equidistantInterval && this.labelAutoFit) {
					var labels = [];
					var nextHeight, nextPosition = this.viewportMaximum;
					var pixelPerUnit = this.lineCoordinates.height / Math.log(this.range);
					for (var i = this._labels.length - 1; i >= 0; i--) {
						label = this._labels[i];

						if (label.position < this.viewportMinimum)// don't consider stripLine's lable
							break;
						if (label.position > this.viewportMaximum)// don't consider stripLine's lable
							continue;

						if (i === this._labels.length - 1 || nextHeight < Math.log(nextPosition / label.position) * pixelPerUnit) {
							labels.push(label);
							nextPosition = label.position;
							nextHeight = label.textBlock.height * Math.abs(Math.cos(Math.PI / 180 * this.labelAngle)) + label.textBlock.width * Math.abs(Math.sin(Math.PI / 180 * this.labelAngle));
						}
					}
					this._labels = labels;
				} else {
					for (var i = 0; i < this._labels.length; i++) {
						label = this._labels[i];
						if (label.position < this.viewportMinimum)// don't consider stripLine's lable
							continue;

						var height = label.textBlock.height * Math.abs(Math.cos(Math.PI / 180 * this.labelAngle)) + label.textBlock.width * Math.abs(Math.sin(Math.PI / 180 * this.labelAngle));

						totalLabelHeight += height;
					}

					if (totalLabelHeight > this.lineCoordinates.height * thresholdRatio && this.labelAutoFit) {
						skipLabels = true;
					}
				}

			}
		}
		//		var width = label.textBlock.height * Math.cos(Math.PI / 180 * this.labelAngle) + label.textBlock.width * Math.sin(Math.PI / 180 * this.labelAngle);
		//		if (label.position * this.conversionParameters.pixelPerUnit + width > labelNext.position * this.conversionParameters.pixelPerUnit)
		//			skipLabels = true;
		//	}
		//}

		if (this.logarithmic && !this.equidistantInterval && this.labelAutoFit) {
			this._labels.sort(function (label1, label2) {
				return label1.position - label2.position;
			});
		}

		var i = 0;
		var label, tick, xy, diff;

		if (this._position === "bottom") {
			for (i = 0; i < this._labels.length; i++) {
				label = this._labels[i];
				if (label.position < this.viewportMinimum || label.position > this.viewportMaximum || skipLabels && labelCount++ % skipStep !== 0 && this.labelAutoFit)
					continue;

				xy = this.getPixelCoordinatesOnAxis(label.position);

				if (this.tickThickness && this.labelPlacement != "inside") {
					this.ctx.lineWidth = this.tickThickness;
					this.ctx.strokeStyle = this.tickColor;
					var tickX = (this.ctx.lineWidth % 2 === 1) ? (xy.x << 0) + .5 : (xy.x << 0);
					this.ctx.beginPath();
					this.ctx.moveTo(tickX, xy.y << 0);
					this.ctx.lineTo(tickX, (xy.y + this.tickLength) << 0);
					this.ctx.stroke();
				}

				if (label.textBlock.angle === 0) {
					xy.x -= label.textBlock.width / 2;
					xy.y = this.labelPlacement === "inside" ? xy.y - (this.tickLength + label.textBlock.fontSize / 2) : xy.y + this.tickLength + label.textBlock.fontSize / 2;

				} else {
					xy.x = this.labelPlacement === "inside" ? (this.labelAngle < 0 ? xy.x : xy.x - (label.textBlock.width * Math.cos(Math.PI / 180 * this.labelAngle))) : xy.x - (this.labelAngle < 0 ? (label.textBlock.width * Math.cos(Math.PI / 180 * this.labelAngle)) : 0);
					xy.y = this.labelPlacement === "inside" ? (this.labelAngle < 0 ? xy.y - this.tickLength - 5 : xy.y - this.tickLength - Math.abs((this.labelAngle < 0 ? label.textBlock.width * Math.sin(Math.PI / 180 * this.labelAngle) + 5 : label.textBlock.width * Math.sin(Math.PI / 180 * this.labelAngle) + 5))) : (xy.y + this.tickLength + Math.abs((this.labelAngle < 0 ? label.textBlock.width * Math.sin(Math.PI / 180 * this.labelAngle) - 5 : 5)));
				}
				label.textBlock.x = xy.x;
				label.textBlock.y = xy.y;
			}

			// Render Ticks when labelPlacemnt is inside
			if (this.labelPlacement === "inside") {
				this.chart.addEventListener("dataAnimationIterationEnd", function () {
					for (i = 0; i < _this._labels.length; i++) {

						label = _this._labels[i];
						if (label.position < _this.viewportMinimum || label.position > _this.viewportMaximum || skipLabels && labelCount++ % skipStep !== 0 && _this.labelAutoFit)
							continue;

						xy = _this.getPixelCoordinatesOnAxis(label.position);

						if (_this.tickThickness) {
							_this.ctx.lineWidth = _this.tickThickness;
							_this.ctx.strokeStyle = _this.tickColor;

							var tickX = (_this.ctx.lineWidth % 2 === 1) ? (xy.x << 0) + .5 : (xy.x << 0);

							_this.ctx.save();
							_this.ctx.beginPath();

							_this.ctx.moveTo(tickX, xy.y << 0);
							_this.ctx.lineTo(tickX, (xy.y - _this.tickLength) << 0);
							_this.ctx.stroke();

							_this.ctx.restore();
						}
					}
				}, this);
			}

			if (this.title) {

				this._titleTextBlock.measureText();
				this._titleTextBlock.x = this.lineCoordinates.x1 + this.lineCoordinates.width / 2 - this._titleTextBlock.width / 2;
				this._titleTextBlock.y = this.bounds.y2 - this._titleTextBlock.height - 3;
				this.titleMaxWidth = this._titleTextBlock.maxWidth;
				this._titleTextBlock.render(true);
			}
		}
		else if (this._position === "top") {

			for (i = 0; i < this._labels.length; i++) {
				label = this._labels[i];
				if (label.position < this.viewportMinimum || label.position > this.viewportMaximum || skipLabels && labelCount++ % skipStep !== 0 && this.labelAutoFit)
					continue;

				xy = this.getPixelCoordinatesOnAxis(label.position);

				if (this.tickThickness && this.labelPlacement != "inside") {
					this.ctx.lineWidth = this.tickThickness;
					this.ctx.strokeStyle = this.tickColor;
					var tickX = (this.ctx.lineWidth % 2 === 1) ? (xy.x << 0) + .5 : (xy.x << 0);
					this.ctx.beginPath();
					this.ctx.moveTo(tickX, xy.y << 0);
					this.ctx.lineTo(tickX, (xy.y - this.tickLength) << 0);
					this.ctx.stroke();

				}

				if (label.textBlock.angle === 0) {
					xy.x -= label.textBlock.width / 2;
					xy.y = this.labelPlacement === "inside" ? xy.y + this.labelFontSize / 2 + this.tickLength + 5 : xy.y - (this.tickLength + label.textBlock.height - label.textBlock.fontSize / 2);
				} else {
					//xy.x -= label.textBlock.angle < 0 ? ((label.textBlock.width * Math.cos(Math.PI / 180 * this.labelAngle)) - (label.textBlock.height - this.labelFontSize / 2) * Math.sin(Math.PI / 180 * this.labelAngle)) : (label.textBlock.width * Math.cos(Math.PI / 180 * this.labelAngle)) + (label.textBlock.height - this.labelFontSize / 2) * Math.sin(Math.PI / 180 * this.labelAngle);
					//xy.y -= this.tickLength + Math.abs((label.textBlock.width * Math.sin(Math.PI / 180 * this.labelAngle) + (label.textBlock.height - this.labelFontSize / 2 - 5) * Math.cos(Math.PI / 180 * this.labelAngle)));
					xy.x = this.labelPlacement === "inside" ? (this.labelAngle > 0 ? xy.x : xy.x - (label.textBlock.width * Math.cos(Math.PI / 180 * this.labelAngle))) : xy.x + ((label.textBlock.height - this.tickLength - this.labelFontSize) * Math.sin(Math.PI / 180 * this.labelAngle)) - (this.labelAngle > 0 ? label.textBlock.width * Math.cos(Math.PI / 180 * this.labelAngle) : 0);
					xy.y = this.labelPlacement === "inside" ? (this.labelAngle > 0 ? xy.y + this.tickLength + 5 : xy.y - label.textBlock.width * Math.sin(Math.PI / 180 * this.labelAngle) + this.tickLength + 5) : xy.y - (this.tickLength + ((label.textBlock.height - label.textBlock.fontSize / 2) * Math.cos(Math.PI / 180 * this.labelAngle) + (this.labelAngle > 0 ? label.textBlock.width * Math.sin(Math.PI / 180 * this.labelAngle) : 0)));
				}
				label.textBlock.x = xy.x;
				label.textBlock.y = xy.y;

			}

			// Render Ticks when labelPlacemnt is inside
			if (this.labelPlacement === "inside") {
				this.chart.addEventListener("dataAnimationIterationEnd", function () {
					for (i = 0; i < _this._labels.length; i++) {

						label = _this._labels[i];
						if (label.position < _this.viewportMinimum || label.position > _this.viewportMaximum || skipLabels && labelCount++ % skipStep !== 0 && _this.labelAutoFit)
							continue;

						xy = _this.getPixelCoordinatesOnAxis(label.position);

						if (_this.tickThickness) {
							_this.ctx.lineWidth = _this.tickThickness;
							_this.ctx.strokeStyle = _this.tickColor;

							var tickX = (this.ctx.lineWidth % 2 === 1) ? (xy.x << 0) + .5 : (xy.x << 0);

							_this.ctx.save();
							_this.ctx.beginPath();

							_this.ctx.moveTo(tickX, xy.y << 0);
							_this.ctx.lineTo(tickX, (xy.y + _this.tickLength) << 0);
							_this.ctx.stroke();

							_this.ctx.restore();
						}
					}
				}, this);
			}

			if (this.title) {

				this._titleTextBlock.measureText();
				this._titleTextBlock.x = this.lineCoordinates.x1 + this.lineCoordinates.width / 2 - this._titleTextBlock.width / 2;
				this._titleTextBlock.y = this.bounds.y1 + 1;
				this.titleMaxWidth = this._titleTextBlock.maxWidth;
				this._titleTextBlock.render(true);
			}
		}
		else if (this._position === "left") {
			for (i = 0; i < this._labels.length; i++) {
				label = this._labels[i];
				if (label.position < this.viewportMinimum || label.position > this.viewportMaximum || skipLabels && labelCount++ % skipStep !== 0 && this.labelAutoFit)
					continue;

				xy = this.getPixelCoordinatesOnAxis(label.position);

				if (this.tickThickness && this.labelPlacement != "inside") {
					this.ctx.lineWidth = this.tickThickness;
					this.ctx.strokeStyle = this.tickColor;
					var tickY = (this.ctx.lineWidth % 2 === 1) ? (xy.y << 0) + .5 : (xy.y << 0);
					this.ctx.beginPath();
					this.ctx.moveTo(xy.x << 0, tickY);
					this.ctx.lineTo((xy.x - this.tickLength) << 0, tickY);
					this.ctx.stroke();
				}

				//label.textBlock.x = xy.x - (label.textBlock.width * Math.cos(Math.PI / 180 * this.labelAngle)) - this.tickLength - 5;

				if (this.labelAngle === 0) {
					label.textBlock.y = xy.y;
					label.textBlock.x = this.labelPlacement === "inside" ? xy.x + this.tickLength + 5 : xy.x - (label.textBlock.width * Math.cos(Math.PI / 180 * this.labelAngle)) - this.tickLength - 5;
				} else {
					label.textBlock.y = this.labelPlacement === "inside" ? xy.y : (xy.y - (label.textBlock.width * Math.sin(Math.PI / 180 * this.labelAngle)));
					label.textBlock.x = this.labelPlacement === "inside" ? (xy.x + this.tickLength + 5) : (this.labelAngle > 0 ? (xy.x - (label.textBlock.width * Math.cos(Math.PI / 180 * this.labelAngle)) - this.tickLength - 5) : (xy.x - (label.textBlock.width * Math.cos(Math.PI / 180 * this.labelAngle)) + (label.textBlock.height - label.textBlock.fontSize / 2 - 5) * Math.sin(Math.PI / 180 * this.labelAngle) - this.tickLength));
				}
			}

			// Render Ticks when labelPlacemnt is inside
			if (this.labelPlacement === "inside") {
				this.chart.addEventListener("dataAnimationIterationEnd", function () {
					for (i = 0; i < _this._labels.length; i++) {

						label = _this._labels[i];
						if (label.position < _this.viewportMinimum || label.position > _this.viewportMaximum || skipLabels && labelCount++ % skipStep !== 0 && _this.labelAutoFit)
							continue;

						xy = _this.getPixelCoordinatesOnAxis(label.position);

						if (_this.tickThickness) {
							_this.ctx.lineWidth = _this.tickThickness;
							_this.ctx.strokeStyle = _this.tickColor;

							var tickY = (_this.ctx.lineWidth % 2 === 1) ? (xy.y << 0) + .5 : (xy.y << 0);

							_this.ctx.save();
							_this.ctx.beginPath();

							_this.ctx.moveTo(xy.x << 0, tickY);
							_this.ctx.lineTo((xy.x + _this.tickLength) << 0, tickY);
							_this.ctx.stroke();

							_this.ctx.restore();
						}
					}
				}, this);
			}

			if (this.title) {

				var size = this._titleTextBlock.measureText();

				//this._titleTextBlock.x -= 4;
				this._titleTextBlock.x = this.bounds.x1 + 1;
				this._titleTextBlock.y = (this.lineCoordinates.height / 2 + this._titleTextBlock.width / 2 + this.lineCoordinates.y1);
				this.titleMaxWidth = this._titleTextBlock.maxWidth;
				this._titleTextBlock.render(true);

				//if (isDebugMode) {
				//	window.console.log("titleFontSize: " + this.titleFontSize + "; width: " + size.width + "; height: " + size.height);
				//	window.console.log("this.bounds.x1: " + this.bounds.x1);

				//	//this.ctx.rect(this._titleTextBlock.x, this._titleTextBlock.y, this._titleTextBlock.height, -this._titleTextBlock.width);
				//	//this.ctx.stroke();

				//}

			}
		}
		else if (this._position === "right") {
			for (i = 0; i < this._labels.length; i++) {
				label = this._labels[i];
				if (label.position < this.viewportMinimum || label.position > this.viewportMaximum || skipLabels && labelCount++ % skipStep !== 0 && this.labelAutoFit)
					continue;

				xy = this.getPixelCoordinatesOnAxis(label.position);

				if (this.tickThickness && this.labelPlacement != "inside") {
					this.ctx.lineWidth = this.tickThickness;
					this.ctx.strokeStyle = this.tickColor;
					var tickY = (this.ctx.lineWidth % 2 === 1) ? (xy.y << 0) + .5 : (xy.y << 0);
					this.ctx.beginPath();
					this.ctx.moveTo(xy.x << 0, tickY);
					this.ctx.lineTo((xy.x + this.tickLength) << 0, tickY);
					this.ctx.stroke();
				}

				//label.textBlock.y = xy.y - (label.textBlock.width * Math.sin(Math.PI / 180 * this.labelAngle));

				if (this.labelAngle === 0) {
					label.textBlock.y = xy.y;
					label.textBlock.x = this.labelPlacement === "inside" ? xy.x - label.textBlock.width - this.tickLength - 5 : xy.x + this.tickLength + 5;
				} else {
					label.textBlock.y = this.labelPlacement === "inside" ? xy.y - (label.textBlock.width * Math.sin(Math.PI / 180 * this.labelAngle)) : (this.labelAngle < 0 ? xy.y : xy.y - (label.textBlock.height - label.textBlock.fontSize / 2 - 5) * Math.cos(Math.PI / 180 * this.labelAngle));
					label.textBlock.x = this.labelPlacement === "inside" ? (xy.x - (label.textBlock.width * Math.cos(Math.PI / 180 * this.labelAngle)) - this.tickLength - 5) : (this.labelAngle > 0 ? (xy.x + ((label.textBlock.height - label.textBlock.fontSize / 2 - 5) * Math.sin(Math.PI / 180 * this.labelAngle)) + this.tickLength) : xy.x + this.tickLength + 5);
				}
			}

			// Render Ticks when labelPlacemnt is inside
			if (this.labelPlacement === "inside") {
				this.chart.addEventListener("dataAnimationIterationEnd", function () {
					for (i = 0; i < _this._labels.length; i++) {
						label = _this._labels[i];
						if (label.position < _this.viewportMinimum || label.position > _this.viewportMaximum || skipLabels && labelCount++ % skipStep !== 0 && _this.labelAutoFit)
							continue;

						xy = _this.getPixelCoordinatesOnAxis(label.position);

						if (_this.tickThickness) {
							_this.ctx.lineWidth = _this.tickThickness;
							_this.ctx.strokeStyle = _this.tickColor;

							var tickY = (_this.ctx.lineWidth % 2 === 1) ? (xy.y << 0) + .5 : (xy.y << 0);

							_this.ctx.save();
							_this.ctx.beginPath();

							_this.ctx.moveTo(xy.x << 0, tickY);
							_this.ctx.lineTo((xy.x - _this.tickLength) << 0, tickY);
							_this.ctx.stroke();

							_this.ctx.restore();
						}
					}
				}, this);
			}

			if (this.title) {

				this._titleTextBlock.measureText();
				this._titleTextBlock.x = this.bounds.x2 - 1;
				this._titleTextBlock.y = (this.lineCoordinates.height / 2 - this._titleTextBlock.width / 2 + this.lineCoordinates.y1);
				this.titleMaxWidth = this._titleTextBlock.maxWidth;
				this._titleTextBlock.render(true);

			}
		}
		var textblock1, textblock2, dist, horizontalDist, verticalDist, height, width;

		labelCount = 0;

		if (this.labelPlacement === "inside") {
			this.chart.addEventListener("dataAnimationIterationEnd", function () {
				for (i = 0; i < _this._labels.length; i++) {
					label = _this._labels[i];
					if (!(label.position < _this.viewportMinimum || label.position > _this.viewportMaximum || skipLabels && labelCount++ % skipStep !== 0 && _this.labelAutoFit)) {
						_this.ctx.save();
						_this.ctx.beginPath();
						label.textBlock.render(true);
						_this.ctx.restore();
					}
				}
			}, label.textBlock);
		}
		else {
			for (var i = 0; i < this._labels.length; i++) {
				label = this._labels[i];
				if (!(label.position < this.viewportMinimum || label.position > this.viewportMaximum || skipLabels && labelCount++ % skipStep !== 0 && this.labelAutoFit))
					label.textBlock.render(true);
			}
		}
	}

	Axis.prototype.renderInterlacedColors = function () {
		var ctx = this.chart.plotArea.ctx;
		//return;

		var interlacedGridStartPoint;
		var interlacedGridEndPoint;
		var plotAreaCoordinates = this.chart.plotArea;
		var i = 0, renderInterlacedGrid = true;

		if ((this._position === "bottom" || this._position === "top") && this.interlacedColor) {

			ctx.fillStyle = this.interlacedColor;

			for (i = 0; i < this._labels.length; i++) {

				if (renderInterlacedGrid) {//So that the interlaced color alternates
					interlacedGridStartPoint = this.getPixelCoordinatesOnAxis(this._labels[i].position);

					if (i + 1 > this._labels.length - 1)
						interlacedGridEndPoint = this.getPixelCoordinatesOnAxis(this.viewportMaximum);
					else
						interlacedGridEndPoint = this.getPixelCoordinatesOnAxis(this._labels[i + 1].position);
					ctx.fillRect(Math.min(interlacedGridEndPoint.x, interlacedGridStartPoint.x), plotAreaCoordinates.y1, Math.abs(interlacedGridEndPoint.x - interlacedGridStartPoint.x), Math.abs(plotAreaCoordinates.y1 - plotAreaCoordinates.y2));
					renderInterlacedGrid = false;
				} else
					renderInterlacedGrid = true;

			}

		} else if ((this._position === "left" || this._position === "right") && this.interlacedColor) {

			ctx.fillStyle = this.interlacedColor;

			for (i = 0; i < this._labels.length; i++) {

				if (renderInterlacedGrid) {//So that the interlaced color alternates

					interlacedGridEndPoint = this.getPixelCoordinatesOnAxis(this._labels[i].position);

					if (i + 1 > this._labels.length - 1)
						interlacedGridStartPoint = this.getPixelCoordinatesOnAxis(this.viewportMaximum);
					else
						interlacedGridStartPoint = this.getPixelCoordinatesOnAxis(this._labels[i + 1].position);

					ctx.fillRect(plotAreaCoordinates.x1, Math.min(interlacedGridEndPoint.y, interlacedGridStartPoint.y), Math.abs(plotAreaCoordinates.x1 - plotAreaCoordinates.x2), Math.abs(interlacedGridStartPoint.y - interlacedGridEndPoint.y));
					renderInterlacedGrid = false;
				} else
					renderInterlacedGrid = true;
			}
			//throw "123";
		}

		ctx.beginPath();
	}

	//Renders stripLines of given thickness type.
	Axis.prototype.renderStripLinesOfThicknessType = function (thicknessType) {

		if (!(this.stripLines && this.stripLines.length > 0) || !thicknessType)
			return;

		var _this = this;
		var label;
		var xy;
		var i = 0, j = 0;
		var stripLineShowOnTopHandled = false;
		var labelShowOnTopHandled = false;
		var stripLinesToRender = [];
		var labelsToRender = [];
		var clippingRectHandler = false;

		for (i = 0; i < this.stripLines.length; i++) {
			var stripLine = this.stripLines[i];

			if (stripLine._thicknessType !== thicknessType)
				continue;

			//Should be skipped only if thicknessType is "pixel". If it is "value" then clipping is automatically applied before calling.
			if (thicknessType === "pixel" && (stripLine.value < this.viewportMinimum || stripLine.value > this.viewportMaximum || isNullOrUndefined(stripLine.value) || isNaN(this.range)))
				continue;

			stripLinesToRender.push(stripLine);
		}

		//Stripline Label placement
		for (i = 0; i < this._stripLineLabels.length; i++) {
			var stripLine = this.stripLines[i];
			label = this._stripLineLabels[i];
			if (label.position < this.viewportMinimum || label.position > this.viewportMaximum || isNaN(this.range))
				continue;

			xy = this.getPixelCoordinatesOnAxis(label.position);

			if (label.stripLine.labelPlacement === "outside") {
				if (stripLine) {
					this.ctx.strokeStyle = stripLine.color;
					if (stripLine._thicknessType === "pixel")
						this.ctx.lineWidth = stripLine.thickness;
				}
				if (this._position === "bottom") {
					var tickX = (this.ctx.lineWidth % 2 === 1) ? (xy.x << 0) + .5 : (xy.x << 0);
					this.ctx.beginPath();
					this.ctx.moveTo(tickX, xy.y << 0);
					this.ctx.lineTo(tickX, (xy.y + this.tickLength) << 0);
					this.ctx.stroke();

					if (this.labelAngle === 0) {
						xy.x -= label.textBlock.width / 2;
						xy.y += this.tickLength + label.textBlock.fontSize / 2;

					} else {
						xy.x -= (this.labelAngle < 0 ? (label.textBlock.width * Math.cos(Math.PI / 180 * this.labelAngle)) : 0);
						xy.y += this.tickLength + Math.abs((this.labelAngle < 0 ? label.textBlock.width * Math.sin(Math.PI / 180 * this.labelAngle) - 5 : 5));
					}
				}
				else if (this._position === "top") {
					var tickX = (this.ctx.lineWidth % 2 === 1) ? (xy.x << 0) + .5 : (xy.x << 0);
					this.ctx.beginPath();
					this.ctx.moveTo(tickX, xy.y << 0);
					this.ctx.lineTo(tickX, (xy.y - this.tickLength) << 0);
					this.ctx.stroke();
					if (this.labelAngle === 0) {
						xy.x -= label.textBlock.width / 2;
						xy.y -= this.tickLength + label.textBlock.height;
					} else {
						xy.x += ((label.textBlock.height - this.tickLength - this.labelFontSize / 2) * Math.sin(Math.PI / 180 * this.labelAngle)) - (this.labelAngle > 0 ? label.textBlock.width * Math.cos(Math.PI / 180 * this.labelAngle) : 0);
						xy.y -= this.tickLength + (label.textBlock.height * Math.cos(Math.PI / 180 * this.labelAngle) + (this.labelAngle > 0 ? label.textBlock.width * Math.sin(Math.PI / 180 * this.labelAngle) : 0));
					}
				}
				else if (this._position === "left") {
					var tickY = (this.ctx.lineWidth % 2 === 1) ? (xy.y << 0) + .5 : (xy.y << 0);
					this.ctx.beginPath();
					this.ctx.moveTo(xy.x << 0, tickY);
					this.ctx.lineTo((xy.x - this.tickLength) << 0, tickY);
					this.ctx.stroke();

					if (this.labelAngle === 0) {
						xy.x = xy.x - (label.textBlock.width * Math.cos(Math.PI / 180 * this.labelAngle)) - this.tickLength - 5;
					} else {
						xy.y = (xy.y - (label.textBlock.width * Math.sin(Math.PI / 180 * this.labelAngle)));
						xy.x = this.labelAngle > 0 ? (xy.x - (label.textBlock.width * Math.cos(Math.PI / 180 * this.labelAngle)) - this.tickLength - 5) : (xy.x - (label.textBlock.width * Math.cos(Math.PI / 180 * this.labelAngle)) + (label.textBlock.height - label.textBlock.fontSize / 2 - 5) * Math.sin(Math.PI / 180 * this.labelAngle) - this.tickLength);
					}
				}
				else if (this._position === "right") {
					var tickY = (this.ctx.lineWidth % 2 === 1) ? (xy.y << 0) + .5 : (xy.y << 0);
					this.ctx.beginPath();
					this.ctx.moveTo(xy.x << 0, tickY);
					this.ctx.lineTo((xy.x + this.tickLength) << 0, tickY);
					this.ctx.stroke();

					if (this.labelAngle === 0) {
						xy.x = xy.x + this.tickLength + 5;
					} else {
						xy.y = this.labelAngle < 0 ? xy.y : xy.y - (label.textBlock.height - label.textBlock.fontSize / 2 - 5) * Math.cos(Math.PI / 180 * this.labelAngle);
						xy.x = this.labelAngle > 0 ? (xy.x + ((label.textBlock.height - label.textBlock.fontSize / 2 - 5) * Math.sin(Math.PI / 180 * this.labelAngle)) + this.tickLength) : xy.x + this.tickLength + 5;//(xy.x + (label.textBlock.width * Math.sin(Math.PI / 180 * this.labelAngle)) + (label.textBlock.height - label.textBlock.fontSize / 2) * Math.cos(Math.PI / 180 * this.labelAngle) - this.tickLength - 5);
					}
				}


				label.textBlock.x = xy.x;
				label.textBlock.y = xy.y;
				labelsToRender.push(label);
			}

			else {		//labelPlacement === "inside"
				label.textBlock.angle = -90;

				if (this._position === "bottom") {
					label.textBlock.maxWidth = this.options.stripLines[i].labelMaxWidth ? this.options.stripLines[i].labelMaxWidth : this.chart.plotArea.height - 3;
					label.textBlock.measureText();
					if (xy.x - label.textBlock.height > this.chart.plotArea.x1) {
						if (isNullOrUndefined(stripLine.startValue))
							xy.x -= label.textBlock.height - label.textBlock.fontSize / 2;
						else
							xy.x -= label.textBlock.height / 2 - label.textBlock.fontSize / 2 + 3;
					}
					else {
						label.textBlock.angle = 90;
						if (isNullOrUndefined(stripLine.startValue))
							xy.x += label.textBlock.height - label.textBlock.fontSize / 2;
						else
							xy.x += label.textBlock.height / 2 - label.textBlock.fontSize / 2 + 3;
					}

					if (label.textBlock.angle === -90)
						xy.y = label.stripLine.labelAlign === "near" ? (this.chart.plotArea.y2) - 3 : label.stripLine.labelAlign === "center" ? (this.chart.plotArea.y2 + this.chart.plotArea.y1 + label.textBlock.width) / 2 : (this.chart.plotArea.y1) + label.textBlock.width + 3;
					else
						xy.y = label.stripLine.labelAlign === "near" ? (this.chart.plotArea.y2) - label.textBlock.width - 3 : label.stripLine.labelAlign === "center" ? (this.chart.plotArea.y2 + this.chart.plotArea.y1 - label.textBlock.width) / 2 : (this.chart.plotArea.y1) + 3;

				}
				else if (this._position === "top") {
					label.textBlock.maxWidth = this.options.stripLines[i].labelMaxWidth ? this.options.stripLines[i].labelMaxWidth : this.chart.plotArea.height - 3;
					label.textBlock.measureText();
					if (xy.x - label.textBlock.height > this.chart.plotArea.x1) {
						if (isNullOrUndefined(stripLine.startValue))
							xy.x -= label.textBlock.height - label.textBlock.fontSize / 2;
						else
							xy.x -= label.textBlock.height / 2 - label.textBlock.fontSize / 2 + 3;
					}
					else {
						label.textBlock.angle = 90;
						if (isNullOrUndefined(stripLine.startValue))
							xy.x += label.textBlock.height - label.textBlock.fontSize / 2;
						else
							xy.x += label.textBlock.height / 2 - label.textBlock.fontSize / 2 + 3;
					}

					if (label.textBlock.angle === -90)
						xy.y = label.stripLine.labelAlign === "near" ? (this.chart.plotArea.y1) + label.textBlock.width + 3 : label.stripLine.labelAlign === "center" ? (this.chart.plotArea.y2 + this.chart.plotArea.y1 + label.textBlock.width) / 2 : (this.chart.plotArea.y2) - 3;
					else
						xy.y = label.stripLine.labelAlign === "near" ? (this.chart.plotArea.y1) + 3 : label.stripLine.labelAlign === "center" ? (this.chart.plotArea.y2 + this.chart.plotArea.y1 - label.textBlock.width) / 2 : (this.chart.plotArea.y2) - label.textBlock.width - 3;

				}
				else if (this._position === "left") {
					label.textBlock.maxWidth = this.options.stripLines[i].labelMaxWidth ? this.options.stripLines[i].labelMaxWidth : this.chart.plotArea.width - 3;
					label.textBlock.angle = 0;
					label.textBlock.measureText();
					if (xy.y - label.textBlock.height > this.chart.plotArea.y1) {
						if (isNullOrUndefined(stripLine.startValue))
							xy.y -= label.textBlock.height - label.textBlock.fontSize / 2;
						else
							xy.y -= label.textBlock.height / 2 - label.textBlock.fontSize + 3;
					}

					else if (xy.y - label.textBlock.height < this.chart.plotArea.y2) {
						xy.y += label.textBlock.fontSize / 2 + 3;
					}
					else {
						if (isNullOrUndefined(stripLine.startValue))
							xy.y -= label.textBlock.height - label.textBlock.fontSize / 2;
						else
							xy.y -= label.textBlock.height / 2 - label.textBlock.fontSize + 3;
					}

					xy.x = label.stripLine.labelAlign === "near" ? (this.chart.plotArea.x1) + 3 : label.stripLine.labelAlign === "center" ? (this.chart.plotArea.x2 + this.chart.plotArea.x1) / 2 - label.textBlock.width / 2 : (this.chart.plotArea.x2) - label.textBlock.width - 3;

				}
				else if (this._position === "right") {
					label.textBlock.maxWidth = this.options.stripLines[i].labelMaxWidth ? this.options.stripLines[i].labelMaxWidth : this.chart.plotArea.width - 3;
					label.textBlock.angle = 0;
					label.textBlock.measureText();
					if (xy.y - +label.textBlock.height > this.chart.plotArea.y1) {
						if (isNullOrUndefined(stripLine.startValue))
							xy.y -= label.textBlock.height - label.textBlock.fontSize / 2;
						else
							xy.y -= label.textBlock.height / 2 - label.textBlock.fontSize / 2 - 3;
					}
					else if (xy.y - label.textBlock.height < this.chart.plotArea.y2) {
						xy.y += label.textBlock.fontSize / 2 + 3;
					}
					else {
						if (isNullOrUndefined(stripLine.startValue))
							xy.y -= label.textBlock.height - label.textBlock.fontSize / 2;
						else
							xy.y -= label.textBlock.height / 2 - label.textBlock.fontSize / 2 + 3;
					}

					xy.x = label.stripLine.labelAlign === "near" ? (this.chart.plotArea.x2) - label.textBlock.width - 3 : label.stripLine.labelAlign === "center" ? (this.chart.plotArea.x2 + this.chart.plotArea.x1) / 2 - label.textBlock.width / 2 : (this.chart.plotArea.x1) + 3;

				}


				label.textBlock.x = xy.x;
				label.textBlock.y = xy.y;
				labelsToRender.push(label);
			}
		}

		if (!clippingRectHandler) {//Render all StripLines and labels with labelPlacement="inside"
			labelShowOnTopHandled = false;
			this.ctx.save();
			this.ctx.beginPath();
			this.ctx.rect(this.chart.plotArea.x1, this.chart.plotArea.y1, this.chart.plotArea.width, this.chart.plotArea.height);
			this.ctx.clip();

			//Render all StripLines
			for (i = 0; i < stripLinesToRender.length; i++) {
				var stripLine = stripLinesToRender[i];
				if (stripLine.showOnTop) {
					if (!stripLineShowOnTopHandled) {
						stripLineShowOnTopHandled = true;
						this.chart.addEventListener("dataAnimationIterationEnd", function () {
							this.ctx.save();
							this.ctx.beginPath();
							this.ctx.rect(this.chart.plotArea.x1, this.chart.plotArea.y1, this.chart.plotArea.width, this.chart.plotArea.height);
							this.ctx.clip();
							for (j = 0; j < stripLinesToRender.length; j++) {
								stripLine = stripLinesToRender[j];
								if (stripLine.showOnTop)
									stripLine.render();
								else
									continue;
							}
							this.ctx.restore();
						}, stripLine);
					}
				}
				else
					stripLine.render();
			}
			//Render all labels with labelPlacement="inside" and labelPLacement="outside" and showOnTop=true
			for (i = 0; i < labelsToRender.length; i++) {
				label = labelsToRender[i];
				if (label.stripLine.showOnTop) {
					if (!labelShowOnTopHandled) {
						labelShowOnTopHandled = true;
						this.chart.addEventListener("dataAnimationIterationEnd", function () {
							for (j = 0; j < labelsToRender.length; j++) {
								label = labelsToRender[j];
								if (label.stripLine.labelPlacement === "inside" && label.stripLine.showOnTop) {
									_this.ctx.save();
									_this.ctx.beginPath();
									_this.ctx.rect(_this.chart.plotArea.x1, _this.chart.plotArea.y1, _this.chart.plotArea.width, _this.chart.plotArea.height);
									_this.ctx.clip();
									label.textBlock.render(true);
									_this.ctx.restore();
								}
								else
									continue;
							}
						}, label.textBlock);
					}
				}
				else {
					if (label.stripLine.labelPlacement === "inside")
						label.textBlock.render(true);
				}
			}
			this.ctx.restore();
			clippingRectHandler = true;
		}
		if (clippingRectHandler) {//render all labels with labelPlacement="outside"
			labelShowOnTopHandled = false;
			for (i = 0; i < labelsToRender.length; i++) {
				label = labelsToRender[i];
				if (label.stripLine.showOnTop) {
					if (!labelShowOnTopHandled) {
						labelShowOnTopHandled = true;
						this.chart.addEventListener("dataAnimationIterationEnd", function () {
							for (j = 0; j < labelsToRender.length; j++) {
								label = labelsToRender[j];
								if (label.stripLine.labelPlacement === "outside" && label.stripLine.showOnTop) {
									label.textBlock.render(true);
								}
								else
									continue;
							}
						}, label.textBlock);
					}
				}
				else {
					if (label.stripLine.labelPlacement === "outside")
						label.textBlock.render(true);
				}
			}
		}
	};

	Axis.prototype.renderBreaksBackground = function () {

		if (!this.chart._breaksCanvas || !(this.scaleBreaks && this.scaleBreaks._appliedBreaks.length > 0) || !this.maskCanvas)
			return;

		this.chart._breaksCanvasCtx.save();
		this.chart._breaksCanvasCtx.beginPath();
		this.chart._breaksCanvasCtx.rect(this.chart.plotArea.x1, this.chart.plotArea.y1, this.chart.plotArea.width, this.chart.plotArea.height);
		this.chart._breaksCanvasCtx.clip();
		this.chart._breaksCanvasCtx.drawImage(this.maskCanvas, 0, 0, this.chart.width, this.chart.height);
		this.chart._breaksCanvasCtx.restore();
	}

	Axis.prototype.createMask = function () {
		if (!(this.scaleBreaks && this.scaleBreaks._appliedBreaks.length > 0))
			return;
		var appliedBreaks = this.scaleBreaks._appliedBreaks;

		if (isCanvasSupported) {
			this.maskCanvas = createCanvas(this.chart.width, this.chart.height);
			this.maskCtx = this.maskCanvas.getContext("2d");
		}
		else {
			this.maskCanvas = this.chart.plotArea.canvas;
			this.maskCtx = this.chart.plotArea.ctx;
		}

		this.maskCtx.save();
		this.maskCtx.beginPath();
		this.maskCtx.rect(this.chart.plotArea.x1, this.chart.plotArea.y1, this.chart.plotArea.width, this.chart.plotArea.height);
		this.maskCtx.clip();

		for (var i = 0; i < appliedBreaks.length; i++) {
			//Should be skipped only if break is outside completely.
			if (appliedBreaks[i].endValue < this.viewportMinimum || appliedBreaks[i].startValue > this.viewportMaximum || isNaN(this.range))
				continue;

			appliedBreaks[i].render(this.maskCtx);
		}
		this.maskCtx.restore();

	}

	Axis.prototype.renderCrosshair = function (mouseX, mouseY) {
		this.crosshair.render(mouseX, mouseY);
	}

	Axis.prototype.renderGrid = function () {

		if (!(this.gridThickness && this.gridThickness > 0))
			return;

		//var ctx = this.chart.plotArea.ctx;
		var ctx = this.chart.ctx;
		ctx.save();

		var xy;
		var plotAreaCoordinates = this.chart.plotArea;
		var stripLine;
		var tempLineWidth, tempStrokeStyle;

		ctx.lineWidth = this.gridThickness;
		ctx.strokeStyle = this.gridColor;

		if (ctx.setLineDash) {
			ctx.setLineDash(getLineDashArray(this.gridDashType, this.gridThickness));
		}


		if (this._position === "bottom" || this._position === "top") {

			for (i = 0; i < this._labels.length; i++) {

				if (this._labels[i].position < this.viewportMinimum || this._labels[i].position > this.viewportMaximum || this._labels[i].breaksLabelType)
					continue;

				ctx.beginPath();

				xy = this.getPixelCoordinatesOnAxis(this._labels[i].position);

				var gridX = (ctx.lineWidth % 2 === 1) ? (xy.x << 0) + .5 : (xy.x << 0);

				ctx.moveTo(gridX, plotAreaCoordinates.y1 << 0);
				ctx.lineTo(gridX, plotAreaCoordinates.y2 << 0);

				ctx.stroke();
			}

		}
		else if (this._position === "left" || this._position === "right") {

			for (var i = 0; i < this._labels.length; i++) {

				//if (i === 0 && this.type === "axisY" && this.chart.axisX && this.chart.axisX.lineThickness && this._labels[i].position === this.viewportMinimum)
				//	continue;

				if (this._labels[i].position < this.viewportMinimum || this._labels[i].position > this.viewportMaximum || this._labels[i].breaksLabelType)
					continue;

				ctx.beginPath();

				xy = this.getPixelCoordinatesOnAxis(this._labels[i].position);

				var gridY = (ctx.lineWidth % 2 === 1) ? (xy.y << 0) + .5 : (xy.y << 0);

				ctx.moveTo(plotAreaCoordinates.x1 << 0, gridY);
				ctx.lineTo(plotAreaCoordinates.x2 << 0, gridY);

				ctx.stroke();
			}

		}

		ctx.restore();
	}

	Axis.prototype.renderAxisLine = function () {
		var targetCtx = this.chart.ctx;
		var ctx = isCanvasSupported ? this.chart._preRenderCtx : targetCtx;
		var firstHalfTickThickness = Math.ceil(this.tickThickness / (this.reversed ? -2 : 2)); //position of tick edge1(width wise) taking tick position as refenece
		var secondHalfTickThickness = Math.ceil(this.tickThickness / (this.reversed ? 2 : -2)); //position of tick edge2(width wise) taking tick position as refenece

		var p1, p2;
		ctx.save();

		if (this._position === "bottom" || this._position === "top") {
			if (this.lineThickness) {
				if (this.reversed) {
					p1 = this.lineCoordinates.x2;
					p2 = this.lineCoordinates.x1;
				}
				else {
					p1 = this.lineCoordinates.x1;
					p2 = this.lineCoordinates.x2;
				}
				ctx.lineWidth = this.lineThickness;
				ctx.strokeStyle = this.lineColor ? this.lineColor : "black";

				if (ctx.setLineDash) {
					ctx.setLineDash(getLineDashArray(this.lineDashType, this.lineThickness));
				}

				var lineY = (this.lineThickness % 2 === 1) ? (this.lineCoordinates.y1 << 0) + .5 : (this.lineCoordinates.y1 << 0);

				ctx.beginPath();
				if (this.scaleBreaks && !isNullOrUndefined(this.scaleBreaks.firstBreakIndex)) {
					if (isNullOrUndefined(this.scaleBreaks.lastBreakIndex)) {
						p1 = this.scaleBreaks._appliedBreaks[this.scaleBreaks.firstBreakIndex].endPixel + secondHalfTickThickness;
					}
					else {
						for (var i = this.scaleBreaks.firstBreakIndex; i <= this.scaleBreaks.lastBreakIndex; i++) {
							ctx.moveTo(p1, lineY);
							ctx.lineTo(this.scaleBreaks._appliedBreaks[i].startPixel + firstHalfTickThickness, lineY);
							p1 = this.scaleBreaks._appliedBreaks[i].endPixel + secondHalfTickThickness;
						}
					}
				}
				if (p1) {
					ctx.moveTo(p1, lineY);
					ctx.lineTo(p2, lineY);
				}
				ctx.stroke();
			}

		} else if (this._position === "left" || this._position === "right") {
			if (this.lineThickness) {
				if (this.reversed) {
					p1 = this.lineCoordinates.y1;
					p2 = this.lineCoordinates.y2;
				}
				else {
					p1 = this.lineCoordinates.y2;
					p2 = this.lineCoordinates.y1;
				}

				ctx.lineWidth = this.lineThickness;
				ctx.strokeStyle = this.lineColor;

				if (ctx.setLineDash) {
					ctx.setLineDash(getLineDashArray(this.lineDashType, this.lineThickness));
				}

				var lineX = (this.lineThickness % 2 === 1) ? (this.lineCoordinates.x1 << 0) + .5 : (this.lineCoordinates.x1 << 0);

				ctx.beginPath();
				if (this.scaleBreaks && !isNullOrUndefined(this.scaleBreaks.firstBreakIndex)) {
					if (isNullOrUndefined(this.scaleBreaks.lastBreakIndex)) {
						p1 = this.scaleBreaks._appliedBreaks[this.scaleBreaks.firstBreakIndex].endPixel + firstHalfTickThickness;
					}
					else {
						for (var i = this.scaleBreaks.firstBreakIndex; i <= this.scaleBreaks.lastBreakIndex; i++) {
							ctx.moveTo(lineX, p1);
							ctx.lineTo(lineX, this.scaleBreaks._appliedBreaks[i].startPixel + secondHalfTickThickness);
							p1 = this.scaleBreaks._appliedBreaks[i].endPixel + firstHalfTickThickness;
						}
					}
				}
				if (p1) {
					ctx.moveTo(lineX, p1);
					ctx.lineTo(lineX, p2);
				}
				ctx.stroke();
			}
		}

		if (isCanvasSupported) {
			targetCtx.drawImage(this.chart._preRenderCanvas, 0, 0, this.chart.width, this.chart.height);
			if (this.chart._breaksCanvasCtx)
				this.chart._breaksCanvasCtx.drawImage(this.chart._preRenderCanvas, 0, 0, this.chart.width, this.chart.height);
			ctx.clearRect(0, 0, this.chart.width, this.chart.height);
		}
		ctx.restore();
	}

	Axis.prototype.getPixelCoordinatesOnAxis = function (value) {
		var xy = {
		};

		if (this._position === "bottom" || this._position === "top") {
			var pixelPerUnit = this.conversionParameters.pixelPerUnit;

			xy.x = this.convertValueToPixel(value);
			xy.y = this.lineCoordinates.y1;
		}
		if (this._position === "left" || this._position === "right") {
			var pixelPerUnit = -this.conversionParameters.pixelPerUnit;

			xy.y = this.convertValueToPixel(value);
			xy.x = this.lineCoordinates.x2;
		}

		return xy;
	}

	Axis.prototype.convertPixelToValue = function (pixel) {
		if (typeof (pixel) === "undefined")
			return null;

		var value = 0;
		var p = 0;
		var breakIndex, valueAboveViewportMin, valueHeight;
		//var breakedPixel = 0;
		var isFirstBreak = true;
		var appliedBreaks = !this.scaleBreaks ? [] : this.scaleBreaks._appliedBreaks;

		if (typeof (pixel) === "number")
			p = pixel;
		else
			p = (this._position === "left" || this._position === "right") ? pixel.y : pixel.x;

		if (this.logarithmic) {
			valueAboveViewportMin = valueHeight = Math.pow(this.logarithmBase, (p - this.conversionParameters.reference) / this.conversionParameters.pixelPerUnit);
			if ((p <= this.conversionParameters.reference === (this._position === "left" || this._position === "right")) !== this.reversed)
				for (breakIndex = 0; breakIndex < appliedBreaks.length; breakIndex++) {
					if (appliedBreaks[breakIndex].endValue < this.conversionParameters.minimum)
						continue;
					if (isFirstBreak) {
						if (appliedBreaks[breakIndex].startValue < this.conversionParameters.minimum) {
							if (appliedBreaks[breakIndex].size > 1 && (this.conversionParameters.minimum * Math.pow(appliedBreaks[breakIndex].endValue / appliedBreaks[breakIndex].startValue, Math.log(valueHeight) / Math.log(appliedBreaks[breakIndex].size)) < appliedBreaks[breakIndex].endValue)) {
								valueAboveViewportMin = Math.pow(appliedBreaks[breakIndex].endValue / appliedBreaks[breakIndex].startValue, Math.log(valueHeight) / Math.log(appliedBreaks[breakIndex].size));
								break;
							}
							else {
								valueAboveViewportMin *= appliedBreaks[breakIndex].endValue / this.conversionParameters.minimum / Math.pow(appliedBreaks[breakIndex].size, Math.log(appliedBreaks[breakIndex].endValue / this.conversionParameters.minimum) / Math.log(appliedBreaks[breakIndex].endValue / appliedBreaks[breakIndex].startValue));
								valueHeight /= Math.pow(appliedBreaks[breakIndex].size, Math.log(appliedBreaks[breakIndex].endValue / this.conversionParameters.minimum) / Math.log(appliedBreaks[breakIndex].endValue / appliedBreaks[breakIndex].startValue));
							}
							isFirstBreak = false;
						}
						else {
							if (valueHeight > appliedBreaks[breakIndex].startValue / this.conversionParameters.minimum) {
								valueHeight /= appliedBreaks[breakIndex].startValue / this.conversionParameters.minimum;
								if (valueHeight < appliedBreaks[breakIndex].size) {
									valueAboveViewportMin *= Math.pow((appliedBreaks[breakIndex].endValue / appliedBreaks[breakIndex].startValue), (appliedBreaks[breakIndex].size === 1 ? 1 : Math.log(valueHeight) / Math.log(appliedBreaks[breakIndex].size))) / valueHeight;
									break;
								}
								else
									valueAboveViewportMin *= appliedBreaks[breakIndex].endValue / appliedBreaks[breakIndex].startValue / appliedBreaks[breakIndex].size;
								valueHeight /= appliedBreaks[breakIndex].size;
								isFirstBreak = false;
							}
							else
								break;
						}
					} else {
						if (valueHeight > appliedBreaks[breakIndex].startValue / appliedBreaks[breakIndex - 1].endValue) {
							valueHeight /= appliedBreaks[breakIndex].startValue / appliedBreaks[breakIndex - 1].endValue;
							if (valueHeight < appliedBreaks[breakIndex].size) {
								valueAboveViewportMin *= Math.pow((appliedBreaks[breakIndex].endValue / appliedBreaks[breakIndex].startValue), (appliedBreaks[breakIndex].size === 1 ? 1 : Math.log(valueHeight) / Math.log(appliedBreaks[breakIndex].size))) / valueHeight;
								break;
							}
							else
								valueAboveViewportMin *= appliedBreaks[breakIndex].endValue / appliedBreaks[breakIndex].startValue / appliedBreaks[breakIndex].size;
							valueHeight /= appliedBreaks[breakIndex].size;
						}
						else
							break;
					}
				}
			else
				for (breakIndex = appliedBreaks.length - 1; breakIndex >= 0; breakIndex--) {
					if (appliedBreaks[breakIndex].startValue > this.conversionParameters.minimum)
						continue;
					if (isFirstBreak) {
						if (appliedBreaks[breakIndex].endValue > this.conversionParameters.minimum) {
							if (appliedBreaks[breakIndex].size > 1 && ((this.conversionParameters.minimum * Math.pow((appliedBreaks[breakIndex].endValue / appliedBreaks[breakIndex].startValue), Math.log(valueHeight) / Math.log(appliedBreaks[breakIndex].size))) > appliedBreaks[breakIndex].startValue)) {
								valueAboveViewportMin = Math.pow(appliedBreaks[breakIndex].endValue / appliedBreaks[breakIndex].startValue, Math.log(valueHeight) / Math.log(appliedBreaks[breakIndex].size));
								break;
							}
							else {
								valueAboveViewportMin *= (appliedBreaks[breakIndex].startValue / this.conversionParameters.minimum) * Math.pow(appliedBreaks[breakIndex].size, Math.log(appliedBreaks[breakIndex].startValue / this.conversionParameters.minimum) / Math.log(appliedBreaks[breakIndex].endValue / appliedBreaks[breakIndex].startValue)) * valueHeight;
								valueHeight *= Math.pow(appliedBreaks[breakIndex].size, Math.log(this.conversionParameters.minimum / appliedBreaks[breakIndex].startValue) / Math.log(appliedBreaks[breakIndex].endValue / appliedBreaks[breakIndex].startValue));
							}
							isFirstBreak = false;
						}
						else {
							if (valueHeight < appliedBreaks[breakIndex].endValue / this.conversionParameters.minimum) {
								valueHeight /= appliedBreaks[breakIndex].endValue / this.conversionParameters.minimum;
								if (valueHeight > 1 / appliedBreaks[breakIndex].size) {
									valueAboveViewportMin *= Math.pow(appliedBreaks[breakIndex].endValue / appliedBreaks[breakIndex].startValue, appliedBreaks[breakIndex].size <= 1 ? 1 : Math.log(valueHeight) / Math.log(appliedBreaks[breakIndex].size)) * valueHeight;
									break;
								}
								else
									valueAboveViewportMin /= appliedBreaks[breakIndex].endValue / appliedBreaks[breakIndex].startValue / appliedBreaks[breakIndex].size;
								valueHeight *= appliedBreaks[breakIndex].size;
								isFirstBreak = false;
							}
							else
								break;
						}
					} else {
						if (valueHeight < appliedBreaks[breakIndex].endValue / appliedBreaks[breakIndex + 1].startValue) {
							valueHeight /= appliedBreaks[breakIndex].endValue / appliedBreaks[breakIndex + 1].startValue;
							if (valueHeight > 1 / appliedBreaks[breakIndex].size) {
								valueAboveViewportMin *= Math.pow(appliedBreaks[breakIndex].endValue / appliedBreaks[breakIndex].startValue, appliedBreaks[breakIndex].size <= 1 ? 1 : Math.log(valueHeight) / Math.log(appliedBreaks[breakIndex].size)) * valueHeight;
								break;
							}
							else
								valueAboveViewportMin /= appliedBreaks[breakIndex].endValue / appliedBreaks[breakIndex].startValue / appliedBreaks[breakIndex].size;
							valueHeight *= appliedBreaks[breakIndex].size;
						}
						else
							break;
					}
				}

			value = valueAboveViewportMin * this.viewportMinimum;
		}
		else {
			var valueAboveViewportMin = valueHeight = (p - this.conversionParameters.reference) / this.conversionParameters.pixelPerUnit;
			if ((p <= this.conversionParameters.reference === (this._position === "left" || this._position === "right")) !== this.reversed)
				for (breakIndex = 0; breakIndex < appliedBreaks.length; breakIndex++) {
					if (appliedBreaks[breakIndex].endValue < this.conversionParameters.minimum)
						continue;
					if (isFirstBreak) {
						if (appliedBreaks[breakIndex].startValue < this.conversionParameters.minimum) {
							if (appliedBreaks[breakIndex].size && (this.conversionParameters.minimum + valueHeight * (appliedBreaks[breakIndex].endValue - appliedBreaks[breakIndex].startValue) / appliedBreaks[breakIndex].size < appliedBreaks[breakIndex].endValue)) {
								valueAboveViewportMin = appliedBreaks[breakIndex].size <= 0 ? 0 : valueHeight * (appliedBreaks[breakIndex].endValue - appliedBreaks[breakIndex].startValue) / appliedBreaks[breakIndex].size;
								break;
							}
							else {
								valueAboveViewportMin += appliedBreaks[breakIndex].endValue - this.conversionParameters.minimum - appliedBreaks[breakIndex].size * (appliedBreaks[breakIndex].endValue - this.conversionParameters.minimum) / (appliedBreaks[breakIndex].endValue - appliedBreaks[breakIndex].startValue);
								valueHeight -= appliedBreaks[breakIndex].size * (appliedBreaks[breakIndex].endValue - this.conversionParameters.minimum) / (appliedBreaks[breakIndex].endValue - appliedBreaks[breakIndex].startValue);
							}
							isFirstBreak = false;
						}
						else {
							if (valueHeight > appliedBreaks[breakIndex].startValue - this.conversionParameters.minimum) {
								valueHeight -= appliedBreaks[breakIndex].startValue - this.conversionParameters.minimum;
								if (valueHeight < appliedBreaks[breakIndex].size) {
									valueAboveViewportMin += (appliedBreaks[breakIndex].endValue - appliedBreaks[breakIndex].startValue) * (appliedBreaks[breakIndex].size === 0 ? 1 : valueHeight / appliedBreaks[breakIndex].size) - valueHeight;
									break;
								}
								else
									valueAboveViewportMin += appliedBreaks[breakIndex].endValue - appliedBreaks[breakIndex].startValue - appliedBreaks[breakIndex].size;
								valueHeight -= appliedBreaks[breakIndex].size;
								isFirstBreak = false;
							}
							else
								break;
						}
					} else {
						if (valueHeight > appliedBreaks[breakIndex].startValue - appliedBreaks[breakIndex - 1].endValue) {
							valueHeight -= appliedBreaks[breakIndex].startValue - appliedBreaks[breakIndex - 1].endValue;
							if (valueHeight < appliedBreaks[breakIndex].size) {
								valueAboveViewportMin += (appliedBreaks[breakIndex].endValue - appliedBreaks[breakIndex].startValue) * (appliedBreaks[breakIndex].size === 0 ? 1 : valueHeight / appliedBreaks[breakIndex].size) - valueHeight;
								break;
							}
							else
								valueAboveViewportMin += appliedBreaks[breakIndex].endValue - appliedBreaks[breakIndex].startValue - appliedBreaks[breakIndex].size;
							valueHeight -= appliedBreaks[breakIndex].size;
						}
						else
							break;
					}
				}
			else
				for (breakIndex = appliedBreaks.length - 1; breakIndex >= 0; breakIndex--) {
					if (appliedBreaks[breakIndex].startValue > this.conversionParameters.minimum)
						continue;
					if (isFirstBreak) {
						if (appliedBreaks[breakIndex].endValue > this.conversionParameters.minimum) {
							if (appliedBreaks[breakIndex].size && ((this.conversionParameters.minimum + valueHeight * (appliedBreaks[breakIndex].endValue - appliedBreaks[breakIndex].startValue) / appliedBreaks[breakIndex].size) > appliedBreaks[breakIndex].startValue)) {
								valueAboveViewportMin = appliedBreaks[breakIndex].size <= 0 ? 0 : valueHeight * (appliedBreaks[breakIndex].endValue - appliedBreaks[breakIndex].startValue) / appliedBreaks[breakIndex].size;
								break;
							}
							else {
								valueAboveViewportMin += (appliedBreaks[breakIndex].startValue - this.conversionParameters.minimum) + appliedBreaks[breakIndex].size * (this.conversionParameters.minimum - appliedBreaks[breakIndex].startValue) / (appliedBreaks[breakIndex].endValue - appliedBreaks[breakIndex].startValue);
								valueHeight += appliedBreaks[breakIndex].size * (this.conversionParameters.minimum - appliedBreaks[breakIndex].startValue) / (appliedBreaks[breakIndex].endValue - appliedBreaks[breakIndex].startValue);
								isFirstBreak = false;
							}
						}
						else {
							if (valueHeight < appliedBreaks[breakIndex].endValue - this.conversionParameters.minimum) {
								valueHeight -= appliedBreaks[breakIndex].endValue - this.conversionParameters.minimum;
								if (valueHeight > -1 * appliedBreaks[breakIndex].size) {
									valueAboveViewportMin += (appliedBreaks[breakIndex].endValue - appliedBreaks[breakIndex].startValue) * (appliedBreaks[breakIndex].size === 0 ? 1 : valueHeight / appliedBreaks[breakIndex].size) + valueHeight;
									break;
								}
								else
									valueAboveViewportMin -= appliedBreaks[breakIndex].endValue - appliedBreaks[breakIndex].startValue - appliedBreaks[breakIndex].size;
								valueHeight += appliedBreaks[breakIndex].size;
								isFirstBreak = false;
							}
							else
								break;
						}
					} else {
						if (valueHeight < appliedBreaks[breakIndex].endValue - appliedBreaks[breakIndex + 1].startValue) {
							valueHeight -= appliedBreaks[breakIndex].endValue - appliedBreaks[breakIndex + 1].startValue;
							if (valueHeight > -1 * appliedBreaks[breakIndex].size) {
								valueAboveViewportMin += (appliedBreaks[breakIndex].endValue - appliedBreaks[breakIndex].startValue) * (appliedBreaks[breakIndex].size === 0 ? 1 : valueHeight / appliedBreaks[breakIndex].size) + valueHeight;
								break;
							}
							else
								valueAboveViewportMin -= appliedBreaks[breakIndex].endValue - appliedBreaks[breakIndex].startValue - appliedBreaks[breakIndex].size;
							valueHeight += appliedBreaks[breakIndex].size;
						}
						else
							break;
					}
				}

			value = this.conversionParameters.minimum + valueAboveViewportMin;
		}
		return value;
	}

	Axis.prototype.convertValueToPixel = function (value) {

		var pixel;
		var mappedValue = this.getApparentDifference(this.conversionParameters.minimum, value, value);

		if (this.logarithmic)
			pixel = (this.conversionParameters.reference + this.conversionParameters.pixelPerUnit * Math.log(mappedValue / this.conversionParameters.minimum) / this.conversionParameters.lnLogarithmBase + .5) << 0;
		else
			pixel = (this.conversionParameters.reference + this.conversionParameters.pixelPerUnit * (mappedValue - this.conversionParameters.minimum) + .5) << 0;
		return pixel;
	}

	//Calculates and returns apparant difference after considering the space freed by breaks if there are any
	Axis.prototype.getApparentDifference = function (val1, val2, diff, skipIfInside) {
		var appliedBreaks = !this.scaleBreaks ? [] : this.scaleBreaks._appliedBreaks;

		if (this.logarithmic) {

			var valueDiff = isNullOrUndefined(diff) ? val2 / val1 : diff;
			for (var j = 0; j < appliedBreaks.length; j++) {
				if (val2 < appliedBreaks[j].startValue)
					break;
				if (val1 > appliedBreaks[j].endValue)
					continue;

				if (val1 <= appliedBreaks[j].startValue && val2 >= appliedBreaks[j].endValue)
					valueDiff = valueDiff / appliedBreaks[j].endValue * appliedBreaks[j].startValue * appliedBreaks[j].size;
				else if (val1 >= appliedBreaks[j].startValue && val2 >= appliedBreaks[j].endValue)
					valueDiff = valueDiff / appliedBreaks[j].endValue * val1 * Math.pow(appliedBreaks[j].size, Math.log(appliedBreaks[j].endValue / val1) / Math.log(appliedBreaks[j].endValue / appliedBreaks[j].startValue));
				else if (val1 <= appliedBreaks[j].startValue && val2 <= appliedBreaks[j].endValue)
					valueDiff = valueDiff / val2 * appliedBreaks[j].startValue * Math.pow(appliedBreaks[j].size, Math.log(val2 / appliedBreaks[j].startValue) / Math.log(appliedBreaks[j].endValue / appliedBreaks[j].startValue));
				else if (!skipIfInside && val1 > appliedBreaks[j].startValue && val2 < appliedBreaks[j].endValue)
					valueDiff = val1 * Math.pow(appliedBreaks[j].size, Math.log(val2 / val1) / Math.log(appliedBreaks[j].endValue / appliedBreaks[j].startValue));
			}
		}
		else {

			var valueDiff = isNullOrUndefined(diff) ? Math.abs(val2 - val1) : diff;
			for (var j = 0; j < appliedBreaks.length; j++) {
				if (val2 < appliedBreaks[j].startValue)
					break;
				if (val1 > appliedBreaks[j].endValue)
					continue;

				if (val1 <= appliedBreaks[j].startValue && val2 >= appliedBreaks[j].endValue)
					valueDiff = valueDiff - appliedBreaks[j].endValue + appliedBreaks[j].startValue + appliedBreaks[j].size;
				else if (val1 > appliedBreaks[j].startValue && val2 >= appliedBreaks[j].endValue) {
					valueDiff = valueDiff - appliedBreaks[j].endValue + val1 + appliedBreaks[j].size * (appliedBreaks[j].endValue - val1) / (appliedBreaks[j].endValue - appliedBreaks[j].startValue);
				}
				else if (val1 <= appliedBreaks[j].startValue && val2 < appliedBreaks[j].endValue)
					valueDiff = valueDiff - val2 + appliedBreaks[j].startValue + appliedBreaks[j].size * (val2 - appliedBreaks[j].startValue) / (appliedBreaks[j].endValue - appliedBreaks[j].startValue);
				else if (!skipIfInside && val1 > appliedBreaks[j].startValue && val2 < appliedBreaks[j].endValue)
					valueDiff = val1 + appliedBreaks[j].size * (val2 - val1) / (appliedBreaks[j].endValue - appliedBreaks[j].startValue);
			}
		}
		return valueDiff;
	}

	Axis.prototype.setViewPortRange = function (viewportMinimum, viewportMaximum) {

		this.sessionVariables.newViewportMinimum = this.viewportMinimum = Math.min(viewportMinimum, viewportMaximum);
		this.sessionVariables.newViewportMaximum = this.viewportMaximum = Math.max(viewportMinimum, viewportMaximum);

	}

	Axis.prototype.getXValueAt = function (pixel) {
		if (!pixel)
			return null;

		var xval = null;

		if (this._position === "left") {
			xval = this.convertPixelToValue(pixel.y);
		}
		else if (this._position === "bottom") {
			xval = this.convertPixelToValue(pixel.x);
		}

		return xval;
	}

	Axis.prototype.calculateValueToPixelConversionParameters = function (value) {
		var appliedBreaks = !this.scaleBreaks ? [] : this.scaleBreaks._appliedBreaks;

		var conversionParameters = {
			pixelPerUnit: null, minimum: null, reference: null
		};

		var width = this.lineCoordinates.width;
		var height = this.lineCoordinates.height;
		var length = (this._position === "bottom" || this._position === "top") ? width : height;

		var range = Math.abs(this.range);

		if (this.logarithmic) {
			for (var i = 0; i < appliedBreaks.length; i++) {
				if (this.viewportMaximum < appliedBreaks[i].startValue)
					break;
				if (this.viewportMinimum > appliedBreaks[i].endValue)
					continue;

				if (this.viewportMinimum >= appliedBreaks[i].startValue && this.viewportMaximum <= appliedBreaks[i].endValue)
					length = 0;
				else if (this.viewportMinimum <= appliedBreaks[i].startValue && this.viewportMaximum >= appliedBreaks[i].endValue) {
					range = range / appliedBreaks[i].endValue * appliedBreaks[i].startValue;
					if (appliedBreaks[i].spacing.toString().indexOf("%") > 0)
						length *= (1 - parseFloat(appliedBreaks[i].spacing) / 100);
					else
						length -= Math.min(appliedBreaks[i].spacing, .1 * length);
				}
				else if (this.viewportMinimum > appliedBreaks[i].startValue && this.viewportMaximum >= appliedBreaks[i].endValue) {
					range = range / appliedBreaks[i].endValue * this.viewportMinimum;
					if (appliedBreaks[i].spacing.toString().indexOf("%") > 0)
						length *= (1 - parseFloat(appliedBreaks[i].spacing) / 100 * Math.log(appliedBreaks[i].endValue / this.viewportMinimum) / Math.log(appliedBreaks[i].endValue / appliedBreaks[i].startValue));
					else
						length -= Math.min(appliedBreaks[i].spacing, .1 * length) * Math.log(appliedBreaks[i].endValue / this.viewportMinimum) / Math.log(appliedBreaks[i].endValue / appliedBreaks[i].startValue);
				}
				else if (this.viewportMinimum <= appliedBreaks[i].startValue && this.viewportMaximum < appliedBreaks[i].endValue) {
					range = range / this.viewportMaximum * appliedBreaks[i].startValue;
					if (appliedBreaks[i].spacing.toString().indexOf("%") > 0)
						length *= (1 - parseFloat(appliedBreaks[i].spacing) / 100 * Math.log(this.viewportMaximum / appliedBreaks[i].startValue) / Math.log(appliedBreaks[i].endValue / appliedBreaks[i].startValue));
					else
						length -= Math.min(appliedBreaks[i].spacing, .1 * length) * Math.log(this.viewportMaximum / appliedBreaks[i].startValue) / Math.log(appliedBreaks[i].endValue / appliedBreaks[i].startValue);
				}
			}
		}
		else {
			for (var i = 0; i < appliedBreaks.length; i++) {
				if (this.viewportMaximum < appliedBreaks[i].startValue)
					break;
				if (this.viewportMinimum > appliedBreaks[i].endValue)
					continue;

				if (this.viewportMinimum >= appliedBreaks[i].startValue && this.viewportMaximum <= appliedBreaks[i].endValue)
					length = 0;
				else if (this.viewportMinimum <= appliedBreaks[i].startValue && this.viewportMaximum >= appliedBreaks[i].endValue) {
					range = range - appliedBreaks[i].endValue + appliedBreaks[i].startValue;
					if (appliedBreaks[i].spacing.toString().indexOf("%") > 0)
						length *= (1 - parseFloat(appliedBreaks[i].spacing) / 100);
					else
						length -= Math.min(appliedBreaks[i].spacing, .1 * length);
				}
				else if (this.viewportMinimum > appliedBreaks[i].startValue && this.viewportMaximum >= appliedBreaks[i].endValue) {
					range = range - appliedBreaks[i].endValue + this.viewportMinimum;
					if (appliedBreaks[i].spacing.toString().indexOf("%") > 0)
						length *= (1 - parseFloat(appliedBreaks[i].spacing) / 100 * (appliedBreaks[i].endValue - this.viewportMinimum) / (appliedBreaks[i].endValue - appliedBreaks[i].startValue));
					else
						length -= Math.min(appliedBreaks[i].spacing, .1 * length) * (appliedBreaks[i].endValue - this.viewportMinimum) / (appliedBreaks[i].endValue - appliedBreaks[i].startValue);
				}
				else if (this.viewportMinimum <= appliedBreaks[i].startValue && this.viewportMaximum < appliedBreaks[i].endValue) {
					range = range - this.viewportMaximum + appliedBreaks[i].startValue;
					if (appliedBreaks[i].spacing.toString().indexOf("%") > 0)
						length *= (1 - parseFloat(appliedBreaks[i].spacing) / 100 * (this.viewportMaximum - appliedBreaks[i].startValue) / (appliedBreaks[i].endValue - appliedBreaks[i].startValue));
					else
						length -= Math.min(appliedBreaks[i].spacing, .1 * length) * (this.viewportMaximum - appliedBreaks[i].startValue) / (appliedBreaks[i].endValue - appliedBreaks[i].startValue);
				}
			}
		}


		conversionParameters.minimum = this.viewportMinimum;
		conversionParameters.maximum = this.viewportMaximum;
		conversionParameters.range = range;

		if (this._position === "bottom" || this._position === "top") {
			if (this.logarithmic) {
				conversionParameters.lnLogarithmBase = Math.log(this.logarithmBase);
				conversionParameters.pixelPerUnit = (this.reversed ? -1 : 1) * length * conversionParameters.lnLogarithmBase / Math.log(Math.abs(range));
			}
			else
				conversionParameters.pixelPerUnit = (this.reversed ? -1 : 1) * length / Math.abs(range);
			conversionParameters.reference = (this.reversed ? this.lineCoordinates.x2 : this.lineCoordinates.x1);
		}

		if (this._position === "left" || this._position === "right") {
			if (this.logarithmic) {
				conversionParameters.lnLogarithmBase = Math.log(this.logarithmBase);
				conversionParameters.pixelPerUnit = (this.reversed ? 1 : -1) * length * conversionParameters.lnLogarithmBase / Math.log(Math.abs(range));
			}
			else
				conversionParameters.pixelPerUnit = (this.reversed ? 1 : -1) * length / Math.abs(range);
			conversionParameters.reference = (this.reversed ? this.lineCoordinates.y1 : this.lineCoordinates.y2);
		}


		this.conversionParameters = conversionParameters;
	}

	Axis.prototype.calculateAxisParameters = function () {

		if (this.logarithmic) {
			this.calculateLogarithmicAxisParameters();
			return;
		}

		var freeSpace = this.chart.layoutManager.getFreeSpace();
		var availableWidth = 0;
		var availableHeight = 0;
		var isLessThanTwoDataPoints = false;
		var isDateTime = false;

		if (this._position === "bottom" || this._position === "top") {
			this.maxWidth = freeSpace.width;
			this.maxHeight = freeSpace.height;
		} else {
			this.maxWidth = freeSpace.height;
			this.maxHeight = freeSpace.width;
		}

		var pixelsPerInterval = this.type === "axisX" ? (this.chart.plotInfo.axisPlacement === "xySwapped" ? 62 : 70) : (this.chart.plotInfo.axisPlacement === "xySwapped" ? 50 : 40);
		var minTicks = 4;

		if (this.type === "axisX") {
			if (this.maxWidth < 600)
				minTicks = 8;
			else
				minTicks = 6;
		}

		var noTicks = Math.max(minTicks, Math.floor(this.maxWidth / pixelsPerInterval));


		var min, max;
		var minDiff;
		var range;
		var rangePadding = 0;

		if (!isNullOrUndefined(this.options.viewportMinimum) && !isNullOrUndefined(this.options.viewportMaximum) && this.options.viewportMinimum >= this.options.viewportMaximum)
			this.viewportMinimum = this.viewportMaximum = null;

		if (isNullOrUndefined(this.options.viewportMinimum) && !isNullOrUndefined(this.sessionVariables.newViewportMinimum) && !isNaN(this.sessionVariables.newViewportMinimum))
			this.viewportMinimum = this.sessionVariables.newViewportMinimum;
		else if (this.viewportMinimum === null || isNaN(this.viewportMinimum))
			this.viewportMinimum = this.minimum;

		if (isNullOrUndefined(this.options.viewportMaximum) && !isNullOrUndefined(this.sessionVariables.newViewportMaximum) && !isNaN(this.sessionVariables.newViewportMaximum))
			this.viewportMaximum = this.sessionVariables.newViewportMaximum;
		else if (this.viewportMaximum === null || isNaN(this.viewportMaximum))
			this.viewportMaximum = this.maximum;

		if (this.scaleBreaks)
			for (var i = 0; i < this.scaleBreaks._appliedBreaks.length; i++) {
				if ((!isNullOrUndefined(this.sessionVariables.newViewportMinimum) && this.sessionVariables.newViewportMinimum >= this.scaleBreaks._appliedBreaks[i].startValue || !isNullOrUndefined(this.options.minimum) && this.options.minimum >= this.scaleBreaks._appliedBreaks[i].startValue || !isNullOrUndefined(this.options.viewportMinimum) && this.viewportMinimum >= this.scaleBreaks._appliedBreaks[i].startValue) && (!isNullOrUndefined(this.sessionVariables.newViewportMaximum) && this.sessionVariables.newViewportMaximum <= this.scaleBreaks._appliedBreaks[i].endValue || !isNullOrUndefined(this.options.maximum) && this.options.maximum <= this.scaleBreaks._appliedBreaks[i].endValue || !isNullOrUndefined(this.options.viewportMaximum) && this.viewportMaximum <= this.scaleBreaks._appliedBreaks[i].endValue)) {
					this.scaleBreaks._appliedBreaks.splice(i, 1);
					break;
				}
			}

		if (this.type === "axisX") {
			if (this.dataSeries && this.dataSeries.length > 0) {
				for (var k = 0; k < this.dataSeries.length; k++) {
					if (this.dataSeries[k].xValueType === "dateTime")
						isDateTime = true;
				}
			}

			min = (this.viewportMinimum !== null) ? this.viewportMinimum : this.dataInfo.viewPortMin;
			max = (this.viewportMaximum !== null) ? this.viewportMaximum : this.dataInfo.viewPortMax;

			if (max - min === 0) {
				rangePadding = typeof (this.options.interval) === "undefined" ? .4 : this.options.interval;

				max += rangePadding;
				min -= rangePadding;
			}

			if (this.dataInfo.minDiff !== Infinity)
				minDiff = this.dataInfo.minDiff;
			else if (max - min > 1) {
				minDiff = Math.abs(max - min) * .5;
			}
			else {
				minDiff = 1;

				if (isDateTime)
					isLessThanTwoDataPoints = true;
			}

		} else if (this.type === "axisY") {

			//min = typeof (this.options.viewportMinimum) === "undefined" || this.options.viewportMinimum === null ? this.dataInfo.viewPortMin : this.options.viewportMinimum;
			//max = typeof (this.options.viewportMaximum) === "undefined" || this.options.viewportMaximum === null ? this.dataInfo.viewPortMax : this.options.viewportMaximum;
			min = (this.viewportMinimum !== null) ? this.viewportMinimum : this.dataInfo.viewPortMin;
			max = (this.viewportMaximum !== null) ? this.viewportMaximum : this.dataInfo.viewPortMax;

			if (!isFinite(min) && !isFinite(max)) {
				max = typeof (this.options.interval) === "undefined" ? -Infinity : this.options.interval;
				min = (typeof (this.options.interval) === "undefined" && !isFinite(this.dataInfo.minDiff)) ? Infinity : 0;
			} else if (!isFinite(min)) {
				min = max;
			} else if (!isFinite(max)) {
				max = min;
			}

			if (min === 0 && max === 0) {// When all dataPoints are zero
				max += 9;
				min = 0;
			}
			else if (max - min === 0) {// When there is only a single dataPoint or when all dataPoints have same Y Value
				rangePadding = Math.min(Math.abs(Math.abs(max) * .01), 5);
				max += rangePadding;
				min -= rangePadding;
			}
			else if (min > max) {
				rangePadding = Math.min(Math.abs(this.getApparentDifference(max, min, null, true)) * .01, 5);

				if (max >= 0)
					min = max - rangePadding;
				else
					max = (isFinite(min) ? min + rangePadding : 0);
			}
			else {

				rangePadding = Math.min(Math.abs(this.getApparentDifference(min, max, null, true)) * .01, .05);

				if (max !== 0)
					max += rangePadding;
				if (min !== 0)
					min -= rangePadding;
			}

			if (this.dataInfo.minDiff !== Infinity)
				minDiff = this.dataInfo.minDiff;
			else if (max - min > 1) {
				minDiff = Math.abs(max - min) * .5;
			}
			else {
				minDiff = 1;
			}


			//Apply includeZero
			if (this.includeZero && (this.viewportMinimum === null || isNaN(this.viewportMinimum))) {
				if (min > 0)
					min = 0;
			}

			if (this.includeZero && (this.viewportMaximum === null || isNaN(this.viewportMaximum))) {
				if (max < 0)
					max = 0;
			}
		}

		range = this.getApparentDifference((isNaN(this.viewportMinimum) || this.viewportMinimum === null ? min : this.viewportMinimum), (isNaN(this.viewportMaximum) || this.viewportMaximum === null ? max : this.viewportMaximum), null, true);

		if (this.type === "axisX" && isDateTime) {

			if (!this.intervalType) {

				if (range / (1 * 1) <= noTicks) {
					this.interval = 1;
					this.intervalType = "millisecond";
				} else if (range / (1 * 2) <= noTicks) {
					this.interval = 2;
					this.intervalType = "millisecond";
				} else if (range / (1 * 5) <= noTicks) {
					this.interval = 5;
					this.intervalType = "millisecond";
				} else if (range / (1 * 10) <= noTicks) {
					this.interval = 10;
					this.intervalType = "millisecond";
				} else if (range / (1 * 20) <= noTicks) {
					this.interval = 20;
					this.intervalType = "millisecond";
				} else if (range / (1 * 50) <= noTicks) {
					this.interval = 50;
					this.intervalType = "millisecond";
				} else if (range / (1 * 100) <= noTicks) {
					this.interval = 100;
					this.intervalType = "millisecond";
				} else if (range / (1 * 200) <= noTicks) {
					this.interval = 200;
					this.intervalType = "millisecond";
				} else if (range / (1 * 250) <= noTicks) {
					this.interval = 250;
					this.intervalType = "millisecond";
				} else if (range / (1 * 300) <= noTicks) {
					this.interval = 300;
					this.intervalType = "millisecond";
				} else if (range / (1 * 400) <= noTicks) {
					this.interval = 400;
					this.intervalType = "millisecond";
				} else if (range / (1 * 500) <= noTicks) {
					this.interval = 500;
					this.intervalType = "millisecond";
				} else if (range / (constants.secondDuration * 1) <= noTicks) {
					this.interval = 1;
					this.intervalType = "second";
				} else if (range / (constants.secondDuration * 2) <= noTicks) {
					this.interval = 2;
					this.intervalType = "second";
				} else if (range / (constants.secondDuration * 5) <= noTicks) {
					this.interval = 5;
					this.intervalType = "second";
				} else if (range / (constants.secondDuration * 10) <= noTicks) {
					this.interval = 10;
					this.intervalType = "second";
				} else if (range / (constants.secondDuration * 15) <= noTicks) {
					this.interval = 15;
					this.intervalType = "second";
				} else if (range / (constants.secondDuration * 20) <= noTicks) {
					this.interval = 20;
					this.intervalType = "second";
				} else if (range / (constants.secondDuration * 30) <= noTicks) {
					this.interval = 30;
					this.intervalType = "second";
				} else if (range / (constants.minuteDuration * 1) <= noTicks) {
					this.interval = 1;
					this.intervalType = "minute";
				} else if (range / (constants.minuteDuration * 2) <= noTicks) {
					this.interval = 2;
					this.intervalType = "minute";
				} else if (range / (constants.minuteDuration * 5) <= noTicks) {
					this.interval = 5;
					this.intervalType = "minute";
				} else if (range / (constants.minuteDuration * 10) <= noTicks) {
					this.interval = 10;
					this.intervalType = "minute";
				} else if (range / (constants.minuteDuration * 15) <= noTicks) {
					this.interval = 15;
					this.intervalType = "minute";
				} else if (range / (constants.minuteDuration * 20) <= noTicks) {
					this.interval = 20;
					this.intervalType = "minute";
				} else if (range / (constants.minuteDuration * 30) <= noTicks) {
					this.interval = 30;
					this.intervalType = "minute";
				} else if (range / (constants.hourDuration * 1) <= noTicks) {
					this.interval = 1;
					this.intervalType = "hour";
				} else if (range / (constants.hourDuration * 2) <= noTicks) {
					this.interval = 2;
					this.intervalType = "hour";
				} else if (range / (constants.hourDuration * 3) <= noTicks) {
					this.interval = 3;
					this.intervalType = "hour";
				} else if (range / (constants.hourDuration * 6) <= noTicks) {
					this.interval = 6;
					this.intervalType = "hour";
				} else if (range / (constants.dayDuration * 1) <= noTicks) {
					this.interval = 1;
					this.intervalType = "day";
				} else if (range / (constants.dayDuration * 2) <= noTicks) {
					this.interval = 2;
					this.intervalType = "day";
				} else if (range / (constants.dayDuration * 4) <= noTicks) {
					this.interval = 4;
					this.intervalType = "day";
				} else if (range / (constants.weekDuration * 1) <= noTicks) {
					this.interval = 1;
					this.intervalType = "week";
				} else if (range / (constants.weekDuration * 2) <= noTicks) {
					this.interval = 2;
					this.intervalType = "week";
				} else if (range / (constants.weekDuration * 3) <= noTicks) {
					this.interval = 3;
					this.intervalType = "week";
				} else if (range / (constants.monthDuration * 1) <= noTicks) {
					this.interval = 1;
					this.intervalType = "month";
				} else if (range / (constants.monthDuration * 2) <= noTicks) {
					this.interval = 2;
					this.intervalType = "month";
				} else if (range / (constants.monthDuration * 3) <= noTicks) {
					this.interval = 3;
					this.intervalType = "month";
				} else if (range / (constants.monthDuration * 6) <= noTicks) {
					this.interval = 6;
					this.intervalType = "month";
				} else if (range / (constants.yearDuration * 1) <= noTicks) {
					this.interval = 1;
					this.intervalType = "year";
				} else if (range / (constants.yearDuration * 2) <= noTicks) {
					this.interval = 2;
					this.intervalType = "year";
				} else if (range / (constants.yearDuration * 4) <= noTicks) {
					this.interval = 4;
					this.intervalType = "year";
				} else {
					this.interval = Math.floor(Axis.getNiceNumber(range / (noTicks - 1), true) / constants.yearDuration);
					this.intervalType = "year";
				}

			}

			if (this.viewportMinimum === null || isNaN(this.viewportMinimum))
				this.viewportMinimum = min - minDiff / 2;

			if (this.viewportMaximum === null || isNaN(this.viewportMaximum))
				this.viewportMaximum = max + minDiff / 2;


			if (isLessThanTwoDataPoints) {
				this.autoValueFormatString = "MMM DD YYYY HH:mm";
			} else if (this.intervalType === "year") {
				this.autoValueFormatString = "YYYY";
			} else if (this.intervalType === "month") {
				this.autoValueFormatString = "MMM YYYY";
			} else if (this.intervalType === "week") {
				this.autoValueFormatString = "MMM DD YYYY";
			} else if (this.intervalType === "day") {
				this.autoValueFormatString = "MMM DD YYYY";
			} else if (this.intervalType === "hour") {
				this.autoValueFormatString = "hh:mm TT";
			} else if (this.intervalType === "minute") {
				this.autoValueFormatString = "hh:mm TT";
			} else if (this.intervalType === "second") {
				this.autoValueFormatString = "hh:mm:ss TT";
			} else if (this.intervalType === "millisecond") {
				this.autoValueFormatString = "fff'ms'";
			}

			if (!this.valueFormatString) {
				this.valueFormatString = this.autoValueFormatString;
			}

		} else {

			this.intervalType = "number";

			range = Axis.getNiceNumber(range, false);

			if (this.options && this.options.interval > 0)
				this.interval = this.options.interval;
			else {
				this.interval = Axis.getNiceNumber(range / (noTicks - 1), true);
			}
			//if (this.labelAutoFit) {
			//	this.interval = Axis.getNiceNumber(range / (noTicks - 1), true);
			//	this.interval = this.options.interval ? this.options.interval < this.interval ? this.interval : this.options.interval : this.interval ;
			//}

			if (this.viewportMinimum === null || isNaN(this.viewportMinimum)) {
				if (this.type === "axisX")
					this.viewportMinimum = min - minDiff / 2;
				else
					this.viewportMinimum = Math.floor(min / this.interval) * this.interval;
			}

			if (this.viewportMaximum === null || isNaN(this.viewportMaximum)) {
				if (this.type === "axisX")
					this.viewportMaximum = max + minDiff / 2;
				else
					this.viewportMaximum = Math.ceil(max / this.interval) * this.interval;
			}

			if (this.viewportMaximum === 0 && this.viewportMinimum === 0) {

				if (this.options.viewportMinimum === 0) {
					this.viewportMaximum += 10;
				}
				else if (this.options.viewportMaximum === 0) {
					this.viewportMinimum -= 10;
				}

				if (this.options && typeof (this.options.interval) === "undefined") {
					this.interval = Axis.getNiceNumber((this.viewportMaximum - this.viewportMinimum) / (noTicks - 1), true);
				}
			}
		}

		//Calculate minimum and maximum if not provided by the user
		if (this.minimum === null || this.maximum === null) {
			if (this.type === "axisX") {
				min = (this.minimum !== null) ? this.minimum : this.dataInfo.min;
				max = (this.maximum !== null) ? this.maximum : this.dataInfo.max;

				if (max - min === 0) {
					rangePadding = typeof (this.options.interval) === "undefined" ? .4 : this.options.interval;

					max += rangePadding;
					min -= rangePadding;
				}

				if (this.dataInfo.minDiff !== Infinity)
					minDiff = this.dataInfo.minDiff;
				else if (max - min > 1) {
					minDiff = Math.abs(max - min) * .5;
				}
				else {
					minDiff = 1;
				}

			} else if (this.type === "axisY") {

				min = (this.minimum !== null) ? this.minimum : this.dataInfo.min;
				max = (this.maximum !== null) ? this.maximum : this.dataInfo.max;

				if (!isFinite(min) && !isFinite(max)) {
					max = typeof (this.options.interval) === "undefined" ? -Infinity : this.options.interval;
					min = (typeof (this.options.interval) === "undefined" && !isFinite(this.dataInfo.minDiff)) ? Infinity : 0;
				}
				else
					if (min === 0 && max === 0) {// When all dataPoints are zero
						max += 9;
						min = 0;
					}
					else if (max - min === 0) {// When there is only a single dataPoint or when all dataPoints have same Y Value
						rangePadding = Math.min(Math.abs(Math.abs(max) * .01), 5);
						max += rangePadding;
						min -= rangePadding;
					}
					else if (min > max) {
						rangePadding = Math.min(Math.abs(this.getApparentDifference(max, min, null, true)) * .01, 5);

						if (max >= 0)
							min = max - rangePadding;
						else
							max = (isFinite(min) ? min + rangePadding : 0);
					}
					else {

						rangePadding = Math.min(Math.abs(this.getApparentDifference(min, max, null, true)) * .01, .05);

						if (max !== 0)
							max += rangePadding;
						if (min !== 0)
							min -= rangePadding;
					}

				if (this.dataInfo.minDiff !== Infinity)
					minDiff = this.dataInfo.minDiff;
				else if (max - min > 1) {
					minDiff = Math.abs(max - min) * .5;
				}
				else {
					minDiff = 1;
				}


				//Apply includeZero
				if (this.includeZero && (this.minimum === null || isNaN(this.minimum))) {
					if (min > 0)
						min = 0;
				}

				if (this.includeZero && (this.maximum === null || isNaN(this.maximum))) {
					if (max < 0)
						max = 0;
				}
			}

			range = Math.abs(this.getApparentDifference(min, max, null, true));

			if (this.type === "axisX" && isDateTime) {
				this.valueType = "dateTime";
				if (this.minimum === null || isNaN(this.minimum))
					this.minimum = min - minDiff / 2;

				if (this.maximum === null || isNaN(this.maximum))
					this.maximum = max + minDiff / 2;

			} else {

				this.intervalType = this.valueType = "number";

				if (this.minimum === null) {
					if (this.type === "axisX")
						this.minimum = min - minDiff / 2;
					else
						this.minimum = Math.floor(min / this.interval) * this.interval;

					this.minimum = Math.min(this.minimum, this.sessionVariables.viewportMinimum === null || isNaN(this.sessionVariables.viewportMinimum) ? Infinity : this.sessionVariables.viewportMinimum);
				}

				if (this.maximum === null) {
					if (this.type === "axisX")
						this.maximum = max + minDiff / 2;
					else
						this.maximum = Math.ceil(max / this.interval) * this.interval;

					this.maximum = Math.max(this.maximum, this.sessionVariables.viewportMaximum === null || isNaN(this.sessionVariables.viewportMaximum) ? -Infinity : this.sessionVariables.viewportMaximum);
				}

				//var nfrac = Math.max(-Math.floor(Math.log(d)/Math.LN10), 0); //number of fractional digits to show

				if (this.maximum === 0 && this.minimum === 0) {

					if (this.options.minimum === 0) {
						this.maximum += 10;
					}
					else if (this.options.maximum === 0) {
						this.minimum -= 10;
					}
				}
			}
		}
		if (isNullOrUndefined(this.sessionVariables.newViewportMinimum))
			this.viewportMinimum = Math.max(this.viewportMinimum, this.minimum);
		if (isNullOrUndefined(this.sessionVariables.newViewportMaximum))
			this.viewportMaximum = Math.min(this.viewportMaximum, this.maximum);

		this.range = this.viewportMaximum - this.viewportMinimum;

		if (this.type === "axisX" && isDateTime)
			this.intervalStartPosition = this.getLabelStartPoint(new Date(this.viewportMinimum), this.intervalType, this.interval);
		else
			this.intervalStartPosition = Math.floor((this.viewportMinimum + (this.interval * .2)) / this.interval) * this.interval;

		//Set valueFormatString
		if (!this.valueFormatString) {
			this.valueFormatString = Axis.generateValueFormatString(this.range, 2);
		}

		//if (isDebugMode && window.console) {
		//    window.console.log(this.type + ": Min = " + this.viewportMinimum);
		//    window.console.log(this.type + ": Max = " + this.viewportMaximum);
		//    window.console.log(this.type + ": Interval = " + this.interval);
		//}
	}

	Axis.prototype.calculateLogarithmicAxisParameters = function () {

		var freeSpace = this.chart.layoutManager.getFreeSpace();
		var availableWidth = 0;
		var availableHeight = 0;
		var isLessThanTwoDataPoints = false;
		var lnLogarithmBase = Math.log(this.logarithmBase);
		var linearInterval;

		if (this._position === "bottom" || this._position === "top") {
			this.maxWidth = freeSpace.width;
			this.maxHeight = freeSpace.height;
		} else {
			this.maxWidth = freeSpace.height;
			this.maxHeight = freeSpace.width;
		}

		var noTicks = (this.type === "axisX" ? (this.maxWidth < 500 ? 7 : Math.max(7, Math.floor(this.maxWidth / 100))) : Math.max(Math.floor(this.maxWidth / 50), 3));
		var min, max;
		var minDiff;
		var range;
		var rangePadding = 1;


		if (this.viewportMinimum === null || isNaN(this.viewportMinimum))
			this.viewportMinimum = this.minimum;

		if (this.viewportMaximum === null || isNaN(this.viewportMaximum))
			this.viewportMaximum = this.maximum;

		if (this.scaleBreaks)
			for (var i = 0; i < this.scaleBreaks._appliedBreaks.length; i++) {
				if ((!isNullOrUndefined(this.sessionVariables.newViewportMinimum) && this.sessionVariables.newViewportMinimum >= this.scaleBreaks._appliedBreaks[i].startValue || !isNullOrUndefined(this.options.minimum) && this.options.minimum >= this.scaleBreaks._appliedBreaks[i].startValue || !isNullOrUndefined(this.options.viewportMinimum) && this.viewportMinimum >= this.scaleBreaks._appliedBreaks[i].startValue) && (!isNullOrUndefined(this.sessionVariables.newViewportMaximum) && this.sessionVariables.newViewportMaximum <= this.scaleBreaks._appliedBreaks[i].endValue || !isNullOrUndefined(this.options.maximum) && this.options.maximum <= this.scaleBreaks._appliedBreaks[i].endValue || !isNullOrUndefined(this.options.viewportMaximum) && this.viewportMaximum <= this.scaleBreaks._appliedBreaks[i].endValue)) {
					this.scaleBreaks._appliedBreaks.splice(i, 1);
					break;
				}
			}

		if (this.type === "axisX") {
			min = (this.viewportMinimum !== null) ? this.viewportMinimum : this.dataInfo.viewPortMin;
			max = (this.viewportMaximum !== null) ? this.viewportMaximum : this.dataInfo.viewPortMax;

			if (max / min === 1) {
				rangePadding = Math.pow(this.logarithmBase, typeof (this.options.interval) === "undefined" ? .4 : this.options.interval);

				max *= rangePadding;
				min /= rangePadding;
			}

			if (this.dataInfo.minDiff !== Infinity)
				minDiff = this.dataInfo.minDiff;
			else if (max / min > this.logarithmBase) {
				minDiff = max / min * Math.pow(this.logarithmBase, .5);
			}
			else {
				minDiff = this.logarithmBase;
			}

		} else if (this.type === "axisY") {

			min = (this.viewportMinimum !== null) ? this.viewportMinimum : this.dataInfo.viewPortMin;
			max = (this.viewportMaximum !== null) ? this.viewportMaximum : this.dataInfo.viewPortMax;

			if (min <= 0 && !isFinite(max)) {
				max = typeof (this.options.interval) === "undefined" ? 0 : this.options.interval;
				min = 1;
			} else if (min <= 0) {
				min = max;
			} else if (!isFinite(max)) {
				max = min;
			}

			if (min === 1 && max === 1) {// When all dataPoints are one
				max *= this.logarithmBase - 1 / this.logarithmBase;
				min = 1;
			}
			else if (max / min === 1) {// When there is only a single dataPoint or when all dataPoints have same Y Value
				rangePadding = Math.min(max * Math.pow(this.logarithmBase, .01), Math.pow(this.logarithmBase, 5));
				max *= rangePadding;
				min /= rangePadding;
			}
			else if (min > max) {
				rangePadding = Math.min(min / max * Math.pow(this.logarithmBase, .01), Math.pow(this.logarithmBase, 5));

				if (max >= 1)
					min = max / rangePadding;
				else
					max = min * rangePadding;
			}
			else {

				rangePadding = Math.min(max / min * Math.pow(this.logarithmBase, .01), Math.pow(this.logarithmBase, .04));

				if (max !== 1)
					max *= rangePadding;
				if (min !== 1)
					min /= rangePadding;
			}

			if (this.dataInfo.minDiff !== Infinity)
				minDiff = this.dataInfo.minDiff;
			else if (max / min > this.logarithmBase) {
				minDiff = max / min * Math.pow(this.logarithmBase, .5);
			}
			else {
				minDiff = this.logarithmBase;
			}


			//Apply includeZero
			if (this.includeZero && (this.viewportMinimum === null || isNaN(this.viewportMinimum))) {
				if (min > 1)
					min = 1;
			}

			if (this.includeZero && (this.viewportMaximum === null || isNaN(this.viewportMaximum))) {
				if (max < 1)
					max = 1;
			}
		}

		range = (isNaN(this.viewportMaximum) || this.viewportMaximum === null ? max : this.viewportMaximum) / (isNaN(this.viewportMinimum) || this.viewportMinimum === null ? min : this.viewportMinimum);
		linearRange = (isNaN(this.viewportMaximum) || this.viewportMaximum === null ? max : this.viewportMaximum) - (isNaN(this.viewportMinimum) || this.viewportMinimum === null ? min : this.viewportMinimum);



		this.intervalType = "number";

		range = Math.pow(this.logarithmBase, Axis.getNiceNumber(Math.abs(Math.log(range) / lnLogarithmBase), false));

		if (this.options && this.options.interval > 0)
			this.interval = this.options.interval;
		else {
			this.interval = Axis.getNiceExponent(Math.log(range) / lnLogarithmBase / (noTicks - 1), true);
			linearInterval = Axis.getNiceNumber(linearRange / (noTicks - 1), true);
		}



		if (this.viewportMinimum === null || isNaN(this.viewportMinimum)) {
			if (this.type === "axisX")
				this.viewportMinimum = min / Math.sqrt(minDiff);
			else
				this.viewportMinimum = Math.pow(this.logarithmBase, this.interval * Math.floor(Math.log(min) / lnLogarithmBase / this.interval));
		}

		if (this.viewportMaximum === null || isNaN(this.viewportMaximum)) {
			if (this.type === "axisX")
				this.viewportMaximum = max * Math.sqrt(minDiff);
			else
				this.viewportMaximum = Math.pow(this.logarithmBase, this.interval * Math.ceil(Math.log(max) / lnLogarithmBase / this.interval));
		}

		if (this.viewportMaximum === 1 && this.viewportMinimum === 1) {

			if (this.options.viewportMinimum === 1) {
				this.viewportMaximum *= this.logarithmBase - 1 / this.logarithmBase;
			}
			else if (this.options.viewportMaximum === 1) {
				this.viewportMinimum /= this.logarithmBase - 1 / this.logarithmBase;
			}

			if (this.options && typeof (this.options.interval) === "undefined") {
				this.interval = Axis.getNiceExponent(Math.ceil(Math.log(range) / lnLogarithmBase) / (noTicks - 1));
				linearInterval = Axis.getNiceNumber((this.viewportMaximum - this.viewportMinimum) / (noTicks - 1), true);
			}
		}

		//console.log(this.interval, range, lnLogarithmBase);

		//Calculate minimum and maximum if not provided by the user
		if (this.minimum === null || this.maximum === null) {
			if (this.type === "axisX") {
				min = (this.minimum !== null) ? this.minimum : this.dataInfo.min;
				max = (this.maximum !== null) ? this.maximum : this.dataInfo.max;

				if (max / min === 1) {
					rangePadding = Math.pow(this.logarithmBase, typeof (this.options.interval) === "undefined" ? .4 : this.options.interval);

					max *= rangePadding;
					min /= rangePadding;
				}

				if (this.dataInfo.minDiff !== Infinity)
					minDiff = this.dataInfo.minDiff;
				else if (max / min > this.logarithmBase) {
					minDiff = max / min * Math.pow(this.logarithmBase, .5);
				}
				else {
					minDiff = this.logarithmBase;
				}

			} else if (this.type === "axisY") {

				min = (this.minimum !== null) ? this.minimum : this.dataInfo.min;
				max = (this.maximum !== null) ? this.maximum : this.dataInfo.max;

				if (!isFinite(min) && !isFinite(max)) {
					max = typeof (this.options.interval) === "undefined" ? 0 : this.options.interval;
					min = 1;
				}
				else
					if (min === 1 && max === 1) {// When all dataPoints are one
						max *= this.logarithmBase;
						min /= this.logarithmBase;
					}
					else if (max / min === 1) {// When there is only a single dataPoint or when all dataPoints have same Y Value
						rangePadding = Math.pow(this.logarithmBase, this.interval); //Math.min(max * .01, 5);
						max *= rangePadding;
						min /= rangePadding;
					}
					else if (min > max) {
						rangePadding = Math.min(min / max * .01, 5);

						if (max >= 1)
							min = max / rangePadding;
						else
							max = min * rangePadding;
					}
					else {

						rangePadding = Math.min(max / min * Math.pow(this.logarithmBase, .01), Math.pow(this.logarithmBase, .04));

						if (max !== 1)
							max *= rangePadding;
						if (min !== 1)
							min /= rangePadding;
					}

				if (this.dataInfo.minDiff !== Infinity)
					minDiff = this.dataInfo.minDiff;
				else if (max / min > this.logarithmBase) {
					minDiff = max / min * Math.pow(this.logarithmBase, .5);
				}
				else {
					minDiff = this.logarithmBase;
				}


				//Apply includeZero
				if (this.includeZero && (this.minimum === null || isNaN(this.minimum))) {
					if (min > 1)
						min = 1;
				}

				if (this.includeZero && (this.maximum === null || isNaN(this.maximum))) {
					if (max < 1)
						max = 1;
				}
			}

			range = max / min;



			this.intervalType = "number";

			if (this.minimum === null) {
				if (this.type === "axisX")
					this.minimum = min / Math.sqrt(minDiff);
				else
					this.minimum = Math.pow(this.logarithmBase, this.interval * Math.floor(Math.log(min) / lnLogarithmBase / this.interval));

				this.minimum = Math.min(this.minimum, this.sessionVariables.viewportMinimum === null || isNaN(this.sessionVariables.viewportMinimum) ? typeof this.sessionVariables.newViewportMinimum === "undefined" ? Infinity : this.sessionVariables.newViewportMinimum : this.sessionVariables.viewportMinimum);
			}

			if (this.maximum === null) {
				if (this.type === "axisX")
					this.maximum = max * Math.sqrt(minDiff);
				else
					this.maximum = Math.pow(this.logarithmBase, this.interval * Math.ceil(Math.log(max) / lnLogarithmBase / this.interval));

				this.maximum = Math.max(this.maximum, this.sessionVariables.viewportMaximum === null || isNaN(this.sessionVariables.viewportMaximum) ? typeof this.sessionVariables.newViewportMaximum === "undefined" ? 0 : this.sessionVariables.newViewportMaximum : this.sessionVariables.viewportMaximum);
			}



			if (this.maximum === 1 && this.minimum === 1) {

				if (this.options.minimum === 1) {
					this.maximum *= this.logarithmBase - 1 / this.logarithmBase;
				}
				else if (this.options.maximum === 1) {
					this.minimum /= this.logarithmBase - 1 / this.logarithmBase;
				}
			}

		}

		this.viewportMinimum = Math.max(this.viewportMinimum, this.minimum);
		this.viewportMaximum = Math.min(this.viewportMaximum, this.maximum);

		if (this.viewportMinimum > this.viewportMaximum) {
			if ((this.options.viewportMinimum || this.options.minimum) && !(this.options.viewportMaximum || this.options.maximum))
				this.viewportMaximum = this.maximum = (this.options.viewportMinimum || this.options.minimum);
			else if (!(this.options.viewportMinimum || this.options.minimum) && (this.options.viewportMaximum || this.options.maximum))
				this.viewportMinimum = this.minimum = (this.options.viewportMaximum || this.options.maximum) / Math.pow(this.logarithmBase, 2 * Math.ceil(this.interval));
		}

		var intervalStartPosition = Math.pow(this.logarithmBase, Math.floor(Math.log(this.viewportMinimum) / (lnLogarithmBase * this.interval) + 0.2) * this.interval);
		this.range = this.viewportMaximum / this.viewportMinimum;
		this.noTicks = noTicks;

		if (!this.options.interval && this.range < Math.pow(this.logarithmBase, /*this.type === "axisX" || */this.viewportMaximum < 8 || noTicks < 3 ? 2 : 3)) {

			var linearIntervalStartPosition = Math.floor(this.viewportMinimum / linearInterval + .5) * linearInterval;

			while (linearIntervalStartPosition < this.viewportMinimum) {
				linearIntervalStartPosition += linearInterval;
			}

			this.equidistantInterval = false;
			this.intervalStartPosition = linearIntervalStartPosition;
			this.interval = linearInterval;
		}
		else {
			if (!this.options.interval) {
				var lnInterval = Math.ceil(this.interval);
				if (this.range > this.interval) {
					this.interval = lnInterval;
					intervalStartPosition = Math.pow(this.logarithmBase, Math.floor(Math.log(this.viewportMinimum) / (lnLogarithmBase * this.interval) + 0.2) * this.interval);
				}
			}
			this.equidistantInterval = true;
			this.intervalStartPosition = intervalStartPosition;
		}


		//Set valueFormatString
		if (!this.valueFormatString) {
			this.valueFormatString = "#,##0.##";

			if (this.viewportMinimum < 1) {
				var numberOfDecimals = Math.floor(Math.abs(Math.log(this.viewportMinimum) / Math.LN10)) + 2;
				if (isNaN(numberOfDecimals) || !isFinite(numberOfDecimals))
					numberOfDecimals = 2;

				if (numberOfDecimals > 2) {
					for (var i = 0; i < numberOfDecimals - 2; i++)
						this.valueFormatString += "#";
				}
			}


		}
	}

	Axis.generateValueFormatString = function (range, decimalsAt100) {
		var valueFormatString = "#,##0.";
		var numberOfDecimals = decimalsAt100;

		if (range < 1) {
			numberOfDecimals += Math.floor(Math.abs(Math.log(range) / Math.LN10));

			if (isNaN(numberOfDecimals) || !isFinite(numberOfDecimals))
				numberOfDecimals = decimalsAt100;
		}

		for (var i = 0; i < numberOfDecimals; i++)
			valueFormatString += "#";

		return valueFormatString;
	}

	Axis.getNiceExponent = function (x, round) {

		var exp = Math.floor(Math.log(x) / Math.LN10);
		var f = x / Math.pow(10, exp);
		var nf;

		if (exp < 0) {
			if (f <= 1)
				nf = 1;
			else if (f <= 5)
				nf = 5;
			else nf = 10;
		} else {
			nf = Math.max(Math.floor(f), 1);
		}


		return (exp < -20 ? Number(nf * Math.pow(10, exp)) : Number((nf * Math.pow(10, exp)).toFixed(20)));
	}

	Axis.getNiceNumber = function (x, round) {

		var exp = Math.floor(Math.log(x) / Math.LN10);
		var f = x / Math.pow(10, exp);
		var nf;

		if (round) {
			if (f < 1.5)
				nf = 1;
			else if (f < 3)
				nf = 2;
			else if (f < 7)
				nf = 5;
			else
				nf = 10;
		}
		else {
			if (f <= 1)
				nf = 1;
			else if (f <= 2)
				nf = 2;
			else if (f <= 5)
				nf = 5;
			else nf = 10;
		}

		return (exp < -20 ? Number(nf * Math.pow(10, exp)) : Number((nf * Math.pow(10, exp)).toFixed(20)));
	}

	Axis.prototype.getLabelStartPoint = function () {

		var intervalInMilliseconds = convertToNumber(this.interval, this.intervalType);
		var minimum = Math.floor((this.viewportMinimum) / intervalInMilliseconds) * intervalInMilliseconds;
		var dateTime = new Date(minimum);

		if (this.intervalType === "millisecond") {
			//millisecond = dateTime.getMilliSecond();
			//millisecond = Math.floor((millisecond + this.interval) / this.interval) * this.interval;
		}
		else if (this.intervalType === "second") {
			if (dateTime.getMilliseconds() > 0) {
				dateTime.setSeconds(dateTime.getSeconds() + 1);
				dateTime.setMilliseconds(0);
			}
		}
		else if (this.intervalType === "minute") {
			if (dateTime.getSeconds() > 0 || dateTime.getMilliseconds() > 0) {
				dateTime.setMinutes(dateTime.getMinutes() + 1);
				dateTime.setSeconds(0);
				dateTime.setMilliseconds(0);
			}
		}
		else if (this.intervalType === "hour") {
			if (dateTime.getMinutes() > 0 || dateTime.getSeconds() > 0 || dateTime.getMilliseconds() > 0) {
				dateTime.setHours(dateTime.getHours() + 1);
				dateTime.setMinutes(0);
				dateTime.setSeconds(0);
				dateTime.setMilliseconds(0);
			}
		}
		else if (this.intervalType === "day") {
			if (dateTime.getHours() > 0 || dateTime.getMinutes() > 0 || dateTime.getSeconds() > 0 || dateTime.getMilliseconds() > 0) {
				dateTime.setDate(dateTime.getDate() + 1);
				dateTime.setHours(0);
				dateTime.setMinutes(0);
				dateTime.setSeconds(0);
				dateTime.setMilliseconds(0);
			}
		}
		else if (this.intervalType === "week") {
			if (dateTime.getDay() > 0 || dateTime.getHours() > 0 || dateTime.getMinutes() > 0 || dateTime.getSeconds() > 0 || dateTime.getMilliseconds() > 0) {
				dateTime.setDate(dateTime.getDate() + (7 - dateTime.getDay()));
				dateTime.setHours(0);
				dateTime.setMinutes(0);
				dateTime.setSeconds(0);
				dateTime.setMilliseconds(0);
			}
		}
		else if (this.intervalType === "month") {
			if (dateTime.getDate() > 1 || dateTime.getHours() > 0 || dateTime.getMinutes() > 0 || dateTime.getSeconds() > 0 || dateTime.getMilliseconds() > 0) {
				dateTime.setMonth(dateTime.getMonth() + 1);
				dateTime.setDate(1);
				dateTime.setHours(0);
				dateTime.setMinutes(0);
				dateTime.setSeconds(0);
				dateTime.setMilliseconds(0);
			}
		}
		else if (this.intervalType === "year") {
			if (dateTime.getMonth() > 0 || dateTime.getDate() > 1 || dateTime.getHours() > 0 || dateTime.getMinutes() > 0 || dateTime.getSeconds() > 0 || dateTime.getMilliseconds() > 0) {
				dateTime.setFullYear(dateTime.getFullYear() + 1);
				dateTime.setMonth(0);
				dateTime.setDate(1);
				dateTime.setHours(0);
				dateTime.setMinutes(0);
				dateTime.setSeconds(0);
				dateTime.setMilliseconds(0);
			}
		}

		return dateTime;
	}

	//#endregion Axis


	//#region Break

	function ScaleBreaks(chart, options, id, axis) {
		ScaleBreaks.base.constructor.call(this, "ScaleBreaks", "scaleBreaks", options, null, axis);
		this.id = id;
		this.chart = chart;
		this.ctx = this.chart.ctx;
		this.axis = axis;
		this.optionsName = "scaleBreaks";
		this.isOptionsInArray = false;
		this._appliedBreaks = [];

		this.customBreaks = [];
		this.autoBreaks = [];

		if (typeof this.spacing === "string") {
			this.spacing = parseFloat(this.spacing);
			this.spacing = isNaN(this.spacing) ? 8 : (this.spacing > 10 ? 10 : this.spacing) + "%";
		}
		else if (typeof this.spacing !== "number")
			this.spacing = 8;

		if (this.autoCalculate) {

			this.maxNumberOfAutoBreaks = Math.min(this.maxNumberOfAutoBreaks, 5);
		}

		if (this.options.customBreaks && this.options.customBreaks.length > 0) {
			//Axis Break Pre Prosseing

			for (var i = 0; i < this.options.customBreaks.length; i++) {
				this.customBreaks.push(new Break(this.chart, "customBreaks", this.options.customBreaks[i], i, ++this.chart._eventManager.lastObjectId, this));

				if (typeof this.customBreaks[i].startValue === "number" && typeof this.customBreaks[i].endValue === "number" && this.customBreaks[i].endValue !== this.customBreaks[i].startValue)
					this._appliedBreaks.push(this.customBreaks[i]);
			}

			//ordering breaks
			this._appliedBreaks.sort(function (break1, break2) {
				return break1.startValue - break2.startValue;
			});

			//Merging breaks
			for (var i = 0; i < this._appliedBreaks.length - 1; i++) {
				if (this._appliedBreaks[i].endValue >= this._appliedBreaks[i + 1].startValue) {
					this._appliedBreaks[i].endValue = Math.max(this._appliedBreaks[i].endValue, this._appliedBreaks[i + 1].endValue);
					if (window.console)
						window.console.log("CanvasJS Error: Breaks " + i + " and " + (i + 1) + " are overlapping.");
					this._appliedBreaks.splice(i, 2);
					i--;
				}
			}
		}

	}
	extend(ScaleBreaks, CanvasJSObject);


	function Break(chart, themeOptionsKey, options, index, id, scaleBreaks) {
		Break.base.constructor.call(this, "Break", themeOptionsKey, options, index, scaleBreaks);
		this.id = id;
		this.chart = chart;
		this.ctx = this.chart.ctx;
		this.scaleBreaks = scaleBreaks;
		this.optionsName = themeOptionsKey;
		this.isOptionsInArray = true;

		this.type = options.type ? this.type : scaleBreaks.type;
		this.fillOpacity = !isNullOrUndefined(options.fillOpacity) ? this.fillOpacity : scaleBreaks.fillOpacity;
		this.lineThickness = !isNullOrUndefined(options.lineThickness) ? this.lineThickness : scaleBreaks.lineThickness;
		this.color = options.color ? this.color : scaleBreaks.color;
		this.lineColor = options.lineColor ? this.lineColor : scaleBreaks.lineColor;
		this.lineDashType = options.lineDashType ? this.lineDashType : scaleBreaks.lineDashType;

		//For making sure all customBreak.endValue > customBreak.startValue and for considering only the timeStamp dateTime axis 
		if (!isNullOrUndefined(this.startValue) && this.startValue.getTime)
			this.startValue = this.startValue.getTime();
		if (!isNullOrUndefined(this.endValue) && this.endValue.getTime)
			this.endValue = this.endValue.getTime();
		if (typeof this.startValue === "number" && typeof this.endValue === "number" && this.endValue < this.startValue) {
			var temp = this.startValue;
			this.startValue = this.endValue;
			this.endValue = temp;
		}

		this.spacing = typeof options.spacing === "undefined" ? scaleBreaks.spacing : options.spacing;
		if (typeof this.options.spacing === "string") {
			this.spacing = parseFloat(this.spacing);
			this.spacing = isNaN(this.spacing) ? 0 : (this.spacing > 10 ? 10 : this.spacing) + "%";
		}
		else if (typeof this.options.spacing !== "number")
			this.spacing = scaleBreaks.spacing;
		this.size = scaleBreaks.parent.logarithmic ? 1 : 0;
	}
	extend(Break, CanvasJSObject);

	Break.prototype.createUserOptions = function (options) {
		if (typeof (options) === "undefined" && !this.options._isPlaceholder)
			return;

		var optionsIndex = 0;

		if (this.parent.options._isPlaceholder)
			this.parent.createUserOptions();


		if (!this.options._isPlaceholder) {
			addArrayIndexOf(this.parent[this.optionsName]);
			optionsIndex = this.parent.options[this.optionsName].indexOf(this.options);
		}

		this.options = typeof (options) === "undefined" ? {} : options;


		this.parent.options[this.optionsName][optionsIndex] = this.options;
	}

	Break.prototype.render = function (ctx) {

		if (this.spacing === 0 && (this.options.lineThickness === 0 || typeof this.options.lineThickness === "undefined" && this.parent.lineThickness === 0))
			return;
		var oldCtx = this.ctx;
		var oldGlobalAlpha = this.ctx.globalAlpha;
		this.ctx = ctx || this.ctx;
		this.ctx.save();
		this.ctx.beginPath();
		this.ctx.rect(this.chart.plotArea.x1, this.chart.plotArea.y1, this.chart.plotArea.width, this.chart.plotArea.height);
		this.ctx.clip();
		var xyStart = this.scaleBreaks.parent.getPixelCoordinatesOnAxis(this.startValue);
		var xyEnd = this.scaleBreaks.parent.getPixelCoordinatesOnAxis(this.endValue);
		this.ctx.strokeStyle = this.lineColor;
		this.ctx.fillStyle = this.color;
		this.ctx.beginPath();

		this.ctx.globalAlpha = 1;

		var hexColor = intToHexColorString(this.id);
		var sign, x1, x2, y1, y2, px, py, noOfRepatation;
		var oscillation = Math.max(this.spacing, 3);
		var lineWidth = Math.max(0, this.lineThickness);
		this.ctx.lineWidth = lineWidth;


		if (this.ctx.setLineDash)
			this.ctx.setLineDash(getLineDashArray(this.lineDashType, lineWidth));

		if (this.scaleBreaks.parent._position === "bottom" || this.scaleBreaks.parent._position === "top") {
			x1 = (lineWidth % 2 === 1) ? (xyStart.x << 0) + .5 : (xyStart.x << 0);
			x2 = (lineWidth % 2 === 1) ? (xyEnd.x << 0) + .5 : (xyEnd.x << 0);

			if (this.scaleBreaks.parent._position === "top") {
				y1 = this.chart.plotArea.y1;
				y2 = this.chart.plotArea.y2 + lineWidth / 2 + .5 << 0;
			}
			else {
				y1 = this.chart.plotArea.y2;
				y2 = this.chart.plotArea.y1 - lineWidth / 2 + .5 << 0;
				oscillation *= -1;
			}

			this.bounds = { x1: x1 - lineWidth / 2, y1: y1, x2: x2 + lineWidth / 2, y2: y2 };
			this.ctx.moveTo(x1, y1);
			if (this.type === "straight" || this.scaleBreaks.parent._position === "top" && oscillation <= 0 || this.scaleBreaks.parent._position === "bottom" && oscillation >= 0) {
				this.ctx.lineTo(x1, y2);
				this.ctx.lineTo(x2, y2);
				this.ctx.lineTo(x2, y1);
			}
			else if (this.type === "wavy") {
				px = x1;
				py = y1;
				sign = .5;
				noOfRepatation = (y2 - py) / oscillation / 3;

				for (var i = 0; i < noOfRepatation; i++) {
					this.ctx.bezierCurveTo(px + sign * oscillation, py + oscillation, px + sign * oscillation, py + 2 * oscillation, px, py + 3 * oscillation);
					py += 3 * oscillation;
					sign *= -1;
				}
				this.ctx.bezierCurveTo(px + sign * oscillation, py + oscillation, px + sign * oscillation, py + 2 * oscillation, px, py + 3 * oscillation);
				px = x2;
				sign *= -1;
				this.ctx.lineTo(px, py);
				for (var i = 0; i < noOfRepatation; i++) {
					this.ctx.bezierCurveTo(px + sign * oscillation, py - oscillation, px + sign * oscillation, py - 2 * oscillation, px, py - 3 * oscillation);
					py -= 3 * oscillation;
					sign *= -1;
				}
			}
			else if (this.type === "zigzag") {
				sign = -1;
				py = y1 + oscillation;
				px = x1 + oscillation;
				noOfRepatation = (y2 - py) / oscillation / 2;

				for (var i = 0; i < noOfRepatation; i++) {
					this.ctx.lineTo(px, py);
					px += sign * 2 * oscillation;
					py += 2 * oscillation;
					sign *= -1;
				}
				this.ctx.lineTo(px, py);
				px += x2 - x1;
				for (var i = 0; i < noOfRepatation + 1; i++) {
					this.ctx.lineTo(px, py);
					px += sign * 2 * oscillation;
					py -= 2 * oscillation;
					sign *= -1;
				}
				this.ctx.lineTo(px + sign * oscillation, py + oscillation);
			}
		}
		else if ((this.scaleBreaks.parent._position === "left" || this.scaleBreaks.parent._position === "right")) {
			y1 = (lineWidth % 2 === 1) ? (xyEnd.y << 0) + .5 : (xyEnd.y << 0);
			y2 = (lineWidth % 2 === 1) ? (xyStart.y << 0) + .5 : (xyStart.y << 0);

			if (this.scaleBreaks.parent._position === "left") {
				x1 = this.chart.plotArea.x1;
				x2 = this.chart.plotArea.x2 + lineWidth / 2 + .5 << 0;
			}
			else {
				x1 = this.chart.plotArea.x2;
				x2 = this.chart.plotArea.x1 - lineWidth / 2 + .5 << 0;
				oscillation *= -1;
			}

			this.bounds = { x1: x1, y1: y1 - lineWidth / 2, x2: x2, y2: y2 + lineWidth / 2 };

			this.ctx.moveTo(x1, y1);
			if (this.type === "straight" || this.scaleBreaks.parent._position === "left" && oscillation <= 0 || this.scaleBreaks.parent._position === "right" && oscillation >= 0) {
				this.ctx.lineTo(x2, y1);
				this.ctx.lineTo(x2, y2);
				this.ctx.lineTo(x1, y2);
			}
			else if (this.type === "wavy") {
				px = x1;
				py = y1;
				sign = .5;
				noOfRepatation = (x2 - px) / oscillation / 3;

				for (var i = 0; i < noOfRepatation; i++) {
					this.ctx.bezierCurveTo(px + oscillation, py + sign * oscillation, px + 2 * oscillation, py + sign * oscillation, px + 3 * oscillation, py);
					px += 3 * oscillation;
					sign *= -1;
				}
				this.ctx.bezierCurveTo(px + oscillation, py + sign * oscillation, px + 2 * oscillation, py + sign * oscillation, px + 3 * oscillation, py);
				py = y2;
				sign *= -1;
				this.ctx.lineTo(px, py);
				for (var i = 0; i < noOfRepatation; i++) {
					this.ctx.bezierCurveTo(px - oscillation, py + sign * oscillation, px - 2 * oscillation, py + sign * oscillation, px - 3 * oscillation, py);
					px -= 3 * oscillation;
					sign *= -1;
				}
			}
			else if (this.type === "zigzag") {
				sign = 1;
				py = y1 - oscillation;
				px = x1 + oscillation;
				noOfRepatation = (x2 - px) / oscillation / 2;

				for (var i = 0; i < noOfRepatation; i++) {
					this.ctx.lineTo(px, py);
					py += sign * 2 * oscillation;
					px += 2 * oscillation;
					sign *= -1;
				}
				this.ctx.lineTo(px, py);
				py += y2 - y1;
				for (var i = 0; i < noOfRepatation + 1; i++) {
					this.ctx.lineTo(px, py);
					py += sign * 2 * oscillation;
					px -= 2 * oscillation;
					sign *= -1;
				}
				this.ctx.lineTo(px + oscillation, py + sign * oscillation);
			}
		}
		if (lineWidth > 0)
			this.ctx.stroke();
		this.ctx.closePath();
		this.ctx.globalAlpha = this.fillOpacity;
		this.ctx.globalCompositeOperation = "destination-over";
		this.ctx.fill();
		this.ctx.restore();
		this.ctx.globalAlpha = oldGlobalAlpha;
		this.ctx = oldCtx;
	};

	//#endregion Break

	//#region StripLine

	function StripLine(chart, options, index, id, axis) {
		StripLine.base.constructor.call(this, "StripLine", "stripLines", options, index, axis);

		this.id = id;
		this.chart = chart;
		this.ctx = this.chart.ctx;

		this.label = this.label;
		this.axis = axis;

		this.optionsName = "stripLines"
		this.isOptionsInArray = true;

		this._thicknessType = "pixel";
		if (this.startValue !== null && this.endValue !== null) {

			this.value = axis.logarithmic ? Math.sqrt((this.startValue.getTime ? this.startValue.getTime() : this.startValue) * (this.endValue.getTime ? this.endValue.getTime() : this.endValue)) : ((this.startValue.getTime ? this.startValue.getTime() : this.startValue) + (this.endValue.getTime ? this.endValue.getTime() : this.endValue)) / 2;
			this._thicknessType = null;
		}
	}
	extend(StripLine, CanvasJSObject);

	StripLine.prototype.createUserOptions = function (options) {
		if (typeof (options) === "undefined" && !this.options._isPlaceholder)
			return;

		var optionsIndex = 0;

		if (this.parent.options._isPlaceholder)
			this.parent.createUserOptions();


		if (!this.options._isPlaceholder) {
			addArrayIndexOf(this.parent.stripLines);
			optionsIndex = this.parent.options.stripLines.indexOf(this.options);
		}

		this.options = typeof (options) === "undefined" ? {} : options;


		this.parent.options.stripLines[optionsIndex] = this.options;
	}

	StripLine.prototype.render = function () {

		this.ctx.save();
		//this.ctx.rect(this.chart.plotArea.x1, this.chart.plotArea.y1, this.chart.plotArea.width, this.chart.plotArea.height);
		//this.ctx.clip();

		var xy = this.parent.getPixelCoordinatesOnAxis(this.value);

		var lineWidth = Math.abs(this._thicknessType === "pixel" ? this.thickness : this.parent.conversionParameters.pixelPerUnit * this.thickness);

		if (lineWidth > 0) {
			//var opacity = this.opacity === null ? ( this.showOnTop && this._thicknessType === "pixel" ? 1 : 1) : this.opacity;
			var opacity = this.opacity === null ? 1 : this.opacity;

			this.ctx.strokeStyle = this.color;
			this.ctx.beginPath();

			var oldGlobalAlpha = this.ctx.globalAlpha;
			this.ctx.globalAlpha = opacity;

			var hexColor = intToHexColorString(this.id);
			var x1, x2, y1, y2;

			this.ctx.lineWidth = lineWidth;


			if (this.ctx.setLineDash) {
				this.ctx.setLineDash(getLineDashArray(this.lineDashType, lineWidth));
			}

			if (this.parent._position === "bottom" || this.parent._position === "top") {

				var stripX = (this.ctx.lineWidth % 2 === 1) ? (xy.x << 0) + .5 : (xy.x << 0);

				x1 = x2 = stripX;
				y1 = this.chart.plotArea.y1;
				y2 = this.chart.plotArea.y2;

				this.bounds = { x1: x1 - lineWidth / 2, y1: y1, x2: x2 + lineWidth / 2, y2: y2 };
			}
			else if (this.parent._position === "left" || this.parent._position === "right") {
				var stripY = (this.ctx.lineWidth % 2 === 1) ? (xy.y << 0) + .5 : (xy.y << 0);

				y1 = y2 = stripY;
				x1 = this.chart.plotArea.x1;
				x2 = this.chart.plotArea.x2;

				this.bounds = { x1: x1, y1: y1 - lineWidth / 2, x2: x2, y2: y2 + lineWidth / 2 };
			}

			this.ctx.moveTo(x1, y1);
			this.ctx.lineTo(x2, y2);
			this.ctx.stroke();


			this.ctx.globalAlpha = oldGlobalAlpha;
		}
		this.ctx.restore();
	};

	//#endregion StripLine

	//#region Crosshair

	function Crosshair(chart, options, axis) {
		Crosshair.base.constructor.call(this, "Crosshair", "crosshair", options, null, axis);

		this.chart = chart;
		this.ctx = this.chart.ctx;

		this.axis = axis;

		this.optionsName = "crosshair"

		this._thicknessType = "pixel";
	}
	extend(Crosshair, CanvasJSObject);


	Crosshair.prototype.render = function (mouseX, mouseY) {
		var x1, x2, y1, y2;
		var stripX = null, stripY = null, textBlock = null;
		var text = "";

		if (!this.valueFormatString) {
			if (this.parent.valueType === "dateTime") {
				this.valueFormatString = this.parent.valueFormatString;
			}
			else {
				var decimalsAt100 = 0;
				if (this.chart.plotInfo.axisPlacement === "xySwapped") {
					decimalsAt100 = this.parent.range > 50 ? 0 : (this.chart.width > 500 && this.parent.range < 25) ? 2 : Math.floor(Math.abs(Math.log(this.parent.range) / Math.LN10)) + (this.parent.range < 5 ? 2 : this.parent.range < 10 ? 1 : 0);
					this.valueFormatString = Axis.generateValueFormatString(this.parent.range, decimalsAt100);
				}
				else {
					decimalsAt100 = this.parent.range > 50 ? 0 : Math.floor(Math.abs(Math.log(this.parent.range) / Math.LN10)) + (this.parent.range < 5 ? 2 : this.parent.range < 10 ? 1 : 0);
					this.valueFormatString = Axis.generateValueFormatString(this.parent.range, decimalsAt100);
				}
			}
		}

		var opacity = this.opacity === null ? 1 : this.opacity;
		var lineWidth = Math.abs(this._thicknessType === "pixel" ? this.thickness : this.parent.conversionParameters.pixelPerUnit * this.thickness);

		var overlaidCanvasCtx = this.chart.overlaidCanvasCtx;
		var oldGlobalAlpha = overlaidCanvasCtx.globalAlpha;

		overlaidCanvasCtx.globalAlpha = opacity;
		overlaidCanvasCtx.beginPath();
		overlaidCanvasCtx.strokeStyle = this.color;
		overlaidCanvasCtx.lineWidth = lineWidth;

		overlaidCanvasCtx.save();

		this.labelFontSize = isNullOrUndefined(this.options.labelFontSize) ? this.parent.labelFontSize : this.labelFontSize;
		if (this.parent._position === "left" || this.parent._position === "right") {
			this.labelMaxWidth = isNullOrUndefined(this.options.labelMaxWidth) ? (this.parent.bounds.x2 - this.parent.bounds.x1) : this.labelMaxWidth;
			this.labelMaxHeight = isNullOrUndefined(this.options.labelWrap) || this.labelWrap ? this.chart.height * 3 : this.labelFontSize * 2;
		}
		else if (this.parent._position === "top" || this.parent._position === "bottom") {
			this.labelMaxWidth = isNullOrUndefined(this.options.labelMaxWidth) ? this.chart.width * 3 : this.labelMaxWidth;
			this.labelMaxHeight = isNullOrUndefined(this.options.labelWrap) || this.labelWrap ? this.parent.bounds.height : this.labelFontSize * 2;
		}

		if (lineWidth > 0)
			if (overlaidCanvasCtx.setLineDash) {
				overlaidCanvasCtx.setLineDash(getLineDashArray(this.lineDashType, lineWidth));
			}

		textBlock = new TextBlock(overlaidCanvasCtx, {
			x: 0,
			y: 0,
			padding: { top: 2, right: 3, bottom: 2, left: 4 },
			backgroundColor: this.labelBackgroundColor,
			borderColor: this.labelBorderColor,
			borderThickness: this.labelBorderThickness,
			cornerRadius: this.labelCornerRadius,
			maxWidth: this.labelMaxWidth,
			maxHeight: this.labelMaxHeight,
			angle: this.labelAngle,
			text: text,
			horizontalAlign: "left",//left, center, right
			fontSize: this.labelFontSize,//in pixels
			fontFamily: this.labelFontFamily,
			fontWeight: this.labelFontWeight, //normal, bold, bolder, lighter,
			fontColor: this.labelFontColor,
			fontStyle: this.labelFontStyle, // normal, italic, oblique
			textBaseline: "middle"
		});

		if (this.snapToDataPoint) {
			var x = 0, y = 0;
			var nearbyEntries = [];

			if (this.chart.plotInfo.axisPlacement === "xySwapped") {
				var entry = null;
				if (this.parent._position === "bottom" || this.parent._position === "top") {
					x = this.parent.dataSeries[0].axisX.convertPixelToValue({ y: mouseY });
				}

				else if (this.parent._position === "left" || this.parent._position === "right") {
					x = this.parent.convertPixelToValue({ y: mouseY });
				}

				for (var i = 0; i < this.parent.dataSeries.length; i++) {
					entry = this.parent.dataSeries[i].getDataPointAtX(x, true);

					if (entry && entry.index >= 0) {
						entry.dataSeries = this.parent.dataSeries[i];

						if (entry.dataPoint.y !== null)
							nearbyEntries.push(entry);
					}
				}

				entry = null;

				if (nearbyEntries.length === 0)
					return;

				nearbyEntries.sort(function (entry1, entry2) {
					return entry1.distance - entry2.distance;
				});

				var smallestDiff = Math.abs(mouseX - this.parent.convertValueToPixel(nearbyEntries[0].dataPoint.y));
				var index = 0; //index of the current closest number
				if (nearbyEntries[0].dataSeries.type === "rangeBar" || nearbyEntries[0].dataSeries.type === "error") {
					var smallestDiff = Math.abs(mouseX - this.parent.convertValueToPixel(nearbyEntries[index].dataPoint.y[0]));
					var currentDiff = 0;

					for (var j = 0; j < nearbyEntries.length; j++) {
						if (nearbyEntries[j].dataPoint.y && nearbyEntries[j].dataPoint.y.length) {
							for (var k = 0; k < nearbyEntries[j].dataPoint.y.length; k++) {
								currentDiff = Math.abs(mouseX - this.parent.convertValueToPixel(nearbyEntries[j].dataPoint.y[k]));
								if (currentDiff < smallestDiff) {
									smallestDiff = currentDiff;
									index = j;
								}
							}
						}
						else {
							currentDiff = Math.abs(mouseX - this.parent.convertValueToPixel(nearbyEntries[j].dataPoint.y));
							if (currentDiff < smallestDiff) {
								smallestDiff = currentDiff;
								index = j;
							}
						}
					}
				}
				else if (nearbyEntries[0].dataSeries.type === "stackedBar") {
					var smallestDiff = Math.abs(mouseX - this.parent.convertValueToPixel(nearbyEntries[0].dataPoint.y));
					var currentDiff = 0, cumulativeY = 0, index = 0;

					for (var j = 0; j < nearbyEntries.length; j++) {
						if (nearbyEntries[j].dataPoint.y && nearbyEntries[j].dataPoint.y.length) {
							for (var k = 0; k < nearbyEntries[j].dataPoint.y.length; k++) {
								currentDiff = Math.abs(mouseX - this.parent.convertValueToPixel(nearbyEntries[j].dataPoint.y[k]));
								if (currentDiff < smallestDiff) {
									smallestDiff = currentDiff;
									index = j;
								}
							}
						}
						else {
							cumulativeY += nearbyEntries[j].dataPoint.y;

							currentDiff = Math.abs(mouseX - this.parent.convertValueToPixel(cumulativeY));

							if (currentDiff < smallestDiff) {
								smallestDiff = currentDiff;
								index = j;
							}
						}
					}
				}
				else if (nearbyEntries[0].dataSeries.type === "stackedBar100") {
					var smallestDiff = Math.abs(mouseX - this.parent.convertValueToPixel(nearbyEntries[0].dataPoint.y));
					var currentDiff = 0, cumulativeY = 0, yPercent = 0;

					for (var j = 0; j < nearbyEntries.length; j++) {
						if (nearbyEntries[j].dataPoint.y && nearbyEntries[j].dataPoint.y.length) {
							for (var k = 0; k < nearbyEntries[j].dataPoint.y.length; k++) {
								currentDiff = Math.abs(mouseX - this.parent.convertValueToPixel(nearbyEntries[j].dataPoint.y[k]));
								if (currentDiff < smallestDiff) {
									smallestDiff = currentDiff;
									index = j;
								}
							}
						}
						else {
							cumulativeY += nearbyEntries[j].dataPoint.y;
							var dataPointX = nearbyEntries[j].dataPoint.x.getTime ? nearbyEntries[j].dataPoint.x.getTime() : nearbyEntries[j].dataPoint.x;
							yPercent = cumulativeY / nearbyEntries[j].dataSeries.plotUnit.dataPointYSums[dataPointX] * 100;

							currentDiff = Math.abs(mouseX - this.parent.convertValueToPixel(yPercent));

							if (currentDiff < smallestDiff) {
								smallestDiff = currentDiff;
								index = j;
							}
						}
					}
				}
				else {
					var smallestDiff = Math.abs(mouseX - this.parent.convertValueToPixel(nearbyEntries[0].dataPoint.y));
					var currentDiff = 0, index = 0; //index of the current closest number

					for (var j = 0; j < nearbyEntries.length; j++) {
						if (nearbyEntries[j].dataPoint.y && nearbyEntries[j].dataPoint.y.length) {
							for (var k = 0; k < nearbyEntries[j].dataPoint.y.length; k++) {
								currentDiff = Math.abs(mouseX - this.parent.convertValueToPixel(nearbyEntries[j].dataPoint.y[k]));
								if (currentDiff < smallestDiff) {
									smallestDiff = currentDiff;
									index = j;
								}
							}
						}
						else {
							currentDiff = Math.abs(mouseX - this.parent.convertValueToPixel(nearbyEntries[j].dataPoint.y));
							if (currentDiff < smallestDiff) {
								smallestDiff = currentDiff;
								index = j;
							}
						}
					}
				}

				var closest = nearbyEntries[index];

				if (this.parent._position === "bottom" || this.parent._position === "top") {
					var dpsIndex = 0; //index of the current closest dataPoint

					if (this.parent.dataSeries[index].type === "rangeBar" || this.parent.dataSeries[index].type === "error") {
						var smallestDiff = Math.abs(mouseX - this.parent.convertValueToPixel(closest.dataPoint.y[0]));
						var currentDiff = 0;

						for (var j = 0; j < closest.dataPoint.y.length; j++) {
							currentDiff = Math.abs(mouseX - this.parent.convertValueToPixel(closest.dataPoint.y[j]));
							if (currentDiff < smallestDiff) {
								smallestDiff = currentDiff;
								dpsIndex = j;
							}
						}
						stripX = (overlaidCanvasCtx.lineWidth % 2 === 1) ? (this.parent.convertValueToPixel(closest.dataPoint.y[dpsIndex]) << 0) + .5 : (this.parent.convertValueToPixel(closest.dataPoint.y[dpsIndex]) << 0);

						textBlock.text = this.labelFormatter ? this.labelFormatter({ chart: this.chart, axis: this.parent.options, crosshair: this.options, value: closest.dataPoint.y[dpsIndex] }) : !isNullOrUndefined(this.options.label) ? this.label : numberFormat(closest.dataPoint.y[dpsIndex], this.valueFormatString, this.chart._cultureInfo);
					}
					else if (this.parent.dataSeries[index].type === "stackedBar") {
						var smallestDiff = Math.abs(mouseX - this.parent.convertValueToPixel(nearbyEntries[0].dataPoint.y));
						var currentDiff = 0, cumulativeY = 0;

						for (var j = index; j >= 0; j--) {

							cumulativeY += nearbyEntries[j].dataPoint.y;
							currentDiff = Math.abs(mouseX - this.parent.convertValueToPixel(cumulativeY));

							if (currentDiff < smallestDiff) {
								smallestDiff = currentDiff;
								dpsIndex = j;
							}
						}

						stripX = (overlaidCanvasCtx.lineWidth % 2 === 1) ? (this.parent.convertValueToPixel(cumulativeY) << 0) + .5 : (this.parent.convertValueToPixel(cumulativeY) << 0);

						textBlock.text = this.labelFormatter ? this.labelFormatter({ chart: this.chart, axis: this.parent.options, crosshair: this.options, value: closest.dataPoint.y }) : !isNullOrUndefined(this.options.label) ? this.label : numberFormat(closest.dataPoint.y, this.valueFormatString, this.chart._cultureInfo);
					}
					else if (this.parent.dataSeries[index].type === "stackedBar100") {
						var smallestDiff = Math.abs(mouseX - this.parent.convertValueToPixel(nearbyEntries[0].dataPoint.y));
						var currentDiff = 0, cumulativeY = 0, yPercent = 0;

						for (var j = index; j >= 0; j--) {

							cumulativeY += nearbyEntries[j].dataPoint.y;
							var dataPointX = nearbyEntries[j].dataPoint.x.getTime ? nearbyEntries[j].dataPoint.x.getTime() : nearbyEntries[j].dataPoint.x;
							yPercent = cumulativeY / nearbyEntries[j].dataSeries.plotUnit.dataPointYSums[dataPointX] * 100;
							currentDiff = Math.abs(mouseX - this.parent.convertValueToPixel(yPercent));

							if (currentDiff < smallestDiff) {
								smallestDiff = currentDiff;
								dpsIndex = j;
							}
						}
						stripX = (overlaidCanvasCtx.lineWidth % 2 === 1) ? (this.parent.convertValueToPixel(yPercent) << 0) + .5 : (this.parent.convertValueToPixel(yPercent) << 0);

						textBlock.text = this.labelFormatter ? this.labelFormatter({ chart: this.chart, axis: this.parent.options, crosshair: this.options, value: yPercent }) : !isNullOrUndefined(this.options.label) ? this.label : numberFormat(yPercent, this.valueFormatString, this.chart._cultureInfo);
					}
					else {
						stripX = (overlaidCanvasCtx.lineWidth % 2 === 1) ? (this.parent.convertValueToPixel(closest.dataPoint.y) << 0) + .5 : (this.parent.convertValueToPixel(closest.dataPoint.y) << 0);

						textBlock.text = this.labelFormatter ? this.labelFormatter({ chart: this.chart, axis: this.parent.options, crosshair: this.options, value: closest.dataPoint.y }) : !isNullOrUndefined(this.options.label) ? this.label : numberFormat(closest.dataPoint.y, this.valueFormatString, this.chart._cultureInfo);
					}

					x1 = x2 = stripX;
					y1 = this.chart.plotArea.y1;
					y2 = this.chart.plotArea.y2;

					this.bounds = { x1: x1 - lineWidth / 2, y1: y1, x2: x2 + lineWidth / 2, y2: y2 };

					textBlock.x = x1 - (textBlock.measureText().width / 2);
					if ((textBlock.x + textBlock.width) > this.chart.bounds.x2) {
						textBlock.x = this.chart.bounds.x2 - textBlock.width;
					}
					else if (textBlock.x < this.chart.bounds.x1) {
						textBlock.x = this.chart.bounds.x1;
					}

					textBlock.y = this.parent.lineCoordinates.y2 + textBlock.fontSize / 2 + 2;
				}
				else if (this.parent._position === "left" || this.parent._position === "right") {

					stripY = (overlaidCanvasCtx.lineWidth % 2 === 1) ? (this.parent.convertValueToPixel(closest.dataPoint.x) << 0) + .5 : (this.parent.convertValueToPixel(closest.dataPoint.x) << 0);

					y1 = y2 = stripY;
					x1 = this.chart.plotArea.x1;
					x2 = this.chart.plotArea.x2;

					this.bounds = { x1: x1, y1: y1 - lineWidth / 2, x2: x2, y2: y2 + lineWidth / 2 };

					var hasAllLabels = false;

					if (this.parent.labels) {
						var tempInterval = Math.ceil(this.parent.interval);
						var tempStartPoint = 0;

						for (var j = tempStartPoint; j < this.parent.viewportMaximum; j += tempInterval) {
							if (this.parent.labels[j]) {
								hasAllLabels = true;
							} else {
								hasAllLabels = false;
								break;
							}
						}
					}

					if (hasAllLabels) {
						if (this.parent.type === "axisX") {
							x = this.parent.convertPixelToValue({ y: mouseY });

							var entry = null;
							for (var i = 0; i < this.parent.dataSeries.length; i++) {
								entry = this.parent.dataSeries[i].getDataPointAtX(x, true);

								if (entry && entry.index >= 0) {
									textBlock.text = this.labelFormatter ? this.labelFormatter({ chart: this.chart, axis: this.parent.options, crosshair: this.options, value: closest.dataPoint.x }) : !isNullOrUndefined(this.options.label) ? this.label : entry.dataPoint.label;
								}
							}
						}
					}
					else if (this.parent.valueType === "dateTime") {
						textBlock.text = this.labelFormatter ? this.labelFormatter({ chart: this.chart, axis: this.parent.options, crosshair: this.options, value: closest.dataPoint.x }) : !isNullOrUndefined(this.options.label) ? this.label : dateFormat(closest.dataPoint.x, this.valueFormatString, this.chart._cultureInfo);
					}
					else if (this.parent.valueType === "number") {
						textBlock.text = this.labelFormatter ? this.labelFormatter({ chart: this.chart, axis: this.parent.options, crosshair: this.options, value: closest.dataPoint.x }) : !isNullOrUndefined(this.options.label) ? this.label : numberFormat(closest.dataPoint.x, this.valueFormatString, this.chart._cultureInfo);
					}

					textBlock.y = y2 + textBlock.fontSize / 2 - (textBlock.measureText().height / 2) + 2;
					if (textBlock.y - textBlock.fontSize / 2 < this.chart.bounds.y1) {
						textBlock.y = this.chart.bounds.y1 + (textBlock.fontSize / 2) + 2;
					}
					else if (textBlock.y + (textBlock.measureText().height) - textBlock.fontSize / 2 > this.chart.bounds.y2) {
						textBlock.y = this.chart.bounds.y2 - textBlock.measureText().height + textBlock.fontSize / 2;
					}

					if (this.parent._position === "left") {
						textBlock.x = this.parent.lineCoordinates.x2 - (textBlock.measureText().width);
					}
					else if (this.parent._position === "right") {
						textBlock.x = this.parent.lineCoordinates.x2;
					}
				}
				nearbyEntries = null;
			}
			else {
				if (this.parent._position === "bottom" || this.parent._position === "top") {
					x = this.parent.convertPixelToValue({ x: mouseX });

					for (var i = 0; i < this.parent.dataSeries.length; i++) {
						entry = this.parent.dataSeries[i].getDataPointAtX(x, true);
						if (entry && entry.index >= 0) {
							entry.dataSeries = this.parent.dataSeries[i];

							if (entry.dataPoint.y !== null)
								nearbyEntries.push(entry);
						}
					}
					if (nearbyEntries.length === 0)
						return;

					nearbyEntries.sort(function (entry1, entry2) {
						return entry1.distance - entry2.distance;
					});

					var closest = nearbyEntries[0];

					stripX = (overlaidCanvasCtx.lineWidth % 2 === 1) ? (this.parent.convertValueToPixel(closest.dataPoint.x) << 0) + .5 : (this.parent.convertValueToPixel(closest.dataPoint.x) << 0);

					x1 = x2 = stripX;
					y1 = this.chart.plotArea.y1;
					y2 = this.chart.plotArea.y2;

					this.bounds = { x1: x1 - lineWidth / 2, y1: y1, x2: x2 + lineWidth / 2, y2: y2 };

					var hasAllLabels = false;

					if (this.parent.labels) {
						var tempInterval = Math.ceil(this.parent.interval);
						var tempStartPoint = 0;

						for (var j = tempStartPoint; j < this.parent.viewportMaximum; j += tempInterval) {
							if (this.parent.labels[j]) {
								hasAllLabels = true;
							} else {
								hasAllLabels = false;
								break;
							}
						}
					}

					if (hasAllLabels) {
						if (this.parent.type === "axisX") {
							x = this.parent.convertPixelToValue({ x: mouseX });

							var entry = null;
							for (var i = 0; i < this.parent.dataSeries.length; i++) {
								entry = this.parent.dataSeries[i].getDataPointAtX(x, true);

								if (entry && entry.index >= 0) {
									textBlock.text = this.labelFormatter ? this.labelFormatter({ chart: this.chart, axis: this.parent.options, crosshair: this.options, value: closest.dataPoint.x }) : !isNullOrUndefined(this.options.label) ? this.label : entry.dataPoint.label;
								}
							}
						}
					}
					else if (this.parent.valueType === "dateTime") {
						textBlock.text = this.labelFormatter ? this.labelFormatter({ chart: this.chart, axis: this.parent.options, crosshair: this.options, value: closest.dataPoint.x }) : !isNullOrUndefined(this.options.label) ? this.label : dateFormat((closest.dataPoint.x), this.valueFormatString, this.chart._cultureInfo);
					}
					else if (this.parent.valueType === "number") {
						textBlock.text = this.labelFormatter ? this.labelFormatter({ chart: this.chart, axis: this.parent.options, crosshair: this.options, value: closest.dataPoint.x }) : !isNullOrUndefined(this.options.label) ? this.label : numberFormat(closest.dataPoint.x, this.valueFormatString, this.chart._cultureInfo);
					}

					textBlock.x = x1 - (textBlock.measureText().width / 2);
					if ((textBlock.x + textBlock.width) > this.chart.bounds.x2) {
						textBlock.x = this.chart.bounds.x2 - textBlock.width;
					}
					if (textBlock.x < this.chart.bounds.x1) {
						textBlock.x = this.chart.bounds.x1;
					}

					if (this.parent._position === "bottom")
						textBlock.y = this.parent.lineCoordinates.y2 + textBlock.fontSize / 2 + 2;
					else if (this.parent._position === "top")
						textBlock.y = this.parent.lineCoordinates.y1 - textBlock.height + textBlock.fontSize / 2 + 2;
				}
				else if (this.parent._position === "left" || this.parent._position === "right") {
					if (!isNullOrUndefined(this.parent.dataSeries) && this.parent.dataSeries.length > 0)
						x = this.parent.dataSeries[0].axisX.convertPixelToValue({ x: mouseX });

					for (var i = 0; i < this.parent.dataSeries.length; i++) {
						entry = this.parent.dataSeries[i].getDataPointAtX(x, true);
						if (entry && entry.index >= 0) {
							entry.dataSeries = this.parent.dataSeries[i];

							if (entry.dataPoint.y !== null)
								nearbyEntries.push(entry);
						}
					}
					if (nearbyEntries.length === 0)
						return;

					nearbyEntries.sort(function (entry1, entry2) {
						return entry1.distance - entry2.distance;
					});
					var index = 0; //index of the current closest number
					if (nearbyEntries[0].dataSeries.type === "rangeColumn" || nearbyEntries[0].dataSeries.type === "rangeArea" || nearbyEntries[0].dataSeries.type === "error" || nearbyEntries[0].dataSeries.type === "rangeSplineArea"
						|| nearbyEntries[0].dataSeries.type === "candlestick" || nearbyEntries[0].dataSeries.type === "ohlc" || nearbyEntries[0].dataSeries.type === "boxAndWhisker") {
						var smallestDiff = Math.abs(mouseY - this.parent.convertValueToPixel(nearbyEntries[0].dataPoint.y[0]));
						var currentDiff = 0;

						for (var j = 0; j < nearbyEntries.length; j++) {
							if (nearbyEntries[j].dataPoint.y && nearbyEntries[j].dataPoint.y.length) {
								for (var k = 0; k < nearbyEntries[j].dataPoint.y.length; k++) {
									currentDiff = Math.abs(mouseY - this.parent.convertValueToPixel(nearbyEntries[j].dataPoint.y[k]));
									if (currentDiff < smallestDiff) {
										smallestDiff = currentDiff;
										index = j;
									}
								}
							}
							else {
								currentDiff = Math.abs(mouseY - this.parent.convertValueToPixel(nearbyEntries[j].dataPoint.y));
								if (currentDiff < smallestDiff) {
									smallestDiff = currentDiff;
									index = j;
								}
							}
						}
					}
					else if (nearbyEntries[0].dataSeries.type === "stackedColumn" || nearbyEntries[0].dataSeries.type === "stackedArea") {
						var smallestDiff = Math.abs(mouseY - this.parent.convertValueToPixel(nearbyEntries[0].dataPoint.y));
						var currentDiff = 0, cumulativeY = 0;

						for (var j = 0; j < nearbyEntries.length; j++) {
							if (nearbyEntries[j].dataPoint.y && nearbyEntries[j].dataPoint.y.length) {
								for (var k = 0; k < nearbyEntries[j].dataPoint.y.length; k++) {
									currentDiff = Math.abs(mouseY - this.parent.convertValueToPixel(nearbyEntries[j].dataPoint.y[k]));
									if (currentDiff < smallestDiff) {
										smallestDiff = currentDiff;
										index = j;
									}
								}
							}
							else {
								cumulativeY += nearbyEntries[j].dataPoint.y;

								currentDiff = Math.abs(mouseY - this.parent.convertValueToPixel(cumulativeY));

								if (currentDiff < smallestDiff) {
									smallestDiff = currentDiff;
									index = j;
								}
							}
						}
					}
					else if (nearbyEntries[0].dataSeries.type === "stackedColumn100" || nearbyEntries[0].dataSeries.type === "stackedArea100") {
						var smallestDiff = Math.abs(mouseY - this.parent.convertValueToPixel(nearbyEntries[0].dataPoint.y));
						var currentDiff = 0, cumulativeY = 0, yPercent = 0;

						for (var j = 0; j < nearbyEntries.length; j++) {
							if (nearbyEntries[j].dataPoint.y && nearbyEntries[j].dataPoint.y.length) {
								for (var k = 0; k < nearbyEntries[j].dataPoint.y.length; k++) {
									currentDiff = Math.abs(mouseY - this.parent.convertValueToPixel(nearbyEntries[j].dataPoint.y[k]));
									if (currentDiff < smallestDiff) {
										smallestDiff = currentDiff;
										index = j;
									}
								}
							}
							else {
								cumulativeY += nearbyEntries[j].dataPoint.y;
								var dataPointX = nearbyEntries[j].dataPoint.x.getTime ? nearbyEntries[j].dataPoint.x.getTime() : nearbyEntries[j].dataPoint.x;
								yPercent = cumulativeY / nearbyEntries[j].dataSeries.plotUnit.dataPointYSums[dataPointX] * 100;

								currentDiff = Math.abs(mouseY - this.parent.convertValueToPixel(yPercent));

								if (currentDiff < smallestDiff) {
									smallestDiff = currentDiff;
									index = j;
								}
							}
						}
					}
					else {
						var smallestDiff = Math.abs(mouseY - this.parent.convertValueToPixel(nearbyEntries[0].dataPoint.y));
						var currentDiff = 0;

						for (var j = 0; j < nearbyEntries.length; j++) {
							if (nearbyEntries[j].dataPoint.y && nearbyEntries[j].dataPoint.y.length) {
								for (var k = 0; k < nearbyEntries[j].dataPoint.y.length; k++) {
									currentDiff = Math.abs(mouseY - this.parent.convertValueToPixel(nearbyEntries[j].dataPoint.y[k]));
									if (currentDiff < smallestDiff) {
										smallestDiff = currentDiff;
										index = j;
									}
								}
							}
							else {
								currentDiff = Math.abs(mouseY - this.parent.convertValueToPixel(nearbyEntries[j].dataPoint.y));
								if (currentDiff < smallestDiff) {
									smallestDiff = currentDiff;
									index = j;
								}
							}
						}
					}

					var closest = nearbyEntries[index];
					var dpsIndex = 0; //index of the current closest dataPoint

					if (this.parent.dataSeries[index].type === "rangeColumn" || this.parent.dataSeries[index].type === "rangeArea" || this.parent.dataSeries[index].type === "error" || this.parent.dataSeries[index].type === "rangeSplineArea"
						|| this.parent.dataSeries[index].type === "candlestick" || this.parent.dataSeries[index].type === "ohlc" || this.parent.dataSeries[index].type === "boxAndWhisker") {
						var smallestDiff = Math.abs(mouseY - this.parent.convertValueToPixel(closest.dataPoint.y[0]));
						var currentDiff = 0;

						for (var j = 0; j < closest.dataPoint.y.length; j++) {
							currentDiff = Math.abs(mouseY - this.parent.convertValueToPixel(closest.dataPoint.y[j]));
							if (currentDiff < smallestDiff) {
								smallestDiff = currentDiff;
								dpsIndex = j;
							}
						}
						stripY = (overlaidCanvasCtx.lineWidth % 2 === 1) ? (this.parent.convertValueToPixel(closest.dataPoint.y[dpsIndex]) << 0) + .5 : (this.parent.convertValueToPixel(closest.dataPoint.y[dpsIndex]) << 0);

						textBlock.text = this.labelFormatter ? this.labelFormatter({ chart: this.chart, axis: this.parent.options, crosshair: this.options, value: closest.dataPoint.y[dpsIndex] }) : !isNullOrUndefined(this.options.label) ? this.label : numberFormat(closest.dataPoint.y[dpsIndex], this.valueFormatString, this.chart._cultureInfo);
					}
					else if (this.parent.dataSeries[index].type === "stackedColumn" || this.parent.dataSeries[index].type === "stackedArea") {
						var smallestDiff = Math.abs(mouseY - this.parent.convertValueToPixel(nearbyEntries[0].dataPoint.y));
						var currentDiff = 0, cumulativeY = 0;

						for (var j = index; j >= 0; j--) {

							cumulativeY += nearbyEntries[j].dataPoint.y;
							currentDiff = Math.abs(mouseY - this.parent.convertValueToPixel(cumulativeY));

							if (currentDiff < smallestDiff) {
								smallestDiff = currentDiff;
								dpsIndex = j;
							}
						}
						stripY = (overlaidCanvasCtx.lineWidth % 2 === 1) ? (this.parent.convertValueToPixel(cumulativeY) << 0) + .5 : (this.parent.convertValueToPixel(cumulativeY) << 0);

						textBlock.text = this.labelFormatter ? this.labelFormatter({ chart: this.chart, axis: this.parent.options, crosshair: this.options, value: closest.dataPoint.y }) : !isNullOrUndefined(this.options.label) ? this.label : numberFormat(closest.dataPoint.y, this.valueFormatString, this.chart._cultureInfo);
					}
					else if (this.parent.dataSeries[index].type === "stackedColumn100" || this.parent.dataSeries[index].type === "stackedArea100") {
						var smallestDiff = Math.abs(mouseY - this.parent.convertValueToPixel(nearbyEntries[0].dataPoint.y));
						var currentDiff = 0, cumulativeY = 0;

						for (var j = index; j >= 0; j--) {

							cumulativeY += nearbyEntries[j].dataPoint.y;
							var dataPointX = nearbyEntries[j].dataPoint.x.getTime ? nearbyEntries[j].dataPoint.x.getTime() : nearbyEntries[j].dataPoint.x;
							yPercent = cumulativeY / nearbyEntries[j].dataSeries.plotUnit.dataPointYSums[dataPointX] * 100;
							currentDiff = Math.abs(mouseY - this.parent.convertValueToPixel(yPercent));

							if (currentDiff < smallestDiff) {
								smallestDiff = currentDiff;
								dpsIndex = j;
							}
						}
						stripY = (overlaidCanvasCtx.lineWidth % 2 === 1) ? (this.parent.convertValueToPixel(yPercent) << 0) + .5 : (this.parent.convertValueToPixel(yPercent) << 0);
						textBlock.text = this.labelFormatter ? this.labelFormatter({ chart: this.chart, axis: this.parent.options, crosshair: this.options, value: yPercent }) : !isNullOrUndefined(this.options.label) ? this.label : numberFormat(yPercent, this.valueFormatString, this.chart._cultureInfo);
					}
					else if (this.parent.dataSeries[index].type === "waterfall") {
						stripY = (overlaidCanvasCtx.lineWidth % 2 === 1) ? (this.parent.convertValueToPixel(closest.dataSeries.dataPointEOs[closest.index].cumulativeSum) << 0) + .5 : (this.parent.convertValueToPixel(closest.dataSeries.dataPointEOs[closest.index].cumulativeSum) << 0);

						textBlock.text = this.labelFormatter ? this.labelFormatter({ chart: this.chart, axis: this.parent.options, crosshair: this.options, value: closest.dataSeries.dataPointEOs[closest.index].cumulativeSum }) : !isNullOrUndefined(this.options.label) ? this.label : numberFormat(closest.dataSeries.dataPointEOs[closest.index].cumulativeSum, this.valueFormatString, this.chart._cultureInfo);
					}
					else {
						stripY = (overlaidCanvasCtx.lineWidth % 2 === 1) ? (this.parent.convertValueToPixel(closest.dataPoint.y) << 0) + .5 : (this.parent.convertValueToPixel(closest.dataPoint.y) << 0);

						textBlock.text = this.labelFormatter ? this.labelFormatter({ chart: this.chart, axis: this.parent.options, crosshair: this.options, value: closest.dataPoint.y }) : !isNullOrUndefined(this.options.label) ? this.label : numberFormat(closest.dataPoint.y, this.valueFormatString, this.chart._cultureInfo);
					}

					y1 = y2 = stripY;
					x1 = this.chart.plotArea.x1;
					x2 = this.chart.plotArea.x2;

					this.bounds = { x1: x1, y1: y1 - lineWidth / 2, x2: x2, y2: y2 + lineWidth / 2 };

					textBlock.y = y2 + textBlock.fontSize / 2 - (textBlock.measureText().height / 2) + 2;
					if (textBlock.y - textBlock.fontSize / 2 < this.chart.bounds.y1) {
						textBlock.y = this.chart.bounds.y1 + (textBlock.fontSize / 2) + 2;
					}
					else if (textBlock.y + (textBlock.measureText().height) - textBlock.fontSize / 2 > this.chart.bounds.y2) {
						textBlock.y = this.chart.bounds.y2 - textBlock.measureText().height + textBlock.fontSize / 2;
					}

					if (this.parent._position === "left") {
						textBlock.x = this.parent.lineCoordinates.x2 - (textBlock.measureText().width);
					}
					else if (this.parent._position === "right") {
						textBlock.x = this.parent.lineCoordinates.x2;
					}
				}

				nearbyEntries = null;
			}

			if (this.parent._position === "bottom" || this.parent._position === "top") {
				if (x1 >= this.parent.convertValueToPixel(this.parent.viewportMinimum) && x2 <= this.parent.convertValueToPixel(this.parent.viewportMaximum)) {
					if (lineWidth > 0) {
						overlaidCanvasCtx.moveTo(x1, y1);
						overlaidCanvasCtx.lineTo(x2, y2);
						overlaidCanvasCtx.stroke();
					}
					overlaidCanvasCtx.restore();

					if (!isNullOrUndefined(textBlock.text) && (typeof textBlock.text.valueOf() === "number" || textBlock.text.length > 0))
						textBlock.render(true);
				}
			}

			if (this.parent._position === "left" || this.parent._position === "right") {
				if (y2 >= this.parent.convertValueToPixel(this.parent.viewportMaximum) && y1 <= this.parent.convertValueToPixel(this.parent.viewportMinimum)) {
					if (lineWidth > 0) {
						overlaidCanvasCtx.moveTo(x1, y1);
						overlaidCanvasCtx.lineTo(x2, y2);
						overlaidCanvasCtx.stroke();
					}
					overlaidCanvasCtx.restore();

					if (!isNullOrUndefined(textBlock.text) && (typeof textBlock.text.valueOf() === "number" || textBlock.text.length > 0))
						textBlock.render(true);
				}
			}
		}
		else {

			if (this.parent._position === "bottom" || this.parent._position === "top") {
				stripX = (overlaidCanvasCtx.lineWidth % 2 === 1) ? (mouseX << 0) + .5 : (mouseX << 0);

				x1 = x2 = stripX;
				y1 = this.chart.plotArea.y1;
				y2 = this.chart.plotArea.y2;

				this.bounds = { x1: x1 - lineWidth / 2, y1: y1, x2: x2 + lineWidth / 2, y2: y2 };
			}

			else if (this.parent._position === "left" || this.parent._position === "right") {
				stripY = (overlaidCanvasCtx.lineWidth % 2 === 1) ? (mouseY << 0) + .5 : (mouseY << 0);

				y1 = y2 = stripY;
				x1 = this.chart.plotArea.x1;
				x2 = this.chart.plotArea.x2;

				this.bounds = { x1: x1, y1: y1 - lineWidth / 2, x2: x2, y2: y2 + lineWidth / 2 };
			}

			if (this.chart.plotInfo.axisPlacement === "xySwapped") {
				if (this.parent._position === "left" || this.parent._position === "right") {
					var hasAllLabels = false;

					if (this.parent.labels) {
						var tempInterval = Math.ceil(this.parent.interval);
						var tempStartPoint = 0;

						for (var j = tempStartPoint; j < this.parent.viewportMaximum; j += tempInterval) {
							if (this.parent.labels[j]) {
								hasAllLabels = true;
							} else {
								hasAllLabels = false;
								break;
							}
						}
					}

					if (hasAllLabels) {
						if (this.parent.type === "axisX") {
							x = this.parent.convertPixelToValue({ y: mouseY });

							var entry = null;
							for (var i = 0; i < this.parent.dataSeries.length; i++) {
								entry = this.parent.dataSeries[i].getDataPointAtX(x, true);

								if (entry && entry.index >= 0) {
									textBlock.text = this.labelFormatter ? this.labelFormatter({ chart: this.chart, axis: this.parent.options, crosshair: this.options, value: this.parent.convertPixelToValue(mouseX) }) : !isNullOrUndefined(this.options.label) ? this.label : entry.dataPoint.label;
								}
							}
						}
					}

					else if (this.parent.valueType === "dateTime") {
						textBlock.text = this.labelFormatter ? this.labelFormatter({ chart: this.chart, axis: this.parent.options, crosshair: this.options, value: (this.parent.convertPixelToValue(mouseY)) }) : !isNullOrUndefined(this.options.label) ? this.label : dateFormat((this.parent.convertPixelToValue(mouseY)), this.valueFormatString, this.chart._cultureInfo);
					}
					else if (this.parent.valueType === "number") {
						textBlock.text = this.labelFormatter ? this.labelFormatter({ chart: this.chart, axis: this.parent.options, crosshair: this.options, value: this.parent.convertPixelToValue(mouseY) }) : !isNullOrUndefined(this.options.label) ? this.label : numberFormat(this.parent.convertPixelToValue(mouseY), this.valueFormatString, this.chart._cultureInfo);
					}
					textBlock.y = mouseY + textBlock.fontSize / 2 - (textBlock.measureText().height / 2) + 2;
					if (textBlock.y - textBlock.fontSize / 2 < this.chart.bounds.y1) {
						textBlock.y = this.chart.bounds.y1 + (textBlock.fontSize / 2) + 2;
					}
					else if (textBlock.y + (textBlock.measureText().height) - textBlock.fontSize / 2 > this.chart.bounds.y2) {
						textBlock.y = this.chart.bounds.y2 - textBlock.measureText().height + textBlock.fontSize / 2;
					}

					if (this.parent._position === "left") {
						textBlock.x = this.parent.lineCoordinates.x1 - (textBlock.measureText().width);
					}
					else if (this.parent._position === "right") {
						textBlock.x = this.parent.lineCoordinates.x2;
					}

				}
				else if (this.parent._position === "bottom" || this.parent._position === "top") {
					textBlock.text = this.labelFormatter ? this.labelFormatter({ chart: this.chart, axis: this.parent.options, crosshair: this.options, value: this.parent.convertPixelToValue(mouseX) }) : !isNullOrUndefined(this.options.label) ? this.label : numberFormat(this.parent.convertPixelToValue(mouseX), this.valueFormatString, this.chart._cultureInfo);

					textBlock.x = x1 - (textBlock.measureText().width / 2);
					if ((textBlock.x + textBlock.width) > this.chart.bounds.x2) {
						textBlock.x = this.chart.bounds.x2 - textBlock.width;
					}
					if (textBlock.x < this.chart.bounds.x1) {
						textBlock.x = this.chart.bounds.x1;
					}

					if (this.parent._position === "bottom")
						textBlock.y = this.parent.lineCoordinates.y2 + textBlock.fontSize / 2 + 2;
					if (this.parent._position === "top")
						textBlock.y = this.parent.lineCoordinates.y1 - textBlock.height + textBlock.fontSize / 2 + 2;

				}
			}
			else {
				if (this.parent._position === "bottom" || this.parent._position === "top") {
					var hasAllLabels = false;
					var text = "";

					if (this.parent.labels) {
						var tempInterval = Math.ceil(this.parent.interval);
						var tempStartPoint = 0;

						for (var j = tempStartPoint; j < this.parent.viewportMaximum; j += tempInterval) {
							if (this.parent.labels[j]) {
								hasAllLabels = true;
							} else {
								hasAllLabels = false;
								break;
							}
						}
					}

					if (hasAllLabels) {
						if (this.parent.type === "axisX") {
							x = this.parent.convertPixelToValue({ x: mouseX });
							var entry = null;
							for (var i = 0; i < this.parent.dataSeries.length; i++) {
								entry = this.parent.dataSeries[i].getDataPointAtX(x, true);

								if (entry && entry.index >= 0) {
									textBlock.text = this.labelFormatter ? this.labelFormatter({ chart: this.chart, axis: this.parent.options, crosshair: this.options, value: this.parent.convertPixelToValue(mouseX) }) : !isNullOrUndefined(this.options.label) ? this.label : entry.dataPoint.label;
								}
							}
						}
					}

					else if (this.parent.valueType === "dateTime") {
						textBlock.text = this.labelFormatter ? this.labelFormatter({ chart: this.chart, axis: this.parent.options, crosshair: this.options, value: (this.parent.convertPixelToValue(mouseX)) }) : !isNullOrUndefined(this.options.label) ? this.label : dateFormat((this.parent.convertPixelToValue(mouseX)), this.valueFormatString, this.chart._cultureInfo);
					}
					else if (this.parent.valueType === "number") {
						textBlock.text = this.labelFormatter ? this.labelFormatter({ chart: this.chart, axis: this.parent.options, crosshair: this.options, value: this.parent.dataSeries.length > 0 ? this.parent.convertPixelToValue(mouseX) : "" }) : !isNullOrUndefined(this.options.label) ? this.label : numberFormat(this.parent.convertPixelToValue(mouseX), this.valueFormatString, this.chart._cultureInfo);
					}

					textBlock.x = x1 - (textBlock.measureText().width / 2);
					if ((textBlock.x + textBlock.width) > this.chart.bounds.x2) {
						textBlock.x = this.chart.bounds.x2 - textBlock.width;
					}
					if (textBlock.x < this.chart.bounds.x1) {
						textBlock.x = this.chart.bounds.x1;
					}

					if (this.parent._position === "bottom")
						textBlock.y = this.parent.lineCoordinates.y2 + textBlock.fontSize / 2 + 2;
					else if (this.parent._position === "top")
						textBlock.y = this.parent.lineCoordinates.y1 - textBlock.height + textBlock.fontSize / 2 + 2;

				}
				else if (this.parent._position === "left" || this.parent._position === "right") {
					textBlock.text = this.labelFormatter ? this.labelFormatter({ chart: this.chart, axis: this.parent.options, crosshair: this.options, value: this.parent.convertPixelToValue(mouseY) }) : !isNullOrUndefined(this.options.label) ? this.label : numberFormat(this.parent.convertPixelToValue(mouseY), this.valueFormatString, this.chart._cultureInfo);
					textBlock.y = mouseY + textBlock.fontSize / 2 - (textBlock.measureText().height / 2) + 2;
					if (textBlock.y - textBlock.fontSize / 2 < this.chart.bounds.y1) {
						textBlock.y = this.chart.bounds.y1 + (textBlock.fontSize / 2) + 2;
					}
					else if (textBlock.y + (textBlock.measureText().height) - textBlock.fontSize / 2 > this.chart.bounds.y2) {
						textBlock.y = this.chart.bounds.y2 - textBlock.measureText().height + textBlock.fontSize / 2;
					}

					if (this.parent._position === "left") {
						textBlock.x = this.parent.lineCoordinates.x2 - (textBlock.measureText().width);
					}
					else if (this.parent._position === "right") {
						textBlock.x = this.parent.lineCoordinates.x2;
					}
				}
			}

			if (lineWidth > 0) {
				overlaidCanvasCtx.moveTo(x1, y1);
				overlaidCanvasCtx.lineTo(x2, y2);
				overlaidCanvasCtx.stroke();
			}
			overlaidCanvasCtx.restore();

			if (!isNullOrUndefined(textBlock.text) && (typeof textBlock.text.valueOf() === "number" || textBlock.text.length > 0))
				textBlock.render(true);
		}

		overlaidCanvasCtx.globalAlpha = oldGlobalAlpha;
	}

	//#endregion Crosshair

	//#region ToolTip

	function ToolTip(chart, options) {
		ToolTip.base.constructor.call(this, "ToolTip", "toolTip", options, null, chart);

		this.chart = chart;
		this.canvas = chart.canvas;
		this.ctx = this.chart.ctx;
		this.currentSeriesIndex = -1;
		this.currentDataPointIndex = -1;
		this._timerId = 0;
		this._prevX = NaN;
		this._prevY = NaN;

		this.containerTransitionDuration = 0.1;	//For Mozilla this value can change on how quickly the user is moving the mouse - in order to fix postition update delays.	
		this.mozContainerTransition = this.getContainerTransition(this.containerTransitionDuration);

		this.optionsName = "toolTip";

		this._initialize();
	}
	extend(ToolTip, CanvasJSObject);

	ToolTip.prototype._initialize = function () {

		if (this.enabled) {
			this.container = document.createElement("div");
			this.container.setAttribute("class", "canvasjs-chart-tooltip");
			this.container.style.position = "absolute";
			this.container.style.height = "auto";
			this.container.style.boxShadow = "1px 1px 2px 2px rgba(0,0,0,0.1)";
			this.container.style.zIndex = "1000";
			this.container.style.pointerEvents = "none";
			this.container.style.display = "none";
			//this.container.style.whiteSpace = "no-wrap";


			var toolTipHtml = "<div style=\" width: auto;";
			toolTipHtml += "height: auto;";
			toolTipHtml += "min-width: 50px;";
			toolTipHtml += "line-height: auto;";
			toolTipHtml += "margin: 0px 0px 0px 0px;";
			toolTipHtml += "padding: 5px;";
			toolTipHtml += "font-family: Calibri, Arial, Georgia, serif;";
			toolTipHtml += "font-weight: normal;";
			toolTipHtml += "font-style: " + (isCanvasSupported ? "italic;" : "normal;");
			toolTipHtml += "font-size: 14px;";
			toolTipHtml += "color: #000000;";
			toolTipHtml += "text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);";
			toolTipHtml += "text-align: left;";
			toolTipHtml += "border: 2px solid gray;";

			//Older browsers like IE8- don't support alpha values
			toolTipHtml += isCanvasSupported ? "background: rgba(255,255,255,.9);" : "background: rgb(255,255,255);";

			toolTipHtml += "text-indent: 0px;";
			toolTipHtml += "white-space: nowrap;";
			//toolTipHtml += "pointer-events:none;";
			toolTipHtml += "border-radius: 5px;";

			//Disable Text Selection
			toolTipHtml += "-moz-user-select:none;";
			toolTipHtml += "-khtml-user-select: none;";
			toolTipHtml += "-webkit-user-select: none;";
			toolTipHtml += "-ms-user-select: none;";
			toolTipHtml += "user-select: none;";

			//toolTipHtml += "opacity: 0;";
			//toolTipHtml += "filter: progid: DXImageTransform.Microsoft.gradient(GradientType = 0, startColorstr = '#4cffffff', endColorstr = '#4cffffff');";

			if (!isCanvasSupported) {
				//toolTipHtml += "-ms-filter:'progid:DXImageTransform.Microsoft.Alpha(Opacity=90)'";
				//-ms-filter: "progid:DXImageTransform.Microsoft.Shadow(Strength=4, Direction=135, Color='#000000')";
				/* For IE 5.5 - 7 */
				toolTipHtml += "filter: alpha(opacity = 90);";
				toolTipHtml += "filter: progid:DXImageTransform.Microsoft.Shadow(Strength=3, Direction=135, Color='#666666');";
			}

			toolTipHtml += "} \"> Sample Tooltip</div>";

			this.container.innerHTML = toolTipHtml;
			this.contentDiv = this.container.firstChild;


			this.container.style.borderRadius = this.contentDiv.style.borderRadius;
			this.chart._canvasJSContainer.appendChild(this.container);
		}
	}

	ToolTip.prototype.mouseMoveHandler = function (x, y) {

		if (!(this._lastUpdated && (new Date().getTime() - this._lastUpdated) < 4)) {
			this._lastUpdated = new Date().getTime();
			this.chart.resetOverlayedCanvas();
			this._updateToolTip(x, y);
		}
	}

	ToolTip.prototype._updateToolTip = function (mouseX, mouseY, closest) {
		//return;

		//if (typeof (closest) === "undefined")
		//	window.console.log("Canvas: ", mouseX, mouseY);
		closest = typeof (closest) === "undefined" ? true : closest;

		if (!this.container)
			this._initialize();

		if (!this.enabled) {
			this.hide();
		}

		if (this.chart.disableToolTip) // Disabled during animation, etc
			return;

		if (typeof (mouseX) === "undefined" || typeof (mouseY) === "undefined") {
			if (isNaN(this._prevX) || isNaN(this._prevY))
				return;
			else {
				mouseX = this._prevX;
				mouseY = this._prevY;
			}
		} else {
			this._prevX = mouseX;
			this._prevY = mouseY;
		}


		var dataPoint = null;
		var dataSeries = null;
		var toolTipContent = "";
		var entries = [];
		var toolTipRight;
		var toolTipBottom;
		var x = 0;

		if (this.shared && this.enabled && this.chart.plotInfo.axisPlacement !== "none") {
			// && this.chart.plotInfo.axisPlacement !== "none"

			if (this.chart.plotInfo.axisPlacement === "xySwapped") {
				var nearbyEntries = [];
				if (this.chart.axisX) {
					for (var k = 0; k < this.chart.axisX.length; k++) {
						x = this.chart.axisX[k].convertPixelToValue({ y: mouseY });
						var entry = null;
						for (var i = 0; i < this.chart.axisX[k].dataSeries.length; i++) {
							entry = this.chart.axisX[k].dataSeries[i].getDataPointAtX(x, closest);

							if (entry && entry.index >= 0) {
								entry.dataSeries = this.chart.axisX[k].dataSeries[i];

								if (entry.dataPoint.y !== null)
									nearbyEntries.push(entry);
							}
						}
						entry = null;
					}
				}
				if (this.chart.axisX2) {
					for (var k = 0; k < this.chart.axisX2.length; k++) {
						x = this.chart.axisX2[k].convertPixelToValue({ y: mouseY });
						var entry = null;
						for (var i = 0; i < this.chart.axisX2[k].dataSeries.length; i++) {
							entry = this.chart.axisX2[k].dataSeries[i].getDataPointAtX(x, closest);

							if (entry && entry.index >= 0) {
								entry.dataSeries = this.chart.axisX2[k].dataSeries[i];

								if (entry.dataPoint.y !== null)
									nearbyEntries.push(entry);
							}
						}
						entry = null;
					}
				}
			}
			else {
				var nearbyEntries = [];
				if (this.chart.axisX) {
					for (var k = 0; k < this.chart.axisX.length; k++) {
						x = this.chart.axisX[k].convertPixelToValue({ x: mouseX });
						var entry = null;
						for (var i = 0; i < this.chart.axisX[k].dataSeries.length; i++) {
							entry = this.chart.axisX[k].dataSeries[i].getDataPointAtX(x, closest);

							if (entry && entry.index >= 0) {
								entry.dataSeries = this.chart.axisX[k].dataSeries[i];

								if (entry.dataPoint.y !== null)
									nearbyEntries.push(entry);
							}
						}
					}
				}
				if (this.chart.axisX2) {
					for (var k = 0; k < this.chart.axisX2.length; k++) {
						x = this.chart.axisX2[k].convertPixelToValue({ x: mouseX });
						var entry = null;
						for (var i = 0; i < this.chart.axisX2[k].dataSeries.length; i++) {
							entry = this.chart.axisX2[k].dataSeries[i].getDataPointAtX(x, closest);

							if (entry && entry.index >= 0) {
								entry.dataSeries = this.chart.axisX2[k].dataSeries[i];

								if (entry.dataPoint.y !== null)
									nearbyEntries.push(entry);
							}
						}
					}
				}
			}

			if (nearbyEntries.length === 0)
				return;

			nearbyEntries.sort(function (entry1, entry2) {
				return entry1.distance - entry2.distance;
			});


			var closest = nearbyEntries[0];

			for (i = 0; i < nearbyEntries.length; i++) {

				if (nearbyEntries[i].dataPoint.x.valueOf() === closest.dataPoint.x.valueOf())
					entries.push(nearbyEntries[i]);
			}

			nearbyEntries = null;

		} else {

			var dataPointInfo = this.chart.getDataPointAtXY(mouseX, mouseY, closest);
			//dataPointInfo = null;

			if (dataPointInfo) {
				this.currentDataPointIndex = dataPointInfo.dataPointIndex;
				this.currentSeriesIndex = dataPointInfo.dataSeries.index;
			} else if (isCanvasSupported) {

				var id = getObjectId(mouseX, mouseY, this.chart._eventManager.ghostCtx);
				if (id > 0 && typeof this.chart._eventManager.objectMap[id] !== "undefined") {//DataPoint/DataSeries event
					var eventObject = this.chart._eventManager.objectMap[id];

					if (eventObject.objectType === "legendItem")
						return;

					//if (this.currentSeriesIndex === eventObject.dataSeriesIndex && this.currentDataPointIndex === eventObject.dataPointIndex)
					//  return;
					//else {
					this.currentSeriesIndex = eventObject.dataSeriesIndex;
					this.currentDataPointIndex = eventObject.dataPointIndex >= 0 ? eventObject.dataPointIndex : -1;
					//}

					//window.console.log("id: " + id + "; hex: " + intToHexColorString(id));
				} else
					this.currentDataPointIndex = -1;

			} else
				this.currentDataPointIndex = -1;


			if (this.currentSeriesIndex >= 0) {

				dataSeries = this.chart.data[this.currentSeriesIndex];

				var entry = {
				};

				if (this.currentDataPointIndex >= 0) {
					dataPoint = dataSeries.dataPoints[this.currentDataPointIndex];

					entry.dataSeries = dataSeries;
					entry.dataPoint = dataPoint;
					entry.index = this.currentDataPointIndex;
					entry.distance = Math.abs(dataPoint.x - x);

					if (dataSeries.type === "waterfall") {
						entry.cumulativeSumYStartValue = dataSeries.dataPointEOs[this.currentDataPointIndex].cumulativeSumYStartValue;
						entry.cumulativeSum = dataSeries.dataPointEOs[this.currentDataPointIndex].cumulativeSum;
					}

				} else if (this.enabled && (dataSeries.type === "line" || dataSeries.type === "stepLine" || dataSeries.type === "spline" || dataSeries.type === "area" || dataSeries.type === "stepArea"
					|| dataSeries.type === "splineArea" || dataSeries.type === "stackedArea" || dataSeries.type === "stackedArea100"
					|| dataSeries.type === "rangeArea" || dataSeries.type === "rangeSplineArea"
					|| dataSeries.type === "candlestick" || dataSeries.type === "ohlc" || dataSeries.type === "boxAndWhisker")) {

					var x = dataSeries.axisX.convertPixelToValue({ x: mouseX });
					entry = dataSeries.getDataPointAtX(x, closest);

					entry.dataSeries = dataSeries;
					this.currentDataPointIndex = entry.index;
					dataPoint = entry.dataPoint;
				} else {
					//this.hide();
					return;
				}

				if (!isNullOrUndefined(entry.dataPoint.y)) {
					if (entry.dataSeries.axisY) {
						if (entry.dataPoint.y.length > 0) {
							var unboundToViewport = 0;
							for (var i = 0; i < entry.dataPoint.y.length; i++)
								if (entry.dataPoint.y[i] < entry.dataSeries.axisY.viewportMinimum)
									unboundToViewport--;
								else if (entry.dataPoint.y[i] > entry.dataSeries.axisY.viewportMaximum)
									unboundToViewport++;
							if (unboundToViewport < entry.dataPoint.y.length && unboundToViewport > -entry.dataPoint.y.length)
								entries.push(entry);
						} else {
							if (dataSeries.type === "column" || dataSeries.type === "bar") {
								if (entry.dataPoint.y < 0 /*use entry.dataPoint.y < offset when it will be introduced*/) {
									if (entry.dataSeries.axisY.viewportMinimum < 0 && entry.dataSeries.axisY.viewportMaximum >= entry.dataPoint.y)
										entries.push(entry);
								}
								else if (entry.dataSeries.axisY.viewportMinimum <= entry.dataPoint.y && entry.dataSeries.axisY.viewportMaximum >= 0) // If entry.dataPoint.y >= 0
									entries.push(entry);
							}
							else if (dataSeries.type === "bubble") {
								var radius = this.chart._eventManager.objectMap[dataSeries.dataPointIds[entry.index]].size / 2;
								if (entry.dataPoint.y >= entry.dataSeries.axisY.viewportMinimum - radius && entry.dataPoint.y <= entry.dataSeries.axisY.viewportMaximum + radius)
									entries.push(entry);
							}
							else if (dataSeries.type === "waterfall") {
								var unboundToViewport = 0;

								if (entry.cumulativeSumYStartValue < entry.dataSeries.axisY.viewportMinimum)
									unboundToViewport--;
								else if (entry.cumulativeSumYStartValue > entry.dataSeries.axisY.viewportMaximum)
									unboundToViewport++;

								if (entry.cumulativeSum < entry.dataSeries.axisY.viewportMinimum)
									unboundToViewport--;
								else if (entry.cumulativeSum > entry.dataSeries.axisY.viewportMaximum)
									unboundToViewport++;

								if (unboundToViewport < 2 && unboundToViewport > -2)
									entries.push(entry);
							}
							else if (entry.dataSeries.type.indexOf("100") >= 0 || dataSeries.type === "stackedColumn" || dataSeries.type === "stackedBar" || (entry.dataPoint.y >= entry.dataSeries.axisY.viewportMinimum && entry.dataPoint.y <= entry.dataSeries.axisY.viewportMaximum))
								entries.push(entry);

						}
					} else
						entries.push(entry);
				}

			}
		}


		if (entries.length > 0) {

			this.highlightObjects(entries);

			if (this.enabled) {

				var toolTipInnerHtml = "";

				toolTipInnerHtml = this.getToolTipInnerHTML({ entries: entries });

				if (toolTipInnerHtml !== null) {
					this.contentDiv.innerHTML = toolTipInnerHtml;

					var previouslyHidden = false;
					if (this.container.style.display === "none") {
						previouslyHidden = true;
						this.container.style.display = "block";
					}

					try {
						this.contentDiv.style.background = this.backgroundColor ? this.backgroundColor : isCanvasSupported ? "rgba(255,255,255,.9)" : "rgb(255,255,255)";

						if (entries[0].dataSeries.type === "waterfall")
							this.borderColor = this.contentDiv.style.borderRightColor = this.contentDiv.style.borderLeftColor = this.contentDiv.style.borderColor = this.options.borderColor ? this.options.borderColor : entries[0].dataPoint.color ? entries[0].dataPoint.color : entries[0].dataPoint.y > -1 ? entries[0].dataSeries.risingColor : entries[0].dataSeries.fallingColor;
						else if (entries[0].dataSeries.type === "error")
							this.borderColor = this.contentDiv.style.borderRightColor = this.contentDiv.style.borderLeftColor = this.contentDiv.style.borderColor = this.options.borderColor ? this.options.borderColor : entries[0].dataSeries.color ? entries[0].dataSeries.color : entries[0].dataSeries._colorSet[dataSeries.index % entries[0].dataSeries._colorSet.length];
						else
							this.borderColor = this.contentDiv.style.borderRightColor = this.contentDiv.style.borderLeftColor = this.contentDiv.style.borderColor = this.options.borderColor ? this.options.borderColor : entries[0].dataPoint.color ? entries[0].dataPoint.color : entries[0].dataSeries.color ? entries[0].dataSeries.color : entries[0].dataSeries._colorSet[entries[0].index % entries[0].dataSeries._colorSet.length];

						this.contentDiv.style.borderWidth = (this.borderThickness || this.borderThickness === 0) ? this.borderThickness + "px" : 2 + "px";

						this.contentDiv.style.borderRadius = (this.cornerRadius || this.cornerRadius === 0) ? this.cornerRadius + "px" : 5 + "px";
						this.container.style.borderRadius = this.contentDiv.style.borderRadius;


						this.contentDiv.style.fontSize = (this.fontSize || this.fontSize === 0) ? this.fontSize + "px" : 14 + "px";
						this.contentDiv.style.color = this.fontColor ? this.fontColor : "#000000";
						this.contentDiv.style.fontFamily = this.fontFamily ? this.fontFamily : "Calibri, Arial, Georgia, serif;";
						this.contentDiv.style.fontWeight = this.fontWeight ? this.fontWeight : "normal";
						this.contentDiv.style.fontStyle = this.fontStyle ? this.fontStyle : isCanvasSupported ? "italic" : "normal";

					} catch (e) {
					}
					var toolTipLeft;
					if (entries[0].dataSeries.type === "pie" || entries[0].dataSeries.type === "doughnut" || entries[0].dataSeries.type === "funnel" || entries[0].dataSeries.type === "pyramid" || entries[0].dataSeries.type === "bar" || entries[0].dataSeries.type === "rangeBar" || entries[0].dataSeries.type === "stackedBar" || entries[0].dataSeries.type === "stackedBar100") {
						toolTipLeft = mouseX - 10 - this.container.clientWidth;
					} else {
						toolTipLeft = entries[0].dataSeries.axisX.convertValueToPixel(entries[0].dataPoint.x) - this.container.clientWidth << 0;
						toolTipLeft -= 10;
					}


					if (toolTipLeft < 0) {
						toolTipLeft += this.container.clientWidth + 20;
					}

					if (toolTipLeft + this.container.clientWidth > Math.max(this.chart.container.clientWidth, this.chart.width))
						toolTipLeft = Math.max(0, Math.max(this.chart.container.clientWidth, this.chart.width) - this.container.clientWidth);


					if (entries.length === 1 && !this.shared && (entries[0].dataSeries.type === "line" || entries[0].dataSeries.type === "stepLine" || entries[0].dataSeries.type === "spline" || entries[0].dataSeries.type === "area" || entries[0].dataSeries.type === "stepArea" || entries[0].dataSeries.type === "splineArea" /*|| entries[0].dataSeries.type === "stackedArea" || entries[0].dataSeries.type === "stackedArea100"*/)) {
						//toolTipBottom = (entries[0].dataSeries.axisY.lineCoordinates.y2 - entries[0].dataSeries.axisY.lineCoordinates.height / Math.abs(entries[0].dataSeries.axisY.maximum - entries[0].dataSeries.axisY.viewportMinimum) * Math.abs(entries[0].dataPoint.y - entries[0].dataSeries.axisY.viewportMinimum) + .5) << 0;
						toolTipBottom = entries[0].dataSeries.axisY.convertValueToPixel(entries[0].dataPoint.y);
					} else if (entries[0].dataSeries.type === "bar" || entries[0].dataSeries.type === "rangeBar" || entries[0].dataSeries.type === "stackedBar" || entries[0].dataSeries.type === "stackedBar100") {
						//toolTipBottom = (entries[0].dataSeries.axisX.lineCoordinates.y2 - entries[0].dataSeries.axisX.lineCoordinates.height / Math.abs(entries[0].dataSeries.axisX.maximum - entries[0].dataSeries.axisX.viewportMinimum) * Math.abs(entries[0].dataPoint.x - entries[0].dataSeries.axisX.viewportMinimum) + .5) << 0;
						toolTipBottom = entries[0].dataSeries.axisX.convertValueToPixel(entries[0].dataPoint.x);
					}
					else {
						toolTipBottom = mouseY;
					}

					toolTipBottom = (-toolTipBottom + 10);

					if (toolTipBottom + this.container.clientHeight + 5 > 0) {
						toolTipBottom -= toolTipBottom + this.container.clientHeight + 5 - 0
					}

					this.fixMozTransitionDelay(toolTipLeft, toolTipBottom);


					if (!this.animationEnabled || previouslyHidden) {
						this.disableAnimation();
					}
					else {
						this.enableAnimation();
						this.container.style.MozTransition = this.mozContainerTransition;
					}

					this.container.style.left = toolTipLeft + "px";
					this.container.style.bottom = toolTipBottom + "px";

				} else {
					this.hide(false);
				}

			}

			//if (isDebugMode)
			//  console.log("searchX: " + x + " x: " + searchResult.dataPoint.x + "; y: " + searchResult.dataPoint.y + "; distance: " + searchResult.distance + "; steps: " + steps);
		}
	}

	ToolTip.prototype.highlightObjects = function (entries) {
		//if (!this.enabled)
		//	return;

		//this.chart.overlaidCanvasCtx.clearRect(0, 0, this.chart.overlaidCanvas.width, this.chart.overlaidCanvas.height);
		var overlaidCanvasCtx = this.chart.overlaidCanvasCtx;
		this.chart.resetOverlayedCanvas();

		overlaidCanvasCtx.clearRect(0, 0, this.chart.width, this.chart.height);
		overlaidCanvasCtx.save();


		var plotArea = this.chart.plotArea;

		var offset = 0;
		overlaidCanvasCtx.beginPath();
		overlaidCanvasCtx.rect(plotArea.x1, plotArea.y1, plotArea.x2 - plotArea.x1, plotArea.y2 - plotArea.y1);
		overlaidCanvasCtx.clip();


		for (var i = 0; i < entries.length; i++) {

			var entry = entries[i];

			var eventObject = this.chart._eventManager.objectMap[entry.dataSeries.dataPointIds[entry.index]];

			if (!eventObject || !eventObject.objectType || eventObject.objectType !== "dataPoint")
				continue;

			var dataSeries = this.chart.data[eventObject.dataSeriesIndex];
			var dataPoint = dataSeries.dataPoints[eventObject.dataPointIndex];
			var index = eventObject.dataPointIndex;

			if (dataPoint.highlightEnabled !== false && (dataSeries.highlightEnabled === true || dataPoint.highlightEnabled === true)) {

				if (dataSeries.type === "line" || dataSeries.type === "stepLine" || dataSeries.type === "spline" || dataSeries.type === "scatter"
					|| dataSeries.type === "area" || dataSeries.type === "stepArea" || dataSeries.type === "splineArea"
					|| dataSeries.type === "stackedArea" || dataSeries.type === "stackedArea100"
					|| dataSeries.type === "rangeArea" || dataSeries.type === "rangeSplineArea") {
					var markerProps = dataSeries.getMarkerProperties(index, eventObject.x1, eventObject.y1, this.chart.overlaidCanvasCtx);
					markerProps.size = Math.max(markerProps.size * 1.5 << 0, 10);

					markerProps.borderColor = markerProps.borderColor || "#FFFFFF";
					markerProps.borderThickness = markerProps.borderThickness || Math.ceil(markerProps.size * .1);

					//overlaidCanvasCtx.globalAlpha = .8;
					RenderHelper.drawMarkers([markerProps]);
					//overlaidCanvasCtx.globalAlpha = .8;

					if (typeof (eventObject.y2) !== "undefined") {

						var markerProps = dataSeries.getMarkerProperties(index, eventObject.x1, eventObject.y2, this.chart.overlaidCanvasCtx);
						markerProps.size = Math.max(markerProps.size * 1.5 << 0, 10);

						markerProps.borderColor = markerProps.borderColor || "#FFFFFF";
						markerProps.borderThickness = markerProps.borderThickness || Math.ceil(markerProps.size * .1);

						//overlaidCanvasCtx.globalAlpha = .8;
						RenderHelper.drawMarkers([markerProps]);
						//overlaidCanvasCtx.globalAlpha = .8;
					}
				} else if (dataSeries.type === "bubble") {
					var markerProps = dataSeries.getMarkerProperties(index, eventObject.x1, eventObject.y1, this.chart.overlaidCanvasCtx);
					markerProps.size = eventObject.size;
					markerProps.color = "white";
					markerProps.borderColor = "white";
					//markerProps.borderThickness = 2;
					overlaidCanvasCtx.globalAlpha = .3;
					RenderHelper.drawMarkers([markerProps]);
					overlaidCanvasCtx.globalAlpha = 1;
				} else if (dataSeries.type === "column" || dataSeries.type === "stackedColumn" || dataSeries.type === "stackedColumn100"
					|| dataSeries.type === "bar" || dataSeries.type === "rangeBar" || dataSeries.type === "stackedBar" || dataSeries.type === "stackedBar100"
					|| dataSeries.type === "rangeColumn" || dataSeries.type === "waterfall") {
					drawRect(overlaidCanvasCtx, eventObject.x1, eventObject.y1, eventObject.x2, eventObject.y2, "white", 0, null, false, false, false, false, .3);
				}
				else if (dataSeries.type === "pie" || dataSeries.type === "doughnut") {
					drawSegment(overlaidCanvasCtx, eventObject.center, eventObject.radius, "white", dataSeries.type, eventObject.startAngle, eventObject.endAngle, .3, eventObject.percentInnerRadius);
				} else if (dataSeries.type === "funnel" || dataSeries.type === "pyramid") {
					drawSectionOfFunnel(overlaidCanvasCtx, eventObject.funnelSection, .3, "white");
				} else if (dataSeries.type === "candlestick") {

					overlaidCanvasCtx.globalAlpha = 1;
					overlaidCanvasCtx.strokeStyle = eventObject.color;
					overlaidCanvasCtx.lineWidth = eventObject.borderThickness * 2;
					offset = (overlaidCanvasCtx.lineWidth) % 2 === 0 ? 0 : .5;

					overlaidCanvasCtx.beginPath();
					overlaidCanvasCtx.moveTo(eventObject.x3 - offset, Math.min(eventObject.y2, eventObject.y3));
					overlaidCanvasCtx.lineTo(eventObject.x3 - offset, Math.min(eventObject.y1, eventObject.y4));
					overlaidCanvasCtx.stroke();

					overlaidCanvasCtx.beginPath();
					overlaidCanvasCtx.moveTo(eventObject.x3 - offset, Math.max(eventObject.y1, eventObject.y4));
					overlaidCanvasCtx.lineTo(eventObject.x3 - offset, Math.max(eventObject.y2, eventObject.y3));
					overlaidCanvasCtx.stroke();

					drawRect(overlaidCanvasCtx, eventObject.x1, Math.min(eventObject.y1, eventObject.y4), eventObject.x2, Math.max(eventObject.y1, eventObject.y4), "transparent", eventObject.borderThickness * 2, eventObject.color, false, false, false, false);
					overlaidCanvasCtx.globalAlpha = 1;

				} else if (dataSeries.type === "ohlc") {
					overlaidCanvasCtx.globalAlpha = 1;

					overlaidCanvasCtx.strokeStyle = eventObject.color;
					overlaidCanvasCtx.lineWidth = eventObject.borderThickness * 2;

					offset = (overlaidCanvasCtx.lineWidth) % 2 === 0 ? 0 : .5;

					overlaidCanvasCtx.beginPath();
					overlaidCanvasCtx.moveTo(eventObject.x3 - offset, eventObject.y2);
					overlaidCanvasCtx.lineTo(eventObject.x3 - offset, eventObject.y3);
					overlaidCanvasCtx.stroke();

					overlaidCanvasCtx.beginPath();
					overlaidCanvasCtx.moveTo(eventObject.x3, eventObject.y1);
					overlaidCanvasCtx.lineTo(eventObject.x1, eventObject.y1);
					overlaidCanvasCtx.stroke();

					overlaidCanvasCtx.beginPath();
					overlaidCanvasCtx.moveTo(eventObject.x3, eventObject.y4);
					overlaidCanvasCtx.lineTo(eventObject.x2, eventObject.y4);
					overlaidCanvasCtx.stroke();

					overlaidCanvasCtx.globalAlpha = 1;

				} else if (dataSeries.type === "boxAndWhisker") {

					// Stem
					overlaidCanvasCtx.save();
					overlaidCanvasCtx.globalAlpha = 1;
					overlaidCanvasCtx.strokeStyle = eventObject.stemColor;
					overlaidCanvasCtx.lineWidth = 2 * eventObject.stemThickness;

					if (eventObject.stemThickness > 0) {
						overlaidCanvasCtx.beginPath();
						overlaidCanvasCtx.moveTo(eventObject.x3, eventObject.y2 + eventObject.borderThickness / 2);
						overlaidCanvasCtx.lineTo(eventObject.x3, eventObject.y1 + eventObject.whiskerThickness / 2);
						overlaidCanvasCtx.stroke();

						overlaidCanvasCtx.beginPath();
						overlaidCanvasCtx.moveTo(eventObject.x3, eventObject.y4 - eventObject.whiskerThickness / 2);
						overlaidCanvasCtx.lineTo(eventObject.x3, eventObject.y3 - eventObject.borderThickness / 2);
						overlaidCanvasCtx.stroke();
					}


					//Box
					overlaidCanvasCtx.beginPath();
					drawRect(overlaidCanvasCtx, eventObject.x1 - eventObject.borderThickness / 2, Math.max(eventObject.y2 + eventObject.borderThickness / 2, eventObject.y3 + eventObject.borderThickness / 2), eventObject.x2 + eventObject.borderThickness / 2, Math.min(eventObject.y2 - eventObject.borderThickness / 2, eventObject.y3 - eventObject.borderThickness / 2), "transparent", eventObject.borderThickness, eventObject.color, false, false, false, false);

					// Whiskers
					overlaidCanvasCtx.globalAlpha = 1;
					overlaidCanvasCtx.strokeStyle = eventObject.whiskerColor;
					overlaidCanvasCtx.lineWidth = 2 * eventObject.whiskerThickness;

					if (eventObject.whiskerThickness > 0) {
						overlaidCanvasCtx.beginPath();
						overlaidCanvasCtx.moveTo(Math.floor(eventObject.x3 - eventObject.whiskerLength / 2), eventObject.y4);
						overlaidCanvasCtx.lineTo(Math.ceil(eventObject.x3 + eventObject.whiskerLength / 2), eventObject.y4);
						overlaidCanvasCtx.stroke();

						overlaidCanvasCtx.beginPath();
						overlaidCanvasCtx.moveTo(Math.floor(eventObject.x3 - eventObject.whiskerLength / 2), eventObject.y1);
						overlaidCanvasCtx.lineTo(Math.ceil(eventObject.x3 + eventObject.whiskerLength / 2), eventObject.y1);
						overlaidCanvasCtx.stroke();
					}

					//Median line
					overlaidCanvasCtx.globalAlpha = 1;
					overlaidCanvasCtx.strokeStyle = eventObject.lineColor;
					overlaidCanvasCtx.lineWidth = 2 * eventObject.lineThickness;

					if (eventObject.lineThickness > 0) {
						overlaidCanvasCtx.beginPath();
						overlaidCanvasCtx.moveTo(eventObject.x1, eventObject.y5);
						overlaidCanvasCtx.lineTo(eventObject.x2, eventObject.y5);
						overlaidCanvasCtx.stroke();
					}

					overlaidCanvasCtx.restore();

					overlaidCanvasCtx.globalAlpha = 1;

				} else if (dataSeries.type === "error") {
					drawErrorLines(overlaidCanvasCtx, eventObject.x1, eventObject.y1, eventObject.x2, eventObject.y2, "white", eventObject.whiskerProperties, eventObject.stemProperties, eventObject.isXYSwapped, 0.3);
					//drawErrorLines(overlaidCanvasCtx, eventObject.x1, eventObject.y1, eventObject.x2, eventObject.y2, eventObject.color, eventObject.whiskerProperties, eventObject.stemProperties, eventObject.isXYSwapped, 1);
				}
			}
		}

		overlaidCanvasCtx.restore();
		overlaidCanvasCtx.globalAlpha = 1;
		overlaidCanvasCtx.beginPath();

		return;
	}

	ToolTip.prototype.getToolTipInnerHTML = function (e) {
		var entries = e.entries;
		var toolTipInnerHtml = null;
		var dataSeries = null;
		var dataPoint = null;
		var index = 0;
		var color = null;
		var toolTipContent = "";

		var isToolTipDefinedInData = true;
		for (var i = 0; i < entries.length; i++) {
			if (entries[i].dataSeries.toolTipContent || entries[i].dataPoint.toolTipContent) {
				isToolTipDefinedInData = false;
				break;
			}
		}

		if (isToolTipDefinedInData && ((this.content && typeof (this.content) === "function") || this.contentFormatter)) {

			var param = {
				chart: this.chart, toolTip: this.options, entries: entries
			};
			toolTipInnerHtml = this.contentFormatter ? this.contentFormatter(param) : this.content(param);

		} else {

			if (this.shared && this.chart.plotInfo.axisPlacement !== "none") {
				var prevDataSeriesXIndex = null;
				var toolTipInnerHtmlPrefix = "";

				for (var i = 0; i < entries.length; i++) {
					dataSeries = entries[i].dataSeries;
					dataPoint = entries[i].dataPoint;
					index = entries[i].index;
					toolTipContent = "";

					if (i === 0 && isToolTipDefinedInData && !this.content) {
						if (this.chart.axisX && this.chart.axisX.length > 0) {
							toolTipInnerHtmlPrefix += typeof (this.chart.axisX[0].labels[dataPoint.x]) !== "undefined" ? this.chart.axisX[0].labels[dataPoint.x] : "{x}";
						}

						else if (this.chart.axisX2 && this.chart.axisX2.length > 0) {
							toolTipInnerHtmlPrefix += typeof (this.chart.axisX2[0].labels[dataPoint.x]) !== "undefined" ? this.chart.axisX2[0].labels[dataPoint.x] : "{x}";
						}
						toolTipInnerHtmlPrefix += "</br>";
						toolTipInnerHtmlPrefix = this.chart.replaceKeywordsWithValue(toolTipInnerHtmlPrefix, dataPoint, dataSeries, index);
					}

					//Allows disabling of toolTip for individual dataPoints/dataSeries
					if (dataPoint.toolTipContent === null || (typeof (dataPoint.toolTipContent) === "undefined" && dataSeries.options.toolTipContent === null))
						continue;


					if (dataSeries.type === "line" || dataSeries.type === "stepLine" || dataSeries.type === "spline" || dataSeries.type === "area" || dataSeries.type === "stepArea" || dataSeries.type === "splineArea" || dataSeries.type === "column" || dataSeries.type === "bar" || dataSeries.type === "scatter"
						|| dataSeries.type === "stackedColumn" || dataSeries.type === "stackedColumn100" || dataSeries.type === "stackedBar" || dataSeries.type === "stackedBar100"
						|| dataSeries.type === "stackedArea" || dataSeries.type === "stackedArea100" || dataSeries.type === "waterfall") {
						if (this.chart.axisX && this.chart.axisX.length > 1)
							toolTipContent += (prevDataSeriesXIndex != dataSeries.axisXIndex) ? (dataSeries.axisX.title ? dataSeries.axisX.title + "<br/>" : "X:{axisXIndex}<br/>") : "";

						toolTipContent += dataPoint.toolTipContent ? dataPoint.toolTipContent : dataSeries.toolTipContent ? dataSeries.toolTipContent : this.content && typeof (this.content) !== "function" ? this.content : "<span style='\"" + (this.options.fontColor ? "" : "'color:{color};'") + "\"'>{name}:</span>&nbsp;&nbsp;{y}";
						prevDataSeriesXIndex = dataSeries.axisXIndex;
					}
					else if (dataSeries.type === "bubble") {
						if (this.chart.axisX && this.chart.axisX.length > 1)
							toolTipContent += (prevDataSeriesXIndex != dataSeries.axisXIndex) ? (dataSeries.axisX.title ? dataSeries.axisX.title + "<br/>" : "X:{axisXIndex}<br/>") : "";

						toolTipContent += dataPoint.toolTipContent ? dataPoint.toolTipContent : dataSeries.toolTipContent ? dataSeries.toolTipContent : this.content && typeof (this.content) !== "function" ? this.content : "<span style='\"" + (this.options.fontColor ? "" : "'color:{color};'") + "\"'>{name}:</span>&nbsp;&nbsp;{y}, &nbsp;&nbsp;{z}";
					} else if (dataSeries.type === "rangeColumn" || dataSeries.type === "rangeBar" || dataSeries.type === "rangeArea" || dataSeries.type === "rangeSplineArea" || dataSeries.type === "error") {
						if (this.chart.axisX && this.chart.axisX.length > 1)
							toolTipContent += (prevDataSeriesXIndex != dataSeries.axisXIndex) ? (dataSeries.axisX.title ? dataSeries.axisX.title + "<br/>" : "X:{axisXIndex}<br/>") : "";

						toolTipContent += dataPoint.toolTipContent ? dataPoint.toolTipContent : dataSeries.toolTipContent ? dataSeries.toolTipContent : this.content && typeof (this.content) !== "function" ? this.content : "<span style='\"" + (this.options.fontColor ? "" : "'color:{color};'") + "\"'>{name}:</span>&nbsp;&nbsp;{y[0]},&nbsp;{y[1]}";
					} else if (dataSeries.type === "candlestick" || dataSeries.type === "ohlc") {
						if (this.chart.axisX && this.chart.axisX.length > 1)
							toolTipContent += (prevDataSeriesXIndex != dataSeries.axisXIndex) ? (dataSeries.axisX.title ? dataSeries.axisX.title + "<br/>" : "X:{axisXIndex}<br/>") : "";

						toolTipContent += dataPoint.toolTipContent ? dataPoint.toolTipContent : dataSeries.toolTipContent ? dataSeries.toolTipContent : this.content && typeof (this.content) !== "function" ? this.content : "<span style='\"" + (this.options.fontColor ? "" : "'color:{color};'") + "\"'>{name}:</span>"
							+ "<br/>Open: &nbsp;&nbsp;{y[0]}"
							+ "<br/>High: &nbsp;&nbsp;&nbsp;{y[1]}"
							+ "<br/>Low:&nbsp;&nbsp;&nbsp;{y[2]}"
							+ "<br/>Close: &nbsp;&nbsp;{y[3]}";
					} else if (dataSeries.type === "boxAndWhisker") {
						if (this.chart.axisX && this.chart.axisX.length > 1)
							toolTipContent += (prevDataSeriesXIndex != dataSeries.axisXIndex) ? (dataSeries.axisX.title ? dataSeries.axisX.title + "<br/>" : "X:{axisXIndex}<br/>") : "";

						toolTipContent += dataPoint.toolTipContent ? dataPoint.toolTipContent : dataSeries.toolTipContent ? dataSeries.toolTipContent : this.content && typeof (this.content) !== "function" ? this.content : "<span style='\"" + (this.options.fontColor ? "" : "'color:{color};'") + "\"'>{name}:</span>"
							+ "<br/>Minimum: &nbsp;&nbsp;{y[0]}"
							+ "<br/>Q1: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{y[1]}"
							+ "<br/>Q2: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{y[4]}"
							+ "<br/>Q3: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{y[2]}"
							+ "<br/>Maximum: &nbsp;{y[3]}";
					}

					if (toolTipInnerHtml === null)
						toolTipInnerHtml = "";


					if (this.reversed === true) {

						toolTipInnerHtml = this.chart.replaceKeywordsWithValue(toolTipContent, dataPoint, dataSeries, index) + toolTipInnerHtml;

						if (i < entries.length - 1)
							toolTipInnerHtml = "</br>" + toolTipInnerHtml;

					} else {

						toolTipInnerHtml += this.chart.replaceKeywordsWithValue(toolTipContent, dataPoint, dataSeries, index);

						if (i < entries.length - 1)
							toolTipInnerHtml += "</br>";

					}
					//dataSeries.toolTipContent = toolTipContent;
				}

				if (toolTipInnerHtml !== null)
					toolTipInnerHtml = toolTipInnerHtmlPrefix + toolTipInnerHtml;

			} else {

				dataSeries = entries[0].dataSeries;
				dataPoint = entries[0].dataPoint;
				index = entries[0].index;

				//Allows disabling of toolTip for individual dataPoints/dataSeries
				if (dataPoint.toolTipContent === null || (typeof (dataPoint.toolTipContent) === "undefined" && dataSeries.options.toolTipContent === null))
					return null;

				if (dataSeries.type === "line" || dataSeries.type === "stepLine" || dataSeries.type === "spline" || dataSeries.type === "area" || dataSeries.type === "stepArea" || dataSeries.type === "splineArea" || dataSeries.type === "column" || dataSeries.type === "bar" || dataSeries.type === "scatter"
					|| dataSeries.type === "stackedColumn" || dataSeries.type === "stackedColumn100" || dataSeries.type === "stackedBar" || dataSeries.type === "stackedBar100"
					|| dataSeries.type === "stackedArea" || dataSeries.type === "stackedArea100" || dataSeries.type === "waterfall") {
					toolTipContent = dataPoint.toolTipContent ? dataPoint.toolTipContent : dataSeries.toolTipContent ? dataSeries.toolTipContent : this.content && typeof (this.content) !== "function" ? this.content : "<span style='\"" + (this.options.fontColor ? "" : "'color:{color};'") + "\"'>" + (dataPoint.label ? "{label}" : "{x}") + ":</span>&nbsp;&nbsp;{y}";
				} else if (dataSeries.type === "bubble") {
					toolTipContent = dataPoint.toolTipContent ? dataPoint.toolTipContent : dataSeries.toolTipContent ? dataSeries.toolTipContent : this.content && typeof (this.content) !== "function" ? this.content : "<span style='\"" + (this.options.fontColor ? "" : "'color:{color};'") + "\"'>" + (dataPoint.label ? "{label}" : "{x}") + ":</span>&nbsp;&nbsp;{y}, &nbsp;&nbsp;{z}";
				} else if (dataSeries.type === "pie" || dataSeries.type === "doughnut" || dataSeries.type === "funnel" || dataSeries.type === "pyramid") {
					toolTipContent = dataPoint.toolTipContent ? dataPoint.toolTipContent : dataSeries.toolTipContent ? dataSeries.toolTipContent : this.content && typeof (this.content) !== "function" ? this.content : "<span style='\"" + (this.options.fontColor ? "" : "'color:{color};'") + "\"'>" + (dataPoint.name ? "{name}:</span>&nbsp;&nbsp;" : dataPoint.label ? "{label}:</span>&nbsp;&nbsp;" : "</span>") + "{y}";
				} else if (dataSeries.type === "rangeColumn" || dataSeries.type === "rangeBar" || dataSeries.type === "rangeArea" || dataSeries.type === "rangeSplineArea" || dataSeries.type === "error") {
					toolTipContent = dataPoint.toolTipContent ? dataPoint.toolTipContent : dataSeries.toolTipContent ? dataSeries.toolTipContent : this.content && typeof (this.content) !== "function" ? this.content : "<span style='\"" + (this.options.fontColor ? "" : "'color:{color};'") + "\"'>" + (dataPoint.label ? "{label}" : "{x}") + " :</span>&nbsp;&nbsp;{y[0]}, &nbsp;{y[1]}";
				} else if (dataSeries.type === "candlestick" || dataSeries.type === "ohlc") {
					toolTipContent = dataPoint.toolTipContent ? dataPoint.toolTipContent : dataSeries.toolTipContent ? dataSeries.toolTipContent : this.content && typeof (this.content) !== "function" ? this.content : "<span style='\"" + (this.options.fontColor ? "" : "'color:{color};'") + "\"'>" + (dataPoint.label ? "{label}" : "{x}") + "</span>"
						+ "<br/>Open: &nbsp;&nbsp;{y[0]}"
						+ "<br/>High: &nbsp;&nbsp;&nbsp;{y[1]}"
						+ "<br/>Low: &nbsp;&nbsp;&nbsp;&nbsp;{y[2]}"
						+ "<br/>Close: &nbsp;&nbsp;{y[3]}";
				} else if (dataSeries.type === "boxAndWhisker") {
					toolTipContent = dataPoint.toolTipContent ? dataPoint.toolTipContent : dataSeries.toolTipContent ? dataSeries.toolTipContent : this.content && typeof (this.content) !== "function" ? this.content : "<span style='\"" + (this.options.fontColor ? "" : "'color:{color};'") + "\"'>" + (dataPoint.label ? "{label}" : "{x}") + "</span>"
						+ "<br/>Minimum: &nbsp;&nbsp;{y[0]}"
						+ "<br/>Q1: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{y[1]}"
						+ "<br/>Q2: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{y[4]}"
						+ "<br/>Q3: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{y[2]}"
						+ "<br/>Maximum: &nbsp;{y[3]}";
				}

				if (toolTipInnerHtml === null)
					toolTipInnerHtml = "";

				toolTipInnerHtml += this.chart.replaceKeywordsWithValue(toolTipContent, dataPoint, dataSeries, index);
			}
		}
		//this.content = toolTipContent;

		return toolTipInnerHtml;
	}

	ToolTip.prototype.enableAnimation = function () {
		if (this.container.style.WebkitTransition)
			return;

		var containerTransition = this.getContainerTransition(this.containerTransitionDuration);

		this.container.style.WebkitTransition = containerTransition;
		this.container.style.MsTransition = containerTransition;
		this.container.style.transition = containerTransition;

		//this.container.style.MozTransition = containerTransition;
		this.container.style.MozTransition = this.mozContainerTransition;

	}

	ToolTip.prototype.disableAnimation = function () {
		if (!this.container.style.WebkitTransition)
			return;

		this.container.style.WebkitTransition = "";
		this.container.style.MozTransition = "";
		this.container.style.MsTransition = "";
		this.container.style.transition = "";
	}

	ToolTip.prototype.hide = function (resetOverlayedCanvas) {
		if (!this.container)
			return;

		resetOverlayedCanvas = typeof (resetOverlayedCanvas) === "undefined" ? true : resetOverlayedCanvas;

		this.container.style.display = "none";
		this.currentSeriesIndex = -1;
		this._prevX = NaN;
		this._prevY = NaN;
		//this.chart.overlaidCanvasCtx.clearRect(0, 0, this.chart.overlaidCanvas.width, this.chart.overlaidCanvas.height);
		if (resetOverlayedCanvas)
			this.chart.resetOverlayedCanvas();
	}

	ToolTip.prototype.show = function (px, py, closest) {

		closest = typeof (closest) === "undefined" ? false : closest;
		this._updateToolTip(px, py, closest);
	}

	//Resolves delay in update in Firefox.
	ToolTip.prototype.fixMozTransitionDelay = function (left, bottom) {

		if (this.chart._eventManager.lastObjectId > 20) {
			this.mozContainerTransition = this.getContainerTransition(0);
		}
		else {
			var prevLeft = parseFloat(this.container.style.left);
			var prevLeft = isNaN(prevLeft) ? 0 : prevLeft;
			var prevBottom = parseFloat(this.container.style.bottom);
			var prevBottom = isNaN(prevBottom) ? 0 : prevBottom;

			var updateDistance = Math.sqrt(Math.pow(prevLeft - left, 2) + Math.pow(prevBottom - bottom, 2));
			//console.log(updateDistance);
			if (updateDistance > 10) {

				this.mozContainerTransition = this.getContainerTransition(0.1);

			} else {
				this.mozContainerTransition = this.getContainerTransition(0);
			}
		}

		return;
	}

	ToolTip.prototype.getContainerTransition = function (duration) {
		return "left " + duration + "s ease-out 0s, bottom " + duration + "s ease-out 0s";
	}

	//#endregion ToolTip

	//#region Event Manager

	function EventManager(chart) {
		this.chart = chart;
		this.lastObjectId = 0;
		var _this = this;
		this.objectMap = [];
		this.rectangularRegionEventSubscriptions = [];
		this.previousDataPointEventObject = null;
		//this.previousDataSeriesEventObject = null;

		this.ghostCanvas = createCanvas(this.chart.width, this.chart.height);
		//this.ghostCanvas.width = this.chart.width;
		//this.ghostCanvas.height = this.chart.height;

		this.ghostCtx = this.ghostCanvas.getContext("2d");

		var eventHandler = function (ev) {
			_this.mouseEventHandler.call(_this, ev);
		};

		this.mouseoveredObjectMaps = [];
		//this.chart.canvas.addEventListener("mouseover", eventHandler);
		//this.chart.canvas.addEventListener("mousemove", eventHandler);
		//this.chart.canvas.addEventListener("mouseout", eventHandler);
		//this.chart.canvas.addEventListener("click", eventHandler);
	}

	EventManager.prototype.reset = function () {
		this.lastObjectId = 0;
		this.objectMap = [];
		this.rectangularRegionEventSubscriptions = [];
		this.previousDataPointEventObject = null;

		this.eventObjects = [];
		//this.ghostCanvas.width = this.chart.width;
		//this.ghostCanvas.height = this.chart.height;

		if (isCanvasSupported) {
			this.ghostCtx.clearRect(0, 0, this.chart.width, this.chart.height);
			this.ghostCtx.beginPath();
		}
	}

	EventManager.prototype.getNewObjectTrackingId = function () {
		return ++this.lastObjectId;
	}

	EventManager.prototype.mouseEventHandler = function (ev) {

		if (ev.type !== "mousemove" && ev.type !== "click")
			return;

		var eventObjectMaps = [];
		var xy = getMouseCoordinates(ev);
		var id = null;

		//var dataPointInfo = this.chart.getDataPointAtXY(xy.x, xy.y, false);

		//if (dataPointInfo) {
		//	id = dataPointInfo.dataSeries.dataPointIds[dataPointInfo.dataPointIndex];
		//} else if (isCanvasSupported) {//IE9+
		//	id = getObjectId(xy.x, xy.y, this.ghostCtx);
		//}
		id = this.chart.getObjectAtXY(xy.x, xy.y, false);

		if (id && typeof (this.objectMap[id]) !== "undefined") {

			var eventObjectMap = this.objectMap[id];

			if (eventObjectMap.objectType === "dataPoint") {
				var dataSeries = this.chart.data[eventObjectMap.dataSeriesIndex];
				var dataPoint = dataSeries.dataPoints[eventObjectMap.dataPointIndex];
				var dataPointIndex = eventObjectMap.dataPointIndex;

				//Event Parameter should not contain reference to dataSeries directly. But to its options.
				eventObjectMap.eventParameter = {
					x: xy.x, y: xy.y, dataPoint: dataPoint,
					dataSeries: dataSeries.options, dataPointIndex: dataPointIndex, dataSeriesIndex: dataSeries.index,
					chart: this.chart
				};
				eventObjectMap.eventContext = {
					context: dataPoint, userContext: dataPoint, mouseover: "mouseover", mousemove: "mousemove", mouseout: "mouseout", click: "click"
				};
				eventObjectMaps.push(eventObjectMap);

				//Add Dataseries too because mouse event on dataPoint also means there is an event on dataSeries. DataSeries is not present on ghost canvas
				eventObjectMap = this.objectMap[dataSeries.id];

				//Event Parameter should not contain reference to dataSeries directly. But to its options.
				eventObjectMap.eventParameter = {
					x: xy.x, y: xy.y,
					dataPoint: dataPoint, dataSeries: dataSeries.options, dataPointIndex: dataPointIndex, dataSeriesIndex: dataSeries.index,
					chart: this.chart
				};

				eventObjectMap.eventContext = {
					context: dataSeries, userContext: dataSeries.options, mouseover: "mouseover", mousemove: "mousemove", mouseout: "mouseout", click: "click"
				};
				eventObjectMaps.push(this.objectMap[dataSeries.id]);
			}
			//else if (eventObjectMap.objectType === "stripLine") {

			//	//Event Parameter should not contain reference to stripLine directly. But to its options.
			//	eventObjectMap.eventParameter = { x: xy.x, y: xy.y, stripLine: eventObjectMap.stripLine.options, axis: eventObjectMap.axis.options, stripLineIndex: eventObjectMap.stripLineIndex };
			//	eventObjectMap.eventContext = { context: eventObjectMap.stripLine, userContext: eventObjectMap.stripLine.options, mouseover: "mouseover", mousemove: "mousemove", mouseout: "mouseout", click: "click" };

			//	eventObjectMaps.push(eventObjectMap);
			//}
			else if (eventObjectMap.objectType === "legendItem") {

				var dataSeries = this.chart.data[eventObjectMap.dataSeriesIndex];
				var dataPoint = eventObjectMap.dataPointIndex !== null ? dataSeries.dataPoints[eventObjectMap.dataPointIndex] : null;

				//Event Parameter should not contain reference to DataSeries directly. But to its options.
				eventObjectMap.eventParameter = {
					x: xy.x, y: xy.y,
					dataSeries: dataSeries.options, dataPoint: dataPoint, dataPointIndex: eventObjectMap.dataPointIndex, dataSeriesIndex: eventObjectMap.dataSeriesIndex,
					chart: this.chart
				};
				eventObjectMap.eventContext = {
					context: this.chart.legend, userContext: this.chart.legend.options, mouseover: "itemmouseover", mousemove: "itemmousemove", mouseout: "itemmouseout", click: "itemclick"
				};
				eventObjectMaps.push(eventObjectMap);
			}
		}

		//Fire mouseout if existing mouseovered objects are not present in the objectmap.
		var mouseOutObjectMapsExcluded = [];
		for (var i = 0; i < this.mouseoveredObjectMaps.length; i++) {
			var mouseOut = true;

			for (var j = 0; j < eventObjectMaps.length; j++) {
				if (eventObjectMaps[j].id === this.mouseoveredObjectMaps[i].id) {
					mouseOut = false;
					break;
				}
			}

			if (mouseOut) {
				this.fireEvent(this.mouseoveredObjectMaps[i], "mouseout", ev);
			} else {
				mouseOutObjectMapsExcluded.push(this.mouseoveredObjectMaps[i]);
			}
		}

		this.mouseoveredObjectMaps = mouseOutObjectMapsExcluded;

		//Process new eventObectMaps
		//If they already don't exist, add them and fire mouseover
		//If ev.type is mousemove, then just fire mousemove
		//If ev.type is click, then fire two events - click followed by mousemove
		for (var i = 0; i < eventObjectMaps.length; i++) {

			var existing = false;

			for (var j = 0; j < this.mouseoveredObjectMaps.length; j++) {
				if (eventObjectMaps[i].id === this.mouseoveredObjectMaps[j].id) {
					existing = true;
					break;
				}
			}

			if (!existing) {
				this.fireEvent(eventObjectMaps[i], "mouseover", ev);
				this.mouseoveredObjectMaps.push(eventObjectMaps[i]);
			}

			if (ev.type === "click") {
				this.fireEvent(eventObjectMaps[i], "click", ev);
			} else if (ev.type === "mousemove") {
				this.fireEvent(eventObjectMaps[i], "mousemove", ev);
			}
		}
	}

	EventManager.prototype.fireEvent = function (eventObjectMap, eventType, ev) {

		if (!eventObjectMap || !eventType)
			return;

		var eventParameter = eventObjectMap.eventParameter;
		var eventContext = eventObjectMap.eventContext;
		//var context = eventObjectMap.eventContext.context;
		var userContext = eventObjectMap.eventContext.userContext

		if (userContext && eventContext && userContext[eventContext[eventType]])
			userContext[eventContext[eventType]].call(userContext, eventParameter);

		if (eventType !== "mouseout") {
			if (userContext.cursor && userContext.cursor !== ev.target.style.cursor) {
				ev.target.style.cursor = userContext.cursor;
			}
		} else {
			ev.target.style.cursor = this.chart._defaultCursor;
			delete eventObjectMap.eventParameter; // reference no longer required.
			delete eventObjectMap.eventContext; // reference no longer required.
		}

		//This is just a quick fix. Need to find a better way of calling internal event handlers.
		if (eventType === "click" && eventObjectMap.objectType === "dataPoint" && this.chart.pieDoughnutClickHandler) {
			this.chart.pieDoughnutClickHandler.call(this.chart.data[eventObjectMap.dataSeriesIndex], eventParameter);
		}
		if (eventType === "click" && eventObjectMap.objectType === "dataPoint" && this.chart.funnelPyramidClickHandler) {
			this.chart.funnelPyramidClickHandler.call(this.chart.data[eventObjectMap.dataSeriesIndex], eventParameter);
		}

	}

	//#endregion Event Manager

	function Animator(chart) {

		this.chart = chart;
		this.ctx = this.chart.plotArea.ctx;
		this.animations = [];
		this.animationRequestId = null;
	}

	//Animator.prototype.animate = function (duration, base, dest, source, animationCallback, onComplete) {
	Animator.prototype.animate = function (startDelay, duration, animationCallback, onComplete, easingFunction) {
		var _this = this;

		this.chart.isAnimating = true;
		easingFunction = easingFunction || AnimationHelper.easing.linear;

		if (animationCallback) {

			this.animations.push({
				startTime: (new Date()).getTime() + (startDelay ? startDelay : 0),
				duration: duration,
				animationCallback: animationCallback,
				onComplete: onComplete
			});
		}

		var remainingAnimations = [];

		while (this.animations.length > 0) {

			var animation = this.animations.shift();
			var now = (new Date()).getTime();
			var fractionComplete = 0;
			//var fractionComplete = Math.min(((new Date()).getTime() - animation.startTime) / animation.duration, 1);

			if (animation.startTime <= now) {
				fractionComplete = easingFunction(Math.min((now - animation.startTime), animation.duration), 0, 1, animation.duration);
				//var fractionComplete = AnimationHelper.easing.easeOutQuad(Math.min(((new Date()).getTime() - animation.startTime), animation.duration), 0, 1, animation.duration);
				fractionComplete = Math.min(fractionComplete, 1);

				if (isNaN(fractionComplete) || !isFinite(fractionComplete))
					fractionComplete = 1;
			}

			if (fractionComplete < 1) {
				remainingAnimations.push(animation);
			}

			animation.animationCallback(fractionComplete);

			if (fractionComplete >= 1 && animation.onComplete)
				animation.onComplete();
		}

		this.animations = remainingAnimations;

		if (this.animations.length > 0) {
			this.animationRequestId = this.chart.requestAnimFrame.call(window, function () {
				_this.animate.call(_this);
			});
		} else {
			this.chart.isAnimating = false;
		}

	}

	Animator.prototype.cancelAllAnimations = function () {

		this.animations = [];

		if (this.animationRequestId) {
			this.chart.cancelRequestAnimFrame.call(window, this.animationRequestId);
		}

		this.animationRequestId = null;
		this.chart.isAnimating = false;
	}

	var AnimationHelper = {
		yScaleAnimation: function (fractionComplete, animationInfo) {
			if (fractionComplete === 0)
				return;

			var ctx = animationInfo.dest;
			var sourceCanvas = animationInfo.source.canvas;
			var base = animationInfo.animationBase;

			var offsetY = (base - base * fractionComplete);

			ctx.drawImage(sourceCanvas, 0, 0, sourceCanvas.width, sourceCanvas.height, 0, offsetY, ctx.canvas.width / devicePixelBackingStoreRatio, fractionComplete * ctx.canvas.height / devicePixelBackingStoreRatio);
		},
		xScaleAnimation: function (fractionComplete, animationInfo) {
			if (fractionComplete === 0)
				return;

			var ctx = animationInfo.dest;
			var sourceCanvas = animationInfo.source.canvas;
			var base = animationInfo.animationBase;

			var offsetX = (base - base * fractionComplete);

			ctx.drawImage(sourceCanvas, 0, 0, sourceCanvas.width, sourceCanvas.height, offsetX, 0, fractionComplete * ctx.canvas.width / devicePixelBackingStoreRatio, ctx.canvas.height / devicePixelBackingStoreRatio);
		},
		xClipAnimation: function (fractionComplete, animationInfo) {

			if (fractionComplete === 0)
				return;

			var ctx = animationInfo.dest;
			var sourceCanvas = animationInfo.source.canvas;

			ctx.save();

			if (fractionComplete > 0)
				ctx.drawImage(sourceCanvas, 0, 0, sourceCanvas.width * fractionComplete, sourceCanvas.height, 0, 0, sourceCanvas.width * fractionComplete / devicePixelBackingStoreRatio, sourceCanvas.height / devicePixelBackingStoreRatio);

			ctx.restore();
		},
		fadeInAnimation: function (fractionComplete, animationInfo) {

			if (fractionComplete === 0)
				return;

			var ctx = animationInfo.dest;
			var sourceCanvas = animationInfo.source.canvas;

			ctx.save();

			ctx.globalAlpha = fractionComplete;

			ctx.drawImage(sourceCanvas, 0, 0, sourceCanvas.width, sourceCanvas.height, 0, 0, ctx.canvas.width / devicePixelBackingStoreRatio, ctx.canvas.height / devicePixelBackingStoreRatio);

			ctx.restore();
		},
		easing: {
			linear: function (t, b, c, d) {
				return c * t / d + b;
			},
			easeOutQuad: function (t, b, c, d) {
				return -c * (t /= d) * (t - 2) + b;
			},
			easeOutQuart: function (t, b, c, d) {
				return -c * ((t = t / d - 1) * t * t * t - 1) + b;
			},
			easeInQuad: function (t, b, c, d) {
				return c * (t /= d) * t + b;
			},
			easeInQuart: function (t, b, c, d) {
				return c * (t /= d) * t * t * t + b;
			}
		}
	}

	//#endregion Animator

	//#region Render Helper

	var RenderHelper = {
		drawMarker: function (x, y, ctx, markerType, markerSize, markerColor, markerBorderColor, markerBorderThickness) {

			if (!ctx)
				return;

			var alpha = 1;

			ctx.fillStyle = markerColor ? markerColor : "#000000";
			ctx.strokeStyle = markerBorderColor ? markerBorderColor : "#000000";
			ctx.lineWidth = markerBorderThickness ? markerBorderThickness : 0;


			if (markerType === "circle") {

				ctx.moveTo(x, y);
				ctx.beginPath();
				//return;

				ctx.arc(x, y, markerSize / 2, 0, Math.PI * 2, false);

				if (markerColor)
					ctx.fill();

				if (markerBorderThickness) {

					if (!markerBorderColor) {
						alpha = ctx.globalAlpha;
						ctx.globalAlpha = .15;
						ctx.strokeStyle = "black";
						ctx.stroke();
						ctx.globalAlpha = alpha;
					} else
						ctx.stroke();

				}
			}
			else if (markerType === "square") {

				//ctx.moveTo(x - markerSize / 2, y - markerSize / 2);
				ctx.beginPath();
				ctx.rect(x - markerSize / 2, y - markerSize / 2, markerSize, markerSize);

				if (markerColor)
					ctx.fill();

				if (markerBorderThickness) {

					if (!markerBorderColor) {
						alpha = ctx.globalAlpha;
						ctx.globalAlpha = .15;
						ctx.strokeStyle = "black";
						ctx.stroke();
						ctx.globalAlpha = alpha;
					} else
						ctx.stroke();

				}
			} else if (markerType === "triangle") {

				ctx.beginPath();
				ctx.moveTo(x - markerSize / 2, y + markerSize / 2);
				ctx.lineTo(x + markerSize / 2, y + markerSize / 2);
				ctx.lineTo(x, y - markerSize / 2);
				ctx.closePath();

				if (markerColor)
					ctx.fill();

				if (markerBorderThickness) {

					if (!markerBorderColor) {
						alpha = ctx.globalAlpha;
						ctx.globalAlpha = .15;
						ctx.strokeStyle = "black";
						ctx.stroke();
						ctx.globalAlpha = alpha;
					} else
						ctx.stroke();

				}
				ctx.beginPath();
			} else if (markerType === "cross") {

				ctx.strokeStyle = markerColor;
				markerBorderThickness = markerSize / 4;
				ctx.lineWidth = markerBorderThickness;

				ctx.beginPath();
				ctx.moveTo(x - markerSize / 2, y - markerSize / 2);
				ctx.lineTo(x + markerSize / 2, y + markerSize / 2);
				ctx.stroke();

				ctx.moveTo(x + markerSize / 2, y - markerSize / 2);
				ctx.lineTo(x - markerSize / 2, y + markerSize / 2);
				ctx.stroke();

			}


		},
		drawMarkers: function (markers) {
			for (var i = 0; i < markers.length; i++) {
				var marker = markers[i];

				RenderHelper.drawMarker(marker.x, marker.y, marker.ctx, marker.type, marker.size, marker.color, marker.borderColor, marker.borderThickness);
			}
		}
		//,
		//draw1pxLine: function (x1, y1, x2, y2, color, ctx) {
		//	ctx.beginPath();
		//	ctx.drawRect(x1, y1, x2 - x1, y2 - y1);
		//	ctx.stroke();
		//}
	}

	//#endregion Render Helper

	//#endregion Class Definitions

	return Chart;
})();

CanvasJS.Chart.version = "v2.0.2 GA";

})();