"use client";
import Link from 'next/link'
import Hamburger from './Hamburger';
import './Nav.css'
import { Montserrat } from "next/font/google";
import React, {useState, useEffect, useRef} from 'react';
import { getJwtToken} from "../auth"

const montserrat = Montserrat({subsets: ["latin"], weight:['200', '400', '500','600', '700']});


interface BoxProps{
    place: number;
    color: string;
}

export default function Nav(props: BoxProps){

    const [LinksClass, setLinksClass] = useState("")
    const [LoggedIn, setLoggedIn] = useState(false)
    const jwtToken = getJwtToken();

    const toggleit = () =>{
        if (LinksClass === ""){
            setLinksClass   ("On")
        } 
        else{
            setLinksClass("")
        }
    }

    if(!jwtToken) setLoggedIn(false)
    else setLoggedIn(true)

    
    return(
        <div className={['Nav', montserrat.className, props.color].join(' ')}>
            <div className='Logo'>
                <a href="/">TJ Assistive Technology</a>
                <span onClick={toggleit} className="navbar-toggle" id="js-navbar-toggle">
                   <Hamburger /> 
                </span>
            </div>
            <div className={['Navlinks', LinksClass].join(' ')}>
                <Link href="/about_us" style={props.place===0 ? { borderBottom: "5px solid #453F78"} : {}}>About Us</Link>
                <Link href="/games" style={props.place===1 ? {borderBottom: "5px solid #453F78"} : {}}>Games</Link>
                <Link href="/books" style={props.place===2 ? { borderBottom: "5px solid #453F78"} : {}}>Books</Link>
            </div>

            <div className={['Navlinks', LinksClass].join(' ')}>
                {!LoggedIn ? <Link href="/user/signup" style={props.place===3 ? { borderBottom: "5px solid #453F78"} : {}}>Sign Up</Link> : <></>}
                {!LoggedIn ? <Link href="/user/login" style={props.place===4 ? {borderBottom: "5px solid #453F78"} : {}}>Login</Link>: <></>}
                {LoggedIn ? <Link href="/projects" style={props.place===5 ? { borderBottom: "5px solid #453F78"} : {}}>Logout</Link> : <></>}
            </div>
        </div>
    )
    
}