const e_canvas = document.querySelector("#e_canvas");
const e_ctx = e_canvas.getContext("2d");

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const draw = (ctx, speed) => {
  const coordObj = {};

  setInterval(() => {
    coordObj[makeid(10)] = {
      x_coor: Math.floor(Math.random() * (640 - 40)),
      y_coor: 0,
    };
  }, [1000]);

  const render = () => {
    ctx.clearRect(0, 0, 640, 480);
    Array.from(Object.keys(coordObj)).map((el) => {
      const coord = coordObj[el];
      // if (coord.y_coor > 480) {
      //   delete coordObj[el];
      // }
      drawSquare(ctx, coord.x_coor, coord.y_coor);
      coordObj[el].y_coor = coord.y_coor + speed;
    });
    window.requestAnimationFrame(render);
  };

  window.requestAnimationFrame(render);
};

const drawSquare = (ctx, x, y) => {
  ctx.beginPath();
  ctx.rect(x, y, 40, 20);

  ctx.stroke();
};

draw(e_ctx, 2);
