import type { FC } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianAxis,
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

import { formatThousandsSeparator } from '@/utils/format-number';

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
  const CustomTooltip = (props: any) => {
    const { payload } = props;

    const map: any = { total_trading_value: 'Transactions' };

    return (
      <Styles.CustomTooltip>
        <Styles.Wrap>
          <Styles.Logo src={payload[0]?.payload?.logo}></Styles.Logo>
          {payload[0]?.payload?.name}
        </Styles.Wrap>
        {payload.map((item: any, index: number) => (
          <Styles.Item key={index}>
            <Styles.Key>{map[item.name]}</Styles.Key>

            <Styles.Value>{formatThousandsSeparator(item.value)}</Styles.Value>
          </Styles.Item>
        ))}
      </Styles.CustomTooltip>
    );
  };
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
      {/* <CartesianAxis mirror={true} /> */}
      <CartesianGrid vertical={false} />
      <XAxis
        type="number"
        // hide
        axisLine={false}
        tickLine={false}
        // tick={false}
        tick={{
          stroke: 'rgba(255, 255, 255, 0.40)',
          fill: 'rgba(255, 255, 255, 0.40)',
          fontSize: 12,
          fontWeight: 400,
        }}
      />
      <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={<CategoryTick data={data} />} />

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
        content={<CustomTooltip />}
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
