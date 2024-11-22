'use client';
import React, {useEffect, useState} from 'react';

//REMOVE API CALL AFTER
interface User {
  user_id: number;
  name: string;
  username: string;
  password: string;
}

export default function Transaction() {

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Fetch data from the Node.js API when the component mounts
    const fetchUsers = async () => {
      const res = await fetch('http://localhost:5000/getUsernamePassword');
      const data = await res.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);


    return (
      <> 
          <h1>This is the transaction page</h1>
          {users.map((user, index) => {
            console.log(user)
            return(
              <h1 key={index}>{user.username}</h1>
            )
          })}
      </>
    );
  }