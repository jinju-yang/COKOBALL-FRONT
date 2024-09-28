import styled from "styled-components";
import InputBox from "./InputBox";
import PlusBtn from "../Button/PlusBtn";
import MinusBtn from "../Button/MinusBtn";
import { useEffect, useState } from "react";

const Div = styled.div`
    display: flex;
    flex-direction: column;
    width: fit-content;
`;

const RowDiv = styled.div`
    display: flex;
    &.MinusInputBoxDiv{
        gap: 10px;
    }
`;

const ColDiv = styled.div`
    display: flex;
    flex-direction: column;
    &.InputBoxDiv{
        align-items: center;
        gap: 10px;
    }
`;

const P = styled.p`
    font-family: 'GamjaFlower-Regular';
    margin: 0;
    margin-bottom: 5px;
`;

function MinusInputBox({id, onDelete}){
    return (
        <RowDiv className="MinusInputBoxDiv">
            <InputBox/>
            <div onClick={() => onDelete(id)}><MinusBtn/></div>
        </RowDiv>
    );
}

function WhoAmIInputBox({text = "기쁠 떄 어떤 행동을 하시나요?"}){
    const [components, setComponents] = useState([{id: Date.now()}]);

    // 플러스 버튼을 눌렀을 때 컴포넌트를 추가하는 함수
    const handleAddComponent = () => {
      setComponents((prevComponents) => [
        ...prevComponents,
          { id: Date.now() }, // 고유한 ID를 부여 (Date.now() 사용)
      ]);
    };

    // 특정 컴포넌트를 삭제하는 함수
    const handleDeleteComponent = (id) => {
        if(components.length > 1){
            setComponents((prevComponents) =>
                prevComponents.filter((component) => component.id !== id)
            );
        }
    };

    return(
        <Div>
            <P>⚑ {text}</P>
            <RowDiv>
                <ColDiv className="InputBoxDiv">
                    {components.map((component) => {
                        return <MinusInputBox
                            key={component.id}
                            id={component.id}
                            onDelete={handleDeleteComponent}
                        />
                    })}
                    <div onClick={handleAddComponent} style={{marginRight:"50px"}}><PlusBtn/></div>
                </ColDiv>
            </RowDiv>
        </Div>
    )
}

export default WhoAmIInputBox;