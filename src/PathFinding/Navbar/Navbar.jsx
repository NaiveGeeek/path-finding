import React, { useRef } from "react";
import styled from "styled-components";
import logo from "../../assets/images/logo1.svg";
import { ASTAR, DIJIKSTRA } from "../Utils/constant";

const Nav = styled.nav`
  background-color: transparent;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  // z-index:0;
`;

const Image = styled.img`
  padding: 10px;
  height: 30px;
  weight: 30px;
  transition: transform 300ms;
  cursor: pointer;
  margin-left: 20px;
  &:hover {
    transform: scale(1.5);
  }
`;

const Text = styled.h1`
  font-size: 20px;
  font-weight: 700;
  font-family: "Pacifico", cursive;
  text-align: center;
  letter-spacing: 1px;
  margin: 0px;
  padding: 10px;
  transition: transform 300ms;
  margin-right:auto;
  cursor: text;
  &:hover {
    transform: scale(1.2);
  }
`;
const DropDown = styled.div`
  position: relative;
  margin-left: auto;
`;
const Button = styled.div`
  color: black;
  border-radius: 5px;
  padding: 5px;
  width: 120px;
  height: 30px;
  font-size: 14px;
  font-weight: 700;
  font-family: "Pacifico", cursive;
  position: relative;
  background: transparent;
  margin-right: 20px;
  overflow: hidden;
  border: solid 1px black;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: color 300ms;
  cursor: pointer;
  letter-spacing: 1px;
  &:after {
    content: "";
    position: absolute;
    left: -140px;
    top: 0px;
    width: 100%;
    height: 100%;
    background-color: black;
    transition: transform 300ms;
    z-index: -1;
  }
  &:hover {
    color: white;
    border: solid 1px white;
  }
  &:hover:after {
    transform: translateX(140px);
  }
`;

const DropdownContetnt = styled.div`
  position: absolute;
  bottom: 0;
  top: 43px;
  width: 100%;
  background-color: #f1f1f1;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  height: fit-content;
  border-radius: 5px;
  display: none;
`;

const SelectButton = styled.div`
  padding: 2px 10px;
  height: 40px;
  display: flex;
  align-items: center;
  font-family: "Pacifico", cursive;
  letter-spacing: 1px;
  &:hover {
    background: #ddd;
    cursor: pointer;
  }
`;

const NavBar = ({ changeAlgorithm, clearPath, clearBoard, visualizeAlgo }) => {
  const dropdownContetntRef = useRef(null);

  const mouseMoveIn = () => {
    dropdownContetntRef.current.style.display = "block";
  };
  const mouseMoveOut = () => {
    dropdownContetntRef.current.style.display = "none";
  };
 

  return (
    <>
      <Nav>
        <Image src={logo} alt="logo" />
        <Text>Visualize Graph</Text>
        <Button onClick={visualizeAlgo}>Visualize</Button>
        <DropDown onMouseEnter={mouseMoveIn} onMouseLeave={mouseMoveOut}>
          <Button>Select Algorithm</Button>
          <DropdownContetnt ref={dropdownContetntRef}>
            <SelectButton onClick={()=>{changeAlgorithm(ASTAR)}}>A*</SelectButton>
            <SelectButton onClick={()=>changeAlgorithm(DIJIKSTRA)} >Dijikstra</SelectButton>
          </DropdownContetnt>
        </DropDown>
        <Button onClick={clearPath}>Clear Path</Button>
        <Button onClick={clearBoard} >Clear Grid</Button>
      </Nav>
    </>
  );
};

export default NavBar;
