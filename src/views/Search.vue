<template>
    <div class="page-search">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Search</h1>
                <h2 class="is-size-5 has-text-gray">Search term: "{{ query }}"</h2>
            </div>
            
            <ProductBox
            v-for="product in products"
            :key="product.id"
            :product="product"/>

        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { toast } from 'bulma-toast'

import ProductBox from '@/components/ProductBox'

export default {
    name: 'Search',
    components: {
        ProductBox
    },
    data() {
        return {
            products: [],
            query: '',
        }
    },
    mounted() {
        document.title = 'Search | Rugmo.inc'

        let url = window.location.search.substring(1)
        let params = new URLSearchParams(url)

        if (params.get('query')) {
            this.query = params.get('query')

            this.performSearch()
        }
    },
    methods: {
        async performSearch() {
            this.$store.commit('setIsLoading', true)

            await axios
                .post('/api/v1/products/search/', {'query': this.query})
                .then(response => {
                this.products = response.data
                })
                .catch(error => {
                console.log(error)

                toast({
                    message: 'Oops! Something went wrong. Please try again.',
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                    duration: 2000,
                    position: 'bottom-right',
                });
            })

            this.$store.commit('setIsLoading', false)
        }
    },
}
</script>