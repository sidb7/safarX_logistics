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
import { ResponsiveState } from "../../utils/responsiveState";

interface IpropTypes {
  data?: any;
}

export default function SimpleLineChart(props: IpropTypes) {
  const { data } = props;
  const { isLgScreen } = ResponsiveState();

  return (
    <>
      <ResponsiveContainer width="100%" height={isLgScreen ? "90%" : "80%"}>
        <LineChart
          width={600}
          height={200}
          data={data}
          margin={{
            top: 25,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="0" vertical={false} />
          <XAxis dataKey="k" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="v"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
