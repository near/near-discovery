import type { FC } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import * as Styles from './styles';

interface IProps {
  data?: { name: string; [propName: string]: any }[];
}

const App: FC<IProps> = ({ data }) => {
  return (
    <ComposedChart
      layout="vertical"
      width={550}
      height={300}
      data={data}
      barGap={20}
      barSize={4}
      margin={{
        top: 20,
        right: 0,
        left: 10,
        bottom: 10,
      }}
    >
      {/* <CartesianGrid strokeDasharray="3 3" /> */}
      <XAxis type="number" />
      <YAxis
        dataKey="name"
        // type="number"
        type="category"
        // scale="linear"
      />

      {/* <Legend /> */}
      <Bar
        dataKey="total_trading_value"
        fill="#555D77"
        activeBar={
          <Rectangle
            fill="#EBF479"
            // stroke="blue"
          />
        }
      />

      <Tooltip
        // trigger="click"
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
    </ComposedChart>
  );
};
export default App;
