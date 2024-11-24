const api_key = "KWrvZZvlNa2LQVtMoPwnQLpL7iMlqeLyLLl41kzbWRo"
const api_url = "https://api.unsplash.com/photos/random?query=cat&orientation=portrait&client_id=KWrvZZvlNa2LQVtMoPwnQLpL7iMlqeLyLLl41kzbWRo"

const cat_fact_api_url = "https://catfact.ninja/fact?max_length=240"

let img = document.getElementById("image")
let para = document.getElementById("fact-para")
let next

let app = Vue.createApp({
    data: function () {
        return {
            heading: "Fact - / ",
            api: api_url,
            imagesrc: '',
            count: 0,
            randomfact: "",
            username: "",
            username_url: ""
        }
    },
    methods: {
        next_cat_fact() {
            this.count += 1
            fetch(cat_fact_api_url)
                .then(Response => {
                    if (!Response.ok) {
                        throw new Error("Faild to fetch RandomFactsAboutCatApi")
                    }
                    return Response.json()

                        .then(data => {
                            this.randomfact = data.fact
                        })
                })
            fetch(api_url)
                .then(Response => {
                    if (!Response.ok) {
                        console.log("not able to fetch data")
                    }
                    return Response.json()

                        .then(data => {
                            this.imagesrc = `${data.urls.regular}&w=214&h=326`;
                            this.username = data.user.username
                            this.username_url = `https://unsplash.com/@${this.username_url + this.username}`
                        })
                })
        }

    },
    mounted() {
        this.next_cat_fact()
    }
}).mount("#app")