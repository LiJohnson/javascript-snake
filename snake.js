window.onload = () => {
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");
    context.moveTo(2, 2);
    context.lineTo(300, 200);
    context.stroke();
  
    context.rect(50, 50, 50, 50);
    context.fillStyle = "red";
    context.fill();
    context.strokeStyle = "blue";
    context.lineWidth = 5;
    // context.stroke()
  
    context.beginPath();
    context.arc(210, 210, 50, 0, (2 * Math.PI) / 2);
    context.stroke();
  
    context.beginPath();
    context.font = "30px A";
    context.lineWidth = "1px";
  
    // context.fillStyle="green"
    context.strokeStyle = "gray";
    context.strokeText("hi lcs 🎅", 100, 200);
    context.fillText("hi lcs 🎅", 100, 250);
    context.stroke();
  
    context.reset();
  
    let x = 1;
    let y = 100;
    let width = 10;
    let step = { x: 0, y: 0 };
    let coin = { x: -100, y: -100, r: 5 };
    let t = Date.now();
    let fps = 0;
    let updateFPS = 0;
    let score = 0;
    let snake = [{ x, y }];
  
    function isTouch(a, b) {
      return (
        Math.abs(
          Math.hypot(
            a.x + a.r / 2 - b.x - b.r / 2,
            a.y + a.r / 2 - b.y - b.r / 2
          ) -
            (a.r + b.r) / 2
        ) < 3
      );
    }
    function draw() {
      if (Date.now() - t >= 1000) {
        t = Date.now();
        updateFPS = fps;
        fps = 0;
      }
      fps++;
  
      x += step.x * 3;
      y += step.y * 3;
  
      x = x < 0 ? 0 : x;
      x = x > 600 - width ? 600 - width : x;
      y = y < 0 ? 0 : y;
      y = y > 400 - width ? 400 - width : y;
  
      context.clearRect(0, 0, 600, 400);
      context.beginPath();
  
      if (x !== snake[snake.length - 1].x || y !== snake[snake.length - 1].y) {
        snake.push({ x, y });
      }
      snake = snake.slice(-1 * (score * 3 || 1));
  
      console.log(snake);
      snake.forEach((p) => {
        context.rect(p.x, p.y, width, width);
      });
      context.fillStyle = "red";
      context.fill();
  
      if (coin.x < 0) {
        coin.x = Math.floor(Math.random() * 550);
        coin.y = Math.floor(Math.random() * 350);
      }
  
      context.beginPath();
      context.fillStyle = "#e3c228";
      context.arc(coin.x, coin.y, coin.r, 0, 2 * Math.PI);
      context.fill();
  
      if (isTouch(coin, { x, y, r: width })) {
        coin.x = -1;
        score++;
      }
  
      context.beginPath();
      context.font = "12px A";
      context.fillStyle = "black";
      context.fillText(`${updateFPS} fps`, 30, 30);
  
      context.beginPath();
      context.fillStyle = "#ff7ea5";
      context.font = "30px A";
      context.fillText(`score: ${score}`, 230, 30);
      requestAnimationFrame(draw);
    }
  
    draw();
    document.getElementById("pad").addEventListener(
      "mousedown",
      (e) => {
        console.log(e.target.dataset);
  
        step.x = e.target.dataset.x * 1;
        step.y = e.target.dataset.y * 1;
      },
      true
    );
    document.getElementById("pad").addEventListener(
      "mouseup",
      (e) => {
        console.log(e.target.dataset);
        step.x = 0;
        step.y = 0;
      },
      true
    );
    document.body.addEventListener("keydown", (e) => {
      console.log("keycode", e.code);
      switch (e.code) {
        case "ArrowLeft":
        case "KeyA":
          if (step.x == 1) return;
          step.x = -1;
          step.y = 0;
          break;
        case "ArrowRight":
        case "KeyD":
          if (step.x == -1) return;
          step.x = 1;
          step.y = 0;
          break;
        case "ArrowUp":
        case "KeyW":
          if (step.y == 1) return;
          step.y = -1;
          step.x = 0;
          break;
        case "ArrowDown":
        case "KeyS":
          if (step.y == -1) return;
          step.y = 1;
          step.x = 0;
          break;
      }
    });
    document.body.addEventListener("_keyup", (e) => {
      switch (e.code) {
        case "ArrowLeft":
        case "ArrowRight":
        case "KeyA":
        case "KeyD":
          step.x = 0;
          break;
        case "ArrowUp":
        case "ArrowDown":
        case "KeyW":
        case "KeyS":
          step.y = 0;
          break;
      }
    });
    // setInterval(draw,20)
  };
  