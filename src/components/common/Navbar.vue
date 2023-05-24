<template>
  <div>
    <vueNavigationBar :options="navigationData" />
    <div id="spacer"></div>    
  </div>
</template>

<script>
  import vueNavigationBar from "vue-navigation-bar/src/vue-navigation-bar.vue";
  import brandImage from "../../assets/yochiyochi.png";

  export default {
    data() {
    return {
      navigationData: {
        elementId: "main-navbar",
          isUsingVueRouter: true,
          mobileBreakpoint: 992,
          brandImagePath: {name: 'main'},
          brandImage,
          brandImageAltText: "brand-image",
          showBrandImageInMobilePopup: true,
          ariaLabelMainNav: "Main Navigation",
          tooltipAnimationType: "shift-away",
          tooltipPlacement: "bottom",
          menuOptionsLeft: [
            {
              type: "link",
              text: "About",
              subMenuOptions: [
                {
                  isLinkAction: true,
                  type: "link",
                  text: "Project",
                  path: {name: 'aboutus'},
                },
                {
                  type: "link",
                  text: "Team",
                  path: {name: 'aboutus'},
                },
                {
                  type: "link",
                  text: "News",
                  path: {name: 'aboutus'},
                },
              ]
            },
            {
              type: "link",
              text: "Service",
              subMenuOptions: [
                {
                  type: "link",
                  text: "YochiYochi",
                  path: {name: 'ContentList'},
                },
                {
                  type: "hr",
                },
                {
                  type: "link",
                  text: "Events",
                  path: {name: 'ContentList'},
                },
                {
                  type: "link",
                  text: "Store",
                  path: {name: 'ContentList'},
                },
              ]
            },
            {
              type: "link",
              text: "Board",
              subMenuOptions: [
                {
                  type: "link",
                  text: "Community",
                  path: {name: 'community'},
                },
                {
                  type: "link",
                  text: "Resources",
                  path: {name: 'freeboard'},
                },
              ]
            },
            {
              type: "link",
              text: "Customer",
              subMenuOptions: [
                {
                  type: "link",
                  text: "Notice",
                  path: {name: 'customer'},
                },
                {
                  type: "hr",
                },
                {
                  type: "link",
                  text: "FAQ",
                  path: {name: 'customer'},
                },
                {
                  type: "link",
                  text: "QnA",
                  path: {name: 'customer'},
                },
              ]
            },
          ],
          menuOptionsRight: [
            {
              type: "button",
              class: "signup-btn",
              text: "signup",
              path: {name: 'signup'},
            },
            {
              type: "button",
              class: "login-btn",
              text: "login",
              path: {name: 'login'},
            },
          ]
      }
    }
  },
  components: {
    vueNavigationBar
  },
  }
</script>

<style lang="scss">
  .vnb {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding-left: 1rem;
    padding-right: 1rem;
    z-index: 100;
    border-bottom: 1px solid rgba(184, 184, 184, 0.514);
    display: flex;
    .signup-btn {
      background: rgb(0, 101, 232);
      &:hover {
        background: darken(rgb(0, 101, 232), 10%);
      }
    }
    .login-btn {
      background: rgb(48, 189, 133);
      &:hover {
        background: darken(rgb(48, 189, 133), 10%);
      }
    }
    &__menu-options {
      &__option {
        &__link {
          font-size: 1rem;
        }
      }
    }
    &__sub-menu-options {
      &__option {
        &__hr {
          border: solid 1px rgb(255, 217, 0);
        }
        &__link {
          border-left: 0px;
          &:hover {
            border-left: 0px;
            background: rgba(48, 189, 133, 0.579);
          }
          &__text-wrapper {
            &__text {
              text-align: center;
            }
          }
        }
      }
    }
  }
</style>
<style>
  #spacer {
    height: 2rem;
  }
</style>