import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"

import { getAllIceCreamsThunk, deleteIceCreamThunk } from "../../store/icecream"

import AddIceCreamModal from '../ModalAdd';
import EditIceCreamModal from '../ModalEdit';

import "./homepage.css"

const HomePage = () => {

    const dispatch = useDispatch()

    const [editButton, setEditButton] = useState(false)

    const sessionUser = useSelector(state => state.session.user);
    const iceCreamArray = useSelector(state => Object.values(state.iceCream).reverse())

    const deleteIceCream = (id) => {
        dispatch(deleteIceCreamThunk(id));

    }


    useEffect(() => {
        dispatch(getAllIceCreamsThunk())
    }, [dispatch])


    return (
        <>
            <h1>IceCreams</h1>
            <AddIceCreamModal />
            <div>
                {iceCreamArray.length > 0 && iceCreamArray.map(iceCream => (
                    <div className="iceCream-div">
                        <NavLink to={`/iceCream/${iceCream.id}`}>
                            <img src={iceCream.icecream_pic_url} className="iceCream-pic" />
                            <li>{iceCream.flavor_name}</li>
                        </NavLink>
                        {iceCream.user_id == sessionUser.id &&
                            <div>
                                <EditIceCreamModal iceCream={iceCream} />
                                <button onClick={() => deleteIceCream(iceCream.id)}>Delete IceCream</button>
                            </div>
                        }
                    </div>
                ))}
            </div>
        </>
    )
}

export default HomePage
