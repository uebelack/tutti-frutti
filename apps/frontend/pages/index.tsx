import { Button } from 'UI';
import SplashScreenLayout from '../components/layout/SplashScreenLayout/SplashScreenLayout';

// const QUERY = gql`
//   query {
//     app {
//       serverTime
//     }
//   }
// `;

const Home = () => (
  // const { data } = useQuery(QUERY);

  <div className="w-3/4 md:w-1/2 max-w-[350px] mx-auto flex flex-col gap-16">
    {/* <h1>Hello {user.name}!</h1>
      <Image src={user.picture} alt={user.name} width={100} height={100} />
      <Categories />
      <Leaderboard />
      <LogoutButton />
      <p>2022 copyright T² - {data?.app?.serverTime}</p> */}
    <Button
      color="white"
      className="text-title-lg hover:!bg-white hover:!bg-opacity-80"
    >
      Quick Play
    </Button>
    <Button
      color="white"
      className="text-title-lg hover:!bg-white hover:!bg-opacity-80"
    >
      Multiplayer
    </Button>
    <Button
      color="white"
      className="text-title-lg hover:!bg-white hover:!bg-opacity-80"
    >
      Tutorial
    </Button>
  </div>
);
Home.Layout = SplashScreenLayout;

export default Home;
