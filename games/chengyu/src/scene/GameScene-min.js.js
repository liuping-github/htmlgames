var primitiveGold=200,shareGold=300,shareCallBackFun=function(){var a=new Date,b=localStorage.getItem(GameString.shareDate)==null?a.toLocaleDateString():localStorage.getItem(GameString.shareDate);if(b)if(new Date(Date.parse(b.replace(/-/g,"/")))<=a){a=localStorage.getItem(GameString.goldNum)==null?primitiveGold:parseInt(localStorage.getItem(GameString.goldNum));a+=shareGold;localStorage.setItem(GameString.goldNum,a);gameLayer.goldLabel.setString(a)}localStorage.setItem(GameString.shareDate,(new Date((new Date/
1E3+86400)*1E3)).toLocaleDateString());DCAgent.onEvent("chengyu1WeixinShare")};Array.prototype.contains=function(a){for(var b=0;b<this.length;b++)if(this[b]==a)return true;return false};function randomsort(){return Math.random()>0.5?-1:1}
var isMobileBrowser=cc.sys.platform==cc.sys.MOBILE_BROWSER,GameLayer=cc.LayerColor.extend({_adLayerHeight:0,level:1,goldNum:0,cnt:1,pic:"",trueAnswerCnArray:[],trueAnswerPyArray:[],answerStrArray:[],explainFontStr:"",chooseMenu:null,chooseFontDef:null,chooseStringArray:[],answerMenuRowsArray:[],answerFontArray:[],answerRows:3,answerColumns:8,goldLabel:null,tipGold:-50,lookAnswerGold:-100,passLevelGold:5,resp:null,topWaveBgLabel:null,levelImg:null,ctor:function(){this._super();this._adLayerHeight=
isMobileBrowser?winSize.height*3/23:winSize.height*3/16;this.initLayout();this.initData();return true},setData:function(){this.topWaveBgLabel.setString(GameString.diCn+this.level+GameString.guanCn);this.goldLabel.setString(this.goldNum);this.levelImg.setTexture("res/img/"+this.pic+".png");for(var a=0;a<24;a++)this.answerFontArray[a].setString(this.answerStrArray[a])},initData:function(){var a=this,b,c=cc.sys.localStorage;this.level=parseInt(c.getItem(GameString.levelIndex)==null?1:c.getItem(GameString.levelIndex));
this.goldNum=c.getItem(GameString.goldNum)==null?200:parseInt(c.getItem(GameString.goldNum));var d=cc.loader.getXMLHttpRequest();d.onreadystatechange=function(){if(d.readyState==4&&d.status>=200&&d.status<=207){b=JSON.parse(d.responseText).data;a.explainFontStr=b.explain;a.cnt=parseInt(b.cnt);a.pic=b.pic;a.trueAnswerCnArray=new Array(b.c1,b.c2,b.c3);a.trueAnswerPyArray=new Array(b.p1,b.p2,b.p3);a.answerStrArray=b.answerString.split("");a.answerStrArray.sort(randomsort);a.setData()}};d.open("GET",
"http://www.xmqchd.com/gameadmin/api/getChengyuRecord/"+this.level,true);d.send()},nextLevel:function(){this.levelImg.setTexture("res/img/loading.png");for(var a=0;a<this.chooseMenu.getChildrenCount();a++){var b=this.chooseMenu.children[a];b.getChildByTag(1)&&b.getChildByTag(1).removeFromParent(0)}for(a=0;a<this.answerFontArray.length;a++)this.answerFontArray[a].getParent().setScale(1);this.initData()},initLayout:function(){var a=new cc.Sprite(res.background_png);a.attr({x:winSize.width/2,y:winSize.height/
2});this.addChild(a);var b=new cc.Sprite(game_res.title_bar_png);b.attr({x:winSize.width/2,y:winSize.height-b.getContentSize().height/2});this.addChild(b);a=new cc.Sprite(game_res.gold_bg_png);b.addChild(a);a.attr({x:b.getContentSize().width-a.getContentSize().width/2-10,y:b.getContentSize().height/2});this.goldLabel=new cc.LabelTTF(this.goldNum.toString(),GameString.cnFontName,22,cc.size(100,20),cc.TEXT_ALIGNMENT_RIGHT);this.goldLabel.setPosition(a.getContentSize().width/2,a.getContentSize().height/
2);a.addChild(this.goldLabel);a=new cc.Sprite(game_res.top_wave_bg_png);a.attr({x:b.getContentSize().width/2,y:b.getContentSize().height/2});b.addChild(a);this.topWaveBgLabel=new cc.LabelTTF("",GameString.cnFontName,24,cc.size(320,32),cc.TEXT_ALIGNMENT_CENTER);this.topWaveBgLabel.attr({x:a.getContentSize().width/2,y:15});a.addChild(this.topWaveBgLabel);a=new cc.Sprite(game_res.image_frame_png);a.setAnchorPoint(Anchor.MIDDLE_TOP);a.attr({x:winSize.width/2,y:b.getPositionY()-40});this.addChild(a);this.levelImg=
new cc.Sprite;this.levelImg.attr({x:a.getContentSize().width/2,y:a.getContentSize().height/2});a.addChild(this.levelImg);var c=new cc.Sprite(game_res.ic_delete_png);this.addChild(c);b=new cc.Sprite(game_res.ic_gold_png);b.attr({x:c.getContentSize().width/2,y:-5});b.setScaleX(1.3);c.addChild(b);var d=new cc.LabelTTF(Math.abs(this.lookAnswerGold),GameString.cnFontName,12,cc.size(34,13),cc.TEXT_ALIGNMENT_RIGHT);d.setPosition(b.getContentSize().width/2,b.getContentSize().height/2);b.addChild(d);d=new cc.Sprite(game_res.ic_tip_png);
var e=new cc.Sprite(game_res.ic_gold_png);e.attr({x:d.getContentSize().width/2,y:-10});e.setScaleX(1.1);d.addChild(e);var f=new cc.LabelTTF(Math.abs(this.tipGold),GameString.cnFontName,13,cc.size(30,13),cc.TEXT_ALIGNMENT_RIGHT);f.setPosition(e.getContentSize().width/2,e.getContentSize().height/2);e.addChild(f);f=new cc.Sprite(game_res.ic_delete_png);f.addChild(b);b=new cc.MenuItemSprite(c,f,function(){this.lookAnswerDialogShow()},this);b.attr({x:a.getPositionX()-a.getContentSize().width/2-c.getContentSize().width/
2-5,y:a.getPositionY()-a.getContentSize().height/2+50});c=new cc.Sprite(game_res.ic_tip_png);c.addChild(e);c=new cc.MenuItemSprite(d,c,function(){this.tipDialogShow()},this);c.attr({x:b.getPositionX(),y:b.getPositionY()-90});e=new cc.Sprite(game_res.ic_share_png);d=new cc.Sprite(game_res.ic_share_png);d=new cc.MenuItemSprite(e,d,function(){this.shareDialogShow()},this);d.attr({x:a.getPositionX()+a.getContentSize().width/2+e.getContentSize().width/2+10,y:a.getPositionY()-a.getContentSize().height/
2+20});a=new cc.Sprite(game_res.download_png);e=new cc.Sprite(game_res.download_png);e=new cc.MenuItemSprite(a,e,function(){this.downDialogShow()},this);e.attr({x:d.getPositionX(),y:d.getPositionY()-60});e.addChild(a);a=new cc.Menu(b,c,d,e);a.attr({x:0,y:0});this.addChild(a);b=new cc.FontDefinition;b.cnFontName=GameString.cnFontName;b.fontSize="38";b.fillStyle=cc.color(0,0,0,255);c=cc.textureCache.addImage(game_res.answer_rect_normal_png);d=cc.textureCache.addImage(game_res.answer_rect_press_png);
this.chooseStringArray=new Array(4);this.answerMenuRowsArray=new Array(this.answerRows);for(a=0;a<this.answerRows;a++){e=new cc.Menu;e.setPosition(winSize.width/2,this._adLayerHeight+a*60);for(f=0;f<this.answerColumns;f++){var g=new cc.Sprite(c),j=new cc.Sprite(d);g=new cc.MenuItemSprite(g,j,function(h){for(var m=h.getChildByTag(1).getString(),i=0;i<this.chooseMenu.getChildrenCount();i++){var l=this.chooseMenu.children[i];if(!l.getChildByTag(1)){var k=new cc.LabelTTF(m);k.setTextDefinition(this.chooseFontDef);
k.setPosition(l.getContentSize().width/2,l.getContentSize().height/2);k.setTag(1);k.answerIndex=h.getChildByTag(1).answerIndex;l.addChild(k);this.chooseStringArray[i]=m;h.setScale(0);for(i=0;i<this.chooseMenu.getChildrenCount();i++)if(this.chooseMenu.children[i].getChildByTag(1)){if(i==this.chooseMenu.getChildrenCount()-1){h=this.chooseStringArray.join("");this.trueAnswerCnArray.contains(h)?this.passLevel(false,h):this.chooseMenu.runAction(cc.sequence(cc.moveBy(0.05,cc.p(8,0)),cc.moveBy(0.05,cc.p(-8,
0))).repeat(5))}}else break;break}}},this);j=new cc.LabelTTF;j.setTextDefinition(b);j.setPosition(g.getContentSize().width/2,g.getContentSize().height/2);j.setTag(1);j.answerIndex=a*this.answerColumns+f;g.addChild(j);this.answerFontArray[a*this.answerColumns+f]=j;e.addChild(g);this.answerMenuRowsArray[a]=e}e.alignItemsHorizontallyWithPadding(3);this.addChild(e)}this.chooseMenu=new cc.Menu;this.chooseFontDef=new cc.FontDefinition;this.chooseFontDef.cnFontName=GameString.cnFontName;this.chooseFontDef.fontSize=
"38";this.chooseMenu.setPositionY(this.answerMenuRowsArray[2].getPositionY()+60);for(a=0;a<4;a++){b=new cc.Sprite(game_res.choose_rect_normal_png);c=new cc.Sprite(game_res.choose_rect_press_png);this.chooseMenu.addChild(new cc.MenuItemSprite(b,c,function(h){if(h.getChildByTag(1)){h.getChildByTag(1).getString();this.answerFontArray[h.getChildByTag(1).answerIndex].getParent().setScale(1);h.removeChildByTag(1)}},this))}this.chooseMenu.alignItemsHorizontallyWithPadding(10);this.addChild(this.chooseMenu);
return true},passLevel:function(a,b){b||(b=this.trueAnswerCnArray[0]);this.winDialogShow(b,this.explainFontStr,a);b=parseInt(localStorage.getItem(GameString.levelIndex)==null?1:localStorage.getItem(GameString.levelIndex));if(this.level>=b){localStorage.setItem(GameString.levelIndex,b+1);currLevel=b+1;a||this.addGoldNum(this.passLevelGold)}},tipWord:function(){var a=this.chooseMenu.children[0],b=a.getChildByTag(1);if(b){this.answerFontArray[b.answerIndex].getParent().setScale(1);b.removeFromParent();
this.chooseStringArray.splice(0,1)}b=this.trueAnswerCnArray[0].split("")[0];for(var c=0;c<this.answerFontArray.length;c++)if(this.answerFontArray[c].getString()==b){var d=new cc.LabelTTF(b);d.setTextDefinition(this.chooseFontDef);d.setPosition(a.getContentSize().width/2,a.getContentSize().height/2);d.setTag(1);d.answerIndex=c;a.addChild(d);this.chooseStringArray[0]=b;this.answerFontArray[c].getParent().setScale(0);break}this.addGoldNum(this.tipGold)},lookAnswerDialogShow:function(){var a=new cc.LayerColor(cc.color(0,
0,0,150)),b=new cc.Sprite(game_res.dialog_blue_bg_png);b.attr({x:winSize.width/2,y:winSize.height/2});a.addChild(b);var c=new cc.LabelTTF(GameString.lookAnswerCn1+Math.abs(this.lookAnswerGold)+GameString.lookAnswerCn2,GameString.cnFontName,32,cc.size(b.getContentSize().width-20,b.getContentSize().height));c.setFontFillColor(cc.color(0,0,0,255));c.setPosition(b.getContentSize().width/2,0);b.addChild(c);if(parseInt(this.goldLabel.getString())>=Math.abs(this.lookAnswerGold)){c=new cc.Sprite(game_res.button_next_normal_png);
var d=new cc.Sprite(game_res.button_next_press_png);c=new cc.MenuItemSprite(c,d,function(){a.removeFromParent();this.addGoldNum(this.lookAnswerGold);this.passLevel(true)},this);d=new cc.LabelTTF(GameString.useCn,GameString.cnFontName,30,cc.size(320,30),cc.TEXT_ALIGNMENT_CENTER);d.setPosition(c.getContentSize().width/2,c.getContentSize().height/2);c.addChild(d);c=new cc.Menu(c);c.attr({x:winSize.width/2,y:b.getPositionY()-150});a.addChild(c)}cc.eventManager.addListener({event:cc.EventListener.TOUCH_ONE_BY_ONE,
swallowTouches:true,onTouchBegan:function(){return true},onTouchEnded:function(e,f){f.getCurrentTarget().removeFromParent()}},a);this.addChild(a);return true},tipDialogShow:function(){var a=new cc.LayerColor(cc.color(0,0,0,150)),b=new cc.Sprite(game_res.dialog_blue_bg_png);b.attr({x:winSize.width/2,y:winSize.height/2});a.addChild(b);var c=new cc.LabelTTF(GameString.tipCn1+Math.abs(this.tipGold)+GameString.tipCn2,GameString.cnFontName,32,cc.size(b.getContentSize().width-20,b.getContentSize().height));
c.setFontFillColor(cc.color(0,0,0,255));c.setPosition(b.getContentSize().width/2,0);b.addChild(c);if(parseInt(this.goldLabel.getString())>=Math.abs(this.tipGold)){c=new cc.Sprite(game_res.button_next_normal_png);var d=new cc.Sprite(game_res.button_next_press_png);c=new cc.MenuItemSprite(c,d,function(){a.removeFromParent();this.tipWord()},this);d=new cc.LabelTTF(GameString.useCn,GameString.cnFontName,30,cc.size(320,30),cc.TEXT_ALIGNMENT_CENTER);d.setPosition(c.getContentSize().width/2,c.getContentSize().height/
2);c.addChild(d);c=new cc.Menu(c);c.attr({x:winSize.width/2,y:b.getPositionY()-150});a.addChild(c)}cc.eventManager.addListener({event:cc.EventListener.TOUCH_ONE_BY_ONE,swallowTouches:true,onTouchBegan:function(){return true},onTouchEnded:function(e,f){f.getCurrentTarget().removeFromParent()}},a);this.addChild(a);return true},winDialogShow:function(a,b,c){var d=this,e=new cc.LayerColor(cc.color(0,0,0,200)),f=new cc.Sprite(game_res.dialog_blue_bg_png);f.attr({x:winSize.width/2,y:winSize.height-195});
e.addChild(f);var g=new cc.LabelTTF(GameString.winCn,GameString.cnFontName,50);g.setFontFillColor(cc.color(0,0,0,255));g.setPosition(f.getContentSize().width/2,f.getContentSize().height/2-20);f.addChild(g);g=new cc.Sprite(game_res.answer_red_bg_png);g.setAnchorPoint(Anchor.MIDDLE);g.attr({x:winSize.width/2,y:f.getPositionY()-150});e.addChild(g);a=new cc.LabelTTF(a,GameString.cnFontName,30);a.setPosition(g.getContentSize().width/2,g.getContentSize().height/2);g.addChild(a);if(!c){c=new cc.Sprite(game_res.gold_png);
c.setAnchorPoint(Anchor.MIDDLE);c.attr({x:winSize.width/2,y:f.getPositionY()-f.getContentSize().height/2-20});e.addChild(c);a=new cc.LabelTTF(GameString.rewardCn,GameString.cnFontName,20,cc.size(40,20),cc.TEXT_ALIGNMENT_RIGHT);a.setPosition(c.getPositionX()-35,c.getPositionY());a.setFontFillColor(cc.color(217,221,54,255));e.addChild(a);a=new cc.LabelTTF("+5",GameString.cnFontName,20,cc.size(40,18),cc.TEXT_ALIGNMENT_LEFT);a.setPosition(c.getPositionX()+37,c.getPositionY());a.setFontFillColor(cc.color(217,
221,54,255));e.addChild(a)}c=new cc.Sprite(game_res.button_next_normal_png);a=new cc.Sprite(game_res.button_next_press_png);c=new cc.MenuItemSprite(c,a,function(){d.nextLevel();e.removeFromParent()},e);a=new cc.LabelTTF(GameString.nextLevelCn,GameString.cnFontName,30,cc.size(320,30),cc.TEXT_ALIGNMENT_CENTER);a.setFontFillColor(cc.color(0,0,0,255));a.setPosition(c.getContentSize().width/2,c.getContentSize().height/2);c.addChild(a);c=new cc.Menu(c);c.attr({x:winSize.width/2,y:f.getPositionY()-270});
e.addChild(c);b=new cc.LabelTTF(b,GameString.cnFontName,22,cc.size(winSize.width-30,winSize.height));b.setAnchorPoint(Anchor.MIDDLE_TOP);b.setFontFillColor(cc.color(217,221,54,255));b.setPosition(winSize.width/2,c.getPositionY()-40);e.addChild(b);e.setPositionX(winSize.width);e.runAction(cc.moveTo(0.2,cc.p(0,0)));this.addChild(e);return true},shareDialogShow:function(){this.addChild(new ShareDialogLayer)},downDialogShow:function(){this.addChild(new DownDialogLayer)},addGoldNum:function(a){var b=localStorage.getItem(GameString.goldNum)==
null?primitiveGold:parseInt(localStorage.getItem(GameString.goldNum));b+=a;localStorage.setItem(GameString.goldNum,b);this.goldLabel.setString(b)}}),ShareDialogLayer=cc.LayerColor.extend({ctor:function(){this._super(cc.color(0,0,0,200),cc.winSize.width,cc.winSize.height);var a=new cc.Sprite(game_res.arrow_png);a.anchorX=1;a.anchorY=1;a.x=cc.winSize.width-20;a.y=cc.winSize.height-15;this.addChild(a);a=new cc.LabelTTF(GameString.shareCn,GameString.cnFontName,38,cc.size(cc.winSize.width*0.8,cc.winSize.height));
a.x=cc.winSize.width/2;a.y=cc.winSize.height-100;a.anchorY=1;a.shadowColor=cc.color(255,255,255);a.shadowBlur=50;this.addChild(a)},onEnter:function(){this._super();cc.eventManager.addListener({event:cc.EventListener.TOUCH_ONE_BY_ONE,swallowTouches:true,onTouchBegan:function(){return true},onTouchEnded:function(a,b){b.getCurrentTarget().removeFromParent()}},this)}}),DownDialogLayer=cc.LayerColor.extend({ctor:function(){this._super(cc.color(0,0,0,200),cc.winSize.width,cc.winSize.height);var a=new cc.LabelTTF(GameString.downLoadCn,
GameString.cnFontName,38,cc.size(cc.winSize.width*0.8,cc.winSize.height));a.x=cc.winSize.width/2;a.y=cc.winSize.height-100;a.anchorY=1;a.shadowColor=cc.color(255,255,255);a.shadowBlur=50;this.addChild(a);a=new cc.Sprite(game_res.main_button_normal_png);var b=new cc.Sprite(game_res.main_button_press_png);a=new cc.MenuItemSprite(a,b,function(){DCAgent.onEvent("chengyu1Click");window.open("http://m.yuanmazg.com/game")},this);b=new cc.LabelTTF(GameString.chengyu,GameString.cnFontName,
30,cc.size(320,30),cc.TEXT_ALIGNMENT_CENTER);b.setPosition(a.getContentSize().width/2,a.getContentSize().height/2);b.setFontFillColor(cc.color(0,0,0,255));a.addChild(b);a.attr({x:winSize.width/2,y:winSize.height/2});b=new cc.Sprite(game_res.main_button_normal_png);var c=new cc.Sprite(game_res.main_button_press_png);b=new cc.MenuItemSprite(b,c,function(){DCAgent.onEvent("chengyu3Click");window.open("http://m.yuanmazg.com/game")},this);c=new cc.LabelTTF(GameString.chengyu3,GameString.cnFontName,
30,cc.size(320,30),cc.TEXT_ALIGNMENT_CENTER);c.setPosition(a.getContentSize().width/2,a.getContentSize().height/2);c.setFontFillColor(cc.color(0,0,0,255));b.addChild(c);b.attr({x:a.getPositionX(),y:a.getPositionY()-90});a=new cc.Menu(a,b);a.attr({x:0,y:0});this.addChild(a,1E3)},onEnter:function(){this._super();cc.eventManager.addListener({event:cc.EventListener.TOUCH_ONE_BY_ONE,swallowTouches:true,onTouchBegan:function(){return true},onTouchEnded:function(a,b){b.getCurrentTarget().removeFromParent()}},
this)}}),gameLayer,GameScene=cc.Scene.extend({ctor:function(){this._super();gameLayer=new GameLayer;this.addChild(gameLayer)},onEnter:function(){this._super()}});