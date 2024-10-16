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
                    <a href="javascript:" @click="toAdmin" v-if="isAdmin">Admin</a>
                    <a href="javascript:" @click="AlistOption" v-if="isAdmin">AlistOption</a>
                    <a href="javascript:" @click="toBlog">Blog</a>
                </nav>

                <span style="opacity: .04; position: fixed;bottom: 0;right: 0;">{{ uuid }}</span>
            </div>
        </header>

        <div class="adminLinks" v-if="isAdmin && showAdminSide">
            <a href="javascript:" style="display: block; width: 100%; text-align: left; margin-bottom: 10px;"
                v-for="link in links" :key="link.name" @click="JumpURL(link)">{{ link.name }}</a>
        </div>
        <div class="tips" v-if="tipsText?.length">
            <div class="close" @click="tipsText = []">X</div>
            <p v-for="tip in tipsText" :key="tip">{{ tip }}</p>
        </div>
    </div>
</template>

<script>
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { computed } from 'vue';
import { post, get } from '@/utils/request';

export default {
    data() {
        return {
            uuid: '',
            links: [],
            tipsText: [
                // '121','121', 'asdas',
                // '121','121', 'asdas',
                // '121','121', 'asdas',
                // '121','121', 'asdas',
                // '121','121', 'asdas',
                // '121','121', 'asdas',
                // '121','121', 'asdas',
            ],
            showAdminSide: false
        };
    },
    computed: {
        isAdmin() {
            const uuids = [
                '4e54d99c9fb6ec705d18244d2f370c26', // mac pro m1
                'fb54d59a207651e7d9fb5ec78e8641bf', // ios alook
                'ec30c2eaa1e049a7e01b8addb2575242', // ios kuaq
                'a66215a900b1bb75f004a78eedf3a80f', // ios safari
                'ec30c2eaa1e049a7e01b8addb2575242', // ios WX
                '8656e1750ad3f8d7f6b93dc51ea1a5a5', // ios WX

                '56a60fa24e1b07d1ca7560e3bfaa86b4',
                'b1571ac92f259b1225d5bcd779fc90af',
                "b1571ac92f259b1225d5bcd779fc90af",
            ]
            return uuids.includes(this.uuid)
        }
    },
    created() {
        let domain = window.location.host
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
            this.links = [
                {
                    name: 'OpenWrt',
                    path: 'http://openwrt.zp29.net:9000/cgi-bin/luci/admin/quickstart/'
                },
                {
                    name: 'Emby',
                    path: 'http://openwrt.zp29.net:8096/'
                },
                {
                    name: 'Alist',
                    path: 'http://openwrt.zp29.net:5244/'
                },
                {
                    name: 'NasTools',
                    path: 'http://openwrt.zp29.net:3000/'
                },
                {
                    name: 'MOVIEPILOT',
                    path: 'http://openwrt.zp29.net:3001/'
                }
            ]
            this.showAdminSide = !this.showAdminSide
        },
        AlistOption() {
            this.links = [
                {
                    name: '更新115Mov',
                    path: 'action',
                    action: 'update115Mov'
                },
                {
                    name: '更新115Tv',
                    path: 'action',
                    action: 'update115Tv'
                },
                {
                    name: '更新aliMov',
                    path: 'action',
                    action: 'updateAliMov'
                },
                {
                    name: '更新aliTv',
                    path: 'action',
                    action: 'updateAliTv'
                },
                {
                    name: '更新115Jav',
                    path: 'action',
                    action: 'update115Jav'
                },
                {
                    name: 'BT',
                    path: 'https://btdig.com/index.htm',
                },
                {
                    name: 'BTM',
                    path: 'https://clm20240801.xn--yets15cv4k.com',
                },
            ]
            this.showAdminSide = !this.showAdminSide
        },
        ListenerWebSocket() {
            const WS_URL = 'ws://openwrt.zp29.net:18095';
            const ws = new WebSocket(WS_URL)
            ws.onopen = (event) => {
                console.log('Connected to WebSocket server', event);
                this.tipsText = []
                this.tipsText.push('开始生成')
                this.AutoScroll()
            }
            ws.onmessage = (event) => {
                const message = JSON.parse(event.data);
                // console.log('WebSocket onmessage', message);
                switch (message.status) {
                    case 'start':
                        this.tipsText.push('文件总数: ' + message.total)
                        console.log(`WebSocket Generation started. Total files: ${message.total}`);
                        break;
                    case 'progress':
                        this.tipsText.push(`文件 ${message.current} of ${message.total}: ${message.movie}`)
                        console.log(`WebSocket Processing file ${message.current} of ${message.total}: ${message.movie}`);
                        this.$nextTick(() => {
                            this.AutoScroll()
                        })
                        break;
                    case 'done':
                        ws.close();

                        this.tipsText.push(`文件共${message.total}个，生成成功`)
                        // this.tipsText.push(`5s 后自动关闭`)
                        this.$nextTick(() => {
                            this.AutoScroll()
                            // setTimeout(() => {
                            //     this.tipsText = []
                            // }, 5 * 1000)
                        })
                        break;
                    default:
                        this.tipsText.push(message.message)
                        // console.log('WebSocket Unknown message:', message);
                }
            }
        },
        updateAliMov() {
            this.ListenerWebSocket()
            post('http://openwrt.zp29.net:8095/generateStrm', { alistPath: '/pan/ali/mov', embyItemId: '3' })
                .then(response => {
                    console.log('POST request sent, server response:', response.data);
                })
                .catch(error => {
                    console.error('Error sending POST request:', error);
                });
        },
        updateAliTv() {
            this.ListenerWebSocket()
            post('http://openwrt.zp29.net:8095/generateStrm', { alistPath: '/pan/ali/Tv', embyItemId: '557' })
                .then(response => {
                    console.log('POST request sent, server response:', response.data);
                })
                .catch(error => {
                    console.error('Error sending POST request:', error);
                });
        },
        update115Jav() {
            this.ListenerWebSocket()
            post('http://openwrt.zp29.net:8095/generateStrm', { alistPath: '/pan/115/jav', embyItemId: '17722', sizi: '1024 * 1024 * 100' })
                .then(response => {
                    console.log('POST request sent, server response:', response.data);
                })
                .catch(error => {
                    console.error('Error sending POST request:', error);
                });
        },
        update115Mov() {
            this.ListenerWebSocket()
            post('http://openwrt.zp29.net:8095/generateStrm', { alistPath: '/pan/115/mov', embyItemId: '3' })
                .then(response => {
                    console.log('POST request sent, server response:', response.data);
                })
                .catch(error => {
                    console.error('Error sending POST request:', error);
                });
        },
        update115Tv() {
            this.ListenerWebSocket()
            post('http://openwrt.zp29.net:8095/generateStrm', { alistPath: '/pan/115/tv', embyItemId: '557' })
                .then(response => {
                    console.log('POST request sent, server response:', response.data);
                })
                .catch(error => {
                    console.error('Error sending POST request:', error);
                });
        },
        JumpURL(item) {
            let url = item.path
            if (url == 'action') {
                let action = item.action
                this[action]()
                return
            }
            window.open(url)
        },
        toBlog() {
            let url = 'http://blog.zp29.net';
            window.location.href = url
        },
        AutoScroll() {
            var element = document.querySelector(".tips")
            element.scrollTop = element.scrollHeight;
        }
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

.adminLinks {
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
}

.tips {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    color: #fff;
    max-height: 100vh;
    padding: 20% 0;
    overflow: scroll;
    align-items: center;
    .close {
        position: fixed;
        top: 10px;
        right: 10px;
        font-size: 20px;
        width: 50px;
        height: 50px;
        line-height: 55px;
        text-align: center;
        cursor: pointer;
        font-size: 18px;
        font-family: fantasy;
        background: #000;
        border-radius: 50%;
        z-index: 999;
        &:hover {
            color: #ccc;
        }
    }
    p {
        border: 1px solid #fff;
        padding: 10px;
        border-radius: 5px;
        min-width: 300px;
        max-width: 80%;
    }
    p + p {
        margin-top: 10px;
    }
    &::after {
        content: 'loading...';
        margin-top: 20px;
        animation: loading 1s linear infinite;
        @keyframes loading {
            0% {
                content: 'loading';
            }
            25% {
                content: 'loading.';
            }
            50% {
                content: 'loading..';
            }
            75% {
                content: 'loading...';
            }
            100% {
                content: 'loading';
            }
        }
    }
}
</style>
