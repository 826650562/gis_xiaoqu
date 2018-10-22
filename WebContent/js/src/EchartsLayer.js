define([ "dojo/_base/declare","esri/SpatialReference", "esri/layers/layer", "esri/geometry/Point", "/community/js/echarts.js", "esri/tasks/QueryTask", "esri/tasks/query", "esri/request", "dojo/_base/lang", "dojo/dom-construct", "dojo/_base/array", "dojo/dom-style" ],
	function(declare,SpatialReference, Layer, Point, echarts, QueryTask, Query, esriRequest, lang, domConstruct, arrayUtils, domStyle) {
		var EchartsLayer = declare(Layer, {
			_osmb : null,
			_canvas : null,
			_tileInfo : null,
			_mode : 0, // ON_DEMAND|SNAPSHOT
			_heightAttribute : '',
			_oidField : null, // will be overridden from meta query
			_query : null,
			_task : null,
			_oids : null, //track current objectids to mark new/old for animation fade in
			_featureExt : null, //current feature extent, 1.5 map extent
			_suspendOnPan : false,

			_echartsmap : null, //emap  
			_zrr : null,  // ZRender 
			_opts : null,
			_oldopts : null,
			_a_x : 0,
			_a_y : 0,

			_fsets : null,


			constructor : function(_opts, fset) {
				if (!(!!document.createElement('canvas').getContext)) {
					throw new Error('');
				}
				this._fsets = fset;
				this._opts = _opts;
				this._oldopts = jQuery.extend(true, {}, _opts);
				this.loaded = true;
			},

			_initLayer : function(json) {
				console.info("intilayer");
				this.loaded = true;
				this.onLoad(this);
			},
			//esri.layers.Layer.method
			_setMap : function(map, container, ind, lod) {
				console.info("setmap;---");
				this._map = map;
				var elcfg = {
					width : map.width + "px",
					height : map.height + "px",
					id : "echartLayer",
					style : "position: absolute; left: 0px; top: 0px;width:" + map.width + "px; height:" + map.height + "px;"
				};
				this._element = domConstruct.create("div", elcfg, container);
				this._echartsmap = echarts.init(this._element);
				this._zrr = this._echartsmap.getZr();
				this._echartsmap.on('hover', function(e) {
					console.info('hover', e);
				});
				//this._echartsmap = echarts.init(container);


				this.setdatas();
				this._connects = [];
				this._connects.push(map.on("resize", lang.hitch(this, this._onResize)));
				this._connects.push(map.on("pan", lang.hitch(this, this._onPan)));
				this._connects.push(map.on("extent-change", lang.hitch(this, this._onExtentChange)));
				this._connects.push(map.on("zoom-start", lang.hitch(this, this._onZoomStart)));
				//this._connects.push(map.on("mouse-over", lang.hitch(this, this._onMouseOver)));
				//this._connects.push(map.on("mouse-move", lang.hitch(this, this._onMouseMove)));
				this._connects.push(map.on("click", lang.hitch(this, this._onClick)));
				// mouse-move  mouse-over


				return this._element;
			},

			_switchEl : function(evt) {
				var tmp = {};
				for (var i in evt) {
					tmp[i] = evt[i];
				}
				tmp['toElement'] = dojo.query("canvas[data-zr-dom-id='_zrender_hover_']")[0];
				return tmp;
			},
			_onClick : function(evt) {
				var tmp = this._switchEl(evt);
				this._zrr.trigger('mousemove', tmp);
			//console.info(tmp);
			},
			_onMouseMove : function(evt) {
				var tmp = this._switchEl(evt);
				this._zrr.trigger('mousemove', tmp);

			},

			_onMouseOver : function(evt) {
				console.info('_onMouseOver');
			},

			// esri.layers.Layer.method
			_unsetMap : function(map, container) {
				if (this._element) {
					container.removeChild(this._element);
				}
				this._map = null;
				this._element = null;
			},


			_onResize : function(evt) {
				// console.info('_onResize');
				this._echartsmap.resize();
			},


			_onPan : function(evt) {
				this._clear();
				this._echartsmap.resize();
			},

			_onExtentChange : function(evt) {
				// this._clear();
				this.setdatas();
			},


			_onZoomStart : function(evt) {
				this._clear();
				this._echartsmap.clear();
			},
			setdatas : function() {

				//var fset=this._opts.featureSet;
				// var hStep = 300 / (this._fsets.features.length - 1);
				var self = this;
			    self._opts.series[0].data = [];
				$.each(this._fsets, function(i, item) {
					var point=self.maptoscreen(item, self);
					var d = {
						name : "测试" + i,
						value : [point.x,point.y]
					};

					//  self._opts.series[0].data.push(d);
					self._opts.series[0].data.push(d);
				});
				this._show();
				this._echartsmap.setOption(this._opts);
			},
			maptoscreen : function(p, self) {
				  self._map.spatialReference=new SpatialReference(3857)
				 return   self._map.toScreen(p);
			},
			_clear : function() {
				// display all canvas 
				var cls = $(this._element).children().children();
				$.each(cls, function(i, m) {
					$(m).css("display", 'none');
				});

			},
			_show : function() {
				//show canvas 
				var cls = $(this._element).children().children();
				$.each(cls, function(i, m) {
					// console.info(m);
					$(m).css("display", 'block');

				});
			}
		});

		lang.mixin(EchartsLayer, {
			MODE_ONDEMAND : 0,
			MODE_SNAPSHOT : 1
		});

		return EchartsLayer;
	}
)