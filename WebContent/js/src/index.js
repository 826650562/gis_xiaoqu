 var map;

    require([
        "esri/map",
        "esri/geometry/Extent",
        "esri/layers/ArcGISTiledMapServiceLayer",
        "/hd_gis/pages/new_chaoliu/js/EchartsLayer.js",
        "esri/geometry/Point",
        "esri/layers/FeatureLayer", "esri/tasks/query",
        "/hd_gis/pages/new_chaoliu/js/echarts.js",
        "dojo/domReady!"
    ], function (Map, Extent, ArcGISTiledMapServiceLayer,EchartsLayer,Point,FeatureLayer,Query,echarts) {

       var initExtent = new Extent({
           "xmin": 110.18795267383415,
            "ymin": 29.510901674198237,
            "xmax": 123.43829640779832,
            "ymax": 40.022485790451746,
            "spatialReference": {"wkid": 4326}
        }); 
        map = new Map("map", {
            extent: initExtent,
             center: [121.48, 31.43],
            zoom: 2,
        });
        var basemap = new ArcGISTiledMapServiceLayer("http://localhost:6080/arcgis/rest/services/20161215_1basemap/MapServer");
        map.addLayer(basemap);

          featureLayer = new FeatureLayer('http://localhost:6080/arcgis/rest/services/hddl_p_tra_cond_l/MapServer/0');
          var query = new Query();
         // query.objectIds = [features[0].attributes.OBJECTID];
          query.outFields = [ "*" ];
          query.where='1=1';
          
         var  option = {
            geo: {
                map: 'none',
                label: {
                    emphasis: {
                        show: false
                    }
                },
                roam: true,
                itemStyle: {
                    normal: {
                        areaColor: '#323c48',
                        borderColor: '#404a59'
                    },
                    emphasis: {
                        areaColor: '#2a333d'
                    }
                }
            },
            series: [{
                type: 'lines',
                polyline: true,
                data : [
                    //{coords:null,lineStyle:{normal:{color:"rgba(223,90,90,1)"}}},
                   //{coords:[[500,330],[555,349],[130,349],[170,349],[123,459],[553,559]],lineStyle:{normal:{color:"rgba(223,90,90,1)"}}}
                  
                ],
                silent: true,
                lineStyle: {
                    normal: {
                        opacity: 0.4,
                        width:1
                    }
                },
                progressiveThreshold: 500,
                progressive: 200
            }, {
                type: 'lines',
                polyline: true,
                data : [
                  
                ],
                lineStyle: {
                    normal: {
                        width: 0
                    }
                },
                effect: {
                    constantSpeed:16,
                    show: true,
                    trailLength: 0.1,
                    symbolSize: 1.5
                },
                zlevel: 1
            }]

        };

      featureLayer.queryFeatures(query, function(featureSet) {
            console.info(featureSet);
            addmap(featureSet);
          });
      
      
       function addmap(featureSet){
            if (option && typeof option === "object") {
               var elayeer = new EchartsLayer(option,featureSet);
               map.addLayer(elayeer);
            }
       }
       

    });