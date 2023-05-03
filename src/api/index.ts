import axios from "axios";

const DATA_GOV_SG_API = "https://api.data.gov.sg/v1/";


export const getApiRequest = async (path: string): Promise<any> => {
  return await axios({
      method:'get',
      url: DATA_GOV_SG_API.concat(path)
    }).then((response) => {
      return response
    })
    .catch(error => {
      console.error(error)
       return (error.response);
    });
};

