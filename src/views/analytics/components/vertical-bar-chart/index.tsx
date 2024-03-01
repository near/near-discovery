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

const CategoryTick = (props: any) => {
  // console.log('props: ', props, props.data[props.index].logo);
  return (
    <foreignObject x={props.x - 40} y={props.y - 10} width={40} height={20}>
      <Styles.YaxisWrap>
        <Styles.YaxisOrder>#{props.index + 1}</Styles.YaxisOrder>
        <Styles.YaxisLogo src={props.data[props.index].logo} alt="" />
      </Styles.YaxisWrap>
    </foreignObject>
  );
};

const App: FC<IProps> = ({ data }) => {
  // console.log('data: ', data);

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
      <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={<CategoryTick data={data} />} />

      {/* <Legend /> */}
      <Bar
        dataKey="total_trading_value"
        fill="#555D77"
        activeBar={
          <Rectangle
            radius={4}
            fill="#EBF479"
            // stroke="blue"
          />
        }
      />

      <Tooltip
        cursor={false}
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
        formatter={(value: any, name: any, props: any) => {
          return [value, 'Transactions'];
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
