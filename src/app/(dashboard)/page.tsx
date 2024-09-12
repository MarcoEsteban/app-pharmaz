import { auth } from '@/auth.config';
import { Card } from '@/components';
import { redirect } from 'next/navigation';

export default async function Home() {

  const session = await auth();

  if ( !session?.user ) {
    // redirect( '/auth/login?returnTo=/perfil' );
    redirect( "/" );
  }

  console.log({session})

  return (
    <div>

      <pre>
        {
          JSON.stringify( session.user, null, 2 )
        }
      </pre>

      <Card>
        Home
      </Card>

    </div>
  );
}
