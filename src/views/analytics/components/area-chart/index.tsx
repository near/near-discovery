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
interface IProps {
  data: { name: string; [propName: string]: any }[];
}
const App: FC<IProps> = ({ data }) => {
  return (
    <AreaChart
      width={824}
      height={318}
      data={data}
      margin={{
        top: 20,
        right: 40,
        left: 0,
        bottom: 0,
      }}
    >
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="10%" stopColor="#EBF479" stopOpacity={0.2} />
          <stop offset="90%" stopColor="#EBF479" stopOpacity={0} />
        </linearGradient>
      </defs>
      {/* <CartesianGrid strokeDasharray="3" /> */}
      <XAxis
        dataKey="name"
        tick={{
          stroke: 'rgba(255, 255, 255, 0.40)',
          fill: 'rgba(255, 255, 255, 0.40)',
          fontSize: 12,
          fontWeight: 400,
        }}
      />
      <YAxis />

      {/* <defs>
        <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
          <stop offset={off} stopColor="green" stopOpacity={1} />
          <stop offset={off} stopColor="red" stopOpacity={1} />
        </linearGradient>
      </defs> */}
      <Area type="monotone" dataKey="Users" stroke="#EBF479" fillOpacity={1} fill="url(#colorUv)" />
      <Tooltip
        wrapperStyle={{
          width: 122,
          height: 70,
        }}
        contentStyle={{
          background: '#2E3142',
          borderRadius: '8px',
          border: '1px solid #373A53',
          fontSize: '14px',
        }}
        labelFormatter={(name: string, props: any) => {
          return `${props[0]?.payload?.date}`;
        }}
        labelStyle={{
          color: '#979ABE',
        }}
        itemStyle={{
          color: 'white',
        }}
      />
    </AreaChart>
  );
};
export default App;
