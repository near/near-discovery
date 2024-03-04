import type { FC } from 'react';
import { Cell, Pie, PieChart, Sector } from 'recharts';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { formatThousandsSeparator } from '@/utils/format-number';

import * as Styles from './styles';

interface IProps {
  data: { name: string; [propName: string]: any }[];
}

const App: FC<IProps> = ({ data }) => {
  const CustomTooltip = (props: any) => {
    const { payload } = props;

    const map: any = { total_users: 'Users', total_trading_value: 'Trading Volume' };
    return (
      <Styles.CustomTooltip>
        <Styles.Wrap>
          <Styles.Logo src={payload[0]?.payload?.logo}></Styles.Logo>
          {payload[0]?.payload?.name}
        </Styles.Wrap>
        {payload.map((item: any, index: number) => (
          <Styles.Item key={index}>
            <Styles.Key>
              <Styles.Icon color={item.color}></Styles.Icon>
              {map[item.name]}
            </Styles.Key>
            {payload.name === 'total_trading_value' ? (
              <Styles.Value>{formatThousandsSeparator(item.value)}</Styles.Value>
            ) : (
              <Styles.Value>{item.value}</Styles.Value>
            )}
          </Styles.Item>
        ))}
      </Styles.CustomTooltip>
    );
  };

  return (
    <BarChart
      width={1244}
      height={320}
      data={data}
      barGap={6}
      barSize={24}
      margin={{
        // top: 0,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      {/* <CartesianGrid strokeDasharray="3 3" /> */}
      {/* <YAxis dataKey="total_trading_value" /> */}
      <XAxis
        dataKey="name"
        axisLine={false}
        tickLine={false}
        tick={{
          stroke: 'white',
          fill: 'white',
          fontSize: 16,
          fontWeight: 600,
        }}
      />

      <Tooltip
        // trigger="click"
        cursor={{ fill: '#262830' }}
        wrapperStyle={{
          minWidth: 240,
          height: 125,
        }}
        contentStyle={{
          background: '#2E3142',
          borderRadius: '8px',
          padding: '12px',
          border: '1px solid #373A53',
          fontSize: '14px',
        }}
        // labelFormatter={(name: string, props: any) => {
        //   return (
        //     <Styles.Wrap>
        //       <Styles.Logo src={props[0]?.payload?.logo}></Styles.Logo>
        //       {name}
        //     </Styles.Wrap>
        //   );
        // }}
        content={<CustomTooltip />}
        // formatter={(value: any, name: any, props: any) => {
        //   const map: any = { total_users: 'Users', total_trading_value: 'Trading Volume' };
        //   return [value, map[name]];
        // }}
        // `$${Number(item.total_trading_value).toFixed(2)}k`
        labelStyle={{
          color: '#979ABE',
        }}
        itemStyle={{
          color: 'white',
        }}
      />
      <Bar dataKey="total_users" fill="rgba(85, 93, 119, 0.6)" activeBar={<Rectangle fill="rgba(85, 93, 119, 1)" />} />
      <Bar
        dataKey="total_trading_value"
        fill="rgba(235, 244, 121, 0.6)"
        activeBar={<Rectangle fill="rgba(235, 244, 121, 1)" />}
      />
    </BarChart>
  );
};
export default App;
