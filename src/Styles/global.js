import {createGlobalStyle} from "styled-components";


export const GobalStyles = createGlobalStyle`


*{
    box-sizing: border-box;
}

body{
    margin: 0;
    padding: 0;
    background: ${({theme}) => theme.background};
    color: ${({theme}) => theme.textcolor};
    transition: all 0.25s linear;
}

.canvas{
    display: grid;
    min-height: 100vh;
    grid-auto-flow: row;
    grid-template-row: auto 1fr auto;
    gap: 0.5rem;
    padding: 2rem;
    width: 100vw;
    align-items: center;
    text-align: center;
}

.type-box{
    display: block;
    max-width: 1000px;
    heigth: 140px;
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
}

.words-wrapper{
    font-size: 32px;
    display: flex;
    flex-wrap: wrap;
}

.word{
    margin: 5px;
    padding-right: 2px;
    color: ${({theme}) => theme.typeBoxText};
}

.hidden-input{
    opacity: 0;
}

.current{
    border-left: 1px solid white;
    animation: blinking 2s infinite;
    animation-timing-function: ease;

    @keyframes blinking{
        0%{border-left-color: white}
        25%{border-left-color: black}
        50%{border-left-color: red}
        75%{border-left-color: black}
        100%{border-left-color: green}
    }
}

.current-right{
    border-right: 1px solid white;
    animation: blinkingRight 2s infinite;
    animation-timing-function: ease;

    @keyframes blinkingRight{
        0%{border-right-color: white}
        25%{border-right-color: black}
        50%{border-right-color: red}
        75%{border-right-color: black}
        100%{border-right-color: green}
    }
}

.correct{
    color: ${({theme}) => theme.textcolor};
}

.incorrect{
    color: red;
}

.upper-menu{
    display: flex;
    justify-content: space-between;
    width: 1000px;
    margin-left: auto;
    margin-right: auto;
    font-size: 1.35rem;
    padding: 0.5rem
}

.test-modes{
    display: flex;
    gap: 0.5rem
}

.modes:hover{
    color: green;
    cursor: pointer;
}

.counter{
    color: green;
}

.counter-red{
    color: red;
}

.footer{
    display: flex;
    justify-content: space-between;
    width: 1000px;
    margin-left: auto;
    margin-right: auto;
}

.stats-box{
    display: flex;
    width: 1000px;
    heigth: auto;
    margin-left: auto;
    margin-right: auto;
}

.stats-left{
    width: 30%;
    padding: 30px;
}

.stats-right{
    width: 70%;
}

.title{
    font-size: 20px;
    color: ${({theme}) => theme.typeBoxText};
}

.sub-title{
    font-size: 30px;
}

.header{
    display: flex;
    justify-content: space-between;
    width: 1000px;
    margin-left: auto;
    margin-right: auto;
}

.logo{
    display: flex;
    align-items: center;
}

.logo > img{
    width: 70px;
    heigth: 70px;
    margin-right: 20px;
    background: ${({theme}) => theme.background};
}

.logo > span{
    margin-right: 20px;
    font-size: 35px;
    color: ${({theme}) => theme.textcolor};
}

#Lh{
    font-size: 80px;
}

.link > a{
    margin-right: 10px;
    text-decoration: none;
}

.google-facebook-github-logos{
    margin-left: 20px
    display: flex;
    justify-content: center;
}

.signup-logo{
    width: 25px;
    heigth: 25px;
    margin-top: 12px;
    margin-right: 50px;
    margin-left: 50px;
}

#box-icons{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

#box-icons > span{
    margin-right: auto;
    margin-left: auto;
}

.user-profile{
    width: 1200px;
    margin: auto;
    display: flex;
    min-height: 12rem;
    background: ${({theme})=>theme.typeBoxText};
    border-radius: 20px;
    justify-content: center;
    align-text: center;
    margin-bottom: 10px;
}

.user{
    width: 50%;
    display: flex;
    margin-top: 30px;
    margin-bottom: 30px;
    font-size: 1.5rem;
    padding: 1rem;
    border-right: 2px solid;
}

.info{
    width: 60%;
    padding: 1rem;
    margin-top: 1rem;
}
.picture{
    width: 40%;
}

.total-tests{
    width: 50%;
    font-size: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.table, .graph-user-page{
    margin: auto;
    width: 1200px;
}

.center-os{
  display: flex;
  min-heigth: 100vh;
  justify-content: center;
  align-items: center;
}

#user-pagelogo{
    margin-right: 1300px;
}

#user-pagelogo{
    font-size: 50px;
}


`