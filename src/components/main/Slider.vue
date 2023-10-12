<template>
  <div class="image_slider" slideWidth="100%">
    <carousel :items-to-show="1" :wrapAround="true" :autoplay="5000">
      <slide v-for="slide in items[0].menus" :key="slide">
        <div class="carousel__item">
          <figure class="image-container">
            <img :src="slide.image" :alt="slide.alt" class="slider-image" />
            <figcaption><em>{{slide.caption}}</em><span>{{slide.description}}</span></figcaption>
          </figure>
        </div>
      </slide>
  
      <template #addons>
        <navigation />
        <pagination />
      </template>
    </carousel>
  </div>
</template>

<script>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

import slider01 from '../images/slider01.jpg'; // 이미지를 import 함
import slider02 from '../images/slider02.jpg';
import slider03 from '../images/slider03.jpg';

export default {
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  data() {
    return {
      items: [
        {
          title: 'Carousel Slider',
          description: 'Carousel를 이용한 이미지 슬라이드 효과',
          menus: [
            {
              image: slider01, // import한 이미지를 사용
              alt: 'image1',
              // caption: 'Responsive Site',
              // description: '슬라이드 플러그인을 이용한 반응형 이미지 슬라이드',
            },
            {
              image: slider02,
              alt: 'image2',
              // caption: 'Responsive Site',
              // description: '슬라이드 플러그인을 이용한 반응형 이미지 슬라이드',
            },
            {
              image: slider03,
              alt: 'image3',
              // caption: 'Responsive Site',
              // description: '슬라이드 플러그인을 이용한 반응형 이미지 슬라이드',
            },
          ],
        },
      ],
    };
  },
};
</script>

<style>
.image-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%; /* 슬라이더 높이와 같게 설정 */
}

.slider-image {
  width: 700px; /* 이미지 폭을 고정 크기로 설정 */
  height: 500px; /* 이미지 높이를 고정 크기로 설정 */
  object-fit: cover; /* 이미지 비율 유지하며 부모 요소에 맞춤 */
}
</style>
