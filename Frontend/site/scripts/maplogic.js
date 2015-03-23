
var tiles;
//var homies;
//var vehicles;
var activeitem;
var useronline;
var user;
var zoomlevel = 1;
var screensizex;
var screensizey;

$(function () {
    $("#content").draggable();
});

function zoom(value) {
    zoomlevel += value;
    var left;
    
    if (value > 0) {
        left = "-=191";
        top = "-=191";
    }
    else
    {
        left = "+=191";
        top: "+=191";
    }
   

    $("#content").animate({

        transform: "scale("+zoomlevel+")",
        left: left,
        top: top
     



    }, 1000, function () {
        // Animation complete.
    });


}

window.onload = function () {

    tiles = new Array();
    // homies = new Array();

    $("#maparea").css("width", $(document).width());
    $("#maparea").css("height", $(document).height());


    user = { "name": "Mathias Fredriksson", "gangid": 1, "color": "B35DED" }


    $(".user").append("<span>" + user.name + " | <span class='usercolor'>....</span> | Logga ut</span>");
    $(".usercolor").css("color", "#" + user.color);
    $(".usercolor").css("background-color", "#" + user.color);

    $("#gotohq").on("click", function () {
        var element = $("." + user.gangid + "hq");
        GoToItem(element);
    });


   //generateTiles();


    generateTiles2();
   
    //rendergangmembers();


    screensizex = $("body").width(); ;
    screensizey = $("body").height();
    
   

}

function rendergangmembers() {
    for (var i = 0; i < tiles.length; i++) {
        for (var k = 0; k < tiles[i].items.length; k++) {
            if (user.color == tiles[i].items[k].color) {
                var span = document.createElement("span");
                $(span).html(tiles[i].items[k].name + "| ");

                span.onclick = (function () {
                    var currentk = tiles[i];
                    return function () {

                        var elm = $("#tile" + currentk.id);
                        GoToItem(elm);
                        //alert(currentk.id);
                    }
                })();
                $(".homies").append(span);
            }
        }
    }
}

function movemap(top, left) {

    
    $("#content").animate({
        
        left: left,
        top: top
        
    }, 1000, function () {
        // Animation complete.
    });

}



function get(elclass) {
    $("." + elclass).css("display", "block");

}



var c = 1;

function cuniq() {



    var d = new Date(),
        m = d.getMilliseconds() + "",
        u = ++d + m + (++c === 10000 ? (c = 1) : c);

    return u;
}





function generateplayers(numberofplayers) {
    var colors = new Array("DB42C7", "B35DED", "1EFA3F", "FABF1E", "EB7465", "6BB7DD", "1AFCF0", "E8F908");

    var images = new Array("hiphop.png", "dealer.png", "gang.png", "homie.png");
    var firstnames = new Array("Marcus", "David", "Sylvester", "Sverker", "Baltasar", "Tito", "Bulan", "Biffen","Christer");
    var lastnames = new Array("Birro", "Fjell", "Skarsgård", "Oredson", "Front", "Kamberg", "Mård", "Bofast","Pettersson");




    for (var i = 0; i < numberofplayers; i++) {
        var tnr = Math.floor((Math.random() * 192));
        var energy = Math.floor((Math.random() * 100) + 1);
        var firstname = firstnames[Math.floor((Math.random() *9))];
        var lastname = lastnames[Math.floor((Math.random() * 9))];

        var gangid = Math.floor((Math.random() * 8));

        var color = colors[gangid];

        var id = cuniq();

        var picture = images[Math.floor((Math.random() * 4))];
        var homie = { id: id, tileid: tnr, name: firstname + " " + lastname, color: color, picture: "content/imgs/" + picture, energy: energy, gangid: gangid, type: "human", inventory: [] };
        //homies.push({ id: i, tileid: tnr, name: firstname + " " + lastname, color: color, picture: "content/imgs/" + picture, energy: energy, gangid: gangid, type: "human" });
        tiles[tnr].items.push(homie);

    }


    tiles[85].items.push({ id: 1, tileid: 85, type: "vehicle", name: "saab900", picture: "content/imgs/vehicles/saab900.png", energy: 100, gangid: 1, inventory: [], homies: [] });
    tiles[85].items.push({ id: 1, tileid: 85, type: "human", name: "Petter Askergren", picture: "content/imgs/gang.png", energy: 100, gangid: 1, inventory: [] });





}


function shuffle(array) {
    var counter = array.length, temp, index;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}


function renderItems(items, tilecontent) {

    $(tilecontent).empty();   

    var height = 40;
    var width = 40;
    var bonuswidth = 0;
    var bonusheight = 0;
    var positioncounter = 0;
    var bonusz = 0;
    //var items = tiles[k].items;


    for (var z = 0; z < items.length; z++) {
        var div = document.createElement("div");

        $(div).addClass("itemonmap");
        div.id = items[z].id;
        
        $(div).css("z-index", 100000 + bonusz);
        $(div).css("top", height + bonusheight);
        $(div).css("left", width + 60 + bonuswidth);
        $(div).css("width", "50px");
        //$(div).css("height", "60px");


        var p = document.createElement("div");
        
        $(p).html(items[z].name);
        $(p).css("color", "#" + items[z].color);

        var divenergy = document.createElement("div");
        $(divenergy).addClass("energybar");
        $(divenergy).css("width", items[z].energy / 3);

        var color = "#FF0000";
        if (items[z].energy > 60) {
            color = "#2CFA07";
        }
        else if (items[z].energy > 30) {
            color = "#F2FA07";
        }

        $(divenergy).css("border-color", color);

        p.appendChild(divenergy);

        $(p).addClass("userinfo");

        p.onclick = (function () {
            var currentk = items[z];
            return function () {
                
                ShowItemInfo(currentk);
            }
        })();

        div.appendChild(p);

        var img = document.createElement("img");

        img.src = "content/imgs/" + items[z].picture + ".png";
        if (items[z].itemtype == "Homie") {
            $(img).css("width", "24%");
        }
        else {
            $(img).css("width", "50px");
        }

        div.appendChild(img);
        //document.getElementById("tile" + tiles[k].id).childNodes[0].appendChild(div);
        tilecontent.appendChild(div);
        bonuswidth = bonuswidth + 30;

    }

    
}

function hideelm(elm) {

    $(elm).fadeOut();
}

function takethetrain(item) {

    var index = tiles[item.tileid].items.indexOf(item);    
    tiles[item.tileid].items.splice(index, 1);

    var tileid = 107;
    if (item.tileid == 88) {
        tileid = 93;       
    }
    else if (item.tileid == 107) {
        tileid = 102;
    }
    else if(item.tileid == 93) {
        tileid = 88;        
    }


    var positions = $("#tile" + tileid).position();
   
    
    item.tileid = tileid;
    tiles[tileid].items.push(item);
    movemap(-positions.top + 200, -positions.left + 500);
     renderItems();
}

function ShowItemInfo(item) {
    
     var api_url = 'http://localhost:8000/api'; 
    
   $.ajax({
      //type: 'POST',
      url: api_url + '/gethomie/' + item.id
      
    }).success(function(response) {
       
       
      alert("hej");

       
       
    });
    
    
    $("#entercar").addClass("displaynone");
    $("#ItemInfo").slideDown();

    //alert(item.id);
    var element = $("#" + item.id).parent().parent();
    GoToItem(element);
   // GoToItem(item.id);
    var energy = item.energy;

    $(".energylevel").html(energy);
    $("#curhoname").html(item.name);
    $("#curhoname").css("color", "#"+item.color);
    $("#curhoid").html(item.gangid);
    $("#curhotileid").html(item.tileid);
    $("#ITEMIMG").attr("src", item.picture);

    if (tiles[item.tileid].tiletype == "trainstation") {
        $("#takethetrain").css("display", "block");
        document.getElementById("takethetrain").onclick = function () {
            takethetrain(item);
        }       
    }
    else {
        $("#takethetrain").css("display", "none");
    }

    document.getElementById("movecurho").onclick = (function () {
        var currentk = item;
        return function () {
            MoveItem(currentk);
        }
    })();

    $("#passengers").empty();
    if (item.type == "vehicle") { 
        var passengers = item.homies;
        for (var i = 0; i < passengers.length; i++) {
            var a = document.createElement("a");
            $(a).html(passengers[i].name);
            a.onclick = (function () {
                var passenger = passengers[i];
                return function () {
                    LeaveCar(passenger, item);
                }
            })();
            $("#passengers").append($(a)); 
        }
    
    }

    var items = tiles[item.tileid].items;

    for (var z = 0; z < items.length; z++) {

        if (items[z].type === "vehicle" && item.gangid === items[z].gangid && item.type === "human") {
            $("#entercar").removeClass("displaynone");

            var curho = items[z];
            $("#entercar").click((function () {
                return function () {
                    EnterCar(curho, item);
                }

            })(curho));

        }
        
    }



}

function LeaveCar(passenger, car) {

    var tile = tiles[car.tileid];
    passenger.tileid = tile.id;
    tile.items.push(passenger);

    var index = car.homies.indexOf(passenger);
    car.homies.splice(index, 1);
    
    renderItems();
}

function EnterCar(car, homie) {

    car.homies.push(homie);

    var index = tiles[homie.tileid].items.indexOf(homie);
    tiles[homie.tileid].items.splice(index, 1);

    renderItems();


}

function generateTiles2()
{
    var api_url = 'http://localhost:8000/api'; 
    
   $.ajax({
      //type: 'POST',
      url: api_url + '/getmap/5/'
      
    }).success(function(response) {
       
       tiles = response;
       
       generateTiles(response)
      

       
       
    });
    
}

function generateTiles(tiles) {

    var content = document.getElementById("content");

  

    startwidth = 1600;
    var width = 1600;
    var height = 0;
    var startheight = 0;
    var y = 1;
    var x = 1;

  
    var occupied = false;
    
    

    for (var i = 0; i < tiles.length; i++) {
        var div = document.createElement("div");
        div.id = "tile" + tiles[i].mapvariant;

        div.onclick = (function () {
            var currentI = i;
            return function () {
                TileAction(currentI);
            }

        })();
        



        var tilecontent = document.createElement("div");

        $(tilecontent).addClass("tilecontent");

        
        //render items
       
        
        for(var j = 0; j < tiles[i].items.length; j++){
            renderItems(tiles[i].items, tilecontent);
            //$(tilecontent).append(tiles[i].items[j].name);
            
            
            
            
        }

        





        //$(tilecontent).html(tiletype);

        $(div).addClass("tile");

        ///$(div).addClass(gang.id + mapnumber);
        if(tiles[i].tiletype.name === 'generic')
            $(div).css("background-image", "url('content/imgs/tile" + tiles[i].mapvariant + ".png')");
        else
            $(div).css("background-image", "url('content/imgs/tile" + tiles[i].tiletype.name + ".png')");
        //$(div).css("background-image", "url('content/imgs/" + gangcolor + "/tile" + mapnumber + ".png')");



       // var tile = { id: i, mapnr: mapnumber, x: x, y: y, specialplacement: specialplacement, tiletype: tiletype, status: "showtile", occupied: occupied, gangcolor: gangcolor, items: [] }
       // var tile = { id: i, mapnr: mapnumber, x: x, y: y, specialplacement: specialplacement, tiletype: tiletype, status: "showtile", occupied: occupied, gang: gang, items: [] }
       // tiles.push(tile);

        $(div).css("top", height);
        $(div).css("z-index", i);
        $(div).css("left", width);




        div.appendChild(tilecontent);
        content.appendChild(div);


        width = width + 120;
        height = height + 68;
        x++;

        
        if ((i+1) % 14 == 0) {

            width = startwidth - 120;
            startwidth = startwidth - 120;
            y++;
            x = 1;

            height = startheight + 68;
            startheight = startheight + 68;

        }
        


 



    }
    
     //generateplayers(100);

       //renderItems();
}




function ShowTileInfo(tileid) {



    $(".tilebig").remove();

    startwidth = 250;
    var width = 250;
    var height = 0;
    var startheight = 0;
    var target = document.getElementById("boxcontent");


    var tile = tiles[tileid];

    $("#boxtitle").html("ruta nummer " + tile.id + ", y:" + tile.y + ", x:" + tile.x + ", tiletype:" + tile.tiletype);


    var bricks = new Array();

    for (var i = 0; i < tiles.length; i++) {

        if ((tiles[i].y < tile.y + 2) && (tiles[i].y > tile.y - 2) && (tiles[i].x < tile.x + 2) && (tiles[i].x > tile.x - 2)) {
            bricks.push(tiles[i]);

        }
    }




    document.getElementById("boxarrowtopleft").onclick = function () {
        return TileAction(tileid - 1);
    }

    document.getElementById("boxarrowbottomright").onclick = function () {
        return TileAction(tileid + 1);
    }


    document.getElementById("boxarrowtopright").onclick = function () {
        return TileAction(tileid - 14);
    }

    document.getElementById("boxarrowbottomleft").onclick = function () {
        return TileAction(tileid + 14);
    }

    var istoprightbrick = false;
    var istopleftbrick = false;
    var isbottomrightbrick = false;
    var isbottomleftbrick = false;


    $(".tilecontent").addClass("dark");




    for (var i = 0; i < bricks.length; i++) {
        var div = document.createElement("div");

        if (bricks[i].specialplacement == "topright") { istoprightbrick = true; }
        if (bricks[i].specialplacement == "topleft") { istopleftbrick = true; }
        if (bricks[i].specialplacement == "bottomright") { isbottomrightbrick = true; }
        if (bricks[i].specialplacement == "bottomleft") { isbottomleftbrick = true; }




        $(div).addClass("tilebig");

        $(div).css("background-image", "url('content/imgs/" + bricks[i].gangcolor + "/tile" + bricks[i].mapnr + ".png')");

        $(div).css("top", height);
        $(div).css("z-index", i);
        $(div).css("left", width);

       

        var items = bricks[i].items;

        //renderBigMapItems(items,width,height);
        

        target.appendChild(div);

        $("#tile" + bricks[i].id).children().removeClass("dark");

        width = width + 120;
        height = height + 68;

        if ((i + 1) % 3 == 0) {

            width = startwidth - 120;
            startwidth = startwidth - 120;

            height = startheight + 68;
            startheight = startheight + 68;

        }

    }

    HideArrow("boxarrowtopleft", istopleftbrick);
    HideArrow("boxarrowtopright", istoprightbrick);
    HideArrow("boxarrowbottomright", isbottomrightbrick);
    HideArrow("boxarrowbottomleft", isbottomleftbrick);



    $("#box").css("display", "block");


}


function MoveItem(item) {

    
    //CloseWindow("box");
    //$(".tilecontent").addClass("darker");
   

    //$(".dark").css("opacity", "0.6");

    activeitem = item;

    var potentialdistance = item.energy / 20;

    var tile = tiles[item.tileid];

    for (var i = 0; i < tiles.length; i++) {


        if ((Math.abs(tiles[i].x - tile.x)) + (Math.abs(tiles[i].y - tile.y)) < potentialdistance) {

            tiles[i].status = "moveitem";

        }
        else {
            $("#tile" + tiles[i].id).animate({

                opacity: "0.2"

            }, 500, function () {

            });
        }
    }
}


function MoveItemToTile(tileid) {

    var positions = $("#tile" + tileid).position();
    
    
    var oldtileid = activeitem.tileid;

    var newtile = tiles[tileid];
    var oldtile = tiles[oldtileid];
   //var position = ($("#tile" + tileid).position());
   //alert(position.left + "," + position.top);
    var diff = Math.abs(newtile.x - oldtile.x) + Math.abs(newtile.y - oldtile.y);

    activeitem.energy -= (diff * 20);

    

    var itemToRemove = tiles[oldtileid].items.indexOf(activeitem);
    activeitem.tileid = tileid;
    tiles[tileid].items.push(activeitem);
    tiles[oldtileid].items.splice(itemToRemove, 1);
    tiles.map(function (tile) { tile.status = "showtile"; });




    $(".tile").animate({

        opacity: "1.0"

    }, 500, function () {
        
    });

    $(".ItemInfo").css("display","block");


    renderItems();
    movemap(-positions.top + 200, -positions.left + 500);
    
}

function TileAction(tileid) {
    
    var tilestatus = tiles[tileid].status;
    switch (tilestatus) {
        case "moveitem":
            MoveItemToTile(tileid);


    }
}


function CloseWindow(element) {
    $("#" + element).css("display", "none");
    $(".tilecontent").removeClass("dark");
    $("#ItemInfo").css("display", "none");
    $("#box").css("width", "760px");

}

function HideArrow(element, variable) {
    if (variable) {
        $("#" + element).css("display", "none");

    }

    else {
        $("#" + element).css("display", "block");
    }
}

function GoToHQ() {

    var gangcolor = user.color;
    
    for (var i = 0; i < tiles.length; i++) {
        if (tiles[i].tiletype == "hq" && tiles[i].gangcolor == gangcolor) {

            var pos = $("#tile" + tiles[i].id).position();
            //var pos = $("#content").position();

           
           // alert(pos.left);
           // alert(pos.top);
            movemap(-pos.top, -pos.left);
        }
    }
}

function GoToItem(element) {

    //var pos = $("#" + id).parent().parent().position();

    var pos = element.position();
    
    movemap(-pos.top+(screensizey/2)-90, -pos.left+(screensizex/2)-120);
            
}
