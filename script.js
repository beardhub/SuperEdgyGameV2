document.createElement("body");
function addScripts(path, srcs){
	for (var p in srcs){
		var script = document.createElement("script");
		script.setAttribute("src",path+srcs[p]);
		document.head.appendChild(script);
	}
	/*if (srcs.length == 0) return;
	console.log(srcs);
	var script = document.createElement("script");
	script.setAttribute("src",path+srcs[0]);
	document.head.appendChild(script);
	srcs.splice(0,1);
	addScripts(path,srcs);*/
}
addScripts("",["Main.js","Keys.js","UI.js","Assets.js","Drawing.js","Mouse.js"]);
window.onload = init;
var eatiing;
function init(){
	var meta = document.createElement('meta');
	meta.name = "viewport";
	meta.content = "width=device-width, initial-scale=0.1, user-scalable=0";
	document.head.appendChild(meta);
	document.body.position = "fixed";
	document.body["overflow-y"] = "scroll";document.body.style.overflow = "hidden";
	//body { position: fixed; overflow-y:scroll }
	//meta.httpEquiv = "X-UA-Compatible";
	//meta.content = "IE=edge";
	//document.getElementsByTagName('head')[0].appendChild(meta);
	registerFramework(MainFramework,"M");
	registerFramework(KeysFramework,"K");
	registerFramework(UIFramework,"UI");
	registerFramework(AssetsFramework,"A");
	registerFramework(DrawingFramework,"D");
	registerFramework(MouseFramework,"Ms");
	//makeShortcut(new AFr.Manager(),"A");
	M.createCanvas(window.innerWidth,window.innerHeight);//document.body.clientWidth-50,document.body.clientHeight);
	var smaller = M.canvas.width, larger = M.canvas.height;
	if (smaller > M.canvas.height){
		smaller = M.canvas.height;
		larger = M.canvas.width;
	}
	smaller-=15;
	var size = 800;
	makeShortcut(new UI.DBox(smaller/2-size/2,smaller/2-size/2,size,size),"U");
	U.cropped = false;
	makeShortcut(new UI.DBox((M.canvas.width-smaller)/2,(M.canvas.height-smaller)/2,smaller,smaller), "UU");
	U.camera.zoomto(smaller/size);
	UU.add(U);
	UU.color = "green";
	U.color = "black";
	//A.setPath("..\\assets\\spaceshooter\\")
	A.loadImage("shipbase","ShipBase.png");
	A.loadImage("turret","Turret.png");
	A.load();
	/*
	
	
	<meta name="viewport" content="width=device-width; 
 initial-scale=0.1; user-scalable=0;"/>
	
	
	*/
	//makeShortcut(A.i,"img");
	//makeShortcut(A.a,"aud");
	//makeShortcut(K.Keys,"Keys");
	//console.log(K.Keys);
	//for (var p in window) console.log(p);
	//M.makeShortcut(M.canvas.getContext("2d"),"G");
	//makeShortcut(M.canvas,"C");
	
	//var loop = function(){
		//U.update();
		//U.render(C.getContext("2d"));
		//var g = ccontext;//M.canvas.getContext("2d");
		//var g = C.getContext("2d");
		//g.clearRect(0,0,C.width,C.height);//50,50,100,100);
		//if (w) y-=speed;
		//if (a) x-=speed;
		//if (s) y+=speed;
		//if (d) x+=speed;
		//g.fillStyle = "black";
		//g.fillRect(x,y,10,10);
		//if (Keys.W.down) y-=5;
		//if (Keys.S.down) y+=5;
		//if (Keys.A.down) x-=5;
		//if (Keys.D.down) x+=5;
	//}
	M.setLoop(function(){
		UU.update();
		UU.render(M.canvas.getContext("2d"));
	});
	Ms.setcanvas(M.canvas);
	Ms.setupListeners({
		down:U.mousedown.bind(U),//function(){	U.mousedown();console.log("dddown");},
		up:function(){		U.mouseup();},
		moved:function(){	},
		//click:function(){	U.mouseclick();},
		rclick:function(){	U.mouserclick();}
	});
	var hub = new K.KeyHub();
	hub.down = function(key){
		if (key === K.Keys.W) w = true;
		if (key === K.Keys.A) a = true;
		if (key === K.Keys.S) s = true;
		if (key === K.Keys.D) d = true;
		//console.log(key);
	}
	hub.up = function(key){
		if (key === K.Keys.W) w = false;
		if (key === K.Keys.A) a = false;
		if (key === K.Keys.S) s = false;
		if (key === K.Keys.D) d = false;
	}
	hub = new K.KeyHub();
	hub.down = U.keydown.bind(U);
	hub.up = U.keyup.bind(U);
	//for (var i = 0; i < hub.length; i++)
	//	console.log(hub[i]);
	//for (var p in hub)
	//	console.log(p);
	//console.log(hub[0]);
	//hub.up = function(key){
	//	console.log(key);}
	//hub.pressed = function(key){
	//	console.log(key);}//*/
		//hub.refresh();
	K.setupListeners(hub);
	M.startLoop();
}
function Foodses(){
	var a = 0;
	var speed = .5;
	this.init = function(){
		this.x = (Math.random()/2+1/4)*this.container.w;
		this.y = (Math.random()/2+1/4)*this.container.h;
		a = Math.atan2(this.y-this.container.h/2,this.x-this.container.w/2);//+Math.PI;
	}
	this.update = function(){
		if (this.x < 0 || this.x > this.container.w || this.y < 0 || this.y > this.container.h){
			this.container.remove(this);
			U.get("p").lose();
		}
		if (Math.abs(U.get("p").x - this.x)<40&Math.abs(U.get("p").y - this.y)<40){
			U.get("p").eat();
			this.container.add(new Foodses());
			this.container.remove(this);
		}
		this.x+=Math.cos(a)*speed*(this.dir);
		this.y+=Math.sin(a)*speed*(this.dir);
		this.move(a,speed);
	}
	this.render = function(g){
		g.fillStyle = "white";
		g.fillRect(this.x-5,this.y-5,10,10);
	}
}
Foodses.prototype.dir = 1;
Foodses.prototype.move = function(a, speed){
}
function Foodses2(){
	var a = 0;
	var speed = .5;
	this.init = function(){
		this.x = (Math.random()/2+1/4)*this.container.w;
		this.y = (Math.random()/2+1/4)*this.container.h;
		a = Math.atan2(this.y-this.container.h/2,this.x-this.container.w/2)+Math.PI;
	}
	
}
function Feeder(){
	
}
function Player(){
	
}
function WittleBittySquare(){
	//this.x = M.canvas.width/2;
	//this.y = M.canvas.height/2;
	var bas = new D.Sprite(A.i("shipbase"));
	//var tur = new D.Sprite(A.i("turret"));
	var aim = {x:Ms.x(),y:Ms.y()};
	var dist = {x:0,y:0}
	var a = 0;
	var len = 0;
	var dblspwn;
	//console.log(img("shipbase").width);
	//spr.scalex = .2;
	//spr.scaley = .2;
	bas.setOriginCenter();
	//tur.setOriginCenter();
	//spr.originx = 25;
	var speed = 8;
	var score = 0;
	var high = 0;
	var hack = "";
	//this.init = function(){
	//	console.log("Efeffee"+this.container.w);
	//}
	this.eat = function(){
		score++;
		if (score > high)
			high = score;
		//console.log(score);
		//if (score > 250)
		//	clearInterval (eating);
	}
	this.lose = function(){
		score = Math.round(score*.85);
		//console.log(score);
	}
	this.init = function(){
		this.x = this.container.w/2;
		this.y = this.container.h/2;
		this.container.add(new UI.Follow(bas,this));
		//this.container.add(new UI.Follow(tur,this));
		//this.container.add(new UI.Follow(aim,Ms));
	}
	this.mousedown = function(){
		//this.x = Ms.x();
		//this.y = Ms.y();
		//dist.x = aim.x;
		//dist.y = aim.y;
			//len = Math.sqrt((this.x-aim.x)*(this.x-aim.x)+(this.y-aim.y)*(this.y-aim.y));
			//a = Math.atan2(-this.y+aim.y,-this.x+aim.x);
                //this.x=0; 
		aim.x=Ms.x();
		aim.y=Ms.y();
	}
	this.keydown = function(k){
		if (k.name == "L" && (hack==""||hack=="LO"))
			hack+=k.name;
		else if (k.name == "O" && hack=="L")
			hack+=k.name;
		if ("LO".indexOf(k.name)==-1)hack = "";
		if (hack=="LOL"&&Foodses.prototype.dir==1){
			Foodses.prototype.dir = -15;
			dblspwn = setInterval(function(){U.add(new Foodses());},100);
		}
	}
	this.keyup = function(k){
		if (k.name == "L" && hack=="LOL"){
			Foodses.prototype.dir = 1;
			hack = "";
			clearInterval(dblspwn);
		}
	}
	this.update = function(){
		
		
		if (Ms.isdown() && Ms.reld(aim)>20){
			//console.log(Ms.rely(this));
			//this.x+=Ms.relx(this);///speed;
			//this.y+=Ms.rely(this);///speed;
			this.x+=speed*Math.cos(Math.atan2(Ms.rely(aim),Ms.relx(aim)));
			this.y+=speed*Math.sin(Math.atan2(Ms.rely(aim),Ms.relx(aim)));
			
			//this.x+=speed*Math.cos(Math.atan2(Ms.rely(this.container)-this.y,Ms.relx(this.container)-this.x));
			//this.y+=speed*Math.sin(Math.atan2(Ms.rely(this.container)-this.y,Ms.relx(this.container)-this.x));
		}
		console.log(this.x+" "+this.y);
		
		//if (Foodses.prototype.dir < -30) Foodses.prototype.dir = 1;
		//if (Foodses.prototype.dir < 1) Foodses.prototype.dir--;
		//console.log(hack);
			/*if (len > 0){
				this.x+=speed*Math.cos(a);
				this.y+=speed*Math.sin(a);
				len-=speed;
			}*/
		//tur.rotateto(Math.atan2(aim.y-tur.y,aim.x-tur.x));
		//if (K.Keys.W.down) this.y-=speed;
		//if (K.Keys.S.down) this.y+=speed;
		//if (K.Keys.A.down) this.x-=speed;
		//if (K.Keys.D.down) this.x+=speed;
		
	}
	this.render = function(g){
		g.fillStyle = "white";
		bas.render(g);
		//tur.render(g);
		g.font = "15px Arial";
		g.fillText("score   "+score, 10,15);//this.x-30, this.y);
		g.fillText("hiscore "+high, 10,30);//this.x-30, this.y+15);
		
		g.fillStyle="red";
		g.fillRect(aim.x-10-this.container.container.x,aim.y-10-this.container.container.y,20,20);//+Ms.rely(this.container),20,20);
	}
}
// Setup before beginning update loop
function start(){
	//console.log(A.ready);
	U.add(new WittleBittySquare(),"p");
	U.add(new Foodses());
	setInterval(function(){U.add(new Foodses());},10000);
	//var mini = new UI.DBox(700,0,100,100);
	//U.add(mini);
	//mini.color = "red";
	//mini.add(new WittleBittySquare(),"p2");
	//U.add(new UI.Follow(mini,U.get("p"),140,140));
	//mini.add(new UI.Follow(mini.camera,mini.get("p2"),0,0));
}
