<script setup>
import { data } from 'autoprefixer';
import HelloWorld from './components/HelloWorld.vue';
</script>

<template>
    <div id="app">
        <header>
            <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

            <div class="wrapper">
                <HelloWorld msg="29's Home" />

                <nav>
                    <a href="#" @click="toAdmin">Admin</a>
                    <a href="#" @click="toBlog">Blog</a>
                </nav>
                
                {{ uuid }}
            </div>
        </header>

        <router-view />
    </div>
</template>

<script>
import FingerprintJS from '@fingerprintjs/fingerprintjs'
export default {
    data() {
        return {
            // uuid : localStorage.getItem('UUID')
            uuid : ''
        };
    },
    created() {
        let domain = window.location.host
        console.log('App.vue domain -> ', domain)
        FingerprintJS.load()
            .then(fp => fp.get())
            .then(result => {
                // This is the visitor identifier:
                console.log('App.vue result -> ', result)
                const visitorId = result.visitorId
                this.uuid = visitorId
                localStorage.setItem('UUID', visitorId)
            })
    },
    methods: {
        toAdmin() {
            // let macAdd = 
        },
        toBlog() {
            let url = 'http://blog.zp29.net';
            window.location.href = url
        },
    },
};
</script>

<style scoped lang="less">
header {
    max-height: 100vh;
    line-height: 1.5;
}

.logo {
    display: block;
    margin: 0 auto 2rem;
}

nav {
    width: 100%;
    margin-top: 2rem;
    font-size: 12px;
    text-align: center;
}

nav a.router-link-exact-active {
    color: var(--color-text);
}

nav a.router-link-exact-active:hover {
    background-color: transparent;
}

nav a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
    border: 0;
}

@media (min-width: 1024px) {
    header {
        display: flex;
        place-items: center;
        padding-right: calc(var(--section-gap) / 2);
    }

    .logo {
        margin: 0 2rem 0 0;
    }

    header .wrapper {
        display: flex;
        flex-wrap: wrap;
        place-items: flex-start;
    }

    nav {
        padding: 1rem 0;
        margin-top: 1rem;
        margin-left: -1rem;
        font-size: 1rem;
        text-align: left;
    }
}
</style>
