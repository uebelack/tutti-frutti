import Link from 'next/link';

import LogoutButton from '../components/LogoutButton';
import Profile from '../components/Profile';

function Index() {
  return (
    <div>
      <Profile/>
      <LogoutButton />
      <h1 className="text-3xl">Tutti Frutti</h1>
      <Link href="/game">Quick play</Link>
    </div>
  );
}

export default Index;
