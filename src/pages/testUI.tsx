import React, { useState } from 'react';
import styled from 'styled-components';

import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const TestUI: NextPageWithLayout = () => {

    const [isSelectItemClicked, setIsSelectItemClicked] = useState(false);
    const [selectedItem, setSelectedItem] = useState<number | null>(0);

    const handleSelectItemClick = () => {
        setIsSelectItemClicked(!isSelectItemClicked);
    };

    const handleItemClick = (index: number) => {
        setSelectedItem(index);
    };

    const TopContent = styled.div`
     display: flex;
     justify-content: space-between;
     width: 100%;
     .top-login{
        display: flex;
        .top-login-Source{
            align-items: center;
            background: rgba(45, 50, 71, 1);
            border-radius: 12px;
            padding: 10px 12px;
            display: flex;
            color: #fff;
            margin-right: 20px;
            font-size: 14px;
            img{
                margin-right: 4px;
            }
        }
        .top-login-select{
            margin-right: 16px;
            background: rgba(21, 22, 23, 1);
            border-radius: 12px;
            padding: 4px;
            display: flex;
            cursor: pointer;
            position: relative;
            .selsect-item-img{
                width: 32px;
                height: 32px;
                line-height: 32px;
                text-align: center;
                border-radius: 8px;
                margin-right: 8px;
            }
            .selsect-item-icon{
                margin-right: 12px;
                height: 32px;
                line-height: 32px;
            }
            .login-select-popup{
                position: absolute;
                top: 50px;
                left: -178px;
                background: rgba(45, 50, 71, 1);
                border-radius: 12px;
                padding: 12px;
                width: 249px;
                .select-popups-item{
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding:8px;
                    .flex-grow {
                        flex-grow: 1;
                    }
                    .popup-item-img{
                        width: 32px;
                        height: 32px;
                        line-height: 32px;
                        text-align: center;
                        border-radius: 8px;
                        margin-right: 8px;
                    }
                    .popups-item-text{
                        font-family: Noto Sans;
                        font-size: 14px;
                        font-weight: 400;
                        color: #fff;
                    }
                }
                .selected{
                    background: rgba(31, 35, 53, 0.5);
                    border-radius: 8px;
                }
            }
        }
        .top-login-button{
        font-family: Gantari;
        font-size: 16px;
        line-height: 19px;
        color: #fff;
        background: rgba(121, 79, 221, 1);
        padding: 10px 16px;
        border-radius: 16px;
     }
     }
    `
    const logoUrl = 'https://ipfs.near.social/ipfs/bafkreihjoszjyw5ebgi2uur7jbkykdowwixexlk5oy24y24mu2q3a45qkq'

    const narrowUrl = 'https://ipfs.near.social/ipfs/bafkreif6pnnesttu7pgeu2bbfw57qthonizx2fgiwc5gyduiexvnonfcju'

    const sourceIcon = 'https://ipfs.near.social/ipfs/bafkreihz27oqiw4djztfrsvmjnxcv7zfgiztdqzlkpo5jdejxpt2nybu54'

    const checkMark = 'https://ipfs.near.social/ipfs/bafkreibrxtpffmzoe46yg3qbt3pivpukf5ne4zra73g6blxofkpowlmupm'

    const popupsData = [
        {
            icon: 'https://ipfs.near.social/ipfs/bafkreib2xwrmfnnwcuvtuixlucdlrdwaltjthvc7uspsmjt4nfnlnes364',
            bgColor: '#353E63',
            text: 'Ethereum'
        },
        {
            icon: 'https://ipfs.near.social/ipfs/bafkreigqoy6czilxyuo3hkdfbayvwfxvf6qz67wiiom5laidqpb3f4eh2y',
            bgColor: '#284A6C',
            text: 'Arbitrum'
        },
        {
            icon: 'https://ipfs.near.social/ipfs/bafkreicu6zq3j22j5626ymafngaeqdzpo72w3nt2tgkebmbpoylc7y2bjy',
            bgColor: '#57392F',
            text: 'Optimism'
        },
        {
            icon: 'https://ipfs.near.social/ipfs/bafkreifdzdcxsmntauvxdejkewxoyqns3xbmsvgappnef3fcxxpbjfq5pq',
            bgColor: '#442D66',
            text: 'Polygon'
        },
        {
            icon: 'https://ipfs.near.social/ipfs/bafkreidnp2h5uuix552e2nh4ynbcxlgv4n4bvxiite7u3cles5f6dkacfm',
            bgColor: '#24376B',
            text: 'Base'
        },
        {
            icon: 'https://ipfs.near.social/ipfs/bafkreiah7oxcpgdrnmfgpzbozwgvivvr26cqwzlfy6yjpm5qtzjjc2tvvu',
            bgColor: '#554D42',
            text: 'BNB Chain'
        },
        {
            icon: 'https://ipfs.near.social/ipfs/bafkreibubtetd6ujh6elga2ahhcu6bp7pe4rywzitqt36ih2qee45sk7hu',
            bgColor: '#553748',
            text: 'Avalanche'
        },
        {
            icon: 'https://ipfs.near.social/ipfs/bafkreieredwbwk6u7coh3iarekx2p2zlvbkq6twkktrtfcb3l3r7j2du2e',
            bgColor: '#565B49',
            text: 'Celo'
        },
    ]

    return (
        <>
            <TopContent>
                <div className='top-logo'>
                    <img src={logoUrl} alt="" />
                </div>
                <div className='top-login'>
                    <div className='top-login-Source'>
                        <img src={sourceIcon} alt="" />
                        Source
                    </div>
                    <div className='top-login-select'>
                        <div className='selsect-item-img' style={{ backgroundColor: selectedItem !== null ? popupsData[selectedItem].bgColor : 'transparent' }}>
                            {selectedItem !== null && (
                                <img src={popupsData[selectedItem].icon} alt='' />
                            )}
                        </div>
                        <div className='selsect-item-icon' onClick={handleSelectItemClick}>
                            <img
                                style={{ transform: isSelectItemClicked ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                src={narrowUrl}
                                alt="" />
                        </div>
                        {isSelectItemClicked && (
                            <div className='login-select-popup'>
                                {popupsData.map((item, index) => (
                                    <div
                                        className={`select-popups-item ${selectedItem === index ? 'selected' : ''}`}
                                        key={index}
                                        onClick={() => handleItemClick(index)}
                                    >
                                        <div className='popup-item-img' style={{ backgroundColor: item.bgColor }}>
                                            <img src={item.icon} alt='' />
                                        </div>
                                        <div className='popups-item-text'>{item.text}</div>
                                        <div className='flex-grow'></div>
                                        {selectedItem === index && (
                                            <div className='check-mark'>
                                                <img src={checkMark} alt='check-mark' />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className='top-login-button'>Connect</div>
                </div>
            </TopContent>
        </>
    );
};

TestUI.getLayout = useDefaultLayout;

export default TestUI;