import React from "react";
import './Login.css';
import Api from '../Api';
import $ from 'jquery';

export default({onReceive}) => {
    $(window).on('load', function() {
        /*------------------
            Preloder
        --------------------*/
        $(".loader").fadeOut();
        $("#preloder").delay(400).fadeOut("slow");

    });
    const handleFacebookLogin = async  () => {
        let result = await Api.fbPopup();
        if(result){
            onReceive(result.user);
        }else{
            alert("Erro!")
        }
    }
    const handleGithubLogin = async  () => {
        let result = await Api.gitPopup();
        if(result){
            onReceive(result.user);
        }else{
            alert("Erro!")
        }
    }
    const handleGoogleLogin = async  () => {
        let result = await Api.googlePopup();
        if(result){
            onReceive(result.user);
        }else{
            alert("Erro!")
        }
    }
    const handletwitterLogin = async  () => {
        let result = await Api.twitterPopup();
        if(result){
            onReceive(result.user);
        }else{
            alert("Erro!")
        }
    }
    const handleyahooLogin = async  () => {
        let result = await Api.YahooLogin();
        if(result){
            onReceive(result.user);
        }else{
            alert("Erro!")
        }
    }

    return (
<div className="Geral">
    <div id="preloder">
		<div className="loader"></div>
	</div>
    <div className="icon">
            <a 
                onClick={handleFacebookLogin}
                style={{cursor: "pointer"}}
                className="fab fa-facebook"
            >
            </a>
            <a 
                onClick={handleGithubLogin}
                style={{cursor: "pointer"}}
                className="fab fa-github"
            >
            </a>
            <a 
                onClick={handleGoogleLogin}
                style={{cursor: "pointer"}}
                className="fab fa-google"
            >
            </a>
            <a 
                onClick={handletwitterLogin}
                style={{cursor: "pointer"}}
                className="fab fa-twitter"
            >
            </a>

            <a 
                onClick={handleyahooLogin}
                style={{cursor: "pointer"}}
                className="fab fa-yahoo"
            >
            </a>
    </div>
</div>
)}
