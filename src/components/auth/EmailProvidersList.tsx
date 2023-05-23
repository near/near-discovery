import React from 'react'
import styled from 'styled-components'

const EMAIL_PRODVIDERS = ['gmail', 'yahoo', 'outlook']

interface EmailProvidersListProps {
    handleSelect: (provider: string) => void
    value: string
}


const EmailProvidersList = ({ handleSelect, value }: EmailProvidersListProps) => {
    return (
        <EmailProvidersListContainer>
            {EMAIL_PRODVIDERS.map((provider) => {
                return <EmailProvidersListItem
                    className='item'
                    key={provider}
                    onClick={() => handleSelect(provider)}
                    isSelected={!!value?.includes(provider)}
                >
                    {`@${provider}`}
                </EmailProvidersListItem>
            })}
        </EmailProvidersListContainer>
    )
}

export default EmailProvidersList


const EmailProvidersListContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`

const EmailProvidersListItem = styled.div`
  border: ${({ isSelected }: { isSelected: boolean }) => isSelected ? '1px solid #928BE4' : '1px solid #e5e5e5'};
  border-radius: 50px;
  padding: 5px 8px;
  cursor: pointer;
  background-color: ${({ isSelected }: { isSelected: boolean }) => isSelected ? '#E3E1F9' : 'transparent'};
`;