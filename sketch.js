var cena, p1, pontos, cano1, cano2, parede;

var grupoCano2, grupoCano1

var p1Img, p1Lose,cenaImg, canoImg, soundLose, soundPoint;

var bordas


var JOGAR = 2;
var INICIO = 1;
var ENCERRAR = 0;
var estadoJogo = INICIO;



function preload(){
    p1Img = loadAnimation("emoji.png");
    cenaImg = loadImage("fundo.png");
    canoImg = loadImage("cano.png");
    p1Lose = loadAnimation("emoji2.png");
    soundLose = loadSound("boom.mp3");
    soundPoint = loadSound("point.mp3");
}

function setup(){
    createCanvas(windowWidth,windowHeight)

    cena =createSprite(width-300,height-480,width,20)
    cena.addImage(cenaImg);
    cena.scale = 1.2

    p1 = createSprite(30,height-300,20,20);
    p1.addAnimation("bbb",p1Img);
    p1.addAnimation("aaa",p1Lose);
    p1.scale = 0.25
    p1.setCollider("circle", 0, 0, 35)

    p1.debug = true;

    grupoCano1 = new Group();
    grupoCano2 = new Group();
    grupoParede = new Group();

    pontos = 0;
    
}

function draw(){
    background(225);

    if(estadoJogo === INICIO){
        if(keyDown("s")){
            estadoJogo = JOGAR
        }
    }


    if(estadoJogo === JOGAR){

        p1.changeAnimation("bbb",p1Img);

        cena.velocityX = -(3+pontos);

        if (cena.x < 200){
            cena.x = cena.width/2;
          }
        
        if(touches.length > 0 || keyDown("space")){
            p1.velocityY = -9;
            touches =  [];
        }

        if(p1.isTouching(grupoParede)){
            grupoParede.destroyEach();
            soundPoint.play();
            pontos = pontos + 1;
        }

        gerarCanos();
        
        p1.velocityY = p1.velocityY + 0.8;

        if((p1.isTouching(grupoCano1) || p1.isTouching(grupoCano2)) || (p1.y > 640 || p1.y < -40)){
            estadoJogo = ENCERRAR;
            soundLose.play();
            p1.velocityY = 0
            cena.velocityX = 0
            grupoCano2.setVelocityXEach(0);
            grupoCano1.setVelocityXEach(0);
            grupoParede.setVelocityXEach(0);
            grupoCano1.setLifetimeEach(-1)
            grupoCano2.setLifetimeEach(-1);
            grupoParede.setLifetimeEach(-1);

        }

    }
    if(estadoJogo === ENCERRAR){
        p1.changeAnimation("aaa",p1Lose)
        if(keyDown("r")){
            reset();
         }
    }


    drawSprites();

    if(estadoJogo === INICIO){
        fill(0)
        text("Passe entre os canos usando \na tecla space para pular e ganhe pontos\n\nAté os 4 pontos você ganha 1 ponto a cada dois obstáculos\nA partir dos 4 pontos você ganha 1 ponto a cada um obstáculo\n\nNÃO ULTRAPASSE O LIMITE DA TELA!\nAperte S para começar o jogo!\n\n\n\n SIM, É DIFÍCIL!", width - 800, 300);
    }

    if(estadoJogo === ENCERRAR){
        fill(0);
        text("PERDEU!\nAperte R para recomeçar", width - 700,300);
    }

    fill(0);
    textFont("impact")
    textSize(20)
    text("Points: "+ pontos, width - 730, 30);
}

function reset(){
    estadoJogo = JOGAR
    grupoParede.destroyEach();
    grupoCano2.destroyEach();
    grupoCano1.destroyEach();
    p1.y = 300;
    pontos = 0;
}


function gerarCanos(){
    if(frameCount % 250 === 0){
        cano1 = createSprite(width+10,0,50,400);
        cano1.addImage(canoImg);
        cano1.setCollider("rectangle", 0, 0,50,600)
        cano1.velocityX = -(3+pontos);
        cano1.y = Math.round(random(-80, 0));
        cano1.lifetime = width/2
        cano1.scale = 1
        grupoCano1.add(cano1);

        p1.depth = cano1.depth
        p1.depth = p1.depth + 1;

        cano2 = createSprite(width+10, height/2 );
        cano2.addImage(canoImg);
        cano2.velocityX = -(3+pontos);
        cano2.setCollider("rectangle", 0, 0,50,600)
        cano2.x = cano1.x;
        cano2.y = Math.round(random(600,750))
        cano2.lifetime = width/2
        cano2.scale = 1;
        grupoCano2.add(cano2);

        parede = createSprite(width+10, 300, 2,height);
        parede.velocityX = -(3+pontos);
        parede.x = cano1.x
        parede.lifetime = width/2;
        parede.visible = false;
        grupoParede.add(parede);
    }

}