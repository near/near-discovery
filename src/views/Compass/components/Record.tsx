import styled from 'styled-components';

const Record = styled.div`
    height: 157px;
    background: linear-gradient(180deg, rgba(33, 35, 42, 0.9) 0%, rgba(33, 35, 42, 0.459) 100%);
    color: var(--main-color);
    text-align: center;
    flex: 1;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const RecordTitle = styled.div`
    font-size: 18px;
    font-weight: 400;
    line-height: 22px;
`

const RecordContent = styled.div`
    font-size: 30px;
    font-weight: 700;
    line-height: 45px;
    margin-top: 10px;
`

export default function RecordBox({ title, renderContent } : {
    title: string;
    renderContent: () => JSX.Element;
}) {
    return <Record>
    <RecordTitle>{ title }</RecordTitle>
    <RecordContent>{ renderContent() }</RecordContent>
</Record>
}