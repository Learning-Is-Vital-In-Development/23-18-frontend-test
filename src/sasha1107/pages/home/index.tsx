import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const storeId = 'a382f0b9';

  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => navigate(`/store/${storeId}`)}>가게로 이동</button>
    </div>
  );
};
export default Home;
