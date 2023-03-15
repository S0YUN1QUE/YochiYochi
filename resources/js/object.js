import  MoveNet  from "./movenet";
const e_canvas = document.getElementById("e_canvas");
const e_ctx = e_canvas.getContext("2d");


// let coordArr = [];
const a = 2;
/**
 * @description 랜덤으로 길이에 해당하는 스트링을 생성해주는 함수
 * @param {number} num 랜덤 스트링 길이 
 * @returns {string} 랜덤스트링
 */
const generateRandomString = (num) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < num; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

/**
 * @description 사각형 그리는 함수
 * @param {CanvasRenderingContext2D} ctx canvas의 2D CONTEXT
 * @param {number} x 렌더링될 x좌표
 * @param {number} y 렌더링될 y좌표
 */
function drawSquare(ctx, x, y) {
    ctx.beginPath();
    ctx.rect(x, y, 60, 60);
    ctx.stroke();
}




// function calcCoordInLine(src, des, x) {
//     const y = (des.y - src.y / des.x - src.x) * (x - src.x) + src.y
//     return { x, y }
// }

function checkTouch(target, object) {
    // return true;
    return target.x > object.x_coor-80 && target.x < object.x_coor + 80 && target.y > object.y_coor-80 && target.y < object.y_coor + 80
}


/**
 * @description 캔버스상에 그리기 함수를 모아놓고 한번에 실행해 애니메이션을 만드는 함수
 * @param {CanvasRenderingContext2D} ctx canvas의 2D CONTEXT
 * @param {number} speed 사각형 내려오는거 속도
 */
function draw(ctx, speed, width, height) {

    // 객체
    const coordObj = {} // 좌표 top_left : {x_coor, y_coor} top_right : {x_coor+width, y_coor} bottom_left : {x_coor, y_coor+height} bottom_right : {x_coor+width, y_coor+height}
    e_canvas.width = width;
    e_canvas.height = height;

    // 1초마다 객체 생성코드
    setInterval(() => {
        coordObj[generateRandomString(10)] = {
            x_coor: Math.random() * (640 - 60), // 640 : canvas width , 20 : rect width
            y_coor: 0,
        }
    }, [2000])

    const render = (coordArr) => {

        console.log(coordObj)
        ctx.clearRect(0, 0, e_canvas.width, e_canvas.height);
        // 만들어진 객체 키를 이용해 사각형을 그리는 함수

        Array.from(Object.keys(coordObj)).forEach((el) => {
            const { x_coor, y_coor } = coordObj[el];
            var tempKey = undefined;

            coordArr.forEach((coord,idx) => {
                console.log(idx)
                if (checkTouch(coord, coordObj[el])) {
                    tempKey = el
                }
            });

            // console.log(tempKey)


            if (y_coor > 480 || tempKey) {
                delete coordObj[el]
                return;
            }

            drawSquare(ctx, x_coor, y_coor)
            //스피드에 따라 대충 속도변환
            coordObj[el].y_coor = y_coor + speed

            // console.log(coordObj)
        })
        // console.log(movenet.coordArr.length)

        // movenet.coordArr = []

        // console.log(coordObj)

        // window.requestAnimationFrame(render);
    }
    const movenet = new MoveNet(render);

    // window.requestAnimationFrame(render);
}

draw(e_ctx, 1.2, 640, 480);



// export const canvasSize = (width, height) => {
//     draw(e_ctx, 2, width, height);
// }

