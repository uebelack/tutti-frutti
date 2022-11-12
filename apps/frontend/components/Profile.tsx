import { useAuth0 } from '@auth0/auth0-react';
import Image from 'next/image';

function Profile() {
  const { user } = useAuth0();

  return (
    <div className="flex">
      <Image src={user.picture} alt={user.name} width={50} height={50}/>
      <div>{user.name}</div>
    </div>
  );
}

export default Profile;
