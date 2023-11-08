import React from "react";
import { ResponsiveState } from "../../utils/responsiveState";
import {
  BarChart,
  Bar,
  Cell,
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

export const BarChartComponent = (props: IpropTypes) => {
  const { data } = props;

  const { isLgScreen } = ResponsiveState();
  return (
    <>
      <ResponsiveContainer width="100%" height={isLgScreen ? "90%" : "80%"}>
        <BarChart
          width={600}
          height={500}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="0" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          {/* <Legend /> */}
          <Bar dataKey="pv" fill="#8884d8" />
          {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};
