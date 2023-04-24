import axios from "axios";

const DATA_GOV_SG_API = "https://api.data.gov.sg/v1/";


export const getApiRequest = (path: string) => {

  return new Promise((resolve, reject) => {
    return axios({
      method:'get',
      url: DATA_GOV_SG_API.concat(path)
    }).then((response: any) => {
      resolve(response);
    })
    .catch((error: { response: any; }) => {
      console.error(error)
      reject(error.response);
    });
  });
};
