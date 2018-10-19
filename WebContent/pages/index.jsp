<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<%@ taglib prefix="c" 
           uri="http://java.sun.com/jsp/jstl/core" %>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title></title>
<link href="<%=basePath %>js/layui/css/layui.css" rel="stylesheet" type="text/css">
<link href="<%=basePath %>js/font-awesome-4.7.0/css/font-awesome.css" rel="stylesheet"
	type="text/css" />
<link href="<%=basePath %>css/style.css" rel="stylesheet" type="text/css">
<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
      <script src="https://cdn.bootcss.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
<link href="http://116.236.96.146:28080/arcgis2/esri/css/esri.css" rel="stylesheet" type="text/css">
<script src="http://116.236.96.146:28080/arcgis2/init.js"></script>

<style type="text/css">
html, body {
	height: 100%;
}
</style>
</head>
<body>
	<div class="xmbox">
		<div class="xmboxleft">
			<div class="xmlefttop">
				<span class="bjqu bjactive">不限</span> <span class="bjqu">东城区</span>
				<span class="bjqu">西城区</span> <span class="bjqu">朝阳区</span> <span
					class="bjqu">海淀区</span> <span class="bjqu">丰台区</span> <span
					class="bjqu">石景山区</span> <span class="bjqu">门头沟区</span> <span
					class="bjqu">房山区</span> <span class="bjqu">通州区</span> <span
					class="bjqu">顺义区</span> <span class="bjqu">昌平区</span> <span
					class="bjqu">大兴区</span> <span class="bjqu">怀柔区</span> <span
					class="bjqu">平谷区</span> <span class="bjqu">密云区</span> <span
					class="bjqu">延庆区</span>
			</div>
			<div class="xmcont">

				<div class="xmcontitemouter">
					<div class="z-row xmcontitem">
						<div class="xmlistimg">
							<img src="<%=basePath %>images/xmimg1.jpg">
						</div>
						<div class="z-col padLR15">
							<div class="z-row">
								<div class="z-col xmlistitle">漫缇家园</div>
							</div>
							<div class="z-row">
								<div class="z-col xmlisttxt">地址：房山区窦店镇于庄村</div>
							</div>
						</div>
					</div>
				</div>
				<div class="xmcontitemouter">
					<div class="z-row xmcontitem">
						<div class="xmlistimg">
							<img src="<%=basePath %>images/xmimg1.jpg">
						</div>
						<div class="z-col padLR15">
							<div class="z-row">
								<div class="z-col xmlistitle">漫缇家园</div>
							</div>
							<div class="z-row">
								<div class="z-col xmlisttxt">地址：房山区窦店镇于庄村</div>
							</div>
						</div>
					</div>
				</div>
				<div class="xmcontitemouter xmcontouterActive">
					<div class="z-row xmcontitem">
						<div class="xmlistimg">
							<img src="<%=basePath %>images/xmimg1.jpg">
						</div>
						<div class="z-col padLR15">
							<div class="z-row">
								<div class="z-col xmlistitle">漫缇家园</div>
							</div>
							<div class="z-row">
								<div class="z-col xmlisttxt">地址：房山区窦店镇于庄村</div>
							</div>
						</div>
					</div>
				</div>
				<div class="xmcontitemouter">
					<div class="z-row xmcontitem">
						<div class="xmlistimg">
							<img src="<%=basePath %>images/xmimg1.jpg">
						</div>
						<div class="z-col padLR15">
							<div class="z-row">
								<div class="z-col xmlistitle">漫缇家园</div>
							</div>
							<div class="z-row">
								<div class="z-col xmlisttxt">地址：房山区窦店镇于庄村</div>
							</div>
						</div>
					</div>
				</div>
				<div class="xmcontitemouter">
					<div class="z-row xmcontitem">
						<div class="xmlistimg">
							<img src="<%=basePath %>images/xmimg1.jpg">
						</div>
						<div class="z-col padLR15">
							<div class="z-row">
								<div class="z-col xmlistitle">漫缇家园</div>
							</div>
							<div class="z-row">
								<div class="z-col xmlisttxt">地址：房山区窦店镇于庄村</div>
							</div>
						</div>
					</div>
				</div>
				<div class="xmcontitemouter">
					<div class="z-row xmcontitem">
						<div class="xmlistimg">
							<img src="<%=basePath %>images/xmimg1.jpg">
						</div>
						<div class="z-col padLR15">
							<div class="z-row">
								<div class="z-col xmlistitle">漫缇家园</div>
							</div>
							<div class="z-row">
								<div class="z-col xmlisttxt">地址：房山区窦店镇于庄村</div>
							</div>
						</div>
					</div>
				</div>
				<div class="xmcontitemouter">
					<div class="z-row xmcontitem">
						<div class="xmlistimg">
							<img src="<%=basePath %>images/xmimg1.jpg">
						</div>
						<div class="z-col padLR15">
							<div class="z-row">
								<div class="z-col xmlistitle">漫缇家园</div>
							</div>
							<div class="z-row">
								<div class="z-col xmlisttxt">地址：房山区窦店镇于庄村</div>
							</div>
						</div>
					</div>
				</div>
				<div class="xmcontitemouter">
					<div class="z-row xmcontitem">
						<div class="xmlistimg">
							<img src="images/xmimg1.jpg">
						</div>
						<div class="z-col padLR15">
							<div class="z-row">
								<div class="z-col xmlistitle">漫缇家园</div>
							</div>
							<div class="z-row">
								<div class="z-col xmlisttxt">地址：房山区窦店镇于庄村</div>
							</div>
						</div>
					</div>
				</div>
				<div class="xmcontitemouter">
					<div class="z-row xmcontitem">
						<div class="xmlistimg">
							<img src="images/xmimg1.jpg">
						</div>
						<div class="z-col padLR15">
							<div class="z-row">
								<div class="z-col xmlistitle">漫缇家园</div>
							</div>
							<div class="z-row">
								<div class="z-col xmlisttxt">地址：房山区窦店镇于庄村</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="xmboxmap" id="xmboxmap">
			<!---地图容器 start---->

			<!--------弹窗代码 strat------>
			<!-- <div class="maptk">
				<div class="z-row maptktitle">
					<div class="colorRed">东小口项目</div>
					<div>（始建于2015年3月）</div>
					<div class="z-col"></div>
					<div class="closeme">
						<i class="fa fa-remove fa-fw"></i>
					</div>
				</div>
				<div class="z-row maptkcont">
					<div class="tkimgbox">
						<div class="z-row">
							<div class="z-col maptkimg">
								<img src="images/tkimg.jpg">
							</div>
						</div>
						<div class="z-row">
							<div class="z-col padT10">
								<button class="layui-btn layui-btn-normal tkimgbtn">
									进入项目 <i class="fa fa-caret-right fa-fw"></i>
								</button>
							</div>
						</div>
					</div>
					<div class="z-col padL10 tktxtbox">
						<div class="z-row colorWhite">
							<div>
								<i class="fa fa-map-marker fa-fw"></i>
							</div>
							<div class="z-col">昌平区龙锦一街与科星西路交界口北侧</div>
						</div>
						<div class="z-row">
							<div class="z-col colorRed">房源</div>
						</div>
						<div class="z-row">
							<div class="z-col colorWhite">可配租房源共计1830套，其中大套型1106套，中套型148套，小套型576套。</div>
						</div>
						<div class="z-row">
							<div class="z-col colorRed">户型面积</div>
						</div>
						<div class="z-row">
							<div class="z-col colorWhite">58.03-61.95㎡（两居）、44.98-50.26㎡（一居）、30.04-32.61㎡（零居）</div>
						</div>
					</div>
				</div>

			</div> -->
			<!--------弹窗代码 end------>
			<!---地图容器 end---->
		</div>
	</div>
	<script>
		var community = ${communityArr};
	</script>
	<script src="<%=basePath %>js/jquery-1.11.0.min.js"></script>
	<script src="<%=basePath %>js/layui/layui.js"></script>
	<script src="<%=basePath %>js/config.js"></script>
	<script src="<%=basePath %>js/index.js"></script>
</body>
</html>