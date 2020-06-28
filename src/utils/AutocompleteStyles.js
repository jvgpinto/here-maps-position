import styled from "styled-components";
export const AutocompleteContainer = styled.div`
    position:absolute;
    top:15px;
    left:50%;
    transform:translateX(-50%);
    z-index:1;
`;
export const ListWithoutStyle = styled.ul`
    list-style:none;
    background: rgba(255, 255, 255, 0.8);
`;
export const ItemList = styled.li`
    text-indent:10px;
    padding:2px;
    font-size:15px;
    line-height:24px;
    min-height:24px;
    width:350px;

    &:hover{
        background:#f0f0f0;
    }
    &.suggestion-active{
        background:#f0f0f0;
    }


`;
export const InputAutocomplete = styled.input`
    height:30px;
    border: solid 1px lightgray;
    border-radius:5px 5px 5px 5px;
    min-width:350px;
    text-indent:35px;
    font-size:15px;
    padding: 5px 5px 5px 0px;

`;
export const SpanAutocomplete = styled.span`
    position: absolute;
    top: 5px;
    left: 10px;

`;