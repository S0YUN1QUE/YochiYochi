<html>
    <head>
        <script src="tts.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@3.11.0/dist/tf.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/posenet@2.2.2/dist/posenet.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-core@3.11.0/dist/tf-core.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-converter@3.11.0/dist/tf-converter.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-webgl@3.11.0/dist/tf-backend-webgl.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/pose-detection@0.0.6/dist/pose-detection.min.js"></script>
        <style>
            /* 이미지에 캔버스를 겹쳐서 그리기 위함 */
            canvas {
                position: absolute;
                transform: translate(-50%, -50%);
                top: 50%;
                left: 50%;
            }

            video {
                position: absolute;
                transform: translate(-50%, -50%);
                top: 50%;
                left: 50%;
            }
            
            .pose-container {
                position: relative;
                width: 100%;
                height: 90%;
            }
        </style>
        @vite('resources/js/posnet.js')
        @vite('resources/js/index.js')
        @vite('resources/js/object.js')
    </head>
    <body>
        <x-app-layout>
        <div class="py-6">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6 text-gray-900">
                        <!-- {{ __("You're logged in!") }} -->
                        <div class="pose-container">
                            <video id="video" width="640px" height="480px" autoplay muted playsinline></video>
                            <canvas id="canvas" width="640px" height="480px"></canvas>
                            <canvas id="e_canvas" width="640px" height="480px"></canvas>
                        </div>
                        <!-- <input id="code_reddit" type="hidden" value="안녕" autocomplete="off">
                        <button class="btn" onclick="g_gout()">버튼</button> -->
                        <div id="posnet"></div>
                        <div id="index"></div>
                        <div id="object"></div>
                    </div>
                </div>
            </div>
        </div>
        </x-app-layout>
    </body>
</html>