import axios from "axios";

const URL = BACKEND_URI + "/math";

export const getLatex = async () => {
  try {
    const response = await axios.get(URL + "/get-latex");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error during request setup");
  }
};
