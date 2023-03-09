<html>
    <head>
        <style>
            .container {
                margin: 2%;
                position: relative;
                width: 100%;
                height: 80%;
            }
            .canvas-wrapper, #output, #video, #e_canvas {
                position: absolute;
                margin: 0;
                transform: translate(-50%, -50%);
                top: 50%;
                left: 50%;
            }
        </style>
        @vite('resources/js/movenet.js')
        @vite('resources/js/index.js')
        <!-- @vite('resources/js/object.js') -->
    </head>
    <body>
    <x-app-layout>
        <div class="py-6">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6 text-gray-900">
                    <div class="container">
                        <div class="canvas-wrapper">
                            <video id="video" playsinline style="
                            -webkit-transform: scaleX(-1);
                            transform: scaleX(-1);
                            visibility: hidden;
                            width: auto;
                            height: auto;
                            ">
                            </video>
                            <canvas id="output"></canvas>
                            <canvas id="e_canvas"></canvas>
                        </div>
                        <div id="scatter-gl-container"></div>
                        <div id="movenet"></div>
                        <div id="index"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </x-app-layout>
    </body>
</html>