/**
 * index.jsp
 */

require([ "esri/map", "esri/layers/ArcGISTiledMapServiceLayer",
	"esri/layers/ArcGISDynamicMapServiceLayer",
	"esri/geometry/Point", "esri/SpatialReference",
	"esri/symbols/SimpleMarkerSymbol", "esri/symbols/PictureMarkerSymbol",
	"esri/InfoTemplate", "esri/symbols/SimpleLineSymbol", "esri/Color",
	"esri/graphic", "esri/layers/GraphicsLayer", "esri/geometry/webMercatorUtils",
	
	"dojo/domReady!" ], function(Map, TiledLayer, ArcGISDynamicMapServiceLayer,
	Point, SpatialReference, SimpleMarkerSymbol,
	PictureMarkerSymbol, InfoTemplate,
	SimpleLineSymbol, Color, Graphic, GraphicsLayer, webMercatorUtils) {
	esriConfig.defaults.io.alwaysUseProxy = false;
 
	var mapOptions = {
		logo : false,
		nav : false,
		slider : true,
		sliderPosition : 'top-right',
		center:[116.499726,40.215285],
		zoom :0
	};

	var GraphicsLayer = new GraphicsLayer();
	
	/*
	*  添加底图
	* */
	var map = new Map("xmboxmap", mapOptions);
 
	/*
	* 添加边界
	* */
	map.addLayer(new ArcGISDynamicMapServiceLayer(MLZ.baseMapUrl));
	
	 
	
	/*
	 * 撒点
	 * */
	sprinklePoint(community);
	addEvenListerOfClick();
	
	/*
	 * 全景功能
	 * */
	
	$("._position").click(function(){
		map.setZoom(0);
		map.centerAt(MLZ.ToWebMercator(_center))
	});
	
	/*
	 * 测距功能
	 * */
	
	$("._range").click(function(){
		
		 var r=new range({map:map});
		 r.initDraw();
	});
	
	
	//监听checkbox点击事件后的自定义事件
	window.addEventListener("filtrate", function(e) {
		idArr= [];
		newArr = [];
		GraphicsLayer.clear();
		if(e.detail.type=='type'){
			tepList.map(function(item){
				e.detail.data.map(function(a){
					if(item.dangertypes.indexOf(a)>=0&&idArr.indexOf(item.id)<0){
						idArr.push(item.id);
						newArr.push(item);
					}
				})				
			});	
			sprinklePoint(newArr);
		}else if(e.detail.type=='punish'){
			var _index = 0;
			getPunish(_index);
			function getPunish(punishIndex){
				if(punishIndex>=tepList.length){
					sprinklePoint(newArr);
				}else{
					console.log(punishIndex);
					$.ajax({
						url:'getQyPunishByid',
						data:{
							id:tepList[punishIndex].id,
						},
						type:'POST',
						dataType:'JSON',
						success:function(res){
							if(res.length>0){
								res.map(function(s){
									e.detail.data.map(function(a){
										if(s.punishTypes.indexOf(a)>=0&&idArr.indexOf(tepList[punishIndex].id)<0){
											idArr.push(tepList[punishIndex].id);
											newArr.push(tepList[punishIndex]);												
										}
									});							
								})
								punishIndex = punishIndex+1;
								getPunish(punishIndex);
							}else if(res.length<=0){
								punishIndex = punishIndex+1;
								getPunish(punishIndex);
							}							
						},
						error:function(res){
							console.log(res);
						}
					});
				}				
			}			
		}
	})
	
	//撒点方法
	function sprinklePoint(pointJson) {
		pointJson.map(function(item) {
			var point = getPointByOther([ item.POINT_X, item.POINT_Y ]);
			var getSysObj = getSYS();
			GraphicsLayer.add(getGraphic(point, getSysObj.pictureMarkerSymbol, item, null));
		});
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
		e.graphic.symbol.height=35;
		e.graphic.symbol.width=27;
		GraphicsLayer.redraw();
	})
	
	dojo.connect(GraphicsLayer, 'onMouseOut', function(e) {
		e.graphic.symbol.height=32;
		e.graphic.symbol.width=25;
		GraphicsLayer.redraw();
	})
	
	/*
	 * 小圆点 点击事件
	 * */
	function addEvenListerOfClick() {
		dojo.connect(GraphicsLayer, 'onClick', function(e) {
			vm.punishAdd=true;
			var attr = e.graphic.attributes;
			var point = e.graphic.geometry;
			$.ajax({
				url:'getQyPunishByid',
				data:{
					id:attr.id,
				},
				type:'POST',
				dataType:'JSON',
				success:function(res){
					updateVue(attr,res);
					$('#main_left').animate({'left':'0px'});
					$('#mainRight').animate({'left':'360px'});
					$(".dragBox").animate({'left':'360px'});
					$(".dragBox").removeClass('fa-caret-right').addClass('fa-caret-left');
				}
			});			
		});
	}

	
	
});
 