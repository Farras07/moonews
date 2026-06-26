import Usercard from '@/components/Usercard';
import { User } from '@/types';
import Layout from '@/components/Layout';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function UserDetails({ params }: PageProps){
    const { id } = await params; 
    const res = await fetch(`https://jsonplaceholder.typicode.com/users?id=${id}`)
    const data: User[] = await res.json()
    const user = data[0]

    return (
        <Layout>
            <Usercard
                data={user}
                mode='detail'
            />
        </Layout>
    )

}