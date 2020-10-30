# twits
The api that drives the [twittee](https://twittee.netlify.app/login) app. To be able to consume this api , please go through the [documentation](https://twitees.herokuapp.com)

The api built with node is distributed on the different cores of the heroku server which additional distributes an the app on sereval server. With this the never never shuts down. This is thanks to PM2 which also helps load balance the request as they become large over a particular period of time. 

The Api was documented using [swagger](https://swagger.io/)

The api runs on the postgres server datastore


