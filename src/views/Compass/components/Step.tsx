import styled from 'styled-components';

const StepWapper = styled.div`
    display: flex;
    justify-content: center;
    padding: 45px 0;
`

const StepItem = styled.div`
    width: 159px;
    height: 10px;
    border-radius: 20px;
    background: rgba(33, 35, 42, 0.90);
    margin: 0 5px;
    &.selected {
        border-radius: 20px;
        background: #3C4156;
    }
`

export default function Step({
    count = 3,
    step = 1
}: {
    count: number;
    step: number;
}) {
    const sumAry = Array.from({ length: count })

    return <StepWapper>
        {
            sumAry.map((item, index) => {
                return <StepItem key={index} className={index + 1 === step ? 'selected' : ''} />

            })
        }
    </StepWapper>
}