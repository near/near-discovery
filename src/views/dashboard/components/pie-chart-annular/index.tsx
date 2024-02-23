import type { FC } from 'react';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const COLORS = ['#3F4760', '#555D77', '#707894', '#8188A3', '#949BB6', '#A6ABC0'];

interface IProps {
  data: { name: string; [propName: string]: any }[];
}
const App: FC<IProps> = ({ data }) => {
  return (
    <PieChart
      width={400}
      height={330}
      //  onMouseEnter={this.onPieEnter}
    >
      <Pie
        data={data}
        cx={190}
        cy={140}
        innerRadius={86}
        outerRadius={126}
        fill="#8884d8"
        paddingAngle={2}
        dataKey="total"
        // label
      >
        {data.map((entry: any, index: number) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip
        // trigger="click"
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
        // labelFormatter={(name: string, props: any) => {
        //   return `${props[0]?.payload?.date}`;
        // }}
        labelStyle={{
          color: '#979ABE',
        }}
        itemStyle={{
          color: 'white',
        }}
      />
    </PieChart>
  );
};

export default App;
