window.onload = function(e) {
    stage = new createjs.Stage("canvas");

    bg = new createjs.Shape();
    bg.graphics.beginFill("black").drawRect(0, 0, 1000, 800);
    stage.addChild(bg);

    //Create a Shape DisplayObject.
    circle = new createjs.Shape();
    circle.graphics.beginFill("red").drawCircle(0, 0, 40);
    //Set position of Shape instance.
    circle.x = circle.y = 50;
    //Add Shape instance to stage display list.
    stage.addChild(circle);
    //Update stage will render next frame
    circle1 = new createjs.Shape();
    circle1.graphics.beginFill("red").drawCircle(50,50,40);
    circle1.x = circle1.y = 100
    stage.addChild(circle1);
    stage.update();
    
    circle.addEventListener("click", handleClick);
    function handleClick(event){
        console.log("Clicked");
    }

    bg.addEventListener("click", bgClicked);
    function bgClicked(event) {
        var myGraphics = new createjs.Graphics().beginFill("white").drawRect(0, 0, 1000, 800);
        event.target.set({graphics: myGraphics});
        console.log(event.target.set({graphics: myGraphics}));
    }
}