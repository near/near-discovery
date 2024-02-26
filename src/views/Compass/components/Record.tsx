import styled from 'styled-components';

const Record = styled.div`
    height: 157px;
    color: var(--main-color);
    text-align: center;
    flex: 1;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    backdrop-filter: blur(2px);
    background: linear-gradient(180deg, rgba(33, 35, 42, 0.9) 0%, rgba(33, 35, 42, 0.459) 100%);

    /* &::after {
        position: absolute;
        content: ' ';
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        border-radius: 20px;
        /* filter: blur(1px); */
    } */
`

const RecordTitle = styled.div`
    font-size: 18px;
    font-weight: 400;
    line-height: 22px;
    position: relative;
    z-index: 1;
`

const RecordContent = styled.div`
    font-size: 30px;
    font-weight: 700;
    line-height: 45px;
    margin-top: 10px;
    position: relative;
    z-index: 1;
`

export default function RecordBox({ title, renderContent }: {
    title: string;
    renderContent: () => JSX.Element;
}) {
    return <Record>
        <RecordTitle>{title}</RecordTitle>
        <RecordContent>{renderContent()}</RecordContent>
    </Record>
}