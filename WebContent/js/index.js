/**
 * index.jsp
 */

require([ "esri/map", "esri/layers/ArcGISTiledMapServiceLayer",
	"esri/layers/ArcGISDynamicMapServiceLayer",
	"esri/geometry/Point", "esri/SpatialReference",
	"esri/symbols/SimpleMarkerSymbol", "esri/symbols/PictureMarkerSymbol",
	"esri/InfoTemplate", "esri/symbols/SimpleLineSymbol", "esri/Color",
	"esri/graphic", "esri/layers/GraphicsLayer", "esri/geometry/webMercatorUtils",
	"/community/js/echarts.js", "/community/js/src/EchartsLayer.js",

	"esri/layers/FeatureLayer", "esri/tasks/query",

	"dojo/domReady!" ], function(Map, TiledLayer, ArcGISDynamicMapServiceLayer,
	Point, SpatialReference, SimpleMarkerSymbol,
	PictureMarkerSymbol, InfoTemplate,
	SimpleLineSymbol, Color, Graphic, GraphicsLayer, webMercatorUtils,
	echarts, EchartsLayer
	, FeatureLayer, Query) {
	esriConfig.defaults.io.alwaysUseProxy = false;

	var mapOptions = {
		logo : false,
		nav : false,
		slider : true,
		sliderPosition : 'top-right',
		center : [ 116.499726, 40.215285 ],
		zoom : 0
	};

	var GraphicsLayer = new GraphicsLayer();

	/*
	*  添加底图
	* */
	var map = new Map("xmboxmap", mapOptions);
	//map.addLayers([ new TiledLayer(MLZ.baseMapUrl),GraphicsLayer ]);



	/*
	* 添加边界
	* */

	map.addLayer(new ArcGISDynamicMapServiceLayer(MLZ.baseMapUrl));

	map.addLayers(GraphicsLayer);

	featureLayer = new FeatureLayer(MLZ.baseMapUrl + '/0');
	var query = new Query();
	query.outFields = [ "*" ];
	query.where = '1=1';
	featureLayer.queryFeatures(query, function(featureSet) {
		console.info(featureSet);
		sprinklePoint(community);
	});

	/*
	 * 撒点
	 * */

	//addEvenListerOfClick();

	/*
	 * 全景功能
	 * */

	/*	$("._position").click(function(){
			map.setZoom(0);
			map.centerAt(MLZ.ToWebMercator(_center))
		});
		
		
		 * 测距功能
		 * 
		
		$("._range").click(function(){
			
			 var r=new range({map:map});
			 r.initDraw();
		});
		*/
	function addMap(featureSet) {
		var option = getOption();
		if (option && typeof option === "object") {
			var elayeer = new EchartsLayer(option, featureSet);
			map.addLayer(elayeer);
		}
	}



	function getOption() {
		return {
			geo : {
				map : 'none',
				label : {
					emphasis : {
						show : false
					}
				},
				roam : true,
				itemStyle : {
					normal : {
						areaColor : '#323c48',
						borderColor : '#404a59'
					},
					emphasis : {
						areaColor : '#2a333d'
					}
				}
			},
			series : [
				/*{
					name : 'community',
					type : 'effectScatter',
					coordinateSystem : 'geo',
					zlevel : 3,
					sybolSize : 3,
				    showEffectOn: 'emphasis',
					itemStyle : {
						normal : {
							color : '#4169E1',
							borderColor : '#4169E1',
							borderWidth : 0.5,
							opacity : 0.7
						},
						emphasis : {
							color : '#4169E1',
							borderColor : '#4169E1',
							borderWidth : 0.5,
							opacity : 1
						}
					},
					data : []
				} ,*/

		        {
		            name: 'Top 5',
		            type: 'effectScatter',
		            coordinateSystem: 'geo',
		            data: [],
		            symbolSize: 30,
		            showEffectOn: 'emphasis',
		            rippleEffect: {
		                brushType: 'stroke'
		            },
		            hoverAnimation: true,
		            label: {
		                normal: {
		                    formatter: '1111',
		                    position: 'right',
		                    show: true
		                }
		            },
		            itemStyle: {
		                normal: {
		                    color: '#f4e925',
		                    shadowBlur: 10,
		                    shadowColor: '#333'
		                }
		            },
		            zlevel: 1
		        }
				  
			]
		};
	}


	//撒点方法
	function sprinklePoint(pointJson) {
		var ps = [];
		pointJson.map(function(item) {
			var point = getPointByOther([ item.POINT_X, item.POINT_Y ]);
			if (MLZ.isSwitchPoint) {
				point = MLZ.ToWebMercator(point);
			}
			ps.push(point);
		/*	var getSysObj = getSYS();
			GraphicsLayer.add(getGraphic(point, getSysObj.pictureMarkerSymbol, item, null));*/
		});
		addMap(ps);
	}

	/*
	 * 字符串或者double小数转坐标对象
	 * */
	function getPointByOther(pArray) {
		if (pArray.lenght <= 1) return null;
		return new Point(parseFloat(pArray[0]), parseFloat(pArray[1]), map.spatialReference);
	}

	/*
	 * 获取对应的样式
	 * */
	function getSYS() {
		var sysObj = {};
		var pictureMarkerSymbol = new PictureMarkerSymbol('../images/pointxtb.png', 25, 32);
		sysObj.pictureMarkerSymbol = pictureMarkerSymbol;
		return sysObj;
	}


	//转码方法
	function getGraphic(pointObject, SymbolObject, attr, infoTemplateObject) {
		//是否需要转码
		if (MLZ.isSwitchPoint) {
			var pt = MLZ.ToWebMercator(pointObject);
		}
		return new Graphic(pt, SymbolObject, attr, infoTemplateObject);
	}

	dojo.connect(GraphicsLayer, 'onMouseOver', function(e) {
		e.graphic.symbol.height = 35;
		e.graphic.symbol.width = 27;
		GraphicsLayer.redraw();
	})

	dojo.connect(GraphicsLayer, 'onMouseOut', function(e) {
		e.graphic.symbol.height = 32;
		e.graphic.symbol.width = 25;
		GraphicsLayer.redraw();
	})





});