
const api = {
    endpoint: 'http://127.0.0.1:3000/',

    set_token: function(token){
        localStorage.setItem('token', token);
    },

    get_token: function(){
        return localStorage.getItem('token');
    },

    remove_token: function(){
        localStorage.removeItem("token");
    },

    get: async function(uri, obj = {}){

        // Pasamos a query : String
            const query = 
                Object.keys(obj)
                .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]) )
                .join('&');
        
        // Preparamos el endpoint
            const url = this.endpoint+uri+"?"+query;

        // Hacemos la petición
            const response = await fetch(url, {
                method: 'GET',
                headers : {
                    'Content-Type': 'application/json',
                    'token': this.get_token()
                },
                redirect: 'follow'
            });

        return response.json();

    },

    post: async function(uri, obj = {}, method="POST"){

        // Preparamos el endpoint
            const url = this.endpoint + uri;

        // Hacemos la petición
            const response = await fetch(url, {
                method: method,
                headers : {
                    'Content-Type': 'application/json',
                    'token': this.get_token()
                },
                redirect: 'follow',
                body: JSON.stringify(obj)
            });

            console.log(obj);

        return response.json();

    },

    put: async function(uri, obj = {}){

        return this.post(uri, obj, "PUT");

    },

    del: async function(uri, obj = {}){

        return this.post(uri, obj, "DELETE");

    },

};

export default api;