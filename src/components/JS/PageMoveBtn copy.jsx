import {Link, useNavigate} from "react-router-dom";

const PageMoveBtn = () => {
    const navigate = useNavigate()

    const handleClickEvent = () => {
        navigate('/myname');
    }
    return (
        <button onClick={handleClickEvent}>페이지 이동</button>
    )
}

export default PageMoveBtn