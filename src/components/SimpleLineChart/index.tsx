import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface IpropTypes {
  data?: any;
}

export default function SimpleLineChart(props: IpropTypes) {
  const { data } = props;

  return (
    <>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={600}
          height={200}
          data={data}
          margin={{
            top: 15,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="0" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
