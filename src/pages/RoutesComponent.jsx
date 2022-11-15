import { Link, Routes, Route, Outlet } from "react-router-dom";
import App from '../App';
import HomePage from "./Home";



export default function RoutesComponent(){
    return (<Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/play" element={<App/>}/>
        <Route path="/donate"/>
        <Route path="/email"/>
        <Route path="/tutorial"/>
    </Routes>
    )
}