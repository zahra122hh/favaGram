

interface PostList {
  userId: number;
  id: string;
  title:string;
  body: string;

}

interface UsersList {
  name: string;
  id: string;
  username : string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: number;
  };
  phone: number;
  website: string;
  company: {
    name: string;
    bs: string;
  }

}

//all data ha ra az api fetch mikonad
async function  getAllData (): Promise<PostList[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data : PostList[] = await response.json();

  if (!response.ok) {
    throw new Error('Failed to fetch data')
    console.log(response)
  }


  return data;



}

export default getAllData;


export async function getAllUsers(): Promise<UsersList[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const users: UsersList[] = await response.json();

  if (!response.ok) {
    throw new Error('Failed to fetch users')
  }

  return users;

}


export async function getUserById(userId: string) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${userId}`);

  if (!response.ok) {
    console.error('Error fetching user:', response.status);

    return null;
  }

  const data = await response.json();

  return data;
}


export async function getDetailById(userId: string) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);

  if (!response.ok) {
    console.error('Error fetching user:', response.status);

    return null;
  }

  const data = await response.json();

  return data;
}



export  async function deletePost(id: string) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    console.error('Error deleting post:', response.status);

    return;
  }

  console.log('Post deleted successfully:', id);
}



export async function deleteUser(id: string) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    console.error('Error deleting post:', response.status);

    return;
  }

  console.log('Post deleted successfully:', id);
}




export  async function connectToDb() {
  try {
    const response = await fetch('http://178.131.81.39:8080/api/auth/login///', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error fetching users:');
    }

    const data = await response.json();

    return data;
  } catch (error) {

    console.error('Error fetching users:', error);

    return [];
  }
}



