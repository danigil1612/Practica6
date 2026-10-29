import { useState, useEffect } from 'react';
import './App.css';


function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    console.log('1. UseEffect executat');

    async function getUsers() {
      console.log('2. Comencem la petició');
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users'
        );
        console.log('4. Resposta del servidor', response);
        if (!response.ok) {
          throw new Error("Error carregant usuaris.");         
        }
        const data = await response.json();
        console.log('5. Usuaris rebuts:', data);
        setUsers(data);
        console.log('6. SetUsers executat');
      } catch (err) {
          console.error('Error:',err);
          setError(err.message);
      } finally {
          setLoading(false);
      }
    };
    getUsers();
    console.log('3. Javascript continua executant-se');
  },[]);

  const cities = [...new Set(users.map(user => user.address.city))].sort();
  const filteredUsers = selectedCity
    ? users.filter(user => user.address.city === selectedCity)
    : users;

  return (
    <div>
        <h1>Llistat d'Usuaris</h1>
        { loading && <p>Carregant usuaris...</p>}

        { error && (
            <p className='error'>{ error }</p>
        )}
        
        { !loading && !error && (
          <>
            <label htmlFor="city-filter">Filtra per ciutat: </label>
            <select
              id="city-filter"
              value={selectedCity}
              onChange={event => setSelectedCity(event.target.value)}
            >
              <option value="">Totes les ciutats</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>

            <div className="users">
              {filteredUsers.map(user => (
                <div className='user-card' key={user.id}>
                  <h2>{user.name}</h2>
                  <p>
                    <strong>Username: </strong> {user.username}
                  </p>
                  <p>
                    <strong>Mail: </strong> {user.email}
                  </p>
                  <p>
                    <strong>Telèfon:</strong> {user.phone}
                  </p>
                  <p>
                    <strong>Ciutat:</strong> {user.address.city}
                  </p>
                  <p>
                    <strong>Empresa:</strong> {user.company.name}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
    </div>
  )
}

export default App

