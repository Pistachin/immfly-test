const axios = require("axios");

const getList = () => {
  return axios
    .get("https://pokeapi.co/api/v2/generation/1/")
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log({ err }));
};

export default getList;
