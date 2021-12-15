import * as React from "react";
import BarChart from "../BarChart";

export interface ILanguageChartProps {
  langs: any;
}

export function LanguageChart(props: ILanguageChartProps) {
  return (
    <div className="chart-div">
      <p className="title">Language Usage</p>
      <p className="subtitle">per lines of code</p>
      <p>Select repo from list to see languages used</p>
      <BarChart data={props.langs} />
    </div>
  );
}
