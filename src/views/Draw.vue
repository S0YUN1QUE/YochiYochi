<template>
    <div id="app">
        <div class="flex-row">
            <div class="source">
                <h1>Canvas</h1>
                <vue-drawing-canvas class="rounded-4 border border-success p-2 mb-2 border-opacity-75"
                    ref="VueCanvasDrawing" v-model:image="image" :width="600" :height="400" :stroke-type="strokeType"
                    :line-cap="lineCap" :line-join="lineJoin" :fill-shape="fillShape" :eraser="eraser" :lineWidth="line"
                    :color="color" :background-color="backgroundColor" :background-image="backgroundImage"
                    :watermark="watermark" :initial-image="initialImage" saveAs="png" :styles="{
                        border: 'solid 1px #000',
                    }" :lock="disabled" @mousemove="getCoordinate($event)" :additional-images="additionalImages" />
                <p>
                    x-axis: <strong>{{ x }}</strong>, y-axis: <strong>{{ y }}</strong>
                </p>
                <div class="button-container">
                    <button class="btn btn-outline-primary" type="button" @click.prevent="disabled = !disabled"
                        role="button" data-bs-toggle="button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-lock" viewBox="0 0 16 16">
                            <path v-if="!disabled"
                                d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2zM3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H3z" />
                            <path v-else
                                d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
                        </svg>
                        <span v-if="!disabled">ロック解除</span>
                        <span v-else>ロック</span>
                    </button>
                    <button class="btn btn-outline-primary" type="button" @click.prevent="$refs.VueCanvasDrawing.undo()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z" />
                            <path
                                d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
                        </svg>
                        後ろに戻す
                    </button>
                    <button class="btn btn-outline-primary" type="button" @click.prevent="$refs.VueCanvasDrawing.redo()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                            <path
                                d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                        </svg>
                        前に戻す
                    </button>
                    <button class="btn btn-outline-primary" type="button" @click.prevent="$refs.VueCanvasDrawing.reset()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-file-earmark" viewBox="0 0 16 16">
                            <path
                                d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
                        </svg>
                        リセット
                    </button>
                </div>
                <div class="button-container">
                    <button class="btn btn-outline-primary" type="button" @click.prevent="eraser = !eraser">
                        <span v-if="eraser">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-eraser" viewBox="0 0 16 16">
                                <path
                                    d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm2.121.707a1 1 0 0 0-1.414 0L4.16 7.547l5.293 5.293 4.633-4.633a1 1 0 0 0 0-1.414l-3.879-3.879zM8.746 13.547 3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z" />
                            </svg>
                            消しゴム
                        </span>
                        <span v-else>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-pencil" viewBox="0 0 16 16">
                                <path
                                    d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                            </svg>
                            鉛筆
                        </span>
                    </button>
                    <select class="btn btn-secondary dropdown-toggle" v-model="line">
                        <option class="dropdown-item dropdown-menu" v-for="n in 25" :key="'option-' + n" :value="n">
                            {{ n }}
                        </option>
                    </select>
                    <input type="color" v-model="color" />
                    <select class="btn btn-secondary dropdown-toggle" v-model="strokeType">
                        <option value="dash">ダッシュ</option>
                        <option value="line">線</option>
                        <option value="circle">円</option>
                        <option value="square">四角</option>
                        <option value="triangle">三角</option>
                        <option value="half_triangle">半三角</option>
                    </select>
                    <select class="btn btn-secondary dropdown-toggle" v-model="lineCap">
                        <option value="round">lineCap Round</option>
                        <option value="square">lineCap Square</option>
                        <option value="butt">lineCap butt</option>
                    </select>
                    <select class="btn btn-secondary dropdown-toggle" v-model="lineJoin">
                        <option value="round">lineJoin Round</option>
                        <option value="miter">lineJoin miter</option>
                        <option value="bevel">lineJoin bevel</option>
                    </select>
                    <button class="btn btn-outline-primary" type="button" @click.prevent="fillShape = !fillShape">
                        <span v-if="fillShape">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-square-fill" viewBox="0 0 16 16">
                                <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />
                            </svg>
                            Fill
                        </span>
                        <span v-else>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-square" viewBox="0 0 16 16">
                                <path
                                    d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                            </svg>
                            Stroke
                        </span>
                    </button>
                </div>
                <div class="button-container">
                    <div style="margin-right: 30px">
                        <p style="margin-bottom: 0">背景色</p>
                        <input type="color" v-model="backgroundColor" />
                    </div>
                    <div class="filebox">
                        <label for="ex_file">イメージアップロード</label>
                        <input type="file" id="ex_file" @change="setImage($event)" />
                    </div>
                    <div class="filebox">
                        <label for="ex_file2">ウォーターマークイメージアップロード</label>
                        <input type="file" id="ex_file2" @change="setWatermarkImage($event)" />
                    </div>
                </div>
                <div>
                    <button class="btn btn-outline-primary" v-if="!needLogin" @click="saveImage()">カスタムイメージセーブ</button>
                    <button class="btn btn-outline-primary" v-if="!this.$store.state.auth.needAdmin"
                        @click="adminSave()">イメージセーブ</button>
                </div>
            </div>
            <!-- <div class="output">
                <p>Output:</p>
                <img :src="image" style="border: solid 1px #000000" />
            </div> -->
        </div>
    </div>
</template>

<script>
import VueDrawingCanvas from "vue-drawing-canvas";

export default {
    name: "ServeDev",
    components: {
        VueDrawingCanvas,
    },
    data() {
        return {
            initialImage: [
                {
                    type: "dash",
                    from: {
                        x: 262,
                        y: 154,
                    },
                    coordinates: [],
                    color: "#000000",
                    width: 5,
                    fill: false,
                },
            ],
            x: 0,
            y: 0,
            image: "",
            eraser: false,
            disabled: false,
            fillShape: false,
            line: 5,
            color: "#000000",
            strokeType: "dash",
            lineCap: "round",
            lineJoin: "miter",
            backgroundColor: "#FFFFFF",
            backgroundImage: null,
            watermark: null,
            additionalImages: [],
        };
    },
    computed: {
        isAdmin() {
            return this.$route.query.isAdmin === "true";
        },
        needLogin() {
            return this.$route.query.needLogin === "true";
        }
    },
    mounted() {
        if ("vue-drawing-canvas" in window.localStorage) {
            this.initialImage = JSON.parse(
                window.localStorage.getItem("vue-drawing-canvas")
            );
        }
    },
    methods: {
        async setImage(event) {
            let URL = window.URL;
            this.backgroundImage = URL.createObjectURL(event.target.files[0]);
            await this.$refs.VueCanvasDrawing.redraw();
        },
        async setWatermarkImage(event) {
            let URL = window.URL;
            this.watermark = {
                type: "Image",
                source: URL.createObjectURL(event.target.files[0]),
                x: 0,
                y: 0,
                imageStyle: {
                    width: 600,
                    height: 400,
                },
            };
            await this.$refs.VueCanvasDrawing.redraw();
        },
        getCoordinate(event) {
            let coordinates = this.$refs.VueCanvasDrawing.getCoordinates(event);
            this.x = coordinates.x;
            this.y = coordinates.y;
        },
        async saveImage() {
            try {
                const blob = await fetch(this.image).then((res) => res.blob());
                console.log("blob", blob);
                const formdata = new FormData();
                formdata.append("game_id", 1);
                formdata.append("attachment", blob, "img.png");

                await this.$store.dispatch("game/storeCustomImg", formdata);
                alert('이미지를 성공적으로 보냈습니다.')
            } catch (err) {
                console.error(err);
            }
        },
        async adminSave() {
            try {
                const blob = await fetch(this.image).then((res) => res.blob());
                console.log("blob", blob);
                const formdata = new FormData();
                formdata.append("game_id", 1);
                formdata.append("attachment", blob, "img.png");

                await this.$store.dispatch("game/storeImg", formdata);
                alert('이미지를 성공적으로 보냈습니다.')
            } catch (err) {
                console.error(err);
            }
        }
    },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,700&display=swap");

body {
    font-family: "Roboto", sans-serif;
}

.flex-row {
    display: flex;
    flex-direction: row;
    justify-content: center; /* 수평 가운데 정렬 */
    align-items: center; /* 수직 가운데 정렬 */
    background-color: #f0f0f0; /* 배경색 */
    padding: 20px; /* 안쪽 여백 */
    border: 1px solid #ccc; /* 테두리 스타일 및 색상 */
    border-radius: 10px; /* 모서리 둥글게 */
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2); /* 그림자 효과 */
    color: #333; /* 텍스트 색상 */
    font-size: 18px; /* 글꼴 크기 */
    text-align: center; /* 텍스트 가운데 정렬 */
}

/* 선택적으로 hover 시에 스타일 변경 */
.flex-row:hover {
    background-color: #f38dc5;
}
.button-container {
    display: flex;
    flex-direction: row;
}

.button-container>* {
    margin-top: 15px;
    margin-right: 10px;
}

.filebox label {
    display: inline-block;
    padding: .5em .75em;
    color: #6200ff;
    font-size: inherit;
    line-height: normal;
    vertical-align: middle;
    background-color: #ffffff;
    cursor: pointer;
    border: 1px solid #000000;
    border-bottom-color: #000000;
    border-radius: .25em;
}

.filebox input[type="file"] {
    /* 파일 필드 숨기기 */
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
}
</style>
