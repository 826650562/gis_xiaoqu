package com.clint.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.clint.service.HomeService;

import net.sf.json.JSONArray;
 

/**
 * @author might
 *
 */
@Controller
@RequestMapping(value = "/home")
public class homeController {
	
	@Resource
	private HomeService homeService;
	
	/**
	 * @param req
	 * @param reponse
	 * @return
	 * 返回主页
	 */
	@RequestMapping(value = "")
	public String index(HttpServletRequest req,HttpServletResponse reponse,Model model) {
		List list = this.homeService.getListByArea("null");
		JSONArray arr = JSONArray.fromObject(list);
		model.addAttribute("communityArr",arr);
		return "pages/index";
	}
	
}
 