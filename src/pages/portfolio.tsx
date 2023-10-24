import React, { useEffect, useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import styled from 'styled-components';

import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const PortfolioColumn: NextPageWithLayout = () => {
  const ChartContainer = styled.div`
    color: #fff;
    width: 425px;
    height: 100px;
  `;

  //   const [data, setData] = useState([]);

  //   useEffect(() => {
  //     fetchData();
  //   }, []);

  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('https://api.debank.com/asset/net_curve_24h?user_addr=0xc25d79fc4970479b88068ce8891ed9be5799210d');
  //       const jsonData = await response.json();
  //       const formattedData = jsonData.data.usd_value_list.map((item: any[]) => ({
  //         name: new Date(item[0] * 1000).toLocaleTimeString(),
  //         uv: item[1],
  //       }));
  //       setData(formattedData);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={200}
          height={60}
          data={data}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#63C341" />
              <stop offset="100%" stopColor="rgba(99, 195, 65, 0)" />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="transparent" />
          <XAxis dataKey="name" tick={false} axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tick={false} tickLine={false} />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stroke="#63C341" fill="url(#gradient)" />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

PortfolioColumn.getLayout = useDefaultLayout;

export default PortfolioColumn;
