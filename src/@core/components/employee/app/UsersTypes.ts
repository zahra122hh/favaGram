export interface Users {
  id: number;
  name: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: number;
  }
  geo: {
    lat: number;
    lng: number;
  }
  phone: number;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  }
}


export interface UserDetailsProps {
  users: Users[]
}