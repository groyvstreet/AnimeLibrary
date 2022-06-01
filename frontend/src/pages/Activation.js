import {useEffect, useState} from "react";
import UsersService from "../API/UsersService";
import {useParams} from "react-router-dom";

function Activation() {
    const params = useParams()
    const [isActivated, setIsActivated] = useState(false)

    useEffect(() => {
        UsersService.activate(params.uid, params.token)
            .then((response) => {
                if (response.status !== 400) {
                    setIsActivated(true)
                }
            })
    }, [])

    return (
        <div className="text-center">
            {isActivated ? 'Вы зарегистрированы!' : 'Что-то пошло не так.'}
        </div>
    )
}

export default Activation
