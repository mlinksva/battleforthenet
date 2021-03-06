<style lang="scss">
$body-font: open-sans, sans-serif;
$title-font: futura-pt-bold, $body-font;
$red: #ff0e0e;
$header-red: #c60000;
$gray: #b7b7b7;
$odd-section-bg-color: #fff6f6;

body {
  font-family: $body-font;
  padding-bottom: 8rem;
}

h1, h2, h3, .btn {
  font-family: $title-font;
}

h1 {
  font-size: 7rem;
  line-height: .9;

  @include mobile {
    font-size: 4.2rem;
  }
}

h2 {
  color: #111;
  font-size: 2.8rem;

  &:after {
    content: "";
    background-color: #111;
    height: 0.1rem;
    display: block;
    width: 3rem;
    margin: 2rem auto;
  }
}

.container {
  width: 600px;
}

.top-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 120px;
  background-image: url('~/assets/images/redalert-top-gradient.png');
  background-size: 1000px 120px;
  background-repeat: no-repeat;
  background-position: center top;
  z-index: 2;
}

.page-header {
  background: rgb(255,14,13);
  background: linear-gradient(177deg, rgba(255,14,13,1) 0%, rgba(222,6,6,1) 51%, rgba(198,0,0,1) 100%);
  color: #fff;
  padding: 3rem;
  position: relative;

  // arrow
  &:after {
    top: 100%;
    left: 50%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-color: transparent;
    border-top-color: $header-red;
    border-width: 2.5rem;
    margin-left: -2.5rem;
  }

  h1 {
    margin: 0;
    color: inherit;
  }

  img.logo {
    width: 7rem;
  }

  form .row {
    display: flex;
    margin-bottom: 1.5%;

    input {
      margin-right: 1.5%;

      &:last-child {
        margin-right: 0;
      }

      &.address, &.phone {
        width: 38.5%;
      }

      &.zip {
        width: 20%;
      }
    }
  }

  p.disclaimer {
    small, a {
      color: inherit;
    }
  }

  p.error {
    color: #000;
    font-weight: bold;
  }
}

code {
  background-color: $odd-section-bg-color;
  border: 1px solid lighten(#000, 10%);
}

section {
  padding: 6rem;

  @include mobile {
    padding: 3rem 0;
  }

  &:nth-child(odd) {
    background-color: $odd-section-bg-color;

    code {
      background-color: #fff;
    }
  }

  p {
    font-weight: 300;
  }

  a {
    color: $red;
    text-decoration: none;

    &:not(.btn):hover {
      color: $red;
      text-decoration: underline;
    }
  }

  .btn-cta {
    font-size: 1.5rem;
  }
}

.page-footer {
  text-align: center;
  font-size: 1.4rem;
  padding: 5rem;
  color: #222;

  @include mobile {
    padding: 2.5rem 0;
  }

  h4 {
    font-family: $title-font;
    margin-bottom: 1.5rem;
    text-transform: uppercase;
  }

  .logos img {
    height: 3rem;
    margin: 1rem;
  }

  p {
    margin: 0.5rem 0;
    font-weight: 300;
  }

  a {
    text-decoration: none;
    font-weight: bold;
    color: inherit;

    &:hover {
      text-decoration: underline;
    }
  }
}

.red-alert {
  .btn-cta {
    background-color: #000;
    letter-spacing: 0.2rem;
    transition: transform .2s ease-in;

    &:hover {
      transform: scale(1.02);
    }

    &.btn-large {
      min-height: 5.6rem;
    }
  }

  .persistent-button {
    left: 0;
    right: 0;
    bottom: 0;

    a {
      background: $red;
      color: #fff;
      text-decoration: none;
      font-family: futura-pt-bold, open-sans, sans-serif;
      font-weight: 700;
      text-align: center;
      padding: 2rem;
      font-size: 2.5rem;
      text-transform: uppercase;

      img {
        height: 2.7rem;
        margin-right: 1.3rem;
      }
    }
  }

  .modal h2:after {
    content: none;
  }

  .image-gallery {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;

    a {
      width: 50%;
      padding: 0 0.5rem 0.5rem;

      &.full {
        width: 100%;
      }
    }

    &.avatars a {
      width: 25%;
    }

    @include mobile {
      a {
        width: 100%;
      }

      &.avatars a {
        width: 50%;
      }
    }
  }

  .battle-stats .stat {
    font-family: $title-font;
    font-size: 2.4rem;

    .value {
      color: #ff0000;
      background-color: #f6f6f6;
      font-size: 110%;
    }

    .label {
      background-color: #000;
      line-height: 1.1;

      &:after {
        border-right-color: #000;
      }
    }

    @include small-screen {
      font-size: 2rem;
    }
  }

  section:nth-child(odd) .battle-stats .stat .value {
    background-color: #fff;
  }
}

iframe.events-map {
  height: 350px;

  @include mobile {
    height: 200px;
  }
}
</style>

<template>
  <div class="red-alert text-center">
    <div class="top-gradient"><div class="container"></div></div>
    <header class="page-header" id="top">
      <div class="container">
        <img class="logo" src="~/assets/images/warning.svg" alt="">
        <h1 class="upcase">{{ $lt('title') }}</h1>
        <div v-html="$lt('intro_html')"></div>
        <form @submit.prevent="submitForm()">
          <p class="error" v-if="errorMessage">{{ errorMessage }}</p>
          <div class="row">
            <input v-model="name" :placeholder="$lt('form.name_placeholder')" name="name" type="text" required>
            <input v-model="email" :placeholder="$lt('form.email_placeholder')" name="email" type="email" required>
          </div>
          <div class="row">
            <input v-model="address" :placeholder="$lt('form.address_placeholder')" name="address" type="text" required class="address">
            <input v-model="zipCode" :placeholder="$lt('form.zip_placeholder')" name="zip_code" type="tel" required class="zip">
            <input v-model="phone" :placeholder="$lt('form.phone_placeholder')" name="phone" type="tel" class="phone">
          </div>
          <button class="btn btn-block btn-large btn-cta" :disabled="isSending">
            <span v-if="isSending">{{ $lt('form.button_loading') }}</span>
            <span v-else>{{ $lt('form.button_cta') }}</span>
          </button>
          <no-ssr>
            <experiment name="redalert-disclaimer-test">
              <variant slot="long">
                <disclaimer :sms="true"></disclaimer>
              </variant>
              <variant slot="short">
                <disclaimer :sms="false"></disclaimer>
              </variant>
            </experiment>
          </no-ssr>
        </form>
      </div>
    </header>

    <section v-for="(section, id) in $lt('sections')" :id="id" :key="id">
      <div class="container">
        <h2>{{ section.title }}</h2>
        <div v-html="section.body_html"></div>
        <battle-stats v-if="id == 'stats'"></battle-stats>
      </div>
    </section>

    <persistent-button>
      <a class="flex-center" href="#top" @click.prevent="scrollToTop()"><img src="~/assets/images/warning.svg" alt=""> <span>{{ $lt('persistent_button') }}</span></a>
    </persistent-button>

    <social-sidebar></social-sidebar>

    <modal v-if="modalVisible">
      <call-form :in-modal="true" :default-phone="phone" :default-zip="zipCode"></call-form>
    </modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PersistentButton from '~/components/PersistentButton'
import SocialSidebar from '~/components/SocialSidebar'
import CallForm from '~/components/CallForm'
import BattleStats from '~/components/BattleStats'
import { createMetaTags, pingCounter, sendToMothership, smoothScrollTo, startTextFlow } from '~/assets/js/helpers'
import axios from 'axios'

// red-alert-action
const actionPetitionId = '5440013f-1133-457b-b375-f6b88f7d0b3c'
// battle-for-the-net-action-5
const contactCongressPetitionId = '29e95d4c-b60c-4544-83bd-04f8eafeb96d'

// Red Alert response flow
const textFlowId = '9a1fe2d7-0647-4133-88ec-6bf7097228e8'

export default {
  layout: 'basic',

  head() {
    return {
      title: this.$lt('title'),

      link: [
        {
          rel: 'stylesheet',
          href: 'https://use.typekit.net/dkr1hdf.css'
        }
      ],

      meta: createMetaTags({
        title: this.$lt('sharing.title'),
        description: this.$lt('sharing.description'),
        image: this.$lt('sharing.image'),
        url: this.$lt('sharing.url')
      })
    }
  },

  components: {
    PersistentButton,
    SocialSidebar,
    CallForm,
    BattleStats
  },

  data() {
    return {
      name: null,
      email: null,
      address: null,
      zipCode: null,
      phone: null,
      isSending: false,
      errorMessage: null,
      modalVisible: false,
      isLoaded: false
    }
  },

  watch: {
    modalVisible(isVisible) {
      if (!isVisible) {
        this.resetForm()
      }
    }
  },

  computed: {
    ...mapState(['org'])
  },

  beforeCreate() {
    // This page has a 50/50 org rotation between FFTF and DP
    if (!this.$route.query.org && !this.$route.query.source) {
      const randomOrg = Math.random() < 0.5 ? 'fftf' : 'dp'
      this.$store.commit('setOrg', randomOrg)
    }
  },

  mounted() {
    document.querySelectorAll('.demo-widget').forEach(el => {
      el.onclick = (event) => {
        event.preventDefault()
        this.$trackEvent('try_redalert_widget_button', 'click')
        this.demoWidget()
      }
    })

    if (this.$route.query.widget) {
      this.demoWidget()
    }

    this.isLoaded = true
  },

  methods: {
    $lt(key) {
      return this.$t(`pages.redalert.${key}`)
    },

    async submitForm() {
      this.isSending = true
      const variant = localStorage.getItem('exp.redalert-disclaimer-test')
      const variantLabel = `redalert-disclaimer-test-${variant}`
      this.$trackEvent('redalert_form', 'submit', variantLabel)

      try {
        const response = await sendToMothership({
          subject: "Protect Net Neutrality!",
          member: {
            first_name: this.name,
            email: this.email,
            postcode: this.zipCode,
            phone_number: this.phone,
            street_address: this.address,
            country: 'US'
          },
          hp_enabled: 'true',
          guard: '',
          contact_congress: 1,
          fcc_ecfs_docket: "17-108",
          org: this.org,
          an_tags: "[\"net-neutrality\"]",
          an_petition_id: contactCongressPetitionId,
          action_comment: "Please co-sponsor, sign the discharge petition, and vote for the CRA to restore net neutrality."
        }, {
          variant: variantLabel
        })

        this.isSending = false
        this.modalVisible = true
      }
      catch (error) {
        console.error(error)
        this.isSending = false
        this.errorMessage = this.$lt('form.generic_error')
      }

      this.signActionPetition()

      if (this.org === 'fftf' && this.phone && variant === 'long') {
        startTextFlow({
          flow: textFlowId,
          phone: this.phone
        })
      }

      pingCounter('email')
    },

    async signActionPetition() {
      try {
        await sendToMothership({
          member: {
            first_name: this.name,
            email: this.email,
            postcode: this.zipCode,
            phone_number: this.phone,
            street_address: this.address,
            country: 'US'
          },
          hp_enabled: 'true',
          guard: '',
          contact_congress: 0,
          org: this.org,
          an_tags: "[\"net-neutrality\"]",
          an_petition_id: actionPetitionId
        })
      }
      catch (error) {
        // uh oh
      }
    },

    resetForm() {
      this.isSending = false
      this.name = null
      this.email = null
      this.phone = null
      this.zipCode = null
      this.address = null
    },

    scrollToTop() {
      smoothScrollTo(0, 0, 500)
    },

    demoWidget() {
      // widget is already loaded
      if (document.getElementById('RED_ALERT_WIDGET')) {
        return
      }

      const scriptId = 'RED_ALERT_SCRIPT'

      // clean up any existing widget elements
      let el = document.getElementById(scriptId)
      if (el) {
        el.parentNode.removeChild(el)
      }

      el = document.getElementById('RED_ALERT_CSS')
      if (el) {
        el.parentNode.removeChild(el)
      }

      // set up widget options
      let baseURL = 'https://redalert.battleforthenet.com'

      if (process.env.NODE_ENV === 'development') {
        baseURL = 'http://localhost:8080'
      }

      window.RED_ALERT_OPTIONS = {
        alwaysShow: true,
        iframeHost: baseURL
      }

      // load script
      const script = document.createElement('script')
      script.id = scriptId
      script.src = `${baseURL}/widget.js`
      document.head.appendChild(script)
    }
  }
}
</script>
