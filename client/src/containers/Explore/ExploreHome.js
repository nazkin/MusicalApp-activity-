import React, {useState, useEffect } from 'react';
import './ExploreHome.css';
import {Link, useHistory} from 'react-router-dom';
import Artists from '../../components/Trending/Artists/Artists';
import Songs from '../../components/Trending/Songs/Songs';
import axios from 'axios';
/**
* @author
* @function ExploreHome
**/

const ExploreHome = (props) => {
    const [allAccounts, setAllAccounts] = useState([]);
    const [allUserInfo, setAllUserInfo] = useState([]);
    const [allSongs, setAllSongs] = useState([]);
    const [allPhotos, setAllPhotos] = useState([]);

    useEffect(()=> {
        axios.get('/api/explore/accounts')
            .then(res=> {
                const usersAccounts = res.data.accounts;
                setAllAccounts([...usersAccounts]);
                let songsArr = [];
                let photosArr = []
                usersAccounts.forEach(acc => {
                    songsArr = [...songsArr, ...acc.songs];
                    photosArr = [...photosArr, ...acc.images]
                })
                console.log(usersAccounts);
                setAllSongs([...songsArr]);
                setAllPhotos([...photosArr])
                console.log(photosArr);
                console.log(songsArr);

            })
            .catch(err=> console.log(err));
    }, []);
    useEffect(()=> {
        axios.get('/api/explore/users')
            .then(res=> {    
                const usersInfo = res.data.users;
                setAllUserInfo([...usersInfo]);
                console.log(usersInfo);
            })
            .catch(err=> console.log(err));
    }, []);
    let history = useHistory();
    const logoutUserHandler = ()=> {
        
        sessionStorage.clear();
        history.push('/');

    }
    
  return(
    <div className="container-flid explore-container-main px-5">
        <div className="navigation">
            <button onClick={logoutUserHandler} className="btn btn-danger btn-sm float-right mx-4">Logout</button>
            <Link className="navigation-link" to="/enter">Manage Account<img src="user.png" /> </Link>
        </div>
        <h1 className="my-5">Artists trending on Jukebox today</h1>
        <div className="row explore-row-main">
            <Artists accounts={allAccounts} userInfo={allUserInfo} photos={allPhotos} songs={allSongs}/>
            <Songs accounts={allAccounts} userInfo={allUserInfo} photos={allPhotos}  songs={allSongs}/>
        </div>

    </div>
   )

 }

export default ExploreHome;