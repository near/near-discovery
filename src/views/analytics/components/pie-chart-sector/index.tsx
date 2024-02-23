import type { FC } from 'react';
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts';

const COLORS = ['#3F4760', '#555D77', '#707894', '#8188A3', '#949BB6', '#A6ABC0'];
interface IProps {
  data: { name: string; [propName: string]: any }[];
}
const App: FC<IProps> = ({ data }) => {
  const renderLegend = (props: any) => {
    const { payload } = props;

    return (
      <div
        style={{
          position: 'absolute',
          bottom: '-50px',
          display: 'flex',
          color: '#979ABE',
          fontSize: '16px',
          gap: '20px',
          width: '642px',
          justifyContent: 'center',
        }}
      >
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span style={{ width: '15px', height: '15px', borderRadius: '50%', background: entry.color }}></span>
            {entry.value}
          </div>
        ))}
      </div>
    );
  };
  return (
    <PieChart
      width={642}
      height={306}
      //  onMouseEnter={this.onPieEnter}
    >
      <Pie
        data={data}
        cx={318}
        cy={318}
        startAngle={180}
        endAngle={0}
        innerRadius={242}
        outerRadius={318}
        fill="#8884d8"
        // paddingAngle={1}
        dataKey="Users"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend content={renderLegend} />
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
