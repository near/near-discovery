import type { FC } from 'react';
import { useCallback, useState } from 'react';
import { Cell, Legend, Pie, PieChart, Sector, Tooltip } from 'recharts';

const COLORS = ['#3F4760', '#555D77', '#707894', '#8188A3', '#949BB6', '#A6ABC0'];
interface IProps {
  data: { name: string; [propName: string]: any }[];
}

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy - 100} dy={8} fontSize={20} fontWeight={700} fill="white" textAnchor="middle">
        {payload.percent}%
      </text>
      <text x={cx} y={cy - 75} dy={8} fontSize={16} fontWeight={500} textAnchor="middle" fill="white">
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        // fill={fill}
        fill="#EBF479"
      />
    </g>
  );
};

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

  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_: any, index: number) => {
      setActiveIndex(index);
    },
    [setActiveIndex],
  );
  return (
    <PieChart width={642} height={306}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        onMouseEnter={onPieEnter}
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
      {/* <Tooltip
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
      /> */}
    </PieChart>
  );
};

export default App;
