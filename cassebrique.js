/* PROJET CASSE BRIQUE JAVASCRIPT CANVAS : FAIRE UNE BARRE TRANSVERSALE
INTERACTIVE ET UNE BALLE QUI CASSE LES BRICKS ET REBONDIS DESSUS -
GAME OVER SI LA BALLE TOUCHE LA BOTTOM LINE */


        /* LISTE DES VARIABLES */
        /* VAR LIST */

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let ballRadius = 10;
let x = canvas.width/2;
let y = canvas.height-50;
let dx = 2;
let dy = -2;
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width-paddleWidth)/2;
let rightPressed = false;
let leftPressed = false;

        /* EVENT LISTENER POUR TOUCHE PRESSEE & MOVE SOURIS*/
        /* EVENT LISTENER FOR KEY PRESSED AND MOUSE MOVING*/

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);


        /* FUNCTION MOUVEMENT SOURIS */
        /* MOUSE MOVEMENT FUNCTION*/

function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}


        /* FONCTION TOUCHE/FLECHE PRESSEE*/
        /* KEY PRESSED FUNCTION - FOR RIGHT/LEFT AND ARROW TOO - SET TRUE STATUS WHEN PRESSED */

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

        /* FONCTION TOUCHE LEVEE */
        /* KEYUP FUNCTION - SET THE FALSE STATUS WHEN WE DONT PRESS ANYTHING */

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

/* FUNCTION DE COLLISION ENTRE BALLE ET BRIQUES & EFFACEMENT DES BRIQUES QUAND ELLES SONT TOUCHÉES EN CALCULANT LA POSITION & VICTOIRE SI SCORE = TOTAL DE BRIQUES */

/* COLLISION FUNCTION BETWEEN BALL & BRICKS ,DETECT COLLISION THEN DELETE BRICK WHEN COLLIDE AND ALERT A VICTORY WHEN BRICK SUM IS EQUAL TO TOTAL NUMBER OF BRICKS */

function collisionDetection() {
    for(let c=0;c<brickColumnCount;c++){
        for(let r=0;r<brickRowCount;r++){
            let b=bricks[c][r];
            if(b.status == 1){
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status=0;
                    score++;
                    if (score== brickColumnCount * brickRowCount) {
                        alert("BIEN JOUÉ ! ET MAINTENANT RECOMMENCE :)");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

        /* INCREMENTE SYSTEME DE SCORE DANS LE CANVAS */
        /* I HAD HERE IN THE 2D CONTEXT THE SCORE TEXT WITH COLOR AND FONT  */

let score = 0;

    function drawScore() {
        ctx.font='18px Arial';
        ctx.fillStyle = "#000000";
        ctx.fillText("Score: "+score, 630, 20);
    }

        /* INCREMENT NBRES DE POINT DE VIE DANS LE CANVAS - QUI BAISSERA CHAQUE FOIS QUE LA BALLE TOUCHE LA BORDER BOTTOM DU CANVAS */
        /* PUT A LIFE COUNT INSIDE THE CANVAS - LOOSE LIFE WHEN THE BALL HIT THE BOTTOM BORDER OF THE CANVAS */

let lives = 3

    function drawLives() {
        ctx.font = "18px Arial";
        ctx.fillStyle = "#000000";
        ctx.fillText("Lives: "+lives, canvas.width-85, 40);
    }
    
        /* FUNCTION DE CREATION DE LA BALLE DANS LE CANVAS VIA LES VALEUR DE ARC, STYLE POUR LA COULEUR */
        /* BALL FUNCTION TO DRAW BALL IN THE CANVAS, WHERE THE BALL PROPERTIES ARE ARC AND STYLE IS THE COLOR */

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#4b483a";
    ctx.fill();
    ctx.closePath();
}

        /* FONCTION DE CREATION DE LA BARRE TRANS. ET DEFINITION DE LA TAILLE VIA PADDLEHEIGHT ET WIDTH RENSEIGNE PLUS HAUT */
        /* DRAWING PADDLE FUNCTION : SET THE SIZE WITH PREDEFINED PADDLEHEIGHT & WIDTH ABOVE */

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#ff3800";
    ctx.fill();
    ctx.closePath();
}

        /* FONCTION DRAW REBORD REBOND P. DE DEPART BARRE TRANS.*/
        /* FONCTION DRAW REBORD REBOND P. DE DEPART BARRE TRANS.*/

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();
        if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }
            if(y + dy < ballRadius) {
                dy = -dy;}
    

        /////* CI - DESSOUS AFFECTE REBOND BARRE TRANS ET GAME OVER AU BOTTOM BORDER *//////
            
                else if(y + dy > canvas.height-ballRadius) {
                    if(x > paddleX && x < paddleX + paddleWidth) {
                        dy = -dy;
                    }
                    else {
                        lives--;
                        if(!lives) {
                            alert("GAME OVER");
                            document.location.reload()
                        }
                        else {
                            x = canvas.width/2;
                            y = canvas.height-30;
                            dx = 2;
                            dy = -2;
                            paddleX = (canvas.width-paddleWidth)/2;
                        }
                    }
                }
    
    
        if(rightPressed) {
            paddleX += 7;
            if (paddleX + paddleWidth > canvas.width){
                paddleX = canvas.width - paddleWidth;
            }
        }
        else if(leftPressed) {
            paddleX -= 7;
            if (paddleX < 0){
                paddleX = 0;
            }
        }
        
        x += dx;
        y += dy;

        requestAnimationFrame(draw);
    }

            /* DECLARATION DES VALEURS DES BRICKS */
            /* DECLARATION DES VALEURS DES BRICKS */

let brickRowCount = 3;
let brickColumnCount = 5;
let brickHeight = 20;
let brickWidth = 75;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;
let brickPadding = 10;



            /* IMPLEMENTATION DES BRIQUES EN ROW ET COLUMN */
            /* IMPLEMENTATION DES BRIQUES EN ROW ET COLUMN */

let bricks = []
    for (let c=0; c<brickColumnCount; c++) {
        bricks[c] = [];
    
        for (let r=0;r<brickRowCount;r++) {
            bricks[c][r] = {x:0, y:0, status:1};
        }
    }

        /* CREER LA FUNCTION drawBRICKS qui va dessiner les bricks */
        /* CREER LA FUNCTION drawBRICKS qui va dessiner les bricks */

        function drawBricks() {
            for(let c=0; c<brickColumnCount; c++) {
                for(let r=0; r<brickRowCount; r++) {
                    if(bricks[c][r].status == 1){
                        let brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                        let brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                        bricks[c][r].x = brickX;
                        bricks[c][r].y = brickY;
                        ctx.beginPath();
                        ctx.rect(brickX, brickY, brickWidth, brickHeight);
                        ctx.fillStyle = "#ff3800";
                        ctx.fill();
                        ctx.closePath();
                    }
                }
            }
        }

draw();




//var interval = setInterval(draw, 10); Seconde manière d'afficher la balle a la place de requestAnimationFrame(draw)
// qui se situe dans la fonction draw. Besoin d'un clearInterval pour Chrome si on veux que le jeu s'arrete en win/loose.
// clearInterval(interval) à placer a la fin des deux options de win/loose dans le code.




//// FIN DU CODE - JEU OPERATIONNEL - UTILISABLE ////

