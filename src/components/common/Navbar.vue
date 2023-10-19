<template>
  <div>
    <vueNavigationBar :options="navigationData">
        <template v-slot:custom-section>
            <div v-if="this.$store.state.auth.needLogin" class="custom-section-content">
              <router-link to="/signup">
                <button class="btn1" type="button" id="signup" role="link">
                  Signup
                </button>
              </router-link>
              <router-link to="/login">
                <button class="btn1" type="button" id="login" role="link">
                  Login
                </button>
              </router-link>
            </div>
            <div v-if="!this.$store.state.auth.needLogin" class="custom-section-content">
              <span>{{ this.$store.state.auth.name }}様</span>
              <button class="btn1" type="button" id="logout" role="link" @click="logout()">
                Logout
              </button>
            </div>
          </template>
    </vueNavigationBar>
    <div id="spacer"></div>    
  </div>
</template>

<script>
  import vueNavigationBar from "vue-navigation-bar/src/vue-navigation-bar.vue";
  import brandImage from "../../assets/yochiyochi.png";

  export default {
    methods: {
      async logout() {
        try {
          await this.$store.dispatch("auth/logout")
          this.$router.push({ name: 'main' })
        } catch(err) {
          console.error(err);
        }
      }
    },
    data() {
    return {
      username: {
        message: decodeURIComponent(document.cookie),
      },
      computed: {
        cookie() {
          return document.cookie
        }
      },
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
              path: {name: 'aboutus'},
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
                  path: {name: 'service'},
                },
                {
                  type: "hr",
                },
                {
                  type: "link",
                  text: "Events",
                  path: {name: 'service'},
                },
                {
                  type: "link",
                  text: "Store",
                  path: {name: 'service'},
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
    padding: 1.5rem 3rem;
    z-index: 100;
    border-bottom: 1px solid rgba(184, 184, 184, 0.514);
    display: flex;
    justify-content: center;
    justify-items: center;
    &__menu-options {
      &--right {
        padding-right: 0;
        margin: 0;
      }
      &__option {
        &__link {
          font-size: 1.125rem;
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

.custom-section-content {
  display: flex;
  justify-content: center;
  justify-items: center;
  margin-left: auto;
}

.btn1 {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0 0.8rem;

  color: white;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  font-size: 1rem;
  line-height: 1;
  border-radius: 0.25rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 0.8rem 1.125rem;
  transition: background 0.2s ease-in;
}

#signup {
  background: rgb(0, 101, 232);
  border: none;
  &:hover {
    background: darken(rgb(0, 101, 232), 10%);
  }
}

#login, #logout {
  background: rgb(48, 189, 133);
  border: none;
  &:hover {
    background: darken(rgb(48, 189, 133), 10%);
  }
}
</style>
<style>
  #spacer {
    height: 3.5rem;
  }
</style>
