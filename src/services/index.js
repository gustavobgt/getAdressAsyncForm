import axios from 'axios';

export const getAdress = async (cep) => {
  return await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
};
