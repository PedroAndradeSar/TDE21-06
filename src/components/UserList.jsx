import { useCallback, useEffect, useState } from 'react';
import './UserList.css';
import axios from "axios";


const UserList = () => {

    const [loading, setLoading] = useState(false);
    const [userBd, setUserBd] = useState()
    const buscaDados = useCallback(async () => {

        try {
            setLoading(true);

            const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos');

            setUserBd(data);
            
        } 
        catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }

    }, [])

    useEffect(() => {
        buscaDados()
    }, [])

    const renderUserBd = () => {
        if (loading || !userBd?.length) {
            return (
                <h3>Carregando</h3>
            )
        }
        return (
            <div>
                <h3>Dados do Usuario</h3>

                {userBd.map(user => {
                    return(
                    <div>
                        <h5>{user.userId}</h5>
                        <h5>{user.id}</h5>
                        <h5>{user.title}</h5>
                        <h5>{user.completed.toString()}</h5>
                    </div>
                    )
                })}

            </div>
        )
    }

    return (   
    
        <div className="user-list">
            <h1>Lista</h1>

            {renderUserBd()}
        
        </div>

    )
}

export default UserList;