import axios from 'axios';

const api = (store) => (next) => (action) => {
  switch (action.type) {
    case 'LOGIN': {
      const { auth: { email, password } } = store.getState();

      const config = {
        method: 'post', // verbe POST
        url: 'https://api-happy-news.herokuapp.com/login', // endpoint de login
        headers: { // header pour dire qu'on parle en JSON
          'Content-Type': 'application/json',
      //   'Cookie': 'connect.sid=s%3AfhPHxE7GncGThwzNKUSGwQZV9Js-dsLN.7YjWIJyga9CxT9ftGBwlOi3BNUMQdixv1%2F3GSNYHq7M'
        },
        data:
          { // body de la requete (contenu du json)
            email,
            password,
          },
      };
      axios(config) // on lance la requete...
        .then((response) => { // cas de réussite
        // on envoie une action, pour sauvegarder les données dans le reducer
        // cette action ne sera pas traitée dans le middleware, et ira jusqu'au reducer
          const { userToken } = response.data;
          localStorage.setItem('token', userToken);
          store.dispatch({
            type: 'LOGIN_SUCCESS',
            // on déverse tout le contenu de response.data dans notre action
            ...response.data,
          });
          console.log('Je suis dans la réponse, et response.data du Tokenvaut : ', response.data.userToken);
          console.log('Je suis dans la réponse, et response.data du first_name : ', response.data.user[0].first_name);
          console.log('Je suis dans la réponse, et response.data du first_name : ', response.data.logged);
        })
        .catch((error) => { // cas d'erreur
          console.log(error);
        });
      break;
    }
    default:
      next(action);
  }
};

export default api;