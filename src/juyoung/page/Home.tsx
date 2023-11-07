import { Link } from 'react-router-dom';
import exampleData from '../../juyoung/constants/example.json';

const Home = () => {
  return (
    <div>
      <h1> 상점 둘러보기</h1>
      <ul>
        {exampleData.map(({ listId, title }) => (
          <li key={listId}>
            <Link to={`/store/${listId}`}>{title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
