import axios from "axios";

export const getQuestions = async (difficulty) => {
  try {
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=15&category=9&difficulty=${difficulty}&type=multiple&encode=url3986`
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export default getQuestions;
