<template>
    <div class="page-sing-up">
        <div class="columns">
            <div class="column is-4 is-offset-4">
                <h1 class="title">Sign up</h1>

                <form @submit.prevent="submitForm">
                    <div class="field">
                        <label>Username</label>
                        <div class="control">
                            <input type="text" class="input" placeholder="Username" v-model="username">
                        </div>
                    </div>
                    <div class="field">
                        <label>Password</label>
                        <div class="control">
                            <input type="password" class="input" placeholder="Password" v-model="password">
                        </div>
                    </div>
                    <div class="field">
                        <label>Confirm your password</label>
                        <div class="control">
                            <input type="password" class="input" placeholder="Confirm password" v-model="password_confirmation">
                        </div>
                    </div>

                    <div class="notification is-danger" v-if="errors.length">
                        <p v-for="error in errors" :key="error">{{ error }}</p>
                    </div>

                    <div class="field">
                        <div class="control">
                            <button class="button is-dark">Sign up</button>
                        </div>
                    </div>

                    <hr>

                    Or <router-link to="/log-in">click here</router-link> to Log in!
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { toast } from 'bulma-toast'

export default {
    name: 'SignUp',
    data() {
        return {
            username: '',
            password: '',
            password_confirmation: '',
            errors: [],
        }
    },
    methods: {
        submitForm() {
            this.errors = []

            if (this.username === '') {
                this.errors.push('Username is required')
            }

            if (this.password === '') {
                this.errors.push('Password is required')
            }

            if (this.password_confirmation === '') {
                this.errors.push('Password confirmation is required')
            }

            if (this.password !== this.password_confirmation) {
                this.errors.push('Password and password confirmation must match')
            }

            if (!this.errors.length) {
                const formData = {
                    username: this.username,
                    password: this.password,
                }
                
                axios
                    .post("/api/v1/users/", formData)
                    .then(response => {
                        toast({
                            message: 'Account created, please log in!',
                            type: 'is-success',
                            position: 'bottom-right',
                            dismissible: true,
                            duration: 2000,
                            pauseOnHover: true,
                        })

                        this.$router.push('/log-in')
                    })
                    .catch(error => {
                        if (error.response) {
                            for (const property in error.response.data){
                                this.errors.push(`${property}: ${error.response.data[property]}`)
                            }
                            
                            console.log(JSON.stringify(error.response.data));
                        } else if (error.message) {
                            this.errors.push('Something went wrong. Please try again')

                            console.log(JSON.stringify(error))
                        }
                    })
            }
        }
    },
}
</script>