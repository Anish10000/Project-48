var bgImage
var enemy, enemyImage, enemyGroup
var player, playerImage
var bullet, bulletsGroup;
var blastImage
//var edges = createEdgeSprite()
var score = 0;
var laserSound;

function preload() {
    bgImage = loadImage("assets/bg.jpg")
    enemyImage = loadImage("assets/enemy2.png")
    playerImage = loadImage("assets/player.png")
    laserSound = loadSound("assets/laser.mp3")
    blastImage = loadImage("assets/blast.png")

}

function setup() {
    createCanvas(windowWidth, windowHeight)


    player = createSprite(width / 2, height / 1.2)
    player.addImage(playerImage)
    player.scale = 0.1


    bulletsGroup = createGroup()
    enemyGroup = createGroup()

    swal({
        title: "Do you want Continue ? ",
        text: "You need to pay extra amount",
        icon: "success",
        buttons: true,
        confirmButtonColor: '#C64EB2',
      })
      
}; 
// rest of the code








function draw() {
    background(bgImage)

    if (keyIsDown(LEFT_ARROW)) {
        player.x = player.x - 10;
    }

    if (keyIsDown(RIGHT_ARROW)) {
        player.x = player.x + 10;
    }

    if (keyIsDown(32)) {
        createBullets()

    }
    createEnemies()
    //collideWithEnemy()

    for(var i=0; i<bulletsGroup.length; i++){
      bulletsGroup[i].isTouching(enemyGroup, collideWithEnemy)

    }




    drawSprites()

    fill("white")
    textSize(30)
    text("Score: " + score, 50, 50)



}

function createBullets() {
    if (frameCount % 2 == 0) {
        bullet = createSprite(player.x, player.y, 10, 40)
        bullet.shapeColor = "red"
        bullet.velocityY = -20;
        //console.log("createbullets")
        laserSound.play()

        bulletsGroup.add(bullet)
        bulletsGroup.setLifetimeEach(33)
    }



}

function createEnemies() {

    if (frameCount % 100 == 0) {
        enemy = createSprite(random(100, width - 100), -10)
        enemy.addImage(enemyImage)
        enemy.scale = 0.2
        enemy.velocityX = (random(-4, 5))
        enemy.velocityY = (random(2, 5))


        enemyGroup.add(enemy)

    }

}

function collideWithEnemy(bullet, enemy) {
        console.log("collide")
        bullet.destroy()
        enemy.velocityX = 0
        enemy.velocityY = 0
        enemy.addImage(blastImage)
        blastImage.scale = 1.4
        setTimeout(() => {
         enemy.destroy()
         
        }, 1000);

        
        score = score + 1;

    


}