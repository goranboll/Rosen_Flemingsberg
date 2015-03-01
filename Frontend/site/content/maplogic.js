
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


   // $("#content").css("transform", "scale(" + zoomlevel + ")");

    $("#content").animate({

        transform: "scale("+zoomlevel+")"
        


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


    generateTiles();

    generateplayers(100);

    renderItems();

    rendergangmembers();


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


function renderItems() {

    

    $(".tilecontent").empty();
    for (var k = 0; k < tiles.length; k++) {

        var height = 40;
        var width = 40;
        var bonuswidth = 0;
        var bonusheight = 0;
        var positioncounter = 0;
        var bonusz = 0;
        var items = tiles[k].items;


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
                    //alert("hej");
                    ShowItemInfo(currentk);
                }
            })();

            div.appendChild(p);

            var img = document.createElement("img");

            img.src = items[z].picture;
            if (items[z].type == "human") {
                $(img).css("width", "24%");
            }
            else {
                $(img).css("width", "50px");
            }

            div.appendChild(img);
            document.getElementById("tile" + tiles[k].id).childNodes[0].appendChild(div);

            bonuswidth = bonuswidth + 30;

        }

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


function generateTiles() {

    var content = document.getElementById("content");

    var gangs = [
        { id: 1, gangcolor: "1AFCF0" },
        { id: 2, gangcolor: "E8F908" },
        { id: 3, gangcolor: "EB7465" },
        { id: 4, gangcolor: "6BB7DD" },
        { id: 5, gangcolor: "1EFA3F" },
        { id: 6, gangcolor: "FABF1E" },
        { id: 7, gangcolor: "B35DED" },
        { id: 8, gangcolor: "DB42C7" },

        ];

    startwidth = 1600;
    var width = 1600;
    var height = 0;
    var startheight = 0;
    var y = 1;
    var x = 1;
    var tiletype = "generic";
    var business = ["carstore", "weaponstore", "unemploymentoffice", "courthouse", "policestation", "bikeandmopedstore", "hospital", "cityhall"];
    shuffle(business);
    var occupied = false;
    //var gangcolor = "";
    var gang = { id: 0, gangcolor: "" };

    for (var i = 0; i < 196; i++) {
        var div = document.createElement("div");
        div.id = "tile" + i;

        div.onclick = (function () {
            var currentI = i;
            return function () {
                TileAction(currentI);
            }

        })();
        

//       

//        div.onmouseover = (function () {

//            var dav = div;


//            return function () {

//                $(dav).css("margin", "2px");

//            }

//        })();


//        div.onmouseout = (function () {

//            var dav = div;


//            return function () {

//                $(dav).css("margin", "0px");

//            }

//        })();


        var tilecontent = document.createElement("div");

        $(tilecontent).addClass("tilecontent");

        



        if (i > 10 && y < 5 && x > 8) {
            occupied = true;
            gang = gangs[0];

        }
        else if (y > 1 && y < 5 && x > 4 && x < 9) {
            occupied = true;
            gang = gangs[1];

        }
        else if (y > 0 && y < 5 && x < 4) {
            occupied = true;
            gang = gangs[2];

        }
        else if (y > 5 && y < 9 && x < 4) {
            occupied = true;
            gang = gangs[3];

        }
        else if (y > 5 && y < 9 && x > 10) {
            occupied = true;
            gang = gangs[4];

        }
        else if (y > 9 && x > 10) {
            occupied = true;
            gang = gangs[5];

        }
        else if (y > 9 && x < 6) {
            occupied = true;
            gang = gangs[6];

        }
        else if (y > 9 && x > 6 && x < 10) {
            occupied = true;
            gang = gangs[7];

        }
        else {
            gang = { id: 0, gangcolor: "" };
        }

        var mapnumber = Math.floor((Math.random() * 6) + 1);

        if (i == 21 || i == 31 || i == 40 || i == 86 || i == 97 || i == 157 || i == 166 || i == 175) {
            mapnumber = "hq";
            tiletype = "hq";
           

           
        }
        else if (y > 6 && y < 9 && x > 4 && x < 11) {

            if (y == 7) {
                mapnumber = "mainstreet";
            }
            else {
                mapnumber = "mainstreet2";
            }

           


            tiletype = "mainstreet";

        }
        else if ((y == 6 || y == 9) && (x > 4 && x < 11)) {

            if (x == 5 || x == 10) {
                tiletype = "gasstation";
            }
            else {
                tiletype = business.splice(0, 1);
            }

            mapnumber = tiletype;

        }
        
        else {
            tiletype = "generic";
        }


        //tågstationer
        if (i == 102 || i == 107 || i == 88 || i == 93) {
            tiletype = "trainstation";
             
            if (i == 102) {
                mapnumber = "trainstation2";

            } else if(i == 107)
            {
                mapnumber = "trainstation3";
            } else if(i == 88)
            {
                mapnumber = "trainstation4";
            } else
            {
                mapnumber = "trainstation1";
            }


           
        }




        //$(tilecontent).html(tiletype);

        $(div).addClass("tile");

        $(div).addClass(gang.id + mapnumber);
        $(div).css("background-image", "url('content/imgs/" + gang.gangcolor + "/tile" + mapnumber + ".png')");

        //$(div).css("background-image", "url('content/imgs/" + gangcolor + "/tile" + mapnumber + ".png')");


        var specialplacement = "none";

        if (i < 16) {
            specialplacement = "topright";
        }
        else if (i > 182) {
            specialplacement = "bottomleft";
        }
        else if (i % 14 == 0) {
            specialplacement = "bottomright";
        }
        else if ((i - 1) % 14 == 0) {
            specialplacement = "topleft";
        }

        if (i == 0) {
            specialplacement = "top";
        }

        if (i == 196) {
            specialplacement = "bottom";
        }

        if (i == 183) {
            specialplacement = "left";
        }

        if (i == 14) {
            specialplacement = "right";
        }

       // var tile = { id: i, mapnr: mapnumber, x: x, y: y, specialplacement: specialplacement, tiletype: tiletype, status: "showtile", occupied: occupied, gangcolor: gangcolor, items: [] }
        var tile = { id: i, mapnr: mapnumber, x: x, y: y, specialplacement: specialplacement, tiletype: tiletype, status: "showtile", occupied: occupied, gang: gang, items: [] }
        tiles.push(tile);

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

function renderBigMapItems(items,width,height) {
    var bonuswidth = 0;
    var bonusheight = 54;
    var positioncounter = 0;
    var bonusz = 0;
    
    var target = document.getElementById("boxcontent");

    for (var k = 0; k < items.length; k++) {


        if (positioncounter % 2 != 0) { bonusheight = 76; bonusz = 2; } else { bonusheight = 54; bonusz = 0; }

        var divimg = document.createElement("div");





        $(divimg).addClass("tilebig");
        $(divimg).css("z-index", 100000 + bonusz);
        $(divimg).css("top", height + bonusheight);
        $(divimg).css("left", width + 60 + bonuswidth);
        $(divimg).css("width", "50px");
        $(divimg).css("height", "60px");
        var img = document.createElement("img");

        if (items[k].type == "human") {
            $(img).css("width", "16px");
        }
        else {
            $(img).css("width", "50px");
        }
        img.src = items[k].picture;

        var p = document.createElement("div");
        $(p).html(items[k].name);
        $(p).css("color", items[k].color);


        $(p).addClass("userinfo");
        p.onclick = (function () {
            var currentI = items[k];
            return function () {
                //alert(currentI.name);



                $("#box").animate({

                    width: "1100px"

                }, 300, function () {
                    // Animation complete.
                    $("#ItemInfo").slideUp(300, function () {

                        $("#EgyBar").empty();
                        var energy = currentI.energy;

                        energyboxes = Math.floor(energy / 10);
                        energyleft = energy % 10;

                        var color = "#F2FA07";

                        if (energy > 60) { color = "#2CFA07"; } else if (energy < 30) { color = "#FF0000"; }

                        var engybar = document.getElementById("EgyBar");

                        for (var i = 0; i < energyboxes; i++) {
                            var engytext = document.createElement("div");
                            $(engytext).addClass("EgyBarFloat");
                            $(engytext).css("background-color", color);
                            engybar.appendChild(engytext);
                        }

                        var engytext = document.createElement("div");
                        $(engytext).addClass("EgyBarFloat");
                        $(engytext).css("width", energyleft * 2.3);
                        $(engytext).css("background-color", color);

                        engybar.appendChild(engytext);



                        var engytext = document.createElement("div");
                        $(engytext).addClass("EgyBarFloatPercent");
                        $(engytext).html(energy + "%");
                        $(engytext).css("color", color);
                        engybar.appendChild(engytext);






                        $("#curhoname").html(currentI.name);
                        $("#curhoname").css("color", currentI.color);
                        $("#curhocolor").html(currentI.color);
                        $("#curhotileid").html(currentI.tileid);
                        $("#ITEMIMG").attr("src", currentI.picture);

                        $("#ItemInfo").slideDown(300);
                    });
                    //.css("display", "block");
                });

                document.getElementById("movecurho").onclick = (function () {
                    var currentk = currentI;
                    return function () {
                        MoveItem(currentk);
                    }
                })();

            }




        })();

        var divenergy = document.createElement("div");
        $(divenergy).addClass("energybar");
        $(divenergy).css("width", items[k].energy / 3);

        var color = "#FF0000";
        if (items[k].energy > 60) {
            color = "#2CFA07";
        }
        else if (items[k].energy > 30) {
            color = "#F2FA07";
        }

        $(divenergy).css("border-color", color);

        p.appendChild(divenergy);

        divimg.appendChild(p);
        divimg.appendChild(img);
        target.appendChild(divimg);

        bonuswidth = bonuswidth + 30;

        positioncounter++;


    }

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
