package com.clint.service.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import com.clint.service.HomeService;
import com.clint.service.MapService;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;


@Service(value = "homeService")
public class HomeServiceImpl implements HomeService {

	@Resource
	private MapService mapService;

	public List<?> getListByArea(String area){
		String sql = "";
		if(area.endsWith("null") || StringUtils.isEmpty(area)){
			sql="select * from T_GIS_COMMUNITYINFO";
		}else{
			sql="select * from t_gis_communityinfo where area='"+ area+"'";
		}
		List<?> res = this.mapService.getListBySql(sql);
		
		return res;
		
	}

}
