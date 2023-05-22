import { useNavigate } from "react-router-dom";
export const Apple = () => {
    const Navigate = useNavigate()
    const onHomePageButtonClick = () =>{
        Navigate("/");
    };
    return (
    <div>
    <div>Apple Page</div>
    <button onClick={ onHomePageButtonClick}>Navigate to Home Page</button>
    </div>
    );
}; 
