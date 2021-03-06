<style lang="scss">
.petition-form {
  margin: 3rem auto 0;

  @include big-screen {
    border: 1px solid #2e273e;
    border-radius: $border-radius;
    padding: 3rem;
  }

  .flex-row {
    margin-bottom: 0.8rem;

    > * {
      margin-right: 0.8rem;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  input, textarea {
    font-family: $body-font;
    font-weight: 300;
    padding: 1rem 1.5rem;

    &::placeholder {
      // color: #201b2c;
      font-weight: 300;
    }
  }

  input.zip-code {
    flex-grow: 0.5;
  }

  .letter {
    position: relative;
    margin-bottom: 0.8rem;

    textarea {
      min-width: 100%;
      max-width: 100%;
      min-height: 5rem;
      height: 5rem;
      padding-right: 12rem;
    }

    a.clear {
      position: absolute;
      right: 2rem;
      bottom: 1.6rem;
      background-color: #ebe7f4;
      color: #89819d;
      font-size: 1.2rem;
      margin: 0;
      letter-spacing: 0;

      &:hover {
        background-color: darken(#ebe7f4, 5%);
      }
    }
  }

  .biz-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.8rem;

    label {
      font-weight: bold;
      text-align: left;
      padding: 0 .5rem;
    }
  }

  .btn-large {
    font-size: 2.6rem;
    margin: 1.2rem 0 0 0;
    letter-spacing: 0.3rem;
  }

  .disclaimer {
    // min-height: 80px;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    animation: fade-in .2s;
  }
}
</style>

<template>
  <div>
    <div v-if="!hasSigned || !inModal">
      <h2 v-if="title">{{ title }}</h2>
      <form class="petition-form" @submit.prevent="submitForm()">
        <div class="flex-row">
          <input v-model.trim="name" type="text" :placeholder="$lt('name_placeholder')" required class="name">
          <input v-model.trim="email" type="email" :placeholder="$lt('email_placeholder')" required class="email">
        </div>
        <div class="flex-row">
          <input v-model.trim="address" type="text" :placeholder="$lt('address_placeholder')" required class="address">
          <input v-model.trim="zipCode" type="tel" :placeholder="$lt('zip_placeholder')" required class="zip-code">
          <input v-model.trim="phone" type="tel" :placeholder="$lt('phone_placeholder')">
        </div>
        <div class="letter">
          <textarea v-model="comments" ref="comments"></textarea>
          <a href="#" class="clear btn" @click.prevent="clearComments()">{{ $lt('clear_comments') }}</a>
        </div>
        <div class="biz-row">
          <label>{{ $lt('business_owner_label') }}</label>
          <fancy-toggle :on="isBusinessOwner" @change="isBusinessOwner = !isBusinessOwner"></fancy-toggle>
        </div>
        <div v-if="isBusinessOwner" class="flex-row">
          <input v-model.trim="companyName" type="text" :placeholder="$lt('company_name_placeholder')">
          <input v-model.trim="companyURL" type="text" :placeholder="$lt('company_url_placeholder')">
        </div>
        <button class="btn btn-block btn-large btn-cta" :disabled="isSending">
          <span v-if="isSending">{{ $lt('button_loading') }}</span>
          <span v-else>{{ $lt('button_cta') }}</span>
        </button>
        <no-ssr>
          <disclaimer :sms="true"></disclaimer>
        </no-ssr>
      </form>
    </div>

    <div v-if="hasSigned">
      <call-form v-if="inModal" :in-modal="true" />
      <modal v-else-if="modalVisible">
        <call-form :in-modal="true" />
      </modal>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { pingCounter, sendToMothership, startTextFlow } from '~/assets/js/helpers'
import CallForm from '~/components/CallForm'
import FancyToggle from '~/components/FancyToggle'
import axios from 'axios'

// battle-for-the-net-action-4
const petitionId = '25488448-4124-4359-8873-d1ef731ea5f4'

// BFNN petition
const bizPetitionId = '94ac8142-99b8-411f-83af-133d02649af1'

export default {
  components: {
    CallForm,
    FancyToggle
  },

  props: {
    title: String,

    inModal: {
      type: Boolean,
      default: false
    },
  },

  data() {
    return {
      isSending: false,
      hasSigned: false,
      modalVisible: false,
      name: null,
      email: null,
      comments: this.$lt('default_letter'),
      isBusinessOwner: false,
      companyName: null,
      companyURL: null
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
    ...mapState(['org']),

    actionComment() {
      return `${this.comments}\n\n(The sender of this message generated it using tools available at BattleForTheNet.com on ${new Date()}.)`
    },

    zipCode: {
      get() {
        return this.$store.state.zipCode
      },

      set(value) {
        this.$store.commit('setZipCode', value)
      }
    },

    phone: {
      get() {
        return this.$store.state.phone
      },

      set(value) {
        this.$store.commit('setPhone', value)
      }
    },

    address: {
      get() {
        return this.$store.state.streetAddress
      },

      set(value) {
        this.$store.commit('setStreetAddress', value)
      }
    }
  },

  methods: {
    $lt(key) {
      return this.$t(`pages.index.form.${key}`)
    },

    clearComments() {
      this.$trackEvent('clear_comments_button', 'click')
      this.comments = null
      this.$refs.comments.focus()
    },

    async submitForm() {
      this.isSending = true

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
          an_petition_id: petitionId,
          action_comment: this.comments
        })

        this.$trackEvent('petition_form', 'submit')
        this.isSending = false
        this.modalVisible = true
        this.hasSigned = true

        if (this.phone && this.org === 'fftf') {
          this.startTextFlow()
        }

        if (this.companyName && this.companyURL) {
          this.signBusinessPetition()
        }

        pingCounter('email')
      }
      catch (err) {
        self.isSending = false
        self.errorMessage = "That didn't work for some reason :("
      }
    },

    async signBusinessPetition() {
      return axios.post(
        `https://fv8xpw9hri.execute-api.us-east-1.amazonaws.com/v1/petitions/${bizPetitionId}/signatures`,
        {
          name: this.name,
          email: this.email,
          phone: this.phone,
          zip_code: this.zipCode,
          comments: this.comments,
          custom: {
            company: this.companyName,
            company_url: this.companyURL,
          },
          tags: ['bfnn', 'net-neutrality'],
          source: this.$route.query.source
        }
      )
    },

    resetForm() {
      this.isSending = false
      this.name = null
      this.email = null
      this.address = null
      this.zipCode = null
      this.phone = null
      this.comments = this.$lt('default_letter')
      this.isBusinessOwner = false
      this.companyName = null
      this.companyURL = null
    },

    startTextFlow() {
      startTextFlow({
        flow: '9a1fe2d7-0647-4133-88ec-6bf7097228e8',
        phone: this.phone
      })
    }
  }
}
</script>
