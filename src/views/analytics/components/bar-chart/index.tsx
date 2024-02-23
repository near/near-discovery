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

import * as Styles from './styles';

interface IProps {
  data: { name: string; [propName: string]: any }[];
}

const App: FC<IProps> = ({ data }) => {
  return (
    <BarChart
      width={1244}
      height={320}
      data={data}
      barGap={6}
      barSize={24}
      margin={{
        // top: 20,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      {/* <CartesianGrid strokeDasharray="3 3" /> */}
      <XAxis dataKey="name" />
      <YAxis />

      {/* <Legend /> */}
      {/* <Bar
        dataKey="total_users"
        // fill="rgba(85, 93, 119, 0.6)"
        activeBar={
          <Rectangle
            fill="rgba(85, 93, 119, 1)"
            // stroke="blue"
          />
        }
      />
      <Bar
        dataKey="total_trading_value"
        // fill="rgba(235, 244, 121, 0.6)"
        activeBar={<Rectangle fill="gold" stroke="purple" />}
      /> */}

      <Tooltip
        wrapperStyle={{
          width: 240,
          height: 125,
        }}
        contentStyle={{
          background: '#2E3142',
          borderRadius: '8px',
          padding: '12px',
          border: '1px solid #373A53',
          fontSize: '14px',
        }}
        labelFormatter={(name: string, props: any) => {
          return (
            <Styles.Wrap>
              <Styles.Logo src={props[0]?.payload?.logo}></Styles.Logo>
              {name}
            </Styles.Wrap>
          );
        }}
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
