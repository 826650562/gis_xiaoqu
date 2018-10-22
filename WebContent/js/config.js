dojo.require("esri.geometry.webMercatorUtils");
var MLZ = {
	baseMapUrl:"http://116.236.96.146:6080/arcgis/rest/services/BJ_ZT/MapServer",
	isSwitchPoint : true,
	
	/**
	 * 转换为魔卡托坐标系
	 */
	ToWebMercator : function(geometry) {
		return esri.geometry.geographicToWebMercator(geometry);
	},
	/*
	 * 魔卡托坐标系转地理坐标系
	 * */
	MercatorToGeo : function(geometry) {
		return esri.geometry.webMercatorToGeographic(geometry);
	},

	ToWebMercator2 : function(long, lat) {
		return esri.geometry.lngLatToXY(long, lat);
	},
	/*
	 * 百度坐标系转国测局
	 */
	bd09togcj02 : function bd09togcj02(bd_lon, bd_lat) {
		var bd_lon = +bd_lon;
		var bd_lat = +bd_lat;
		var x = bd_lon - 0.0065;
		var y = bd_lat - 0.006;
		var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_PI);
		var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_PI);
		var gg_lng = z * Math.cos(theta);
		var gg_lat = z * Math.sin(theta);
		return [ gg_lng, gg_lat ]
	},

	/*
	 * wgs84转国测局
	 * */
	wgs84togcj02 : function wgs84togcj02(lng, lat) {
		var lat = +lat;
		var lng = +lng;
		if (out_of_china(lng, lat)) {
			return [ lng, lat ]
		} else {
			var dlat = transformlat(lng - 105.0, lat - 35.0);
			var dlng = transformlng(lng - 105.0, lat - 35.0);
			var radlat = lat / 180.0 * PI;
			var magic = Math.sin(radlat);
			magic = 1 - ee * magic * magic;
			var sqrtmagic = Math.sqrt(magic);
			dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
			dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
			var mglat = lat + dlat;
			var mglng = lng + dlng;
			return [ mglng, mglat ]
		}
	},
	log : function(info1, info2) {
		if (this.showLog) {
			var info1 = info1 || "";
			var info2 = info2 || "";
			console.log(info1, info2);
		}
	},
	errorLog : function(errorInfo) {
		if (!this.showLog) {
			console.error(errorInfo);
		}
	},
}