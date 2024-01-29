import axios from "axios";

const getAndrei = async () => {
  const response = await axios.get('https://api.github.com/users/alisnic')
  return response.data
};

const Andrei = await getAndrei();

export default Andrei;
